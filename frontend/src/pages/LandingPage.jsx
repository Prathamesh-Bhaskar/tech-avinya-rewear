// src/pages/LandingPage.jsx
import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import SearchCTA from '../components/landing/SearchCTA';
import ImageCarousel from '../components/landing/ImageCarousel';
import CategoryFilters from '../components/landing/CategoryFilters';
import ImpactMetrics from '../components/landing/ImpactMetrics';

function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <SearchCTA />
      <ImageCarousel /> {/* Optional - you can comment this if not used */}
      <CategoryFilters />
      <ImpactMetrics />
    </div>
  );
}

export default LandingPage;
