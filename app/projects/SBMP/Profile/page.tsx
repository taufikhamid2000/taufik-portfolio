/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import UserBusinessInfo from './Components/userBusinessInfo';
import SubscriptionManagement from './Components/subscriptionManagement';
import BusinessInsights from './Components/businessInsights';

const Header = dynamic(() => import('../../../../components/Header'));

export default function ProfilePage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Profile</h1>
        <div className="mb-12">
          <UserBusinessInfo />
        </div>
        <div className="mb-12">
          <SubscriptionManagement />
        </div>
        <div className="mb-12">
          <BusinessInsights />
        </div>
      </div>
    </div>
  );
}