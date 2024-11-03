// components/employerOverview.tsx
"Use client";

interface EmployerOverviewProps {
  jobCount: number;
  activeJobs: number;
  totalApplicants: number;
}

export default function EmployerOverview({
  jobCount,
  activeJobs,
  totalApplicants,
}: EmployerOverviewProps) {
  return (
    <div className="employer-overview bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Employer Overview
      </h2>
      <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-item">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Total Jobs Posted
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {jobCount}
          </p>
        </div>
        <div className="stat-item">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Active Jobs
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {activeJobs}
          </p>
        </div>
        <div className="stat-item">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Total Applicants
          </h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {totalApplicants}
          </p>
        </div>
      </div>
    </div>
  );
}