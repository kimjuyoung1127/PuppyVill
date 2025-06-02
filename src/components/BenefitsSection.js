// src/components/BenefitsSection.js
import React from 'react';

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <h3>Why Choose Puppyville?</h3>
      <div className="benefit-item">
        {/* Placeholder for an icon */}
        <h4>Expert, Certified Trainers</h4>
        <p>Learn from the best. Our passionate trainers are certified and use proven, positive methods.</p>
      </div>
      <div className="benefit-item">
        {/* Placeholder for an icon */}
        <h4>Lasting Results, Happy Dogs</h4>
        <p>We focus on building a strong bond and skills that last a lifetime, ensuring a happier dog and a happier you.</p>
      </div>
      <div className="benefit-item">
        {/* Placeholder for an icon */}
        <h4>Supportive Community</h4>
        <p>Join a community of like-minded dog lovers and share your journey.</p>
      </div>
    </section>
  );
};

export default BenefitsSection;
