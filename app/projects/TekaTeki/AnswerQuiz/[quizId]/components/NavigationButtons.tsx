// D:\taufik-portfolio\app\projects\TekaTeki\AnswerQuiz\[quizId]\components\NavigationButtons.tsx

import React from 'react';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
  isBackDisabled: boolean;
  isNextDisabled: boolean;
}

const NavigationButtons = ({
  onBack,
  onNext,
  onFinish,
  isLastQuestion,
  isBackDisabled,
  isNextDisabled,
}: NavigationButtonsProps) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        className={`bg-gray-500 text-white p-3 rounded hover:bg-gray-700 ${
          isBackDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={onBack}
        disabled={isBackDisabled}
        aria-label="Go to previous question"
      >
        Back
      </button>
      {!isLastQuestion && (
        <button
          className={`bg-blue-500 text-white p-3 rounded hover:bg-blue-700 ${
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onNext}
          disabled={isNextDisabled}
          aria-label="Go to next question"
        >
          Next
        </button>
      )}
      {isLastQuestion && (
        <button
          className={`bg-green-500 text-white p-3 rounded hover:bg-green-700 ${
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onFinish}
          disabled={isNextDisabled}
          aria-label="Finish the quiz"
        >
          Finish Quiz
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;