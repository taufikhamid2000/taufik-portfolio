/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { Button, Input } from '../../../../../components/CommonComponents';
import Question from './Question';
import SampleSizeCalculator from './SampleSizeCalculator';
import Modal from '../../../../../components/Modal';
import { createSurvey } from '../../../../../lib/apiService';
import { QuestionData, SurveyCreationData } from '../../../../../lib/types';

export default function SurveyForm() {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [minRespondents, setMinRespondents] = useState<number | undefined>(undefined);
  const [maxRespondents, setMaxRespondents] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const MIN_QUESTIONS = 3;
  const MAX_QUESTIONS = 10;

  const addQuestion = () => {
    if (questions.length < MAX_QUESTIONS) {
      setQuestions([
        ...questions,
        {
          id: (questions.length + 1).toString(), // Ensure id is a string
          type: 'shortAnswer',
          questionText: '',
          options: undefined,
        },
      ]);
    } else {
      alert(`You can only add up to ${MAX_QUESTIONS} questions.`);
    }
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (questions.length < MIN_QUESTIONS) {
      alert(`Please add at least ${MIN_QUESTIONS} questions to the survey.`);
      return;
    }

    try {
      const surveyData: SurveyCreationData = {
        title: surveyTitle,
        questions,
        minRespondents,
        maxRespondents,
        startDate,
        endDate,
      };
      await createSurvey(surveyData);
      alert('Survey created successfully!');
      // Optionally, reset the form or redirect
    } catch (error) {
      console.error('Error creating survey:', error);
      alert('Failed to create survey. Please try again.');
    }
  };

  const handleUseSampleSize = (size: number) => {
    setMinRespondents(size);
    setIsCalculatorOpen(false);
  };

  const handleQuestionChange = (index: number, updatedQuestion: QuestionData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
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
          required
          placeholder="Enter survey title"
        />
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

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="minRespondents" className="block text-lg font-medium mb-2">
            Minimum Number of Respondents (Recommended)
          </label>
          <Input
            type="number"
            id="minRespondents"
            value={minRespondents !== undefined ? minRespondents.toString() : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setMinRespondents(value ? Number(value) : undefined);
            }}
            placeholder="Enter minimum respondents"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="maxRespondents" className="block text-lg font-medium mb-2">
            Maximum Number of Respondents (Optional)
          </label>
          <Input
            type="number"
            id="maxRespondents"
            value={maxRespondents !== undefined ? maxRespondents.toString() : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setMaxRespondents(value ? Number(value) : undefined);
            }}
            placeholder="Enter maximum respondents"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-lg font-medium mb-2">
            Survey Start Date (Recommended)
          </label>
          <Input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            placeholder="Select start date"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="endDate" className="block text-lg font-medium mb-2">
            Survey End Date (Recommended)
          </label>
          <Input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            placeholder="Select end date"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Survey Questions</h2>
        {questions.map((q, index) => (
          <Question
            key={q.id}
            question={q}
            index={index}
            onQuestionChange={(updatedQuestion: QuestionData) => handleQuestionChange(index, updatedQuestion)}
            onDelete={() => deleteQuestion(q.id)}
          />
        ))}
      </div>

      <Button text="Add Question" color="blue" type="button" onClick={addQuestion} className="mb-6" />
      <Button text="Create Survey" color="green" type="submit" className="w-full mt-6" />
    </form>
  );
}