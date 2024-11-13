// D:\taufik-portfolio\app\projects\TekaTeki\CreateQuiz\page.tsx

'use client';

import React, { useState } from 'react';
import supabase from '../../../../lib/supabaseClient';
import Header from '@/components/Header'; 
import '../../../../styles/commonStyles.css';
import { v4 as uuidv4 } from 'uuid';

// TypeScript Interfaces
interface Option {
  id: string; // Changed from number to string
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string; // Changed from number to string
  question_text: string;
  options: Option[];
}

interface Quiz {
  title: string;
  description: string;
  questions: Question[];
}

const CreateQuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    title: '',
    description: '',
    questions: [
        {
        id: uuidv4(), // Generate a UUID
        question_text: '',
        options: [
            { id: uuidv4(), option_text: '', is_correct: false }, // Generate UUIDs for options
            { id: uuidv4(), option_text: '', is_correct: false },
        ],
        },
    ],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, question_text: value } : q
      ),
    }));
  };

  const handleOptionChange = (questionId: string, optionId: string, value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, option_text: value } : opt
              ),
            }
          : q
      ),
    }));
  };

  const handleCorrectOption = (questionId: string, optionId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) => ({
                ...opt,
                is_correct: opt.id === optionId,
              })),
            }
          : q
      ),
    }));
  };

  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: uuidv4(), // Generate a new UUID
          question_text: '',
          options: [
            { id: uuidv4(), option_text: '', is_correct: false }, // Generate UUIDs for options
            { id: uuidv4(), option_text: '', is_correct: false },
          ],
        },
      ],
    }));
  };  

  const removeQuestion = (id: string) => { // Changed from number to string
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };  

  const addOption = (questionId: string) => { // Changed from number to string
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: uuidv4(), option_text: '', is_correct: false }, // Generate a new UUID
              ],
            }
          : q
      ),
    }));
  };  

  const removeOption = (questionId: string, optionId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      // Insert into quizzes
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .insert([
          {
            title: quiz.title,
            description: quiz.description,
          },
        ])
        .select('id') // Select only the 'id' field
        .single();
  
      if (quizError) throw new Error(`Quiz Insert Error: ${quizError.message}`);
  
      if (!quizData || !quizData.id) {
        throw new Error('Quiz insertion failed: No quiz ID returned.');
      }
  
      const quizId = quizData.id;
  
      for (const question of quiz.questions) {
        // Insert into questions
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .insert([
            {
              question_text: question.question_text,
              quiz_id: quizId,
            },
          ])
          .select('id') // Select only the 'id' field
          .single();
  
        if (questionError) throw new Error(`Question Insert Error: ${questionError.message}`);
  
        if (!questionData || !questionData.id) {
          throw new Error('Question insertion failed: No question ID returned.');
        }
  
        const questionId = questionData.id;
  
        // Prepare options for insertion
        const optionsToInsert = question.options.map((opt) => ({
          option_text: opt.option_text,
          is_correct: opt.is_correct,
          question_id: questionId,
        }));
  
        // Insert into options
        const { error: optionError } = await supabase
          .from('options')
          .insert(optionsToInsert);
  
        if (optionError) throw new Error(`Option Insert Error: ${optionError.message}`);
      }
  
      setSuccess('Quiz created successfully!');
      // Reset the form
      setQuiz({
        title: '',
        description: '',
        questions: [
          {
            id: uuidv4(), // Generate a new UUID
            question_text: '',
            options: [
              { id: uuidv4(), option_text: '', is_correct: false }, // Generate UUIDs for options
              { id: uuidv4(), option_text: '', is_correct: false },
            ],
          },
        ],
      });
    } catch (err: any) {
      console.error('Create Quiz Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Create a New Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="title">
              Quiz Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={quiz.title}
              onChange={handleQuizChange}
              required
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quiz title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2" htmlFor="description">
              Quiz Description
            </label>
            <textarea
              id="description"
              name="description"
              value={quiz.description}
              onChange={handleQuizChange}
              required
              className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quiz description"
              rows={4}
            ></textarea>
          </div>
          {quiz.questions.map((question, qIndex) => (
            <div key={question.id} className="mb-8 border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Question {qIndex + 1}</h2>
                {quiz.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Question
                  </button>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor={`question-${question.id}`}>
                  Question Text
                </label>
                <input
                  type="text"
                  id={`question-${question.id}`}
                  value={question.question_text}
                  onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                  required
                  className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question text"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Options</h3>
                {question.options.map((option, oIndex) => (
                  <div key={option.id} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`correct-option-${question.id}`}
                      checked={option.is_correct}
                      onChange={() => handleCorrectOption(question.id, option.id)}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={option.option_text}
                      onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                      required
                      className="text-black flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${oIndex + 1}`}
                    />
                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(question.id, option.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(question.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add Option
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="mb-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Question
          </button>
          {error && (
            <div className="mb-4 text-red-600">
              <p>Error: {error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 text-green-600">
              <p>{success}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Quiz...' : 'Create Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizPage;