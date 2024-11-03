/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../../styles/commonStyles.css';
import '../styles/interactiveStyles.css';

interface TimelineEvent {
  date: string;
  title: string;
  content: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="timeline-container">
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="timeline-event mb-10">
            <div className="timeline-marker bg-blue-500"></div>
            <div className="timeline-content bg-gray-100 dark:bg-gray-800 dark:text-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.date}</p>
              <p>{event.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;