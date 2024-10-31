/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import ShiftScheduler from './Components/shiftScheduler';
import TaskAssignment from './Components/taskAssignment';
import PerformanceTracker from './Components/performanceTracker';

const Header = dynamic(() => import('../../../../components/Header'));

export default function StaffManagementPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Staff Management</h1>
        <div className="mb-12">
          <ShiftScheduler />
        </div>
        <div className="mb-12">
          <TaskAssignment />
        </div>
        <div className="mb-12">
          <PerformanceTracker />
        </div>
      </div>
    </div>
  );
}