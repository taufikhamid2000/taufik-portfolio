/* eslint-disable react/no-unescaped-entities */
"use client";

import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/CommonComponents';
import '../../../styles/commonStyles.css';

// Lazy load the Header component to improve initial page load performance.
const Header = lazy(() => import('../../../components/Header'));

export default function JobMatchLandingPage() {
  const router = useRouter();

  // Function to handle 'Get Started' button click, navigates to the '/get-started' page.
  const about = () => {
    router.push('/projects/JobMatch/about');
  };

  const dashboard = () => {
    router.push('/projects/JobMatch/Dashboard');
  };

  return (
    <div className="page-container">
      {/* Use Suspense to display a loading placeholder while the Header component is being loaded. */}
      <Suspense fallback={<div className='loading-placeholder'>Loading...</div>}>
        <Header />
      </Suspense>
      <div className="content-container">
        <div className="text-center mb-large">
          <h1>Welcome to JobMatch</h1>
          {/* Description of the JobMatch platform and its features. */}
          <p>
            JobMatch is your one-stop solution for finding the perfect job or the ideal candidate. Employers can create standardized job postings with ease, while job seekers can browse and apply for positions effortlessly.
          </p>
          <p>
            Our platform utilizes advanced Natural Language Processing (NLP) and Machine Learning (ML) technologies to categorize job information, making it easier for employers to post jobs and for job seekers to find what they are looking for.
          </p>
          {/* 'Get Started' button with a click handler to navigate the user. */}
          <Button text="Read More" color="blue" className="button-large" onClick={about} />
          <Button text="Dashboard" color="green" className="button-large" onClick={dashboard} />
        </div>
      </div>
    </div>
  );
}

JobMatchLandingPage.propTypes = {};