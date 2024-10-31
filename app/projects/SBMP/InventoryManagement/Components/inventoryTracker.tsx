/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function InventoryTracker() {
  return (
    <div className="inventory-tracker p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Inventory Tracker</h2>
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-4 text-gray-800 dark:text-gray-100">Item Name</th>
            <th className="p-4 text-gray-800 dark:text-gray-100">Location</th>
            <th className="p-4 text-gray-800 dark:text-gray-100">Stock Level</th>
            <th className="p-4 text-gray-800 dark:text-gray-100">Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <td className="p-4 text-gray-700 dark:text-gray-300">Item A</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">Location 1</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">50</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">20</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <td className="p-4 text-gray-700 dark:text-gray-300">Item B</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">Location 2</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">30</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">15</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <td className="p-4 text-gray-700 dark:text-gray-300">Item C</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">Location 3</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">10</td>
            <td className="p-4 text-gray-700 dark:text-gray-300">5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
