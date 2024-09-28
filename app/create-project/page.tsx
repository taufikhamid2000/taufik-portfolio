"use client";

import { useState } from 'react';
import Header from '../../components/Header';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Project created successfully!');
      } else {
        setMessage(data.error || 'Failed to create project');
      }

      setProjectName('');
      setDescription('');
    } catch (error) {
      setMessage('Failed to create project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 text-black dark:text-white">
      <Header />
      <div className="flex flex-col items-center justify-center py-16 px-8">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-center">Create New Project</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
            >
              Create Project
            </button>
          </form>
          {message && (
            <div className={`mt-6 text-lg font-semibold ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
