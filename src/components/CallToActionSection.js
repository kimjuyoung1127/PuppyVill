// src/components/CallToActionSection.js
import React from 'react';

const CallToActionSection = () => {
  return (
    <section className="call-to-action-section" style={{ padding: '50px 0', textAlign: 'center', backgroundColor: '#e6f7ff' }}>
      {/* Styling note: Make this section visually distinct and inviting. The CTA button should be prominent. */}
      <h2 style={{ fontSize: '2em', margin: '0 0 20px 0' }}>Ready to Start the Adventure?</h2>
      <p style={{ fontSize: '1.2em', margin: '0 0 30px 0' }}>[Join the Puppyville family today and watch your furry friend flourish!]</p>
      {/* This could be a different CTA than the main hero, e.g., "View Schedule" or "Contact Us" */}
      <button style={{ padding: '15px 30px', fontSize: '1em', cursor: 'pointer' }}>Explore Programs</button>
      {/* Optional: Add a secondary link for newsletter signup or a downloadable guide */}
      <p style={{ marginTop: '20px' }}>
        Or <a href="#">Download Our Free Puppy Guide</a>
      </p>
    </section>
  );
};

export default CallToActionSection;
