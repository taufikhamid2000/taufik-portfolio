"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  const [projects, setProjects] = useState<{ name?: string; description?: string }[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch projects:', data.error);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header showSignupLink={true} />
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mt-8">Hey, welcome to Taufik`s Portfolio!</h1>
        <p className="mt-4 text-center max-w-md">
          These are the projects I have so far. Feel free to explore each one of them!
        </p>

        {/* Admin Only Button for Create New Project */}
        <div className="mt-4">
          <Link href="/create-project">
            <button className="text-xs px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              (Admin Only) Create New Project
            </button>
          </Link>
        </div>

        {/* Display Projects Table */}
        {projects.length > 0 && (
          <div className="mt-10 w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-4">Projects Overview</h2>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Project Title</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      {project.name ? project.name.replace(/-/g, ' ') : 'Unnamed Project'}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-justify">
                      {project.description || 'No description available'}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      {project.name ? (
                        <Link href={`/projects/${project.name}`} className="text-blue-500 hover:underline">
                          View Project
                        </Link>
                      ) : (
                        'No link available'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
