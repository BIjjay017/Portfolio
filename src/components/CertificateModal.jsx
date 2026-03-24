import { useEffect } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { modalOverlay, modalContent } from '../utils/animations';

const CertificateModal = ({ open, onClose, cert, onPrev, onNext, hasPrev, hasNext }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, onPrev, onNext, hasPrev, hasNext]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && cert && (
        <motion.div
          key="cert-overlay"
          variants={modalOverlay}
          initial="hidden"
          animate="show"
          exit="exit"
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${cert.title}`}
        >
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="show"
            exit="exit"
            className="modal-content max-w-4xl w-full mx-4"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200/50 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{cert.title}</h3>
              <div className="flex items-center gap-2">
                {hasPrev && (
                  <button onClick={onPrev} aria-label="Previous certificate" className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">◀</button>
                )}
                {hasNext && (
                  <button onClick={onNext} aria-label="Next certificate" className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">▶</button>
                )}
                <button onClick={onClose} aria-label="Close preview" className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">✕</button>
              </div>
            </div>

            <div className="p-5">
              {cert.img ? (
                <img src={cert.img} alt={cert.title} className="w-full h-auto rounded-lg" />
              ) : (
                <div className="p-12 text-center text-gray-600 dark:text-gray-400">No preview available.</div>
              )}
              {cert.description && <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{cert.description}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CertificateModal;
