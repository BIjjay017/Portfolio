// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ExternalLink, Code, Database, Cpu } from 'lucide-react';

const Projects = ({ data }) => {
  const iconMap = {
    'Web': <Code className="text-primary-blue" size={20} />,
    'ML': <Cpu className="text-primary-green" size={20} />,
    'Database': <Database className="text-purple-500" size={20} />
  };

  return (
    <section id="projects" className="section-container bg-gray-50 dark:bg-gray-900/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -10 }}
              className="card group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <div className="flex gap-2 mb-4">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {iconMap[cat]} {cat}
                      </span>
                    ))}
                  </div>
                </div>
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
              
              <div className="mb-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Challenge</h4>
                  <p className="text-gray-600 dark:text-gray-400">{project.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Solution</h4>
                  <p className="text-gray-600 dark:text-gray-400">{project.solution}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-primary-blue/10 to-primary-green/10 text-primary-blue dark:text-primary-blue rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium">
                  {project.role}
                </span>
                <span className="text-sm text-gray-500">
                  Machine Learning & Development
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            More projects available on GitHub and Kaggle
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/BIjjay017"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </a>
            <a
              href="https://www.kaggle.com/bijay017"
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Kaggle
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;