/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Button, Input, TextArea } from '../../../../components/CommonComponents';
import { insertFeedback } from './supabase/feedbackService';

interface FeedbackFormProps {
  onFeedbackSubmitted: (newFeedback: { name: string; feedback: string }) => void;
}

export default function FeedbackForm({ onFeedbackSubmitted }: FeedbackFormProps) {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFeedback = {
      name: isAnonymous ? 'Anonymous' : name,
      feedback,
    };
    try {
      const { data, error } = await insertFeedback(newFeedback);
      if (error) {
        setStatusMessage('Failed to submit feedback. Please try again.');
        console.error('Error inserting feedback:', error);
      } else {
        onFeedbackSubmitted(newFeedback);
        setStatusMessage('Feedback successfully submitted!');
      }
    } catch (err) {
      setStatusMessage('Unexpected error occurred. Please try again.');
      console.error('Unexpected error:', err);
    }

    // Clear form fields
    setName('');
    setFeedback('');
    setIsAnonymous(false);

    // Clear status message after 3 seconds
    setTimeout(() => {
      setStatusMessage(null);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block text-lg mb-2">Name:</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required={!isAnonymous}
          placeholder="Enter your name"
          disabled={isAnonymous}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Feedback:</label>
        <TextArea
          id="feedback"
          value={feedback}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
          required
          placeholder="Enter your feedback"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsAnonymous(e.target.checked)}
            className="mr-2"
          />
          Submit as anonymous
        </label>
      </div>
      <Button text="Submit Feedback" type="submit" color="blue" className="" onClick={() => {}} />
      {statusMessage && <p className="mt-4 text-center text-sm">{statusMessage}</p>}
    </form>
  );
}
