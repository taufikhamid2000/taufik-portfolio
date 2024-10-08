import React from 'react';
import Link from 'next/link';
import '../styles/NavigationBar.css'; // Assuming the CSS is in styles folder

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <div className="nav-logo">
        <h1>Taufik`s Portfolio</h1> {/* Branding/logo */}
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/create-survey">Create Survey</Link>
        </li>
        <li>
          <Link href="/participate">Participate</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/rewards">Rewards</Link>
        </li>
      </ul>
      <div className="nav-user-options">
        <Link href="/logout" className="logout-button">Logout</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;