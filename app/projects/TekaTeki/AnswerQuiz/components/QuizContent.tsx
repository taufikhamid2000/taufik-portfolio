// app/projects/TekaTeki/components/QuizContent.tsx

import React from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';

interface QuizContentProps {
  currentQuestion: {
    questionText: string;
    options: { text: string; isCorrect: boolean }[];
  };
  currentQuestionNumber: number;
  totalQuestions: number;
  hasAnswered: boolean;
  handleAnswer: (selectedIndex: number) => void;
  handleBack: () => void;
  handleNext: () => void;
  handleFinish: () => void;
  isLastQuestion: boolean;
  isBackDisabled: boolean;
  isNextDisabled: boolean;
  userAnswer: number | null; // Add userAnswer prop
}

const QuizContent: React.FC<QuizContentProps> = ({
  currentQuestion,
  currentQuestionNumber,
  totalQuestions,
  hasAnswered,
  handleAnswer,
  handleBack,
  handleNext,
  handleFinish,
  isLastQuestion,
  isBackDisabled,
  isNextDisabled,
  userAnswer, // Destructure userAnswer
}) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-lg font-semibold">
          Question {currentQuestionNumber} of {totalQuestions}
        </p>
        <ProgressBar current={currentQuestionNumber} total={totalQuestions} />
      </div>
      <Question
        question={currentQuestion.questionText}
        options={currentQuestion.options}
        onAnswer={handleAnswer}
        isFeedbackVisible={hasAnswered}
        userAnswer={userAnswer} // Pass the actual user answer
        isAnswered={hasAnswered}
      />
      <NavigationButtons
        onBack={handleBack}
        onNext={handleNext}
        onFinish={handleFinish}
        isLastQuestion={isLastQuestion}
        isBackDisabled={isBackDisabled}
        isNextDisabled={isNextDisabled}
      />
    </>
  );
};

export default QuizContent;
