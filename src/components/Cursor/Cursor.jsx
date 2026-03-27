import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const interactiveSelector = 'a, button, [role="button"], input, textarea, select';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event) => {
      const target = event.target;
      if (target instanceof Element) {
        setIsPointer(Boolean(target.closest(interactiveSelector)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden rounded-full border border-primary-blue-700/40 bg-white/30 mix-blend-multiply md:block"
      style={{ willChange: 'transform' }}
      animate={{
        x: pos.x - (isPointer ? 24 : 12),
        y: pos.y - (isPointer ? 24 : 12),
        width: isPointer ? 48 : 24,
        height: isPointer ? 48 : 24,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.3 }}
    />
  );
}
