// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { fadeUp } from '../utils/animations';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import cvPDF from '../pictures/BijayShreepali.pdf';

const Header = ({ darkMode, setDarkMode, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navItems = [
    { idx: '00', label: 'Home', href: '#home' },
    { idx: '01', label: 'About', href: '#about' },
    { idx: '02', label: 'Skills', href: '#skills' },
    { idx: '03', label: 'Work', href: '#projects' },
    { idx: '04', label: 'Experience', href: '#education' },
    { idx: '05', label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 64) {
        setIsVisible(true);
      } else {
        setIsVisible(currentY < lastScrollY.current);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      className="fixed left-0 right-0 top-0 z-[70] border-b border-slate-200/70 bg-white/70 backdrop-blur-xl"
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-black tracking-tight"
          >
            <span className="text-slate-800">{data.name.split(' ')[0]}</span>
            <span className="text-primary-blue-700">.</span>
          </motion.div>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={fadeUp}
                transition={{ delay: idx * 0.03 }}
                className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-slate-900"
              >
                <span className="text-[10px] text-slate-400 transition-colors group-hover:text-primary-blue-700">{item.idx}</span>
                <span>{item.label}</span>
              </motion.a>
            ))}
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <a 
              href={cvPDF} 
              download="Bijay_Shreepali_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-4 py-2 font-semibold text-slate-700 transition-colors hover:border-primary-blue-300 hover:text-primary-blue-700"
            >
              <Download size={18} />
              CV
            </a>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg bg-slate-100 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-white/96 backdrop-blur-2xl"
            >
              <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-8">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black tracking-tight text-slate-900">{data.name.split(' ')[0]}.</span>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg bg-slate-100 p-2"
                    aria-label="Close navigation menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: idx * 0.06 }}
                      className="group flex items-baseline gap-4 text-4xl font-bold text-slate-900 transition-colors hover:text-primary-blue-700"
                    >
                      <span className="text-base font-semibold tracking-[0.2em] text-slate-400">{item.idx}</span>
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                </div>

                <a 
                  href={cvPDF} 
                  download="BijayShreepali.pdf"
                  onClick={() => setIsMenuOpen(false)}
                  className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-700 transition-colors hover:border-primary-blue-300 hover:text-primary-blue-700"
                >
                  <Download size={18} />
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;