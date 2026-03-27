import { motion } from 'framer-motion';
import { Award, Briefcase, Calendar, GraduationCap, MapPin } from 'lucide-react';

const Education = ({ education, certifications, experience }) => {
  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-kicker">04 Experience</span>
        <h2 className="mb-12 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
          Education,
          <br />
          <span className="gradient-text">certifications & growth</span>
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="floating-panel p-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <GraduationCap className="text-primary-blue-700" size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Education</h3>
              </div>

              <div className="space-y-5">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * index }}
                    className="rounded-xl border border-slate-200/70 bg-white/70 p-5"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="text-xl font-black text-slate-900">{edu.degree}</h4>
                    </div>
                    <div className="mb-2 flex items-center gap-2 text-primary-blue-700">
                      <MapPin size={16} />
                      <span className="font-semibold">{edu.institution}</span>
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-slate-500">
                      <Calendar size={16} />
                      <span className="text-sm">{edu.duration}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <article className="floating-panel p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Briefcase className="text-primary-green" size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Current status</h3>
              </div>
              <p className="mb-2 text-2xl font-black text-slate-900">{experience.status}</p>
              <p className="text-slate-600">{experience.details}</p>
            </article>

            <article className="floating-panel p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-3">
                  <Award className="text-amber-600" size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Certifications</h3>
              </div>

              <div className="grid gap-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-xl border border-slate-200/80 bg-white/75 p-4"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">{String(index + 1).padStart(2, '0')}</p>
                    <p className="mt-1 font-bold text-slate-900">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;