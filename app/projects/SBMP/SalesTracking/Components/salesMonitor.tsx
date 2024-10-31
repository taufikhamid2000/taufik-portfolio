/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function SalesMonitor() {
  return (
    <div className="sales-monitor p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Sales Monitor</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Monitor your sales performance in real-time. Stay up-to-date with the latest sales data across all your business locations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-300">Today's Sales</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">$2,150</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Total Orders Today</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">120</p>
        </div>
      </div>
    </div>
  );
}
