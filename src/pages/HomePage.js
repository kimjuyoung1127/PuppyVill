import React from 'react';
import HeroSection from '../components/HeroSection';
import ProgramsOverviewSection from '../components/ProgramsOverviewSection';
import BenefitsSection from '../components/BenefitsSection';
import TestimonialHighlightsSection from '../components/TestimonialHighlightsSection';
import CallToActionSection from '../components/CallToActionSection';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section: Aim for an emotionally resonant first impression */}
      <HeroSection />

      {/* Programs Overview Section: Showcase program categories with engaging visuals and brief, benefit-oriented descriptions */}
      <ProgramsOverviewSection />

      {/* Benefits Section: Highlight key advantages with icons and concise text, focusing on emotional outcomes */}
      <BenefitsSection />

      {/* Testimonial Highlights Section: Feature impactful, short testimonials that build trust and emotional connection */}
      <TestimonialHighlightsSection />

      {/* Call To Action Section: A secondary CTA, perhaps for a newsletter or a free resource, to capture leads */}
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
