/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import InventoryTracker from './Components/inventoryTracker';
import LowStockAlerts from './Components/lowStockAlerts';
import RestockingTools from './Components/restockingTools';

const Header = dynamic(() => import('../../../../components/Header'));

export default function InventoryManagementPage() {
  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Inventory Management</h1>
        <div className="mb-12">
          <InventoryTracker />
        </div>
        <div className="mb-12">
          <LowStockAlerts />
        </div>
        <div className="mb-12">
          <RestockingTools />
        </div>
      </div>
    </div>
  );
}
