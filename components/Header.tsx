/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from 'next/link';
import { useState, useEffect, memo, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import ThemeToggle from './ThemeToggle';
import DropdownMenu from './DropdownMenu';
// import LanguageSwitcher from './LanguageSwitcher';

interface UserState {
  email: string;
}

interface HeaderProps {
  showSignupLink?: boolean;
  title?: string;
}

interface Subscription {
  unsubscribe: () => void;
}

const Header: React.FC<HeaderProps> = ({ showSignupLink = true, title }) => {
  const [user, setUser] = useState<UserState | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const checkSession = useCallback(async () => {
    const { data: { session } }: { data: { session: any } } = await supabase.auth.getSession();
    setUser(session?.user ? { email: session.user.email } : null);
  }, []);

  useEffect(() => {
    checkSession();

    const { data: { subscription } }: { data: { subscription: Subscription } } = supabase.auth.onAuthStateChange(
      (event: string, session: any) => {
        setUser(session?.user ? { email: session.user.email } : null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [checkSession]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const MemoizedDropdownMenu = memo(DropdownMenu);

  return (
    <header className="w-full p-4 bg-gray-800 text-white dark:bg-gray-900 flex flex-col items-center md:flex-row md:justify-between md:items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <Link href="/" className="text-xl font-bold mr-4">Taufik&apos;s Portfolio</Link>
        <MemoizedDropdownMenu dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        <div className="ml-4">{title && <h1 className="text-xl font-semibold mr-12">{title}</h1>}</div>
      </div>
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            {showSignupLink && (
              <Link href="/auth">
                <button className="bg-green-500 text-white p-2 rounded hover:underline">
                  Sign In / Sign Up
                </button>
              </Link>
            )}
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
        <ThemeToggle />
        {/* <LanguageSwitcher /> */}
      </div>
    </header>
  );
};

export default Header;