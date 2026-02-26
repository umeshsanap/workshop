import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#00d4ff]/20 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src="/media/Logo.jpeg"
            alt="FutureBright Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover border border-[#00d4ff]/30 shrink-0 animate-float-subtle"
            style={{ boxShadow: '0 0 12px rgba(0, 212, 255, 0.2)' }}
          />
          <div className="hidden sm:block min-w-0">
            <span className="font-bold tracking-tight text-lg sm:text-xl truncate block" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-[#00d4ff] neon-cyan">Future</span>
              <span className="text-[#2ecc71] neon-green">Bright</span>
            </span>
            <p className="text-[8px] uppercase tracking-[0.2em] text-[#f5a623]/70">IT Solutions</p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-semibold transition-all duration-300 hover:text-[#00d4ff] relative group whitespace-nowrap ${
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

        {/* Hamburger: visible on mobile/tablet (< md) */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors touch-manipulation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay + panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-[280px] glass border-l border-[#00d4ff]/20 flex flex-col pt-20 px-6 transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`text-left py-3 px-4 rounded-lg text-base font-semibold transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-[#00d4ff] bg-[#00d4ff]/10'
                    : 'text-slate-400 hover:text-[#00d4ff] hover:bg-[#00d4ff]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
