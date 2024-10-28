/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import '../../../styles/commonStyles.css';
// import '../styles/storylineStyles.css';

interface StorySectionProps {
  title: string;
  content: string;
  media?: string;
}

const StorySection: React.FC<StorySectionProps> = ({ title, content, media }) => {
  return (
    <div className="story-section mb-12">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg leading-7 mb-4">{content}</p>
      {media && <img src={media} alt={title} className="w-full h-auto rounded-lg" />}
    </div>
  );
};

export default StorySection;