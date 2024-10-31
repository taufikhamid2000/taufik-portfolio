/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function LowStockAlerts() {
  return (
    <div className="low-stock-alerts p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Low Stock Alerts</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
        <li className="mb-4">Item C at Location 3 is below reorder level. Only 10 units left.</li>
        <li className="mb-4">Item B at Location 2 is approaching reorder level. Only 30 units left.</li>
        <li>Item D at Location 1 is critically low. Please restock immediately.</li>
      </ul>
    </div>
  );
}