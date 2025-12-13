// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Github, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

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
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
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

          <div className="flex flex-wrap gap-4 mb-8">
            {intro.highlights.map((highlight, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="px-4 py-2 bg-primary-blue/10 dark:bg-primary-blue/20 text-primary-blue rounded-full text-sm font-medium"
              >
                {highlight}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects <ExternalLink size={20} />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-green rounded-3xl transform rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-green to-primary-blue rounded-3xl transform -rotate-6"></div>
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-blue/10 rounded-full">
                    <MapPin className="text-primary-blue" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{data.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-green/10 rounded-full">
                    <Mail className="text-primary-green" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{data.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-blue/10 rounded-full">
                    <Phone className="text-primary-blue" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{data.phone}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a href={data.github} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href={data.kaggle} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-bold text-primary-blue">K</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <span className="px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-full font-semibold animate-pulse-slow">
              {data.availability}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;