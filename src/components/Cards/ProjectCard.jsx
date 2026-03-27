import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.article
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4, y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="floating-panel cursor-pointer p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
          <span className="rounded-full bg-primary-blue-100 px-3 py-1 text-sm font-medium text-primary-blue-700">
            {project.role}
          </span>
        </div>

        <p className="mt-4 text-slate-600">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-full bg-primary-green-100 px-3 py-1 text-xs font-semibold text-primary-green-700">
              {tech}
            </span>
          ))}
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="modal-content w-[92vw] max-w-3xl p-8"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">{project.title}</h3>
                  <p className="mt-2 text-slate-600">{project.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800">Challenge</h4>
                  <p className="text-slate-600">{project.problem}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800">Solution</h4>
                  <p className="text-slate-600">{project.solution}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-2 font-semibold text-slate-800">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-primary-blue-100 px-3 py-1 text-sm font-medium text-primary-blue-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8 inline-flex items-center gap-2"
                >
                  Open Repository <ExternalLink size={18} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
