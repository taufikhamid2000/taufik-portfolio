/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

interface JobStatsProps {
  totalViews: number;
  totalApplications: number;
  averageApplicantsPerJob: number;
}

export default function JobStats({ totalViews, totalApplications, averageApplicantsPerJob }: JobStatsProps) {
  return (
    <div className="job-stats p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Job Statistics</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Get an overview of your job postings and how they are engaging with potential candidates. These statistics help you evaluate your hiring process effectively.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-300">Total Job Views</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalViews}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Total Applications</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalApplications}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-600 dark:text-yellow-300">Average Applicants per Job</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{averageApplicantsPerJob}</p>
        </div>
      </div>
    </div>
  );
}
