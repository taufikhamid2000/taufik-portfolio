// app/projects/JobMatch/Dashboard/page.tsx

/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import NavigationHub from './components/navigationHub';
import EmployerOverview from './components/employerOverview';
import JobStats from './components/jobStats';

const Header = dynamic(() => import('../../../../components/Header'));

export default function DashboardPage() {
  // Define any data within the component
  const employerData = { jobCount: 0, activeJobs: 0, totalApplicants: 0 };
  const jobStatsData = { totalViews: 0, totalApplications: 0, averageApplicantsPerJob: 0 };

  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">
          Dashboard
        </h1>

        {/* Navigation Hub Section */}
        <div className="mb-12">
          <NavigationHub />
        </div>

        {/* Employer Overview Section */}
        <div className="mb-12">
          <EmployerOverview
            jobCount={employerData.jobCount}
            activeJobs={employerData.activeJobs}
            totalApplicants={employerData.totalApplicants}
          />
        </div>

        {/* Job Statistics Section */}
        <div className="mb-12">
          <JobStats
            totalViews={jobStatsData.totalViews}
            totalApplications={jobStatsData.totalApplications}
            averageApplicantsPerJob={jobStatsData.averageApplicantsPerJob}
          />
        </div>
      </div>
    </div>
  );
}
