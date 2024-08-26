'use client'

import React, { useState } from 'react';

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params: { event_category: string; event_label: string }
    ) => void;
  }
}

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Track the event using gtag
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'contact_form_submission', {
            event_category: 'User Interaction',
            event_label: 'Contact Form',
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-navy-blue dark:text-usmc-gold">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white/80 dark:bg-dark-accent/80 p-8 rounded-lg shadow-md backdrop-blur-sm" aria-label="Contact form">
          <div className="mb-4">
            <label htmlFor="name" className="block text-light-text dark:text-dark-text mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white/50 dark:bg-dark-accent/50"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-light-text dark:text-dark-text mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white/50 dark:bg-dark-accent/50"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-light-text dark:text-dark-text mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded bg-white/50 dark:bg-dark-accent/50"
              required
              aria-required="true"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-usmc-scarlet hover:bg-usmc-gold text-white font-bold py-2 px-4 rounded transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <p className="mt-4 text-green-600 dark:text-green-400">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-red-600 dark:text-red-400">Error sending message. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;