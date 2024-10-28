/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
// import '../../../styles/commonStyles.css';
import '../styles/interactiveStyles.css';

interface SoundControlProps {
  audioSrc: string;
}

const SoundControl: React.FC<SoundControlProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(audioSrc);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="sound-control mb-6">
      <button
        className={`sound-control-button px-4 py-2 rounded-lg text-white ${
          isPlaying ? 'bg-red-500' : 'bg-green-500'
        }`}
        onClick={togglePlay}
      >
        {isPlaying ? 'Pause Sound' : 'Play Sound'}
      </button>
    </div>
  );
};

export default SoundControl;