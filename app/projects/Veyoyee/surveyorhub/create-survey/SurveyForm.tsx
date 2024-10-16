/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { Button, Input } from '../../../../../components/CommonComponents';
import Question from './Question';

type QuestionType = 'shortAnswer' | 'paragraph' | 'multipleChoice';

interface QuestionData {
  id: number;
  type: QuestionType;
  questionText: string;
  options?: string[];
}

export default function SurveyForm() {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        type: 'shortAnswer',
        questionText: '',
        options: undefined,
      },
    ]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Survey Created:', { surveyTitle, questions });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <label htmlFor="surveyTitle" className="block text-lg font-medium mb-2">
          Survey Title
        </label>
        <Input
                  type="text"
                  id="surveyTitle"
                  value={surveyTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurveyTitle(e.target.value)}
                  required placeholder={undefined}        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Survey Questions</h2>
        {questions.map((q, index) => (
          <Question
            key={q.id}
            question={q}
            index={index}
            onQuestionChange={(updatedQuestion) => {
              const updatedQuestions = [...questions];
              updatedQuestions[index] = updatedQuestion;
              setQuestions(updatedQuestions);
            }}
            onDelete={() => deleteQuestion(q.id)}
          />
        ))}
      </div>

      <Button text="Add Question" color="blue" type="button" onClick={addQuestion} className="mb-6" />
      <Button text="Create Survey" color="green" type="submit" className="w-full mt-6" onClick={undefined} />
    </form>
  );
}