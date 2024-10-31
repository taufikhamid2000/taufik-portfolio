/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function UserBusinessInfo() {
  return (
    <div className="user-business-info p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Business Information</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        View and update your business information. Make sure your profile is up-to-date to get the most out of the platform.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 w-full mb-4">
        Edit Business Info
      </button>
    </div>
  );
}