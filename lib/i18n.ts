export const languages = {
  en: "English",
  hi: "हिंदी",
  gu: "ગુજરાતી",
} as const

export type Language = keyof typeof languages

export const defaultLanguage: Language = "en"

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About Us",
    products: "Products",
    buyers: "Buyers Directory",
    contact: "Contact",

    // Hero Section
    heroTitle: "Premium Fruit Exports Worldwide",
    heroSubtitle: "Connecting India's finest fruits to global markets with quality, trust, and excellence",
    heroButton: "Explore Products",

    // About Section
    aboutTitle: "About Sai Sagar Global",
    aboutDescription:
      "With over 2 years of experience in fruit export, we are committed to delivering the highest quality Indian fruits to international markets. Our state-of-the-art facilities and rigorous quality control ensure that every fruit meets international standards.",

    // Products Section
    productsTitle: "Our Premium Products",
    productsSubtitle: "Discover our range of fresh, high-quality fruits sourced directly from the best farms in India",
    viewAll: "View All Products",

    // Contact
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Ready to start your fruit import journey? Contact us today for competitive quotes and reliable service.",

    // Footer
    quickLinks: "Quick Links",
    contactInfo: "Contact Information",
    followUs: "Follow Us",
    newsletter: "Stay Updated with Market Trends",
    newsletterDesc: "Get the latest updates on fruit prices, harvest seasons, and export opportunities",

    // Features
    globalReach: "Global Reach",
    globalReachDesc: "Exporting to 25+ countries worldwide",
    qualityAssured: "Quality Assured",
    qualityAssuredDesc: "ISO certified with rigorous quality control",
    fastDelivery: "Fast Delivery",
    fastDeliveryDesc: "Efficient logistics and cold chain management",
    experience: "2+ Years Experience",
    experienceDesc: "Trusted partner in fruit export industry",

    // Stats
    globalBuyers: "Global Buyers",
    countries: "Countries",
    yearsExperience: "Years Experience",
    qualityAssurance: "Quality Assured",

    // Legal Pages
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    certifications: "Certifications",
    backToHome: "Back to Home",

    // Common
    learnMore: "Learn More",
    getQuote: "Get Quote",
    phone: "Phone",
    email: "Email",
    address: "Address",
    subscribe: "Subscribe",
    contactUsNow: "Contact Us Now",
    whatsappContact: "WhatsApp: +91 9730456181",
    trustedBy: "Trusted by 2+ Global Buyers",
    featured: "Featured",
    price: "Price",
    season: "Season",
    origin: "Origin",
    rating: "Rating",
    verifiedBuyers: "From 2+ verified buyers",
  },
  hi: {
    // Navigation
    home: "होम",
    about: "हमारे बारे में",
    products: "उत्पाद",
    buyers: "खरीदार निर्देशिका",
    contact: "संपर्क",

    // Hero Section
    heroTitle: "विश्वव्यापी प्रीमियम फल निर्यात",
    heroSubtitle: "गुणवत्ता, विश्वास और उत्कृष्टता के साथ भारत के बेहतरीन फलों को वैश्विक बाजारों से जोड़ना",
    heroButton: "उत्पाद देखें",

    // About Section
    aboutTitle: "साई सागर ग्लोबल के बारे में",
    aboutDescription:
      "फल निर्यात में 2 से अधिक वर्षों के अनुभव के साथ, हम अंतर्राष्ट्रीय बाजारों में उच्चतम गुणवत्ता वाले भारतीय फल पहुंचाने के लिए प्रतिबद्ध हैं। हमारी अत्याधुनिक सुविधाएं और कठोर गुणवत्ता नियंत्रण यह सुनिश्चित करते हैं कि हर फल अंतर्राष्ट्रीय मानकों को पूरा करे।",

    // Products Section
    productsTitle: "हमारे प्रीमियम उत्पाद",
    productsSubtitle: "भारत के सर्वोत्तम खेतों से सीधे प्राप्त हमारे ताजे, उच्च गुणवत्ता वाले फलों की श्रृंखला खोजें",
    viewAll: "सभी उत्पाद देखें",

    // Contact
    contactTitle: "संपर्क में रहें",
    contactSubtitle: "अपनी फल आयात यात्रा शुरू करने के लिए तैयार हैं? प्रतिस्पर्धी कोटेशन और विश्वसनीय सेवा के लिए आज ही हमसे संपर्क करें।",

    // Footer
    quickLinks: "त्वरित लिंक",
    contactInfo: "संपर्क जानकारी",
    followUs: "हमें फॉलो करें",
    newsletter: "बाजार के रुझानों से अपडेट रहें",
    newsletterDesc: "फलों की कीमतों, फसल के मौसम और निर्यात के अवसरों पर नवीनतम अपडेट प्राप्त करें",

    // Features
    globalReach: "वैश्विक पहुंच",
    globalReachDesc: "25+ देशों में निर्यात",
    qualityAssured: "गुणवत्ता आश्वासित",
    qualityAssuredDesc: "कठोर गुणवत्ता नियंत्रण के साथ ISO प्रमाणित",
    fastDelivery: "तेज़ डिलीवरी",
    fastDeliveryDesc: "कुशल रसद और कोल्ड चेन प्रबंधन",
    experience: "2+ वर्षों का अनुभव",
    experienceDesc: "फल निर्यात उद्योग में विश्वसनीय भागीदार",

    // Stats
    globalBuyers: "वैश्विक खरीदार",
    countries: "देश",
    yearsExperience: "वर्षों का अनुभव",
    qualityAssurance: "गुणवत्ता आश्वासित",

    // Legal Pages
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    certifications: "प्रमाणपत्र",
    backToHome: "होम पर वापस जाएं",

    // Common
    learnMore: "और जानें",
    getQuote: "कोटेशन प्राप्त करें",
    phone: "फोन",
    email: "ईमेल",
    address: "पता",
    subscribe: "सब्सक्राइब करें",
    contactUsNow: "अभी संपर्क करें",
    whatsappContact: "व्हाट्सऐप: +91 9730456181",
    trustedBy: "2+ वैश्विक खरीदारों द्वारा भरोसेमंद",
    featured: "विशेष",
    price: "मूल्य",
    season: "मौसम",
    origin: "मूल",
    rating: "रेटिंग",
    verifiedBuyers: "2+ सत्यापित खरीदारों से",
  },
  gu: {
    // Navigation
    home: "હોમ",
    about: "અમારા વિશે",
    products: "ઉત્પાદનો",
    buyers: "ખરીદદાર ડિરેક્ટરી",
    contact: "સંપર્ક",

    // Hero Section
    heroTitle: "વિિશ્વવ્યાપી પ્રીમિયમ ફળ નિકાસ",
    heroSubtitle: "ગુણવત્તા, વિશ્વાસ અને શ્રેષ્ઠતા સાથે ભારતના શ્રેષ્ઠ ફળોને વાશ્વિક બજારો સાથે જોડવું",
    heroButton: "ઉત્પાદનો જુઓ",

    // About Section
    aboutTitle: "સાઈ સાગર ગ્લોબલ વિશે",
    aboutDescription:
      "ફળ નિકાસમાં 2 વર્ષથી વધુના અનુભવ સાથે, અમે આંતરરાષ્ટ્રીય બજારોમાં સર્વોચ્ચ ગુણવત્તાવાળા ભારતીય ફળો પહોંચાડવા માટે પ્રતિબદ્ધ છીએ. અમારી અત્યાધુનિક સુવિધાઓ અને કડક ગુણવત્તા નિયંત્રણ એ સુનિશ્ચિત કરે છે કે દરેક ફળ આંતરરાષ્ટ્રીય ધોરણોને પૂર્ણ કરે.",

    // Products Section
    productsTitle: "અમારા પ્રીમિયમ ઉત્પાદનો",
    productsSubtitle: "ભારતના શ્રેષ્ઠ ખેતરોમાંથી સીધા મેળવેલા અમારા તાજા, ઉચ્ચ ગુણવત્તાવાળા ફળોની શ્રેણી શોધો",
    viewAll: "બધા ઉત્પાદનો જુઓ",

    // Contact
    contactTitle: "સંપર્કમાં રહો",
    contactSubtitle: "તમારી ફળ આયાત યાત્રા શરૂ કરવા માટે તૈયાર છો? સ્પર્ધાત્મક કોટેશન અને વિશ્વસનીય સેવા માટે આજે જ અમારો સંપર્ક કરો।",

    // Footer
    quickLinks: "ઝડપી લિંક્સ",
    contactInfo: "સંપર્ક માહિતી",
    followUs: "અમને ફોલો કરો",
    newsletter: "બજારના વલણો સાથે અપડેટ રહો",
    newsletterDesc: "ફળોની કિંમતો, લણણીની મોસમ અને નિકાસની તકો પર નવીનતમ અપડેટ મેળવો",

    // Features
    globalReach: "વાશ્વિક પહોંચ",
    globalReachDesc: "25+ દેશોમાં નિકાસ",
    qualityAssured: "ગુણવત્તા ખાતરીપૂર્વક",
    qualityAssuredDesc: "કડક ગુણવત્તા નિયંત્રણ સાથે ISO પ્રમાણિત",
    fastDelivery: "ઝડપી ડિલીવરી",
    fastDeliveryDesc: "કુશળ લોજિસ્ટિક્સ અને કોલ્ડ ચેઇન મેનેજમેન્ટ",
    experience: "2+ વર્ષનો અનુભવ",
    experienceDesc: "ફળ નિકાસ ઉદ્યોગમાં વિશ્વસનીય ભાગીદાર",

    // Stats
    globalBuyers: "વાશ્વિક ખરીદદારો",
    countries: "દેશો",
    yearsExperience: "વર્ષનો અનુભવ",
    qualityAssurance: "ગુણવત્તા ખાતરીપૂર્વક",

    // Legal Pages
    privacyPolicy: "ગોપનીયતા નીતિ",
    termsOfService: "સેવાની શરતો",
    certifications: "પ્રમાણપત્રો",
    backToHome: "હોમ પર પાછા જાઓ",

    // Common
    learnMore: "વધુ જાણો",
    getQuote: "કોટેશન મેળવો",
    phone: "ફોન",
    email: "ઈમેલ",
    address: "સરનામું",
    subscribe: "સબ્સ્ક્રાઇબ કરો",
    contactUsNow: "હવે સંપર્ક કરો",
    whatsappContact: "વ્હાટ્સએપ: +91 9730456181",
    trustedBy: "2+ વાશ્વિક ખરીદદારો દ્વારા વિશ્વસનીય",
    featured: "વિશેષ",
    price: "કિંમત",
    season: "મોસમ",
    origin: "મૂળ",
    rating: "રેટિંગ",
    verifiedBuyers: "2+ ચકાસાયેલા ખરીદદારોથી",
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
