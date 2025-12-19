import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const CertificateModal = ({ open, onClose, cert, onPrev, onNext, hasPrev, hasNext }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!open || !cert) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label={`Preview: ${cert.title}`}>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-4xl w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{cert.title}</h3>
          <div className="flex items-center gap-2">
            {hasPrev && (
              <button onClick={onPrev} aria-label="Previous certificate" className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800">◀</button>
            )}
            {hasNext && (
              <button onClick={onNext} aria-label="Next certificate" className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800">▶</button>
            )}
            <button onClick={onClose} aria-label="Close preview" className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800">✕</button>
          </div>
        </div>

        <div className="p-4">
          {cert.img ? (
            <img src={cert.img} alt={cert.title} className="w-full h-auto rounded" />
          ) : (
            <div className="p-12 text-center text-gray-600 dark:text-gray-400">No preview available for this certificate.</div>
          )}

          {cert.description && <p className="mt-4 text-gray-600 dark:text-gray-400">{cert.description}</p>}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CertificateModal;
