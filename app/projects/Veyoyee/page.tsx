"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TemplateProjectPage from '../../../components/TemplateProjectPage';
import { fetchCreatedSurveys, fetchAnsweredSurveys } from '../../../lib/apiService';
import '../../../styles/tableStyles.css';

interface Survey {
  id: number;
  title: string;
  created_at: string;
}

export default function Veyoyee() {
  const [createdSurveys, setCreatedSurveys] = useState<Survey[]>([]);
  const [answeredSurveys, setAnsweredSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const created = await fetchCreatedSurveys();
        const answered = await fetchAnsweredSurveys();
        setCreatedSurveys(created);
        setAnsweredSurveys(answered);
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
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Survey ID</th>
              <th>Title</th>
              <th>Created/Answered At</th>
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
                  <td>{survey.created_at}</td>
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