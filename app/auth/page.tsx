"use client";

import { useState } from 'react';
import supabase from '../../lib/supabaseClient';
import Header from '../../components/Header';
import PasswordInput from '../../components/PasswordInput';
import MessageBanner from '../../components/MessageBanner';
import SocialAuthButton from '../../components/SocialAuthButton';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@') || password.length < 6) {
      setMessage('Please provide a valid email and a password with at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const action = isLogin
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });

    const { error } = await action;
    setIsLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(isLogin
        ? 'Login successful! Redirecting...'
        : 'Sign up successful! Please check your email to verify your account.'
      );

      if (isLogin) {
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      {message && <MessageBanner message={message} />}
      <div className="pt-20 w-full max-w-lg p-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleAuth} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <PasswordInput value={password} onChange={setPassword} />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white rounded-lg transition-all duration-300 ease-in-out ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <SocialAuthButton provider="google" />
        </div>
      </div>
    </div>
  );
}
