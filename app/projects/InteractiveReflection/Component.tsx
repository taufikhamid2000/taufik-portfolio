// app/projects/random/Component.tsx

"use client";

import React, { useState } from 'react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="container">
      <h1 className="heading">Why do we work the way we do?</h1>
      <button className="button" onClick={onStart}>
        Start
      </button>
    </div>
  );
};

interface SectionProps {
  title: string;
  content: string;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title,
  content,
  onNext,
  onPrevious,
  isLast,
}) => {
  return (
    <div className="container">
      <h2 className="title">{title}</h2>
      <p className="content">{content}</p>
      <div className="button-group">
        <button className="button button-secondary" onClick={onPrevious}>
          Back
        </button>
        <button className="button" onClick={onNext}>
          {isLast ? 'Reflect' : 'Next'}
        </button>
      </div>
    </div>
  );
};

interface ReflectionProps {
  onRestart: () => void;
}

export const Reflection: React.FC<ReflectionProps> = ({ onRestart }) => {
  const [reflection, setReflection] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleSave = () => {
    if (reflection) {
      setShowMessage(true);
    }
  };

  return (
    <div className="container">
      <h2 className="title">What's Your Why?</h2>
      {!showMessage ? (
        <>
          <textarea
            className="textarea"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Type your reflection here..."
          />
          <button className="button" onClick={handleSave}>
            Save Reflection
          </button>
        </>
      ) : (
        <div className="message">
          <p className="content">Thank you for sharing your reflection!</p>
          <button className="button" onClick={onRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
