import { motion } from 'framer-motion';
import ProjectCard from './Cards/ProjectCard';
import Reveal from './animations/Reveal';

const Projects = ({ data }) => {
  return (
    <section id="projects" className="section-container relative overflow-hidden">
      <motion.div>
        <span className="section-kicker">03 Selected Work</span>
        <h2 className="mb-12 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
          Projects crafted
          <br />
          <span className="gradient-text">for real outcomes</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-slate-600">
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