// ═══════════════════════════════════════════════════════════
//  NEXORIA HUB — Shared JS
//  Handles: Auth, i18n (AR/EN), Navbar, Profile Dropdown
// ═══════════════════════════════════════════════════════════

const BACKEND_URL  = 'https://nxh.onrender.com';
const FRONTEND_URL = 'https://sanyme.github.io/nxh';

// ─── Translations ─────────────────────────────────────────
const translations = {
  en: {
    nav_home:      'HOME',
    nav_store:     'STORE',
    nav_community: 'COMMUNITY',
    nav_support:   'SUPPORT',
    nav_login:     'Login',
    nav_profile:   'Profile',
    nav_settings:  'Settings',
    nav_logout:    'Logout',

    hero_badge:        'GAMING HUB — EST. 2024',
    hero_title:        'NEXORIA',
    hero_title_accent: 'HUB',
    hero_desc:         'Your central hub for gaming tools, exclusive products, and a growing community.',
    hero_btn_store:    'Browse Store',
    hero_btn_login:    'Login',
    stat_members:      'MEMBERS',
    stat_products:     'PRODUCTS',
    stat_uptime:       'UPTIME',
    why_title:         'Why',
    why_accent:        'Nexoria?',
    why_desc:          'Everything you need, in one place',
    feature_1_title:   'Gaming Tools',
    feature_1_desc:    'Premium tools and software for the competitive gamer.',
    feature_2_title:   'Exclusive Store',
    feature_2_desc:    '340+ products available. From scripts to configs.',
    feature_3_title:   'Community',
    feature_3_desc:    'Join 12K+ members. Share, discuss, and grow.',
    feature_4_title:   '99% Uptime',
    feature_4_desc:    'Reliable infrastructure. Always available.',
    feature_5_title:   'Secure & Safe',
    feature_5_desc:    'End-to-end security for all transactions.',
    feature_6_title:   '24/7 Support',
    feature_6_desc:    'Our support team is always online.',
    cta_title:         'Ready to',
    cta_accent:        'Join?',
    cta_desc:          'Create your free account and get instant access.',
    cta_btn:           'Get Started Free',

    login_welcome:        'Welcome back',
    login_sub:            'Sign in to your Nexoria Hub account',
    login_discord:        'Continue with Discord',
    login_google:         'Continue with Google',
    login_github:         'Continue with GitHub',
    login_or:             'OR',
    login_email:          'Email address',
    login_pass:           'Password',
    login_btn:            'Sign In',
    login_forgot:         'Forgot password?',
    login_no_account:     'No account?',
    login_register:       'Register',
    register_title:       'Create Account',
    register_sub:         'Join the Nexoria Hub community',
    register_username:    'Username',
    register_email:       'Email address',
    register_pass:        'Password',
    register_confirm:     'Confirm Password',
    register_btn:         'Create Account',
    register_terms:       'By registering, you agree to our',
    register_terms_link1: 'Terms of Service',
    register_terms_and:   'and',
    register_terms_link2: 'Privacy Policy',
    tab_signin:           'Sign In',
    tab_register:         'Register',

    store_title:    'The',
    store_accent:   'Store',
    store_desc:     '340+ products for gamers, by gamers',
    store_search:   'Search products...',
    filter_all:     'All',
    filter_scripts: 'Scripts',
    filter_configs: 'Configs',
    filter_tools:   'Tools',
    filter_bundles: 'Bundles',
    buy_now:        'Buy Now',
    downloads:      'downloads',

    community_title:   'Community',
    community_accent:  'Hub',
    community_desc:    '12,000+ members — share, discuss, grow',
    new_post:          '+ New Post',
    tab_all:           'All',
    tab_general:       'General',
    tab_showcase:      'Showcase',
    tab_help:          'Help',
    post_likes:        'likes',
    post_replies:      'replies',
    post_share:        'Share',
    modal_create:      'Create Post',
    modal_title_ph:    'Post title...',
    modal_content_ph:  "What's on your mind?",
    modal_post:        'Post',
    modal_cancel:      'Cancel',
    cat_general:       '📢 General',
    cat_showcase:      '🏆 Showcase',
    cat_help:          '❓ Help',

    support_title:       'How can we',
    support_accent:      'help?',
    support_sub:         'Our support team is available 24/7',
    support_search:      'Search for answers...',
    support_chat:        'Live Chat',
    support_chat_desc:   'Chat with us on Discord',
    support_chat_status: '● Online Now',
    support_ticket:      'Open Ticket',
    support_ticket_desc: 'Create a support ticket',
    support_ticket_time: '~2h response time',
    support_email:       'Email Support',
    support_email_desc:  'support@nexoriahub.com',
    support_email_time:  '~24h response time',
    faq_title:           'Frequently Asked',
    faq_accent:          'Questions',
    faq_desc:            'Quick answers to common questions',
    contact_title:       'Still need',
    contact_accent:      'help?',
    contact_desc:        "Send us a message and we'll get back to you ASAP",
    contact_name:        'Your name',
    contact_email:       'Email address',
    contact_send:        'Send Message',
    ticket_modal_title:  'Open Support Ticket',
    ticket_subject:      'Ticket subject',
    ticket_submit:       'Submit Ticket',

    profile_title:        'My Profile',
    profile_accent:       'Settings',
    profile_username:     'USERNAME',
    profile_name:         'DISPLAY NAME',
    profile_email:        'EMAIL',
    profile_joined:       'Member Since',
    profile_save:         'Save Changes',
    profile_change_photo: 'Change Photo',
    profile_purchases:    'My Purchases',
    profile_no_purchases: 'No purchases yet',
    profile_danger:       'Danger Zone',
    profile_delete:       'Delete Account',

    footer_rights: '© 2024 Nexoria Hub. All rights reserved.',
  },

  ar: {
    nav_home:      'الرئيسية',
    nav_store:     'المتجر',
    nav_community: 'المجتمع',
    nav_support:   'الدعم',
    nav_login:     'تسجيل الدخول',
    nav_profile:   'الملف الشخصي',
    nav_settings:  'الإعدادات',
    nav_logout:    'تسجيل الخروج',

    hero_badge:        'مركز الألعاب — تأسس 2024',
    hero_title:        'نيكزوريا',
    hero_title_accent: 'هاب',
    hero_desc:         'مركزك الأساسي لأدوات الألعاب والمنتجات الحصرية ومجتمع متنامي.',
    hero_btn_store:    'تصفح المتجر',
    hero_btn_login:    'تسجيل الدخول',
    stat_members:      'عضو',
    stat_products:     'منتج',
    stat_uptime:       'وقت التشغيل',
    why_title:         'لماذا',
    why_accent:        'نيكزوريا؟',
    why_desc:          'كل ما تحتاجه في مكان واحد',
    feature_1_title:   'أدوات الألعاب',
    feature_1_desc:    'أدوات وبرامج متميزة للاعب التنافسي.',
    feature_2_title:   'متجر حصري',
    feature_2_desc:    '+340 منتج متاح. من السكريبتات إلى الإعدادات.',
    feature_3_title:   'المجتمع',
    feature_3_desc:    'انضم لأكثر من 12 ألف عضو. شارك وناقش وانمو.',
    feature_4_title:   '99% وقت تشغيل',
    feature_4_desc:    'بنية تحتية موثوقة. متاحة دائماً.',
    feature_5_title:   'آمن وموثوق',
    feature_5_desc:    'أمان شامل لجميع المعاملات.',
    feature_6_title:   'دعم 24/7',
    feature_6_desc:    'فريق الدعم متاح دائماً.',
    cta_title:         'مستعد',
    cta_accent:        'للانضمام؟',
    cta_desc:          'أنشئ حسابك المجاني واحصل على وصول فوري.',
    cta_btn:           'ابدأ مجاناً',

    login_welcome:        'مرحباً بعودتك',
    login_sub:            'سجل دخولك إلى حساب Nexoria Hub',
    login_discord:        'المتابعة عبر Discord',
    login_google:         'المتابعة عبر Google',
    login_github:         'المتابعة عبر GitHub',
    login_or:             'أو',
    login_email:          'البريد الإلكتروني',
    login_pass:           'كلمة المرور',
    login_btn:            'تسجيل الدخول',
    login_forgot:         'نسيت كلمة المرور؟',
    login_no_account:     'ليس لديك حساب؟',
    login_register:       'سجل الآن',
    register_title:       'إنشاء حساب',
    register_sub:         'انضم إلى مجتمع Nexoria Hub',
    register_username:    'اسم المستخدم',
    register_email:       'البريد الإلكتروني',
    register_pass:        'كلمة المرور',
    register_confirm:     'تأكيد كلمة المرور',
    register_btn:         'إنشاء الحساب',
    register_terms:       'بالتسجيل، أنت توافق على',
    register_terms_link1: 'شروط الخدمة',
    register_terms_and:   'و',
    register_terms_link2: 'سياسة الخصوصية',
    tab_signin:           'تسجيل الدخول',
    tab_register:         'إنشاء حساب',

    store_title:    '',
    store_accent:   'المتجر',
    store_desc:     '+340 منتج للاعبين، من اللاعبين',
    store_search:   'ابحث عن منتجات...',
    filter_all:     'الكل',
    filter_scripts: 'سكريبتات',
    filter_configs: 'إعدادات',
    filter_tools:   'أدوات',
    filter_bundles: 'حزم',
    buy_now:        'اشتري الآن',
    downloads:      'تحميل',

    community_title:   'مجتمع',
    community_accent:  'هاب',
    community_desc:    '+12,000 عضو — شارك، ناقش، انمو',
    new_post:          '+ منشور جديد',
    tab_all:           'الكل',
    tab_general:       'عام',
    tab_showcase:      'معرض',
    tab_help:          'مساعدة',
    post_likes:        'إعجاب',
    post_replies:      'رد',
    post_share:        'مشاركة',
    modal_create:      'إنشاء منشور',
    modal_title_ph:    'عنوان المنشور...',
    modal_content_ph:  'ماذا يدور في ذهنك؟',
    modal_post:        'نشر',
    modal_cancel:      'إلغاء',
    cat_general:       '📢 عام',
    cat_showcase:      '🏆 معرض',
    cat_help:          '❓ مساعدة',

    support_title:       'كيف يمكننا',
    support_accent:      'مساعدتك؟',
    support_sub:         'فريق الدعم متاح على مدار الساعة',
    support_search:      'ابحث عن إجابات...',
    support_chat:        'دردشة مباشرة',
    support_chat_desc:   'تحدث معنا على Discord',
    support_chat_status: '● متاح الآن',
    support_ticket:      'فتح تذكرة',
    support_ticket_desc: 'أنشئ تذكرة دعم',
    support_ticket_time: 'وقت الرد ~ساعتان',
    support_email:       'دعم البريد الإلكتروني',
    support_email_desc:  'support@nexoriahub.com',
    support_email_time:  'وقت الرد ~24 ساعة',
    faq_title:           'الأسئلة',
    faq_accent:          'الشائعة',
    faq_desc:            'إجابات سريعة على الأسئلة الشائعة',
    contact_title:       'لا تزال بحاجة إلى',
    contact_accent:      'مساعدة؟',
    contact_desc:        'أرسل لنا رسالة وسنرد عليك في أقرب وقت',
    contact_name:        'اسمك',
    contact_email:       'البريد الإلكتروني',
    contact_send:        'إرسال الرسالة',
    ticket_modal_title:  'فتح تذكرة دعم',
    ticket_subject:      'موضوع التذكرة',
    ticket_submit:       'إرسال التذكرة',

    profile_title:        'ملفي',
    profile_accent:       'الشخصي',
    profile_username:     'اسم المستخدم',
    profile_name:         'الاسم المعروض',
    profile_email:        'البريد الإلكتروني',
    profile_joined:       'عضو منذ',
    profile_save:         'حفظ التغييرات',
    profile_change_photo: 'تغيير الصورة',
    profile_purchases:    'مشترياتي',
    profile_no_purchases: 'لا توجد مشتريات بعد',
    profile_danger:       'منطقة الخطر',
    profile_delete:       'حذف الحساب',

    footer_rights: '© 2024 Nexoria Hub. جميع الحقوق محفوظة.',
  }
};

// ─── Auth ─────────────────────────────────────────────────
const Auth = {
  getUser() {
    try { return JSON.parse(localStorage.getItem('nxh_user')) || null; }
    catch { return null; }
  },

  setUser(user) {
    localStorage.setItem('nxh_user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('nxh_user');
    fetch(`${BACKEND_URL}/api/logout`, {
      method:      'POST',
      credentials: 'include'
    }).finally(() => {
      window.location.href = `${FRONTEND_URL}/index.html`;
    });
  },

  // ✅ يقرأ URL Params بعد OAuth redirect
  parseOAuthCallback() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('login') === 'success') {
      const user = {
        username: params.get('username') || 'User',
        name:     params.get('name')     || params.get('username') || 'User',
        avatar:   params.get('avatar')   || '',
        email:    params.get('email')    || '',
        provider: params.get('provider') || 'oauth',
        joined:   params.get('joined')   || new Date().toISOString(),
      };
      this.setUser(user);
      window.history.replaceState({}, document.title, window.location.pathname);
      return user;
    }

    // لو في error من الـ OAuth
    if (params.get('error')) {
      const errors = {
        'discord_cancelled':    'Discord login was cancelled.',
        'github_cancelled':     'GitHub login was cancelled.',
        'google_cancelled':     'Google login was cancelled.',
        'discord_token_failed': 'Discord login failed. Try again.',
        'github_token_failed':  'GitHub login failed. Try again.',
        'google_token_failed':  'Google login failed. Try again.',
        'discord_error':        'Discord login error. Try again.',
        'github_error':         'GitHub login error. Try again.',
        'google_error':         'Google login error. Try again.',
      };
      const msg = errors[params.get('error')] || 'Login failed. Please try again.';
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => showAuthError(msg), 300);
    }

    return null;
  },

  // ✅ Email Login
  async loginWithEmail(email, password) {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/login`, {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        this.setUser(data.user);
        window.location.href = `${FRONTEND_URL}/index.html`;
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (e) {
      console.error(e);
      return { success: false, error: 'Cannot connect to server. Make sure app.py is running.' };
    }
  },

  // ✅ Email Register
  async registerWithEmail(username, email, password) {
    try {
      const res  = await fetch(`${BACKEND_URL}/api/register`, {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ username, email, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        this.setUser(data.user);
        window.location.href = `${FRONTEND_URL}/index.html`;
        return { success: true };
      }
      return { success: false, error: data.error || 'Registration failed' };
    } catch (e) {
      console.error(e);
      return { success: false, error: 'Cannot connect to server. Make sure app.py is running.' };
    }
  },

  isLoggedIn() {
    return this.getUser() !== null;
  }
};

// ─── Auth Error ────────────────────────────────────────────
function showAuthError(msg) {
  const existing = document.getElementById('authErrorBanner');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.id = 'authErrorBanner';
  div.style.cssText = `
    position: fixed; top: 80px; left: 50%;
    transform: translateX(-50%);
    background: #1a0808;
    border: 1px solid rgba(255,80,80,0.4);
    color: #ff8080;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    white-space: nowrap;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  `;
  div.textContent = '⚠️  ' + msg;
  document.body.appendChild(div);
  setTimeout(() => div?.remove(), 5000);
}

// ─── Toast ─────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.nxh-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'nxh-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #111;
    border: 1px solid ${type === 'success' ? 'rgba(0,200,224,0.3)' : 'rgba(255,80,80,0.3)'};
    color: ${type === 'success' ? '#00c8e0' : '#ff8080'};
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease-out;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast?.remove(), 3000);
}

// ─── i18n ──────────────────────────────────────────────────
const i18n = {
  current: localStorage.getItem('nxh_lang') || 'en',

  t(key) {
    return translations[this.current]?.[key]
        || translations['en']?.[key]
        || key;
  },

  setLang(lang) {
    this.current = lang;
    localStorage.setItem('nxh_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    this.applyTranslations();
    this.updateLangBtn();
    if (typeof renderProducts === 'function') renderProducts(window._currentProducts || []);
    if (typeof renderPosts    === 'function') renderPosts(window._currentPosts       || []);
    if (typeof renderFAQ      === 'function') renderFAQ(window._currentFAQ           || []);
  },

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = this.t(key);
      } else {
        el.textContent = this.t(key);
      }
    });
  },

  updateLangBtn() {
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = this.current === 'ar' ? 'EN' : 'AR';
  },

  toggle() {
    this.setLang(this.current === 'en' ? 'ar' : 'en');
  }
};

// ─── Navbar ────────────────────────────────────────────────
const Navbar = {
  pages: [
    { key: 'nav_home',      href: `${FRONTEND_URL}/index.html`,     id: 'home'      },
    { key: 'nav_store',     href: `${FRONTEND_URL}/store.html`,     id: 'store'     },
    { key: 'nav_community', href: `${FRONTEND_URL}/community.html`, id: 'community' },
    { key: 'nav_support',   href: `${FRONTEND_URL}/support.html`,   id: 'support'   },
  ],

  getActivePage() {
    const path = window.location.pathname;
    if (path.includes('store'))     return 'store';
    if (path.includes('community')) return 'community';
    if (path.includes('support'))   return 'support';
    if (path.includes('profile'))   return 'profile';
    return 'home';
  },

  build() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    const active = this.getActivePage();
    const user   = Auth.getUser();

    const links = this.pages.map(p => `
      <a href="${p.href}"
         class="hover:text-white transition text-sm font-semibold tracking-widest
                ${active === p.id
                  ? 'text-white border-b-2 border-[#00c8e0] pb-0.5'
                  : 'text-white/50'}"
         data-i18n="${p.key}">${i18n.t(p.key)}</a>
    `).join('');

    const authSection = user ? this.buildUserMenu(user) : this.buildLoginBtn();

    nav.innerHTML = `
      <a href="${FRONTEND_URL}/index.html"
         class="border border-[#00c8e0] text-[#00c8e0] font-bold
                px-3 py-1 rounded text-sm tracking-widest flex-shrink-0">
        NXH
      </a>

      <div class="hidden md:flex items-center gap-8">${links}</div>

      <button id="mobileMenuBtn"
              class="md:hidden text-white/70 hover:text-white"
              onclick="toggleMobileMenu()">
        <svg width="24" height="24" fill="none" stroke="currentColor"
             stroke-width="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <div class="flex items-center gap-3">
        <button onclick="i18n.toggle()" id="langBtn"
                class="border border-white/20 text-white/70 px-3 py-1 rounded-full
                       text-xs font-bold hover:border-[#00c8e0] hover:text-[#00c8e0] transition">
          ${i18n.current === 'ar' ? 'EN' : 'AR'}
        </button>
        ${authSection}
      </div>
    `;

    // Mobile menu links
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.innerHTML = this.pages.map(p => `
        <a href="${p.href}"
           class="block py-3 px-6 text-sm font-semibold tracking-widest
                  border-b border-white/5
                  ${active === p.id ? 'text-[#00c8e0]' : 'text-white/50 hover:text-white'}"
           data-i18n="${p.key}">${i18n.t(p.key)}</a>
      `).join('');
    }

    if (user) this.bindDropdown();
  },

  buildLoginBtn() {
    return `
      <a href="${FRONTEND_URL}/login.html"
         class="bg-[#00c8e0] text-black font-bold px-5 py-2 rounded-full
                text-sm hover:bg-[#00e5ff] transition"
         data-i18n="nav_login">${i18n.t('nav_login')}</a>
    `;
  },

  buildUserMenu(user) {
    const initials = user.username
      ? user.username.charAt(0).toUpperCase()
      : '?';

    const avatarHTML = user.avatar
      ? `
        <img src="${user.avatar}"
             class="w-8 h-8 rounded-full object-cover border-2 border-[#00c8e0]/50"
             onerror="this.style.display='none';
                      document.getElementById('navAvatarFallback').style.display='flex'"/>
        <div id="navAvatarFallback"
             class="w-8 h-8 rounded-full bg-[#00c8e0]/20 border border-[#00c8e0]/50
                    items-center justify-center text-[#00c8e0] font-bold text-xs hidden">
          ${initials}
        </div>`
      : `
        <div class="w-8 h-8 rounded-full bg-[#00c8e0]/20 border border-[#00c8e0]/50
                    flex items-center justify-center text-[#00c8e0] font-bold text-xs">
          ${initials}
        </div>`;

    return `
      <div class="relative" id="userMenuWrapper">
        <button onclick="Navbar.toggleDropdown()"
                class="flex items-center gap-2 hover:opacity-80 transition">
          ${avatarHTML}
          <span class="text-sm font-semibold hidden md:block max-w-[120px] truncate">
            ${user.username}
          </span>
          <svg width="12" height="12" fill="none" stroke="currentColor"
               stroke-width="2.5" viewBox="0 0 24 24" class="text-white/50 flex-shrink-0">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <div id="userDropdown"
             class="hidden absolute right-0 top-12 w-56 rounded-xl
                    border border-white/10 bg-[#111] shadow-2xl overflow-hidden z-50">
          <!-- User Info -->
          <div class="px-4 py-3 border-b border-white/10">
            <div class="font-bold text-sm truncate">${user.username}</div>
            <div class="text-white/40 text-xs truncate">${user.email || user.provider || ''}</div>
            <div class="mt-1">
              <span class="text-xs px-2 py-0.5 rounded-full capitalize"
                    style="background:rgba(0,200,224,0.1);color:#00c8e0">
                ${user.provider || 'oauth'}
              </span>
            </div>
          </div>

          <!-- Links -->
          <a href="${FRONTEND_URL}/profile.html"
             class="flex items-center gap-3 px-4 py-3 text-sm text-white/70
                    hover:text-white hover:bg-white/5 transition">
            <span>👤</span>
            <span data-i18n="nav_profile">${i18n.t('nav_profile')}</span>
          </a>

          <!-- Logout -->
          <button onclick="Auth.logout()"
                  class="w-full flex items-center gap-3 px-4 py-3 text-sm
                         text-red-400 hover:bg-red-500/10 transition border-t border-white/5">
            <span>🚪</span>
            <span data-i18n="nav_logout">${i18n.t('nav_logout')}</span>
          </button>
        </div>
      </div>
    `;
  },

  toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
  },

  bindDropdown() {
    document.addEventListener('click', (e) => {
      const wrapper  = document.getElementById('userMenuWrapper');
      const dropdown = document.getElementById('userDropdown');
      if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }
};

// ─── Mobile Menu ───────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

// ─── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 1. Check OAuth callback first
  Auth.parseOAuthCallback();

  // 2. Apply language
  document.documentElement.lang = i18n.current;
  document.documentElement.dir  = i18n.current === 'ar' ? 'rtl' : 'ltr';

  // 3. Build navbar
  Navbar.build();

  // 4. Apply translations
  i18n.applyTranslations();
});