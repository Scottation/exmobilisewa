import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Wrench, 
  HardHat, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  AlertTriangle,
  Zap,
  Hexagon
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1000);
  };

  const hexClipPath = { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-900">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div 
                className="bg-amber-500 flex items-center justify-center h-10 w-10 mr-3"
                style={hexClipPath}
              >
                <Zap className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-xl font-bold text-white tracking-tight leading-none">ExMobilise WA</span>
                <span className="block text-xs text-amber-500 font-semibold tracking-wider mt-1">EEHA INSPECTION SME</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-amber-400 font-medium transition-colors cursor-pointer">Services</button>
              <button onClick={() => scrollToSection('why-me')} className="text-slate-300 hover:text-amber-400 font-medium transition-colors cursor-pointer">Why an SME?</button>
              <button onClick={() => scrollToSection('process')} className="text-slate-300 hover:text-amber-400 font-medium transition-colors cursor-pointer">Process</button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2.5 rounded-md font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer"
              >
                Book Inspection
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-md cursor-pointer">Services</button>
              <button onClick={() => scrollToSection('why-me')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-md cursor-pointer">Why an SME?</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-md cursor-pointer">Process</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-center mt-4 bg-amber-500 text-slate-900 px-3 py-3 rounded-md font-bold cursor-pointer">Book Inspection</button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-25">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="86.6" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                <path d="M 25 -0.5 L 44 10.5 L 44 32.5 L 25 43.5 L 6 32.5 L 6 10.5 Z" fill="none" stroke="#f59e0b" strokeWidth="2" strokeOpacity="1"/>
                <path d="M 0 43 L 19 54 L 19 76 L 0 87 L -19 76 L -19 54 Z" fill="none" stroke="#f59e0b" strokeWidth="2" strokeOpacity="1"/>
                <path d="M 50 43 L 69 54 L 69 76 L 50 87 L 31 76 L 31 54 Z" fill="none" stroke="#f59e0b" strokeWidth="2" strokeOpacity="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 md:pr-12 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-300">AS/NZS 60079 Compliant Inspections</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Stop Offshore Delays Before They <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Happen.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Expert pre-mobilisation EEHA inspections and dossier compilation for the WA Oil &amp; Gas sector. We ensure your temporary equipment, skids, and portables pass major operator gate checks the first time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg flex items-center justify-center group cursor-pointer"
              >
                Schedule Pre-Mob Inspection
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center cursor-pointer"
              >
                View Services
              </button>
            </div>
          </div>
          
          <div className="hidden md:block md:w-2/5 relative mt-12 md:mt-0">
            {/* Visual mockup of an Ex piece of equipment/report */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <div className="flex items-center">
                  <FileCheck className="h-8 w-8 text-amber-500 mr-3" />
                  <h3 className="text-white font-bold text-xl">Verification Dossier</h3>
                </div>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">COMPLIANT</span>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                <div className="pt-4 flex items-center text-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> Visual Inspection: PASS
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> Close Inspection: PASS
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> Equipment Protection Level: Gb
                </div>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-3xl rounded-full -z-0"></div>
          </div>
        </div>
      </section>

      {/* --- WHY AN SME? SECTION --- */}
      <section id="why-me" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-l-4 border-amber-500 pl-4">
                Specialized EEHA Expertise.
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Hazardous Area compliance is incredibly complex, and standard electrical experience simply isn't enough when dealing with explosive atmospheres. You need an inspector who intimately understands the rigorous documentation required by major O&amp;G operators.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                As an EEHA Subject Matter Expert, I bring specialized focus to pre-mobilisation compliance for the WA resource sector. I know exactly what is demanded at the gate for projects in the Pilbara, Browse Basin, and offshore North West Shelf.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Hexagon className="h-6 w-6 text-amber-500 fill-amber-500/20" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-bold text-slate-900">SME-Level Insight</h4>
                    <p className="text-slate-600">Bringing deep, up-to-date expertise in AS/NZS 60079.14 and 60079.17 compliance, ensuring your dossiers are completely bulletproof.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Hexagon className="h-6 w-6 text-amber-500 fill-amber-500/20" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-bold text-slate-900">Prevent Site Rejections</h4>
                    <p className="text-slate-600">Equipment turned around at the gate costs thousands in logistics and delays. My dossiers ensure seamless entry.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-slate-800 opacity-50">
                <ShieldCheck className="h-48 w-48" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                  <h3 className="text-2xl font-bold">The Cost of Non-Compliance</h3>
                </div>
                <blockquote className="text-xl font-medium italic text-slate-300 mb-6 border-l-2 border-slate-600 pl-6">
                  "Sending a generator or temporary skid offshore without a rigorously verified Hazardous Area Verification Dossier (HAVD) is a guaranteed way to halt your project and incur massive day-rate penalties."
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-slate-800 h-12 w-12 rounded-full flex items-center justify-center mr-4 border border-slate-700">
                    <HardHat className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Your Assurance</div>
                    <div className="text-sm text-amber-500">EEHA SME / Lead Inspector</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Specialist EEHA Services</h2>
            <p className="mt-4 text-xl text-slate-600">
              Comprehensive inspection and documentation services tailored for temporary and transportable Ex equipment mobilisation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
              <div 
                className="bg-amber-100 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors"
                style={hexClipPath}
              >
                <ShieldCheck className="h-8 w-8 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pre-Mob Ex Inspections</h3>
              <p className="text-slate-600 mb-4">
                Detailed, Close, and Visual inspections conducted in Perth yards prior to mobilisation to ensure compliance with AS/NZS 60079.17.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Generators &amp; Compressors</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Temporary Habitats</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Specialized Tooling</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
              <div 
                className="bg-amber-100 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors"
                style={hexClipPath}
              >
                <FileCheck className="h-8 w-8 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">HAVD Compilation</h3>
              <p className="text-slate-600 mb-4">
                Creation, review, and auditing of Hazardous Area Verification Dossiers. We bridge the paperwork gap that often causes site entry failures.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> IECEx Certificate Verification</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Calculation Reviews (IS loops)</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Operator-Specific Formatting</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
              <div 
                className="bg-amber-100 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors"
                style={hexClipPath}
              >
                <Wrench className="h-8 w-8 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compliance Rectification</h3>
              <p className="text-slate-600 mb-4">
                Identified a non-compliance? We provide expert guidance and technical solutions to rectify issues rapidly without compromising Ex integrity.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Gland &amp; Cable Replacements</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Enclosure Integrity Checks</li>
                <li className="flex items-center"><ChevronRight className="h-4 w-4 text-amber-500 mr-1"/> Labeling &amp; Tagging Compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">The Pre-Mobilisation Process</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">A streamlined approach designed specifically for tight logistics schedules.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="w-16 h-16 relative flex items-center justify-center mb-6 z-10">
                <div className="absolute inset-0 bg-amber-500" style={hexClipPath}></div>
                <div className="absolute inset-[2px] bg-slate-800 flex items-center justify-center" style={hexClipPath}>
                  <span className="text-2xl font-bold text-amber-500">1</span>
                </div>
              </div>
              <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-slate-700 -z-0"></div>
              <h4 className="text-xl font-bold mb-2">Scope &amp; Review</h4>
              <p className="text-slate-400 text-sm">Send your equipment list and existing documentation. We review for obvious gaps before even stepping on site.</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 relative flex items-center justify-center mb-6 z-10">
                <div className="absolute inset-0 bg-slate-700" style={hexClipPath}></div>
                <div className="absolute inset-[2px] bg-slate-800 flex items-center justify-center" style={hexClipPath}>
                  <span className="text-2xl font-bold text-amber-500">2</span>
                </div>
              </div>
              <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-slate-700 -z-0"></div>
              <h4 className="text-xl font-bold mb-2">Yard Inspection</h4>
              <p className="text-slate-400 text-sm">We mobilize to your Perth yard or transport hub to conduct rigorous AS/NZS 60079 Detailed/Close inspections.</p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 relative flex items-center justify-center mb-6 z-10">
                <div className="absolute inset-0 bg-slate-700" style={hexClipPath}></div>
                <div className="absolute inset-[2px] bg-slate-800 flex items-center justify-center" style={hexClipPath}>
                  <span className="text-2xl font-bold text-amber-500">3</span>
                </div>
              </div>
              <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-slate-700 -z-0"></div>
              <h4 className="text-xl font-bold mb-2">Rectification</h4>
              <p className="text-slate-400 text-sm">Immediate flagging of non-conformances. We consult on the fastest compliant rectification methods.</p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 relative flex items-center justify-center mb-6 z-10">
                <div className="absolute inset-0 bg-slate-700" style={hexClipPath}></div>
                <div className="absolute inset-[2px] bg-slate-800 flex items-center justify-center" style={hexClipPath}>
                  <span className="text-2xl font-bold text-amber-500">4</span>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">Dossier Handover</h4>
              <p className="text-slate-400 text-sm">Delivery of a fully compliant, operator-ready HAVD. Your equipment is now cleared for site entry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT/BOOKING SECTION --- */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
            
            {/* Contact Info */}
            <div className="lg:w-2/5 bg-amber-500 p-10 text-slate-900 flex flex-col justify-between relative overflow-hidden">
              {/* Decorative graphic */}
              <div className="absolute -bottom-24 -right-24 text-amber-600/30">
                <Hexagon className="h-80 w-80 fill-amber-600/20" strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold mb-4">Ready to Mobilise?</h2>
                <p className="mb-8 font-medium text-slate-800">
                  Don't leave site entry to chance. Book an SME for your pre-mobilisation EEHA inspections today.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 mr-4" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-800">Call Direct</p>
                      <p className="font-bold text-lg">0400 000 000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-4" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-800">Email Dossiers/Drawings</p>
                      <p className="font-bold text-lg">inspections@exmobilise.com.au</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-800">Service Area</p>
                      <p className="font-bold text-lg">Perth Metro &amp; Surrounds (Yard Inspections)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-3/5 p-10 bg-white">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote / Booking</h3>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-green-800">Request Received</h4>
                    <p className="text-green-700 mt-1">Thank you. I have received your pre-mobilisation enquiry and will review the details. You can expect a response within 2-4 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input type="text" id="name" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                      <input type="text" id="company" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="O&amp;G Logistics Co." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input type="email" id="email" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="john@company.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <input type="tel" id="phone" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="0400 000 000" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-slate-700 mb-1">Equipment Type &amp; Mobilisation Date</label>
                    <input type="text" id="equipment" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="e.g. 2x Diesel Generators, Mob date: 15th Nov" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Additional Details (Destinations, known non-conformances, etc.)</label>
                    <textarea id="message" rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500" placeholder="Heading to Barrow Island. Need full detailed inspection and dossier update..."></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className={`w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-md transition-colors flex justify-center items-center cursor-pointer ${formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {formStatus === 'submitting' ? 'Sending Request...' : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div 
                className="bg-amber-500 flex items-center justify-center h-8 w-8 mr-3"
                style={hexClipPath}
              >
                <Zap className="h-4 w-4 text-slate-900" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ExMobilise WA</span>
            </div>
            <p className="text-sm mb-4">
              Specialized Subject Matter Expert providing EEHA pre-mobilisation inspections for the Western Australian Oil &amp; Gas industry.
            </p>
            <p className="text-xs text-slate-500">ABN: 12 345 678 900</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-amber-500 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-amber-500 transition-colors cursor-pointer">Services</button></li>
              <li><button onClick={() => scrollToSection('why-me')} className="hover:text-amber-500 transition-colors cursor-pointer">Why Choose an SME</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-500 transition-colors cursor-pointer">Contact / Book</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Standards Complying To</h4>
            <ul className="space-y-2 text-sm">
              <li>AS/NZS 60079.14 (Selection &amp; Erection)</li>
              <li>AS/NZS 60079.17 (Inspection &amp; Maintenance)</li>
              <li>Major WA Operator Engineering Specifications</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} ExMobilise WA. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-slate-500">Serving Perth, Pilbara, and the North West Shelf.</p>
        </div>
      </footer>

    </div>
  );
}
