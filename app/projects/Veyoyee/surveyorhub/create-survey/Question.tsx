// Question.tsx

"use client";

import { Input, Button } from '../../../../../components/CommonComponents';
import { useState } from 'react';
import { QuestionData, QuestionType } from '../../../../../lib/types'; // Corrected import path

interface QuestionProps {
  question: QuestionData;
  index: number;
  onQuestionChange: (updatedQuestion: QuestionData) => void;
  onDelete: () => void;
}

export default function Question({ question, index, onQuestionChange, onDelete }: QuestionProps) {
  const [questionText, setQuestionText] = useState(question.questionText);
  const [type, setType] = useState<QuestionType>(question.type);
  const [options, setOptions] = useState<string[]>(question.options || []);

  // Handle changes to the question text
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
    onQuestionChange({ ...question, questionText: e.target.value });
  };

  // Handle changes to the answer type
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    setType(newType);
    const updatedQuestion: QuestionData = {
      ...question,
      type: newType,
      options: newType === 'multipleChoice' ? [''] : undefined,
    };
    setOptions(updatedQuestion.options || []);
    onQuestionChange(updatedQuestion);
  };

  // Add a new option for multiple-choice questions
  const addOption = () => {
    const updatedOptions = [...options, ''];
    setOptions(updatedOptions);
    onQuestionChange({ ...question, options: updatedOptions });
  };

  // Handle changes to an individual option
  const handleOptionChange = (optionIndex: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex] = value;
    setOptions(updatedOptions);
    onQuestionChange({ ...question, options: updatedOptions });
  };

  // Delete an option for multiple-choice questions
  const deleteOption = (optionIndex: number) => {
    const updatedOptions = options.filter((_, idx) => idx !== optionIndex);
    setOptions(updatedOptions);
    onQuestionChange({ ...question, options: updatedOptions });
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-700 rounded-lg">
      {/* Question Text Input */}
      <label htmlFor={`question-${index}`} className="block text-lg font-medium mb-2">
        Question {index + 1}
      </label>
      <Input
        type="text"
        id={`question-${index}`}
        value={questionText}
        onChange={handleQuestionTextChange}
        required
        placeholder="Enter your question"
      />

      {/* Answer Type Selection */}
      <div className="mt-4">
        <label htmlFor={`type-${index}`} className="block text-lg font-medium mb-2">
          Answer Type
        </label>
        <select
          id={`type-${index}`}
          value={type}
          onChange={handleTypeChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="shortAnswer">Short Answer</option>
          <option value="paragraph">Paragraph</option>
          <option value="multipleChoice">Multiple Choice</option>
        </select>
      </div>

      {/* Options for Multiple Choice Questions */}
      {type === 'multipleChoice' && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Options</h3>
          {options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <Input
                type="text"
                value={option}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOptionChange(optionIndex, e.target.value)
                }
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
              <Button
                text="Delete"
                color="red"
                type="button"
                onClick={() => deleteOption(optionIndex)}
                className="ml-2"
              />
            </div>
          ))}
          <Button text="Add Option" color="blue" type="button" onClick={addOption} className="mt-2" />
        </div>
      )}

      {/* Delete Question Button */}
      <Button text="Delete Question" color="red" type="button" onClick={onDelete} className="mt-4" />
    </div>
  );
}