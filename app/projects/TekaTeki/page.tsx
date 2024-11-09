'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Question from './Question';
import '../../../styles/commonStyles.css';

interface ResultSummaryProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuestionType {
  questionText: string;
  options: Option[];
}

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[] | null>(null);

  const questions: QuestionType[] = [
    {
      questionText: 'What is 2 + 2?',
      options: [
        { text: '1', isCorrect: false },
        { text: '2', isCorrect: false },
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: true },
      ],
    },
    {
      questionText: 'What is the capital of Malaysia?',
      options: [
        { text: 'Bangkok', isCorrect: false },
        { text: 'Jakarta', isCorrect: false },
        { text: 'Kuala Lumpur', isCorrect: true },
        { text: 'Hanoi', isCorrect: false },
      ],
    },
    // Add more questions as needed
  ];

  // Pure shuffle function using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]; // Create a copy to avoid mutating the original array
    let currentIndex = shuffled.length;
    let randomIndex: number;

    // Fisher-Yates Shuffle Algorithm
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap elements
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }

    return shuffled;
  };

  // Shuffle questions and their options on the client side once
  useEffect(() => {
    const shuffled = shuffleArray(
      questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(shuffled);
    // Initialize userAnswers based on the number of questions
    setUserAnswers(Array(shuffled.length).fill(null));
  }, []);

  const handleAnswer = (selectedIndex: number) => {
    if (!shuffledQuestions) return;

    // Prevent answering if already answered
    if (userAnswers[currentQuestionIndex] !== null) return;

    setIsFeedbackVisible(true);

    const selectedOption = shuffledQuestions[currentQuestionIndex].options[selectedIndex];

    // Update userAnswers
    setUserAnswers((prevUserAnswers) => {
      const newUserAnswers = [...prevUserAnswers];
      newUserAnswers[currentQuestionIndex] = selectedIndex;
      return newUserAnswers;
    });

    // Update score if the answer is correct
    if (selectedOption.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    if (!shuffledQuestions) return;

    setIsFeedbackVisible(false);

    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (!shuffledQuestions) return;

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setIsFeedbackVisible(userAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const restartQuiz = () => {
    if (!shuffledQuestions) return;

    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizCompleted(false);
    setIsFeedbackVisible(false);
    // Reshuffle questions and reset userAnswers
    const reshuffled = shuffleArray(
      questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(reshuffled);
    setUserAnswers(Array(reshuffled.length).fill(null));
  };

  const ResultSummary = ({ score, totalQuestions, onRestart }: ResultSummaryProps) => {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>
          You scored {score} out of {totalQuestions}
        </p>
        <button onClick={onRestart} className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
          Try Again
        </button>
      </div>
    );
  };

  if (!shuffledQuestions) {
    // Render a loading state while questions are being shuffled
    return (
      <div className="text-center">
        <Header />
        <h1 className="mb-8">Simple Quiz</h1>
        <p>Loading...</p>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const hasAnswered = userAnswers[currentQuestionIndex] !== null;

  return (
    <div className="text-center">
      <Header />
      <h1 className="mb-8">Simple Quiz</h1>
      {isQuizCompleted ? (
        <ResultSummary score={score} totalQuestions={shuffledQuestions.length} onRestart={restartQuiz} />
      ) : (
        <>
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </p>
            <div className="w-full bg-gray-300 h-2 mt-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <Question
            question={currentQuestion.questionText}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            isFeedbackVisible={isFeedbackVisible}
            userAnswer={userAnswers[currentQuestionIndex]}
            isAnswered={hasAnswered}
          />
          <div className="mt-6 flex justify-center gap-4">
            <button
              className={`bg-gray-500 text-white p-3 rounded hover:bg-gray-700 ${
                currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Back
            </button>
            {hasAnswered && (
              <button
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700"
                onClick={nextQuestion}
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
