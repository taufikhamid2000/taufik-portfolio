// app/projects/TekaTeki/components/QuizLoading.tsx

import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const QuizLoading: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="mb-8">Simple Quiz</h1>
      <LoadingIndicator />
    </div>
  );
};

export default QuizLoading;