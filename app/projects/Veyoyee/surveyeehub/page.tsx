/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../../../components/Header";
import { Table, Button } from "../../../../components/CommonComponents";
import { fetchSurveys } from "../../../../lib/apiService";
import { Survey } from "../../../../lib/types"; // Import the Survey interface
import "../../../../styles/commonStyles.css";

interface SurveyWithProgress extends Survey {
  progress?: number;
}

export default function SurveyeeHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [surveys, setSurveys] = useState<SurveyWithProgress[]>([]);

  // Fetch surveys from API on component mount
  useEffect(() => {
    const getSurveys = async () => {
      try {
        const data: Survey[] = await fetchSurveys();
        // Map data to include 'progress'
        const surveysWithProgress: SurveyWithProgress[] = data.map((survey) => ({
          ...survey,
          progress: 0, // Initialize progress; replace with actual calculation if available
        }));
        setSurveys(surveysWithProgress);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    getSurveys();
  }, []);

  // Search functionality
  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define the table headers as TableHeader objects
  const tableHeaders = [
    { label: "Survey Title" },
    { label: "Progress" },
    { label: "Actions" },
  ];

  // Define the table rows as TableRow objects
  const tableRows =
    filteredSurveys.length > 0
      ? filteredSurveys.map((survey) => ({
          cols: [
            survey.title,
            <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${survey.progress || 0}%` }}
              ></div>
            </div>,
            <Link href={`/projects/Veyoyee/surveyeehub/answerSurvey?surveyId=${survey.id}`}>
              <Button text="Participate" color="blue" />
            </Link>,
          ],
        }))
      : [
          {
            cols: ["No surveys found.", "", ""],
          },
        ];

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
          <Table headers={tableHeaders} rows={tableRows} />
        </div>
      </div>
    </div>
  );
}