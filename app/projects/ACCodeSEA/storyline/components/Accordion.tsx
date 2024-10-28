/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import '../styles/interactiveStyles.css';

interface AccordionProps {
  title: string;
  content: React.ReactNode; // Changed from 'string' to 'React.ReactNode'
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion mb-6">
      <button
        className="accordion-header w-full text-left text-xl font-bold py-4 px-6 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none"
        onClick={toggleAccordion}
      >
        {title}
        <span className="accordion-icon float-right">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion-content px-6 py-4 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg">
          {content} {/* Render content directly */}
        </div>
      )}
    </div>
  );
};

export default Accordion;