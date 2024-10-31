/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function TechnicalSupport() {
  return (
    <div className="technical-support p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Technical Support</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        If you're experiencing technical issues, please reach out to our support team. We are here to help you with any questions or problems you may have.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 w-full mb-4">
        Contact Support
      </button>
    </div>
  );
}