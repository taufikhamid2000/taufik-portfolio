/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import Header from '../../../../components/Header';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import Map from './components/Map';
import '../../../../styles/commonStyles.css';
import { submitContactForm } from './utils/contactService';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await submitContactForm(formData);
    if (response.success) {
      setFormStatus('Your message has been successfully sent!');
    } else {
      setFormStatus('An error occurred while sending your message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <ContactForm onSubmit={handleFormSubmit} />
            {formStatus && (
              <p className="mt-4 text-lg text-center">{formStatus}</p>
            )}
          </div>
          {/* Contact Details */}
          <div>
            <ContactDetails />
          </div>
        </div>
        {/* Map Component */}
        <div className="mt-12">
          <Map />
        </div>
      </div>
    </div>
  );
}
