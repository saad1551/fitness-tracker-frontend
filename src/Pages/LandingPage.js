import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Fitness Tracker</h1>
          <p>Track your workouts, stay motivated, and achieve your fitness goals!</p>
          <Link to="/register">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
        <div className="hero-image">
          {/* Example image - replace with your own */}
          <img src="/images/cbum.avif" alt="Fitness" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature-item">
            <h3>Track Progress</h3>
            <p>Monitor your workout progress and achievements with detailed stats.</p>
          </div>
          <div className="feature-item">
            <h3>Personalized Plans</h3>
            <p>Create tailored fitness plans based on your goals and preferences.</p>
          </div>
          <div className="feature-item">
            <h3>Stay Motivated</h3>
            <p>Join a community of like-minded individuals to stay motivated.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Fit?</h2>
        <Link to="/register">
          <button className="cta-button">Join Now</button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
