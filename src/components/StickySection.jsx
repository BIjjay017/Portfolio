import { motion, useScroll, useTransform } from 'framer-motion';

export default function StickySection() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0.52, 0.84], [36, -36]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.56, 0.75], [0.2, 1]);

  return (
    <section className="relative h-[180vh]">
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
