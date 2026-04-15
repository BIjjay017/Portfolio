import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StickySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0.25, 0.75], [28, -28]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.28, 0.62], [0.3, 1]);

  return (
    <section ref={sectionRef} className="relative h-[140vh] md:h-[150vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="floating-panel max-w-4xl p-10 text-center">
          <p className="numbered-label mb-3">Narrative Section</p>
          <motion.h2
            style={{ y: titleY }}
            className="text-4xl font-black text-slate-900 md:text-6xl"
          >
            Design precision.
            <br />
            Engineering velocity.
          </motion.h2>
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600"
          >
            I ship interfaces that feel premium and perform reliably, from visual concept to production deployment.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
