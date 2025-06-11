import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ValuationWidget from './ValuationWidget';

const HeroSection: React.FC = () => {
  return (
    <div className="relative pt-16">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#3d3d40] mix-blend-multiply"></div>
 
      
      <div className="relative container mx-auto px-4 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Your Journey <span className="text-amber-400">Begins Here.</span>
            <br />Buy, Sell, or Trade Your Car.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
            Experience premium car services with instant valuation, competitive trade-in offers, and hassle-free buying and selling.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-[#f78f37] hover:bg-[#f78f37] text-[#FFF] font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center mt-12">
          <a href="#valuation" className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white" />
          </a>
        </div>
      </div>
      
      {/* Valuation widget overlay */}
      <div className="container mx-auto px-4 relative -mt-20 md:-mt-24 z-10">
        <ValuationWidget />
      </div>
    </div>
  );
};

export default HeroSection;