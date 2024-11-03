/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

interface EmployerOverviewProps {
  jobCount: number;
  activeJobs: number;
  totalApplicants: number;
}

export default function EmployerOverview({ jobCount, activeJobs, totalApplicants }: EmployerOverviewProps) {
  return (
    <div className="employer-overview p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Employer Overview</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Here is a summary of your job postings and applicant engagement to help you keep track of your hiring progress.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-300">Total Jobs Posted</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{jobCount}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Active Jobs</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{activeJobs}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-600 dark:text-yellow-300">Total Applicants</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalApplicants}</p>
        </div>
      </div>
    </div>
  );
}
