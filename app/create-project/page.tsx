"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

export default function CreateProject() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [promptShown, setPromptShown] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [createdProjectPath, setCreatedProjectPath] = useState('');

  // Passcode validation
  useEffect(() => {
    if (!promptShown) {
      const passcode = prompt('Enter passcode to access this page:');
      if (passcode === '654321') {
        setAuthenticated(true);
      } else {
        alert('Incorrect passcode. Redirecting to homepage.');
        router.push('/');
      }
      setPromptShown(true);
    }
  }, [router, promptShown]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
        <Header />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authenticated) return;

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
        const normalizedProjectName = projectName.toLowerCase().replace(/\s+/g, '-');
        setCreatedProjectPath(`/projects/${normalizedProjectName}`);
        setMessage(`${projectName} project created successfully!`);
      } else {
        setMessage(data.error || 'Failed to create project');
      }

      setProjectName('');
      setDescription('');
    } catch {
      setMessage('Failed to create project');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="pt-20 w-full max-w-lg p-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
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
          <Link href="/create-project/create-page">
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out">
              Create Page
            </button>
          </Link>
        </form>
        {message && (
          <div className={`mt-6 text-lg font-semibold ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message.includes('successfully') && createdProjectPath ? (
              <>
                {message}{" "}
                <Link
                  href={createdProjectPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Go to project
                </Link>
              </>
            ) : (
              message
            )}
          </div>
        )}
      </div>
      
      
      
    </div>
  );
}