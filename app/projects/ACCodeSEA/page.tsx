/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from 'next/link';
import Header from '../../../components/Header';

export default function HomePageACCodeSEA() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to AC Code SEA</h1>
        <p className="text-lg leading-7 mb-8">
          AC Code SEA is an initiative aimed at expanding the Assassin's Creed franchise's presence in Southeast Asia. This project is dedicated to creating an immersive experience that highlights the rich cultural heritage of the region.
        </p>
        <div className="mt-6 text-center">
          <Link href="/projects/ACCodeSEA/About">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Learn More About Us
            </button>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link href="/projects/ACCodeSEA/Feedback">
            <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700">
              Share Your Feedback
            </button>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link href="/projects/ACCodeSEA/Storyline">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              Explore the Storyline
            </button>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link href="/projects/ACCodeSEA/Join">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Join the Team
            </button>
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link href="/projects/ACCodeSEA/Contact">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-8 mt-12">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg leading-7 mb-8">
          Our mission is to bring the rich history and diverse culture of Southeast Asia to the Assassin's Creed universe. We believe that the unique stories, legends, and historical events of this region deserve to be explored in an immersive and engaging way.
        </p>
        <h2 className="text-3xl font-bold mb-6">Why Support Us?</h2>
        <p className="text-lg leading-7 mb-8">
          By supporting AC Code SEA, you are helping to create a platform that celebrates the culture and history of Southeast Asia. We aim to provide a new perspective within the Assassin's Creed franchise that resonates with local and global audiences alike.
        </p>
        <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
        <p className="text-lg leading-7 mb-8">
          We are always looking for passionate individuals to join our team. Whether you are a developer, artist, writer, or just a fan of the franchise, there's a place for you in our community. Click the "Join the Team" button above to learn how you can contribute.
        </p>
      </div>
    </div>
  );
}
