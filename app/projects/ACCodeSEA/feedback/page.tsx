/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import Header from '../../../../components/Header';
import { Button, Input, TextArea } from '../../../../components/CommonComponents';
import '../../../../styles/commonStyles.css';

export default function FeedbackPageACCodeSEA() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<{ id: number; name: string; feedback: string }[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFeedback = {
      id: Date.now(),
      name: isAnonymous ? 'Anonymous' : name,
      feedback,
    };
    setSubmittedFeedback((prevFeedback) => [...prevFeedback, newFeedback]);
    setName('');
    setFeedback('');
    setIsAnonymous(false);
  };

  const handleEdit = (id: number) => {
    const feedbackToEdit = submittedFeedback.find((entry) => entry.id === id);
    if (feedbackToEdit) {
      setName(feedbackToEdit.name === 'Anonymous' ? '' : feedbackToEdit.name);
      setFeedback(feedbackToEdit.feedback);
      setIsAnonymous(feedbackToEdit.name === 'Anonymous');
      setSubmittedFeedback(submittedFeedback.filter((entry) => entry.id !== id));
    }
  };

  const handleDelete = (id: number) => {
    setSubmittedFeedback(submittedFeedback.filter((entry) => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Share Your Feedback</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-lg mb-2">Name:</label>
            <Input type="text" id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required={!isAnonymous} placeholder="Enter your name" disabled={isAnonymous} />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Feedback:</label>
            <TextArea id="feedback" value={feedback} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)} required placeholder="Enter your feedback" />
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
          <Button text="Submit Feedback" type="submit" color="blue" className="" onClick={undefined} />
        </form>
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Submitted Feedback</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Name</th>
                <th className="border border-gray-400 p-2">Feedback</th>
                <th className="border border-gray-400 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedFeedback.length > 0 ? (
                submittedFeedback.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-400 p-2">{entry.name}</td>
                    <td className="border border-gray-400 p-2">{entry.feedback}</td>
                    <td className="border border-gray-400 p-2">
                      <Button text="Edit" color="green" className="mr-2" onClick={() => handleEdit(entry.id)} />
                      <Button text="Delete" color="red" onClick={() => handleDelete(entry.id)} className={undefined} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-4">No feedback submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}