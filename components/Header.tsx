"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Header = ({ showSignupLink = true }) => {
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
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <header className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl font-bold">Taufik`s Portfolio</Link>
      </div>
      <div className="flex gap-4 items-center">
        {showSignupLink && (
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        )}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
