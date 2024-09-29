"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import supabase from '../lib/supabaseClient';

interface UserState {
  email: string;
}

interface HeaderProps {
  showSignupLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSignupLink = true }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserState | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    // Use Supabase v2 to check for the current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ? { email: session.user.email } : null);
    };
    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: string, session: any) => {
        setUser(session?.user ? { email: session.user.email } : null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl font-bold">Taufik`s Portfolio</Link>
      </div>
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            {showSignupLink && (
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            )}
            <Link href="/login" className="hover:underline">
              Log In
            </Link>
          </>
        ) : (
          <>
            <span>Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </>
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