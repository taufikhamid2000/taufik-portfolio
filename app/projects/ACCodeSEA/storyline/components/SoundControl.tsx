/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import '../styles/interactiveStyles.css';

interface SoundControlProps {
  audioSrc: string;
}

const SoundControl: React.FC<SoundControlProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(audioSrc);
    }

    // Cleanup function to pause audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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