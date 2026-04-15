// eslint-disable-next-line no-unused-vars
import { motion, useScroll } from 'framer-motion';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-primary-blue via-cyan-500 to-primary-green"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollIndicator;