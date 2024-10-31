/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function BusinessOverview() {
  return (
    <div className="business-overview p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Business Overview</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Welcome to your business overview! Here you can find a snapshot of your business performance across all locations. This summary helps you stay on top of key metrics, manage multiple locations effortlessly, and make informed decisions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-300">Total Sales</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">$25,430</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Active Locations</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">8</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-600 dark:text-yellow-300">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">1,234</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-red-600 dark:text-red-300">Staff Members</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">52</p>
        </div>
      </div>
    </div>
  );
}
