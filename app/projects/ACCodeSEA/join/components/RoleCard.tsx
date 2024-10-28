/* eslint-disable react/no-unescaped-entities */
"use client";

interface RoleCardProps {
  title: string;
  description: string;
  skills: string[];
}

export default function RoleCard({ title, description, skills }: RoleCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-4">{description}</p>
      <h4 className="font-semibold mb-2">Skills Required:</h4>
      <ul className="list-disc list-inside mb-4">
        {skills.map((skill, index) => (
          <li key={index} className="text-sm">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}