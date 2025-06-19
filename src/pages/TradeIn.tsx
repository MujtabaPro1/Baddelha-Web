import React, { useState } from 'react';
import { 
  ArrowRight, 
  Plus, 
  Car, 
  Building2, 
  User, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  CheckCircle, 
  X,
  Calculator,
  Shield,
  Zap
} from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  estimatedValue: number;
}

interface Dealership {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  image: string;
  specialties: string[];
  tradeInBonus: number;
  processingTime: string;
  services: string[];
}

const TradeIn: React.FC = () => {
  const [clientType, setClientType] = useState<'individual' | 'corporate'>('individual');
  const [currentStep, setCurrentStep] = useState<'form' | 'dealerships' | 'confirmation'>('form');
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      make: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      estimatedValue: 0
    }
  ]);
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    taxId: '',
    contactPerson: '',
    preferredContact: 'email'
  });

  const [selectedDealership, setSelectedDealership] = useState<string>('');

  const dealerships: Dealership[] = [
    {
      id: '1',
      name: 'Premium Exchange',
      address: 'King Fahd Road, Riyadh 12345',
      phone: '+966 11 123 4567',
      email: 'tradein@premiumauto.com',
      rating: 4.8,
      reviews: 342,
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      specialties: ['Luxury Cars', 'SUVs', 'Electric Vehicles'],
      tradeInBonus: 5000,
      processingTime: '24 hours',
      services: ['Free Inspection', 'Instant Valuation', 'Same Day Payment', 'Document Handling']
    },
    {
      id: '2',
      name: 'Elite Motors Trading',
      address: 'Olaya Street, Riyadh 11564',
      phone: '+966 11 234 5678',
      email: 'info@elitemotors.com',
      rating: 4.6,
      reviews: 256,
      image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      specialties: ['German Cars', 'Sports Cars', 'Vintage Classics'],
      tradeInBonus: 3500,
      processingTime: '48 hours',
      services: ['Expert Appraisal', 'Market Analysis', 'Flexible Payment', 'Trade-In Guarantee']
    },
    {
      id: '3',
      name: 'Royal Car Center',
      address: 'Riyadh 12244',
      phone: '+966 11 345 6789',
      email: 'tradein@royalcars.com',
      rating: 4.9,
      reviews: 428,
      image: 'https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      specialties: ['German Cars', 'Hybrid Vehicles', 'Commercial Fleet'],
      tradeInBonus: 4200,
      processingTime: '12 hours',
      services: ['Fleet Evaluation', 'Bulk Processing', 'Corporate Rates', 'Priority Service']
    }
  ];

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      make: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      estimatedValue: 0
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const updateVehicle = (id: string, field: keyof Vehicle, value: string) => {
    setVehicles(vehicles.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const calculateEstimatedValue = (vehicle: Vehicle) => {
    if (!vehicle.make || !vehicle.model || !vehicle.year) return 0;
    
    // Simple estimation logic - in real app this would be more sophisticated
    const baseValue = 50000;
    const yearFactor = (2024 - parseInt(vehicle.year)) * 2000;
    const mileageFactor = parseInt(vehicle.mileage) * 0.1;
    const conditionMultiplier = {
      'excellent': 1.2,
      'good': 1.0,
      'fair': 0.8,
      'poor': 0.6
    }[vehicle.condition] || 1.0;
    
    return Math.max(0, (baseValue - yearFactor - mileageFactor) * conditionMultiplier) || 0;
  };

  const getTotalEstimatedValue = () => {
    return vehicles.reduce((total, vehicle) => {
      const value = calculateEstimatedValue(vehicle);
      return total + value || 0;
    }, 0);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('dealerships');
  };

  const handleDealershipSelect = (dealershipId: string) => {
    setSelectedDealership(dealershipId);
    setCurrentStep('confirmation');
  };

  if (currentStep === 'confirmation') {
    const selectedDealer = dealerships.find(d => d.id === selectedDealership);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-12 relative overflow-hidden">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                🎉 Trade-In Request Submitted!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your trade-in application has been sent to {selectedDealer?.name}
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Request ID:</span>
                    <p className="font-semibold">#TI{Date.now().toString().slice(-6)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Estimated Value:</span>
                    <p className="font-semibold text-green-600">SAR {getTotalEstimatedValue().toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Processing Time:</span>
                    <p className="font-semibold">{selectedDealer?.processingTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Vehicles:</span>
                    <p className="font-semibold">{vehicles.length} car{vehicles.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Application received and under review</span>
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Dealership will contact you within {selectedDealer?.processingTime}</span>
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Inspection can be scheduled at your convenience</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
                >
                  Return Home
                </button>
                <button
                onClick={() => {
                    alert('Track Application is not implemented yet');
                }}
                className="border-2 border-[#f78f37] text-[#f78f37] hover:bg-[#f78f37] hover:text-white font-semibold py-3 px-8 rounded-lg transition">
                  Track Application
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                A confirmation email has been sent to {personalInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'dealerships') {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Preferred Dealership</h1>
              <p className="text-gray-600">Select the dealership that best matches your trade-in needs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {dealerships.map(dealership => (
                <div key={dealership.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={dealership.image} 
                    alt={dealership.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{dealership.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{dealership.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({dealership.reviews})</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{dealership.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{dealership.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Processing: {dealership.processingTime}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {dealership.specialties.map((specialty, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Services:</h4>
                      <div className="space-y-1">
                        {dealership.services.slice(0, 2).map((service, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Trade-In Bonus</span>
                        <span className="text-lg font-bold text-green-600">
                          +SAR {dealership.tradeInBonus.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDealershipSelect(dealership.id)}
                      className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105"
                    >
                      Select This Dealership
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentStep('form')}
                className="text-gray-600 hover:text-gray-800 font-medium transition"
              >
                ← Back to Trade-In Form
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trade-In Your Vehicle</h1>
            <p className="text-xl text-gray-600">Get the best value for your current vehicle and upgrade to something new</p>
          </div>

          {/* Client Type Selection */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Client Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setClientType('individual')}
                className={`p-6 border-2 rounded-lg transition ${
                  clientType === 'individual'
                    ? 'border-[#f78f37] bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className={`h-8 w-8 mx-auto mb-3 ${
                  clientType === 'individual' ? 'text-[#f78f37]' : 'text-gray-400'
                }`} />
                <h3 className={`font-semibold text-lg ${
                  clientType === 'individual' ? 'text-[#f78f37]' : 'text-gray-700'
                }`}>
                  Individual
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Personal vehicle trade-in for individual customers
                </p>
              </button>

              <button
                onClick={() => setClientType('corporate')}
                className={`p-6 border-2 rounded-lg transition ${
                  clientType === 'corporate'
                    ? 'border-[#f78f37] bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className={`h-8 w-8 mx-auto mb-3 ${
                  clientType === 'corporate' ? 'text-[#f78f37]' : 'text-gray-400'
                }`} />
                <h3 className={`font-semibold text-lg ${
                  clientType === 'corporate' ? 'text-[#f78f37]' : 'text-gray-700'
                }`}>
                  Corporate
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Fleet or multiple vehicle trade-in for businesses
                </p>
              </button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            {/* Personal/Company Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">
                {clientType === 'individual' ? 'Personal Information' : 'Company Information'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientType === 'individual' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalInfo.companyName}
                        onChange={(e) => setPersonalInfo({...personalInfo, companyName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax ID / CR Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalInfo.taxId}
                        onChange={(e) => setPersonalInfo({...personalInfo, taxId: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        placeholder="Enter tax ID or CR number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={personalInfo.contactPerson}
                        onChange={(e) => setPersonalInfo({...personalInfo, contactPerson: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        placeholder="Enter contact person name"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                    placeholder="+966 50 123 4567"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Vehicle Information</h2>
                {clientType === 'corporate' && (
                  <button
                    type="button"
                    onClick={addVehicle}
                    className="flex items-center bg-[#f78f37] hover:bg-[#e67d26] text-white px-4 py-2 rounded-lg transition"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {vehicles.map((vehicle, index) => (
                  <div key={vehicle.id} className="border border-gray-200 rounded-lg p-6 relative">
                    {clientType === 'corporate' && vehicles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVehicle(vehicle.id)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Car className="h-5 w-5 mr-2 text-[#f78f37]" />
                      Vehicle {index + 1}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Make *
                        </label>
                        <select
                          required
                          value={vehicle.make}
                          onChange={(e) => updateVehicle(vehicle.id, 'make', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        >
                          <option value="">Select Make</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Honda">Honda</option>
                          <option value="BMW">BMW</option>
                          <option value="Mercedes">Mercedes</option>
                          <option value="Audi">Audi</option>
                          <option value="Lexus">Lexus</option>
                          <option value="Nissan">Nissan</option>
                          <option value="Hyundai">Hyundai</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Model *
                        </label>
                        <select
                          required
                          value={vehicle.model}
                          onChange={(e) => updateVehicle(vehicle.id, 'model', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        >
                          <option value="">Select Model</option>
                          <option value="Camry">Camry</option>
                          <option value="Accord">Accord</option>
                          <option value="Civic">Civic</option>
                          <option value="Corolla">Corolla</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year *
                        </label>
                        <select
                          required
                          value={vehicle.year}
                          onChange={(e) => updateVehicle(vehicle.id, 'year', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: 20 }, (_, i) => (
                            <option key={i} value={2024 - i}>{2024 - i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mileage (km) *
                        </label>
                        <input
                          type="number"
                          required
                          value={vehicle.mileage}
                          onChange={(e) => updateVehicle(vehicle.id, 'mileage', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                          placeholder="Enter mileage"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Condition *
                        </label>
                        <select
                          required
                          value={vehicle.condition}
                          onChange={(e) => updateVehicle(vehicle.id, 'condition', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                        >
                          <option value="">Select Condition</option>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                        </select>
                      </div>
                    </div>

                    {vehicle.make && vehicle.model && vehicle.year && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">Estimated Trade-In Value</span>
                          <span className="text-lg font-bold text-green-600">
                            SAR {calculateEstimatedValue(vehicle).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {vehicles.some(v => v.make && v.model && v.year) && (
                <div className="mt-6 p-6 bg-[#3d3d40] text-white rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Total Estimated Value</h3>
                      <p className="text-gray-300">Based on current market conditions</p>
                    </div>
                    <div className="text-3xl font-bold text-[#f78f37]">
                      SAR {getTotalEstimatedValue().toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-4 px-12 rounded-lg transition transform hover:scale-105 text-lg"
              >
                Continue to Dealership Selection
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Benefits Section */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Trade-In Service?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fair Market Value</h3>
                <p className="text-gray-600">Get competitive pricing based on current market conditions and vehicle condition</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quick Process</h3>
                <p className="text-gray-600">Fast evaluation and same-day payment options available</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hassle-Free</h3>
                <p className="text-gray-600">We handle all paperwork and documentation for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeIn;
