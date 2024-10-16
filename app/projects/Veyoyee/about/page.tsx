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

        <p className="text-lg leading-7 mb-8">
          The technology stack for this project includes React.js, Node.js with Express, Vercel, Stripe (optional) for the backend, Supabase (PostgreSQL) for the database, and Tailwind CSS for styling.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Should You Use Veyoyee?</h2>
        <p className="text-lg leading-7 mb-8">
          Veyoyee offers a user-friendly platform for businesses, researchers, and participants alike. 
          Creators gain access to meaningful data, while participants enjoy various rewards for their contributions. 
          It’s a great way to connect and benefit mutually from survey data.
        </p>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <FAQSection title="General Questions" questions={generalQuestions} />
        <FAQSection title="Survey Participation" questions={surveyParticipationQuestions} />
        <FAQSection title="Survey Creation" questions={surveyCreationQuestions} />
        <FAQSection title="User Account" questions={userAccountQuestions} />
        <FAQSection title="Rewards & Payments" questions={rewardsPaymentsQuestions} />
        <FAQSection title="Security & Privacy" questions={securityPrivacyQuestions} />
        <FAQSection title="Technical Support" questions={technicalSupportQuestions} />
      </div>
    </div>
  );
}

const FAQSection = ({ title, questions }: { title: string; questions: { q: string; a: string }[] }) => (
  <div className="faq-section mb-12">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {questions.map((question, index) => (
      <p key={index} className="text-lg leading-6 mb-4">
        <strong>{question.q}</strong> {question.a}
      </p>
    ))}
  </div>
);

const generalQuestions = [
  { q: 'What is Veyoyee?', a: 'Veyoyee is a platform that connects survey creators with participants, offering valuable insights in exchange for rewards.' },
  { q: 'How do I sign up?', a: "You can sign up through the main login system by clicking 'Sign Up' on the landing page." },
  { q: 'Is Veyoyee free to use?', a: 'Yes, signing up and participating in surveys is completely free for users.' },
  { q: 'What types of surveys are available?', a: 'Veyoyee offers a variety of surveys, including consumer feedback, product testing, and academic research.' },
  { q: 'How do I earn rewards?', a: 'You earn rewards by completing surveys, which can be redeemed in the Reward Center for gift cards, cash, or other options.' }
];

const surveyParticipationQuestions = [
  { q: 'How do I find surveys to take?', a: 'Available surveys are displayed in your Dashboard, and you can filter based on your interests and qualifications.' },
  { q: 'Are there any requirements to participate in a survey?', a: 'Some surveys may have specific demographic or qualification requirements.' },
  { q: 'How long does it take to complete a survey?', a: 'Each survey varies in length, with estimated times provided on the survey description.' },
  { q: 'What happens if I don\'t finish a survey?', a: 'If you don’t finish, you won’t receive rewards, but you can often resume where you left off.' }
];

const surveyCreationQuestions = [
  { q: 'How do I create a survey?', a: "Go to the 'Create Survey' section in your Dashboard to customize questions and set rewards." },
  { q: 'Can I choose the target audience for my survey?', a: 'Yes, Veyoyee allows you to define the demographics and qualifications of your target audience.' },
  { q: 'Can I edit my survey after publishing it?', a: 'Minor edits are allowed after publishing, but significant changes require a new version.' },
  { q: 'How do I see my survey results?', a: "Survey results can be accessed from the 'Admin Page' in real time." },
  { q: 'Can I export survey data?', a: 'Yes, you can export survey data in formats like CSV or Excel.' }
];

const userAccountQuestions = [
  { q: 'How do I update my profile information?', a: "You can update your profile in the 'Profile' section on your Dashboard." },
  { q: 'How do I reset my password?', a: "Click 'Forgot Password' on the login page, and a password reset link will be sent to your email." },
  { q: 'How do I delete my account?', a: "You can delete your account by selecting 'Delete Account' in the 'Profile' section. This will permanently remove your data." }
];

const rewardsPaymentsQuestions = [
  { q: 'How do I redeem my points?', a: "Visit the 'Reward Center' to redeem your points for rewards like gift cards or cash." },
  { q: 'How long does it take to receive my reward?', a: 'Rewards are usually processed within 24-48 hours.' },
  { q: 'Can I transfer my points to someone else?', a: 'Currently, points cannot be transferred between users.' }
];

const securityPrivacyQuestions = [
  { q: 'Is my data secure?', a: 'Yes, we use SSL encryption and follow industry-standard security practices to protect your data.' },
  { q: 'What do you do with my survey responses?', a: 'Survey responses are anonymized and provided to survey creators for analysis. Personal data is not shared with third parties.' },
  { q: 'Can I opt out of certain surveys?', a: 'Yes, you can choose which surveys to participate in and skip those that don\'t interest you.' }
];

const technicalSupportQuestions = [
  { q: 'I’m having trouble logging in. What should I do?', a: "Ensure your email and password are correct, or use 'Forgot Password' to reset it." },
  { q: 'The website isn’t loading properly. How do I fix it?', a: "Clear your browser’s cache and cookies or try accessing the site in a different browser. If the issue persists, contact support." },
  { q: 'I found a bug. How can I report it?', a: "Use the 'Report a Bug' option in your Dashboard or contact support with details." }
];