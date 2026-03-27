import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AuroraField({ className = '', strength = 38 }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 18, mass: 0.4 });
  const orb2X = useTransform(smoothX, (value) => value * -0.8);
  const orb2Y = useTransform(smoothY, (value) => value * -0.8);
  const orb3X = useTransform(smoothX, (value) => value * 0.5);
  const orb3Y = useTransform(smoothY, (value) => value * 0.5);

  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, strength]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
        className="absolute -left-10 top-8 h-52 w-52 rounded-full bg-sky-300/35 blur-3xl"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y, willChange: 'transform' }}
        className="absolute right-2 top-24 h-56 w-56 rounded-full bg-emerald-300/35 blur-3xl"
      />
      <motion.div
        style={{ x: orb3X, y: orb3Y, willChange: 'transform' }}
        className="absolute bottom-6 left-1/3 h-48 w-48 rounded-full bg-amber-200/35 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_48%)]" />
    </div>
  );
}
