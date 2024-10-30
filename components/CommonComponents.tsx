/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
// CommonComponents.tsx

import React from 'react';
import '../styles/commonStyles.css';
import Select, { Props as SelectProps, StylesConfig } from 'react-select';

// Button Component
interface ButtonProps {
  text: string;
  color: 'blue' | 'green' | 'red' | 'yellow'; // Define allowed colors
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  text,
  color,
  className = '',
  onClick,
  type = 'button',
}) => {
  // Define color classes
  const colorClasses: { [key in ButtonProps['color']]: string } = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  };

  const buttonClasses = `${colorClasses[color]} text-white px-4 py-2 rounded-lg ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

// Input Component
interface InputProps {
  type: React.HTMLInputTypeAttribute;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type,
  id,
  value,
  onChange,
  required = false,
  placeholder = '',
  disabled = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
    />
  );
};

// TextArea Component
interface TextAreaProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  onChange,
  required = false,
  placeholder = '',
}) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
    ></textarea>
  );
};

// Table Component
interface TableHeader {
  label: string;
}

interface TableRow {
  cols: React.ReactNode[];
}

interface TableProps {
  headers: TableHeader[];
  rows: TableRow[];
}

export const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr>
          {headers.map((header: TableHeader, index: number) => (
            <th key={index} className="px-4 py-2 border">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: TableRow, rowIndex: number) => (
          <tr key={rowIndex}>
            {row.cols.map((col: React.ReactNode, colIndex: number) => (
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

// Dropdown Component
// import { ActionMeta, SingleValue } from 'react-select';

interface DropdownProps<OptionType> extends SelectProps<OptionType, false> {
  className?: string;
}

export const Dropdown = <OptionType extends unknown>({
  className = '',
  ...props
}: DropdownProps<OptionType>) => {
  // Custom styles for the dropdown
  const customStyles: StylesConfig<OptionType, false> = {
    singleValue: (provided) => ({
      ...provided,
      color: '#000000', // Set the selected value text color to black
    }),
    option: (provided) => ({
      ...provided,
      color: '#000000', // Set dropdown options text color to black
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#000000', // Set placeholder text color to black
    }),
  };

  return (
    <Select<OptionType, false>
      {...props}
      styles={customStyles}
      classNamePrefix="react-select"
      className={className}
    />
  );
};
