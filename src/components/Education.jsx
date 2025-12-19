// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GraduationCap, Award, Briefcase, Calendar, MapPin } from 'lucide-react';
import kagglePython from '../pictures/bijay017 - Python.png';
import kaggleML from '../pictures/bijay017 - Intro to Machine Learning.png';
import kaggleDataViz from '../pictures/bijay017 - Data Visualization.png';
import nvidiaDL from '../pictures/deepLearning.png';
import CertificateModal from './CertificateModal';

const Education = ({ education, certifications, experience }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const certs = [
    { id: 'kaggle-py', title: 'Kaggle - Python', img: kagglePython, issuer: 'Kaggle', description: 'Completed Kaggle Python course' },
    { id: 'kaggle-ml', title: 'Kaggle - Intro to Machine Learning', img: kaggleML, issuer: 'Kaggle', description: 'Introductory ML course on Kaggle' },
    { id: 'kaggle-dataviz', title: 'Kaggle - Data Visualization', img: kaggleDataViz, issuer: 'Kaggle', description: 'Data visualization techniques and best practices' },
    { id: 'nvidia-dl', title: 'NVIDIA Deep Learning Fundamentals', img: nvidiaDL, issuer: 'NVIDIA', description: 'Foundational deep learning concepts' },
    { id: 'mern', title: 'MERN Stack Development', img: null, issuer: 'Self / Course', description: 'Full-stack development with MongoDB, Express, React and Node' }
  ];

  const openModal = (i) => setSelectedIndex(i);
  const closeModal = () => setSelectedIndex(null);
  const hasPrev = selectedIndex !== null && selectedIndex > 0;
  const hasNext = selectedIndex !== null && selectedIndex < certs.length - 1;
  const prev = () => setSelectedIndex((s) => (s > 0 ? s - 1 : s));
  const next = () => setSelectedIndex((s) => (s < certs.length - 1 ? s + 1 : s));

  const CertificateGrid = () => (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certs.map((c, i) => (
          <div key={c.id} className="card p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="h-40 flex items-center justify-center overflow-hidden rounded-md bg-primary-blue/10">
              {c.img ? (
                <img src={c.img} alt={c.title} className="object-contain h-full w-full" />
              ) : (
                <div className="text-center text-gray-600 dark:text-gray-400">No preview</div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{c.title}</p>
                <p className="text-sm text-gray-500">{c.issuer}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => openModal(i)} className="text-primary-blue-700 dark:text-primary-blue-200 hover:underline">Preview</button>
                <a className="text-sm text-gray-500 hover:text-gray-700" href="#" onClick={(e) => e.preventDefault()}>
                  Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CertificateModal
        open={selectedIndex !== null}
        onClose={closeModal}
        cert={certs[selectedIndex]}
        onPrev={prev}
        onNext={next}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </>
  );

  return (
    <section id="education" className="section-container bg-gradient-to-b from-primary-blue/10 via-primary-blue/8 to-transparent dark:from-primary-dark/50 dark:via-primary-blue/30 dark:to-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          Education & <span className="gradient-text">Experience</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <GraduationCap className="text-primary-blue-700 dark:text-primary-blue-200" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Education</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="card relative pl-8 border-l-4 border-primary-blue"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-blue rounded-full"></div>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        {edu.degree}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-primary-blue mb-2">
                      <MapPin size={16} />
                      <span className="font-semibold">{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar size={16} />
                      <span className="text-sm">{edu.duration}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Experience & Certifications Section */}
          <div className="space-y-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-green/10 rounded-full">
                  <Briefcase className="text-primary-green" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Experience</h3>
              </div>
              
              <div className="card bg-gradient-to-r from-primary-green/5 to-primary-blue/5 border-2 border-primary-green/20 dark:border-primary-green/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-primary-green/10 rounded-full">
                    <Briefcase className="text-primary-green" size={32} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                      {experience.status}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {experience.details}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <Award className="text-purple-500" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Certifications</h3>
              </div>
              
              <div className="space-y-4">
                {/* Better: show certificates in a responsive grid with modal preview */}
                <CertificateGrid />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;