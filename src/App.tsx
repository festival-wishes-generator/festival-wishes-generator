import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ExternalLink, Search, 
  ArrowRight, Check, Globe, MessageCircle, Heart, Star, Flame, Sun, Calendar, Share2, X
} from 'lucide-react';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  defaultMessage: string;
  gradient: string;
  badge: string;
  slug: string;
  seoKeyword: string;
  seoTitle: string;
  seoDescription: string;
  searchKeywords: string[];
}

const templates: TemplateItem[] = [
  { 
    id: 'shubh-prabhat', 
    name: 'Shubh Prabhat (Good Morning / शुभ प्रभात / शुभ सकाळ)', 
    category: 'Daily Wishes', 
    defaultMessage: 'May your morning be filled with divine sunshine, positivity, and boundless energy. Suprabhat!', 
    gradient: 'from-amber-400 via-yellow-500 to-orange-500', 
    badge: '🌅', 
    slug: 'shubh-prabhat', 
    seoKeyword: 'shubh prabhat quotes good morning wishes', 
    seoTitle: 'Aaj ka Shubh Prabhat Suvichar with Name & Photo – Shubhakamna', 
    seoDescription: 'Daily fresh 10 Shubh Prabhat quotes in Hindi and Marathi. Create good morning wishes with name and photo on shubhakamna.in.',
    searchKeywords: ['shubh prabhat', 'good morning', 'शुभ प्रभात', 'सुप्रभात', 'शुभ सकाळ', 'shubh sakal', 'morning quotes', 'सकाळ', 'प्रभात']
  },
  { 
    id: 'diwali', 
    name: 'Diwali & Dhanteras Wishes (दीपावली / दिवाळी)', 
    category: 'Festivals', 
    defaultMessage: 'Wishing you and your family a joyous and prosperous Diwali filled with light and happiness!', 
    gradient: 'from-amber-500 via-orange-600 to-rose-600', 
    badge: '🪔', 
    slug: 'diwali', 
    seoKeyword: 'diwali wishes with name and photo', 
    seoTitle: 'Happy Diwali Wishes Generator with Name & Photo – Shubhakamna', 
    seoDescription: 'Create personalized Diwali wishes, Dhanteras greetings with name and photo on shubhakamna.in.',
    searchKeywords: ['diwali', 'deepawali', 'दीपावली', 'दिवाली', 'दिवाळी', 'dhanteras', 'धनतेरस', 'लक्ष्मी पूजन', 'शुभ दीपावली', 'diwali wishes']
  },
  { 
    id: 'panchang', 
    name: 'Aaj ka Panchang & Tithi (आज का पंचांग / पंचांग)', 
    category: 'Daily Astrological', 
    defaultMessage: 'Aaj ka Shubh Muhurat, Nakshatra, Tithi aur Vrat tyohar ki sampurn jankari.', 
    gradient: 'from-orange-500 via-red-600 to-amber-700', 
    badge: '🕉️', 
    slug: 'panchang', 
    seoKeyword: 'aaj ka panchang shubh muhurat', 
    seoTitle: 'Aaj ka Panchang, Shubh Muhurat & Tithi Today – Shubhakamna', 
    seoDescription: 'Check today Hindu Panchang, Aaj ka Shubh Muhurat, Rahukaal, Tithi, and Vrat on shubhakamna.in.',
    searchKeywords: ['panchang', 'पंचांग', 'आज का पंचांग', 'तिथि', 'tithi', 'शुभ मुहूर्त', 'मुहूर्त', 'मराठी पंचांग', 'rahukaal', 'राशिफल']
  },
  { 
    id: 'gudi-padwa', 
    name: 'Gudi Padwa & Hindu New Year (गुढी पाडवा / नव वर्ष)', 
    category: 'Festivals', 
    defaultMessage: 'Wishing you a joyful and blessed Gudi Padwa & Nutan Varshabhinandan!', 
    gradient: 'from-amber-500 via-emerald-600 to-rose-600', 
    badge: '🚩', 
    slug: 'gudi-padwa', 
    seoKeyword: 'gudi padwa wishes in marathi hindi', 
    seoTitle: 'Happy Gudi Padwa & Nutan Varsh Wishes Generator – Shubhakamna', 
    seoDescription: 'Create Gudi Padwa and Hindu New Year greetings in Marathi and Hindi with name on shubhakamna.in.',
    searchKeywords: ['gudi padwa', 'गुढी पाडवा', 'गुडी पाडवा', 'नव वर्ष', 'नूतन वर्षाभिनंदन', 'hindu new year', 'मराठी नववर्ष']
  },
  { 
    id: 'holi', 
    name: 'Holi Colors Wishes (होली / होळी)', 
    category: 'Festivals', 
    defaultMessage: 'May your life be colored with joy, love, and laughter this Holi! Happy Holi!', 
    gradient: 'from-pink-500 via-purple-600 to-indigo-600', 
    badge: '🎨', 
    slug: 'holi', 
    seoKeyword: 'holi festival wishes templates', 
    seoTitle: 'Happy Holi Wishes Generator with Name and Photo – Shubhakamna', 
    seoDescription: 'Create colorful Holi greeting templates, happy Holi wishes with name and photo on shubhakamna.in.',
    searchKeywords: ['holi', 'होली', 'होळी', 'धुलिवंदन', 'dhulivandan', 'rangpanchami', 'रंगपंचमी', 'रंगों का त्योहार', 'colors']
  },
  { 
    id: 'navratri', 
    name: 'Navratri & Durga Puja (नवरात्रि / नवरात्रौत्सव)', 
    category: 'Festivals', 
    defaultMessage: 'May Maa Durga bless you and your family with strength, wisdom, and success.', 
    gradient: 'from-red-600 via-rose-600 to-amber-500', 
    badge: '🔱', 
    slug: 'navratri', 
    seoKeyword: 'navratri wishes with name', 
    seoTitle: 'Happy Navratri & Durga Puja Wishes Generator – Shubhakamna', 
    seoDescription: 'Personalized Navratri Maa Durga wishes, Durga Puja greetings with name on shubhakamna.in.',
    searchKeywords: ['navratri', 'नवरात्रि', 'नवरात्रोत्सव', 'दुर्गा पूजा', 'durga puja', 'गरबा', 'garba', 'माँ दुर्गा', 'शारदीय नवरात्रि']
  },
  { 
    id: 'shivratri', 
    name: 'Mahashivratri (महाशिवरात्रि / महाशिवरात्री)', 
    category: 'Festivals', 
    defaultMessage: 'Om Namah Shivay! May Lord Shiva fulfill all your prayers and bless you with inner peace.', 
    gradient: 'from-blue-700 via-indigo-800 to-slate-900', 
    badge: '🔱', 
    slug: 'mahashivratri', 
    seoKeyword: 'mahashivratri wishes', 
    seoTitle: 'Mahashivratri Wishes & Om Namah Shivay Greetings – Shubhakamna', 
    seoDescription: 'Send Lord Shiva Mahashivratri wishes, Om Namah Shivay status with name on shubhakamna.in.',
    searchKeywords: ['mahashivratri', 'महाशिवरात्रि', 'महाशिवरात्री', 'हर हर महादेव', 'शिवजी', 'om namah shivay', 'भोलेनाथ', 'शिवरात्री']
  },
  { 
    id: 'ganesh-chaturthi', 
    name: 'Ganesh Chaturthi (गणेश चतुर्थी / गणेशोत्सव)', 
    category: 'Festivals', 
    defaultMessage: 'Ganpati Bappa Morya! May Lord Ganesha remove all obstacles and shower success.', 
    gradient: 'from-orange-500 via-amber-600 to-yellow-600', 
    badge: '🐘', 
    slug: 'ganesh-chaturthi', 
    seoKeyword: 'ganesh chaturthi wishes', 
    seoTitle: 'Ganesh Chaturthi Wishes & Ganpati Bappa Status – Shubhakamna', 
    seoDescription: 'Personalized Ganesh Chaturthi wishes, Ganpati Bappa Morya greetings on shubhakamna.in.',
    searchKeywords: ['ganesh chaturthi', 'गणेश चतुर्थी', 'गणपती बाप्पा', 'गणेशोत्सव', 'ganpati bappa morya', 'बाप्पा', 'विनायक']
  },
  { 
    id: 'raksha-bandhan', 
    name: 'Raksha Bandhan (रक्षाबंधन / राखी)', 
    category: 'Festivals', 
    defaultMessage: 'Happy Raksha Bandhan! Celebrating the unbreakable bond of love and protection.', 
    gradient: 'from-purple-600 via-pink-600 to-rose-500', 
    badge: '🧵', 
    slug: 'raksha-bandhan', 
    seoKeyword: 'raksha bandhan greeting templates', 
    seoTitle: 'Raksha Bandhan Sibling Wishes with Name – Shubhakamna', 
    seoDescription: 'Create Raksha Bandhan rakhi greeting templates, brother and sister wishes on shubhakamna.in.',
    searchKeywords: ['raksha bandhan', 'रक्षाबंधन', 'राखी', 'rakhi', 'रक्षा बंधन', 'भाऊ बहीण', 'भाई बहन']
  },
  { 
    id: 'janmashtami', 
    name: 'Krishna Janmashtami (जन्माष्टमी / गोकुळाष्टमी)', 
    category: 'Festivals', 
    defaultMessage: 'May Lord Krishna\'s divine flute music fill your home with peace and prosperity. Happy Janmashtami!', 
    gradient: 'from-blue-600 via-cyan-600 to-indigo-800', 
    badge: '🦚', 
    slug: 'janmashtami', 
    seoKeyword: 'janmashtami wishes generator', 
    seoTitle: 'Krishna Janmashtami Wishes Generator with Name – Shubhakamna', 
    seoDescription: 'Send Lord Krishna Janmashtami wishes, Kanha quotes with name and photo on shubhakamna.in.',
    searchKeywords: ['janmashtami', 'जन्माष्टमी', 'गोकुळाष्टमी', 'कृष्ण जन्माष्टमी', 'श्रीकृष्ण', 'dahi handi', 'दहीहंडी', 'कान्हा']
  },
  { 
    id: 'birthday', 
    name: 'Birthday & Anniversary (जन्मदिन / वाढदिवस)', 
    category: 'Special Occasion', 
    defaultMessage: 'Wishing you a wonderful birthday filled with love, laughter, and success in the coming year!', 
    gradient: 'from-pink-500 via-rose-500 to-amber-500', 
    badge: '🎂', 
    slug: 'birthday', 
    seoKeyword: 'personalized birthday anniversary wishes', 
    seoTitle: 'Happy Birthday & Marriage Anniversary Wishes Generator – Shubhakamna', 
    seoDescription: 'Create personalized birthday wishes with photo, marriage anniversary greetings on shubhakamna.in.',
    searchKeywords: ['birthday', 'जन्मदिन', 'वाढदिवस', 'वाढदिवसाच्या हार्दिक शुभेच्छा', 'anniversary', 'लग्नाचा वाढदिवस', 'सालगिरह', 'happy birthday']
  },
  { 
    id: 'christmas', 
    name: 'Merry Christmas & New Year (क्रिसमस / नवीन वर्ष)', 
    category: 'Global Holidays', 
    defaultMessage: 'Merry Christmas & Happy New Year! May your holiday season sparkle with joy and cheer.', 
    gradient: 'from-red-600 via-emerald-600 to-green-700', 
    badge: '🎄', 
    slug: 'christmas', 
    seoKeyword: 'christmas new year wishes', 
    seoTitle: 'Merry Christmas & Happy New Year 2026 Wishes – Shubhakamna', 
    seoDescription: 'Create Merry Christmas wishes and Happy New Year 2026 greeting cards on shubhakamna.in.',
    searchKeywords: ['christmas', 'क्रिसमस', 'नाताल', 'new year', 'नया साल', 'नवीन वर्ष', 'happy new year 2026', '31st december']
  }
];

// Master Bank of Shubh Prabhat Suvichar (Hindi & Marathi Mix)
const allSuvicharBank: string[] = [
  "सवेरा हर रोज़ नया संदेश लाता है, मेहनत करने वाले का भाग्य सदा चमकता है। शुभ प्रभात!",
  "सच्ची खुशी दूसरों को खुश देखकर मिलती है, मुस्कुराहट से अपने दिन की शुरुआत करें। सुप्रभात!",
  "आपका आज का दिन सकारात्मक ऊर्जा और अटूट विश्वास से भरा रहे। शुभ प्रभात!",
  "ईश्वर का सबसे सुंदर उपहार यह नया दिन है, इसे मुस्कुराकर स्वीकार करें। सुप्रभात!",
  "प्रत्येक नवीन सकाळ तुमच्या आयुष्यात नवीन उमेद आणि यश घेऊन येवो. शुभ सकाळ!",
  "चांगली माणसं आणि चांगले विचार नेहमी जपून ठेवा. तुमची आजची सकाळ आनंददायी जावो. शुभ सकाळ!",
  "सत्य और ईमानदारी का रास्ता भले ही कठिन हो, पर मंजिल बहुत खूबसूरत होती है। शुभ प्रभात!",
  "हर सुबह एक नया अवसर है अपने सपनों को हकीकत में बदलने का। सुप्रभात!",
  "आयुष्यात हसणे कधीही सोडू नका, कारण तुमचं हसू कोणाच्या तरी आनंदाचं कारण असू शकतं. शुभ सकाळ!",
  "सकारात्मक सोच ही जीवन में सफलता का मूल मंत्र है। सुप्रभात!"
];

export default function App() {
  const [userName, setUserName] = useState('Ananya Sharma');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(templates[0]);
  const [customMessage, setCustomMessage] = useState(templates[0].defaultMessage);
  const [searchQuery, setSearchQuery] = useState('');
  const [dailySuvicharList, setDailySuvicharList] = useState<string[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>('');

  // Automatic Daily 4:00 AM Quote Calculation Engine
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = now.toLocaleDateString('hi-IN', options);
    setFormattedDate(dateStr);

    const effectiveDate = new Date(now);
    if (now.getHours() < 4) {
      effectiveDate.setDate(effectiveDate.getDate() - 1);
    }
    
    const daySeed = effectiveDate.getFullYear() * 10000 + (effectiveDate.getMonth() + 1) * 100 + effectiveDate.getDate();
    const startIndex = daySeed % allSuvicharBank.length;
    const selected10Quotes: string[] = [];
    for (let i = 0; i < 10; i++) {
      const idx = (startIndex + i) % allSuvicharBank.length;
      selected10Quotes.push(allSuvicharBank[idx]);
    }

    setDailySuvicharList(selected10Quotes);
  }, []);

  // Dynamic SEO title & meta description updater
  useEffect(() => {
    document.title = selectedTemplate.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', selectedTemplate.seoDescription);
    }
  }, [selectedTemplate]);

  const handleTemplateChange = (tpl: TemplateItem) => {
    setSelectedTemplate(tpl);
    setCustomMessage(tpl.defaultMessage);
    const builderElem = document.getElementById('builder-section');
    if (builderElem) {
      builderElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const redirectToShubhkamnaSlug = (slug: string) => {
    const encodedName = encodeURIComponent(userName);
    const encodedMsg = encodeURIComponent(customMessage);
    const url = `https://shubhakamna.in/${slug}/?name=${encodedName}&msg=${encodedMsg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const redirectToSuvicharCreation = (quoteText: string) => {
    const encodedName = encodeURIComponent(userName);
    const encodedQuote = encodeURIComponent(quoteText);
    const url = `https://shubhakamna.in/shubh-prabhat/?quote=${encodedQuote}&name=${encodedName}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Multi-Lingual Search Filter Results
  const searchResults = searchQuery.trim() ? templates.filter(t => {
    const q = searchQuery.toLowerCase().trim();
    return t.name.toLowerCase().includes(q) || 
           t.category.toLowerCase().includes(q) || 
           t.searchKeywords.some(kw => kw.toLowerCase().includes(q));
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-white to-rose-50/30 text-slate-900 flex flex-col font-sans">
      {/* Hidden Crawler Title */}
      <h1 className="sr-only">Shubhakamna Wishes – Hindi Marathi English Festival Greetings Generator & Panchang Today</h1>

      {/* Top Header Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-md">
              🌅
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-amber-700 via-rose-700 to-purple-800 bg-clip-text text-transparent">
                Shubhakamna Wishes
              </span>
              <p className="text-[11px] text-amber-900 font-semibold hidden sm:block">
                Hindi, Marathi & English Festival Greetings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://shubhakamna.in/shubh-prabhat/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 rounded-2xl hover:opacity-95 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Sun className="w-4 h-4 text-amber-200" />
              <span>shubhakamna.in (Visit Site)</span>
              <ExternalLink className="w-4 h-4 opacity-90" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-rose-600 to-purple-700 text-white py-16 px-6 text-center relative shadow-2xl z-40">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-white/20 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Multi-Lingual Search (Hindi / Marathi / English)</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-tight drop-shadow-sm">
            हिंदी, मराठी और अंग्रेजी में विशेज सर्च करें
          </h2>
          <p className="text-base sm:text-xl text-amber-100 max-w-2xl mx-auto font-medium leading-relaxed">
            दीवाली, शुभ सकाळ, गुढी पाडवा, पंचांग या अन्य कोई भी त्यौहार किसी भी भाषा में सर्च करें:
          </p>

          {/* Multi-Lingual Instant Search Input & Dropdown Popup Directly Underneath */}
          <div className="max-w-2xl mx-auto pt-2 relative z-50">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="सर्च करें: दिवाली, दिवाळी, शुभ सकाळ, गुढी पाडवा, पंचांग, Diwali..."
                className="w-full pl-12 pr-10 py-4 bg-white text-slate-900 rounded-2xl text-sm sm:text-base font-bold shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-100 p-1 rounded-full text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* INSTANT DROPDOWN SEARCH RESULTS DIRECTLY UNDER SEARCH BAR */}
            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-3 bg-white text-slate-900 rounded-3xl shadow-2xl border border-amber-200 p-4 max-h-[450px] overflow-y-auto space-y-3 z-50 text-left animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-amber-100 text-xs font-bold text-slate-500">
                  <span>Search Results for "{searchQuery}"</span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">{searchResults.length} matches found</span>
                </div>

                {searchResults.length > 0 ? (
                  searchResults.map((tpl) => (
                    <div 
                      key={tpl.id}
                      className="p-3 sm:p-4 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 border border-amber-100 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tpl.badge}</span>
                        <div>
                          <h4 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                            {tpl.name}
                          </h4>
                          <span className="text-[11px] bg-white px-2 py-0.5 rounded-md font-bold text-amber-800 border border-amber-200">
                            {tpl.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { handleTemplateChange(tpl); setSearchQuery(''); }}
                          className="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100"
                        >
                          Customize
                        </button>
                        <button
                          onClick={() => redirectToShubhkamnaSlug(tpl.slug)}
                          className="px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-amber-600 to-rose-600 hover:opacity-95 rounded-xl shadow-sm flex items-center gap-1.5 shrink-0"
                        >
                          <span>Open on shubhakamna.in/{tpl.slug}/ 👉</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs sm:text-sm text-slate-500 font-medium">
                    कोई परिणाम नहीं मिला। कृपया दूसरा शब्द टाइप करें (जैसे दिवाली, दिवाळी, गुढी पाडवा)।
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16 flex-1 w-full">

        {/* SECTION 1: TODAY'S 10 SHUBH PRABHAT SUVICHAR (DAILY AUTO-UPDATED AT 4 AM) */}
        <section className="space-y-8 bg-amber-50/50 p-6 sm:p-10 rounded-3xl border border-amber-200 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Daily Auto Refresh (4:00 AM)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                🌅 आज के 10 स्पेशल शुभ प्रभात / शुभ सकाळ विचार ({formattedDate})
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                किसी भी सुविचार को अपने नाम और फोटो के साथ तैयार करने के लिए कार्ड पर दिए बटन पर क्लिक करें।
              </p>
            </div>
            <a 
              href="https://shubhakamna.in/shubh-prabhat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-900 bg-white border border-amber-300 rounded-xl hover:bg-amber-100 transition-all shadow-sm shrink-0"
            >
              <span>100+ Suvichar on shubhakamna.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 10 Suvichar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailySuvicharList.map((quoteText, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black bg-gradient-to-r from-amber-500 to-rose-500 text-white px-3 py-1 rounded-full">
                      विचार #{index + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">🌅 शुभ प्रभात / शुभ सकाळ</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed group-hover:text-amber-700 transition-colors">
                    "{quoteText}"
                  </p>
                </div>

                <button
                  onClick={() => redirectToSuvicharCreation(quoteText)}
                  className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 hover:opacity-95 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide mt-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>इस विचार को अपने नाम और फोटो के साथ बनाएं 👉</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE CUSTOM BUILDER */}
        <section id="builder-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-amber-100">
          {/* Controls Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-xl space-y-6">
            <div className="border-b border-amber-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>✨ Selected Template Settings</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Customize message and enter your name.</p>
              </div>
              <span className="text-2xl">{selectedTemplate.badge}</span>
            </div>

            {/* Template Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Choose Category ({templates.length} Available)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => handleTemplateChange(tpl)}
                    className={`flex items-center gap-3 p-3 rounded-2xl text-xs font-semibold border text-left transition-all ${
                      selectedTemplate.id === tpl.id 
                        ? 'border-amber-500 bg-amber-50/80 text-amber-950 shadow-md ring-2 ring-amber-500/20' 
                        : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-2xl">{tpl.badge}</span>
                    <div className="truncate">
                      <div className="font-bold truncate">{tpl.name}</div>
                      <div className="text-[10px] text-slate-400">{tpl.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Your Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name or Family Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Rahul Sharma & Family"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-medium"
              />
            </div>

            {/* Greeting Message */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Custom Message</label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none font-medium"
              />
            </div>
          </div>

          {/* Card Live Preview & Action Button */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <h3 className="text-xl font-black text-slate-900">Live Card Preview</h3>
                <span className="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
                  shubhakamna.in/{selectedTemplate.slug}/
                </span>
              </div>

              {/* Card Preview Container */}
              <div className={`bg-gradient-to-br ${selectedTemplate.gradient} text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6 min-h-[400px] justify-center transition-all duration-300`}>
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-6xl sm:text-7xl animate-bounce drop-shadow-md">{selectedTemplate.badge}</div>

                <div className="space-y-3 max-w-lg relative z-10">
                  <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full font-bold">
                    {selectedTemplate.category}
                  </span>
                  <h4 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow">
                    {selectedTemplate.name}
                  </h4>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium drop-shadow-sm">
                    "{customMessage}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/25 w-full flex items-center justify-between text-xs text-white/90 font-semibold relative z-10">
                  <span>— {userName || 'Your Name'}</span>
                  <span className="bg-black/20 px-2.5 py-1 rounded-lg">shubhakamna.in/{selectedTemplate.slug}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => redirectToShubhkamnaSlug(selectedTemplate.slug)}
                  className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 hover:opacity-95 text-white font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 text-base tracking-wide transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>Create Wish on shubhakamna.in/{selectedTemplate.slug}/</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  Clicking opens <strong className="text-slate-800">shubhakamna.in/{selectedTemplate.slug}/</strong> with name and photo support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ALL CATEGORIES GRID */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Explore All Festivals & Categories</h3>
            <p className="text-sm text-slate-600">Select any occasion card below to open its dedicated page on shubhakamna.in.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <article 
                key={tpl.id} 
                onClick={() => handleTemplateChange(tpl)}
                className="bg-white p-6 rounded-3xl border border-amber-100 shadow-md flex flex-col justify-between space-y-5 hover:shadow-xl hover:border-amber-300 transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{tpl.badge}</span>
                    <span className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-bold">{tpl.category}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">{tpl.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{tpl.defaultMessage}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">/{tpl.slug}/</span>
                  <a 
                    href={`https://shubhakamna.in/${tpl.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <span>Open Page ↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-100 text-center py-10 text-xs text-slate-500 space-y-3 mt-16 shadow-inner">
        <p>© 2026 Shubhakamna Wishes. All Rights Reserved.</p>
        <p>
          Main Platform & Live Site: <a href="https://shubhakamna.in/" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:underline">https://shubhakamna.in/</a>
        </p>
      </footer>
    </div>
  );
}
