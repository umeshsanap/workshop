
import React from 'react';
import { Target, Eye, Mail, Phone, Globe, Linkedin, Instagram, Youtube, Building2, FileEdit, ExternalLink } from 'lucide-react';

const ENQUIRY_FORM_URL = 'https://forms.gle/RujEY3ky5A3YkZeh6';

export const FutureBrightPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto relative z-10 min-h-[80vh]">
      <div className="text-center mb-12">
        <div
          className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 animate-fade-in-down stagger-1"
          style={{ background: 'rgba(245, 166, 35, 0.1)', border: '1px solid rgba(245, 166, 35, 0.3)', color: '#f5a623' }}
        >
          About Us
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <span className="text-[#00d4ff] inline-block animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>Future</span>
          <span className="text-[#2ecc71] inline-block animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}>Bright</span>
        </h1>
        <p className="text-slate-400 animate-fade-in-up stagger-3">Vision, Mission &amp; Connect with us</p>
      </div>

      <div className="space-y-8">
        <div className="glass rounded-2xl p-8 border border-[#f5a623]/20 animate-fade-in-right stagger-4 animate-float-subtle">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#f5a623]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <Eye className="w-5 h-5" /> Vision
          </h2>
          <p className="text-slate-400 leading-relaxed">
            To empower students and professionals with industry-aligned skills and real-world workflows, making them job-ready in the Generative AI era.
          </p>
        </div>

        <div className="glass rounded-2xl p-8 border border-[#00d4ff]/20 animate-fade-in-left stagger-5 animate-float-delay">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#00d4ff]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <Target className="w-5 h-5" /> Mission
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Deliver hands-on training, career guidance, and mentorship through authentic IT workflows—from software development to AI integration—so every learner can thrive in modern tech roles.
          </p>
        </div>

        <a
          href={ENQUIRY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block glass rounded-2xl p-8 border border-[#f5a623]/20 animate-fade-in-right stagger-5 hover:border-[#f5a623]/50 transition-all duration-300 hover:scale-[1.01] group"
        >
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#f5a623]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <FileEdit className="w-5 h-5" /> Enquiry Form
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Have a question or want to get in touch? Fill out our enquiry form for Website and Software enquiries.
          </p>
          <span className="inline-flex items-center gap-2 text-[#00d4ff] font-semibold group-hover:gap-3 transition-all">
            Open form <ExternalLink className="w-4 h-4" />
          </span>
        </a>

        <div className="glass rounded-2xl p-8 border border-[#2ecc71]/20 animate-fade-in-up stagger-6 animate-float-slow">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#2ecc71]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <Building2 className="w-5 h-5" /> Social Media &amp; Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <a href="tel:+918177802809" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2ecc71]/20">
                  <Phone className="w-6 h-6 text-[#2ecc71]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                  <div className="font-mono text-[#00d4ff]">+91 8177802809</div>
                </div>
              </a>
              <a href="tel:+919209895759" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2ecc71]/20">
                  <Phone className="w-6 h-6 text-[#2ecc71]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                  <div className="font-mono text-[#00d4ff]">+91 9209895759</div>
                </div>
              </a>
              <a href="mailto:info@futurebrightitsolutions.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f5a623]/20">
                  <Mail className="w-6 h-6 text-[#f5a623]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                  <div className="font-mono text-[#00d4ff] text-sm break-all">info@futurebrightitsolutions.com</div>
                </div>
              </a>
              <a href="https://futurebrightitsolutions.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#00d4ff]/20">
                  <Globe className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Website</div>
                  <div className="font-mono text-[#00d4ff] text-sm">futurebrightitsolutions.com</div>
                </div>
              </a>
            </div>
            <div className="space-y-4">
              <a href="https://www.linkedin.com/company/futurebright-it-solutions-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0077b5]/20">
                  <Linkedin className="w-6 h-6 text-[#0077b5]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">LinkedIn</div>
                  <div className="text-[#00d4ff] text-sm">FutureBright IT Solutions Pvt. Ltd.</div>
                </div>
              </a>
              <a href="https://instagram.com/futurebright_it_is" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#e4405f]/20">
                  <Instagram className="w-6 h-6 text-[#e4405f]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Instagram</div>
                  <div className="text-[#00d4ff] text-sm">@futurebright_it_is</div>
                </div>
              </a>
              <a href="https://youtube.com/@FUTUREBRIGHT_IT_IS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#ff0000]/20">
                  <Youtube className="w-6 h-6 text-[#ff0000]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">YouTube</div>
                  <div className="text-[#00d4ff] text-sm">FUTUREBRIGHT_IT_IS</div>
                </div>
              </a>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-6 flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Mumbai Naka, Nashik – 422 002
          </p>
        </div>
      </div>
    </div>
  );
};
