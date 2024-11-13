// Example: ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-300 h-2 mt-2 rounded-full">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
});

export default ProgressBar;
