import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Wrench, 
  HardHat, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  AlertTriangle,
  Zap,
  Hexagon,
  Phone,
  Award,
  Users
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  // Fallback states for main logos
  const [navLogoExt, setNavLogoExt] = useState('png');
  const [contactBTLogoExt, setContactBTLogoExt] = useState('png'); 
  const [footerLogoExt, setFooterLogoExt] = useState('png');

  const handleExtFallback = (currentExt, setExtFn, fallbackOrder) => {
    const currentIndex = fallbackOrder.indexOf(currentExt);
    if (currentIndex !== -1 && currentIndex < fallbackOrder.length - 1) {
      setExtFn(fallbackOrder[currentIndex + 1]);
    }
  };

  // ==========================================
  // 📸 PHOTOS (Set to .jpg)
  // ==========================================
  const kitPhotos = [
    '/photos/kit (1).jpg',
    '/photos/kit (2).jpg',
    '/photos/kit (3).jpg'
  ];

  const docPhotos = [
    '/photos/doc (1).jpg',
    '/photos/doc (2).jpg',
    '/photos/doc (3).jpg'
  ];

  const [currentKitIdx, setCurrentKitIdx] = useState(0);
  const [currentDocIdx, setCurrentDocIdx] = useState(0);
  const [failedKitPhotos, setFailedKitPhotos] = useState({});
  const [failedDocPhotos, setFailedDocPhotos] = useState({});
  const [partnerExts, setPartnerExts] = useState({});
  const [failedLogos, setFailedLogos] = useState({});

  const partnerLogos = [
    { name: "AIR2WORK", baseName: "air2work" },
  ];

  useEffect(() => {
    const kitInterval = setInterval(() => {
      setCurrentKitIdx(prev => (prev + 1) % kitPhotos.length);
    }, 5000);
    const docInterval = setInterval(() => {
      setCurrentDocIdx(prev => (prev + 1) % docPhotos.length);
    }, 5000);
    return () => {
      clearInterval(kitInterval);
      clearInterval(docInterval);
    };
  }, [kitPhotos.length, docPhotos.length]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.target);
    formData.append("access_key", "e5e7d78e-b3bd-46c1-901e-a88ccb01d584"); 
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) setFormStatus('success');
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  const handlePartnerLogoError = (name) => {
    const fallbackOrder = ['svg', 'SVG', 'png', 'PNG', 'jpg', 'JPG'];
    setPartnerExts(prev => {
      const currentExt = prev[name] || 'svg';
      const nextIdx = fallbackOrder.indexOf(currentExt) + 1;
      if (nextIdx < fallbackOrder.length) return { ...prev, [name]: fallbackOrder[nextIdx] };
      setFailedLogos(f => ({ ...f, [name]: true }));
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-900">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 md:h-24 items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <img 
                src={`/logo.${navLogoExt}`} 
                alt="Ex Mobilise WA" 
                className="h-18 md:h-22 w-auto object-contain drop-shadow-md"
                onError={() => handleExtFallback(navLogoExt, setNavLogoExt, ['png', 'PNG', 'svg', 'SVG'])}
              />
            </div>
            <div className="hidden md:flex space-x-8 items-center text-slate-300">
              <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 font-medium transition-colors">Services</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-amber-400 font-medium transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="bg-amber-500 text-slate-900 px-6 py-2.5 rounded-md font-bold transition-all shadow-lg hover:bg-amber-400">Book Inspection</button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white">
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><pattern id="h" width="50" height="86" patternUnits="userSpaceOnUse"><path d="M25 0L50 14v28L25 57 0 43V14z" fill="none" stroke="#f59e0b" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#h)"/></svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Now Serving Australian Oil & Gas</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight">Pre-Mobilisation <br/><span className="text-amber-500 italic">Compliance.</span></h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">Ensuring your equipment passes major operator gate checks with expert EEHA inspections and HAVD compilation.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-amber-500 text-slate-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-400 transition-all shadow-lg">Book Inspection</button>
              <a href="tel:+61434101707" className="border border-slate-700 text-white px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center hover:bg-slate-800 transition-all"><Phone className="mr-2 h-5 w-5 text-amber-500" /> 0434 101 707</a>
            </div>
          </div>

          <div className="w-full md:w-2/5 relative">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl relative z-10 transform rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
              <div className="flex justify-between items-center mb-6 border-b border-slate-700/60 pb-4">
                <div className="flex items-center">
                  <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 mr-3">
                    <FileCheck className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight">Inspection Test Record (ITR)</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Form No. ITR-EEHA-01</p>
                  </div>
                </div>
                <span className="bg-green-500/20 text-green-400 text-xs font-black px-2.5 py-1 rounded-full border border-green-500/30 tracking-wider">COMPLIANT</span>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 border-b border-slate-700/40 pb-3 text-xs">
                  <div>
                    <span className="text-slate-500 block uppercase font-bold tracking-wider">Equipment Tag</span>
                    <span className="text-slate-300 font-mono font-semibold">45-EX-SKID-02</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-bold tracking-wider">Protection Type</span>
                    <span className="text-slate-300 font-mono font-semibold">Ex d e [ia] IIC T4 Gb</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-slate-300 text-xs md:text-sm">
                    <span className="flex items-center"><CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" /> Flamepath Cleanliness & Gap Check</span>
                    <span className="text-xs text-green-400 font-mono font-bold">PASS</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300 text-xs md:text-sm">
                    <span className="flex items-center"><CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" /> Cable Entry IP Gland Integrity</span>
                    <span className="text-xs text-green-400 font-mono font-bold">PASS</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300 text-xs md:text-sm">
                    <span className="flex items-center"><CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" /> Equipment Earth Bonding (≤ 0.1Ω)</span>
                    <span className="text-xs text-green-400 font-mono font-bold">0.03Ω</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/40 flex justify-between items-center text-xs text-slate-400 mt-4">
                  <div>
                    <p className="font-bold text-slate-300">Approving Inspector</p>
                    <p className="font-mono text-[10px] text-amber-500">Subject Matter Expert</p>
                  </div>
                  <div className="h-14 w-14 border border-dashed border-amber-500/50 rounded-full flex items-center justify-center text-[9px] text-amber-500 font-extrabold rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 select-none tracking-wider">
                    APPROVED
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full -z-0 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="bg-slate-100 py-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Proudly Partnered With</p>
          <div className="flex justify-center items-center gap-12 opacity-60">
            {partnerLogos.map(l => (
              <img key={l.name} src={`/logos/${l.baseName}.${partnerExts[l.name] || 'svg'}`} alt={l.name} className="h-10 object-contain" onError={() => handlePartnerLogoError(l.name)} />
            ))}
          </div>
        </div>
      </div>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black uppercase mb-6">Specialist Services.</h2>
            <div className="h-2 w-20 bg-amber-500 mb-6"></div>
            <p className="text-lg text-slate-600 leading-relaxed">Focusing exclusively on the high-consequence requirements of Hazardous Area compliance.</p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
            {['Pre-Mob Inspections', 'HAVD Compilation', 'Ex Rectification', 'SME Consulting'].map((s, i) => (
              <div key={i} className="p-6 border-l-4 border-amber-500 bg-slate-50">
                <ShieldCheck className="h-8 w-8 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 uppercase">{s}</h3>
                <p className="text-slate-600 leading-relaxed">Specialized technical support to guarantee compliance under AS/NZS 60079 parameters.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-[4/5] bg-slate-800 rounded-2xl border-2 border-amber-500 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                   <Users className="h-20 w-20 text-slate-700" />
                   <p className="absolute bottom-4 text-[10px] text-slate-500 uppercase tracking-widest text-center px-4">Upload headshot.jpg to /public/photos/</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase">The Lead Inspector.</h2>
              <p className="text-xl text-amber-500 font-bold mb-6 italic">"Integrity isn't just about the equipment; it's about the sign-off."</p>
              <div className="space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed">
                <p>
                  With a strong foundation across the North West Shelf and the Pilbara, I established <strong>Ex Mobilise [WA]</strong> to provide a specialized, high-trust alternative to large inspection firms. While headquartered in Western Australia, my services are available nationwide for worthwhile project scopes.
                </p>
                <p>
                  I am a Subject Matter Expert (SME) in <strong>EEHA Compliance</strong>, focusing on the unique challenges of temporary, transportable, and hired equipment. I understand the "Zero Tolerance" gate-checks of major operators because I've been on the other side of them.
                </p>
                <p className="text-slate-400 text-base border-l-2 border-amber-500 pl-4 italic">
                  My approach is practical but strictly by the book. I have the capability to rectify minor issues (such as incorrect glands or minor wiring faults) on the spot to keep your mobilisation on track. However, major discrepancies are pushed firmly back to the OEM. I do not rubber-stamp equipment; I ensure absolute adherence to AS/NZS 60079.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="text-amber-500 font-black text-4xl mb-1">10+</h4>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-amber-500 font-black text-3xl mb-1 mt-1">Zero</h4>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Compromise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FIELD READINESS SLIDESHOWS --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4 text-slate-900">From Yard to Site</h2>
            <p className="text-lg text-slate-600">Rigorous physical inspections backed by immaculate Verification Dossiers.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center relative group border-2 border-slate-300">
              {!failedKitPhotos[kitPhotos[currentKitIdx]] ? (
                <img src={kitPhotos[currentKitIdx]} alt="Kit" className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" onError={() => setFailedKitPhotos(p => ({...p, [kitPhotos[currentKitIdx]]: true}))} />
              ) : <HardHat className="text-slate-400 h-16 w-16" />}
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-center uppercase tracking-wider text-sm">Physical Ex Inspections</p>
              </div>
            </div>
            <div className="aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center relative group border-2 border-slate-300">
              {!failedDocPhotos[docPhotos[currentDocIdx]] ? (
                <img src={docPhotos[currentDocIdx]} alt="Docs" className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" onError={() => setFailedDocPhotos(p => ({...p, [docPhotos[currentDocIdx]]: true}))} />
              ) : <FileCheck className="text-slate-400 h-16 w-16" />}
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-center uppercase tracking-wider text-sm">Verification Dossiers (HAVD)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4">Book Your Inspection</h2>
            <p className="text-xl text-slate-600">Response time usually within 2 hours (AWST business hours).</p>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl mb-16">
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-2 uppercase">Request Logged</h3>
                <p className="text-lg text-slate-600">I'll be in touch shortly to confirm the scope.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" name="name" required placeholder="Name" className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-0 transition-all font-bold" />
                  <input type="text" name="company" required placeholder="Company" className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-0 transition-all font-bold" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="email" name="email" required placeholder="Email Address" className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-0 transition-all font-bold" />
                  <input type="tel" name="phone" required placeholder="Mobile Number" className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-0 transition-all font-bold" />
                </div>
                <textarea name="message" rows="4" placeholder="Equipment Type & Mobilisation Dates..." className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-0 transition-all font-bold"></textarea>
                <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-xl text-xl uppercase tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all shadow-xl">
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Operations & Deployment</p>
              <p className="text-base font-bold text-slate-600 uppercase">Perth Headquartered — Nationwide Availability</p>
              <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto md:mx-0">Available for local metro yard inspections and mobilization to sites across Australia.</p>
              
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 mt-6">Direct Contact</p>
              <a href="mailto:inspections@exmobilisewa.com.au" className="block text-xl font-black hover:text-amber-500 transition-colors">inspections@exmobilisewa.com.au</a>
              <a href="tel:+61434101707" className="block text-xl font-black text-amber-600 hover:text-amber-500 transition-colors">0434 101 707</a>
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Business Details</p>
              <div className="flex flex-col items-center md:items-start gap-4 border-l-4 border-amber-500 bg-slate-50 p-6 shadow-md rounded-r-xl w-fit mx-auto md:mx-0">
                <div className="flex-shrink-0">
                  <img 
                    src={`/logobt.${contactBTLogoExt}`} 
                    alt="Ex Mobilise WA Logo" 
                    className="h-20 md:h-24 w-auto object-contain opacity-90" 
                    onError={() => handleExtFallback(contactBTLogoExt, setContactBTLogoExt, ['png', 'PNG', 'svg', 'SVG'])}
                  />
                </div>
                <div className="w-full mt-2 p-4 bg-slate-100 rounded-lg border border-slate-200 text-center md:text-left">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Compliance</p>
                  <p className="text-sm font-bold text-slate-600 uppercase">ABN: 52 667 400 704</p>
                  <p className="text-sm font-bold text-slate-600 uppercase mt-0.5">EC: 15735</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 py-12 text-slate-500 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="flex items-center justify-center mb-6 opacity-80 cursor-pointer hover:opacity-100 transition-opacity" onClick={() => scrollToSection('home')}>
            <img 
              src={`/logo.${footerLogoExt}`} 
              alt="Ex Mobilise WA Logo" 
              className="h-14 md:h-16 w-auto object-contain grayscale opacity-70"
              onError={() => handleExtFallback(footerLogoExt, setFooterLogoExt, ['png', 'PNG', 'svg', 'SVG'])}
            />
          </div>
          <p className="font-bold text-slate-400 mb-2 uppercase tracking-widest"> &copy; {new Date().getFullYear()} All Rights Reserved</p>
          <p className="mb-4">Lead inspection and HAVD services for the Australian and international energy sectors.</p>
          <div className="flex items-center justify-center space-x-3 text-xs font-black text-slate-500 uppercase tracking-widest">
            <span>ABN: 52 667 400 704</span>
            <span className="w-1.5 h-1.5 bg-amber-500/50 rounded-full"></span>
            <span>EC: 15735</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
