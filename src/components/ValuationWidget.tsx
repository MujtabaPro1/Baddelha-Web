import React, { useState } from 'react';
import { Check, ArrowRight, AlertCircle } from 'lucide-react';

const carMakes = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lexus', 'Mercedes', 'Nissan', 'Toyota', 'Volkswagen'];
const carModels = ['Camry', 'Corolla', 'Civic', 'Accord', 'Camry', 'Corolla', 'Civic', 'Accord', 'Camry', 'Corolla', 'Civic', 'Accord'];
const years = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString());

const ValuationWidget: React.FC = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year || !mileage) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    
    // Store the car details in localStorage or sessionStorage if needed
    const carDetails = { make, model, year, mileage };
    sessionStorage.setItem('carDetails', JSON.stringify(carDetails));
    
    // Redirect to Step2 page
    window.location.href = '/step2';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-[#f78f37] px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Get Your Car's Value in Seconds</h2>
        <p className="text-blue-100 text-sm">Free, instant, and accurate valuation</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <div className="relative">
              <select
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 pr-8 focus:border-blue-500 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select Make</option>
                {carMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronIcon />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <select
              id="model"
              value={model}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setModel(e.target.value)}
              className="block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Model</option>
              {carModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <div className="relative">
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 pr-8 focus:border-blue-500 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronIcon />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
            <input
              type="number"
              id="mileage"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="e.g. 50000"
              className="block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {!isValid && (
          <div className="flex items-start mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Please fill out all fields to get your car valuation.</p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center text-gray-600 text-sm">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span>Bank-approved valuation</span>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 shadow-md flex items-center justify-center"
          >
            Get Valuation <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
      
      <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-y-2 border-t border-gray-100">
        <div className="flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-600">Free</span>
        </div>
        <div className="flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-600">No obligations</span>
        </div>
        <div className="flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-600">Instant results</span>
        </div>
        <div className="flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-600">Trade-in options</span>
        </div>
      </div>
    </div>
  );
};

const ChevronIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export default ValuationWidget;