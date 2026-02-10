const LANGUAGE_STORAGE_KEY = "ka-language";

const translations = {
  en: {
    meta_title: "Khadhami Academy | Future-Ready Learning for Kids",
    meta_description: "Khadhami Academy is a modern learning platform for coding, AI, robotics, and STEM. Safe by design, bilingual, and built for real outcomes.",

    skip_to_content: "Skip to content",
    brand_subtitle: "Khadhami Academy",
    lang_toggle: "العربية",
    toggle_menu: "Toggle navigation menu",
    toggle_language: "Switch language",
    toggle_theme: "Switch light or dark theme",

    nav_features: "Features",
    nav_experience: "Experience",
    nav_pathways: "Pathways",
    nav_safety: "Safety",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    nav_legal: "Legal",
    nav_get_app: "Get the app",

    hero_eyebrow: "Future skills, built with precision",
    hero_title: "Global-caliber learning for <span class='highlight'>future innovators</span>",
    hero_subtitle: "اكاديمية الخضمي gives families a safe and premium platform for coding, AI, robotics, and STEM mastery.",
    hero_cta_primary: "Download the app",
    hero_cta_secondary: "Explore platform",

    store_google_meta: "GET IT ON",
    store_apple_meta: "Download on the",

    preview_tagline: "Performance-driven learning platform",
    kpi_students: "Active learners",
    kpi_lessons: "Learning lessons",
    kpi_satisfaction: "Parent satisfaction",
    feed_item_1: "Live Class: Python Fundamentals",
    feed_status_live: "Live",
    feed_item_2: "Robotics Lab Challenge",
    feed_status_new: "New",
    feed_item_3: "AI for Young Innovators",
    feed_status_hot: "Hot",

    proof_students: "Learners progressing weekly",
    proof_tracks: "Structured pathways",
    proof_frameworks: "Learning frameworks",
    proof_support: "Technical support readiness",

    showcase_eyebrow: "Real app experience",
    showcase_title: "Inside the actual product families use every day",
    showcase_subtitle: "Explore authentic screenshots from the live application across learning, coding, safety, and progress journeys.",
    showcase_tabs_aria: "App screenshot categories",
    showcase_tab_learning: "Learning flow",
    showcase_tab_coding: "Coding labs",
    showcase_tab_safety: "Safety and onboarding",
    showcase_tab_progress: "Progress and profile",
    showcase_reel_aria: "Animated app screenshot gallery",
    showcase_reel_title: "Complete visual tour of the product",
    showcase_reel_subtitle: "Every major app screen is showcased below. Click any screenshot to expand and inspect details.",
    showcase_lightbox_aria: "Screenshot viewer",
    showcase_lightbox_close: "Close screenshot viewer",
    showcase_lightbox_prev: "Previous screenshot",
    showcase_lightbox_next: "Next screenshot",
    showcase_lightbox_hint: "Use arrow keys to browse screenshots.",

    showcase_learning_title: "Daily learning flow built for consistency",
    showcase_learning_desc: "The learner journey is designed for momentum, from lesson discovery to class participation and guided review.",
    showcase_learning_point_1: "Clear next-step recommendations for every learner.",
    showcase_learning_point_2: "Quick access to live classrooms and structured modules.",
    showcase_learning_point_3: "Readable interface for both students and parents.",

    showcase_coding_title: "Hands-on coding labs with instant feedback",
    showcase_coding_desc: "Students write real code, run it directly, and iterate quickly with project-based guidance.",
    showcase_coding_point_1: "Integrated editors for Python and web development.",
    showcase_coding_point_2: "Output panels to verify logic and debug faster.",
    showcase_coding_point_3: "Built-in progression from fundamentals to practical projects.",

    showcase_safety_title: "Onboarding and controls designed for child safety",
    showcase_safety_desc: "Identity, account setup, and settings flows align with parent visibility and safer usage standards.",
    showcase_safety_point_1: "Structured onboarding for both adults and minors.",
    showcase_safety_point_2: "Professional settings center for responsible account control.",
    showcase_safety_point_3: "Consistent UX that reduces mistakes and improves trust.",

    showcase_progress_title: "Progress insights and personalized learning context",
    showcase_progress_desc: "Students and families can track growth, review material, and navigate personalized content from one place.",
    showcase_progress_point_1: "Performance visibility through dashboard-driven metrics.",
    showcase_progress_point_2: "Profile and identity areas tailored for each learner.",
    showcase_progress_point_3: "Media players and snippets to reinforce retention.",

    shot_home_caption: "Home dashboard with key learning widgets.",
    shot_home_alt: "Home dashboard with key learning widgets.",
    shot_home_2_caption: "Secondary home experience with personalized modules.",
    shot_home_2_alt: "Secondary home experience with personalized modules.",
    shot_about_caption: "About screen highlighting academy value and mission.",
    shot_about_alt: "About screen highlighting academy value and mission.",
    shot_live_caption: "Live classroom listing for active sessions.",
    shot_live_alt: "Live classroom listing for active sessions.",

    shot_python_output_caption: "Python editor with code execution output.",
    shot_python_output_alt: "Python editor with code execution output.",
    shot_code_editor_caption: "Code editor interface for lesson-based exercises.",
    shot_code_editor_alt: "Code editor interface for lesson-based exercises.",
    shot_web_editor_caption: "Web code editor workspace for HTML and CSS practice.",
    shot_web_editor_alt: "Web code editor workspace for HTML and CSS practice.",
    shot_web_output_caption: "Web editor with rendered output preview.",
    shot_web_output_alt: "Web editor with rendered output preview.",

    shot_signup_under18_caption: "Under-18 signup flow with guardian context.",
    shot_signup_under18_alt: "Under-18 signup flow with guardian context.",
    shot_login_caption: "Secure login interface.",
    shot_login_alt: "Secure login interface.",
    shot_signup_caption: "Standard signup workflow for account creation.",
    shot_signup_alt: "Standard signup workflow for account creation.",
    shot_settings_caption: "Settings panel with detailed account controls.",
    shot_settings_alt: "Settings panel with detailed account controls.",

    shot_progress_caption: "Progress dashboard with learning analytics.",
    shot_progress_alt: "Progress dashboard with learning analytics.",
    shot_profile_caption: "User profile and account details screen.",
    shot_profile_alt: "User profile and account details screen.",
    shot_playlist_caption: "Playlist player for lesson playback.",
    shot_playlist_alt: "Playlist player for lesson playback.",
    shot_snippets_caption: "Snippets player for short learning clips.",
    shot_snippets_alt: "Snippets player for short learning clips.",

    features_eyebrow: "Platform capabilities",
    features_title: "Everything needed for elite digital learning",
    features_subtitle: "From live classes to structured mastery analytics, every part of the experience is built for outcomes.",
    feature_1_title: "Live Classrooms",
    feature_1_desc: "Interactive sessions with real educators, whiteboards, and instant feedback.",
    feature_2_title: "Code Playground",
    feature_2_desc: "Practice Python and web coding directly inside the platform with guided projects.",
    feature_3_title: "AI and Robotics Labs",
    feature_3_desc: "Hands-on tracks that connect theory with real engineering problem-solving.",
    feature_4_title: "Parental Controls",
    feature_4_desc: "Family-safe controls including content boundaries and time management.",
    feature_5_title: "Offline Learning",
    feature_5_desc: "Download selected lessons and continue learning without internet disruptions.",
    feature_6_title: "Progress Intelligence",
    feature_6_desc: "Visual dashboards track mastery, consistency, and growth opportunities.",

    pathways_eyebrow: "Learning architecture",
    pathways_title: "Engineered with globally trusted methods",
    pathways_subtitle: "Our curriculum is intentionally built around execution frameworks used by top-performing organizations.",
    method_kaizen: "Small, continuous improvements that compound into long-term mastery.",
    method_agile: "Fast feedback loops and adaptive learning plans for every student.",
    method_sixsigma: "Quality-first delivery that reduces gaps and reinforces fundamentals.",
    method_lean: "Focus on high-impact skills, remove noise, maximize learning value.",

    timeline_title: "How growth is managed",
    timeline_step_1_title: "Assess",
    timeline_step_1_desc: "Initial baseline and skill-map creation.",
    timeline_step_2_title: "Plan",
    timeline_step_2_desc: "Personalized pathway with weekly goals.",
    timeline_step_3_title: "Execute",
    timeline_step_3_desc: "Live classes, labs, and guided project cycles.",
    timeline_step_4_title: "Optimize",
    timeline_step_4_desc: "Data-informed iteration with family visibility.",

    safety_eyebrow: "Trust and compliance",
    safety_title: "Safety, privacy, and child protection by default",
    safety_subtitle: "We design every workflow around child protection principles, transparent policies, and accountable operations.",
    safety_1: "Parental consent flows for minors",
    safety_2: "Clear data handling and retention policy",
    safety_3: "Moderated communication surfaces",
    safety_4: "Full account deletion and complete personal data removal from database",

    legal_cta_title: "Publish-ready legal center",
    legal_cta_desc: "Access all policies required for publishing and trust review workflows.",
    link_privacy: "Privacy Policy",
    link_terms: "Terms of Service",
    link_cookies: "Cookie Policy",
    link_child_safety: "Child Safety Policy",
    link_data_deletion: "Data Deletion",

    pricing_eyebrow: "Simple pricing",
    pricing_title: "Start free, scale when ready",
    pricing_subtitle: "Pricing is transparent, with clear monthly cost and SAR equivalent.",
    plan_free_title: "Starter",
    plan_free_period: "forever",
    plan_free_1: "Core lessons access",
    plan_free_2: "Selected live sessions",
    plan_free_3: "Basic progress tracking",
    plan_free_cta: "Start free",
    plan_pro_badge: "Most popular",
    plan_pro_title: "Pro",
    plan_pro_price_main: "$19.99",
    plan_pro_period: "per month",
    plan_pro_price_sar: "Approx. <span class='sar-symbol' aria-hidden='true'>&#x20C1;</span> 74.96 SAR",
    plan_pro_1: "Unlimited premium content",
    plan_pro_2: "Full code and AI labs",
    plan_pro_3: "Offline downloads",
    plan_pro_4: "Priority support",
    plan_pro_cta: "Upgrade to Pro",

    faq_eyebrow: "Questions",
    faq_title: "Frequently asked questions",
    faq_q1: "Is the platform suitable for beginners?",
    faq_a1: "Yes. Learning pathways start from fundamentals and adapt to student pace.",
    faq_q2: "How is child safety handled?",
    faq_a2: "We use moderated interactions, parental controls, and policy-based protections for minors.",
    faq_q3: "Can learners study offline?",
    faq_a3: "Yes. Selected lessons can be downloaded for offline access in supported plans.",
    faq_q4: "Where can I read legal policies?",
    faq_a4: "You can access Privacy Policy, Terms, Cookies, Child Safety, and Data Deletion pages in the legal center.",

    download_eyebrow: "Launch now",
    download_title: "Ready to build your child’s future advantage?",
    download_subtitle: "Download اكاديمية الخضمي and start a world-class learning journey today.",
    download_google: "Get it on Google Play",
    download_apple: "Download on App Store",

    legal_eyebrow: "Legal and publishing",
    legal_title: "Everything required for public release",
    legal_card_privacy: "How user data is collected, used, protected, and retained.",
    legal_card_terms: "Service rules, account obligations, subscriptions, and liability terms.",
    legal_card_cookies: "Cookie categories, preferences, and browser control options.",
    legal_card_child_safety: "Safeguards, moderation model, and parent reporting channels.",
    legal_card_data_deletion: "Full account deletion and complete personal data removal from database.",

    footer_tagline: "Engineering the next generation of innovators.",
    footer_product: "Product",
    footer_legal: "Legal",
    footer_contact: "Contact",
    copyright_prefix: "Copyright",
    copyright_text: "Khadhami Academy. All rights reserved.",

    cookie_aria: "Cookie consent",
    cookie_message: "We use essential and analytics cookies to improve learning performance and platform quality.",
    cookie_decline: "Decline",
    cookie_accept: "Accept"
  },

  ar: {
    meta_title: "اكاديمية الخضمي | تعلم متقدم لأبناء المستقبل",
    meta_description: "اكاديمية الخضمي منصة تعليمية حديثة للبرمجة والذكاء الاصطناعي والروبوتات والعلوم التقنية، آمنة ومصممة بنتائج واضحة.",

    skip_to_content: "تخطي إلى المحتوى",
    brand_subtitle: "Khadhami Academy",
    lang_toggle: "English",
    toggle_menu: "فتح أو إغلاق قائمة التنقل",
    toggle_language: "تغيير اللغة",
    toggle_theme: "تبديل الوضع الفاتح أو الداكن",

    nav_features: "المزايا",
    nav_experience: "التجربة",
    nav_pathways: "المسارات",
    nav_safety: "الأمان",
    nav_pricing: "الأسعار",
    nav_faq: "الأسئلة",
    nav_legal: "السياسات",
    nav_get_app: "تحميل التطبيق",

    hero_eyebrow: "مهارات المستقبل، بتصميم هندسي",
    hero_title: "تجربة تعليم عالمية لصنّاع <span class='highlight'>ابتكار المستقبل</span>",
    hero_subtitle: "اكاديمية الخضمي تقدم للأسر منصة آمنة ومتميزة لتعلم البرمجة والذكاء الاصطناعي والروبوتات والعلوم التقنية.",
    hero_cta_primary: "تحميل التطبيق",
    hero_cta_secondary: "استكشف المنصة",

    store_google_meta: "حمّل من",
    store_apple_meta: "تنزيل عبر",

    preview_tagline: "منصة تعليم مبنية على الأداء",
    kpi_students: "متعلم نشط",
    kpi_lessons: "درس تعليمي",
    kpi_satisfaction: "رضا أولياء الأمور",
    feed_item_1: "فصل مباشر: أساسيات Python",
    feed_status_live: "مباشر",
    feed_item_2: "تحدي مختبر الروبوتات",
    feed_status_new: "جديد",
    feed_item_3: "الذكاء الاصطناعي للمبتكرين الصغار",
    feed_status_hot: "مميز",

    proof_students: "متعلمين يتقدمون أسبوعيا",
    proof_tracks: "مسارات تعليمية منظمة",
    proof_frameworks: "أطر تعلم منهجية",
    proof_support: "جاهزية الدعم التقني",

    showcase_eyebrow: "تجربة التطبيق الحقيقية",
    showcase_title: "داخل المنتج الحقيقي الذي تستخدمه الأسر يومياً",
    showcase_subtitle: "استعرض لقطات فعلية من التطبيق المباشر عبر مسارات التعلم والبرمجة والأمان والتقدم.",
    showcase_tabs_aria: "تصنيفات لقطات التطبيق",
    showcase_tab_learning: "رحلة التعلم",
    showcase_tab_coding: "مختبرات البرمجة",
    showcase_tab_safety: "الأمان والانضمام",
    showcase_tab_progress: "التقدم والملف الشخصي",
    showcase_reel_aria: "معرض متحرك للقطات التطبيق",
    showcase_reel_title: "جولة بصرية كاملة داخل المنتج",
    showcase_reel_subtitle: "جميع الشاشات الرئيسية للتطبيق معروضة أدناه. اضغط على أي لقطة لتكبيرها واستعراض التفاصيل.",
    showcase_lightbox_aria: "عارض لقطات الشاشة",
    showcase_lightbox_close: "إغلاق عارض اللقطات",
    showcase_lightbox_prev: "اللقطة السابقة",
    showcase_lightbox_next: "اللقطة التالية",
    showcase_lightbox_hint: "استخدم أسهم لوحة المفاتيح للتنقل بين اللقطات.",

    showcase_learning_title: "رحلة تعلم يومية مبنية على الاستمرارية",
    showcase_learning_desc: "تجربة الطالب مصممة للحفاظ على الزخم من اكتشاف الدروس إلى المشاركة في الفصول والمراجعة الموجهة.",
    showcase_learning_point_1: "توصيات واضحة للخطوة التالية لكل متعلم.",
    showcase_learning_point_2: "وصول سريع للفصول المباشرة والوحدات المنظمة.",
    showcase_learning_point_3: "واجهة واضحة للطلاب وأولياء الأمور.",

    showcase_coding_title: "مختبرات برمجة عملية مع تغذية راجعة فورية",
    showcase_coding_desc: "الطلاب يكتبون كوداً حقيقياً ويشغلونه مباشرة ويتطورون بسرعة عبر تعلم قائم على المشاريع.",
    showcase_coding_point_1: "محررات مدمجة للـ Python وتطوير الويب.",
    showcase_coding_point_2: "نوافذ مخرجات لفحص المنطق وتسريع التصحيح.",
    showcase_coding_point_3: "تدرج واضح من الأساسيات إلى المشاريع التطبيقية.",

    showcase_safety_title: "انضمام وإعدادات مصممة لحماية الطفل",
    showcase_safety_desc: "تدفقات الهوية وإنشاء الحساب والإعدادات متوافقة مع وضوح المتابعة الأسرية ومعايير الاستخدام الآمن.",
    showcase_safety_point_1: "انضمام منظم للبالغين والقُصّر.",
    showcase_safety_point_2: "مركز إعدادات احترافي للتحكم المسؤول بالحساب.",
    showcase_safety_point_3: "تجربة متسقة تقلل الأخطاء وتعزز الثقة.",

    showcase_progress_title: "رؤى تقدم وسياق تعلم مخصص",
    showcase_progress_desc: "الطلاب والأسر يتابعون النمو ويستعرضون المحتوى ويتنقلون في تجربة شخصية من مكان واحد.",
    showcase_progress_point_1: "وضوح الأداء عبر مؤشرات مبنية على لوحة متابعة.",
    showcase_progress_point_2: "مساحات ملف وهوية مخصصة لكل متعلم.",
    showcase_progress_point_3: "مشغلات وسائط ومقاطع قصيرة لتعزيز الاستيعاب.",

    shot_home_caption: "لوحة رئيسية تضم أهم عناصر التعلم.",
    shot_home_alt: "لوحة رئيسية تضم أهم عناصر التعلم.",
    shot_home_2_caption: "واجهة رئيسية بديلة بمحتوى مخصص.",
    shot_home_2_alt: "واجهة رئيسية بديلة بمحتوى مخصص.",
    shot_about_caption: "صفحة تعريف توضح قيمة الأكاديمية ورسالتها.",
    shot_about_alt: "صفحة تعريف توضح قيمة الأكاديمية ورسالتها.",
    shot_live_caption: "قائمة الفصول المباشرة والجلسات النشطة.",
    shot_live_alt: "قائمة الفصول المباشرة والجلسات النشطة.",

    shot_python_output_caption: "محرر Python مع مخرجات تشغيل مباشرة.",
    shot_python_output_alt: "محرر Python مع مخرجات تشغيل مباشرة.",
    shot_code_editor_caption: "واجهة محرر كود لتمارين الدروس.",
    shot_code_editor_alt: "واجهة محرر كود لتمارين الدروس.",
    shot_web_editor_caption: "مساحة محرر ويب لتدريب HTML وCSS.",
    shot_web_editor_alt: "مساحة محرر ويب لتدريب HTML وCSS.",
    shot_web_output_caption: "محرر ويب مع معاينة للمخرجات.",
    shot_web_output_alt: "محرر ويب مع معاينة للمخرجات.",

    shot_signup_under18_caption: "تدفق تسجيل خاص بمن هم دون 18 مع سياق ولي الأمر.",
    shot_signup_under18_alt: "تدفق تسجيل خاص بمن هم دون 18 مع سياق ولي الأمر.",
    shot_login_caption: "واجهة تسجيل دخول آمنة.",
    shot_login_alt: "واجهة تسجيل دخول آمنة.",
    shot_signup_caption: "تدفق تسجيل قياسي لإنشاء الحساب.",
    shot_signup_alt: "تدفق تسجيل قياسي لإنشاء الحساب.",
    shot_settings_caption: "لوحة إعدادات بتفاصيل تحكم متقدمة.",
    shot_settings_alt: "لوحة إعدادات بتفاصيل تحكم متقدمة.",

    shot_progress_caption: "لوحة تقدم تعرض تحليلات التعلم.",
    shot_progress_alt: "لوحة تقدم تعرض تحليلات التعلم.",
    shot_profile_caption: "شاشة الملف الشخصي وتفاصيل الحساب.",
    shot_profile_alt: "شاشة الملف الشخصي وتفاصيل الحساب.",
    shot_playlist_caption: "مشغل قوائم تشغيل للدروس.",
    shot_playlist_alt: "مشغل قوائم تشغيل للدروس.",
    shot_snippets_caption: "مشغل مقاطع قصيرة للتعلم السريع.",
    shot_snippets_alt: "مشغل مقاطع قصيرة للتعلم السريع.",

    features_eyebrow: "قدرات المنصة",
    features_title: "كل ما يلزم لتعلم تقني متقدم",
    features_subtitle: "من الفصول المباشرة إلى تحليلات الإتقان، كل جزء في التجربة مبني لتحقيق نتائج فعلية.",
    feature_1_title: "الفصول المباشرة",
    feature_1_desc: "جلسات تفاعلية مع معلمين حقيقيين وسبورات وملاحظات فورية.",
    feature_2_title: "ملعب البرمجة",
    feature_2_desc: "تدرب على Python وتطوير الويب داخل المنصة بمشاريع موجهة.",
    feature_3_title: "مختبرات الذكاء والروبوتات",
    feature_3_desc: "مسارات عملية تربط المفاهيم بالتطبيق الهندسي الحقيقي.",
    feature_4_title: "الرقابة الأبوية",
    feature_4_desc: "تحكم أسري آمن يتضمن حدود المحتوى وإدارة وقت الاستخدام.",
    feature_5_title: "التعلم دون إنترنت",
    feature_5_desc: "تحميل الدروس المختارة واستكمال التعلم بدون انقطاع.",
    feature_6_title: "تحليلات التقدم",
    feature_6_desc: "لوحات متابعة ذكية لقياس الإتقان والاستمرارية وفرص التحسين.",

    pathways_eyebrow: "معمارية التعلم",
    pathways_title: "مصممة بأطر عالمية موثوقة",
    pathways_subtitle: "منهجنا مبني على أنظمة تنفيذ تستخدمها الجهات الأعلى أداء حول العالم.",
    method_kaizen: "تحسينات صغيرة مستمرة تتراكم لتنتج إتقاناً طويل المدى.",
    method_agile: "دورات تغذية راجعة سريعة وخطط تعلم مرنة لكل طالب.",
    method_sixsigma: "تركيز على الجودة لتقليل الفجوات وتعزيز الأساسيات.",
    method_lean: "تركيز على المهارات الأعلى أثراً وتقليل أي هدر تعليمي.",

    timeline_title: "كيف تتم إدارة النمو",
    timeline_step_1_title: "Assess",
    timeline_step_1_desc: "تقييم البداية وبناء خريطة المهارات.",
    timeline_step_2_title: "Plan",
    timeline_step_2_desc: "مسار مخصص مع أهداف أسبوعية واضحة.",
    timeline_step_3_title: "Execute",
    timeline_step_3_desc: "فصول مباشرة ومختبرات ودورات مشاريع عملية.",
    timeline_step_4_title: "Optimize",
    timeline_step_4_desc: "تحسين مستمر بناء على البيانات ومتابعة الأسرة.",

    safety_eyebrow: "الثقة والامتثال",
    safety_title: "الأمان والخصوصية وحماية الطفل بشكل افتراضي",
    safety_subtitle: "نصمم كل رحلة تعلم وفق مبادئ حماية الطفل والسياسات الواضحة والمسؤولية التشغيلية.",
    safety_1: "تدفقات موافقة ولي الأمر للقُصّر",
    safety_2: "سياسة واضحة لجمع البيانات وحفظها",
    safety_3: "قنوات تواصل خاضعة للإشراف",
    safety_4: "حذف كامل للحساب وإزالة جميع البيانات الشخصية من قاعدة البيانات",

    legal_cta_title: "مركز سياسات جاهز للنشر",
    legal_cta_desc: "وصول مباشر لكل السياسات المطلوبة للنشر والمراجعات التنظيمية.",
    link_privacy: "سياسة الخصوصية",
    link_terms: "شروط الخدمة",
    link_cookies: "سياسة الكوكيز",
    link_child_safety: "سياسة سلامة الطفل",
    link_data_deletion: "حذف البيانات",

    pricing_eyebrow: "أسعار بسيطة",
    pricing_title: "ابدأ مجاناً ثم طوّر عند الحاجة",
    pricing_subtitle: "تسعير واضح مع تكلفة شهرية ثابتة وإظهار المقابل بالريال السعودي.",
    plan_free_title: "Starter",
    plan_free_period: "للأبد",
    plan_free_1: "وصول إلى الدروس الأساسية",
    plan_free_2: "جلسات مباشرة مختارة",
    plan_free_3: "متابعة تقدم أساسية",
    plan_free_cta: "ابدأ مجاناً",
    plan_pro_badge: "الأكثر اختياراً",
    plan_pro_title: "Pro",
    plan_pro_price_main: "$19.99",
    plan_pro_period: "شهرياً",
    plan_pro_price_sar: "ما يعادل تقريباً <span class='sar-symbol' aria-hidden='true'>&#x20C1;</span> 74.96 SAR",
    plan_pro_1: "وصول غير محدود للمحتوى المتميز",
    plan_pro_2: "مختبرات البرمجة والذكاء كاملة",
    plan_pro_3: "تحميل الدروس دون إنترنت",
    plan_pro_4: "دعم ذو أولوية",
    plan_pro_cta: "الترقية إلى Pro",

    faq_eyebrow: "الأسئلة",
    faq_title: "الأسئلة الشائعة",
    faq_q1: "هل المنصة مناسبة للمبتدئين؟",
    faq_a1: "نعم، المسارات تبدأ من الأساسيات وتتكيّف مع سرعة تعلم الطالب.",
    faq_q2: "كيف تتم حماية الأطفال داخل المنصة؟",
    faq_a2: "نطبق إشرافاً على التفاعل، ورقابة أبوية، وسياسات حماية مخصصة للقُصّر.",
    faq_q3: "هل يمكن التعلم بدون إنترنت؟",
    faq_a3: "نعم، يمكن تحميل الدروس المختارة للتعلم دون اتصال في الخطط المدعومة.",
    faq_q4: "أين أجد السياسات القانونية؟",
    faq_a4: "يمكنك الوصول إلى سياسة الخصوصية والشروط والكوكيز وسلامة الطفل وحذف البيانات من مركز السياسات.",

    download_eyebrow: "ابدأ الآن",
    download_title: "جاهز لبناء ميزة مستقبلية قوية لطفلك؟",
    download_subtitle: "حمّل اكاديمية الخضمي وابدأ رحلة تعلم عالمية اليوم.",
    download_google: "حمّل من Google Play",
    download_apple: "حمّل من App Store",

    legal_eyebrow: "السياسات والنشر",
    legal_title: "كل ما يلزم للإطلاق والنشر العام",
    legal_card_privacy: "كيف نجمع بيانات المستخدم ونستخدمها ونحميها ونحتفظ بها.",
    legal_card_terms: "قواعد الخدمة والتزامات الحساب والاشتراكات وحدود المسؤولية.",
    legal_card_cookies: "أنواع الكوكيز وتفضيلات الاستخدام وخيارات التحكم.",
    legal_card_child_safety: "ضوابط السلامة ونموذج الإشراف وقنوات الإبلاغ.",
    legal_card_data_deletion: "حذف كامل للحساب وإزالة جميع البيانات الشخصية من قاعدة البيانات.",

    footer_tagline: "نبني جيلاً جديداً من المبتكرين.",
    footer_product: "المنتج",
    footer_legal: "السياسات",
    footer_contact: "التواصل",
    copyright_prefix: "جميع الحقوق",
    copyright_text: "محفوظة لاكاديمية الخضمي.",

    cookie_aria: "موافقة استخدام الكوكيز",
    cookie_message: "نستخدم ملفات تعريف الارتباط الأساسية والتحليلية لتحسين جودة المنصة ونتائج التعلم.",
    cookie_decline: "رفض",
    cookie_accept: "موافقة"
  }
};

function detectBrowserLanguage() {
  const language = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  return language.startsWith("ar") ? "ar" : "en";
}

function readStoredLanguage() {
  try {
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return language === "ar" || language === "en" ? language : null;
  } catch (error) {
    return null;
  }
}

function persistLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Ignore persistence errors (private mode or storage restrictions).
  }
}

let currentLanguage = readStoredLanguage() || detectBrowserLanguage();

function updateMeta(language) {
  const content = translations[language];
  if (!content) return;

  document.title = content.meta_title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", content.meta_description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", content.meta_title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", content.meta_description);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", content.meta_title);

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute("content", content.meta_description);
}

function setLanguage(language, options = {}) {
  const { persist = true } = options;
  currentLanguage = translations[language] ? language : detectBrowserLanguage();
  const content = translations[currentLanguage];
  if (!content) return;

  if (persist) {
    persistLanguage(currentLanguage);
  }

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (content[key] !== undefined) {
      element.textContent = content[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (content[key] !== undefined) {
      element.innerHTML = content[key];
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");
    if (content[key] !== undefined) {
      element.setAttribute("alt", content[key]);
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria");
    if (content[key] !== undefined) {
      element.setAttribute("aria-label", content[key]);
    }
  });

  updateMeta(currentLanguage);

  document.dispatchEvent(
    new CustomEvent("ka:language-change", {
      detail: { language: currentLanguage }
    })
  );
}

function toggleLanguage() {
  setLanguage(currentLanguage === "ar" ? "en" : "ar");
}

function getCurrentLanguage() {
  return currentLanguage;
}

function initI18n() {
  setLanguage(readStoredLanguage() || detectBrowserLanguage(), { persist: false });
}

window.KAi18n = {
  initI18n,
  setLanguage,
  toggleLanguage,
  getCurrentLanguage,
  translations
};
