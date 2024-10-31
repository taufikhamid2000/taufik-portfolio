/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';
import { Bar } from 'react-chartjs-2';

export default function CampaignAnalytics() {
  const campaignData = {
    labels: ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D'],
    datasets: [
      {
        label: 'Customer Reach',
        data: [500, 750, 300, 900],
        backgroundColor: '#4B9CD3',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="campaign-analytics p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Campaign Analytics</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Analyze the performance of your marketing campaigns to understand customer reach and effectiveness. Use these insights to refine your strategy.
      </p>
      <div className="chart-container">
        <Bar data={campaignData} options={options} />
      </div>
    </div>
  );
}
