// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
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

  // EmailJS configuration — set these as Vite environment variables in a .env file
  // Example names: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        alert('Email is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.');
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
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
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={20} />
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