import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import emailjs from 'emailjs-com';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ data }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const isConfigured = useMemo(() => {
    return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
  }, [PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID]);

  const validate = () => {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please use a valid email address.';
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Subject should be at least 3 characters.';
    }
    if (form.message.trim().length < 12) {
      nextErrors.message = 'Message should be at least 12 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!isConfigured) {
        window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      }

      setForm(initialForm);
      setErrors({});
      setIsSubmitted(true);
      window.setTimeout(() => setIsSubmitted(false), 2800);
    } catch (error) {
      setErrors({ general: 'Message could not be sent right now. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">05 Contact</span>
          <h2 className="mb-5 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            Let&apos;s build
            <br />
            <span className="gradient-text">something awesome</span>
          </h2>
          <p className="max-w-lg text-lg text-slate-600">
            Available for internship and full-time opportunities. If your team needs someone who can ship clean frontend and practical AI features, I am ready.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`mailto:${data.email}`} className="floating-panel flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5">
              <span className="rounded-full bg-sky-100 p-3 text-primary-blue-700"><Mail size={18} /></span>
              <span className="font-semibold text-slate-700">{data.email}</span>
            </a>
            <a href={`tel:${data.phone}`} className="floating-panel flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5">
              <span className="rounded-full bg-emerald-100 p-3 text-primary-green"><Phone size={18} /></span>
              <span className="font-semibold text-slate-700">{data.phone}</span>
            </a>
            <div className="floating-panel flex items-center gap-3 p-4">
              <span className="rounded-full bg-amber-100 p-3 text-amber-600"><MapPin size={18} /></span>
              <span className="font-semibold text-slate-700">{data.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="floating-panel p-7"
        >
          <h3 className="mb-4 text-2xl font-black text-slate-900">Send message</h3>
          {!isConfigured && (
            <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              EmailJS is not configured. Submission will open your default email app.
            </p>
          )}
          {errors.general && <p className="mb-4 text-sm font-semibold text-red-600">{errors.general}</p>}

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
            >
              <CheckCircle2 className="mx-auto mb-3 text-emerald-600" size={32} />
              <p className="font-semibold text-emerald-700">Message sent successfully.</p>
            </motion.div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-600">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 text-slate-800"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-600">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 text-slate-800"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="mb-1 block text-sm font-semibold text-slate-600">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 text-slate-800"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-1 block text-sm font-semibold text-slate-600">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 text-slate-800"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary mt-5 w-full">
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
