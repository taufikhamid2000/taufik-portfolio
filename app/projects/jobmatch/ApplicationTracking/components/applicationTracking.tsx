import React from 'react';
import '../../../../../styles/commonStyles.css';

// Application Monitor Component
interface ApplicationMonitorProps {
  activeApplications: number;
  pendingApplications: number;
  totalApplications: number;
}

export const ApplicationMonitor: React.FC<ApplicationMonitorProps> = ({ activeApplications, pendingApplications, totalApplications }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Application Monitor</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Monitoring the status of job applications in real-time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-300">Active Applications</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{activeApplications}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-yellow-600 dark:text-yellow-300">Pending Applications</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{pendingApplications}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-300">Total Applications</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalApplications}</p>
        </div>
      </div>
    </section>
  );
};

// Application Analytics Component
interface ApplicationAnalyticsProps {
  analyticsData: string[];
}

export const ApplicationAnalytics: React.FC<ApplicationAnalyticsProps> = ({ analyticsData }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Application Analytics</h2>
      {analyticsData.length > 0 ? (
        <ul className="list-disc pl-6">
          {analyticsData.map((data, index) => (
            <li key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600 pb-2">{data}</li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">No analytics data available at this moment.</p>
      )}
    </section>
  );
};

// Application Reports Component
interface ApplicationReportsProps {
  onGenerateReport: () => void;
}

export const ApplicationReports: React.FC<ApplicationReportsProps> = ({ onGenerateReport }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Application Reports</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Generate detailed reports of application statuses and metrics.
      </p>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg border border-blue-600 hover:border-blue-800"
        onClick={onGenerateReport}
      >
        Generate Report
      </button>
    </section>
  );
};
