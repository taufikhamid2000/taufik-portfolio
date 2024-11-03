import React from 'react';
import '../../../../../styles/commonStyles.css';

// User Scheduler Component
interface UserSchedulerProps {
  scheduledUsers: number;
  unscheduledUsers: number;
}

export const UserScheduler: React.FC<UserSchedulerProps> = ({ scheduledUsers, unscheduledUsers }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">User Scheduler</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Manage scheduling for users effectively and ensure tasks are assigned appropriately.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Scheduled Users</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{scheduledUsers}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-600 dark:text-yellow-300">Unscheduled Users</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{unscheduledUsers}</p>
        </div>
      </div>
    </section>
  );
};

// Role Assignment Component
interface RoleAssignmentProps {
  rolesAssigned: string[];
}

export const RoleAssignment: React.FC<RoleAssignmentProps> = ({ rolesAssigned }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Role Assignment</h2>
      {rolesAssigned.length > 0 ? (
        <ul className="list-disc pl-6">
          {rolesAssigned.map((role, index) => (
            <li key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600 pb-2">{role}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">No roles assigned at this moment.</p>
      )}
    </section>
  );
};

// User Performance Tracker Component
interface UserPerformanceTrackerProps {
  onTrackPerformance: () => void;
}

export const UserPerformanceTracker: React.FC<UserPerformanceTrackerProps> = ({ onTrackPerformance }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">User Performance Tracker</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Track and assess the performance of users based on their assigned tasks and responsibilities.
      </p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg border border-blue-600 hover:border-blue-800"
        onClick={onTrackPerformance}
      >
        Track Performance
      </button>
    </section>
  );
};
