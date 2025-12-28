// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt, setFormLoadedAt] = useState(Date.now());
  const [lastSubmitAt, setLastSubmitAt] = useState(0);
  const [prevMessage, setPrevMessage] = useState('');
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState(null);
  const [verificationInput, setVerificationInput] = useState('');

  // EmailJS configuration — set these as Vite environment variables in a .env file
  // Example names: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const RATE_LIMIT_MS = 60_000; // 1 minute
  const MIN_FILL_TIME_MS = 3_000; // Minimum time spent before submit

  const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com', 'yopmail.com', 'tempmail.com', '10minutemail.com',
    'guerrillamail.com', 'burnermail.io', 'trashmail.com', 'getnada.com',
    'fakeinbox.com', 'temp-mail.org', 'sharklasers.com', 'pokemail.net'
  ]);

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    email = email.trim().toLowerCase();
    
    // RFC 5322 simplified pattern (stricter)
    const rfc5322Pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!rfc5322Pattern.test(email)) return false;
    
    const [local, domain] = email.split('@');
    if (!local || !domain) return false;
    if (local.length > 64 || domain.length > 255) return false;
    if (local.startsWith('.') || local.endsWith('.')) return false;
    if (local.includes('..')) return false;
    if (domain.startsWith('-') || domain.endsWith('-')) return false;
    if (!domain.includes('.')) return false;
    
    const tld = domain.split('.').pop();
    if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) return false;
    
    return true;
  };

  const isDisposableDomain = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
  };

  const loadRecaptcha = () => new Promise((resolve, reject) => {
    if (window.grecaptcha && window.grecaptcha.execute) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.body.appendChild(script);
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateVerificationToken = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const sendVerificationEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      if (!validateEmail(formData.email)) {
        setErrors({ email: 'Enter a valid email address.' });
        setIsSubmitting(false);
        return;
      }
      if (isDisposableDomain(formData.email)) {
        setErrors({ email: 'Disposable email domains are not allowed.' });
        setIsSubmitting(false);
        return;
      }

      const token = generateVerificationToken();
      setVerificationToken(token);
      setVerificationEmail(formData.email);
      
      // Store token temporarily in sessionStorage
      sessionStorage.setItem(`verify_${formData.email}`, JSON.stringify({ token, expires: Date.now() + 600000 })); // 10 min

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        setErrors({ general: 'Email service not configured.' });
        setIsSubmitting(false);
        return;
      }

      // Always attempt to send verification code via EmailJS
      const verifyTemplateId = import.meta.env.VITE_EMAILJS_VERIFICATION_TEMPLATE_ID;
      if (!verifyTemplateId) {
        setErrors({ general: 'Verification email template not configured. Contact admin.' });
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        verifyTemplateId,
        {
          to_email: formData.email,
          verification_code: token,
          from_name: formData.name,
          from_email: formData.email,
          timestamp: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          message: 'Click the verification code above to confirm your email.'
        },
        PUBLIC_KEY
      );
      setEmailVerificationSent(true);
      setErrors({ general: `Verification code sent to ${formData.email}. Check your inbox.` });
    } catch (err) {
      console.error('Error sending verification email:', err);
      setErrors({ general: `Failed to send verification code. ${err.message || 'Please try again.'}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyEmailToken = () => {
    if (!verificationInput.trim()) {
      setErrors({ general: 'Enter the verification code.' });
      return false;
    }
    const stored = sessionStorage.getItem(`verify_${verificationEmail}`);
    if (!stored) {
      setErrors({ general: 'Verification code expired. Request a new one.' });
      return false;
    }
    const { token, expires } = JSON.parse(stored);
    if (Date.now() > expires) {
      sessionStorage.removeItem(`verify_${verificationEmail}`);
      setErrors({ general: 'Verification code expired. Request a new one.' });
      return false;
    }
    if (verificationInput.toUpperCase() !== token) {
      setErrors({ general: 'Invalid verification code.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Check if email is verified
      if (!emailVerificationSent) {
        await sendVerificationEmail(e);
        return;
      }

      // Verify email token before processing
      if (!verifyEmailToken()) {
        setIsSubmitting(false);
        return;
      }

      // Honeypot check (bots often fill hidden fields)
      if (honeypot && honeypot.trim().length > 0) {
        setErrors({ general: 'Submission blocked.' });
        setIsSubmitting(false);
        return;
      }

      // Rate limit check
      const now = Date.now();
      if (lastSubmitAt && (now - lastSubmitAt) < RATE_LIMIT_MS) {
        const waitSec = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitAt)) / 1000);
        setErrors({ general: `Please wait ${waitSec}s before sending again.` });
        setIsSubmitting(false);
        return;
      }

      // Minimum fill time check
      if ((now - formLoadedAt) < MIN_FILL_TIME_MS) {
        setErrors({ general: 'Please take a moment to complete the form.' });
        setIsSubmitting(false);
        return;
      }

      // Basic field validations
      const fieldErrors = {};
      if (!formData.name || formData.name.trim().length < 2) {
        fieldErrors.name = 'Name must be at least 2 characters.';
      }
      if (!validateEmail(formData.email)) {
        fieldErrors.email = 'Enter a valid email address.';
      } else if (isDisposableDomain(formData.email)) {
        fieldErrors.email = 'Disposable email domains are not allowed.';
      }
      if (!formData.subject || formData.subject.trim().length < 3) {
        fieldErrors.subject = 'Subject must be at least 3 characters.';
      }
      if (!formData.message || formData.message.trim().length < 10) {
        fieldErrors.message = 'Message must be at least 10 characters.';
      }
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      // Duplicate message check
      if (prevMessage && prevMessage.trim() === formData.message.trim()) {
        setErrors({ general: 'Please avoid sending the same message repeatedly.' });
        setIsSubmitting(false);
        return;
      }

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        alert('Email is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.');
        setIsSubmitting(false);
        return;
      }

      // Optional: reCAPTCHA v3 token
      let recaptchaToken = null;
      if (RECAPTCHA_SITE_KEY) {
        try {
          await loadRecaptcha();
          recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' });
        } catch (err) {
          console.warn('reCAPTCHA not available:', err);
        }
      }

      // If captcha is configured, verify token server-side before sending email
      if (RECAPTCHA_SITE_KEY) {
        if (!recaptchaToken) {
          setErrors({ general: 'Captcha token missing. Please retry.' });
          setIsSubmitting(false);
          return;
        }
        try {
          const verifyResp = await fetch('/api/verify-recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: recaptchaToken })
          });
          const verifyData = await verifyResp.json();
          if (!verifyResp.ok || !verifyData.ok) {
            setErrors({ general: 'Captcha verification failed. Please try again.' });
            setIsSubmitting(false);
            return;
          }
        } catch (err) {
          console.warn('Captcha verification error:', err);
          setErrors({ general: 'Captcha verification error. Please try again later.' });
          setIsSubmitting(false);
          return;
        }
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setPrevMessage(formData.message);
      setLastSubmitAt(Date.now());
      setEmailVerificationSent(false);
      setVerificationToken(null);
      setVerificationInput('');
      sessionStorage.removeItem(`verify_${verificationEmail}`);
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  //verify that the email exists before sending the mail
  

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              I'm always open to discussing new opportunities, interesting projects, 
              or just chatting about technology and innovation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <Mail className="text-primary-blue-700 dark:text-primary-blue-200" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href={`mailto:${data.email}`} className="text-gray-700 dark:text-gray-200 hover:text-primary-blue-700 dark:hover:text-primary-blue-200">
                    {data.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-green/10 rounded-full">
                  <Phone className="text-primary-green" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a href={`tel:${data.phone}`} className="text-gray-700 dark:text-gray-200 hover:text-primary-blue-700 dark:hover:text-primary-blue-200">
                    {data.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-full">
                  <MapPin className="text-purple-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-700 dark:text-gray-200">{data.location}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href={data.github}
                  className="p-3 bg-primary-blue/10 dark:bg-primary-blue-900 rounded-lg hover:bg-primary-blue/20 dark:hover:bg-primary-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-bold text-gray-800 dark:text-gray-100">GitHub</span>
                </a>
                <a
                  href={data.kaggle}
                  className="p-3 bg-primary-blue/10 dark:bg-primary-blue-900 rounded-lg hover:bg-primary-blue/20 dark:hover:bg-primary-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-bold text-primary-blue-700 dark:text-primary-blue-200">Kaggle</span>
                </a>
              </div>
            </div>
          </div>
          
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            {errors.general && (
              <div className={`mb-4 text-sm ${errors.general.includes('Verification code sent') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {errors.general}
              </div>
            )}
            
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-primary-green mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-gray-700 dark:text-gray-200">
                  Thank you for your message. I'll get back to you soon.
                </p>
              </motion.div>
            ) : emailVerificationSent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
                    Enter Verification Code
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Check your email at <strong>{verificationEmail}</strong> for the 6-digit code.
                  </p>
                  <input
                    type="text"
                    value={verificationInput}
                    onChange={(e) => setVerificationInput(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    className="w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-600/50 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition uppercase text-center font-semibold tracking-widest text-lg"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !verificationInput.trim()}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Verifying...' : `Verify & Send Message`}
                </button>
                <button
                  onClick={() => {
                    setEmailVerificationSent(false);
                    setVerificationInput('');
                    setVerificationToken(null);
                    setErrors({});
                  }}
                  className="w-full text-sm text-primary-blue-700 dark:text-primary-blue-200 hover:underline"
                >
                  Use different email
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-600/50 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/50 dark:border-slate-600/50 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                      className="w-full px-4 py-3 bg-primary-blue/10 dark:bg-primary-blue-900 text-gray-800 dark:text-gray-100 border border-primary-blue/10 dark:border-primary-blue-800 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-primary-blue/10 dark:bg-primary-blue-900 text-gray-800 dark:text-gray-100 border border-primary-blue-10 dark:border-primary-blue-800 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                  {/* Honeypot field for bots (hidden) */}
                  <input
                    type="text"
                    name="company"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    autoComplete="off"
                    tabIndex="-1"
                    aria-hidden="true"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Verifying Email...'
                  ) : (
                    <>
                      Verify & Send <Send size={20} />
                    </>
                  )}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;