import React, { useState } from 'react';
import { ArrowLeftRight, ArrowRight, Check } from 'lucide-react';

const TradeInSection: React.FC = () => {
  const [currentCar, setCurrentCar] = useState('');
  const [desiredCar, setDesiredCar] = useState('');
  const [tradeInValue, setTradeInValue] = useState<number | null>(null);
  
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCar && desiredCar) {
      // Simulate trade-in calculation
      const randomValue = 15000 + Math.floor(Math.random() * 10000);
      setTradeInValue(randomValue);
    }
  };
  
  return (
    <section id="trade-in" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/7144219/pexels-photo-7144219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <div className="inline-flex items-center bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full mb-6">
              <ArrowLeftRight className="h-5 w-5 mr-2" />
              Trade-In Made Easy
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Upgrade Your Ride with <span className="text-amber-400">Top Trade-In Value</span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-xl">
              Get the best trade-in value for your current vehicle when upgrading to your dream car. 
              Our competitive offers and streamlined process make it easy to transition to your next vehicle.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Instant trade-in value calculation',
                'No hidden fees or surprise deductions',
                'Option to apply trade-in value to your next purchase',
                'Free vehicle pickup from your location'
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-amber-500 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-3 w-3 text-blue-900" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-blue-800/70 backdrop-blur-sm rounded-xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-6">Calculate Your Trade-In Value</h3>
              
              <form onSubmit={handleCalculate}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="current-car" className="block text-sm mb-2">Your Current Car</label>
                    <input
                      type="text"
                      id="current-car"
                      value={currentCar}
                      onChange={(e) => setCurrentCar(e.target.value)}
                      placeholder="e.g. 2019 Toyota Camry"
                      className="w-full bg-blue-700/50 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="bg-blue-700 p-2 rounded-full">
                      <ArrowLeftRight className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="desired-car" className="block text-sm mb-2">Car You Want</label>
                    <input
                      type="text"
                      id="desired-car"
                      value={desiredCar}
                      onChange={(e) => setDesiredCar(e.target.value)}
                      placeholder="e.g. 2023 Honda Accord"
                      className="w-full bg-blue-700/50 border border-blue-600 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-blue-900 font-semibold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
                >
                  Calculate Trade-In Value <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
              
              {tradeInValue && (
                <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                  <p className="text-green-400 text-sm mb-1">Estimated Trade-In Value:</p>
                  <p className="text-2xl font-bold text-white">${tradeInValue.toLocaleString()}</p>
                  <p className="text-green-400 text-sm mt-2">
                    You could save up to ${Math.floor(tradeInValue * 0.2).toLocaleString()} on your next purchase!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeInSection;