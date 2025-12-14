// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, Calendar, MapPin } from 'lucide-react';
import kagglePython from '../pictures/bijay017 - Python.png';
import kaggleML from '../pictures/bijay017 - Intro to Machine Learning.png';
import kaggleDataViz from '../pictures/bijay017 - Data Visualization.png';
import nvidiaDL from '../pictures/deepLearning.png';

const Education = ({ education, certifications, experience }) => {
  return (
    <section id="education" className="section-container bg-gradient-to-b from-sky-100/40 via-emerald-50/30 to-transparent dark:from-blue-950/40 dark:via-emerald-950/20 dark:to-transparent">
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
                  <GraduationCap className="text-primary-blue" size={28} />
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
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <Award className="text-primary-blue" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Certifications</h3>
              </div>
              
              <div className="space-y-4">
                {/* Kaggle Python Certificate */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card hover:shadow-lg transition-all cursor-pointer group"
                >
                  <img 
                    src={kagglePython} 
                    alt="Kaggle Python Certificate"
                    className="w-full rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                  />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                    Kaggle - Python
                  </p>
                </motion.div>

                {/* Kaggle Machine Learning Certificate */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card hover:shadow-lg transition-all cursor-pointer group"
                >
                  <img 
                    src={kaggleML} 
                    alt="Kaggle Machine Learning Certificate"
                    className="w-full rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                  />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                    Kaggle - Intro to Machine Learning
                  </p>
                </motion.div>

                {/* Kaggle Data Visualization Certificate */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card hover:shadow-lg transition-all cursor-pointer group"
                >
                  <img 
                    src={kaggleDataViz} 
                    alt="Kaggle Data Visualization Certificate"
                    className="w-full rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                  />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                    Kaggle - Data Visualization
                  </p>
                </motion.div>

                {/* NVIDIA Deep Learning Certificate */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card hover:shadow-lg transition-all cursor-pointer group"
                >
                  <img 
                    src={nvidiaDL} 
                    alt="NVIDIA Deep Learning Fundamentals"
                    className="w-full rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                  />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
                    NVIDIA Deep Learning Fundamentals
                  </p>
                </motion.div>

                {/* MERN Stack (text only as no image provided) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="card flex items-center gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="p-2 bg-gradient-to-r from-primary-blue/20 to-primary-green/20 rounded-lg">
                    <Award className="text-primary-blue" size={24} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium flex-1">
                    MERN Stack Development
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;