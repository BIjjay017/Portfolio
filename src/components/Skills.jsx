import { motion } from 'framer-motion';

const categories = [
  { key: 'languages', title: 'Languages', color: 'bg-sky-100 text-sky-700' },
  { key: 'frameworks', title: 'Frameworks', color: 'bg-emerald-100 text-emerald-700' },
  { key: 'databases', title: 'Databases', color: 'bg-amber-100 text-amber-700' },
  { key: 'tools', title: 'Tools', color: 'bg-violet-100 text-violet-700' },
];

const Skills = ({ data }) => {
  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-kicker">02 Capabilities</span>
        <h2 className="mb-12 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
          Modern stack,
          <br />
          <span className="gradient-text">production mindset</span>
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {categories.map((category, idx) => (
            <motion.article
              key={category.key}
              className="floating-panel p-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">{category.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${category.color}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(data[category.key] ?? []).map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="floating-panel mt-8 p-7">
          <p className="numbered-label mb-4">Skill Profile</p>
          <div className="space-y-3">
            {data.radarData.labels.map((label, idx) => {
              const value = data.radarData.values[idx] ?? 0;
              return (
                <div key={label} className="grid grid-cols-[120px_1fr_40px] items-center gap-4">
                  <span className="text-sm font-semibold text-slate-600">{label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: idx * 0.06 }}
                      className="h-2 rounded-full bg-gradient-to-r from-primary-blue to-primary-green"
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;