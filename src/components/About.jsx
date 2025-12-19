// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, Target, Bike, Plane, Gamepad2 } from 'lucide-react';

const About = ({ data }) => {
  const iconMap = {
    'Riding bike': <Bike size={24} />,
    'Travel': <Plane size={24} />,
    'Traveling': <Plane size={24} />,
    'Gaming': <Gamepad2 size={24} />
  };

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Education & Philosophy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <GraduationCap className="text-primary-blue-700 dark:text-primary-blue-200" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Education</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {data.education}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary-green/10 rounded-full">
                  <Lightbulb className="text-primary-green" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">My Philosophy</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {data.philosophy}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Approach & Hobbies */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <Target className="text-purple-500" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">My Approach</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {data.approach}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <h3 className="text-2xl font-bold mb-6">Personal Interests</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.hobbies.map((hobby, index) => {
                  const hobbyKey = hobby.includes('Riding') || hobby.includes('bike') ? 'Riding bike' : 
                                 hobby.includes('Travel') ? 'Travel' : 
                                 hobby.includes('Gaming') || hobby.includes('game') ? 'Gaming' : hobby;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-4 p-4 bg-primary-blue/10 dark:bg-primary-blue-900 rounded-lg hover:bg-primary-blue/20 dark:hover:bg-primary-blue-800 transition-colors"

                    >
                      <div className="p-2 bg-gradient-to-r from-primary-blue/20 to-primary-green/20 rounded-lg">
                        {iconMap[hobbyKey] || <Target size={24} />}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{hobby}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 card bg-gradient-to-r from-primary-blue/5 to-primary-green/5 border-2 border-primary-blue/20 dark:border-primary-green/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">What Drives Me</h3>
            <p className="text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              I'm passionate about creating technology that has a tangible impact on people's lives. 
              Whether it's through predictive models that help make better decisions or full-stack applications 
              that solve real-world problems, I believe in building solutions that matter. My journey in 
              computer science has taught me that the best technologies are those that seamlessly integrate 
              into daily life, making complex tasks simpler and enabling new possibilities.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;