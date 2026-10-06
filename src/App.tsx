import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ExternalLink, Sun, 
  Calendar, ArrowRight, Check, Globe, MessageCircle, Heart, Star, Flame
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
}

const templates: TemplateItem[] = [
  { id: 'diwali', name: 'Diwali & Dhanteras Wishes', category: 'Festivals', defaultMessage: 'Wishing you and your family a joyous and prosperous Diwali filled with light and happiness!', gradient: 'from-amber-500 via-orange-600 to-rose-600', badge: '🪔', slug: 'diwali', seoKeyword: 'diwali wishes with name and photo', seoTitle: 'Happy Diwali Wishes Generator with Name & Photo – Shubhakamna', seoDescription: 'Create personalized Diwali wishes, Dhanteras greetings with name and photo on shubhakamna.in.' },
  { id: 'shubh-prabhat', name: 'Shubh Prabhat (Good Morning)', category: 'Daily Wishes', defaultMessage: 'May your morning be filled with divine sunshine, positivity, and boundless energy. Suprabhat!', gradient: 'from-amber-400 via-yellow-500 to-orange-500', badge: '🌅', slug: 'shubh-prabhat', seoKeyword: 'shubh prabhat quotes good morning wishes', seoTitle: 'Shubh Prabhat Good Morning Quotes & Images with Name – Shubhakamna', seoDescription: 'Send daily Shubh Prabhat quotes, Suprabhat wishes, and good morning images on shubhakamna.in.' },
  { id: 'panchang', name: 'Aaj ka Panchang & Tithi', category: 'Daily Astrological', defaultMessage: 'Aaj ka Shubh Muhurat, Nakshatra, Tithi aur Vrat tyohar ki sampurn jankari.', gradient: 'from-orange-500 via-red-600 to-amber-700', badge: '🕉️', slug: 'panchang', seoKeyword: 'aaj ka panchang shubh muhurat', seoTitle: 'Aaj ka Panchang, Shubh Muhurat & Tithi Today – Shubhakamna', seoDescription: 'Check today Hindu Panchang, Aaj ka Shubh Muhurat, Rahukaal, Tithi, and Vrat on shubhakamna.in.' },
  { id: 'holi', name: 'Holi Colors Wishes', category: 'Festivals', defaultMessage: 'May your life be colored with joy, love, and laughter this Holi! Happy Holi!', gradient: 'from-pink-500 via-purple-600 to-indigo-600', badge: '🎨', slug: 'holi', seoKeyword: 'holi festival wishes templates', seoTitle: 'Happy Holi Wishes Generator with Name and Photo – Shubhakamna', seoDescription: 'Create colorful Holi greeting templates, happy Holi wishes with name and photo on shubhakamna.in.' },
  { id: 'navratri', name: 'Navratri & Durga Puja', category: 'Festivals', defaultMessage: 'May Maa Durga bless you and your family with strength, wisdom, and success.', gradient: 'from-red-600 via-rose-600 to-amber-500', badge: '🔱', slug: 'navratri', seoKeyword: 'navratri wishes with name', seoTitle: 'Happy Navratri & Durga Puja Wishes Generator – Shubhakamna', seoDescription: 'Personalized Navratri Maa Durga wishes, Durga Puja greetings with name on shubhakamna.in.' },
  { id: 'shivratri', name: 'Mahashivratri', category: 'Festivals', defaultMessage: 'Om Namah Shivay! May Lord Shiva fulfill all your prayers and bless you with inner peace.', gradient: 'from-blue-700 via-indigo-800 to-slate-900', badge: '🔱', slug: 'mahashivratri', seoKeyword: 'mahashivratri wishes', seoTitle: 'Mahashivratri Wishes & Om Namah Shivay Greetings – Shubhakamna', seoDescription: 'Send Lord Shiva Mahashivratri wishes, Om Namah Shivay status with name on shubhakamna.in.' },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', category: 'Festivals', defaultMessage: 'Happy Raksha Bandhan! Celebrating the unbreakable bond of love and protection.', gradient: 'from-purple-600 via-pink-600 to-rose-500', badge: '🧵', slug: 'raksha-bandhan', seoKeyword: 'raksha bandhan greeting templates', seoTitle: 'Raksha Bandhan Sibling Wishes with Name – Shubhakamna', seoDescription: 'Create Raksha Bandhan rakhi greeting templates, brother and sister wishes on shubhakamna.in.' },
  { id: 'janmashtami', name: 'Krishna Janmashtami', category: 'Festivals', defaultMessage: 'May Lord Krishna\'s divine flute music fill your home with peace and prosperity. Happy Janmashtami!', gradient: 'from-blue-600 via-cyan-600 to-indigo-800', badge: '🦚', slug: 'janmashtami', seoKeyword: 'janmashtami wishes generator', seoTitle: 'Krishna Janmashtami Wishes Generator with Name – Shubhakamna', seoDescription: 'Send Lord Krishna Janmashtami wishes, Kanha quotes with name and photo on shubhakamna.in.' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', category: 'Festivals', defaultMessage: 'Ganpati Bappa Morya! May Lord Ganesha remove all obstacles and shower success.', gradient: 'from-orange-500 via-amber-600 to-yellow-600', badge: '🐘', slug: 'ganesh-chaturthi', seoKeyword: 'ganesh chaturthi wishes', seoTitle: 'Ganesh Chaturthi Wishes & Ganpati Bappa Status – Shubhakamna', seoDescription: 'Personalized Ganesh Chaturthi wishes, Ganpati Bappa Morya greetings on shubhakamna.in.' },
  { id: 'makar-sankranti', name: 'Makar Sankranti & Pongal', category: 'Festivals', defaultMessage: 'Wishing you a harvest season filled with sweetness, joy, and prosperity. Happy Sankranti!', gradient: 'from-amber-500 via-yellow-600 to-orange-600', badge: '🌾', slug: 'makar-sankranti', seoKeyword: 'makar sankranti pongal wishes', seoTitle: 'Makar Sankranti, Pongal & Bihu Wishes Generator – Shubhakamna', seoDescription: 'Create harvest festival Makar Sankranti, Pongal, and Uttarayan wishes on shubhakamna.in.' },
  { id: 'onam', name: 'Onam Festival', category: 'Festivals', defaultMessage: 'Happy Onam! May the spirit of Onam fill your home with happiness and abundance.', gradient: 'from-emerald-600 via-teal-600 to-green-700', badge: '🌼', slug: 'onam', seoKeyword: 'onam festival greetings', seoTitle: 'Happy Onam Wishes & Pookalam Greetings – Shubhakamna', seoDescription: 'Send traditional Kerala Onam festival wishes and Pookalam greetings on shubhakamna.in.' },
  { id: 'karva-chauth', name: 'Karva Chauth & Bhai Dooj', category: 'Festivals', defaultMessage: 'May the bond of love and togetherness shine bright on Karva Chauth and Bhai Dooj.', gradient: 'from-rose-600 via-pink-600 to-red-700', badge: '💖', slug: 'karva-chauth', seoKeyword: 'karva chauth bhai dooj wishes', seoTitle: 'Karva Chauth & Bhai Dooj Wishes Generator – Shubhakamna', seoDescription: 'Personalized Karva Chauth husband wife wishes and Bhai Dooj greetings on shubhakamna.in.' },
  { id: 'chhath-puja', name: 'Chhath Puja', category: 'Festivals', defaultMessage: 'May Surya Dev and Chhath Maiya bless your family with health, wealth, and happiness.', gradient: 'from-orange-600 via-amber-600 to-yellow-600', badge: '☀️', slug: 'chhath-puja', seoKeyword: 'chhath puja wishes', seoTitle: 'Chhath Puja Surya Dev & Chhath Maiya Wishes – Shubhakamna', seoDescription: 'Send sacred Chhath Puja greetings, Surya Dev Arghya wishes with name on shubhakamna.in.' },
  { id: 'christmas', name: 'Merry Christmas & New Year', category: 'Global Holidays', defaultMessage: 'Merry Christmas & Happy New Year! May your holiday season sparkle with joy and cheer.', gradient: 'from-red-600 via-emerald-600 to-green-700', badge: '🎄', slug: 'christmas', seoKeyword: 'christmas new year wishes', seoTitle: 'Merry Christmas & Happy New Year 2026 Wishes – Shubhakamna', seoDescription: 'Create Merry Christmas wishes and Happy New Year 2026 greeting cards on shubhakamna.in.' },
  { id: 'eid', name: 'Eid Mubarak', category: 'Islamic Festivals', defaultMessage: 'Eid Mubarak! May this joyous occasion bring endless peace, health, and happiness to you.', gradient: 'from-emerald-600 via-teal-700 to-green-900', badge: '🌙', slug: 'eid-mubarak', seoKeyword: 'eid mubarak wishes templates', seoTitle: 'Eid Mubarak Wishes & Mubarak Greetings Generator – Shubhakamna', seoDescription: 'Personalized Eid Mubarak wishes, Eid al-Fitr, Eid al-Adha greetings on shubhakamna.in.' },
  { id: 'republic-day', name: 'Republic & Independence Day', category: 'National Days', defaultMessage: 'Happy Republic Day! Saluting the spirit of our proud nation and freedom fighters.', gradient: 'from-orange-500 via-white to-emerald-600', badge: '🇮🇳', slug: 'republic-day', seoKeyword: 'republic independence day wishes', seoTitle: 'Republic Day & Independence Day Patriotic Wishes – Shubhakamna', seoDescription: 'Send 26 January Republic Day and 15 August Independence Day wishes on shubhakamna.in.' },
  { id: 'shubh-ratri', name: 'Shubh Ratri (Good Night)', category: 'Daily Wishes', defaultMessage: 'Shubh Ratri! May you have peaceful sleep and sweet dreams. Good night!', gradient: 'from-indigo-900 via-purple-900 to-slate-900', badge: '🌙', slug: 'shubh-ratri', seoKeyword: 'shubh ratri good night quotes', seoTitle: 'Shubh Ratri Good Night Quotes & Images with Name – Shubhakamna', seoDescription: 'Daily Shubh Ratri good night quotes, peaceful sleep wishes with name on shubhakamna.in.' },
  { id: 'birthday', name: 'Birthday & Anniversary', category: 'Special Occasion', defaultMessage: 'Wishing you a wonderful birthday filled with love, laughter, and success in the coming year!', gradient: 'from-pink-500 via-rose-500 to-amber-500', badge: '🎂', slug: 'birthday', seoKeyword: 'personalized birthday anniversary wishes', seoTitle: 'Happy Birthday & Marriage Anniversary Wishes Generator – Shubhakamna', seoDescription: 'Create personalized birthday wishes with photo, marriage anniversary greetings on shubhakamna.in.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'templates'>('generator');
  const [userName, setUserName] = useState('Ananya Sharma');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(templates[0]);
  const [customMessage, setCustomMessage] = useState(templates[0].defaultMessage);

  // Dynamic SEO document title and meta tag updater for maximum Google ranking
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
  };

  const redirectToShubhkamna = () => {
    const encodedName = encodeURIComponent(userName);
    const encodedMsg = encodeURIComponent(customMessage);
    const url = `https://shubhakamna.in/${selectedTemplate.slug}/?name=${encodedName}&msg=${encodedMsg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 text-slate-900 flex flex-col font-sans">
      {/* Hidden SEO Header for Crawlers */}
      <h1 className="sr-only">Shubhakamna Wishes – Festival Greetings Generator, Shubh Prabhat & Panchang Today</h1>

      {/* Top Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white text-xl shadow-md">
              🪔
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">
                Shubhakamna Wishes
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                All Festivals & Panchang
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button onClick={() => setActiveTab('generator')} className={`hover:text-amber-600 transition-colors ${activeTab === 'generator' ? 'text-amber-600' : ''}`}>
              Greeting Generator
            </button>
            <button onClick={() => setActiveTab('templates')} className={`hover:text-amber-600 transition-colors ${activeTab === 'templates' ? 'text-amber-600' : ''}`}>
              All Categories & Festivals ({templates.length})
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://shubhakamna.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 rounded-xl hover:opacity-95 transition-all shadow-md hover:shadow-lg"
            >
              <Globe className="w-4 h-4 text-amber-200" />
              <span>Visit shubhakamna.in</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-amber-600 via-rose-600 to-purple-700 text-white py-16 px-6 text-center relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-white/20 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>All Festivals, Shubh Prabhat & Daily Panchang Hub</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-tight">
            Festival Wishes, Shubh Prabhat & Panchang Templates
          </h2>
          <p className="text-base sm:text-xl text-amber-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Create personalized greeting templates with name and photo for all Indian festivals, daily <strong className="text-white">Shubh Prabhat</strong> quotes, and <strong className="text-white">Aaj ka Panchang</strong> on <a href="https://shubhakamna.in/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-white hover:text-amber-200">shubhakamna.in</a>.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs font-semibold text-amber-100">
            <span className="bg-white/10 px-3 py-1 rounded-lg">🪔 All Festivals</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">🌅 Shubh Prabhat</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">🕉️ Aaj ka Panchang</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">💖 Birthday & Suvichar</span>
          </div>
        </div>
      </section>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex bg-white border-b border-slate-200 overflow-x-auto px-4 py-2.5 gap-2 shadow-xs">
        <button onClick={() => setActiveTab('generator')} className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${activeTab === 'generator' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Generator</button>
        <button onClick={() => setActiveTab('templates')} className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${activeTab === 'templates' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}>All Categories</button>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Controls */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-xl space-y-6">
              <div className="border-b border-amber-100 pb-4">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>✨ Configure Greeting Template</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Select from all categories & festivals, customize message, and open exact matching page on shubhakamna.in.</p>
              </div>

              {/* Template Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Select Festival / Category ({templates.length} Categories)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => handleTemplateChange(tpl)}
                      className={`flex items-center gap-3 p-3 rounded-2xl text-xs font-semibold border text-left transition-all ${
                        selectedTemplate.id === tpl.id 
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 shadow-md ring-2 ring-amber-500/20' 
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name or Sender Name</label>
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
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Greeting Message</label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none font-medium"
                />
              </div>
            </div>

            {/* Right Column: Preview & Redirection */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                  <h3 className="text-xl font-black text-slate-900">Live Greeting Preview</h3>
                  <span className="text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">
                    shubhakamna.in/{selectedTemplate.slug}/
                  </span>
                </div>

                {/* Card Preview Box */}
                <div className={`bg-gradient-to-br ${selectedTemplate.gradient} text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6 min-h-[400px] justify-center`}>
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

                {/* Redirection Button */}
                <div className="pt-2">
                  <button
                    onClick={redirectToShubhkamna}
                    className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 hover:opacity-95 text-white font-black py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-base tracking-wide"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>Open Matching Page on shubhakamna.in/{selectedTemplate.slug}/</span>
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    Instantly opens <strong className="text-slate-800">shubhakamna.in/{selectedTemplate.slug}/</strong> with your customized greeting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">All Categories, Festivals, Shubh Prabhat & Panchang</h3>
              <p className="text-sm text-slate-600">Click any card to open its exact matching category page on shubhakamna.in.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((tpl) => (
                <article key={tpl.id} className="bg-white p-6 rounded-3xl border border-amber-100 shadow-md flex flex-col justify-between space-y-5 hover:shadow-xl hover:border-amber-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{tpl.badge}</span>
                      <span className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-bold">{tpl.category}</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900">{tpl.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{tpl.defaultMessage}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">Slug: /{tpl.slug}/</span>
                    <a 
                      href={`https://shubhakamna.in/${tpl.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                    >
                      <span>Open Page ↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-100 text-center py-10 text-xs text-slate-500 space-y-3 mt-16 shadow-inner">
        <p>© 2026 Shubhakamna Wishes. All Rights Reserved.</p>
        <p>
          Main Platform & Live Demo: <a href="https://shubhakamna.in/" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold hover:underline">https://shubhakamna.in/</a>
        </p>
      </footer>
    </div>
  );
}
