'use client'

import React from 'react';

const ContactForm = () => {
  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-navy-blue dark:text-usmc-gold">Contact Me</h2>
        <form className="max-w-lg mx-auto bg-white/80 dark:bg-dark-accent/80 p-8 rounded-lg shadow-md backdrop-blur-sm" aria-label="Contact form">
          <div className="mb-4">
            <label htmlFor="name" className="block text-light-text dark:text-dark-text mb-2">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 border rounded bg-white/50 dark:bg-dark-accent/50" required aria-required="true" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-light-text dark:text-dark-text mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border rounded bg-white/50 dark:bg-dark-accent/50" required aria-required="true" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-light-text dark:text-dark-text mb-2">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full p-2 border rounded bg-white/50 dark:bg-dark-accent/50" required aria-required="true"></textarea>
          </div>
          <button type="submit" className="bg-usmc-scarlet hover:bg-usmc-gold text-white font-bold py-2 px-4 rounded transition duration-300">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;