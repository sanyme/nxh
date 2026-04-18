from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
import hashlib
import os
import requests
from datetime import datetime
from urllib.parse import urlencode, quote

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5500",
    "http://localhost:5501",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501",
    "https://sanyme.github.io"
])

# ─── Config ───────────────────────────────────────────────────────────────────
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://127.0.0.1:5501')
BACKEND_URL  = os.environ.get('BACKEND_URL',  'https://nxh.vercel.app')

DISCORD_CLIENT_ID     = os.environ.get('DISCORD_CLIENT_ID',  '1491020234109485207')
DISCORD_CLIENT_SECRET = os.environ.get('DISCORD_SECRET',     '')
GITHUB_CLIENT_ID      = os.environ.get('GITHUB_CLIENT_ID',   'Ov23liGfTFAkaqEQ2Fp')
GITHUB_CLIENT_SECRET  = os.environ.get('GITHUB_SECRET',      '')
GOOGLE_CLIENT_ID      = os.environ.get('GOOGLE_CLIENT_ID',   '957634231144-5anc8sv142evvoma9aerpod7vms7no2a.apps.googleusercontent.com')
GOOGLE_CLIENT_SECRET  = os.environ.get('GOOGLE_SECRET',      '')
WEBHOOK_URL           = os.environ.get('WEBHOOK_URL',        '')

# ─── DBs ──────────────────────────────────────────────────────────────────────
users_db = {}
products_db = [
    {"id": 1, "name": "Pro Aim Config",   "category": "config",  "price": 9.99,  "emoji": "🎯"},
    {"id": 2, "name": "Auto Farm Script", "category": "script",  "price": 14.99, "emoji": "🤖"},
    {"id": 3, "name": "FPS Booster Tool", "category": "tool",    "price": 4.99,  "emoji": "⚡"},
    {"id": 4, "name": "Ultimate Bundle",  "category": "bundle",  "price": 29.99, "emoji": "📦"},
]
tickets_db = []
posts_db = [
    {
        "id": 1,
        "title": "Welcome to Nexoria Hub!",
        "content": "Excited to see this community grow!",
        "author": "NXH_Admin",
        "category": "general",
        "likes": 156,
        "replies": 42,
        "created_at": datetime.now().isoformat()
    },
]

# ─── Helpers ──────────────────────────────────────────────────────────────────
def hash_password(pw):
    return hashlib.sha256(pw.encode()).hexdigest()

def send_webhook(msg):
    if not WEBHOOK_URL:
        return
    try:
        requests.post(WEBHOOK_URL, json={"content": msg}, timeout=5)
    except Exception as e:
        print(f"Webhook Error: {e}")

def redirect_to_frontend(page='index.html', **params):
    base = f"{FRONTEND_URL}/{page}"
    if params:
        base += '?' + urlencode(params, quote_via=quote)
    return redirect(base)

# ─── CORS Fix ─────────────────────────────────────────────────────────────────
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

# ══════════════════════════════════════════════════════════════════════════════
#  EMAIL AUTH
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data     = request.get_json()
    username = data.get('username', '').strip()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not username or not email or not password:
        return jsonify({'error': 'All fields required'}), 400
    if email in users_db:
        return jsonify({'error': 'Email already registered'}), 409
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400

    users_db[email] = {
        'username':   username,
        'email':      email,
        'password':   hash_password(password),
        'avatar':     '',
        'name':       username,
        'provider':   'email',
        'created_at': datetime.now().isoformat(),
        'purchases':  []
    }
    session['user'] = email
    send_webhook(
        f"🎉 **New Member!**\n"
        f"Username: `{username}`\n"
        f"Email: `{email}`\n"
        f"Provider: Email"
    )

    return jsonify({
        'success': True,
        'message': f'Welcome, {username}!',
        'user': {
            'username': username,
            'name':     username,
            'email':    email,
            'avatar':   '',
            'provider': 'email',
            'joined':   users_db[email]['created_at']
        }
    }), 201


@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data     = request.get_json()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    user = users_db.get(email)
    if not user or user['password'] != hash_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    session['user'] = email
    return jsonify({
        'success': True,
        'message': f'Welcome back, {user["username"]}!',
        'user': {
            'username': user['username'],
            'name':     user.get('name', user['username']),
            'email':    user['email'],
            'avatar':   user.get('avatar', ''),
            'provider': user.get('provider', 'email'),
            'joined':   user.get('created_at', '')
        }
    })


@app.route('/api/logout', methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    session.pop('user', None)
    return jsonify({'success': True})


@app.route('/api/me', methods=['GET'])
def me():
    email = session.get('user')
    if not email or email not in users_db:
        return jsonify({'error': 'Not authenticated'}), 401
    u = users_db[email]
    return jsonify({
        'username':  u['username'],
        'name':      u.get('name', u['username']),
        'email':     u['email'],
        'avatar':    u.get('avatar', ''),
        'provider':  u.get('provider', 'email'),
        'joined':    u.get('created_at', ''),
        'purchases': u['purchases']
    })

# ══════════════════════════════════════════════════════════════════════════════
#  DISCORD OAUTH
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/login/discord')
def login_discord():
    params = {
        'client_id':     DISCORD_CLIENT_ID,
        'redirect_uri':  f'{BACKEND_URL}/callback/discord',
        'response_type': 'code',
        'scope':         'identify email',
    }
    return redirect('https://discord.com/api/oauth2/authorize?' + urlencode(params))


@app.route('/callback/discord')
def callback_discord():
    code  = request.args.get('code')
    error = request.args.get('error')

    if error or not code:
        return redirect_to_frontend('login.html', error='discord_cancelled')

    try:
        # Exchange code → token
        token_res = requests.post(
            'https://discord.com/api/oauth2/token',
            data={
                'client_id':     DISCORD_CLIENT_ID,
                'client_secret': DISCORD_CLIENT_SECRET,
                'grant_type':    'authorization_code',
                'code':          code,
                'redirect_uri':  f'{BACKEND_URL}/callback/discord',
            },
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
            timeout=10
        )
        token_data   = token_res.json()
        access_token = token_data.get('access_token')

        if not access_token:
            print(f"Discord token error: {token_data}")
            return redirect_to_frontend('login.html', error='discord_token_failed')

        # Get user info
        user_res     = requests.get(
            'https://discord.com/api/users/@me',
            headers={'Authorization': f'Bearer {access_token}'},
            timeout=10
        )
        discord_user = user_res.json()

        username  = discord_user.get('username', 'DiscordUser')
        disc_id   = discord_user.get('id', '')
        email     = discord_user.get('email', f"{disc_id}@discord.local")
        avatar_id = discord_user.get('avatar')
        avatar    = (
            f"https://cdn.discordapp.com/avatars/{disc_id}/{avatar_id}.png"
            if avatar_id else ''
        )

        # Save or update
        if email not in users_db:
            users_db[email] = {
                'username':   username,
                'name':       username,
                'email':      email,
                'password':   '',
                'avatar':     avatar,
                'provider':   'discord',
                'created_at': datetime.now().isoformat(),
                'purchases':  []
            }
            send_webhook(
                f"🎮 **New Discord Member!**\n"
                f"Username: `{username}`\n"
                f"Email: `{email}`"
            )
        else:
            users_db[email]['avatar']   = avatar
            users_db[email]['username'] = username

        session['user'] = email

        return redirect_to_frontend(
            'index.html',
            login    = 'success',
            username = username,
            name     = username,
            avatar   = avatar,
            email    = email,
            provider = 'discord',
            joined   = users_db[email]['created_at']
        )

    except Exception as e:
        print(f"Discord OAuth Error: {e}")
        return redirect_to_frontend('login.html', error='discord_error')

# ══════════════════════════════════════════════════════════════════════════════
#  GITHUB OAUTH
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/login/github')
def login_github():
    params = {
        'client_id':    GITHUB_CLIENT_ID,
        'redirect_uri': f'{BACKEND_URL}/callback/github',
        'scope':        'read:user user:email',
    }
    return redirect('https://github.com/login/oauth/authorize?' + urlencode(params))


@app.route('/callback/github')
def callback_github():
    code  = request.args.get('code')
    error = request.args.get('error')

    if error or not code:
        return redirect_to_frontend('login.html', error='github_cancelled')

    try:
        # Exchange code → token
        token_res = requests.post(
            'https://github.com/login/oauth/access_token',
            data={
                'client_id':     GITHUB_CLIENT_ID,
                'client_secret': GITHUB_CLIENT_SECRET,
                'code':          code,
                'redirect_uri':  f'{BACKEND_URL}/callback/github',
            },
            headers={'Accept': 'application/json'},
            timeout=10
        )
        token_data   = token_res.json()
        access_token = token_data.get('access_token')

        if not access_token:
            print(f"GitHub token error: {token_data}")
            return redirect_to_frontend('login.html', error='github_token_failed')

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept':        'application/json'
        }

        # Get user info
        user_res    = requests.get(
            'https://api.github.com/user',
            headers=headers,
            timeout=10
        )
        github_user = user_res.json()

        # Email (قد تكون private)
        email = github_user.get('email')
        if not email:
            emails_res = requests.get(
                'https://api.github.com/user/emails',
                headers=headers,
                timeout=10
            )
            emails  = emails_res.json()
            primary = next(
                (e for e in emails if e.get('primary') and e.get('verified')),
                None
            )
            email = primary['email'] if primary else f"{github_user['id']}@github.local"

        username = github_user.get('login', 'GitHubUser')
        name     = github_user.get('name', username)
        avatar   = github_user.get('avatar_url', '')

        if email not in users_db:
            users_db[email] = {
                'username':   username,
                'name':       name,
                'email':      email,
                'password':   '',
                'avatar':     avatar,
                'provider':   'github',
                'created_at': datetime.now().isoformat(),
                'purchases':  []
            }
            send_webhook(
                f"🐙 **New GitHub Member!**\n"
                f"Username: `{username}`\n"
                f"Email: `{email}`"
            )
        else:
            users_db[email]['avatar']   = avatar
            users_db[email]['username'] = username
            users_db[email]['name']     = name

        session['user'] = email

        return redirect_to_frontend(
            'index.html',
            login    = 'success',
            username = username,
            name     = name,
            avatar   = avatar,
            email    = email,
            provider = 'github',
            joined   = users_db[email]['created_at']
        )

    except Exception as e:
        print(f"GitHub OAuth Error: {e}")
        return redirect_to_frontend('login.html', error='github_error')

# ══════════════════════════════════════════════════════════════════════════════
#  GOOGLE OAUTH
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/login/google')
def login_google():
    params = {
        'client_id':     GOOGLE_CLIENT_ID,
        'redirect_uri':  f'{BACKEND_URL}/callback/google',
        'response_type': 'code',
        'scope':         'openid email profile',
        'access_type':   'online',
    }
    return redirect('https://accounts.google.com/o/oauth2/v2/auth?' + urlencode(params))


@app.route('/callback/google')
def callback_google():
    code  = request.args.get('code')
    error = request.args.get('error')

    if error or not code:
        return redirect_to_frontend('login.html', error='google_cancelled')

    try:
        # Exchange code → token
        token_res = requests.post(
            'https://oauth2.googleapis.com/token',
            data={
                'client_id':     GOOGLE_CLIENT_ID,
                'client_secret': GOOGLE_CLIENT_SECRET,
                'grant_type':    'authorization_code',
                'code':          code,
                'redirect_uri':  f'{BACKEND_URL}/callback/google',
            },
            timeout=10
        )
        token_data   = token_res.json()
        access_token = token_data.get('access_token')

        if not access_token:
            print(f"Google token error: {token_data}")
            return redirect_to_frontend('login.html', error='google_token_failed')

        # Get user info
        user_res    = requests.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            headers={'Authorization': f'Bearer {access_token}'},
            timeout=10
        )
        google_user = user_res.json()

        email    = google_user.get('email', '')
        name     = google_user.get('name', 'GoogleUser')
        username = name.replace(' ', '_')
        avatar   = google_user.get('picture', '')

        if email not in users_db:
            users_db[email] = {
                'username':   username,
                'name':       name,
                'email':      email,
                'password':   '',
                'avatar':     avatar,
                'provider':   'google',
                'created_at': datetime.now().isoformat(),
                'purchases':  []
            }
            send_webhook(
                f"🔵 **New Google Member!**\n"
                f"Username: `{username}`\n"
                f"Email: `{email}`"
            )
        else:
            users_db[email]['avatar']   = avatar
            users_db[email]['username'] = username
            users_db[email]['name']     = name

        session['user'] = email

        return redirect_to_frontend(
            'index.html',
            login    = 'success',
            username = username,
            name     = name,
            avatar   = avatar,
            email    = email,
            provider = 'google',
            joined   = users_db[email]['created_at']
        )

    except Exception as e:
        print(f"Google OAuth Error: {e}")
        return redirect_to_frontend('login.html', error='google_error')

# ══════════════════════════════════════════════════════════════════════════════
#  PROFILE UPDATE
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/api/profile', methods=['PUT', 'OPTIONS'])
def update_profile():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    email = session.get('user')
    if not email or email not in users_db:
        return jsonify({'error': 'Not authenticated'}), 401

    data = request.get_json()

    if 'username' in data and data['username'].strip():
        users_db[email]['username'] = data['username'].strip()
    if 'name' in data:
        users_db[email]['name'] = data['name'].strip()
    if 'avatar' in data:
        users_db[email]['avatar'] = data['avatar']

    u = users_db[email]
    return jsonify({
        'success':  True,
        'username': u['username'],
        'name':     u.get('name', u['username']),
        'email':    u['email'],
        'avatar':   u.get('avatar', ''),
        'provider': u.get('provider', 'email'),
        'joined':   u.get('created_at', '')
    })

# ══════════════════════════════════════════════════════════════════════════════
#  PRODUCTS
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search   = request.args.get('search', '').lower()
    result   = products_db[:]
    if category and category != 'all':
        result = [p for p in result if p['category'] == category]
    if search:
        result = [p for p in result if search in p['name'].lower()]
    return jsonify(result)


@app.route('/api/products/<int:pid>', methods=['GET'])
def get_product(pid):
    p = next((p for p in products_db if p['id'] == pid), None)
    return jsonify(p) if p else (jsonify({'error': 'Not found'}), 404)

# ══════════════════════════════════════════════════════════════════════════════
#  PURCHASE
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/api/purchase', methods=['POST', 'OPTIONS'])
def purchase():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    email = session.get('user')
    if not email:
        return jsonify({'error': 'Please login first'}), 401

    pid     = request.get_json().get('product_id')
    product = next((p for p in products_db if p['id'] == pid), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    users_db[email]['purchases'].append({
        'product_id':   pid,
        'product_name': product['name'],
        'price':        product['price'],
        'purchased_at': datetime.now().isoformat()
    })

    send_webhook(
        f"💰 **New Purchase!**\n"
        f"User: `{users_db[email]['username']}`\n"
        f"Product: `{product['name']}`\n"
        f"Price: `${product['price']}`"
    )

    return jsonify({'success': True, 'product': product})

# ══════════════════════════════════════════════════════════════════════════════
#  TICKETS
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/api/tickets', methods=['POST', 'OPTIONS'])
def create_ticket():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data    = request.get_json()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not subject or not message:
        return jsonify({'error': 'Subject and message required'}), 400

    ticket = {
        'id':         len(tickets_db) + 1,
        'subject':    subject,
        'priority':   data.get('priority', 'medium'),
        'message':    message,
        'email':      data.get('email', session.get('user', 'anonymous')),
        'status':     'open',
        'created_at': datetime.now().isoformat()
    }
    tickets_db.append(ticket)

    send_webhook(
        f"🎫 **New Support Ticket!**\n"
        f"Subject: `{subject}`\n"
        f"Priority: `{ticket['priority']}`\n"
        f"From: `{ticket['email']}`"
    )

    return jsonify({'success': True, 'ticket_id': ticket['id']}), 201


@app.route('/api/tickets', methods=['GET'])
def get_tickets():
    email = session.get('user')
    if not email:
        return jsonify({'error': 'Not authenticated'}), 401
    return jsonify([t for t in tickets_db if t['email'] == email])

# ══════════════════════════════════════════════════════════════════════════════
#  POSTS
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/api/posts', methods=['GET'])
def get_posts():
    category = request.args.get('category')
    if category and category != 'all':
        return jsonify([p for p in posts_db if p['category'] == category])
    return jsonify(posts_db)


@app.route('/api/posts', methods=['POST', 'OPTIONS'])
def create_post():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    email = session.get('user')
    if not email:
        return jsonify({'error': 'Please login first'}), 401

    data = request.get_json()
    post = {
        'id':         len(posts_db) + 1,
        'title':      data.get('title', ''),
        'content':    data.get('content', ''),
        'author':     users_db[email]['username'],
        'category':   data.get('category', 'general'),
        'likes':      0,
        'replies':    0,
        'created_at': datetime.now().isoformat()
    }
    posts_db.append(post)
    return jsonify({'success': True, 'post': post}), 201

# ══════════════════════════════════════════════════════════════════════════════
#  HEALTH CHECK
# ══════════════════════════════════════════════════════════════════════════════

@app.route('/ping')
def ping():
    return jsonify({
        'status': 'ok',
        'time':   datetime.now().isoformat(),
        'users':  len(users_db)
    })

# ══════════════════════════════════════════════════════════════════════════════
#  RUN
# ══════════════════════════════════════════════════════════════════════════════

if __name__ == '__main__':
    app.run(debug=True, port=5000)