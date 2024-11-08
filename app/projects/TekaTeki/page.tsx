'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Question from './Question';
import '../../../styles/commonStyles.css';

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [SelectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isFeedbackVisible, setisFeedbackVisible] = useState(false);

  interface ResultSummaryProp {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
  }

  const questions = [
    {
      questionText: 'What is 2 + 2?',
      options: ['1', '2', '3', '4'],
      correctOptionIndex: 3,
    },
    {
      questionText: 'What is the capital of Malaysia?',
      options: ['Bangkok', 'Jakarta', 'Kuala Lumpur', 'Hanoi'],
      correctOptionIndex: 2,
    },
    // Add more questions as needed
  ];

  const handleAnswer = (selectedOptionIndex: number) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedOptionIndex]);

    if (selectedOptionIndex === questions[currentQuestionIndex].correctOptionIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const ResultSummary = ({ score, totalQuestions, onRestart }: ResultSummaryProp) => {
    return(
        <div>
            <h2>Quiz Completed</h2>
            <p>You scored {score} out of {totalQuestions}</p>
            <button onClick={onRestart}>Try Again</button>
        </div>
    )
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setIsQuizCompleted(false);
  }

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledQuestion = shuffleArray(
    questions.map((questions) => ({
        ...questions,
        options: shuffleArray(questions.options),
    }))
  );

  return (
    <div className="text-center">
      <Header />
      <h1 className="mb-8">Simple Quiz</h1>
      {isQuizCompleted ? (
        <ResultSummary 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={restartQuiz}
        />
      ):(
        <>
      <div className="mb-4">
        <p className="text-lg font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div className="w-full bg-gray-300 h-2 mt-2 rounded-full">
            <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
        </div>
      </div>
      <Question
        question={currentQuestion.questionText}
        options={currentQuestion.options}
        onAnswer={handleAnswer}
      />
      </>
    )}
  </div>
);

  

};

export default QuizPage;
