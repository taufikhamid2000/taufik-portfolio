/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import { UserScheduler, RoleAssignment, UserPerformanceTracker } from './components/userManagement';
import { useRouter } from 'next/navigation';

const Header = dynamic(() => import('../../../../components/Header'));

const UserManagementPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">User Management Overview</h1>
        <div className="mb-12">
          <UserScheduler scheduledUsers={15} unscheduledUsers={5} />
        </div>
        <div className="mb-12">
          <RoleAssignment rolesAssigned={["Admin", "Editor", "Viewer"]} />
        </div>
        <div className="mb-12">
          <UserPerformanceTracker onTrackPerformance={() => console.log('Tracking performance...')} />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
