// app/projects/TekaTeki/hooks/useQuiz.ts

import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../utils'; // Ensure this path is correct
import { QuestionType } from '../../AnswerQuiz/data/questions'; // Adjust the path as needed

const useQuiz = (questions: QuestionType[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and shuffle questions
  useEffect(() => {
    const initializeQuiz = () => {
      const shuffled = shuffleArray(
        questions.map((question) => ({
          ...question,
          options: shuffleArray(question.options),
        }))
      );
      setShuffledQuestions(shuffled);
      setUserAnswers(Array(shuffled.length).fill(null));
      setIsLoading(false);
    };

    initializeQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]); // Since 'questions' is stable, this won't cause infinite loops

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      if (!shuffledQuestions) return;
      if (userAnswers[currentQuestionIndex] !== null) return;

      const selectedOption = shuffledQuestions[currentQuestionIndex].options[selectedIndex];

      setUserAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = selectedIndex;
        return newAnswers;
      });

      if (selectedOption.isCorrect) {
        setScore((prev) => prev + 1);
      }
    },
    [shuffledQuestions, currentQuestionIndex, userAnswers]
  );

  const handleNext = useCallback(() => {
    if (!shuffledQuestions) return;

    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  }, [shuffledQuestions, currentQuestionIndex]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleFinish = useCallback(() => {
    setIsQuizCompleted(true);
  }, []);

  const restartQuiz = useCallback(() => {
    const reshuffled = shuffleArray(
      questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(reshuffled);
    setUserAnswers(Array(reshuffled.length).fill(null));
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setIsLoading(false);
  }, [questions]);

  return {
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
  };
};

export default useQuiz;