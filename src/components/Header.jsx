// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

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
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
    >
      <nav className="section-container">
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
                className="text-gray-600 dark:text-gray-300 hover:text-primary-blue dark:hover:text-primary-blue font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
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
            className="md:hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mt-2"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-gray-600 dark:text-gray-300 hover:text-primary-blue dark:hover:text-primary-blue font-medium"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;