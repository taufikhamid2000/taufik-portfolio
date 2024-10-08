/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

interface UserState {
  email: string;
}

interface HeaderProps {
  showSignupLink?: boolean;
}

interface Project {
  name: string;
  description: string;
  pages: string[];
}

const Header: React.FC<HeaderProps> = ({ showSignupLink = true }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserState | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ? { email: session.user.email } : null);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch projects:', data.error);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-menu")) {
        setDropdownOpen(false);
        setActiveProject(null); // Close sub-dropdown too
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header className="w-full p-4 bg-gray-800 text-white dark:bg-gray-900 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold mr-4"> Taufik`s Portfolio </Link>
        <div className="relative dropdown-menu">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-blue-500 px-4 py-2 text-white rounded-lg"
          >
            Projects
          </button>
        {/* Main Dropdown */}
        {dropdownOpen && (
          <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-10">
            {projects.map((project) => (
              <li
                key={project.name}
                className="relative group cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <button
                  onClick={() =>
                    setActiveProject((prev) =>
                      prev === project.name ? null : project.name
                    )
                  }
                  className="w-full text-left"
                >
                  {project.name.replace(/-/g, ' ')}
                </button>

                {/* Sub Dropdown */}
                {activeProject === project.name && (
                  <ul className="absolute left-full top-0 mt-0 w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-10">
                    {project.pages.map((page, index) => (
                      <li key={index} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Link href={`/projects/${project.name}/${page === 'Home' ? '' : page.toLowerCase()}`}>
                          {typeof page === 'string' ? page : 'Unknown'}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
        </div>
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
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;