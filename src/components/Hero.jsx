import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Github, Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';
import { useEffect } from 'react';
import { splitTextAnimation } from '../animations/textAnimations';
import { container, pill } from '../utils/animations';
import cvPDF from '../pictures/BijayShreepali.pdf';
import personImage from '../pictures/person.jpg';

const Hero = ({ data, intro }) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const y = useTransform(scrollY, [0, 500], [0, -30]);
  const xTilt = useMotionValue(0);
  const yTilt = useMotionValue(0);
  const smoothX = useSpring(xTilt, { stiffness: 140, damping: 18, mass: 0.35 });
  const smoothY = useSpring(yTilt, { stiffness: 140, damping: 18, mass: 0.35 });

  const handleImageMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const yValue = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    xTilt.set(x);
    yTilt.set(yValue);
  };

  const handleImageLeave = () => {
    xTilt.set(0);
    yTilt.set(0);
  };

  useEffect(() => {
    const split = splitTextAnimation('.hero-title');
    return () => {
      split?.revert();
    };
  }, []);

  return (
    <motion.section id="home" style={{ scale, y }} className="relative min-h-screen overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 gradient-mesh-bg" />

      <div className="section-container relative z-10 split-grid">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
          <span className="section-kicker">Digital Craft + Engineering</span>
          <h1 className="hero-title mb-4 text-5xl font-black leading-[0.95] text-slate-900 md:text-7xl lg:text-8xl">
            FULL-STACK
            <br />
            <span className="gradient-text">DEVELOPER</span>
          </h1>
          <h2 className="mb-3 text-2xl font-semibold text-slate-700 md:text-3xl">{data.name}</h2>
          <p className="mb-8 max-w-2xl text-lg text-slate-600">{data.tagline}. I blend full-stack development and AI thinking to build products that are fast, useful, and visually memorable.</p>

          <div className="mb-8 grid max-w-2xl grid-cols-3 gap-3">
            <div className="floating-panel p-4">
              <p className="numbered-label">Websites</p>
              <p className="mt-1 text-2xl font-black text-slate-900">40+</p>
            </div>
            <div className="floating-panel p-4">
              <p className="numbered-label">Projects</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{intro.highlights.length}+ </p>
            </div>
            <div className="floating-panel p-4">
              <p className="numbered-label">Location</p>
              <p className="mt-1 text-lg font-black text-slate-900">Nepal</p>
            </div>
          </div>

          <motion.div className="mb-8 flex flex-wrap gap-3" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {intro.highlights.map((highlight, index) => (
              <motion.span
                key={index}
                variants={pill}
                className="rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur"
              >
                {highlight}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              Explore Work <ExternalLink size={20} />
            </a>
            <a href="#contact" className="btn-outline">
              Say Hello
            </a>
            <a 
              href={cvPDF} 
              download="BijayShreepali.pdf"
              className="btn-outline flex items-center gap-2"
            >
              Download CV <Download size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div
            className="floating-panel relative h-[420px] overflow-hidden"
            onMouseMove={handleImageMove}
            onMouseLeave={handleImageLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 via-white/40 to-emerald-100/45 dark:from-slate-900/50 dark:via-slate-800/35 dark:to-slate-900/45" />
            <motion.img
              src={personImage}
              alt={data.name}
              className="absolute bottom-0 left-1/2 h-[108%] w-auto -translate-x-1/2 object-cover"
              style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
              initial={{ scale: 1.03, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent dark:from-slate-900/70" />

            <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-700 backdrop-blur">
              INTERACTIVE PORTRAIT
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 grid gap-4 rounded-2xl border border-slate-200/70 bg-white/75 p-5 backdrop-blur md:grid-cols-2"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <MapPin className="text-primary-blue-700" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-medium text-slate-800">{data.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Mail className="text-primary-green" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <a href={`mailto:${data.email}`} className="font-medium text-slate-800 transition-colors hover:text-primary-blue-700">
                    {data.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <Phone className="text-primary-blue-700" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <a href={`tel:${data.phone}`} className="font-medium text-slate-800 transition-colors hover:text-primary-blue-700">
                    {data.phone}
                  </a>
                </div>
              </div>

              <div className="pt-1">
                <p className="mb-2 text-xs text-slate-500">Links</p>
                <div className="flex flex-wrap gap-2">
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm">
                    <Github size={16} /> GitHub
                  </a>
                  <a href={data.kaggle} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm">
                    Kaggle
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-primary-blue to-primary-green px-6 py-2 font-semibold text-white">
              {data.availability}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary-green/20 blur-3xl" />
    </motion.section>
  );
};

export default Hero;