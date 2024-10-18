/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { Button, Input } from '../../../../../components/CommonComponents';
import Question from './Question';
import SampleSizeCalculator from './SampleSizeCalculator';
import Modal from '../../../../../components/Modal';

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
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [minRespondents, setMinRespondents] = useState<number | ''>('');
  const [maxRespondents, setMaxRespondents] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    console.log('Survey Created:', { surveyTitle, questions, minRespondents, maxRespondents, startDate, endDate });
  };

  const handleUseSampleSize = (size: number) => {
    setMinRespondents(size);
    setIsCalculatorOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <label htmlFor="surveyTitle" className="block text-lg font-medium mb-2">
          Survey Title <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="surveyTitle"
          value={surveyTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurveyTitle(e.target.value)}
          required placeholder={undefined}        />
      </div>

      <Button
        text="Open Sample Size Calculator"
        color="blue"
        type="button"
        onClick={() => setIsCalculatorOpen(true)}
        className="mb-6"
      />

      {isCalculatorOpen && (
        <Modal onClose={() => setIsCalculatorOpen(false)}>
          <SampleSizeCalculator onUseSampleSize={handleUseSampleSize} />
        </Modal>
      )}

      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex-1">
          <label htmlFor="minRespondents" className="block text-lg font-medium mb-2">
            Minimum Number of Respondents (Recommended)
          </label>
          <Input
            type="number"
            id="minRespondents"
            value={minRespondents}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinRespondents(Number(e.target.value))} required={undefined} placeholder={undefined}          />
        </div>

        <div className="flex-1">
          <label htmlFor="maxRespondents" className="block text-lg font-medium mb-2">
            Maximum Number of Respondents (Optional)
          </label>
          <Input
            type="number"
            id="maxRespondents"
            value={maxRespondents}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxRespondents(Number(e.target.value))} required={undefined} placeholder={undefined}          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-lg font-medium mb-2">
            Survey Start Date (Recommended)
          </label>
          <Input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} required={undefined} placeholder={undefined}          />
        </div>

        <div className="flex-1">
          <label htmlFor="endDate" className="block text-lg font-medium mb-2">
            Survey End Date (Recommended)
          </label>
          <Input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)} required={undefined} placeholder={undefined}          />
        </div>
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