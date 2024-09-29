"use client";

import { useState } from 'react';
import supabase from '../../lib/supabaseClient';
import Header from '../../components/Header';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); // Redirect to homepage after successful login
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="pt-20 w-full max-w-lg p-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>
        {message && (
          <div className={`mt-6 text-lg font-semibold ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
