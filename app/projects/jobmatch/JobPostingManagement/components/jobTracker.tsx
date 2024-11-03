/* eslint-disable react/no-unescaped-entities */
"use client";

// Job Posting Management Components - Job Tracker, Job Alerts, Job Creation Tools

import '../../../../../styles/commonStyles.css';

// Job Tracker Component
interface JobTrackerProps {
  activePostings: number;
  expiredPostings: number;
  totalPostings: number;
}

export function JobTracker({ activePostings, expiredPostings, totalPostings }: JobTrackerProps) {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Job Tracker</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Here is a summary of your job postings. Track the current status and performance of the jobs posted.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Active Postings</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{activePostings}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-600 dark:text-yellow-300">Expired Postings</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{expiredPostings}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-300">Total Postings</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalPostings}</p>
        </div>
      </div>
    </section>
  );
}

// Job Alerts Component
interface JobAlertsProps {
  alerts: string[];
}

export function JobAlerts({ alerts }: JobAlertsProps) {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Job Alerts</h2>
      {alerts.length > 0 ? (
        <ul className="list-disc pl-6">
          {alerts.map((alert, index) => (
            <li key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600 pb-2">{alert}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">No job alerts at this moment.</p>
      )}
    </section>
  );
}

// Job Creation Tools Component
interface JobCreationToolsProps {
  onCreateJob: () => void;
}

export function JobCreationTools({ onCreateJob }: JobCreationToolsProps) {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Job Creation Tools</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Use the tools provided below to create and manage job postings efficiently.
      </p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg border border-blue-600 hover:border-blue-800"
        onClick={onCreateJob}
      >
        Create New Job Posting
      </button>
    </section>
  );
}
