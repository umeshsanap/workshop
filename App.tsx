
import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { Objectives } from './components/Objectives';
import { FutureBrightPage } from './components/FutureBrightPage';
import { GitCommands } from './components/GitCommands';
import { MediaPage } from './media/MediaPage';
import { Navbar, PageId } from './components/Navbar';
import { RegistrationModal } from './components/RegistrationModal';
import { ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isRegistrationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isRegistrationOpen]);

  const openRegistration = () => setIsRegistrationOpen(true);
  const closeRegistration = () => setIsRegistrationOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'goals':
        return <Objectives />;
      case 'futurebright':
        return <FutureBrightPage />;
      case 'git':
        return <GitCommands />;
      case 'media':
        return <MediaPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="relative">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <RegistrationModal isOpen={isRegistrationOpen} onClose={closeRegistration} />

      <main className="pt-16 min-h-screen">
        <div className="py-12 px-4">
          {renderPage()}
        </div>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-40 transition-all transform hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #2ecc71)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
          }}
        >
          <ChevronUp size={24} className="text-[#0a1628]" />
        </button>
      )}

      <footer
        className="py-10 px-4 text-center relative z-10"
        style={{
          background: 'rgba(5, 13, 24, 0.98)',
          borderTop: '1px solid rgba(0, 212, 255, 0.1)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs">
            <a href="tel:+918177802809" className="text-slate-400 hover:text-[#2ecc71] transition-colors">
              📞 +91 8177802809
            </a>
            <a href="mailto:info@futurebrightitsolutions.com" className="text-slate-400 hover:text-[#f5a623] transition-colors">
              ✉️ info@futurebrightitsolutions.com
            </a>
            <a href="https://futurebrightitsolutions.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00d4ff] transition-colors">
              🌐 futurebrightitsolutions.com
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-4 text-xs">
            <a href="https://www.linkedin.com/company/futurebright-it-solutions-pvt-ltd-nashik" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors">
              LinkedIn
            </a>
            <a href="https://instagram.com/futurebright_it_is" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#e4405f] transition-colors">
              Instagram
            </a>
            <a href="https://youtube.com/@FUTUREBRIGHT_IT_IS" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#ff0000] transition-colors">
              YouTube
            </a>
          </div>

          <p className="text-xs text-slate-600">
            © 2025 FutureBright IT Solutions Pvt. Ltd. | Mumbai Naka, Nashik – 422 002
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
