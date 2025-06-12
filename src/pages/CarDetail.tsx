import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Fuel, 
  Settings, 
  Users, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Clock,
  Car,
  Zap,
  Award,
  FileText,
  Camera,
  Play
} from 'lucide-react';

interface CarData {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  images: string[];
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  condition: 'New' | 'Used' | 'Certified Pre-Owned';
  bodyType: string;
  engine: string;
  exteriorColor: string;
  interiorColor: string;
  drivetrain: string;
  features: string[];
  safetyFeatures: string[];
  dealer: {
    name: string;
    rating: number;
    reviews: number;
    phone: string;
    email: string;
    address: string;
  };
  inspectionReport: {
    overall: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    engine: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    transmission: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    brakes: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    tires: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    interior: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    exterior: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    lastInspected: string;
    inspectorNotes: string;
  };
  specifications: {
    [key: string]: string;
  };
  description: string;
  vin: string;
  warranty: string;
  financing: {
    monthlyPayment: number;
    downPayment: number;
    apr: number;
    term: number;
  };
}

const CarDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'inspection' | 'financing'>('overview');
  const [showContactForm, setShowContactForm] = useState(false);

  // Sample car data - in real app this would come from API/props
  const carData: CarData = {
    id: 1,
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 185000,
    originalPrice: 195000,
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    mileage: 5000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    location: 'Riyadh, Saudi Arabia',
    condition: 'Certified Pre-Owned',
    bodyType: 'Sedan',
    engine: '2.0L Turbo I4',
    exteriorColor: 'Mineral Grey Metallic',
    interiorColor: 'Black Leather',
    drivetrain: 'Rear-Wheel Drive',
    features: [
      'Premium Sound System', 'Leather Seats', 'Sunroof', 'Navigation System',
      'Backup Camera', 'Heated Seats', 'Bluetooth Connectivity', 'USB Ports',
      'Keyless Entry', 'Push Button Start', 'Cruise Control', 'Power Windows',
      'Air Conditioning', 'Alloy Wheels', 'LED Headlights', 'Fog Lights'
    ],
    safetyFeatures: [
      'Anti-lock Braking System (ABS)', 'Electronic Stability Control',
      'Traction Control', 'Multiple Airbags', 'Blind Spot Monitoring',
      'Lane Departure Warning', 'Forward Collision Warning', 'Parking Sensors'
    ],
    dealer: {
      name: 'BMW Riyadh',
      rating: 4.8,
      reviews: 342,
      phone: '+966 11 123 4567',
      email: 'sales@bmwriyadh.com',
      address: 'King Fahd Road, Riyadh 12345'
    },
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Good',
      brakes: 'Excellent',
      tires: 'Good',
      interior: 'Excellent',
      exterior: 'Good',
      lastInspected: '2024-01-15',
      inspectorNotes: 'Vehicle is in excellent condition with minimal wear. All systems functioning properly. Minor paint touch-ups on rear bumper.'
    },
    specifications: {
      'Engine': '2.0L Turbo I4',
      'Horsepower': '255 hp',
      'Torque': '295 lb-ft',
      'Transmission': '8-Speed Automatic',
      'Drivetrain': 'Rear-Wheel Drive',
      'Fuel Economy': '12.5L/100km',
      'Top Speed': '250 km/h',
      'Acceleration': '5.8 seconds (0-100 km/h)',
      'Seating Capacity': '5 passengers',
      'Cargo Space': '480 liters',
      'Curb Weight': '1,540 kg',
      'Length': '4,709 mm',
      'Width': '1,827 mm',
      'Height': '1,442 mm',
      'Wheelbase': '2,851 mm'
    },
    description: 'This stunning BMW 3 Series represents the perfect blend of luxury, performance, and efficiency. With its turbocharged engine and refined interior, this vehicle offers an exceptional driving experience. The car has been meticulously maintained and comes with a comprehensive service history.',
    vin: 'WBA8E9G50KNU12345',
    warranty: '2 years / 100,000 km remaining',
    financing: {
      monthlyPayment: 2850,
      downPayment: 37000,
      apr: 3.9,
      term: 60
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carData.images.length) % carData.images.length);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Fair': return 'text-yellow-600 bg-yellow-100';
      case 'Poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Excellent': return <CheckCircle className="h-4 w-4" />;
      case 'Good': return <CheckCircle className="h-4 w-4" />;
      case 'Fair': return <AlertTriangle className="h-4 w-4" />;
      case 'Poor': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/buy" className="hover:text-[#f78f37] transition">Cars for Sale</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/buy" className="hover:text-[#f78f37] transition">{carData.make}</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{carData.model}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Slider */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={carData.images[currentImageIndex]}
                  alt={`${carData.year} ${carData.make} ${carData.model}`}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {carData.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {carData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                        index === currentImageIndex ? 'border-[#f78f37]' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Title and Basic Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {carData.year} {carData.make} {carData.model}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {carData.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {carData.condition}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#3d3d40]">
                    SAR {carData.price.toLocaleString()}
                  </div>
                  {carData.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      SAR {carData.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-1">
                    Est. SAR {carData.financing.monthlyPayment}/mo
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Settings className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{carData.mileage.toLocaleString()} km</div>
                  <div className="text-sm text-gray-600">Mileage</div>
                </div>
                <div className="text-center">
                  <Fuel className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{carData.fuelType}</div>
                  <div className="text-sm text-gray-600">Fuel Type</div>
                </div>
                <div className="text-center">
                  <Zap className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{carData.transmission}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>
                <div className="text-center">
                  <Car className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{carData.bodyType}</div>
                  <div className="text-sm text-gray-600">Body Type</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: FileText },
                    { id: 'features', label: 'Features', icon: Star },
                    { id: 'inspection', label: 'Inspection', icon: Shield },
                    { id: 'financing', label: 'Financing', icon: Award }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as any)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition ${
                        activeTab === id
                          ? 'border-[#f78f37] text-[#f78f37]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{carData.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(carData.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600">{key}</span>
                            <span className="text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Vehicle Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>VIN:</span>
                            <span className="font-mono">{carData.vin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exterior Color:</span>
                            <span>{carData.exteriorColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interior Color:</span>
                            <span>{carData.interiorColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Drivetrain:</span>
                            <span>{carData.drivetrain}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Warranty</h4>
                        <p className="text-sm text-gray-700">{carData.warranty}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Comfort & Convenience</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {carData.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Safety Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {carData.safetyFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <Shield className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Inspection Tab */}
                {activeTab === 'inspection' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Inspection Report</h3>
                      <div className="text-sm text-gray-600">
                        Last inspected: {new Date(carData.inspectionReport.lastInspected).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(carData.inspectionReport).map(([key, value]) => {
                        if (key === 'lastInspected' || key === 'inspectorNotes') return null;
                        return (
                          <div key={key} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium capitalize">{key}</span>
                              {getConditionIcon(value)}
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(value)}`}>
                              {value}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Inspector Notes
                      </h4>
                      <p className="text-gray-700 text-sm">{carData.inspectionReport.inspectorNotes}</p>
                    </div>
                  </div>
                )}

                {/* Financing Tab */}
                {activeTab === 'financing' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-[#3d3d40] to-gray-700 text-white rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Financing Options</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-2xl font-bold">SAR {carData.financing.monthlyPayment}</div>
                          <div className="text-sm opacity-90">Monthly Payment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">SAR {carData.financing.downPayment.toLocaleString()}</div>
                          <div className="text-sm opacity-90">Down Payment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{carData.financing.apr}%</div>
                          <div className="text-sm opacity-90">APR</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{carData.financing.term}</div>
                          <div className="text-sm opacity-90">Months</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Pre-approval Available</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Get pre-approved for financing in minutes. Subject to credit approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Dealer Info and Actions */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#3d3d40] mb-2">
                  SAR {carData.price.toLocaleString()}
                </div>
                {carData.originalPrice && (
                  <div className="text-lg text-gray-500 line-through mb-2">
                    SAR {carData.originalPrice.toLocaleString()}
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  Est. SAR {carData.financing.monthlyPayment}/mo
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105">
                  Purchase Now
                </button>
                <button 
                  onClick={() => window.location.href = '/step3'}
                  className="w-full bg-[#3d3d40] hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Book Inspection
                </button>
                <button 
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full border-2 border-[#f78f37] text-[#f78f37] hover:bg-[#f78f37] hover:text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Contact Dealer
                </button>
              </div>

              {showContactForm && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <a 
                      href={`tel:${carData.dealer.phone}`}
                      className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                    <a 
                      href={`mailto:${carData.dealer.email}`}
                      className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                    <button className="flex items-center justify-center w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dealer Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Dealer Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{carData.dealer.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(carData.dealer.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {carData.dealer.rating} ({carData.dealer.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{carData.dealer.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{carData.dealer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{carData.dealer.email}</span>
                  </div>
                </div>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition text-sm">
                  View All Dealer Cars
                </button>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{carData.condition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Body Type</span>
                  <span className="font-medium">{carData.bodyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Engine</span>
                  <span className="font-medium">{carData.engine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Drivetrain</span>
                  <span className="font-medium">{carData.drivetrain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{carData.fuelType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;