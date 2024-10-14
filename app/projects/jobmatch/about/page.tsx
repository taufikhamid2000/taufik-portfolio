/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';

export default function AboutSelectYourLeague() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About SelectYourLeague</h1>
        <p className="text-lg leading-7 mb-8">
          SelectYourLeague is a platform designed for football fans who want to pay only for the leagues and tournaments they actually watch. Whether it's the English Premier League, La Liga, or the UEFA Champions League, SelectYourLeague provides a structured environment with tools for live streaming, on-demand match replays, matchday passes, and season-long subscriptions.
        </p>

        <p className="text-lg leading-7 mb-8">
          The technology stack for this project includes React.js, Golang (backend development), MySQL, Firebase Auth, Stripe/PayPal, AWS S3 (storage), Chart.js (analytics and reporting), Vercel, and Heroku.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Should You Use SelectYourLeague?</h2>
        <p className="text-lg leading-7 mb-8">
          SelectYourLeague offers a user-friendly platform for football fans, allowing them to personalize their subscription package based on the leagues and tournaments they love. It provides valuable tools to access live matches, on-demand content, and additional features that make the football viewing experience convenient and enjoyable.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <FAQSection title="General Questions" questions={generalQuestions} />
        <FAQSection title="Subscription & Payments" questions={subscriptionQuestions} />
        <FAQSection title="User Account" questions={userAccountQuestions} />
        <FAQSection title="Technical Support" questions={technicalSupportQuestions} />
      </div>
    </div>
  );
}

const FAQSection = ({ title, questions }: { title: string; questions: { q: string; a: string; }[] }) => (
  <div className="faq-section mb-12">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {questions.map((question: { q: string; a: string; }, index: number) => (
      <p key={index} className="text-lg leading-6 mb-4">
        <strong>{question.q}</strong> {question.a}
      </p>
    ))}
  </div>
);

const generalQuestions = [
  { q: 'What is SelectYourLeague?', a: 'SelectYourLeague is a platform that allows football fans to subscribe only to the leagues and tournaments they are interested in, offering tools for live streaming, match replays, and personalized subscriptions.' },
  { q: 'How do I sign up?', a: "You can sign up through the main login system by clicking 'Sign Up' on the landing page." },
  { q: 'Is SelectYourLeague free to use?', a: 'SelectYourLeague offers different subscription plans, including pay-per-league and matchday passes.' },
  { q: 'What types of leagues are supported?', a: 'SelectYourLeague supports various popular leagues and tournaments, including the English Premier League, La Liga, UEFA Champions League, and more.' },
  { q: 'How do I personalize my subscription?', a: "You can personalize your subscription by selecting the leagues and tournaments you want to follow in the 'Subscription' section." }
];

const subscriptionQuestions = [
  { q: 'How do I subscribe to a league or tournament?', a: "Go to the 'Subscription' section in your Dashboard to select and subscribe to your favorite leagues or tournaments." },
  { q: 'Are there any requirements to subscribe?', a: 'You must be a registered user to subscribe, and you need to provide payment information.' },
  { q: 'How can I manage my subscription?', a: 'You can manage your subscription through your Dashboard, where you can update your preferences, payment details, and view your subscription status.' },
  { q: 'How do I receive match updates?', a: 'You can receive match updates via notifications in your Dashboard or opt-in for email alerts.' }
];

const userAccountQuestions = [
  { q: 'How do I update my profile information?', a: "You can update your profile in the 'Profile' section on your Dashboard." },
  { q: 'How do I reset my password?', a: "Click 'Forgot Password' on the login page, and a password reset link will be sent to your email." },
  { q: 'How do I delete my account?', a: "You can delete your account by selecting 'Delete Account' in the 'Profile' section. This will permanently remove your data." }
];

const technicalSupportQuestions = [
  { q: 'I’m having trouble logging in. What should I do?', a: "Ensure your email and password are correct, or use 'Forgot Password' to reset it." },
  { q: 'The website isn’t loading properly. How do I fix it?', a: "Clear your browser’s cache and cookies or try accessing the site in a different browser. If the issue persists, contact support." },
  { q: 'I found a bug. How can I report it?', a: "Use the 'Report a Bug' option in your Dashboard or contact support with details." }
];