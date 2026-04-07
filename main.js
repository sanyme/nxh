const translations = {
    ar: { nav_home: "الرئيسية", nav_store: "المتجر", nav_community: "المجتمع", nav_support: "الدعم", title: "NEXORIA <span class='text-cyan-500'>HUB</span>", btn_login: "تسجيل الدخول", btn_store: "تصفح المتجر" },
    en: { nav_home: "Home", nav_store: "Store", nav_community: "Community", nav_support: "Support", title: "NEXORIA <span class='text-cyan-500'>HUB</span>", btn_login: "Login", btn_store: "Browse Store" }
};

document.addEventListener("DOMContentLoaded", () => {
    let lang = localStorage.getItem('nxh_lang') || 'ar';
    applyLang(lang);
    const lBtn = document.getElementById('lang-btn');
    if(lBtn) lBtn.onclick = () => { localStorage.setItem('nxh_lang', lang === 'ar' ? 'en' : 'ar'); location.reload(); };
    checkUser();
});

function applyLang(l) {
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[l] && translations[l][key]) el.innerHTML = translations[l][key];
    });
}

function previewFile() {
    const file = document.getElementById('file-upload').files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        document.getElementById('modal-preview').src = reader.result;
        document.getElementById('edit-avatar').value = reader.result;
    }
    if (file) reader.readAsDataURL(file);
}

function checkUser() {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('username'), a = params.get('avatar');
    if(u && a) {
        localStorage.setItem('nxh_user', JSON.stringify({username: u, avatar: a}));
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    const saved = JSON.parse(localStorage.getItem('nxh_user'));
    if(saved) {
        const auth = document.getElementById('auth-section');
        if(auth) {
            auth.innerHTML = `<div onclick="toggleSettings()" class="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10 cursor-pointer hover:border-cyan-500 transition">
                <img src="${saved.avatar}" class="w-8 h-8 rounded-full border-2 border-cyan-500 object-cover">
                <span class="text-white font-bold text-sm uppercase">${saved.username}</span></div>`;
        }
        ['login-btn', 'hero-login-btn'].forEach(id => { if(document.getElementById(id)) document.getElementById(id).style.display = 'none'; });
        if(document.getElementById('edit-username')) document.getElementById('edit-username').value = saved.username;
        if(document.getElementById('edit-avatar')) document.getElementById('edit-avatar').value = saved.avatar;
        if(document.getElementById('modal-preview')) document.getElementById('modal-preview').src = saved.avatar;
    }
}

function toggleSettings() { const m = document.getElementById('settings-modal'); if(m) m.classList.toggle('hidden'); }
function saveProfile() { localStorage.setItem('nxh_user', JSON.stringify({username: document.getElementById('edit-username').value, avatar: document.getElementById('edit-avatar').value})); location.reload(); }
function logout() { localStorage.removeItem('nxh_user'); location.href = 'index.html'; }