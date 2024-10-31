/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from 'next/link';
import '../../../../../styles/commonStyles.css';

export default function NavigationHub() {
  return (
    <div className="navigation-hub grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href="/projects/SBMP/InventoryManagement">
        <button className="bg-green-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-green-700 transition duration-300 w-full">
          Inventory Management
        </button>
      </Link>
      <Link href="/projects/SBMP/SalesTracking">
        <button className="bg-yellow-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-yellow-700 transition duration-300 w-full">
          Sales Tracking
        </button>
      </Link>
      <Link href="/projects/SBMP/staffmanagement">
        <button className="bg-red-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-red-700 transition duration-300 w-full">
          Staff Management
        </button>
      </Link>
      <Link href="/projects/SBMP/OrderProcessing">
        <button className="bg-purple-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300 w-full">
          Order Processing
        </button>
      </Link>
      <Link href="/projects/SBMP/Profile">
        <button className="bg-teal-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-teal-700 transition duration-300 w-full">
          Profile
        </button>
      </Link>
      <Link href="/projects/SBMP/FAQSupport">
        <button className="bg-orange-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-orange-700 transition duration-300 w-full">
          FAQ & Support
        </button>
      </Link>
      <Link href="/projects/SBMP/PromotionsMarketing">
        <button className="bg-pink-600 text-white px-6 py-4 font-semibold text-lg rounded-lg hover:bg-pink-700 transition duration-300 w-full">
          Promotions & Marketing
        </button>
      </Link>
    </div>
  );
}