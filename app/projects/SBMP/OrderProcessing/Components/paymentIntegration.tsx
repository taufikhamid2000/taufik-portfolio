/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function PaymentIntegration() {
  return (
    <div className="payment-integration p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Payment Integration</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Manage payment integrations for seamless transactions. Connect with popular payment gateways to handle customer payments securely.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 w-full mb-4">
        Connect Payment Gateway
      </button>
      <button className="bg-green-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-green-700 transition duration-300 w-full">
        View Payment History
      </button>
    </div>
  );
}