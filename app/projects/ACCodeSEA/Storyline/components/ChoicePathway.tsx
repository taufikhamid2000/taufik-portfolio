/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
// import '../../../styles/commonStyles.css';
import '../styles/interactiveStyles.css';

interface ChoicePathwayProps {
  choices: {
    label: string;
    content: string;
  }[];
}

const ChoicePathway: React.FC<ChoicePathwayProps> = ({ choices }) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleChoiceSelection = (index: number) => {
    setSelectedChoice(index);
  };

  return (
    <div className="choice-pathway mb-12">
      <h3 className="text-2xl font-bold mb-4">Make Your Choice</h3>
      <div className="choices flex flex-col gap-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            className={`choice-button px-4 py-2 rounded-lg text-white ${
              selectedChoice === index ? 'bg-blue-700' : 'bg-blue-500'
            }`}
            onClick={() => handleChoiceSelection(index)}
          >
            {choice.label}
          </button>
        ))}
      </div>
      {selectedChoice !== null && (
        <div className="choice-content mt-6 p-4 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg">
          <p>{choices[selectedChoice].content}</p>
        </div>
      )}
    </div>
  );
};

export default ChoicePathway;