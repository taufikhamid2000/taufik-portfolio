/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../../../components/Header";
import { Button, Table } from "../../../../components/CommonComponents";
import { fetchSurveys } from "../../../../lib/apiService";
import { Survey } from "../../../../lib/types"; // Import the Survey interface
import "../../../../styles/commonStyles.css";

interface SurveyWithExtras extends Survey {
  status: string;
  responses: number;
}

export default function SurveyorHub() {
  const [surveys, setSurveys] = useState<SurveyWithExtras[]>([]);

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const data: Survey[] = await fetchSurveys();

        // Map data to include 'status' and 'responses'
        const surveysWithExtras: SurveyWithExtras[] = data.map((survey) => ({
          ...survey,
          status: "Active", // Replace with actual status if available
          responses: 0, // Replace with actual response count if available
        }));

        setSurveys(surveysWithExtras);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    getSurveys();
  }, []);

  // Define the table headers as TableHeader objects
  const tableHeaders = [
    { label: "Survey Title" },
    { label: "Status" },
    { label: "Responses" },
    { label: "Actions" },
  ];

  // Define the table rows as TableRow objects
  const tableRows =
    surveys.length > 0
      ? surveys.map((survey) => ({
          cols: [
            survey.title,
            survey.status,
            survey.responses.toString(),
            <div key={`actions-${survey.id}`} className="flex">
              <Button
                text="View"
                color="yellow"
                className="button-class"
                onClick={() => console.log(`Viewing survey ${survey.id}`)}
              />
              <Button
                text="Delete"
                color="red"
                className="ml-2 button-class"
                onClick={() => console.log(`Deleting survey ${survey.id}`)}
              />
            </div>,
          ],
        }))
      : [
          {
            cols: ["No surveys created yet.", "", "", ""],
          },
        ];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header title="Surveyor Hub" />
      <div className="pt-20 w-full max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Surveyor Hub</h1>

        <div className="mb-6 flex justify-between items-center">
          <Link href="/projects/Veyoyee/surveyorhub/create-survey">
            <Button text="Create New Survey" color="blue" className="button-class" />
          </Link>
          <Link href="/projects/Veyoyee/rewards">
            <Button text="Manage Rewards" color="green" className="button-class" />
          </Link>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Surveys</h2>
          <Table headers={tableHeaders} rows={tableRows} />
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