/* eslint-disable react/no-unescaped-entities */
"use client";

import Header from '../../../../components/Header';

export default function AboutJobMatch() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About JobMatch</h1>
        <p className="text-lg leading-7 mb-8">
          JobMatch is a platform designed to provide a standardized and consistent experience for job postings. Employers can create detailed job listings using a predefined template, ensuring clarity across all postings. Additionally, JobMatch incorporates advanced Natural Language Processing (NLP) and Machine Learning (ML) to allow advertisers to input job information into a single text box, which the system then categorizes automatically.
        </p>

        <p className="text-lg leading-7 mb-8">
          The technology stack for this project includes React.js, Node.js or Python (Flask/Django), MySQL, MongoDB, Firebase Auth, AWS S3, AWS Lambda, AWS SageMaker, Kafka, RabbitMQ, Docker, Kubernetes, Vercel, and Heroku.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Should You Use JobMatch?</h2>
        <p className="text-lg leading-7 mb-8">
          JobMatch offers a streamlined platform for employers and job seekers. Employers benefit from consistent and detailed job postings, while job seekers enjoy a user-friendly interface to search, save, and apply for jobs, with features like application tracking and job alerts.
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
  { q: 'What is JobMatch?', a: 'JobMatch is a platform that allows employers to create standardized job postings and job seekers to search and apply for jobs easily.' },
  { q: 'How do I sign up?', a: "You can sign up through the main login system by clicking 'Sign Up' on the landing page." },
  { q: 'Is JobMatch free to use?', a: 'JobMatch offers both free and premium subscription plans for additional features.' },
  { q: 'How does JobMatch categorize job listings?', a: 'JobMatch uses advanced NLP and ML technologies to automatically categorize job information provided by employers.' },
  { q: 'How do job seekers benefit from JobMatch?', a: 'Job seekers can use JobMatch to easily search for jobs, save postings, track applications, and set up job alerts.' }
];

const subscriptionQuestions = [
  { q: 'How do I subscribe to a premium plan?', a: "Go to the 'Subscription' section in your Dashboard to view and subscribe to available premium plans." },
  { q: 'Are there any requirements to subscribe?', a: 'You must be a registered user to subscribe, and you need to provide payment information.' },
  { q: 'How can I manage my subscription?', a: 'You can manage your subscription through your Dashboard, where you can update your preferences, payment details, and view your subscription status.' },
  { q: 'What additional features do premium plans offer?', a: 'Premium plans offer advanced features like enhanced job posting visibility, analytics, and premium support.' }
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