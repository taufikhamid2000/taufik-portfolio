// SurveyOverview.jsx
import React from 'react';

const SurveyOverview = ({ surveys }) => {
  return (
    <div className="survey-overview">
      <h2>Available Surveys</h2>
      {surveys.length === 0 ? (
        <p>No surveys available at the moment.</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <button>Participate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyOverview;