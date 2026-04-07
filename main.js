const translations = {
    ar: {
        nav_home: "الرئيسية", nav_store: "المتجر", nav_community: "المجتمع", nav_support: "الدعم",
        badge: "الجيل القادم من التقنية",
        title: "NEXORIA <span class='text-cyan-500'>HUB</span>",
        desc: "المكان الأول للأتمتة، الألعاب، والتقنيات المستقبلية. مشروع ساني القادم الذي سيغير قواعد اللعبة.",
        btn_store: "تصفح المتجر", btn_login: "تسجيل الدخول",
        why_title: "لماذا تختار NXH؟",
        feat1_title: "أداء فائق", feat1_desc: "برمجيات وأدوات محسنة لأقصى درجات السرعة دون أي تقطيع.",
        feat2_title: "حماية متطورة", feat2_desc: "أنظمة أمان مدمجة وبروكسيات لحماية هويتك الرقمية بالكامل.",
        feat3_title: "مجتمع محترفين", feat3_desc: "تواصل مع لاعبين ومطورين محترفين وكن جزءاً من عائلتنا.",
        footer: "NXH ECOSYSTEM &copy; 2026 | BUILT & DESIGNED BY SANY",
        
        // كلمات المتجر
        store_title: "قائمة <span class='text-cyan-500'>المنتجات</span>", store_desc: "اختر من بين أقوى البرمجيات والخدمات التقنية",
        prod1_title: "NXH Core Bot", prod1_desc: "بوت حماية وأتمتة متكامل لسيرفرات الديسكورد.",
        prod2_title: "RE Mod Manager", prod2_desc: "أداة احترافية لإدارة مودات Resident Evil بضغطة زر.",
        prod3_title: "Ultra VPN Pro", prod3_desc: "حماية كاملة لاتصالك أثناء الألعاب ببروتوكولات مشفرة.",
        buy_btn: "شراء",
        
        // كلمات المجتمع والدعم
        comm_title: "عائلة <span class='text-[#5865F2]'>NXH</span>", comm_desc: "المقر الرسمي للمطورين واللاعبين. انضم الآن وكن جزءاً من المناقشات التقنية.", comm_btn: "دخول السيرفر",
        supp_title: "هل تحتاج لمساعدة؟", supp_desc: "نحن هنا لمساعدة ساني ومجتمعه في أي وقت.", supp_btn: "افتح تذكرة دعم (Discord)",
        
        // كلمات صفحة الدخول
        login_title: "NXH <span class='bg-cyan-500 text-black px-2 rounded-lg'>ID</span>", login_desc: "اختر المنصة المفضلة للدخول إلى النظام",
        login_discord: "Login with Discord", login_google: "Sign in with Google", login_github: "Login with GitHub", login_back: "العودة للرئيسية"
    },
    en: {
        nav_home: "Home", nav_store: "Store", nav_community: "Community", nav_support: "Support",
        badge: "Next Gen Technology",
        title: "NEXORIA <span class='text-cyan-500'>HUB</span>",
        desc: "The ultimate place for automation, gaming, and future tech. Sany's upcoming game-changing project.",
        btn_store: "Browse Store", btn_login: "Login",
        why_title: "Why Choose NXH?",
        feat1_title: "High Performance", feat1_desc: "Optimized software and tools for maximum speed without any lag.",
        feat2_title: "Advanced Security", feat2_desc: "Built-in security systems and complex proxies to protect your digital identity.",
        feat3_title: "Pro Community", feat3_desc: "Connect with professional gamers and developers and be part of our family.",
        footer: "NXH ECOSYSTEM &copy; 2026 | BUILT & DESIGNED BY SANY",
        
        // Store Words
        store_title: "Product <span class='text-cyan-500'>List</span>", store_desc: "Choose from the most powerful software and tech services",
        prod1_title: "NXH Core Bot", prod1_desc: "An integrated protection and automation bot for Discord servers.",
        prod2_title: "RE Mod Manager", prod2_desc: "A professional tool to manage Resident Evil mods with one click.",
        prod3_title: "Ultra VPN Pro", prod3_desc: "Complete protection for your connection during gaming with encrypted protocols.",
        buy_btn: "Purchase",
        
        // Community & Support Words
        comm_title: "<span class='text-[#5865F2]'>NXH</span> Family", comm_desc: "The official headquarters for developers and gamers. Join now.", comm_btn: "Enter Server",
        supp_title: "Need Help?", supp_desc: "We are here to help Sany and his community at any time.", supp_btn: "Open a Support Ticket",
        
        // Login Words
        login_title: "NXH <span class='bg-cyan-500 text-black px-2 rounded-lg'>ID</span>", login_desc: "Select your preferred platform to access the system",
        login_discord: "Login with Discord", login_google: "Sign in with Google", login_github: "Login with GitHub", login_back: "Back to Home"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let currentLang = localStorage.getItem('nxh_language') || 'ar'; 
    const langBtn = document.getElementById('lang-btn');
    const htmlTag = document.documentElement; 

    function applyLanguage(lang) {
        htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        htmlTag.setAttribute('lang', lang);
        
        if(langBtn) {
            langBtn.innerHTML = lang === 'ar' ? '🌐 EN' : '🌐 AR';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    applyLanguage(currentLang);

    if(langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('nxh_language', currentLang); 
            applyLanguage(currentLang);
        });
    }
});