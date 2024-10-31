/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import NavigationHub from './Components/navigationHub';
import BusinessOverview from './Components/businessOverview';
import QuickStats from './Components/quickStats';

const Header = dynamic(() => import('../../../../components/Header'));

export default function DashboardPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Dashboard</h1>
        <div className="mb-12">
          <NavigationHub />
        </div>
        <div className="mb-12">
          <BusinessOverview />
        </div>
        <div className="mb-12">
          <QuickStats />
        </div>
      </div>
    </div>
  );
}
