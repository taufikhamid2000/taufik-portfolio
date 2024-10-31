/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function BugReporting() {
  return (
    <div className="bug-reporting p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Bug Reporting</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Found a bug? Help us improve SBMP by reporting any issues you encounter. We appreciate your feedback and work hard to resolve any issues.
      </p>
      <button className="bg-red-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-red-700 transition duration-300 w-full mb-4">
        Report a Bug
      </button>
    </div>
  );
}