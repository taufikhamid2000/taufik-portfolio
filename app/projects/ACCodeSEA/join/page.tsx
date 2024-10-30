/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import Header from '../../../../components/Header';
import RoleCard from './components/RoleCard';
import ApplicationForm from './components/ApplicationForm';
import BenefitsList from './components/BenefitsList';
import { fetchRoles } from '../admin/roles/utils/rolesService'; // Adjusted import path
import { Role } from '../../../../app/projects/ACCodeSEA/admin/roles/types';
// import './styles/joinStyles.css';

SwiperCore.use([Navigation, Pagination]);

const benefits = [
  'Expand your portfolio with a unique, community-driven project.',
  'Gain experience working in a collaborative development environment.',
  "Connect with others passionate about Assassin's Creed and storytelling.",
];

export default function JoinTeamPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const fetchedRoles = await fetchRoles();
        setRoles(fetchedRoles);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles.');
      } finally {
        setLoadingRoles(false);
      }
    };

    loadRoles();
  }, []);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Join the AC Code SEA Team</h1>
        <p className="text-lg leading-7 mb-12 text-center">
          We're looking for passionate individuals to help bring the Assassin's Creed Code SEA project to life.
          Whether you're a developer, content creator, or simply an Assassin's Creed fan, there's a place for you here!
        </p>

        {/* Role Cards Section with Swiper */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Open Roles</h2>

          {loadingRoles ? (
            <p>Loading roles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : roles.length > 0 ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              navigation
              pagination={{ clickable: true }}
            >
              {roles.map((role) => (
                <SwiperSlide key={role.id}>
                  <RoleCard
                    title={role.title}
                    description={role.description}
                    skills={role.skills}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No roles available at the moment.</p>
          )}
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Join Us?</h2>
          <BenefitsList benefits={benefits} />
        </div>

        {/* Application Form */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Apply Now</h2>
          {isFormSubmitted ? (
            <p className="text-lg text-center text-green-500">
              Thank you for your application! We'll be in touch soon.
            </p>
          ) : (
            <ApplicationForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
