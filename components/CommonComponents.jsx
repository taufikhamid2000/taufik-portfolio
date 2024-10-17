// CommonComponents.jsx

import React from 'react';
import '../styles/commonStyles.css';

export const Button = ({ text, color, className, onClick, type = 'button' }) => {
  const buttonClasses = `bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded-lg ${className}`;
  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export const Input = ({ type, id, value, onChange, required, placeholder, disabled = false }) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
  );
};


export const TextArea = ({ id, value, onChange, required, placeholder }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    />
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