"use client";

import Header from '../../components/Header';
import { useEffect, useState } from 'react';

export default function SignupPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header showSignupLink={false} />
      <div className="flex items-center justify-center p-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
