"use client";

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';

export default function CreatePage() {
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [pageName, setPageName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch existing projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects.map((project: { name: string }) => project.name));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedProject, pageName }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Page "${pageName}" created successfully in "${selectedProject}"!`);
      } else {
        setMessage(data.error || 'Failed to create page');
      }

      setPageName('');
    } catch {
      setMessage('Failed to create page');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="pt-20 w-full max-w-lg p-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Page</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project.replace(/-/g, ' ')}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Page Name"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Create Page
          </button>
        </form>
        {message && (
          <div className={`mt-6 text-lg font-semibold ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}