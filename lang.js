const translations = {
  en: {
    // Navbar
    "nav-home": "HOME",
    "nav-store": "STORE",
    "nav-community": "COMMUNITY",
    "nav-support": "SUPPORT",
    "nav-login": "Login",
    // Hero
    "hero-badge": "GAMING HUB — EST. 2024",
    "hero-title": "NEXORIA <span class='text-[#00c8e0] glow-text'>HUB</span>",
    "hero-desc": "Your central hub for gaming tools, exclusive products, and a growing community.",
    "btn-store": "Browse Store",
    // Stats
    "stat-members": "MEMBERS",
    "stat-products": "PRODUCTS",
    "stat-uptime": "UPTIME",
    // Features
    "features-title": "Why <span class='text-[#00c8e0]'>Nexoria?</span>",
    "features-sub": "Everything you need, in one place",
    // Store Page
    "store-title": "The <span class='text-[#00c8e0]'>Store</span>",
    "store-desc": "340+ products for gamers, by gamers",
    // Community Page
    "comm-title": "Community <span class='text-[#00c8e0]'>Hub</span>",
    "comm-desc": "12,000+ members — share, discuss, grow",
    "btn-new-post": "+ New Post",
    // Support Page
    "supp-title": "How can we <span class='text-[#00c8e0]'>help?</span>",
    "supp-desc": "Our support team is available 24/7",
    // CTA & Footer
    "cta-title": "Ready to <span class='text-[#00c8e0]'>Join?</span>",
    "cta-btn": "Get Started Free",
    "footer-rights": "© 2024 Nexoria Hub. All rights reserved."
  },
  ar: {
    // Navbar
    "nav-home": "الرئيسية",
    "nav-store": "المتجر",
    "nav-community": "المجتمع",
    "nav-support": "الدعم",
    "nav-login": "دخول",
    // Hero
    "hero-badge": "مركز الألعاب — تأسس 2024",
    "hero-title": "نيكسوريا <span class='text-[#00c8e0] glow-text'>هاب</span>",
    "hero-desc": "وجهتك المركزية لأدوات الألعاب، المنتجات الحصرية، والمجتمع المتنامي.",
    "btn-store": "تصفح المتجر",
    // Stats
    "stat-members": "الأعضاء",
    "stat-products": "المنتجات",
    "stat-uptime": "الاستقرار",
    // Features
    "features-title": "لماذا <span class='text-[#00c8e0]'>نيكسوريا؟</span>",
    "features-sub": "كل ما تحتاجه في مكان واحد",
    // Store Page
    "store-title": "الـ <span class='text-[#00c8e0]'>متجر</span>",
    "store-desc": "أكثر من 340 منتج مخصص للاعبين",
    // Community Page
    "comm-title": "مركز <span class='text-[#00c8e0]'>المجتمع</span>",
    "comm-desc": "أكثر من 12,000 عضو — شارك، ناقش، وتطور",
    "btn-new-post": "+ منشور جديد",
    // Support Page
    "supp-title": "كيف يمكننا <span class='text-[#00c8e0]'>مساعدتك؟</span>",
    "supp-desc": "فريق الدعم متاح على مدار الساعة",
    // CTA & Footer
    "cta-title": "مستعد <span class='text-[#00c8e0]'>للانضمام؟</span>",
    "cta-btn": "ابدأ مجاناً الآن",
    "footer-rights": "© 2024 نيكسوريا هاب. جميع الحقوق محفوظة."
  }
};

function setLanguage(lang) {
  localStorage.setItem('nxh-lang', lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  document.body.style.fontFamily = lang === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
}

function toggleLang() {
  const currentLang = localStorage.getItem('nxh-lang') || 'en';
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('nxh-lang') || 'en';
  setLanguage(savedLang);
});