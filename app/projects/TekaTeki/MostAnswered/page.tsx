// app/projects/TekaTeki/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header'; 
import '../../../../styles/commonStyles.css';

interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: string;
}

const TekaTekiProjectPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [sortedQuizzes, setSortedQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Quiz; direction: 'ascending' | 'descending' } | null>(null);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await fetch('/api/quizzes');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to load quizzes.');
        }

        const data: Quiz[] = await response.json();

        setQuizzes(data);
        setSortedQuizzes(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };

    getQuizzes();
  }, []);

  // Sorting logic
  useEffect(() => {
    let sortableQuizzes = [...quizzes];
    if (sortConfig !== null) {
      sortableQuizzes.sort((a, b) => {
        if (sortConfig.key === 'created_at') {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          if (dateA < dateB) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (dateA > dateB) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    setSortedQuizzes(sortableQuizzes);
  }, [quizzes, sortConfig]);

  const requestSort = (key: keyof Quiz) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-custom-bg-color">
      {/* Header */}
      <Header />

      {/* Project Description */}
      <section className="mb-8 mt-12">
        <p className="text-center text-lg sm:text-xl">
          Welcome to the Syllabuzz Quiz Platform! Create your own quizzes, challenge others, and test your knowledge on various topics.
        </p>
      </section>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <Link href="/projects/TekaTeki/CreateQuiz">
          <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-blue-700 transition">
            Create a New Quiz
          </button>
        </Link>
        <Link href="/projects/TekaTeki/VerifyQuiz">
          <button className="bg-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-purple-700 transition">
            Verify Quizzes
          </button>
        </Link>
      </div>

      {/* Quizzes Table */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">Most answered Quizzes</h2>
        {loading ? (
          <p className="text-center">Loading quizzes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedQuizzes.length === 0 ? (
          <p className="text-center">No quizzes available. Create one now!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-auto mx-auto shadow-md rounded-lg">
              <thead>
                <tr>
                  <th
                    className="py-2 px-4 border-b text-left text-sm sm:text-base cursor-pointer"
                    onClick={() => requestSort('title')}
                  >
                    Title {sortConfig?.key === 'title' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                  </th>
                  <th
                    className="py-2 px-4 border-b text-left text-sm sm:text-base hidden sm:table-cell cursor-pointer"
                    onClick={() => requestSort('description')}
                  >
                    Description {sortConfig?.key === 'description' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                  </th>
                  <th
                    className="py-2 px-4 border-b text-left text-sm sm:text-base cursor-pointer"
                    onClick={() => requestSort('created_at')}
                  >
                    Created At {sortConfig?.key === 'created_at' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                  </th>
                  <th
                    className="py-2 px-4 border-b text-left text-sm sm:text-base cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    Status {sortConfig?.key === 'status' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-black-100">
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      <Link
                        href={`/projects/TekaTeki/AnswerQuiz/${quiz.id}`}
                        className="text-green-500 font-semibold hover:text-green-600 cursor-pointer animate-glow transition duration-300 ease-in-out rounded focus-visible:ring focus-visible:ring-green-300 focus:outline-none"
                        >
                        {quiz.title}
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base hidden sm:table-cell">
                      {quiz.description}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {quiz.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default TekaTekiProjectPage;
