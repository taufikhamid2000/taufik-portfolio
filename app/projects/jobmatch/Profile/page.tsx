/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from 'next/dynamic';
import '../../../../styles/commonStyles.css';
import { useRouter } from 'next/navigation';

const Header = dynamic(() => import('../../../../components/Header'));

interface UserProfileProps {
  name: string;
  email: string;
  role: string;
  joinedDate: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, role, joinedDate }) => {
  return (
    <section className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-2 border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">User Profile</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2"><strong>Name:</strong> {name}</p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2"><strong>Email:</strong> {email}</p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2"><strong>Role:</strong> {role}</p>
      <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Joined Date:</strong> {joinedDate}</p>
    </section>
  );
};

const ProfilePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen theme-light-dark">
      <Header />
      <div className="container mx-auto p-12 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-600 dark:text-blue-300">Profile Overview</h1>
        <UserProfile 
          name="John Doe"
          email="john.doe@example.com"
          role="Admin"
          joinedDate="January 1, 2022"
        />
      </div>
    </div>
  );
};

export default ProfilePage;