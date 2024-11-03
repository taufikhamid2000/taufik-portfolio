// app/projects/JobMatch/Dashboard/components/navigationHub.tsx

/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from 'next/link';
import { Button } from '../../../../../components/CommonComponents';

type ButtonColor = 'blue' | 'yellow' | 'red' | 'teal' | 'pink' | 'purple' | 'green' | 'orange';

interface ButtonConfiguration {
  text: string;
  color: ButtonColor;
  path: string;
}

const buttonConfigurations: ButtonConfiguration[] = [
  { text: 'Dashboard', color: 'blue', path: '/projects/JobMatch/Dashboard' },
  { text: 'Job Posting Management', color: 'yellow', path: '/projects/JobMatch/JobPostingManagement' },
  { text: 'Application Tracking', color: 'red', path: '/projects/JobMatch/ApplicationTracking' },
  { text: 'User Management', color: 'teal', path: '/projects/JobMatch/UserManagement' },
  { text: 'Profile', color: 'pink', path: '/projects/JobMatch/Profile' },
  { text: 'FAQ & Support', color: 'purple', path: '/projects/JobMatch/FAQSupport' },
];

export default function NavigationHub() {
  return (
    <nav className="navigation p-4 mb-6">
      <ul className="navUl">
        {buttonConfigurations.map(({ text, color, path }) => (
          <li key={text}>
            <Link href={path}>
              <Button text={text} color={color} className="button w-full text-lg py-4" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
