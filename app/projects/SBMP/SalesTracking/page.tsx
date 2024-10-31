/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import SalesMonitor from './Components/salesMonitor';
import SalesAnalytics from './Components/salesAnalytics';
import SalesReports from './Components/salesReports';

const Header = dynamic(() => import('../../../../components/Header'));

export default function SalesTrackingPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Sales Tracking</h1>
        <div className="mb-12">
          <SalesMonitor />
        </div>
        <div className="mb-12">
          <SalesAnalytics />
        </div>
        <div className="mb-12">
          <SalesReports />
        </div>
      </div>
    </div>
  );
}
