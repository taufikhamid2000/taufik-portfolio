/* eslint-disable react/no-unescaped-entities */
"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../../../../../styles/commonStyles.css';

export default function ContactDetails() {
  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg bg-white text-black">
      <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaPhoneAlt className="text-blue-600 mr-3" />
          <span className="text-lg">+1 (999) 999-9999</span>
        </li>
        <li className="flex items-center">
          <FaEnvelope className="text-blue-600 mr-3" />
          <span className="text-lg">taufikhamid2000@gmail.com</span>
        </li>
        <li className="flex items-center">
          <FaMapMarkerAlt className="text-blue-600 mr-3" />
          <span className="text-lg">123 Coding Street, Programming City, CodeWorld</span>
        </li>
      </ul>
    </div>
  );
}