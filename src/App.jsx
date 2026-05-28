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
  Users,
  Database,
  Sliders,
  HelpCircle,
  Droplets,
  Box
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  // Interactive Reference Calculator States
  const [selectedConcept, setSelectedConcept] = useState('db');
  const [selectedGroup, setSelectedGroup] = useState('IIC');
  const [selectedTemp, setSelectedTemp] = useState('T4');
  const [selectedEpl, setSelectedEpl] = useState('Gb');
  const [selectedBracket, setSelectedBracket] = useState('none');
  const [selectedSuffix, setSelectedSuffix] = useState('none');
  const [selectedIP1, setSelectedIP1] = useState('6'); // Solids/Dust
  const [selectedIP2, setSelectedIP2] = useState('6'); // Water

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

  const kitPhotos = ['/photos/kit (1).jpg', '/photos/kit (2).jpg', '/photos/kit (3).jpg'];
  const docPhotos = ['/photos/doc (1).jpg', '/photos/doc (2).jpg', '/photos/doc (3).jpg'];

  const [currentKitIdx, setCurrentKitIdx] = useState(0);
  const [currentDocIdx, setCurrentDocIdx] = useState(0);
  const [failedKitPhotos, setFailedKitPhotos] = useState({});
  const [failedDocPhotos, setFailedDocPhotos] = useState({});
  const [partnerExts, setPartnerExts] = useState({});
  const [failedLogos, setFailedLogos] = useState({});

  const partnerLogos = [{ name: "AIR2WORK", baseName: "air2work" }];

  useEffect(() => {
    const kitInterval = setInterval(() => setCurrentKitIdx(prev => (prev + 1) % kitPhotos.length), 5000);
    const docInterval = setInterval(() => setCurrentDocIdx(prev => (prev + 1) % docPhotos.length), 5000);
    return () => { clearInterval(kitInterval); clearInterval(docInterval); };
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
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
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

  const applyPreset = (preset) => {
    switch (preset) {
      case 'skid_jb':
        setSelectedConcept('eb'); setSelectedGroup('IIC'); setSelectedTemp('T4'); setSelectedEpl('Gb'); setSelectedIP1('6'); setSelectedIP2('6');
        break;
      case 'is_instrument':
        setSelectedConcept('ia'); setSelectedGroup('IIC'); setSelectedTemp('T6'); setSelectedEpl('Ga'); setSelectedBracket('ia'); setSelectedIP1('6'); setSelectedIP2('7');
        break;
      default: break;
    }
  };

  // --- REFERENCE DICTIONARIES ---
  const ipSolids = {
    '0': 'No protection against contact and ingress of objects.',
    '1': 'Protected against objects >50mm (e.g., accidental hand touch).',
    '2': 'Protected against objects >12.5mm (e.g., fingers).',
    '3': 'Protected against objects >2.5mm (e.g., tools, thick wires).',
    '4': 'Protected against objects >1mm (e.g., most wires, slender screws).',
    '5': 'Dust Protected. Ingress of dust is not entirely prevented, but it must not enter in sufficient quantity to interfere with operation.',
    '6': 'Dust Tight. No ingress of dust; complete protection against contact. (Mandatory for IIIC Conductive Dust).'
  };

  const ipLiquids = {
    '0': 'No protection.',
    '1': 'Protected against vertically falling drops of water.',
    '2': 'Protected against drops at 15° tilt.',
    '3': 'Protected against spraying water (Rain) up to 60° from vertical.',
    '4': 'Protected against splashing water from any direction.',
    '5': 'Protected against low-pressure water jets (6.3mm nozzle).',
    '6': 'Protected against powerful water jets (12.5mm nozzle). Standard for heavy seas/deck washdown.',
    '7': 'Protected against temporary immersion (1m depth for 30 mins).',
    '8': 'Protected against continuous immersion (under pressure/depth specified by OEM).',
    '9': 'Protected against high-pressure/steam-jet cleaning (Close range).'
  };

  const conceptsDict = {
    'db': { standard: 'AS/NZS 60079.1', title: 'Flameproof Enclosure', desc: 'Designed to contain an internal explosion and prevent flame propagation. Critical: Check flamepath gaps and bolt torque.' },
    'eb': { standard: 'AS/NZS 60079.7', title: 'Increased Safety', desc: 'Adds high security against arcs/sparks and hot spots. Requires specific terminal tightness and IP integrity.' },
    'ia': { standard: 'AS/NZS 60079.11', title: 'Intrinsic Safety (Ga)', desc: 'Limits energy to safe levels under two fault conditions. Requires compatible Zener barriers or isolators.' },
    'ib': { standard: 'AS/NZS 60079.11', title: 'Intrinsic Safety (Gb)', desc: 'Limits energy to safe levels under one fault condition. Used in Zone 1.' },
    'ic': { standard: 'AS/NZS 60079.11', title: 'Intrinsic Safety (Gc)', desc: 'Limits energy under normal operation. Suitable for Zone 2.' },
    'pxb': { standard: 'AS/NZS 60079.2', title: 'Pressurised Enclosure', desc: 'Maintains internal overpressure to exclude flammable gas. Requires purge cycle.' }
  };

  const groupsDict = {
    'I': { type: 'Mining', detail: 'Firedamp/Coal Dust risk.' },
    'IIA': { type: 'Gas IIA (Propane)', detail: 'Least easily ignited gas group.' },
    'IIB': { type: 'Gas IIB (Ethylene)', detail: 'Moderate ignition risk. Standard for general O&G.' },
    'IIC': { type: 'Gas IIC (Hydrogen)', detail: 'Highest gas ignition risk. Very narrow flamepaths required.' },
    'IIIC': { type: 'Conductive Dust', detail: 'Requires IP6X tight sealing to prevent conductive paths.' }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-900">
      
      {/* --- NAV --- */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 md:h-24 items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <img src={`/logo.${navLogoExt}`} alt="Ex Mobilise" className="h-18 md:h-22 w-auto object-contain" onError={() => handleExtFallback(navLogoExt, setNavLogoExt, ['png','svg'])} />
            </div>
            <div className="hidden md:flex space-x-8 items-center text-slate-300">
              <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 font-bold uppercase text-sm tracking-widest">Services</button>
              <button onClick={() => scrollToSection('calculator')} className="hover:text-amber-400 font-bold uppercase text-sm tracking-widest text-amber-500">Ex Decipher</button>
              <button onClick={() => scrollToSection('contact')} className="bg-amber-500 text-slate-900 px-6 py-2.5 rounded-md font-black uppercase text-sm tracking-widest">Book Inspection</button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section id="home" className="pt-40 pb-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase leading-[0.9]">Yard Gate <br/><span className="text-amber-500 italic">Clearance.</span></h1>
            <p className="text-xl text-slate-400 mb-8 max-w-lg">Technical Ex inspections and dossier compilation for immediate site mobilisation.</p>
            <button onClick={() => scrollToSection('contact')} className="bg-amber-500 text-slate-900 px-8 py-4 rounded-md font-black text-xl uppercase">Book Now</button>
          </div>
        </div>
      </section>

      {/* --- EX REFERENCE DECODER TOOL --- */}
      <section id="calculator" className="py-24 bg-slate-900 text-white relative border-t border-amber-500">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Ex & IP Decoder</h2>
            <p className="text-xl text-slate-400">Interactive Reference Guide to AS/NZS 60079 & AS 60529</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button onClick={() => applyPreset('skid_jb')} className="px-5 py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-900 rounded-lg text-sm font-bold transition-all uppercase">Skid Junction Box</button>
              <button onClick={() => applyPreset('is_instrument')} className="px-5 py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-900 rounded-lg text-sm font-bold transition-all uppercase">IS Instrument</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* INPUT PANEL (LARGE FONTS) */}
            <div className="lg:col-span-5 bg-slate-800 rounded-2xl border border-slate-700 p-8 space-y-8 shadow-2xl">
              <h3 className="text-xl font-black uppercase text-amber-500 flex items-center border-b border-slate-700 pb-4">
                <Sliders className="mr-3 h-6 w-6" /> Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Concept</label>
                  <select value={selectedConcept} onChange={(e)=>setSelectedConcept(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg text-amber-400 outline-none">
                    {Object.keys(conceptsDict).map(c => <option key={c} value={c}>Ex {c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Gas/Dust Group</label>
                  <select value={selectedGroup} onChange={(e)=>setSelectedGroup(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg outline-none">
                    {Object.keys(groupsDict).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Temp Class</label>
                  <select value={selectedTemp} onChange={(e)=>setSelectedTemp(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg text-amber-500 outline-none">
                    {['T1','T2','T3','T4','T5','T6'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">EPL</label>
                  <select value={selectedEpl} onChange={(e)=>setSelectedEpl(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg outline-none">
                    {['Ga','Gb','Gc'].map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-700 pt-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">IP (Solids)</label>
                  <select value={selectedIP1} onChange={(e)=>setSelectedIP1(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg text-blue-400 outline-none">
                    {[0,1,2,3,4,5,6].map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">IP (Water)</label>
                  <select value={selectedIP2} onChange={(e)=>setSelectedIP2(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg text-blue-400 outline-none">
                    {[0,1,2,3,4,5,6,7,8,9].map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Associated Apparatus Brackets [ ]</label>
                <select value={selectedBracket} onChange={(e)=>setSelectedBracket(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg outline-none">
                  <option value="none">None</option>
                  <option value="ia">[ia] - Energy Limited at Barrier</option>
                  <option value="ib">[ib] - Energy Limited at Barrier</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Suffix</label>
                <select value={selectedSuffix} onChange={(e)=>setSelectedSuffix(e.target.value)} className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-black text-lg outline-none">
                  <option value="none">None</option>
                  <option value="X">X - Specific Conditions Apply</option>
                  <option value="U">U - Incomplete Component</option>
                </select>
              </div>
            </div>

            {/* OUTPUT PANEL (LARGE DISPLAY) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* LARGE STRING OUTPUT */}
              <div className="bg-slate-950 rounded-2xl border-4 border-amber-500 p-8 shadow-2xl relative">
                <div className="text-4xl md:text-6xl font-mono font-black tracking-tighter flex flex-wrap gap-x-3 gap-y-2">
                  <span className="text-white">Ex</span>
                  <span className="text-amber-500">{selectedConcept}</span>
                  <span className="text-slate-400">{selectedGroup}</span>
                  <span className="text-amber-600">{selectedTemp}</span>
                  <span className="text-slate-500">{selectedEpl}</span>
                  <span className="text-blue-500">IP{selectedIP1}{selectedIP2}</span>
                  {selectedBracket !== 'none' && <span className="text-indigo-400">[{selectedBracket}]</span>}
                  {selectedSuffix !== 'none' && <span className="text-red-500 animate-pulse">{selectedSuffix}</span>}
                </div>
              </div>

              {/* DETAILED DEFINITIONS */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">Concept Definition</span>
                      <p className="text-xl font-black text-white">{conceptsDict[selectedConcept].title}</p>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{conceptsDict[selectedConcept].desc}</p>
                    </div>
                    <div>
                      <span className="text-xs font-black text-blue-400 uppercase tracking-widest block mb-1">Ingress Protection (Solids)</span>
                      <p className="text-base text-slate-300 leading-relaxed">{ipSolids[selectedIP1]}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1">Environmental Group</span>
                      <p className="text-xl font-black text-white">{groupsDict[selectedGroup].type}</p>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{groupsDict[selectedGroup].detail}</p>
                    </div>
                    <div>
                      <span className="text-xs font-black text-blue-400 uppercase tracking-widest block mb-1">Ingress Protection (Water)</span>
                      <p className="text-base text-slate-300 leading-relaxed">{ipLiquids[selectedIP2]}</p>
                    </div>
                  </div>
                </div>

                {/* DUST CONFLICT WARNING */}
                {selectedGroup === 'IIIC' && selectedIP1 !== '6' && (
                  <div className="mt-8 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl flex items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-red-500 animate-bounce" />
                    <p className="text-red-200 font-bold uppercase text-sm">Non-Compliance: Group IIIC Conductive Dust requires IP6X rating.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT (VERTICAL STACK AS REQUESTED) --- */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black uppercase mb-6 tracking-tighter">Direct Contact</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
            <a href="mailto:inspections@exmobilisewa.com.au" className="text-xl font-black hover:text-amber-500 block mb-6">inspections@exmobilisewa.com.au</a>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile</p>
            <a href="tel:+61434101707" className="text-3xl font-black text-amber-600">0434 101 707</a>
          </div>
          <div>
            <div className="flex flex-col gap-6 bg-slate-50 p-8 border-l-4 border-amber-500 shadow-xl rounded-r-2xl">
              <img src={`/logobt.${contactBTLogoExt}`} alt="Ex Mobilise" className="h-24 w-auto object-contain self-start" onError={()=>handleExtFallback(contactBTLogoExt, setContactBTLogoExt, ['png','svg'])} />
              <div className="p-5 bg-white border border-slate-200 rounded-lg">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Business Compliance</p>
                <p className="text-base font-black text-slate-700">ABN: 52 667 400 704</p>
                <p className="text-base font-black text-slate-700">EC: 15735</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-16 text-center text-slate-500">
        <img src={`/logo.${footerLogoExt}`} alt="Ex Mobilise" className="h-16 mx-auto mb-8 opacity-60 grayscale" onError={()=>handleExtFallback(footerLogoExt, setFooterLogoExt, ['png','svg'])} />
        <p className="text-xs font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} Ex Mobilise [WA] | All Rights Reserved</p>
      </footer>
    </div>
  );
}
