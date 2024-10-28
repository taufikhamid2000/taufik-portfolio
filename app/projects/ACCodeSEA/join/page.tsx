/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
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
// import '../../../styles/commonStyles.css';
// import './styles/joinStyles.css';

SwiperCore.use([Navigation, Pagination]);

const roles = [
  {
    id: 1,
    title: 'CEO/Studio Head',
    description: 'Oversees the entire studio, making key strategic decisions and guiding the overall direction of the projects.',
    skills: ['Leadership', 'Strategic Planning', 'Decision-Making'],
  },
  {
    id: 2,
    title: 'Executive Producer',
    description: 'Manages production resources and budgets, ensuring timely delivery of the project within budget constraints.',
    skills: ['Project Management', 'Budgeting', 'Team Coordination'],
  },
  {
    id: 3,
    title: 'Creative Director',
    description: 'Leads the creative vision, ensuring the game aligns with artistic and narrative goals.',
    skills: ['Creativity', 'Visionary Leadership', 'Artistic Direction'],
  },
  {
    id: 4,
    title: 'Technical Director',
    description: 'Oversees the technical aspects, managing the programming and engineering teams to ensure a stable game.',
    skills: ['Technical Leadership', 'Engineering', 'Problem Solving'],
  },
  {
    id: 5,
    title: 'Lead Producer',
    description: 'Coordinates production tasks, managing resources and timelines to keep the project on track.',
    skills: ['Scheduling', 'Resource Management', 'Communication'],
  },
  {
    id: 6,
    title: 'Game Director',
    description: 'Directs game design and gameplay mechanics, focusing on player experience and engagement.',
    skills: ['Game Design', 'Gameplay Mechanics', 'Player Engagement'],
  },
  {
    id: 7,
    title: 'Art Director',
    description: 'Leads the art team, establishing the visual style and ensuring consistency in art assets.',
    skills: ['Artistic Vision', 'Team Leadership', 'Visual Design'],
  },
  {
    id: 8,
    title: 'Narrative Director',
    description: 'Manages the narrative team, developing the storyline and character arcs within the game.',
    skills: ['Storytelling', 'Character Development', 'Scriptwriting'],
  },
  {
    id: 9,
    title: 'Lead Graphics Programmer',
    description: 'Focuses on graphics programming, enhancing visual quality and optimizing performance.',
    skills: ['Graphics Programming', 'Optimization', 'Shader Development'],
  },
  {
    id: 10,
    title: 'Lead Network Programmer',
    description: 'Works on networking code, ensuring stable online gameplay and reducing latency.',
    skills: ['Networking', 'Multiplayer Systems', 'Low Latency Optimization'],
  },
  {
    id: 11,
    title: 'Lead AI Programmer',
    description: 'Develops artificial intelligence systems for NPCs and in-game behaviors.',
    skills: ['Artificial Intelligence', 'Behavior Programming', 'Machine Learning'],
  },
  {
    id: 12,
    title: 'Lead Engine Programmer',
    description: 'Focuses on engine development, ensuring efficient performance and scalability.',
    skills: ['Engine Development', 'Performance Optimization', 'Scalability'],
  },
  {
    id: 13,
    title: 'Lead Gameplay Programmer',
    description: 'Implements gameplay features and mechanics, working closely with game designers.',
    skills: ['Gameplay Programming', 'Mechanics Implementation', 'Game Logic'],
  },
  {
    id: 14,
    title: 'External Production Coordinator',
    description: 'Coordinates with external teams and vendors to ensure smooth collaboration and integration.',
    skills: ['External Communication', 'Coordination', 'Project Management'],
  },
  {
    id: 15,
    title: 'Associate Producers',
    description: 'Supports production tasks, managing smaller teams and ensuring timely task completion.',
    skills: ['Task Management', 'Team Support', 'Production Assistance'],
  },
  {
    id: 16,
    title: 'Localization Lead',
    description: 'Oversees localization efforts, ensuring accurate and culturally relevant translations.',
    skills: ['Localization', 'Cultural Sensitivity', 'Translation'],
  },
  {
    id: 17,
    title: 'QA Lead',
    description: 'Leads the QA team, ensuring the game is free of bugs and meets quality standards.',
    skills: ['Quality Assurance', 'Bug Tracking', 'Testing Protocols'],
  },
  {
    id: 18,
    title: 'Scrum Masters',
    description: 'Facilitates agile processes, ensuring smooth workflow and team collaboration.',
    skills: ['Agile Methodology', 'Facilitation', 'Team Coordination'],
  },
  {
    id: 19,
    title: 'Project Managers',
    description: 'Oversee project timelines, budget, and resources, ensuring project goals are met.',
    skills: ['Project Planning', 'Resource Allocation', 'Time Management'],
  },
  {
    id: 20,
    title: 'Cinematic Director',
    description: 'Directs cinematic scenes, focusing on storytelling and visual storytelling.',
    skills: ['Cinematography', 'Storytelling', 'Directing'],
  },
  {
    id: 21,
    title: 'Lead Game Designer',
    description: 'Leads game design, focusing on gameplay systems and user experience.',
    skills: ['Game Design', 'User Experience', 'Gameplay Systems'],
  },
  {
    id: 22,
    title: 'Lead Level Designer',
    description: 'Designs and develops game levels, focusing on flow and player interaction.',
    skills: ['Level Design', 'Player Flow', 'Interactive Environments'],
  },
  {
    id: 23,
    title: 'Lead Narrative Designer',
    description: 'Crafts the game’s narrative structure, developing plot points and dialogue.',
    skills: ['Narrative Design', 'Plot Development', 'Dialogue Writing'],
  },
  {
    id: 24,
    title: 'Lead Character Artist',
    description: 'Creates character models and animations, focusing on aesthetics and personality.',
    skills: ['Character Modeling', 'Animation', '3D Art'],
  },
  {
    id: 25,
    title: 'Lead Environment Artist',
    description: 'Designs environmental assets, building immersive game worlds.',
    skills: ['Environment Design', '3D Modeling', 'Texturing'],
  },
  {
    id: 26,
    title: 'Lead Animator',
    description: 'Develops animations for characters and objects, enhancing realism and fluidity.',
    skills: ['Animation', 'Motion Capture', 'Rigging'],
  },
  {
    id: 27,
    title: 'Lead Concept Artist',
    description: 'Creates concept art to visualize the game’s look and feel before development.',
    skills: ['Concept Art', 'Sketching', 'Visual Development'],
  },
  {
    id: 28,
    title: 'Lead UI/UX Designer',
    description: 'Designs user interfaces, focusing on usability and player interaction.',
    skills: ['UI Design', 'UX Research', 'Interaction Design'],
  },
  {
    id: 29,
    title: 'Audio Director',
    description: 'Manages audio design, ensuring sound quality and enhancing the game’s atmosphere.',
    skills: ['Audio Design', 'Sound Mixing', 'Music Composition'],
  }
];

const benefits = [
  'Expand your portfolio with a unique, community-driven project.',
  'Gain experience working in a collaborative development environment.',
  "Connect with others passionate about Assassin's Creed and storytelling.",
];

export default function JoinTeamPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
                <RoleCard title={role.title} description={role.description} skills={role.skills} />
              </SwiperSlide>
            ))}
          </Swiper>
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
            <p className="text-lg text-center text-green-500">Thank you for your application! We'll be in touch soon.</p>
          ) : (
            <ApplicationForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
