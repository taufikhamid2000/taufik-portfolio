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
          <p><strong>What is Veyoyee?</strong> Veyoyee is a platform that connects survey creators with participants, offering valuable insights in exchange for rewards.</p>
          <p><strong>How do I sign up?</strong> You can sign up through the main login system, which is integrated with Veyoyee, by clicking 'Sign Up' on the landing page.</p>
          <p><strong>Is Veyoyee free to use?</strong> Yes, signing up and participating in surveys is completely free for users.</p>
          <p><strong>What types of surveys are available?</strong> Veyoyee offers a variety of surveys, from consumer feedback to product testing and academic research.</p>
          <p><strong>How do I earn rewards?</strong> You earn rewards by completing surveys, which can be redeemed in the Reward Center for gift cards, cash, or other options.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Survey Participation</h3>
          <p><strong>How do I find surveys to take?</strong> Available surveys are displayed in your Dashboard, and you can filter based on your interests and qualifications.</p>
          <p><strong>Are there any requirements to participate in a survey?</strong> Some surveys may have specific demographic or qualification requirements.</p>
          <p><strong>How long does it take to complete a survey?</strong> Each survey varies in length, with estimated times provided on the survey description.</p>
          <p><strong>What happens if I don't finish a survey?</strong> If you don't finish, you won’t receive rewards, but you can often resume where you left off.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Survey Creation</h3>
          <p><strong>How do I create a survey?</strong> Go to the 'Create Survey' section in your Dashboard to customize questions and set rewards.</p>
          <p><strong>Can I choose the target audience for my survey?</strong> Yes, Veyoyee allows you to define the demographics and qualifications of your target audience.</p>
          <p><strong>Can I edit my survey after publishing it?</strong> Minor edits are allowed after publishing, but significant changes require a new version.</p>
          <p><strong>How do I see my survey results?</strong> Survey results can be accessed from the 'Admin Page' in real time.</p>
          <p><strong>Can I export survey data?</strong> Yes, you can export survey data in formats like CSV or Excel.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">User Account</h3>
          <p><strong>How do I update my profile information?</strong> You can update your profile in the 'Profile' section on your Dashboard.</p>
          <p><strong>How do I reset my password?</strong> Click 'Forgot Password' on the login page, and a password reset link will be sent to your email.</p>
          <p><strong>How do I delete my account?</strong> You can delete your account by selecting 'Delete Account' in the 'Profile' section. This will permanently remove your data.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Rewards & Payments</h3>
          <p><strong>How do I redeem my points?</strong> Visit the 'Reward Center' to redeem your points for rewards like gift cards or cash.</p>
          <p><strong>How long does it take to receive my reward?</strong> Rewards are usually processed within 24-48 hours.</p>
          <p><strong>Can I transfer my points to someone else?</strong> Currently, points cannot be transferred between users.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
          <p><strong>Is my data secure?</strong> Yes, we use SSL encryption and follow industry-standard security practices to protect your data.</p>
          <p><strong>What do you do with my survey responses?</strong> Survey responses are anonymized and provided to survey creators for analysis. Personal data is not shared with third parties.</p>
          <p><strong>Can I opt out of certain surveys?</strong> Yes, you can choose which surveys to participate in and skip those that don't interest you.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
          <p><strong>I’m having trouble logging in. What should I do?</strong> Ensure your email and password are correct, or use 'Forgot Password' to reset it.</p>
          <p><strong>The website isn’t loading properly. How do I fix it?</strong> Clear your browser’s cache and cookies or try accessing the site in a different browser. If the issue persists, contact support.</p>
          <p><strong>I found a bug. How can I report it?</strong> Use the 'Report a Bug' option in your Dashboard or contact support with details.</p>
        </div>
      </div>
    </div>
  );
}