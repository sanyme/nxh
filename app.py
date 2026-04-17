from flask import Flask, request, jsonify, session
from flask_cors import CORS
import hashlib
import os
import json
import requests # <--- تمت إضافتها لإرسال الإشعارات
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app, supports_credentials=True)

# ─── Discord Webhook (حط رابط الويب هوك حقك هنا) ─────────────────────────
WEBHOOK_URL = "" 

def send_to_discord(message):
    if not WEBHOOK_URL: return
    try:
        requests.post(WEBHOOK_URL, json={"content": message})
    except Exception as e:
        print(f"Webhook Error: {e}")

# ─── Fake DB (استبدلها بـ SQLite/PostgreSQL لاحقاً) ──────────────────────────
users_db = {}
products_db = [
    {"id": 1, "name": "Pro Aim Config", "category": "config", "price": 9.99, "emoji": "🎯"},
    {"id": 2, "name": "Auto Farm Script", "category": "script", "price": 14.99, "emoji": "🤖"},
    {"id": 3, "name": "FPS Booster Tool", "category": "tool", "price": 4.99, "emoji": "⚡"},
    {"id": 4, "name": "Ultimate Bundle", "category": "bundle", "price": 29.99, "emoji": "📦"},
]
tickets_db = []

# ─── Helper Functions ─────────────────────────────────────────────────────────
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def get_user_by_email(email):
    return users_db.get(email)

# ─── Auth Routes ──────────────────────────────────────────────────────────────
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not username or not email or not password:
        return jsonify({'error': 'All fields required'}), 400

    if email in users_db:
        return jsonify({'error': 'Email already registered'}), 409

    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400

    users_db[email] = {
        'username': username,
        'email': email,
        'password': hash_password(password),
        'created_at': datetime.now().isoformat(),
        'purchases': []
    }

    session['user'] = email
    
    # --- التعديل هنا: إرسال إشعار للديسكورد أول ما يسجل شخص جديد! ---
    send_to_discord(f"🎉 **عضو جديد انضم!**\nالاسم: `{username}`\nالإيميل: `{email}`")

    return jsonify({
        'success': True,
        'message': 'Account created!',
        'user': {'username': username, 'email': email}
    }), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    user = get_user_by_email(email)
    if not user or user['password'] != hash_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    session['user'] = email
    return jsonify({
        'success': True,
        'message': f'Welcome back, {user["username"]}!',
        'user': {'username': user['username'], 'email': email}
    })


@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'success': True, 'message': 'Logged out'})


@app.route('/api/me', methods=['GET'])
def me():
    email = session.get('user')
    if not email or email not in users_db:
        return jsonify({'error': 'Not authenticated'}), 401

    user = users_db[email]
    return jsonify({
        'username': user['username'],
        'email': user['email'],
        'purchases': user['purchases']
    })

# ─── Products Routes ──────────────────────────────────────────────────────────
@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search', '').lower()

    result = products_db
    if category and category != 'all':
        result = [p for p in result if p['category'] == category]
    if search:
        result = [p for p in result if search in p['name'].lower()]

    return jsonify(result)


@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products_db if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(product)

# ─── Purchase Route ───────────────────────────────────────────────────────────
@app.route('/api/purchase', methods=['POST'])
def purchase():
    email = session.get('user')
    if not email:
        return jsonify({'error': 'Please login first'}), 401

    data = request.get_json()
    product_id = data.get('product_id')

    product = next((p for p in products_db if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    # Add to user purchases
    users_db[email]['purchases'].append({
        'product_id': product_id,
        'product_name': product['name'],
        'price': product['price'],
        'purchased_at': datetime.now().isoformat()
    })

    return jsonify({
        'success': True,
        'message': f'Successfully purchased {product["name"]}!',
        'product': product
    })

# ─── Support Ticket Route ─────────────────────────────────────────────────────
@app.route('/api/tickets', methods=['POST'])
def create_ticket():
    data = request.get_json()
    subject = data.get('subject', '').strip()
    priority = data.get('priority', 'medium')
    message = data.get('message', '').strip()
    email = data.get('email', session.get('user', 'anonymous'))

    if not subject or not message:
        return jsonify({'error': 'Subject and message required'}), 400

    ticket = {
        'id': len(tickets_db) + 1,
        'subject': subject,
        'priority': priority,
        'message': message,
        'email': email,
        'status': 'open',
        'created_at': datetime.now().isoformat()
    }
    tickets_db.append(ticket)

    return jsonify({
        'success': True,
        'message': 'Ticket created! We\'ll respond within 2 hours.',
        'ticket_id': ticket['id']
    }), 201


@app.route('/api/tickets', methods=['GET'])
def get_tickets():
    email = session.get('user')
    if not email:
        return jsonify({'error': 'Not authenticated'}), 401

    user_tickets = [t for t in tickets_db if t['email'] == email]
    return jsonify(user_tickets)

# ─── Community Posts (Basic) ──────────────────────────────────────────────────
posts_db = [
    {"id": 1, "title": "Welcome to Nexoria Hub!", "content": "Excited to see this community grow!", "author": "NXH_Admin", "category": "general", "likes": 156, "replies": 42},
]

@app.route('/api/posts', methods=['GET'])
def get_posts():
    category = request.args.get('category')
    if category and category != 'all':
        return jsonify([p for p in posts_db if p['category'] == category])
    return jsonify(posts_db)


@app.route('/api/posts', methods=['POST'])
def create_post():
    email = session.get('user')
    if not email:
        return jsonify({'error': 'Please login first'}), 401

    data = request.get_json()
    post = {
        'id': len(posts_db) + 1,
        'title': data.get('title', ''),
        'content': data.get('content', ''),
        'author': users_db[email]['username'],
        'category': data.get('category', 'general'),
        'likes': 0,
        'replies': 0,
        'created_at': datetime.now().isoformat()
    }
    posts_db.append(post)
    return jsonify({'success': True, 'post': post}), 201

# ─── Run ──────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True, port=5000)