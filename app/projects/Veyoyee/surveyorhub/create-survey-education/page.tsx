/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SetStateAction, useState } from 'react';
import Header from '../../../../../components/Header';
import { Button, Input } from '../../../../../components/CommonComponents';
import '../../../../../styles/formStyles.css';

export default function CreateSurveyEducation() {
  const [surveyTitle, setSurveyTitle] = useState('Education Survey Template');
  const [questions, setQuestions] = useState([
    { question: 'What is your preferred learning style?' },
    { question: 'How satisfied are you with the current course structure?' }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Survey Created:', { surveyTitle, questions });
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header title="Create Education Survey" />
      <div className="pt-20 w-full max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create an Education Survey</h1>
        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <div className="mb-6">
            <label htmlFor="surveyTitle" className="block text-lg dark:bg-gray-800 font-medium mb-2">
              Survey Title
            </label>
            <Input
              type="text"
              id="surveyTitle"
              value={surveyTitle}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSurveyTitle(e.target.value)}
              required placeholder={undefined}            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Survey Questions</h2>
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={`question-${index}`} className="block text-lg font-medium mb-2">
                  Question {index + 1}
                </label>
                <Input
                  type="text"
                  id={`question-${index}`}
                  value={q.question}
                  onChange={(e: { target: { value: any; }; }) => handleQuestionChange(index, e.target.value)}
                  required placeholder={undefined} />
              </div>
            ))}
            <Button text="Add Question" color="blue" className="mt-4" onClick={handleAddQuestion} type="button" />
          </div>

          <Button text="Create Survey" color="green" type="submit" className="w-full mt-6" onClick={undefined} />
        </form>
      </div>
    </div>
  );
}
