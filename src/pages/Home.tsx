import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedCars from '../components/FeaturedCars';
import TradeInSection from '../components/TradeInSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';

function App() {

  return (
    <div className="min-h-screen bg-white">
        <HeroSection />
        <ServicesSection />
        <FeaturedCars />
        <TradeInSection />
        {/* <TestimonialsSection /> */}
        <CtaSection />
    </div>
  );
}

export default App;