/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import OrderManager from './Components/orderManager';
import OrderStatusTracker from './Components/orderStatusTracker';
import PaymentIntegration from './Components/paymentIntegration';

const Header = dynamic(() => import('../../../../components/Header'));

export default function OrderProcessingPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Order Processing</h1>
        <div className="mb-12">
          <OrderManager />
        </div>
        <div className="mb-12">
          <OrderStatusTracker />
        </div>
        <div className="mb-12">
          <PaymentIntegration />
        </div>
      </div>
    </div>
  );
}