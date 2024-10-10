// CommonComponents.jsx

import React from 'react';
import '../styles/commonStyles.css'; // Make sure this path is correct in your project structure

export const Button = ({ text, color, className }) => {
  const buttonClasses = `bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded-lg ${className}`;
  return (
    <button className={buttonClasses}>
      {text}
    </button>
  );
};

export const Table = ({ headers, rows }) => {
  return (
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.cols.map((col, colIndex) => (
              <td key={colIndex} className="px-4 py-2 border">
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
