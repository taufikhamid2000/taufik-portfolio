// app/projects/TekaTeki/components/QuizPage.tsx

'use client';

import React from 'react';
import Header from '../../../../components/Header'; // Adjust the path if necessary
import useQuiz from './hooks/useQuiz';
import QuizContent from './components/QuizContent';
import QuizCompleted from './components/QuizCompleted';
import QuizLoading from './components/QuizLoading';
import { questions } from './data/questions'; // Import the questions array
import '../../../../styles/commonStyles.css';

const QuizPage: React.FC = () => {
  const {
    currentQuestionIndex,
    score,
    isQuizCompleted,
    userAnswers,
    shuffledQuestions,
    isLoading,
    handleAnswer,
    handleNext,
    handleBack,
    handleFinish,
    restartQuiz,
  } = useQuiz(questions);

  if (isLoading || !shuffledQuestions) {
    return (
      <div className="text-center">
        <Header />
        <h1 className="mb-8">Simple Quiz</h1>
        <QuizLoading />
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div className="text-center">
        <Header />
        <QuizCompleted
          score={score}
          totalQuestions={shuffledQuestions.length}
          restartQuiz={restartQuiz}
        />
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const hasAnswered = userAnswers[currentQuestionIndex] !== null;
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="text-center">
      <Header />
      <QuizContent
        currentQuestion={currentQuestion}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={shuffledQuestions.length}
        hasAnswered={hasAnswered}
        handleAnswer={handleAnswer}
        handleBack={handleBack}
        handleNext={handleNext}
        handleFinish={handleFinish}
        isLastQuestion={isLastQuestion}
        isBackDisabled={currentQuestionIndex === 0}
        isNextDisabled={!hasAnswered}
        userAnswer={userAnswer} // Pass the actual user answer
      />
    </div>
  );
};

export default QuizPage;
