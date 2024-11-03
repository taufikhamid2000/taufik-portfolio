/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import NavigationHub, { NavigationSection } from './components/navigationHub';
import EmployerOverview from './components/employerOverview';
import JobStats from './components/jobStats';

const Header = dynamic(() => import('../../../../components/Header'));

interface EmployerData {
  jobCount: number;
  activeJobs: number;
  totalApplicants: number;
}

interface JobStatsData {
  totalViews: number;
  totalApplications: number;
  averageApplicantsPerJob: number;
}

interface DashboardPageProps {
  employerData?: EmployerData;
  jobStatsData?: JobStatsData;
}

export default function DashboardPage({
  employerData = { jobCount: 0, activeJobs: 0, totalApplicants: 0 },
  jobStatsData = { totalViews: 0, totalApplications: 0, averageApplicantsPerJob: 0 },
}: DashboardPageProps) {
  const router = useRouter();

  const onNavigate = (section: NavigationSection) => {
    switch (section) {
      case NavigationSection.Dashboard:
        router.push('/projects/JobMatch/Dashboard');
        break;
      case NavigationSection.JobPostingManagement:
        router.push('/projects/JobMatch/JobPostingManagement');
        break;
      case NavigationSection.ApplicationTracking:
        router.push('/projects/JobMatch/ApplicationTracking');
        break;
      case NavigationSection.UserManagement:
        router.push('/projects/JobMatch/UserManagement');
        break;
      case NavigationSection.Profile:
        router.push('/projects/JobMatch/Profile');
        break;
      case NavigationSection.FAQSupport:
        router.push('/projects/JobMatch/FAQSupport');
        break;
      default:
        console.log(`Unknown navigation section: ${section}`);
    }
  };

  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Dashboard</h1>

        {/* Navigation Hub Section */}
        <div className="mb-12">
          <NavigationHub onNavigate={onNavigate} />
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