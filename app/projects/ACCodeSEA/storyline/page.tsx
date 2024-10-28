/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect } from 'react';
import Header from '../../../../components/Header';
// import StorySection from './components/StorySection';
// import Timeline from './components/Timeline';
import Accordion from './components/Accordion';
// import ImageLightbox from './components/ImageLightbox';
import SoundControl from './components/SoundControl';
import ChoicePathway from './components/ChoicePathway';
import storylineData from './data/storylineData';
// import '../../../styles/commonStyles.css';
import './styles/storylineStyles.css';
import './styles/interactiveStyles.css';

export default function StorylinePage() {
  useEffect(() => {
    // Optional: Any side effects to handle when the component loads
  }, []);

  // const majorEvents = storylineData.map((section) => ({
  //   title: section.title,
  //   content: section.content,
  // }));

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Assassin's Creed Code SEA: The Storyline</h1>
        <p className="text-lg leading-7 mb-12 text-center">
          Discover the hidden history of the Assassin's Brotherhood in Southeast Asia. Dive into the stories of power,
          rebellion, and the pursuit of freedom that shaped the region.
        </p>

        {/* Sound Control for Background Music */}
        <SoundControl audioSrc="/assets/projects/ACCodeSEA/storyline/background-music.mp3" />

        {/* Interactive Timeline */}
        {/* <Timeline events={majorEvents} /> */}

        {/* Story Sections with Accordion and Image Lightbox */}
        {storylineData.map((section) => (
          <Accordion key={section.id} title={section.title} content={
            `<div>
              <p>${section.content}</p>
              ${section.media ? `<ImageLightbox imageSrc="${section.media}" altText="${section.title}" />` : ''}
            </div>`
          } />
        ))}

        {/* Choice Pathway for User Interactivity */}
        <ChoicePathway
          choices={[
            {
              label: 'Join the Assassins',
              content: 'You have chosen to join the Brotherhood. Your mission is to protect the people and fight for freedom.',
            },
            {
              label: 'Ally with the Templars',
              content: 'You have chosen to ally with the Templars. Your mission is to bring order, whatever the cost.',
            },
          ]}
        />
      </div>
    </div>
  );
}