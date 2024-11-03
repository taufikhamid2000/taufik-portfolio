/* eslint-disable react/no-unescaped-entities */
"use client";

import '../../../../../styles/commonStyles.css';
import { Button } from '../../../../../components/CommonComponents';

export enum NavigationSection {
  Dashboard = 'Dashboard',
  JobPostingManagement = 'JobPostingManagement',
  ApplicationTracking = 'ApplicationTracking',
  UserManagement = 'UserManagement',
  Profile = 'Profile',
  FAQSupport = 'FAQSupport',
}

interface NavigationHubProps {
  onNavigate: (section: NavigationSection) => void;
}

const buttonConfigurations = [
  { text: 'Dashboard', color: 'blue' as const, section: NavigationSection.Dashboard },
  { text: 'Job Posting Management', color: 'yellow' as const, section: NavigationSection.JobPostingManagement },
  { text: 'Application Tracking', color: 'red' as const, section: NavigationSection.ApplicationTracking },
  { text: 'User Management', color: 'teal' as const, section: NavigationSection.UserManagement },
  { text: 'Profile', color: 'pink' as const, section: NavigationSection.Profile },
  { text: 'FAQ & Support', color: 'purple' as const, section: NavigationSection.FAQSupport },
];

export default function NavigationHub({ onNavigate }: NavigationHubProps) {
  return (
    <nav className="navigation p-4 mb-6">
      <ul className="navUl">
        {buttonConfigurations.map(({ text, color, section }) => (
          <li key={section}>
            <Button
              text={text}
              color={color}
              className="button w-full text-lg py-4"
              onClick={() => onNavigate(section)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
