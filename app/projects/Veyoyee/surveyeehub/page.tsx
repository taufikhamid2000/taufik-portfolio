/* eslint-disable react/jsx-key */
"use client";

import { useState } from 'react';
import Header from '../../../../components/Header'; // Adjust path as necessary
import { Table, Button } from '../../../../components/CommonComponents';

export default function SurveyeeHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [surveys] = useState([
    { id: 1, title: 'Customer Feedback Survey', progress: 40 },
    { id: 2, title: 'Employee Satisfaction Survey', progress: 80 }
  ]);

  // Search functionality
  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="pt-20 w-full max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Surveyee Hub</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Available Surveys</h2>
          <Table
            headers={['Survey Title', 'Progress', 'Actions']}
            rows={
              filteredSurveys.length > 0
                ? filteredSurveys.map((survey) => ({
                    cols: [
                      survey.title,
                      <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${survey.progress}%` }}
                        ></div>
                      </div>,
                      <Button text="Participate" color="blue" className={undefined} />
                    ]
                  }))
                : [{ cols: ['No surveys found.', '', ''] }]
            }
          />
        </div>
      </div>
    </div>
  );
}