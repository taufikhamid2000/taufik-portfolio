/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Header from '../../../../../components/Header';
import SurveyForm from './SurveyForm';

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header title="Create Custom Survey" />
      <div className="pt-20 w-full max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create a Custom Survey</h1>
        <SurveyForm />
      </div>
    </div>
  );
}