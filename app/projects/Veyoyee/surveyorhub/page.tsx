"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../../components/Header';
import { Button, Table } from '../../../../components/CommonComponents';
import '../../../../styles/commonStyles.css';

export default function SurveyorHub() {
  const [surveys] = useState([
    { id: 1, title: 'Customer Satisfaction Survey', status: 'Active', responses: 120 },
    { id: 2, title: 'Product Feedback Survey', status: 'Closed', responses: 80 }
  ]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header title="Surveyor Hub" />
      <div className="pt-20 w-full max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Surveyor Hub</h1>

        <div className="mb-6 flex justify-between items-center">
          <Link href="/projects/Veyoyee/surveyorhub/create-survey">
            <Button text="Create New Survey" color="blue" className="button-class" onClick={undefined} />
          </Link>
          <Link href="/projects/Veyoyee/rewards">
            <Button text="Manage Rewards" color="green" className="button-class" onClick={undefined} />
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Surveys</h2>
          <Table
            headers={['Survey Title', 'Status', 'Responses', 'Actions']}
            rows={
              surveys.length > 0
                ? surveys.map((survey) => ({
                    cols: [
                      survey.title,
                      survey.status,
                      survey.responses,
                      <>
                        <Button text="View" color="yellow" className="button-class" onClick={undefined} />
                        <Button text="Delete" color="red" className="ml-2" onClick={undefined} />
                      </>
                    ]
                  }))
                : [{ cols: ['No surveys created yet.', '', '', ''] }]
            }
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Survey Analytics</h2>
          <div className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300">
              Analytics data will be displayed here. Charts, graphs, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
