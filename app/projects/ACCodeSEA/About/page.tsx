/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';

export default function AboutACCodeSEA() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About AC Code SEA</h1>
        <p className="text-lg leading-7 mb-8">
          AC Code SEA is a project aimed at expanding the Assassin's Creed universe into Southeast Asia (SEA).
          This initiative involves building an immersive experience tailored to SEA culture and history, bringing new storylines and unique gameplay experiences to fans in the region.
        </p>

        <p className="text-lg leading-7 mb-8">Technology Stack used for this project includes React.js, Next.js, Supabase (PostgreSQL), Vercel, CSS, HTML, and JavaScript.</p>

        <h2 className="text-2xl font-bold mb-4">Why Should I Support AC Code SEA?</h2>
        <p className="mb-6">
          AC Code SEA provides an opportunity to explore Southeast Asian history and folklore through the Assassin's Creed lens.
          This project is built to celebrate the rich cultural diversity of SEA, offering players a unique perspective that is often underrepresented in mainstream games.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">General Questions</h3>
          <p><strong>What is AC Code SEA?</strong> AC Code SEA is a fan-driven project to create a unique storyline within the Assassin's Creed universe set in Southeast Asia, highlighting the region's culture, history, and iconic figures.</p>
          <p><strong>How do I get involved?</strong> You can join the project team by visiting the 'Join the Team' page and submitting your application. We are looking for passionate developers, artists, and historians to contribute.</p>
          <p><strong>Is AC Code SEA affiliated with Ubisoft?</strong> No, AC Code SEA is an independent fan project inspired by the Assassin's Creed franchise. It is not officially endorsed or affiliated with Ubisoft.</p>
          <p><strong>Can I play AC Code SEA?</strong> As the project is still in development, gameplay is not yet available. Stay tuned for updates on our progress and future release plans.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Project Development</h3>
          <p><strong>What technology stack is being used?</strong> The project uses React.js, Next.js, Supabase (PostgreSQL), Vercel, CSS, HTML, and JavaScript for development.</p>
          <p><strong>How can I contribute?</strong> We welcome contributions from developers, designers, writers, and enthusiasts. Visit the 'Join the Team' page to see how you can help.</p>
          <p><strong>How is the project funded?</strong> AC Code SEA is currently a volunteer-driven project. We may explore crowdfunding options in the future to cover development costs.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">User Account</h3>
          <p><strong>How do I join the community?</strong> You can join our community by signing up through the main login system integrated with our shared user database.</p>
          <p><strong>How do I update my profile information?</strong> Once registered, you can update your profile information through the 'Profile' section on your Dashboard.</p>
          <p><strong>How do I delete my account?</strong> If you wish to delete your account, please contact support, and we will assist you in the process.</p>
        </div>

        <div className="faq-section mb-12">
          <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
          <p><strong>I’m having trouble accessing the website. What should I do?</strong> Ensure your internet connection is stable, clear your browser cache, and try again. If the issue persists, contact our technical support team.</p>
          <p><strong>I found a bug. How can I report it?</strong> You can report bugs by using the 'Report a Bug' feature in your Dashboard or by contacting support directly with the details.</p>
        </div>
      </div>
    </div>
  );
}