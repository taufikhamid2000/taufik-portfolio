// app/projects/TekaTeki/components/QuizCompleted.tsx

import React from 'react';
import ResultSummary from './ResultSummary';

interface QuizCompletedProps {
  score: number;
  totalQuestions: number;
  restartQuiz: () => void;
}

const QuizCompleted: React.FC<QuizCompletedProps> = ({ score, totalQuestions, restartQuiz }) => {
  return (
    <div className="text-center">
      <h1 className="mb-8">Simple Quiz</h1>
      <ResultSummary score={score} totalQuestions={totalQuestions} onRestart={restartQuiz} />
    </div>
  );
};

export default QuizCompleted;