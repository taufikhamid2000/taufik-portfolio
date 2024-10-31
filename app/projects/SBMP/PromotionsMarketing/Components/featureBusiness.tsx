/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function FeatureBusiness() {
  return (
    <div className="feature-business p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Feature Your Business</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Increase your business visibility by featuring it prominently on the platform. This helps attract more customers and boosts brand awareness.
      </p>
      <button className="bg-green-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-green-700 transition duration-300 w-full mb-4">
        Feature My Business
      </button>
    </div>
  );
}
