/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';

export default function FAQSection() {
  return (
    <div className="faq-section p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Frequently Asked Questions</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
        <li className="mb-4"><strong>What is SBMP?</strong> SBMP is a platform designed to help small business owners manage multiple locations efficiently.</li>
        <li className="mb-4"><strong>Is SBMP free to use?</strong> Yes, there are free features, but some advanced functionalities may require a subscription.</li>
        <li className="mb-4"><strong>How do I contact support?</strong> You can contact support through the Technical Support section below.</li>
      </ul>
    </div>
  );
}
