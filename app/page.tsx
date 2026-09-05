"use client";
import { useState, useRef, useEffect } from 'react';
import { X, Send, ShieldCheck, Sun, Moon, Zap, Mic } from 'lucide-react';

const ACCESSORIES_CATALOG = [
  { id: "sleeve", name: "Pro Sleeve", desc: "Premium leather sleeve for your Nuvora laptop.", price: 3000, imgs: ["/images/pro_sleeve.jpg"] },
  { id: "backpack", name: "Commuter Tech Backpack", desc: "Weather-resistant backpack with laptop compartment.", price: 4500, imgs: ["/images/tech_backpack.jpg"] },
  { id: "mouse", name: "Creator Mouse", desc: "Ergonomic wireless mouse tailored for creators.", price: 3000, imgs: ["/images/creator_mouse.jpg"] },
  { id: "keyboard", name: "Mechanical Keyboard", desc: "Tactile mechanical keyboard for ultimate typing feel.", price: 8000, imgs: ["/images/mechanical_keyboard.jpg"] },
  { id: "monitor_4k", name: "ProDisplay 4K Monitor", desc: "27-inch 4K HDR display with true color accuracy.", price: 32000, imgs: ["/images/monitor_4k.jpg"] },
  { id: "dock", name: "Thunderbolt 4 Dock", desc: "One cable to connect all your peripherals and displays.", price: 14000, imgs: ["/images/thunderbolt_dock.jpg"] },
  { id: "ssd_1tb", name: "External SSD 1TB", desc: "Ultra-fast NVMe storage for your large projects.", price: 8000, imgs: ["/images/external_ssd.jpg"] },
  { id: "headphones", name: "Studio Headphones", desc: "High-fidelity over-ear headphones with noise cancellation.", price: 12000, imgs: ["/images/studio_headphones.jpg"] }
];

const SUPPORT_CATALOG = [
  { id: "care_plus", name: "Nuvora Care+ 2 Years", desc: "Extended warranty and priority support.", price: 5000, imgs: ["/images/care_plus.jpg"] },
  { id: "care_premium", name: "Accidental Damage Protection", desc: "Covers drops, spills, and cracked screens.", price: 8500, imgs: ["/images/care_premium.jpg"] },
  { id: "priority_setup", name: "Priority Setup", desc: "White-glove setup service by a Nuvora expert.", price: 2000, imgs: ["/images/priority_setup.jpg"] },
  { id: "data_recovery", name: "Data Recovery Service", desc: "Professional data recovery attempt for drive failures.", price: 4000, imgs: ["/images/data_recovery.jpg"] }
];

const CATALOG = [
  {
    id: 'p1',
    name: 'Nuvora Pro X',
    desc: 'M3 Max architecture. 128GB Unified Memory. The ultimate powerhouse for AI developers and creators.',
    price: 150000,
    imgs: [
      '/images/laptop_pro_x.jpg',
      '/images/laptop_pro_x.jpg',
      '/images/laptop_pro_x.jpg'
    ]
  },
  {
    id: 'p4',
    name: 'Nuvora Gaming G-Series',
    desc: 'Desktop-class GPU cooling. 240Hz display. Engineered for peak gaming performance and heavy 3D rendering.',
    price: 215000,
    imgs: [
      '/images/laptop_gaming.jpg',
      '/images/laptop_gaming.jpg',
      '/images/laptop_gaming.jpg'
    ]
  },
  {
    id: 'p5',
    name: 'Nuvora Dev Edition',
    desc: 'Pre-loaded with Linux environment tools, optimized compiler toolchains, and a tactile programming keyboard.',
    price: 185000,
    imgs: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1260&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1260&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1260&q=80'
    ]
  },
  {
    id: 'p2',
    name: 'Nuvora Air',
    desc: 'Ultra-thin, light, and powerful. M3 chip. Perfect for coding and working on the go.',
    price: 95000,
    imgs: [
      'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1260&q=80',
      'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1260&q=80',
      'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1260&q=80'
    ]
  },
  {
    id: 'p6',
    name: 'Nuvora Lite',
    desc: 'The perfect entry into the Nuvora ecosystem. Great for students, everyday browsing, and light office work.',
    price: 55000,
    imgs: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1260&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1260&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1260&q=80'
    ]
  },
  {
    id: 'p3',
    name: 'Nuvora Studio',
    desc: 'The desktop reimagined. M3 Ultra chip. Render timelines and train models in seconds.',
    price: 280000,
    imgs: [
      '/images/monitor_4k.jpg',
      '/images/monitor_4k.jpg',
      '/images/monitor_4k.jpg'
    ]
  }
];

function ProductCard({ product, onBuyNow, onCheckoutFriction }: any) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '24px 0', display: 'flex', flexDirection: 'column', height: '100%',
        transition: 'transform 0.4s ease',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', backgroundColor: '#111' }}>
            <img src={product.imgs[imgIndex]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            
            {/* Carousel Controls */}
            <div style={{ position: 'absolute', bottom: '16px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {product.imgs.map((_: any, idx: number) => (
                    <div 
                        key={idx} 
                        onClick={(e) => { e.stopPropagation(); setImgIndex(idx); }}
                        style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: imgIndex === idx ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'background-color 0.2s' }}
                    />
                ))}
            </div>
        </div>
        
        {product.id === 'p1' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f56900', marginBottom: '8px', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                New
            </div>
        )}
        
        <h2 style={{ fontSize: '24px', marginBottom: '8px', fontWeight: 600, letterSpacing: '-0.5px', textAlign: 'center' }}>{product.name}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px', flex: 1, lineHeight: '1.5', textAlign: 'center', padding: '0 12px' }}>
            {product.desc}
        </p>
        <h3 style={{ fontSize: '20px', marginBottom: '24px', fontWeight: 500, color: '#fff', textAlign: 'center' }}>₹{product.price.toLocaleString('en-IN')}</h3>
        
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 24px' }}>
            <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '15px', borderRadius: '12px', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}>
                Buy Now
            </button>
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button className="btn-secondary" style={{ flex: 1, padding: '10px 0', fontSize: '13px', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); onCheckoutFriction(product); }}>
                    Chat to Negotiate
                </button>
                {product.price >= 50000 && (
                    <button className="btn-secondary" style={{ flex: 1, padding: '10px 0', fontSize: '13px', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', transition: 'all 0.2s' }} onClick={(e) => { e.stopPropagation(); product.onVisual && product.onVisual(product); }}>
                        Visual Slider
                    </button>
                )}
            </div>
            {product.price >= 50000 && (
                <button style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', cursor: 'pointer', fontWeight: 600 }} onClick={(e) => { e.stopPropagation(); product.onAgent && product.onAgent(product); }}>
                    🤖 Deploy Personal AI Agent
                </button>
            )}
        </div>
    </div>
  );
}

export default function StoreFront() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => "sess_" + Math.random().toString(36).substr(2, 9));
  const [loading, setLoading] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<any>(null);
  const [auditLog, setAuditLog] = useState<any>(null);
  const [activeProduct, setActiveProduct] = useState(CATALOG[0]);
  const [visualProduct, setVisualProduct] = useState<any>(null);
  const [visualPrice, setVisualPrice] = useState<number>(0);
  const [agentProduct, setAgentProduct] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleBuyNow = (product: any) => {
    window.location.href = `/checkout?name=${encodeURIComponent(product.name)}&price=${product.price}`;
  };

  const handleCheckoutFriction = (product: any) => {
    setActiveProduct(product);
    setChatOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: 'agent', text: `I noticed you're looking at the ${product.name}. The price might seem steep, but I have some flexibility. What would make this purchase work for you?` }]);
    }
  };

  const getActiveCatalog = () => {
      let catalog = CATALOG;
      if (activeCategory === 'Accessories') catalog = ACCESSORIES_CATALOG;
      if (activeCategory === 'Support') catalog = SUPPORT_CATALOG;
      return catalog.map(p => ({ ...p, onVisual: (p: any) => { setVisualProduct(p); setVisualPrice(p.price); }, onAgent: setAgentProduct }));
  };

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Laptops' | 'Accessories' | 'Support'>('Laptops');
  const [heroIndex, setHeroIndex] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isLightMode]);

  const HERO_SLIDES = [
    {
      id: 'p1',
      title: 'Nuvora Pro X.',
      subtitle: 'Mind-blowing. Head-turning. The ultimate powerhouse for AI developers.',
      tag: 'Supercharged by M3 Max',
      image: '/images/laptop_pro_x.jpg'
    },
    {
      id: 'p4',
      title: 'Nuvora Gaming G-Series.',
      subtitle: 'Desktop-class GPU cooling. Engineered for peak gaming performance.',
      tag: 'Unleash the Beast',
      image: '/images/laptop_gaming.jpg'
    },
    {
      id: 'p3',
      title: 'Nuvora Studio.',
      subtitle: 'The desktop reimagined. Render timelines, train models, and create the future.',
      tag: 'The Ultimate Workspace',
      image: '/images/monitor_4k.jpg'
    }
  ];

  useEffect(() => {
    if (activeCategory !== 'Laptops') return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeCategory]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleNavClick = (link: 'Laptops' | 'Accessories' | 'Support') => {
    setActiveCategory(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const [pipelinePhase, setPipelinePhase] = useState<'idle' | 'intent' | 'generating' | 'policy' | 'optimizing'>('idle');
  const [showWhy, setShowWhy] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startListening = () => {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
          alert("Your browser does not support Voice Negotiation. Please use Chrome.");
          return;
      }
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsRecording(false);
          setTimeout(() => sendMessage(transcript), 100);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognition.start();
  };

  const speak = (text: string) => {
      if (!window.speechSynthesis) return;
      const cleanText = text.replace(/₹/g, 'rupees').replace(/\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (overrideInput?: string) => {
    const userMsg = overrideInput || input;
    if (!userMsg.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);
    setCurrentOffer(null);
    setAuditLog(null);
    setShowWhy(false);

    try {
      setPipelinePhase('intent');
      await sleep(600);
      setPipelinePhase('generating');
      
      const res = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userMessage: userMsg,
          currentRound: Math.floor(messages.length / 2) + 1,
          mainProductId: activeProduct.id
        })
      });
      const data = await res.json();
      
      if (data.error) {
         setMessages(prev => [...prev, { role: 'agent', text: `System Error: ${data.error}` }]);
         setLoading(false);
         setPipelinePhase('idle');
         return;
      }
      
      setPipelinePhase('policy');
      await sleep(800);
      setPipelinePhase('optimizing');
      await sleep(600);

      setMessages(prev => [...prev, { role: 'agent', text: data.agentMessage }]);
      speak(data.agentMessage);
      if (data.offer) {
        setCurrentOffer(data.offer);
      }
      if (data.audit_trail) {
        setAuditLog(data.audit_trail);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'agent', text: "Sorry, I'm having trouble connecting to my policy engine right now." }]);
    }
    setPipelinePhase('idle');
    setLoading(false);
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, offer: currentOffer })
      });
      const data = await res.json();
      
      if (res.status === 402 && data.recovery === 'emi_offer') {
        // Graceful failure — agent recovers with EMI
        setMessages(prev => [...prev, { 
          role: 'agent', 
          text: `High-value transaction detected. I've arranged an EMI plan instead: ₹${data.emiDetails.monthlyAmount.toLocaleString()}/month for ${data.emiDetails.months} months. Same total, easier on your budget.` 
        }]);
        setLoading(false);
        return;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'agent', text: "Network error. Let me try an alternative." }]);
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Toast Notification */}
      {toastMsg && (
          <div style={{
              position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: 'var(--accent-color)', color: '#000', padding: '12px 24px',
              borderRadius: '8px', fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              animation: 'slideIn 0.3s ease-out forwards'
          }}>
              {toastMsg}
          </div>
      )}

      {/* Glassmorphism Header */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '20px 5%', position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="Nuvora" className="brand-logo" />
        </div>
        <div style={{ display: 'flex', gap: '35px', color: 'var(--text-secondary)', alignItems: 'center' }}>
          <span style={{color: activeCategory === 'Laptops' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', fontWeight: activeCategory === 'Laptops' ? 600 : 400}} onClick={() => handleNavClick("Laptops")} onMouseOver={e=> e.currentTarget.style.color='var(--text-primary)'} onMouseOut={e=> e.currentTarget.style.color=activeCategory === 'Laptops' ? 'var(--text-primary)' : 'var(--text-secondary)'}>Laptops</span>
          <span style={{color: activeCategory === 'Accessories' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', fontWeight: activeCategory === 'Accessories' ? 600 : 400}} onClick={() => handleNavClick("Accessories")} onMouseOver={e=> e.currentTarget.style.color='var(--text-primary)'} onMouseOut={e=> e.currentTarget.style.color=activeCategory === 'Accessories' ? 'var(--text-primary)' : 'var(--text-secondary)'}>Accessories</span>
          <span style={{color: activeCategory === 'Support' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s', fontWeight: activeCategory === 'Support' ? 600 : 400}} onClick={() => handleNavClick("Support")} onMouseOver={e=> e.currentTarget.style.color='var(--text-primary)'} onMouseOut={e=> e.currentTarget.style.color=activeCategory === 'Support' ? 'var(--text-primary)' : 'var(--text-secondary)'}>Support</span>
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>
          <button onClick={() => setIsLightMode(!isLightMode)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <a href="/agent-demo" style={{ cursor: 'pointer', color: '#00e676', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(0,230,118,0.1)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg> Agent API
          </a>
          <a href="/admin" style={{ cursor: 'pointer', color: 'var(--accent-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(0,210,255,0.1)' }}>
            <ShieldCheck size={14} /> Control Room
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      {activeCategory === 'Laptops' && (
        <div style={{
          position: 'relative', width: '100%', height: '80vh', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          marginBottom: '80px', textAlign: 'center', overflow: 'hidden'
        }}>
          {HERO_SLIDES.map((slide, idx) => (
             <div key={slide.id} style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `var(--gradient-overlay), url(${slide.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: idx === heroIndex ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: idx === heroIndex ? 1 : 0
             }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)', marginBottom: '20px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '14px', backgroundColor: 'rgba(0,210,255,0.1)', padding: '8px 16px', borderRadius: '30px', border: '1px solid rgba(0,210,255,0.2)' }}>
                  <Zap size={16} /> {slide.tag}
                </div>
                <h2 style={{ fontSize: '72px', fontWeight: 800, margin: '0 0 20px 0', letterSpacing: '-2px', textShadow: '0 4px 20px rgba(0,0,0,0.5)', color: '#ffffff' }}>
                  {slide.title}
                </h2>
                <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 0 40px 0', lineHeight: 1.4, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {slide.subtitle}
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px' }} onClick={() => { window.scrollTo({ top: 800, behavior: 'smooth' }); }}>
                    Buy
                  </button>
                  <a href="#explore" style={{ color: '#fff', textDecoration: 'none', padding: '16px 40px', fontSize: '18px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', transition: 'background-color 0.2s' }} onMouseOver={e=> e.currentTarget.style.backgroundColor='rgba(255,255,255,0.2)'} onMouseOut={e=> e.currentTarget.style.backgroundColor='rgba(255,255,255,0.1)'}>
                    Explore Lineup
                  </a>
                </div>
             </div>
          ))}
          {/* Carousel Indicators */}
          <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '10px', zIndex: 10 }}>
            {HERO_SLIDES.map((_, idx) => (
              <div key={idx} onClick={() => setHeroIndex(idx)} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                backgroundColor: idx === heroIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer', transition: 'background-color 0.3s'
              }} />
            ))}
          </div>
        </div>
      )}

      <div id="explore" style={{ padding: '0 5%' }}>
        <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '40px', textAlign: 'center', letterSpacing: '-0.5px' }}>Explore {activeCategory}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
        {getActiveCatalog().map((product: any) => (
            <ProductCard 
                key={product.id} 
                product={{ ...product, onVisual: setVisualProduct, onAgent: setAgentProduct }} 
                onBuyNow={handleBuyNow} 
                onCheckoutFriction={handleCheckoutFriction} 
            />
        ))}
      </div>
      </div>

      {/* Landing Page Story (Feature 23) */}
      {activeCategory === 'Laptops' && (
        <section style={{ marginTop: '80px', padding: '60px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px' }}>Don't discount. Reframe the value.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            Nuvora turns price objections into intelligent offers — protecting merchant margins while giving customers more reasons to buy.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
             <div className="glass-panel" style={{ padding: '20px', width: '250px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer</div>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>"I need ₹5,000 off."</div>
             </div>
             
             <div style={{ color: 'var(--text-secondary)' }}>→</div>
             
             <div className="glass-panel" style={{ padding: '20px', width: '280px', border: '1px solid var(--accent-color)', backgroundColor: 'rgba(0, 210, 255, 0.05)' }}>
                <div style={{ fontSize: '12px', color: 'var(--accent-color)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Nuvora Agent</div>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>"Instead of reducing the price, let's include Nuvora Care+."</div>
             </div>
             
             <div style={{ color: 'var(--text-secondary)' }}>→</div>
             
             <div className="glass-panel" style={{ padding: '20px', width: '250px', border: '1px solid #00e676', backgroundColor: 'rgba(0, 230, 118, 0.05)' }}>
                <div style={{ fontSize: '12px', color: '#00e676', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Merchant Outcome</div>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>₹18,500 Margin Protected.</div>
             </div>
          </div>
        </section>
      )}

      {/* Live System Status (Feature 24) */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
         <div style={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
             <span style={{ color: '#00e676' }}>●</span> Nuvora Intelligence ONLINE
         </div>
         <div style={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
             <span style={{ color: '#00e676' }}>●</span> Policy Engine ACTIVE
         </div>
         <div style={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
             <span style={{ color: '#ffb300' }}>●</span> Razorpay TEST MODE
         </div>
      </div>

      {/* MarginMind Chat Widget */}
      {chatOpen && (
        <div className="glass-panel animate-slide-up chat-widget">
          {/* Chat Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <ShieldCheck size={20} color="var(--accent-color)" />
               <span style={{ fontWeight: 600 }}>Nuvora Agent</span>
             </div>
             <X size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setChatOpen(false)} />
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {messages.map((m, i) => (
               <div key={i} style={{ 
                 alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                 background: m.role === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                 color: m.role === 'user' ? '#000' : '#fff',
                 padding: '12px 16px', borderRadius: '12px', maxWidth: '85%',
                 fontWeight: m.role === 'user' ? 600 : 400
               }}>
                 {m.text}
               </div>
             ))}
             {loading && pipelinePhase !== 'idle' && (
               <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', width: '100%', fontSize: '13px', color: 'var(--text-secondary)' }}>
                 <div style={{ marginBottom: '8px', color: pipelinePhase === 'intent' ? 'var(--accent-color)' : '#fff' }}>
                    {pipelinePhase === 'intent' ? '● Detecting Intent...' : '✓ Intent Detected'}
                 </div>
                 {(pipelinePhase === 'generating' || pipelinePhase === 'policy' || pipelinePhase === 'optimizing') && (
                    <div style={{ marginBottom: '8px', color: pipelinePhase === 'generating' ? 'var(--accent-color)' : '#fff' }}>
                        {pipelinePhase === 'generating' ? '● Generating Candidates...' : '✓ Candidates Generated'}
                    </div>
                 )}
                 {(pipelinePhase === 'policy' || pipelinePhase === 'optimizing') && (
                    <div style={{ marginBottom: '8px', color: pipelinePhase === 'policy' ? 'var(--accent-color)' : '#fff' }}>
                        {pipelinePhase === 'policy' ? '● Policy Engine Validating...' : '✓ Policy Rules Checked'}
                    </div>
                 )}
                 {pipelinePhase === 'optimizing' && (
                    <div style={{ color: 'var(--accent-color)' }}>
                        ● Optimizer Scoring Expected Profit...
                    </div>
                 )}
               </div>
             )}
             
             {currentOffer && !loading && (
               <div style={{ border: '1px solid var(--accent-color)', borderRadius: '12px', padding: '16px', background: 'rgba(0, 210, 255, 0.05)', marginTop: '8px' }}>
                 {!showWhy ? (
                   <>
                     <div style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--accent-color)' }}>Approved Offer</div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '4px' }}>
                       <span>{activeProduct.name}</span>
                     </div>
                     {currentOffer.includedAddons.map((a: any) => (
                       <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>
                         <span>+ {a.name}</span>
                       </div>
                     ))}
                     <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '18px', color: '#fff' }}>
                       <span>Total</span>
                       <span>₹{currentOffer.finalPrice.toLocaleString('en-IN')}</span>
                     </div>
                     <button className="btn-primary" style={{ width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }} onClick={handleAccept} disabled={loading}>
                       {loading ? "Processing..." : "Accept & Pay"}
                     </button>
                     
                     <div style={{ marginTop: '12px', textAlign: 'center' }}>
                        <span style={{ cursor: 'pointer', fontSize: '12px', color: 'var(--accent-color)', textDecoration: 'underline' }} onClick={() => setShowWhy(true)}>Why this offer? →</span>
                     </div>
                   </>
                 ) : (
                   <>
                     <div style={{ fontWeight: 600, marginBottom: '16px', color: 'var(--accent-color)' }}>MERCHANT IMPACT</div>
                     
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Discount Avoided</span>
                        <span style={{ color: '#00e676' }}>₹{(activeProduct.price - currentOffer.finalPrice) > 0 ? (activeProduct.price - currentOffer.finalPrice).toLocaleString() : '0'}</span>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Customer Value Added</span>
                        <span style={{ color: '#00e676' }}>+₹{(currentOffer.customerValue - currentOffer.finalPrice) > 0 ? (currentOffer.customerValue - currentOffer.finalPrice).toLocaleString() : '0'}</span>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Margin Protected</span>
                        <span style={{ color: '#00e676', fontWeight: 600 }}>₹{currentOffer.margin.toLocaleString()}</span>
                     </div>
                     
                     <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', padding: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', marginBottom: '16px' }}>
                        Nuvora avoided reducing the main price and instead substituted low-cost, high-perceived-value items to save the sale while protecting margins.
                     </div>
                     
                     <button className="btn-secondary" style={{ width: '100%', fontSize: '13px' }} onClick={() => setShowWhy(false)}>
                       ← Back to Offer
                     </button>
                   </>
                 )}

                 {auditLog && !loading && !showWhy && (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '16px' }}>
                      <div style={{ marginBottom: '8px', fontWeight: 600, color: 'var(--accent-color)' }}>
                        CANDIDATE COMPARISON
                      </div>
                      <div style={{ marginBottom: '8px' }}>Intent: <span style={{ color: '#fff' }}>{auditLog.intent}</span></div>
                      
                      {auditLog.evaluations?.map((e: any, i: number) => {
                         const isSelected = currentOffer.finalPrice === e.evaluation.finalPrice && currentOffer.margin === e.evaluation.margin;
                         return (
                            <div key={i} style={{ marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.02)', borderLeft: `2px solid ${e.evaluation.isValid ? (isSelected ? '#00e676' : 'var(--border-color)') : '#ff1744'}` }}>
                              <div style={{ color: '#fff', marginBottom: '4px' }}>Option {i+1}: ₹{e.evaluation.finalPrice.toLocaleString()}</div>
                              <div style={{ opacity: 0.8, marginBottom: '4px' }}>Margin: ₹{e.evaluation.margin.toLocaleString()}</div>
                              {e.evaluation.isValid ? (
                                 <div style={{ color: isSelected ? '#00e676' : 'var(--text-secondary)' }}>{isSelected ? '✓ SELECTED (Highest Expected Profit)' : '✓ POLICY PASSED (Not Selected)'}</div>
                              ) : (
                                 <div style={{ color: '#ff1744' }}>❌ REJECTED</div>
                              )}
                            </div>
                         );
                      })}
                    </div>
                  )}
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px', alignItems: 'center' }}>
             <input 
               type="text" 
               value={input}
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && sendMessage()}
               placeholder="Negotiate..."
               style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '15px' }}
             />
             <Mic size={20} color={isRecording ? '#ef4444' : 'var(--text-secondary)'} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={startListening} />
             <Send size={20} color={input.trim() ? 'var(--accent-color)' : 'var(--text-secondary)'} style={{ cursor: 'pointer' }} onClick={() => sendMessage()} />
          </div>
        </div>
      )}

      {/* Visual Negotiator Modal */}
      {visualProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ backgroundColor: 'var(--bg-color)', padding: '40px', borderRadius: '16px', maxWidth: '600px', width: '90%', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }}>
              <X size={24} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setVisualProduct(null)} />
              
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Visual Negotiator</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Drag the slider to build your ideal package. More budget unlocks high-value freebies.</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 800 }}>
                  <span style={{ color: '#ef4444' }}>₹{Math.floor(visualProduct.price * 0.9).toLocaleString()}</span>
                  <span style={{ color: 'var(--accent-color)' }}>₹{visualProduct.price.toLocaleString()}</span>
              </div>
              
              <input type="range" min="90" max="100" step="5" defaultValue="100" style={{ width: '100%', marginBottom: '40px' }} 
                     onChange={(e) => {
                         const val = parseInt(e.target.value);
                         const el1 = document.getElementById('addon-mouse');
                         const el2 = document.getElementById('addon-care');
                         if (el1) el1.style.opacity = val === 100 ? '1' : '0.3';
                         if (el2) el2.style.opacity = val >= 95 ? '1' : '0.3';
                         setVisualPrice(Math.floor(visualProduct.price * (val / 100)));
                     }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--panel-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontWeight: 600 }}>{visualProduct.name}</span>
                      <span style={{ color: '#00e676' }}>Included</span>
                  </div>
                  <div id="addon-care" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--panel-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'opacity 0.2s' }}>
                      <span style={{ fontWeight: 600 }}>Nuvora Care+ (2 Years)</span>
                      <span style={{ color: '#00e676' }}>Included</span>
                  </div>
                  <div id="addon-mouse" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--panel-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'opacity 0.2s' }}>
                      <span style={{ fontWeight: 600 }}>Creator Mouse</span>
                      <span style={{ color: '#00e676' }}>Included</span>
                  </div>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }} onClick={() => handleBuyNow({ ...visualProduct, price: visualPrice })}>
                  Checkout for <span id="dynamic-price">₹{visualPrice.toLocaleString()}</span>
              </button>
           </div>
        </div>
      )}

      {/* Buyer Agent Modal */}
      {agentProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ backgroundColor: 'var(--bg-color)', padding: '40px', borderRadius: '16px', maxWidth: '600px', width: '90%', border: '1px solid rgba(16, 185, 129, 0.5)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }}>
              <X size={24} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setAgentProduct(null)} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ padding: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>🤖</div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Deploy Buyer Agent</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Give your AI Agent a goal, and it will negotiate with Nuvora's AI Agent on your behalf.</p>
              
              <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Your Goal</label>
                  <input type="text" defaultValue={`Get me the ${agentProduct.name} for under ₹${(agentProduct.price * 0.95).toLocaleString()} with extended warranty.`} id="agent-goal" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--panel-bg)', color: 'var(--text-primary)', fontSize: '15px' }} />
              </div>
              
              <div id="agent-logs" style={{ display: 'none', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: '#000', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', marginBottom: '20px', border: '1px solid #333' }}>
                  <div style={{ color: '#10b981' }}>[Buyer Agent] Connecting to Nuvora ACP (Agent Commerce Protocol)...</div>
                  <div id="log-1" style={{ display: 'none', color: '#fff' }}>[Buyer Agent] POST /api/agent/negotiate: Proposed ₹{(agentProduct.price * 0.85).toLocaleString()}</div>
                  <div id="log-2" style={{ display: 'none', color: '#ef4444' }}>[Nuvora Agent] 403: Margin Floor Violated. Counter-offer: ₹{(agentProduct.price).toLocaleString()} + Care+</div>
                  <div id="log-3" style={{ display: 'none', color: '#fff' }}>[Buyer Agent] POST /api/agent/negotiate: Proposed ₹{(agentProduct.price * 0.95).toLocaleString()}</div>
                  <div id="log-4" style={{ display: 'none', color: '#00e676', fontWeight: 'bold' }}>[Nuvora Agent] 200: Offer Accepted. Final Price: ₹{(agentProduct.price * 0.95).toLocaleString()} including Care+.</div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                  <button id="btn-deploy" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', backgroundColor: '#10b981' }} onClick={() => {
                      const logs = document.getElementById('agent-logs');
                      const btn = document.getElementById('btn-deploy');
                      const btnReset = document.getElementById('btn-reset');
                      if (!logs || !btn) return;

                      if (btn.getAttribute('data-action') === 'checkout') {
                          handleBuyNow({ ...agentProduct, price: agentProduct.price * 0.95 });
                          return;
                      }
                      
                      // Reset logic if running again
                      document.getElementById('log-1')!.style.display = 'none';
                      document.getElementById('log-2')!.style.display = 'none';
                      document.getElementById('log-3')!.style.display = 'none';
                      document.getElementById('log-4')!.style.display = 'none';
                      if (btnReset) btnReset.style.display = 'none';

                      logs.style.display = 'flex';
                      btn.innerText = 'Agents Negotiating...';
                      btn.setAttribute('disabled', 'true');
                      btn.setAttribute('data-action', 'running');
                      
                      setTimeout(() => { document.getElementById('log-1')!.style.display = 'block'; }, 800);
                      setTimeout(() => { document.getElementById('log-2')!.style.display = 'block'; }, 2000);
                      setTimeout(() => { document.getElementById('log-3')!.style.display = 'block'; }, 3200);
                      setTimeout(() => { 
                          document.getElementById('log-4')!.style.display = 'block'; 
                          btn.removeAttribute('disabled');
                          btn.innerText = 'Checkout Approved Bundle';
                          btn.setAttribute('data-action', 'checkout');
                          if (btnReset) btnReset.style.display = 'block';
                      }, 4500);
                  }}>
                      Deploy Agent
                  </button>
                  <button id="btn-reset" style={{ display: 'none', width: '100%', padding: '16px', fontSize: '16px', backgroundColor: 'transparent', border: '1px solid #333', color: '#ccc', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }} onClick={() => {
                      const logs = document.getElementById('agent-logs');
                      const btn = document.getElementById('btn-deploy');
                      const btnReset = document.getElementById('btn-reset');
                      if (!logs || !btn || !btnReset) return;
                      
                      logs.style.display = 'none';
                      btnReset.style.display = 'none';
                      btn.innerText = 'Deploy Agent';
                      btn.setAttribute('data-action', 'deploy');
                  }}>
                      Negotiate Again (Reset)
                  </button>
              </div>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '100px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '18px', letterSpacing: '1px' }}>NUVORA.</h4>
          <p style={{ margin: 0 }}>© 2026 Nuvora Inc. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer' }}>Sales Policy</span>
        </div>
      </footer>
    </main>
  );
}
