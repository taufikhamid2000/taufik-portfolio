// D:\taufik-portfolio\app\projects\TekaTeki\AnswerQuiz\[quizId]\page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import supabase from '../../../../../lib/supabaseClient';
import Header from '@/components/Header'; 
import NavigationButtons from './components/NavigationButtons';
import '../../../../../styles/commonStyles.css';

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
  questions: Question[];
}

const QuizPage: React.FC = () => {
  // Extracting quizId from the URL
  const params = useParams();
  const quizId = params.quizId as string; // Type assertion since useParams returns string | string[] | undefined

  // State Variables
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<{ [key: number]: string }>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Fetch Quiz Data on Component Mount
  useEffect(() => {
    if (!quizId) {
      setError('No Quiz ID provided in the URL.');
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select(`
            id,
            title,
            description,
            created_at,
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
          .eq('id', quizId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setQuiz(data as Quiz);
      } catch (err: any) {
        console.error('Error fetching quiz:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle Option Selection
  const handleOptionClick = (option: Option) => {
    if (selectedOptionIds[currentQuestionIndex]) return; // Prevent multiple selections for the current question

    setSelectedOptionIds({
      ...selectedOptionIds,
      [currentQuestionIndex]: option.id,
    });

    if (option.is_correct) {
      setScore(prev => prev + 1);
    }
  };

  // Navigate to the Next Question
  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  // Navigate to the Previous Question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Restart Quiz
  const restartQuiz = () => {
    setSelectedOptionIds({});
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizCompleted(false);
  };

  // Determine if Back/Next buttons should be disabled
  const isBackDisabled = currentQuestionIndex === 0;
  const isNextDisabled = !selectedOptionIds[currentQuestionIndex];

  // Render Loading State
  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <h1>Loading Quiz...</h1>
        </div>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div>
        <Header />
        <div className="flex flex-col justify-center items-center h-screen">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Render No Quiz Found State
  if (!quiz) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <h1>No Quiz Found</h1>
        </div>
      </div>
    );
  }

  // Render Quiz Completed State
  if (isQuizCompleted) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Quiz Completed!</h1>
          <p className="mt-4">You scored {score} out of {quiz.questions.length}.</p>
          <button
            onClick={restartQuiz}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  // Current Question
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const userAnswer = selectedOptionIds[currentQuestionIndex] || null;

  // Determine if the selected answer is correct
  const selectedOption = currentQuestion.options.find(option => option.id === userAnswer);
  const isSelectedCorrect = selectedOption ? selectedOption.is_correct : null;

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center">{quiz.title}</h1>
        <p className="mt-2 text-center">{quiz.description}</p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </h2>
          <p className="mt-4">{currentQuestion.question_text}</p>
          <ul className="mt-4">
            {currentQuestion.options.map((option) => {
              // Determine Style Based on Selection and Correctness
              let optionStyle: React.CSSProperties = {
                padding: '10px',
                margin: '5px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
              };

              if (userAnswer) {
                if (option.is_correct) {
                  optionStyle.backgroundColor = '#d4edda'; // Green for correct
                } else if (option.id === userAnswer) {
                  optionStyle.backgroundColor = '#f8d7da'; // Red for incorrect
                } else {
                  optionStyle.backgroundColor = '#e2e3e5'; // Grey for others
                }
              }

              return (
                <li key={option.id}>
                  <button
                    style={optionStyle}
                    onClick={() => handleOptionClick(option)}
                    disabled={!!userAnswer}
                    className="w-full text-left"
                    aria-label={`Option ${option.option_text}`}
                  >
                    {option.option_text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Feedback */}
        {userAnswer && (
          <div className="mt-4">
            {isSelectedCorrect ? (
              <p className="text-green-600 font-semibold">yeah, you're just lucky!</p>
            ) : (
              <p className="text-red-600 font-semibold">hahaha, stupid.</p>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          onFinish={handleNext}
          isLastQuestion={currentQuestionIndex === quiz.questions.length - 1}
          isBackDisabled={isBackDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default QuizPage;
