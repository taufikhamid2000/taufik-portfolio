/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import { Button } from '../../../components/CommonComponents';
import '../../../styles/commonStyles.css';
import Link from 'next/link';

const Header = dynamic(() => import('../../../components/Header'));

export default function SBMPPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-5xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Welcome to Small Business Management Platform (SBMP)</h1>
        <p className="text-xl leading-8 mb-12 text-center text-gray-700 dark:text-gray-300">
          SBMP is your go-to platform for managing multiple business locations efficiently. Whether you run a chain of food stalls, retail shops, or service outlets, SBMP offers the tools you need for inventory management, sales tracking, staff scheduling, and order processing—all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Link href="/projects/SBMP/Dashboard">
            <button className="bg-blue-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300">
              Dashboard
            </button>
          </Link>
          <Link href="/projects/SBMP/InventoryManagement">
            <button className="bg-green-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-green-700 transition duration-300">
              Inventory Management
            </button>
          </Link>
          <Link href="/projects/SBMP/SalesTracking">
            <button className="bg-yellow-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-yellow-700 transition duration-300">
              Sales Tracking
            </button>
          </Link>
          <Link href="/projects/SBMP/StaffManagement">
            <button className="bg-red-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-red-700 transition duration-300">
              Staff Management
            </button>
          </Link>
          <Link href="/projects/SBMP/OrderProcessing">
            <button className="bg-purple-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300">
              Order Processing
            </button>
          </Link>
          <Link href="/projects/SBMP/Profile">
            <button className="bg-teal-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-teal-700 transition duration-300">
              Profile
            </button>
          </Link>
          <Link href="/projects/SBMP/FAQSupport">
            <button className="bg-orange-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-orange-700 transition duration-300">
              FAQ & Support
            </button>
          </Link>
          <Link href="/projects/SBMP/PromotionsMarketing">
            <button className="bg-pink-600 text-white px-6 py-3 font-semibold text-lg rounded-lg hover:bg-pink-700 transition duration-300">
              Promotions & Marketing
            </button>
          </Link>
        </div>

        <div className="features-overview">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Platform Features</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
            <li className="mb-2">Inventory Management: Keep track of stock across all your locations seamlessly.</li>
            <li className="mb-2">Sales Tracking and Analytics: Gain insights into your sales performance and make data-driven decisions.</li>
            <li className="mb-2">Staff Scheduling: Efficiently manage staff shifts and optimize productivity.</li>
            <li className="mb-2">Order Processing: Handle customer orders with ease and ensure timely deliveries.</li>
            <li className="mb-2">Profile Management: Update your business and personal details for better platform customization.</li>
            <li className="mb-2">FAQ & Support: Get answers to common questions and access support whenever needed.</li>
            <li>Promotions & Marketing: Create promotional campaigns and marketing strategies to grow your customer base.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
