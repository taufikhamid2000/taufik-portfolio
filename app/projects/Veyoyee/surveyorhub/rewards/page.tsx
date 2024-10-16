"use client";

import { useState } from 'react';
// import Link from 'next/link';
import Header from '../../../../../components/Header';
import { Button, Table } from '../../../../../components/CommonComponents';
import '../../../../../styles/commonStyles.css';


export default function ManageRewards() {

  const [rewards] = useState([
    { id: 1, title: 'Gift Card', points: 500, status: 'Available' },
    { id: 2, title: 'Cash Reward', points: 1000, status: 'Claimed' }
  ]);

  return (
    <div className={`min-h-screen ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header />
      <div className="pt-20 w-full max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Rewards</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Reward Items</h2>
          <Table
            headers={['Reward Title', 'Points Required', 'Status', 'Actions']}
            rows={
              rewards.length > 0
                ? rewards.map((reward) => ({
                    cols: [
                      reward.title,
                      reward.points,
                      reward.status,
                      <>
                        <Button text="Edit" color="yellow" className="button-class" onClick={undefined} />
                        <Button text="Delete" color="red" className="ml-2" onClick={undefined} />
                      </>
                    ]
                  }))
                : [{ cols: ['No rewards available.', '', '', ''] }]
            }
          />
        </div>
      </div>
    </div>
  );
}