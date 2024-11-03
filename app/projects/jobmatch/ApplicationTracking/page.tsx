/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import { ApplicationMonitor, ApplicationAnalytics, ApplicationReports } from './components/applicationTracking';
import { useRouter } from 'next/navigation';

const Header = dynamic(() => import('../../../../components/Header'));

const ApplicationTrackingPage: React.FC = () => {
  const router = useRouter();

  // Handler for generating report
  const handleGenerateReport = () => {
    console.log('Generating report...');
    // Add further logic here to handle report generation, e.g., exporting data
  };

  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Application Tracking Management</h1>
        <div className="mb-12">
          <ApplicationMonitor activeApplications={5} pendingApplications={3} totalApplications={10} />
        </div>
        <div className="mb-12">
          <ApplicationAnalytics analyticsData={["Application 1: Pending", "Application 2: Approved", "Application 3: Rejected"]} />
        </div>
        <div className="mb-12">
          <ApplicationReports onGenerateReport={handleGenerateReport} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationTrackingPage;
