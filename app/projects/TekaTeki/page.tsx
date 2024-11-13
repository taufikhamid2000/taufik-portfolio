// app/projects/TekaTeki/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header'; 
import '../../../styles/commonStyles.css';

interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

const TekaTekiProjectPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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
      } catch (err: any) {
        setError(err.message || 'Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };

    getQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-custom-bg-color">
      {/* Header */}
      <Header />

      {/* Project Description */}
      <section className="mb-8 mt-12">
        <p className="text-center text-lg sm:text-xl">
          Welcome to the TekaTeki Quiz Platform! Create your own quizzes, challenge others, and test your knowledge on various topics.
        </p>
      </section>

      {/* Create Quiz Button */}
      <div className="flex justify-center mb-8">
        <Link href="/projects/TekaTeki/CreateQuiz">
          <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-blue-700 transition">
            Create a New Quiz
          </button>
        </Link>
      </div>

      {/* Quizzes Table */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">Available Quizzes</h2>
        {loading ? (
          <p className="text-center">Loading quizzes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : quizzes.length === 0 ? (
          <p className="text-center">No quizzes available. Create one now!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-auto mx-auto shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-sm sm:text-base">Title</th>
                  <th className="py-2 px-4 border-b text-left text-sm sm:text-base hidden sm:table-cell">Description</th>
                  <th className="py-2 px-4 border-b text-left text-sm sm:text-base">Created At</th>
                  <th className="py-2 px-4 border-b text-left text-sm sm:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-black-100">
                    <td className="py-2 px-4 border-b text-sm sm:text-base">{quiz.title}</td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base hidden sm:table-cell">{quiz.description}</td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b text-sm sm:text-base">
                      <Link href={`/projects/TekaTeki/AnswerQuiz/${quiz.id}`}>
                        <button className="bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-green-700 transition">
                          Take Quiz
                        </button>
                      </Link>
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
