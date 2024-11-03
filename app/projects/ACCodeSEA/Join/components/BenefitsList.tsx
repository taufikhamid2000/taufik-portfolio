/* eslint-disable react/no-unescaped-entities */
"use client";

interface BenefitsListProps {
  benefits: string[];
}

export default function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <ul className="list-disc list-inside mb-4">
      {benefits.map((benefit, index) => (
        <li key={index} className="text-lg mb-2">
          {benefit}
        </li>
      ))}
    </ul>
  );
}