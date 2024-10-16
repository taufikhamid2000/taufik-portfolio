// SurveyTemplateModal.tsx

import React from 'react';

interface SurveyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: string) => void;
}

const SurveyTemplateModal: React.FC<SurveyTemplateModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Choose a Survey Template</h2>
        <ul className="space-y-4">
          <li>
            <button
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelect('Blank')}
            >
              Blank Template
            </button>
          </li>
          <li>
            <button
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelect('Business')}
            >
              Business Survey
            </button>
          </li>
          <li>
            <button
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelect('Education')}
            >
              Education Survey
            </button>
          </li>
          <li>
            <button
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelect('Market Research')}
            >
              Market Research
            </button>
          </li>
        </ul>
        <button
          className="mt-6 text-gray-700 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SurveyTemplateModal;