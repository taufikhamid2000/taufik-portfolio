/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TemplateProjectPage from '../../../components/TemplateProjectPage';
import { fetchSurveys } from '../../../lib/apiService';
import '../../../styles/tableStyles.css';
import { Survey } from '../../../lib/types'; // Import the Survey interface

// Define an extended interface if needed
interface SurveyWithDate extends Survey {
  date: string;
}

export default function Veyoyee() {
  const [createdSurveys, setCreatedSurveys] = useState<SurveyWithDate[]>([]);
  const [answeredSurveys, setAnsweredSurveys] = useState<SurveyWithDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch surveys with filters
        const created: Survey[] = await fetchSurveys('created');
        const answered: Survey[] = await fetchSurveys('answered');

        // Map the data to match the SurveyWithDate interface
        const mappedCreated: SurveyWithDate[] = created.map((survey) => ({
          ...survey,
          date: survey.id || '',
        }));

        const mappedAnswered: SurveyWithDate[] = answered.map((survey) => ({
          ...survey,
          date: survey.id || survey.id || '',
        }));

        setCreatedSurveys(mappedCreated);
        setAnsweredSurveys(mappedAnswered);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getFilteredSurveys = () => {
    if (filter === 'created') return createdSurveys;
    if (filter === 'answered') return answeredSurveys;
    if (filter === 'all') return [...createdSurveys, ...answeredSurveys];
    return [];
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <TemplateProjectPage
        title="Veyoyee"
        description="Veyoyee is a platform that bridges the gap between survey creators and participants, offering an engaging and rewarding experience."
      />
      {/* Admin Only Button for Create New Project */}
      <div className="mt-6 text-center">
        <Link href="/create-project">
          <button className="text-xs px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            (Admin Only) Go to admin page
          </button>
        </Link>
      </div>
      <div className="mt-6 text-center">
        <Link href="/projects/Veyoyee/about">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Learn More About Us
          </button>
        </Link>
      </div>
      <div className="pt-10 w-full max-w-6xl mx-auto p-6">
        <div className="mb-4">
          <label>
            <input
              type="radio"
              value="created"
              checked={filter === 'created'}
              onChange={handleFilterChange}
            />{' '}
            Created
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="answered"
              checked={filter === 'answered'}
              onChange={handleFilterChange}
            />{' '}
            Answered
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="all"
              checked={filter === 'all'}
              onChange={handleFilterChange}
            />{' '}
            All
          </label>

          <div className="mt-6 text-center">
            <Link href="/projects/Veyoyee/surveyeehub">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mr-4">
                Explore Surveys
              </button>
            </Link>
            <Link href="/projects/Veyoyee/surveyorhub">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Create New Survey
              </button>
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Survey ID</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center">Loading...</td>
              </tr>
            ) : getFilteredSurveys().length > 0 ? (
              getFilteredSurveys().map((survey) => (
                <tr key={survey.id}>
                  <td>{survey.id}</td>
                  <td>{survey.title}</td>
                  <td>{survey.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">No surveys {filter} yet.</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
