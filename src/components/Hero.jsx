import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Github, Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';
import ScrollExpandMedia from './ui/scroll-expansion-hero';
import { Boxes } from './ui/background-boxes';
import { container, pill } from '../utils/animations';
import cvPDF from '../pictures/BijayShreepali.pdf';
import personImageOne from '../pictures/person1.jpg';
import personImageTwo from '../pictures/person2.JPG?url';

const Hero = ({ data, intro }) => {
  const heroImages = useMemo(() => {
    const useFirstAsMedia = Math.random() > 0.5;

    if (useFirstAsMedia) {
      return {
        mediaSrc: personImageOne,
        bgImageSrc: personImageTwo,
      };
    }

    return {
      mediaSrc: personImageTwo,
      bgImageSrc: personImageOne,
    };
  }, []);

  return (
    <ScrollExpandMedia
      id="home"
      mediaType="image"
      mediaSrc={heroImages.mediaSrc}
      bgImageSrc={heroImages.bgImageSrc}
      title="FULL-STACK DEVELOPER"
      date={data.name}
      scrollToExpand="Scroll to reveal hero"
      textBlend
    >
      <div className="section-container relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/75 p-6 md:p-10">
          <div className="pointer-events-none absolute inset-0 z-0 bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
          <Boxes className="pointer-events-none opacity-35" />

          <div className="relative z-20 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <span className="section-kicker border-white/35 bg-black/35 text-slate-100">Digital Craft + Engineering</span>
              <h2 className="mb-3 text-2xl font-semibold text-slate-100 md:text-3xl">{data.tagline}</h2>
              <p className="mb-8 max-w-2xl text-lg text-slate-200/95">
                I blend full-stack development and AI thinking to build products that are fast, useful, and visually memorable.
              </p>

              <div className="mb-8 grid max-w-2xl grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/25 bg-black/30 p-4 backdrop-blur">
                  <p className="numbered-label text-slate-200">Websites</p>
                  <p className="mt-1 text-2xl font-black text-white">40+</p>
                </div>
                <div className="rounded-xl border border-white/25 bg-black/30 p-4 backdrop-blur">
                  <p className="numbered-label text-slate-200">Projects</p>
                  <p className="mt-1 text-2xl font-black text-white">{intro.highlights.length}+</p>
                </div>
                <div className="rounded-xl border border-white/25 bg-black/30 p-4 backdrop-blur">
                  <p className="numbered-label text-slate-200">Location</p>
                  <p className="mt-1 text-lg font-black text-white">{data.location}</p>
                </div>
              </div>

              <motion.div className="mb-8 flex flex-wrap gap-3" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {intro.highlights.map((highlight, index) => (
                  <motion.span
                    key={index}
                    variants={pill}
                    className="rounded-full border border-white/35 bg-black/25 px-4 py-2 text-sm font-medium text-white backdrop-blur"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary flex items-center gap-2">
                  Explore Work <ExternalLink size={20} />
                </a>
                <a href="#contact" className="btn-outline border-white/60 text-white hover:bg-white/15">
                  Say Hello
                </a>
                <a
                  href={cvPDF}
                  download="BijayShreepali.pdf"
                  className="btn-outline border-white/60 text-white hover:bg-white/15 flex items-center gap-2"
                >
                  Download CV <Download size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/30 bg-black/35 p-5 backdrop-blur"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3">
                    <MapPin className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Location</p>
                    <p className="font-medium text-white">{data.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3">
                    <Mail className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Email</p>
                    <a href={`mailto:${data.email}`} className="font-medium text-white transition-colors hover:text-sky-200">
                      {data.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3">
                    <Phone className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Phone</p>
                    <a href={`tel:${data.phone}`} className="font-medium text-white transition-colors hover:text-sky-200">
                      {data.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-1">
                  <p className="mb-2 text-xs text-slate-300">Links</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn-outline border-white/60 px-4 py-2 text-sm text-white hover:bg-white/15">
                      <Github size={16} /> GitHub
                    </a>
                    <a href={data.kaggle} target="_blank" rel="noopener noreferrer" className="btn-outline border-white/60 px-4 py-2 text-sm text-white hover:bg-white/15">
                      Kaggle
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-primary-blue to-primary-green px-6 py-2 font-semibold text-white">
                  {data.availability}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ScrollExpandMedia>
  );
};

export default Hero;