/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function QuickStats() {
  return (
    <div className="quick-stats p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quick Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">Revenue Today</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">$1,200</p>
        </div>
        <div className="stat-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-300">New Customers</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">15</p>
        </div>
        <div className="stat-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-yellow-600 dark:text-yellow-300">Orders Pending</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">7</p>
        </div>
        <div className="stat-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-300">Low Stock Items</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">3</p>
        </div>
      </div>
    </div>
  );
}
