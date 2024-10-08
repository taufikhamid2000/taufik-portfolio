"use client";

import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import SurveyOverview from './SurveyOverview';
import UserSummary from './UserSummary';
import apiService from '../lib/apiService';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const userResponse = await apiService.fetchUserProfile('your-user-id');
        setUserData(userResponse);

        const surveyResponse = await apiService.fetchSurveys();
        setSurveys(surveyResponse);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <NavigationBar />
      <div className="dashboard-content">
        <UserSummary userData={userData} />
        <SurveyOverview surveys={surveys} />
      </div>
    </div>
  );
};

export default Dashboard;