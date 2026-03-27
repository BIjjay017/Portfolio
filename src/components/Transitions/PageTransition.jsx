import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }) {
  const [routeKey, setRouteKey] = useState(() => `${window.location.pathname}${window.location.hash}`);

  useEffect(() => {
    const handleRouteLikeChange = () => {
      setRouteKey(`${window.location.pathname}${window.location.hash}`);
    };

    window.addEventListener('hashchange', handleRouteLikeChange);
    window.addEventListener('popstate', handleRouteLikeChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteLikeChange);
      window.removeEventListener('popstate', handleRouteLikeChange);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
