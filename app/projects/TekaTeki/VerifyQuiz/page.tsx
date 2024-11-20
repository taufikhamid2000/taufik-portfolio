// D:\taufik-portfolio\app\projects\TekaTeki\VerifyQuiz\page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import Header from '@/components/Header'; 
import '../../../../styles/commonStyles.css';

// TypeScript Interfaces
interface Option {
  id: string;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  question_text: string;
  options: Option[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: string;
  feedback?: string;
  questions: Question[];
}

const VerifyQuizPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Fetch all pending quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select(`
            id,
            title,
            description,
            created_at,
            status,
            feedback,
            questions (
              id,
              question_text,
              options (
                id,
                option_text,
                is_correct
              )
            )
          `)
          .eq('status', 'pending');

        if (error) {
          throw new Error(error.message);
        }

        setQuizzes(data || []);
      } catch (err: any) {
        console.error('Error fetching quizzes:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Handle quiz verification
  const handleVerify = async (quizId: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('quizzes')
        .update({ status: 'verified' })
        .eq('id', quizId);

      if (error) {
        throw new Error(error.message);
      }

      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
      setSuccess('Quiz verified successfully!');
    } catch (err: any) {
      console.error('Error verifying quiz:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle quiz rejection
  const handleReject = async (quizId: string, feedback: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('quizzes')
        .update({ status: 'rejected', feedback })
        .eq('id', quizId);

      if (error) {
        throw new Error(error.message);
      }

      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
      setSuccess('Quiz rejected successfully!');
    } catch (err: any) {
      console.error('Error rejecting quiz:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Verify Quizzes</h1>

        {loading && <p>Loading quizzes...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {!loading && quizzes.length === 0 && <p>No quizzes to verify.</p>}

        {quizzes.map((quiz) => (
          <div key={quiz.id} className="mb-6 border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="text-gray-100">{quiz.description}</p>
            <p className="text-sm text-gray-500">Created on: {new Date(quiz.created_at).toLocaleDateString()}</p>

            <div className="mt-4">
              {quiz.questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <p className="font-medium">{question.question_text}</p>
                  <ul>
                    {question.options.map((option) => (
                      <li
                        key={option.id}
                        className={`px-4 py-2 rounded text-black ${
                          option.is_correct ? 'bg-green-500' : 'bg-gray-100'
                        }`}
                      >
                        {option.option_text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleVerify(quiz.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Verify Quiz
              </button>
              <button
                onClick={() => {
                  const feedback = prompt('Enter feedback for the quiz:');
                  if (feedback !== null) {
                    handleReject(quiz.id, feedback);
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyQuizPage;