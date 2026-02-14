
import React from 'react';

export type PageId = 'home' | 'goals' | 'futurebright' | 'git' | 'media';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const navItems: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'goals', label: 'Goals' },
  { id: 'git', label: 'Git' },
  { id: 'media', label: 'Media' },
  { id: 'futurebright', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#00d4ff]/20 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/media/Logo.jpeg"
          alt="FutureBright Logo"
          className="w-10 h-10 rounded-lg object-cover border border-[#00d4ff]/30"
          style={{ boxShadow: '0 0 12px rgba(0, 212, 255, 0.2)' }}
        />
        <div className="hidden sm:block">
          <span className="font-bold tracking-tight text-xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-[#00d4ff] neon-cyan">Future</span>
            <span className="text-[#2ecc71] neon-green">Bright</span>
          </span>
          <p className="text-[8px] uppercase tracking-[0.2em] text-[#f5a623]/70">IT Solutions</p>
        </div>
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`text-sm font-semibold transition-all duration-300 hover:text-[#00d4ff] relative group ${
              currentPage === item.id ? 'text-[#00d4ff]' : 'text-slate-400'
            }`}
          >
            {item.label}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#00d4ff] transition-all duration-300 ${
              currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
            }`} style={{ boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)' }} />
          </button>
        ))}
      </div>
    </nav>
  );
};
