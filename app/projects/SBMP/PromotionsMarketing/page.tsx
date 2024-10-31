/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import CreatePromotion from './Components/createPromotion';
import FeatureBusiness from './Components/featureBusiness';
import CampaignAnalytics from './Components/campaignAnalytics';

const Header = dynamic(() => import('../../../../components/Header'));

export default function PromotionsMarketingPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Promotions & Marketing</h1>
        <div className="mb-12">
          <CreatePromotion />
        </div>
        <div className="mb-12">
          <FeatureBusiness />
        </div>
        <div className="mb-12">
          <CampaignAnalytics />
        </div>
      </div>
    </div>
  );
}
