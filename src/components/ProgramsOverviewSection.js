// src/components/ProgramsOverviewSection.js
import React from 'react';

const ProgramsOverviewSection = () => {
  return (
    <section className="programs-overview-section">
      <h3>Discover Our Training Programs</h3>
      <div className="program-card">
        <h4>Puppy Kindergarten: Fun & Foundational Skills</h4>
        <p>Give your pup the best start! Socialization, basic cues, and confidence building in a safe environment.</p>
        <a href="/programs/puppy-kindergarten">Learn More</a>
      </div>
      <div className="program-card">
        <h4>Basic Obedience: Building a Great Companion</h4>
        <p>Master essential commands and improve leash manners for a well-behaved dog you can take anywhere.</p>
        <a href="/programs/basic-obedience">Learn More</a>
      </div>
      {/* Add one more program card placeholder if desired */}
    </section>
  );
};

export default ProgramsOverviewSection;
