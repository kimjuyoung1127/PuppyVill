// src/components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ textAlign: 'center', padding: '50px 0', backgroundColor: '#f0f8ff' }}>
      {/* Styling note: Use a large, friendly font for the headline. Background could be a soft, appealing image or gradient. */}
      <h1 style={{ fontSize: '2.5em', margin: '0 0 20px 0' }}>Unlock Your Dog's Potential: Start Your Puppyville Journey Today!</h1>
      <p style={{ fontSize: '1.2em', margin: '0 0 30px 0' }}>Experience the joy of a well-behaved companion with our expert-led, positive reinforcement training programs.</p>
      {/* CTA button styling: Make it prominent, inviting, and perhaps with a cute icon. */}
      <button style={{ padding: '15px 30px', fontSize: '1em', cursor: 'pointer' }}>Explore Our Programs</button>
    </section>
  );
};

export default HeroSection;
