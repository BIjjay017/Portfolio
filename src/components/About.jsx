import { motion } from 'framer-motion';
import { Bike, Lightbulb, Plane, Sparkles, Target } from 'lucide-react';

const About = ({ data }) => {
  return (
    <section id="about" className="section-container">
      <div className="split-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-kicker">01 About</span>
          <h2 className="mb-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            Expertise meets
            <br />
            <span className="gradient-text">innovation</span>
          </h2>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-slate-600">{data.philosophy}</p>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{data.approach}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Bike, label: data.hobbies[0] },
              { icon: Plane, label: data.hobbies[1] },
              { icon: Sparkles, label: data.hobbies[2] },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200/70 bg-white/65 p-4">
                <item.icon size={18} className="text-primary-blue-700" />
                <p className="mt-2 text-sm font-semibold text-slate-700">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-5"
        >
          <article className="floating-panel p-7">
            <p className="numbered-label mb-3">Education</p>
            <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
              <Target className="text-primary-blue-700" size={22} />
              Foundation
            </h3>
            <p className="text-slate-600">{data.education}</p>
          </article>

          <article className="floating-panel p-7">
            <p className="numbered-label mb-3">Mindset</p>
            <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-slate-900">
              <Lightbulb className="text-primary-green" size={22} />
              Build with intent
            </h3>
            <p className="text-slate-600">
              I care about outcomes, not just output. Every interface and feature should feel purposeful, fast, and easy to trust.
            </p>
          </article>
        </motion.div>
      </div>
    </section>
  );
};

export default About;