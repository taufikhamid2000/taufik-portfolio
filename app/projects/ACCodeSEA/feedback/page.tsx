/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';
import FeedbackForm from './FeedbackForm';
import FeedbackTable from './FeedbackTable';
import { useState } from 'react';
import { Feedback } from './types';

export default function FeedbackPageACCodeSEA() {
  const [latestFeedback, setLatestFeedback] = useState<Feedback | null>(null);

  const handleFeedbackSubmitted = (newFeedback: { name: string; feedback: string }) => {
    const feedbackWithId: Feedback = { id: Date.now(), ...newFeedback };
    setLatestFeedback(feedbackWithId);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Share Your Feedback</h1>
        <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        <FeedbackTable latestFeedback={latestFeedback} />
      </div>
    </div>
  );
}