// app/projects/random/page.tsx
//.html
"use client";

import React, { useState, useEffect } from 'react';
import { Landing, Section, Reflection } from './Component';
import './styles.css';
import Header from '../../../components/Header';

const RandomProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const sections = [
    {
      title: "Purpose Over Perks",
      content:
        "Choose work that aligns with your core values. Titles and perks may look good, but purpose keeps you going.",
    },
    {
      title: "Impact Over Inputs",
      content:
        "It’s not about how many hours you log; it’s about what you leave behind. Seek roles where your contributions create lasting value.",
    },
    {
      title: "Community Over Competition",
      content:
        "There’s enough success for everyone. Let’s lift each other up, share knowledge, and foster an environment where everyone can thrive.",
    },
  ];

  // Optional: Background Music or Sound Effects
  // Uncomment and update the path to add background music
  /*
  useEffect(() => {
    const audio = new Audio('/audio/background-music.mp3');
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  */

  // Optional: Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'ArrowRight') {
        handleNext();
      }
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, sections.length + 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  return (
    <div className="app-container">
      <Header />
      {currentStep === 0 && <Landing onStart={handleNext} />}
      {currentStep > 0 && currentStep <= sections.length && (
        <Section
          title={sections[currentStep - 1].title}
          content={sections[currentStep - 1].content}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLast={currentStep === sections.length}
        />
      )}
      {currentStep === sections.length + 1 && (
        <Reflection onRestart={handleRestart} />
      )}
    </div>
  );
};

export default RandomProject;
