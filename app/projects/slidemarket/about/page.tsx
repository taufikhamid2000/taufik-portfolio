/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';

export default function AboutSlideMarket() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About SlideMarket</h1>
        <p className="text-lg leading-7 mb-8">
          SlideMarket is an online platform designed to support and promote educational content creation. 
          It provides a structured environment for content creators to sell their educational slides and for educators to request customizations that fit their specific classroom needs, offering tools and resources to manage and promote their services effectively.
        </p>

        <p className="text-lg leading-7 mb-8">Technology Stack used for this project includes React.js, Node.js or Python, MySQL, Firebase Auth, AWS S3, Stripe, Docker, Vercel, and Heroku.</p>

        <h2 className="text-2xl font-bold mb-4">Why Should I Use SlideMarket?</h2>
        <p className="mb-6">
          SlideMarket offers a user-friendly platform for content creators and educators. 
          Content creators gain exposure and a revenue stream, while educators enjoy access to high-quality, customizable teaching materials tailored to their specific classroom needs.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">General Questions</h3>
          <p><strong>What is SlideMarket?</strong> SlideMarket is a platform that connects educational content creators with educators, offering a structured environment for the sale and customization of educational slides.</p>
          <p><strong>How do I sign up?</strong> You can sign up through the main login system, which is integrated with the shared user database used by SlideMarket, by clicking 'Sign Up' on the landing page.</p>
          <p><strong>Is SlideMarket free to use?</strong> Yes, signing up and browsing the platform is free. However, purchasing slides or customization services may involve costs.</p>
          <p><strong>What types of content are supported?</strong> SlideMarket supports a variety of educational content, including slides for different subjects, interactive presentations, and other teaching resources.</p>
          <p><strong>How do I promote my content?</strong> You can promote your content through your profile, featured listings, and by using the platform's integrated marketing tools.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Content Creation</h3>
          <p><strong>How do I start creating content on the platform?</strong> Go to the 'Create Content' section in your Dashboard to create your content profile and list your slides or other resources.</p>
          <p><strong>Are there any requirements to start creating content?</strong> You must be a registered user and provide valid information to start creating content on the platform.</p>
          <p><strong>How can I manage my content?</strong> You can manage your content through your Dashboard, where you can update your profile, resources, and interact with customers.</p>
          <p><strong>How do I receive payments?</strong> Payments are processed through secure gateways like Stripe, and you can track transactions in your Dashboard.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">User Account</h3>
          <p><strong>How do I update my profile information?</strong> You can update your profile in the 'Profile' section on your Dashboard.</p>
          <p><strong>How do I reset my password?</strong> Click 'Forgot Password' on the login page, and a password reset link will be sent to your email.</p>
          <p><strong>How do I delete my account?</strong> You can delete your account by selecting 'Delete Account' in the 'Profile' section. This will permanently remove your data.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Payments & Transactions</h3>
          <p><strong>How do I receive payments for my content?</strong> Payments are processed through secure gateways like Stripe, and you can track all transactions in your Dashboard.</p>
          <p><strong>How long does it take to receive payments?</strong> Payments are usually processed within 24-48 hours after the transaction is completed.</p>
          <p><strong>Can I offer discounts or promotions?</strong> Yes, you can create discount codes and promotional offers through the 'Promotions' section in your Dashboard.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
          <p><strong>Is my data secure?</strong> Yes, we use SSL encryption and follow industry-standard security practices to protect your data.</p>
          <p><strong>What do you do with my content information?</strong> Content information is used to promote your resources on the platform and is not shared with third parties without your consent.</p>
          <p><strong>Can I control who sees my content profile?</strong> Yes, you can adjust visibility settings in your Dashboard to control who can view your content profile.</p>
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