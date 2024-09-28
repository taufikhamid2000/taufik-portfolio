"use client";

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';

interface ProjectProps {
  title: string;
  description: string;
  signupLink?: string;
}

const TemplateProjectPage = ({ title, description, signupLink }: ProjectProps) => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header showSignupLink={!signupLink} />
      <div className="flex flex-col items-center justify-center p-8">
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={100}
          height={100}
        />
        <h1 className="text-4xl font-bold mt-8">{title}</h1>
        <p className="mt-4 text-center max-w-md">{description}</p>
        {signupLink && (
          <Link href={signupLink}>
            <button className="mt-6 px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TemplateProjectPage;