/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import { JobTracker, JobAlerts, JobCreationTools } from './components/jobTracker';
import { useRouter } from 'next/navigation';

const Header = dynamic(() => import('../../../../components/Header'));

export default function JobPostingManagementPage() {
  const router = useRouter();

  // Handler for job creation
  const handleCreateJob = () => {
    console.log('Creating a new job posting...');
    // Add further logic here to handle job creation, e.g., opening a form modal
  };

  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Job Posting Management</h1>
        <div className="mb-12">
          <JobTracker activePostings={10} expiredPostings={3} totalPostings={13} />
        </div>
        <div className="mb-12">
          <JobAlerts alerts={["Job Posting 101 has expired.", "New applicants for Job Posting 202."]} />
        </div>
        <div className="mb-12">
          <JobCreationTools onCreateJob={handleCreateJob} />
        </div>
      </div>
    </div>
  );
}