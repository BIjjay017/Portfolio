// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import cvPDF from '../pictures/Bijay_Shreepali_CV.pdf';

const Header = ({ darkMode, setDarkMode, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-slate-700/50"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold gradient-text"
          >
            {data.name.split(' ')[0]}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-blue-700 dark:hover:text-primary-blue-200 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <a 
              href={cvPDF} 
              download="Bijay_Shreepali_CV.pdf"
              className="flex items-center gap-2 px-4 py-2 border border-primary-green text-primary-green dark:text-primary-green rounded-lg font-semibold hover:bg-primary-green/10 transition-colors"
            >
              <Download size={18} />
              CV
            </a>
            
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/80"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg p-4 mt-2 border border-gray-200/50 dark:border-slate-700/50"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-gray-600 dark:text-gray-300 hover:text-primary-blue-700 dark:hover:text-primary-blue-200 font-medium"
              >
                {item.label}
              </a>
            ))}
            <a 
              href={cvPDF} 
              download="Bijay_Shreepali_CV.pdf"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 py-3 text-gray-600 dark:text-gray-300 hover:text-primary-green dark:hover:text-primary-green font-medium border-t border-gray-200 dark:border-gray-700 mt-2 pt-3"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;