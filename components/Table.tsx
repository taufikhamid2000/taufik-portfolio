import React from 'react';

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T | 'actions'; label: string; render?: (item: T) => React.ReactNode }[];
  onRowClick?: (item: T) => void;
}

const Table = <T extends object>({ data, columns, onRowClick }: TableProps<T>) => {
  return (
    <table className="w-auto mx-auto bg-white shadow-md rounded-lg text-black">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key as string} className="py-2 px-4 border-b">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={`hover:bg-gray-200 ${onRowClick ? 'cursor-pointer' : ''}`}
            onClick={() => onRowClick && onRowClick(item)}
          >
            {columns.map((col) => (
              <td key={col.key as string} className="py-2 px-4 border-b">
                {col.render ? col.render(item) : String(item[col.key as keyof T])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;