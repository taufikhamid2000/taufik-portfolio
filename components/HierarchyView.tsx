// components/HierarchyView.tsx

import React from 'react';
import Table from './Table';

interface HierarchyViewProps {
  title: string;
  data: any[];
  columns: { key: string; label: string }[];
  onRowClick: (item: any) => void;
  onBack?: () => void;
}

const HierarchyView: React.FC<HierarchyViewProps> = ({
  title,
  data,
  columns,
  onRowClick,
  onBack,
}) => {
  return (
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        <Table data={data} columns={columns} onRowClick={onRowClick} />
        <div className="mt-4 flex justify-center space-x-4">
          {onBack && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onBack}
            >
              Back
            </button>
          )}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
            onClick={() => console.log('Modify clicked')}
          >
            Modify
          </button>
        </div>
      </div>
  );
};

export default HierarchyView;