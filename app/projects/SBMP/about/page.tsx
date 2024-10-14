/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';

export default function AboutSBMP() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About SBMP</h1>
        <p className="text-lg leading-7 mb-8">
          SBMP is a platform designed to help small business owners efficiently manage multiple locations.
          Whether it's a chain of food stalls, retail shops, or service outlets, SBMP provides a structured environment with tools for inventory management, sales tracking, staff scheduling, and order processing.
        </p>

        <p className="text-lg leading-7 mb-8">Technology Stack used for this project includes React.js, Golang (for backend development), MySQL, Firebase Auth, Stripe/PayPal, AWS S3 (for storage), Chart.js (for analytics and reporting), Vercel, and Heroku.</p>

        <h2 className="text-2xl font-bold mb-4">Why Should I Use SBMP?</h2>
        <p className="mb-6">
          SBMP offers a user-friendly platform for small business owners in the Food & Beverage industry, as well as other sectors. It provides valuable tools to manage inventory, sales, and staff, allowing you to focus on business growth and customer satisfaction.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">General Questions</h3>
          <p><strong>What is SBMP?</strong> SBMP is a platform that helps small business owners efficiently manage multiple business locations, offering tools for inventory management, sales tracking, and staff scheduling.</p>
          <p><strong>How do I sign up?</strong> You can sign up through the main login system, which is integrated with the shared user database used by SBMP, by clicking 'Sign Up' on the landing page.</p>
          <p><strong>Is SBMP free to use?</strong> SBMP offers different subscription plans, including a basic plan that is free for small businesses.</p>
          <p><strong>What types of businesses are supported?</strong> SBMP supports various small businesses, including food stalls, retail shops, and service outlets like salons, repair services, and more.</p>
          <p><strong>How do I promote my business?</strong> You can promote your business through your profile, featured listings, and by using the platform's integrated marketing tools.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Business Management</h3>
          <p><strong>How do I start a business on the platform?</strong> Go to the 'Start a Business' section in your Dashboard to create your business profile and list your services or products.</p>
          <p><strong>Are there any requirements to start a business?</strong> You must be a registered user to start a business on the platform, and you'll need to provide basic business information.</p>
          <p><strong>How can I manage my business?</strong> You can manage your business through your Dashboard, where you can update your inventory, services, sales data, and interact with customers.</p>
          <p><strong>How do I receive payments?</strong> Payments are processed through secure gateways like Stripe or PayPal, and you can track transactions in your Dashboard.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">User Account</h3>
          <p><strong>How do I update my profile information?</strong> You can update your profile in the 'Profile' section on your Dashboard.</p>
          <p><strong>How do I reset my password?</strong> Click 'Forgot Password' on the login page, and a password reset link will be sent to your email.</p>
          <p><strong>How do I delete my account?</strong> You can delete your account by selecting 'Delete Account' in the 'Profile' section. This will permanently remove your data.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Payments & Transactions</h3>
          <p><strong>How do I receive payments for my products or services?</strong> Payments are processed through secure gateways like Stripe or PayPal, and you can track all transactions in your Dashboard.</p>
          <p><strong>How long does it take to receive payments?</strong> Payments are usually processed within 24-48 hours after the transaction is completed.</p>
          <p><strong>Can I offer discounts or promotions?</strong> Yes, you can create discount codes and promotional offers through the 'Promotions' section in your Dashboard.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
          <p><strong>Is my data secure?</strong> Yes, we use SSL encryption and follow industry-standard security practices to protect your data.</p>
          <p><strong>What do you do with my business information?</strong> Business information is used to promote your services on the platform and is not shared with third parties without your consent.</p>
          <p><strong>Can I control who sees my business profile?</strong> Yes, you can adjust visibility settings in your Dashboard to control who can view your business profile.</p>
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