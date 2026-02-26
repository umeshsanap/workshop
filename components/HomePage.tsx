import React from 'react';
import { Target, Eye } from 'lucide-react';

const titleWords = [
  { text: 'Future', className: 'text-[#00d4ff]', delay: 0 },
  { text: 'Bright', className: 'text-[#2ecc71]', delay: 0.08 },
  { text: ' IT Solutions', className: 'text-slate-400', delay: 0.16 },
];

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto relative z-10 min-h-[80vh]">
      <div className="text-center mb-12">
        <div
          className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-down stagger-1"
          style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff' }}
        >
          Welcome
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {titleWords.map((w, i) => (
            <span
              key={i}
              className={`inline-block animate-fade-in-up ${w.className}`}
              style={{ animationDelay: `${w.delay}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              {w.text}
            </span>
          ))}
        </h1>
        <p className="text-xl text-slate-400 animate-fade-in-up stagger-3">
          Bridging the gap between Classroom & Industry
        </p>
        <div className="mt-10 w-full animate-float-slow">
          <img
            src="/media/Logo.jpeg"
            alt="FutureBright Logo"
            className="w-full rounded-2xl object-contain animate-glow-pulse"
            style={{
              maxHeight: '70vh',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.15), 0 0 80px rgba(245, 166, 35, 0.08)',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="glass rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-5"
          style={{
            borderColor: 'rgba(245, 166, 35, 0.3)',
            boxShadow: '0 0 30px rgba(245, 166, 35, 0.1)',
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 animate-pulse-glow" style={{ background: 'rgba(245, 166, 35, 0.15)' }}>
            <Eye className="w-6 h-6 text-[#f5a623]" />
          </div>
          <h2 className="text-xl font-bold mb-4 text-[#f5a623]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Vision
          </h2>
          <p className="text-slate-400 leading-relaxed">
            To empower students and professionals with industry-aligned skills and real-world workflows, making them job-ready in the Generative AI era.
          </p>
        </div>

        <div
          className="glass rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] animate-fade-in-up stagger-6"
          style={{
            borderColor: 'rgba(0, 212, 255, 0.3)',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.1)',
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 animate-pulse-glow" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
            <Target className="w-6 h-6 text-[#00d4ff]" />
          </div>
          <h2 className="text-xl font-bold mb-4 text-[#00d4ff]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Mission
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Deliver hands-on training, career guidance, and mentorship through authentic IT workflows—from software development to AI integration—so every learner can thrive in modern tech roles.
          </p>
        </div>
      </div>
    </div>
  );
};
