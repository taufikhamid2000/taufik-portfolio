/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import FAQSection from './Components/faqSection';
import TechnicalSupport from './Components/technicalSupport';
import BugReporting from './Components/bugReporting';

const Header = dynamic(() => import('../../../../components/Header'));

export default function FAQSupportPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">FAQ & Support</h1>
        <div className="mb-12">
          <FAQSection />
        </div>
        <div className="mb-12">
          <TechnicalSupport />
        </div>
        <div className="mb-12">
          <BugReporting />
        </div>
      </div>
    </div>
  );
}