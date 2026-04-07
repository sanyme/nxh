import os
import requests
from flask import Flask, redirect, request
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "NXH_MASTER_2026_PRO")

D_ID, D_SEC = '1491020234109485207', os.getenv("DISCORD_SECRET")
GH_ID, GH_SEC = 'Ov23liGfTFAkaqEQ2Fp', os.getenv("GITHUB_SECRET")
G_ID, G_SEC = '957634231144-5anc8sv142evvoma9aerpod7vms7no2a.apps.googleusercontent.com', os.getenv("GOOGLE_SECRET")

# ==========================================
# روابط الإطلاق (Production URLs)
# ==========================================
# 1. رابط واجهتك على جيت هاب (لا تغيره)
FRONTEND_URL = "https://sanyme.github.io/nxh/index.html"

# 2. رابط سيرفرك (إذا كنت تجربه بجهازك سيبقى localhost، وعندما ترفعه على Render ستضع الرابط هناك)
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5000")
# ==========================================

@app.route('/login/<provider>')
def login(provider):
    if provider == 'discord':
        return redirect(f"https://discord.com/api/oauth2/authorize?client_id={D_ID}&redirect_uri={BACKEND_URL}/callback&response_type=code&scope=identify")
    if provider == 'github':
        return redirect(f"https://github.com/login/oauth/authorize?client_id={GH_ID}&scope=user")
    if provider == 'google':
        return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?client_id={G_ID}&redirect_uri={BACKEND_URL}/callback/google&response_type=code&scope=openid%20profile")

@app.route('/callback')
def cb_d():
    code = request.args.get('code')
    res = requests.post('https://discord.com/api/oauth2/token', data={'client_id': D_ID, 'client_secret': D_SEC, 'grant_type': 'authorization_code', 'code': code, 'redirect_uri': f'{BACKEND_URL}/callback'}).json()
    u = requests.get('https://discord.com/api/v10/users/@me', headers={'Authorization': f"Bearer {res['access_token']}"}).json()
    return redirect(f"{FRONTEND_URL}?login=success&username={u['username']}&avatar=https://cdn.discordapp.com/avatars/{u['id']}/{u['avatar']}.png")

@app.route('/callback/github')
def cb_gh():
    code = request.args.get('code')
    res = requests.post('https://github.com/login/oauth/access_token', data={'client_id': GH_ID, 'client_secret': GH_SEC, 'code': code}, headers={'Accept': 'application/json'}).json()
    u = requests.get('https://api.github.com/user', headers={'Authorization': f"token {res['access_token']}"}).json()
    return redirect(f"{FRONTEND_URL}?login=success&username={u['login']}&avatar={u['avatar_url']}")

@app.route('/callback/google')
def cb_g():
    code = request.args.get('code')
    res = requests.post('https://oauth2.googleapis.com/token', data={'client_id': G_ID, 'client_secret': G_SEC, 'code': code, 'grant_type': 'authorization_code', 'redirect_uri': f'{BACKEND_URL}/callback/google'}).json()
    u = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', headers={'Authorization': f"Bearer {res['access_token']}"}).json()
    return redirect(f"{FRONTEND_URL}?login=success&username={u['name']}&avatar={u['picture']}")

if __name__ == '__main__':
    app.run(debug=True, port=5000)