// components/jobStats.tsx
"Use client";

interface JobStatsProps {
  totalViews: number;
  totalApplications: number;
  averageApplicantsPerJob: number;
}

export default function JobStats({
  totalViews,
  totalApplications,
  averageApplicantsPerJob,
}: JobStatsProps) {
  return (
    <div className="job-stats bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Job Statistics
      </h2>
      <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-item">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Total Views
          </h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {totalViews}
          </p>
        </div>
        <div className="stat-item">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Total Applications
          </h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {totalApplications}
          </p>
        </div>
        <div className="stat-item">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Average Applicants per Job
          </h3>
          <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
            {averageApplicantsPerJob}
          </p>
        </div>
      </div>
    </div>
  );
}
