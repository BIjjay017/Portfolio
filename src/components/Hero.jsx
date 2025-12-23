// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Github, Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';
import { container, pill } from '../utils/animations';
import personImage from '../pictures/person.jpg';
import cvPDF from '../pictures/BijayShreepali.pdf';

const Hero = ({ data, intro }) => {
  return (
    <section id="home" className="section-container pt-32 md:pt-40">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-blue/20 to-primary-green/20 rounded-full blur-xl opacity-50"></div>
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Hi, I'm <span className="gradient-text">{data.name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
                {data.title}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
                {data.tagline}
              </p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 mb-8"
          >
            {intro.summary}
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {intro.highlights.map((highlight, index) => (
              <motion.span
                key={index}
                variants={pill}
                className="px-4 py-2 bg-primary-blue/10 dark:bg-primary-blue/800 text-primary-blue-700 dark:text-primary-blue-200 rounded-full text-sm font-medium"
              >
                {highlight}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects <ExternalLink size={20} />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
            <a 
              href={cvPDF} 
              download="BijayShreepali.pdf"
              className="btn-outline flex items-center gap-2 hover:bg-primary-green/10 border-primary-green text-primary-green dark:text-primary-green"
            >
              Download CV <Download size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, rotate: 0.5 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-green rounded-3xl transform rotate-6 opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-green to-primary-blue rounded-3xl transform -rotate-6 opacity-20"></div>
            
            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
              <img 
                src={personImage} 
                alt={data.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Contact info card below image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 card bg-gradient-to-r from-primary-blue/5 to-primary-green/5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <MapPin className="text-primary-blue-700 dark:text-primary-blue-200" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Location</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{data.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-green/10 rounded-full">
                  <Mail className="text-primary-green" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Email</p>
                  <a href={`mailto:${data.email}`} className="font-medium text-gray-800 dark:text-gray-200 hover:text-primary-blue-700 dark:hover:text-primary-blue-200 transition-colors">
                    {data.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <Phone className="text-primary-blue-700 dark:text-primary-blue-200" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Phone</p>
                  <a href={`tel:${data.phone}`} className="font-medium text-gray-800 dark:text-gray-200 hover:text-primary-blue-700 dark:hover:text-primary-blue-200 transition-colors">
                    {data.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="p-3 bg-primary-green/10 rounded-full">
                  <Github className="text-primary-green" size={20} />
                </div>
                <div className="flex gap-3">
                  <a 
                    href={data.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-100/80 dark:bg-slate-700/80 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-600/80 transition-colors text-sm font-medium"
                  >
                    GitHub
                  </a>
                  <a 
                    href={data.kaggle} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-100/80 dark:bg-slate-700/80 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-600/80 transition-colors text-sm font-medium"
                  >
                    Kaggle
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-6 text-center">
            <span className="px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-full font-semibold animate-pulse-slow inline-block">
              {data.availability}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;