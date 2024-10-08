/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';

export default function AboutVeyoyee() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Veyoyee</h1>
        <p className="text-lg leading-7 mb-8">
          Veyoyee is a dynamic platform designed to bridge the gap between survey creators and participants. 
          Creators can gather valuable insights, while participants are rewarded for their time and feedback.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Should I Use Veyoyee?</h2>
        <p className="mb-6">
          Veyoyee offers a user-friendly platform for businesses, researchers, and participants alike. 
          Creators gain access to meaningful data, while participants enjoy various rewards for their contributions.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">General Questions</h3>
          <p><strong>What is Veyoyee?</strong> Veyoyee is a survey platform that connects creators with participants, offering valuable insights in exchange for rewards.</p>
          <p><strong>Is Veyoyee free to use?</strong> Yes, participants can join and complete surveys for free, while creators can select from various pricing options.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Survey Participation</h3>
          <p><strong>How do I find surveys?</strong> Surveys are available in your Dashboard, where you can filter and choose based on your preferences.</p>
          <p><strong>How do I earn rewards?</strong> Complete surveys to earn rewards, which can be redeemed for gift cards or cash.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Survey Creation</h3>
          <p><strong>How do I create a survey?</strong> Go to the 'Create Survey' section from your dashboard to customize questions, target audience, and set rewards.</p>
          <p><strong>Can I export survey data?</strong> Yes, you can export survey data in formats like CSV or Excel.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">User Account</h3>
          <p><strong>How do I update my profile?</strong> Profile details can be updated in the 'Profile' section on your dashboard.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Rewards & Payments</h3>
          <p><strong>How do I redeem my points?</strong> Visit the Reward Center in your Dashboard to redeem points for various rewards such as gift cards and cash.</p>
        </div>
      </div>
    </div>
  );
}
