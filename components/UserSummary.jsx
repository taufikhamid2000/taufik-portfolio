// UserSummary.jsx
import React from 'react';
import Image from 'next/image';

const UserSummary = ({ userData }) => {
  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user-summary">
      <div className="user-info">
        <Image
          src={userData.profilePicture}
          alt="User Avatar"
          width={50}
          height={50}
          className="user-avatar"
        />
        <h2>{userData.name}</h2>
      </div>
      <div className="user-stats">
        <p>Participated Surveys: {userData.surveysParticipated}</p>
        <p>Rewards Earned: {userData.rewardsEarned}</p>
      </div>
    </div>
  );
};

export default UserSummary;