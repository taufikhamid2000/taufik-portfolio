/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function SubscriptionManagement() {
  return (
    <div className="subscription-management p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Subscription Management</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Manage your subscription to ensure uninterrupted access to all features. Upgrade, downgrade, or cancel your plan as needed.
      </p>
      <button className="bg-green-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-green-700 transition duration-300 w-full mb-4">
        Manage Subscription
      </button>
    </div>
  );
}