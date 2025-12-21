// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, setDarkMode, className = '' }) => {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, scale: darkMode ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        {darkMode ? (
          <Sun className="text-yellow-500" size={20} />
        ) : (
          <Moon className="text-gray-700 dark:text-gray-300" size={20} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;