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
  Shield,
  Star,
  Car,
  Zap,
  FileText,
  Check,
  DollarSign,
  Clock,
  Award,
  Truck,
  Wrench,
  AlertCircle,
  Info,
  ThumbsUp,
  Users,
  Percent,
  Plus,
  ArrowRight, 
  BarChart2, 
  Gauge
} from 'lucide-react';
import axiosInstance from '../services/axiosInstance';
import { inspectionData, numberWithCommas } from '../lib/utils';
import CarBodySvgView from '../components/CarBodyView';



const CarDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'inspection' | 'financing' | 'history' | 'similar'>('overview');
  const [showContactForm, setShowContactForm] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [inspectionDetails, setInspectionDetails] = useState(null);
  const [inspectionSchema, setInspectionSchema] = useState(null);
  // These state variables are initialized but not currently used
  // They are kept for future implementation of dynamic data loading



  const nextImage = () => {
    const imagesArray = images.length > 0 ? images : [];
    setCurrentImageIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = () => {
    const imagesArray = images.length > 0 ? images : [];
    setCurrentImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };



   useEffect(()=>{
      // Extract car ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id') || window.location.pathname.split('/').pop();
      
      if (id) {
         carDetails(id);
      }
   },[]);

   const carDetails = (id: any) => {
          axiosInstance.get('/api/1.0/car/car-details/' + id).then((res)=>{
              // Process car data
              let _car = res?.data?.car;
              let _inspectionData = inspectionData;
              
              // Process inspection data if available
              if(_car['Inspection']){
                  _car['InspectionData'] = _car?.Inspection?.[0]?.inspectionJson;
                  _inspectionData.map((i)=>{
                      i.fields.map((_i: any)=>{
                          Object.keys(_car['InspectionData']).map((cKey)=>{
                              if(cKey.replace(/_/g, " ") == _i.fieldName){
                                  if(cKey == 'Warranty_Valid_Till'){
                                      _i.value = _car['InspectionData'][cKey] ? new Date(_car['InspectionData'][cKey]).toDateString() : 'N/A';
                                  }
                                  else if(cKey == 'Service_Plan_Valid_Till'){
                                      _i.value = _car['InspectionData'][cKey] ? new Date(_car['InspectionData'][cKey]).toDateString(): 'N/A';
                                  }
                                  else{
                                      _i.value = _car['InspectionData'][cKey] ;
                                  }
                              }
                          })
                      })
                      i['isHidden'] = i.name != 'General Information';
  
                      if(_car['InspectionData'].overview){
                          i['overview'] = _car['InspectionData'].overview[i.name];
                      }
                  })
              }
              _car['InspectionData'] = _inspectionData;
              
              // Set car data
              setCar(_car);

              setInspectionDetails(res?.data?.car?.Inspection?.[0]);
              setInspectionSchema(res?.data?.car?.Inspection?.[0]?.inspectionJson);
              
              // Process images
              if (res?.data?.images && res.data.images.length > 0) {
                  // Reorder images if needed
                  const imageUrls = res.data.images.map((img: any) => img.url || img.imageUrl || img);
                  setImages(imageUrls);
              } else if (_car.images && _car.images.length > 0) {
                  // Use car images if available
                  setImages(_car.images);
              }
              
              // Process car videos if available
              if (res?.data?.carImages) {
                  const videos = res.data.carImages.filter((i: any) => i.fileType && i.fileType.includes('video'));
                  if (videos.length > 0) {
                      // Handle videos if needed
                      console.log('Videos available:', videos.length);
                  }
              }
          }).catch((err)=>{
              console.log('err',err);
          })
      };


 
      if(!car || !inspectionDetails || !inspectionSchema){
        return <div>Loading...</div>
      }


  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/buy" className="hover:text-[#f78f37] transition">Cars for Sale</a>
            <ChevronRight className="h-4 w-4" />
            <a href="/buy" className="hover:text-[#f78f37] transition">{car?.make}</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{car?.model}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Slider */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={images.length > 0 ? images[currentImageIndex] : car?.images[currentImageIndex]}
                  alt={car ? `${car.year || ''} ${car.make || ''} ${car.model || ''}` : `${car?.year} ${car?.make} ${car?.model}`}
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
                  {currentImageIndex + 1} / {images.length > 0 ? images.length : 0}
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
                  {(images.length > 0 ? images : []).map((image, index) => (
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
                    {car ? `${car.year || ''} ${car.make || ''} ${car.model || ''}` : `${car?.year} ${car?.make} ${car?.model}`}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {car?.location || car?.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {car?.condition || car?.condition}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#3d3d40]">
                    SAR {numberWithCommas(car?.bookValue)}
                  </div>
    
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Settings className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.mileage ? car.mileage.toLocaleString() : '0'} km</div>
                  <div className="text-sm text-gray-600">Mileage</div>
                </div>
                <div className="text-center">
                  <Fuel className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.fuelType || 'Petrol'}</div>
                  <div className="text-sm text-gray-600">Fuel Type</div>
                </div>
                <div className="text-center">
                  <Zap className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.transmission || 'Automatic'}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>
                <div className="text-center">
                  <Car className="h-6 w-6 mx-auto text-gray-600 mb-1" />
                  <div className="font-semibold">{car?.bodyType}</div>
                  <div className="text-sm text-gray-600">Body Type</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-4 px-6 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: FileText },
                    { id: 'features', label: 'Features', icon: Check },
                    { id: 'inspection', label: 'Inspection', icon: Shield },
                    { id: 'financing', label: 'Financing', icon: DollarSign },
                    { id: 'history', label: 'History', icon: Clock },
                    { id: 'similar', label: 'Similar Cars', icon: Car },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as any)}
                      className={`flex items-center py-4 px-3 border-b-2 font-medium text-sm transition whitespace-nowrap ${
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
                  <div className="space-y-8">
                    {/* Vehicle Details Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-[#f78f37]" /> Vehicle Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-700">Basic Information</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">VIN:</span>
                              <span className="font-mono">{car?.vin || '100 100 100 100'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Make:</span>
                              <span>{car?.make || 'Audi'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Model:</span>
                              <span>{car?.model || 'A4'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Year:</span>
                              <span>{car?.year || '2023'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Trim:</span>
                              <span>{car?.trim || 'Premium Plus'}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-700">Appearance</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Exterior Color:</span>
                              <span>{car?.exteriorColor || 'Black'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Interior Color:</span>
                              <span>{car?.interiorColor || 'Black'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Body Type:</span>
                              <span>{car?.bodyType || 'Sedan'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Doors:</span>
                              <span>{car?.doors || '4'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Seats:</span>
                              <span>{car?.seats || '5'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Performance Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-[#f78f37]" /> Performance & Specifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-700">Engine & Transmission</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Engine:</span>
                              <span>{car?.engine || '2.0L Turbo'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Horsepower:</span>
                              <span>{car?.horsepower || '248 hp'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Transmission:</span>
                              <span>{car?.transmission || 'Automatic'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Drive Type:</span>
                              <span>{car?.driveType || '4WD'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Fuel Type:</span>
                              <span>{car?.fuelType || 'Petrol'}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-700">Performance Metrics</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Mileage:</span>
                              <span>{car?.mileage ? car.mileage.toLocaleString() : '0'} km</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Fuel Economy (City):</span>
                              <span>{car?.fuelEconomyCity || '10.5 L/100km'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Fuel Economy (Highway):</span>
                              <span>{car?.fuelEconomyHighway || '7.2 L/100km'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">0-100 km/h:</span>
                              <span>{car?.acceleration || '5.6 seconds'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                              <span className="text-gray-600">Top Speed:</span>
                              <span>{car?.topSpeed || '210 km/h'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seller Notes */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Info className="h-5 w-5 mr-2 text-[#f78f37]" /> Seller Notes
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          {car?.sellerNotes || 'This beautiful Audi A4 is in excellent condition with low mileage. It has been well-maintained with regular service and comes with a full service history. The car features premium leather seats, panoramic sunroof, and the latest technology package. Perfect for someone looking for luxury, comfort, and performance in one package.'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-[#f78f37]" /> Location
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-4">
                          This vehicle is located at: <strong>{car?.location || 'Riyadh, Saudi Arabia'}</strong>
                        </p>
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">Map placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Check className="h-5 w-5 mr-2 text-[#f78f37]" /> Key Features
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Comfort Features */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-[#f78f37]" /> Comfort
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'Leather Seats',
                              'Heated Front Seats',
                              'Dual-Zone Climate Control',
                              'Power Adjustable Seats',
                              'Memory Seat Settings',
                              'Panoramic Sunroof'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Technology Features */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-[#f78f37]" /> Technology
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'Touchscreen Infotainment System',
                              'Apple CarPlay & Android Auto',
                              'Premium Sound System',
                              'Bluetooth Connectivity',
                              'Wireless Charging',
                              'Digital Instrument Cluster'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Safety Features */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-[#f78f37]" /> Safety
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'Advanced Driver Assistance',
                              'Adaptive Cruise Control',
                              'Lane Keeping Assist',
                              'Blind Spot Monitoring',
                              'Parking Sensors',
                              '360° Camera System'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Performance Features */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                            <Award className="h-4 w-4 mr-2 text-[#f78f37]" /> Performance
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'Sport Suspension',
                              'Drive Mode Selection',
                              'Paddle Shifters',
                              'Performance Brakes',
                              'Sport Exhaust System',
                              'Quattro All-Wheel Drive'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Exterior Features */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                            <Car className="h-4 w-4 mr-2 text-[#f78f37]" /> Exterior
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'LED Headlights',
                              'LED Daytime Running Lights',
                              'Power Folding Mirrors',
                              'Alloy Wheels',
                              'Roof Rails',
                              'Tinted Windows'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Convenience Features */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-2 text-[#f78f37]" /> Convenience
                          </h4>
                          <ul className="space-y-2">
                            {[
                              'Keyless Entry & Start',
                              'Remote Start',
                              'Power Tailgate',
                              'Auto-Dimming Mirrors',
                              'Rain-Sensing Wipers',
                              'Ambient Interior Lighting'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Features */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Plus className="h-5 w-5 mr-2 text-[#f78f37]" /> Additional Features
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-4">
                          This vehicle comes with the following additional features and packages:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-gray-700">Premium Package</h4>
                            <ul className="space-y-1">
                              {[
                                'Bang & Olufsen Sound System',
                                'Head-up Display',
                                'Ventilated Front Seats',
                                'Heated Rear Seats'
                              ].map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-gray-700">Sport Package</h4>
                            <ul className="space-y-1">
                              {[
                                'Sport Seats',
                                'Sport Steering Wheel',
                                'Black Optic Package',
                                'Sport Suspension'
                              ].map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inspection Tab */}
                {activeTab === 'inspection' && (
                  <div className="space-y-8">
                    {/* Inspection Summary */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-[#f78f37]" /> Inspection Summary
                      </h3>
                      
                      {!inspectionDetails?.inspectionJson ? (
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                          <p className="text-gray-500">No inspection report available for this car.</p>
                        </div>
                      ) : !inspectionSchema ? (
                        <div className="bg-gray-50 p-6 rounded-lg flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f78f37]"></div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-6 rounded-lg">
                          {/* Inspection Score */}
                          <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold text-gray-700">Overall Condition</h4>
                              <div className="bg-[#f78f37] text-white font-bold px-3 py-1 rounded-full">
                                Excellent
                              </div>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#f78f37] h-2.5 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Poor</span>
                              <span>Excellent</span>
                            </div>
                          </div>
                          
                          {/* Key Inspection Points */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <div className="flex items-center mb-2">
                                <Wrench className="h-5 w-5 text-[#f78f37] mr-2" />
                                <h5 className="font-semibold text-gray-700">Mechanical</h5>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Condition</span>
                                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                                  Excellent
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <div className="flex items-center mb-2">
                                <Car className="h-5 w-5 text-[#f78f37] mr-2" />
                                <h5 className="font-semibold text-gray-700">Exterior</h5>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Condition</span>
                                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                                  Very Good
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <div className="flex items-center mb-2">
                                <Star className="h-5 w-5 text-[#f78f37] mr-2" />
                                <h5 className="font-semibold text-gray-700">Interior</h5>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Condition</span>
                                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                                  Excellent
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Detailed Inspection Information */}
                          <div className="border-t border-gray-200 pt-6">
                            <h4 className="font-semibold text-gray-700 mb-4">Detailed Inspection Report</h4>
                            
                            <div className="space-y-4">
                              {inspectionDetails && (
                                <div>
                                  {Object.keys(inspectionDetails?.inspectionJson).map((category, index) => {
                                    if(category === 'overview') return null;
                                    
                                    return (
                                      <div key={category + index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                                        <h5 className="font-semibold text-gray-700 mb-2">{category.replace(/_/g, " ")}</h5>
                                        <div className="text-sm">
                                          {typeof inspectionDetails?.inspectionJson[category] === 'object' && inspectionDetails?.inspectionJson[category]?.length ? (
                                            <span>{inspectionDetails?.inspectionJson[category][0].value}</span>
                                          ) : typeof inspectionDetails?.inspectionJson[category] === 'object' && !inspectionDetails?.inspectionJson[category]?.length ? (
                                            <span>{inspectionDetails?.inspectionJson[category]?.value || 'N/A'}</span>
                                          ) : (
                                            <span>{inspectionDetails?.inspectionJson[category] === "" ? "N/A" : inspectionDetails?.inspectionJson[category]}</span>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Car Body Condition */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Car className="h-5 w-5 mr-2 text-[#f78f37]" /> Car Body Condition
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        {inspectionDetails?.carBodyConditionJson ? (
                          <CarBodySvgView data={inspectionDetails?.carBodyConditionJson}/>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">Car body condition details not available.</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Inspection Images */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-[#f78f37]" /> Inspection Images
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        {images?.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((img: any, index: number) => (
                              <div key={index} className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                                <img 
                                  src={img} 
                                  alt={`Inspection image ${index + 1}`} 
                                  className="w-full h-32 object-cover rounded-md mb-2" 
                                />
                                <p className="text-xs text-gray-500 text-center truncate">
                                  {img.caption || `Image ${index + 1}`}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No inspection images available.</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Inspection Certificate */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-[#f78f37]" /> Inspection Certificate
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
                          <Shield className="h-16 w-16 mx-auto text-[#f78f37] mb-4" />
                          <h4 className="text-xl font-bold text-gray-800 mb-2">Certified Pre-Owned</h4>
                          <p className="text-gray-600 mb-4">This vehicle has passed our rigorous 150-point inspection process.</p>
                          <div className="flex justify-center space-x-2 mb-4">
                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              Mechanical ✓
                            </div>
                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              Electrical ✓
                            </div>
                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              Safety ✓
                            </div>
                          </div>
                          <button className="text-[#f78f37] hover:text-[#e67d26] font-medium">
                            Download Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Financing Tab */}
                {activeTab === 'financing' && (
                  <div className="space-y-8">
                    {/* Financing Options */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-[#f78f37]" /> Financing Options
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-6">
                          Explore our flexible financing options to make owning this vehicle more affordable. 
                          We offer competitive rates and terms tailored to your needs.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Option 1 */}
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                            <div className="text-center mb-4">
                              <h4 className="font-bold text-lg text-gray-800">Standard Loan</h4>
                              <div className="text-[#f78f37] text-2xl font-bold mt-2">SAR 1,890<span className="text-sm text-gray-500">/mo</span></div>
                              <p className="text-sm text-gray-500 mt-1">60 months</p>
                            </div>
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Down Payment:</span>
                                <span className="font-medium">SAR 22,842</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Interest Rate:</span>
                                <span className="font-medium">3.9%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Cost:</span>
                                <span className="font-medium">SAR 136,242</span>
                              </div>
                            </div>
                            <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                              Apply Now
                            </button>
                          </div>
                          
                          {/* Option 2 */}
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition relative overflow-hidden">
                            <div className="absolute -right-8 top-4 bg-[#f78f37] text-white text-xs font-bold py-1 px-10 transform rotate-45">
                              Popular
                            </div>
                            <div className="text-center mb-4">
                              <h4 className="font-bold text-lg text-gray-800">Flex Payment</h4>
                              <div className="text-[#f78f37] text-2xl font-bold mt-2">SAR 2,150<span className="text-sm text-gray-500">/mo</span></div>
                              <p className="text-sm text-gray-500 mt-1">48 months</p>
                            </div>
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Down Payment:</span>
                                <span className="font-medium">SAR 17,131</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Interest Rate:</span>
                                <span className="font-medium">2.9%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Cost:</span>
                                <span className="font-medium">SAR 120,331</span>
                              </div>
                            </div>
                            <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                              Apply Now
                            </button>
                          </div>
                          
                          {/* Option 3 */}
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                            <div className="text-center mb-4">
                              <h4 className="font-bold text-lg text-gray-800">Premium Lease</h4>
                              <div className="text-[#f78f37] text-2xl font-bold mt-2">SAR 2,450<span className="text-sm text-gray-500">/mo</span></div>
                              <p className="text-sm text-gray-500 mt-1">36 months</p>
                            </div>
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Initial Payment:</span>
                                <span className="font-medium">SAR 7,350</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Mileage Limit:</span>
                                <span className="font-medium">15,000 km/year</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">End Option:</span>
                                <span className="font-medium">Purchase or Return</span>
                              </div>
                            </div>
                            <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Financing Calculator */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Percent className="h-5 w-5 mr-2 text-[#f78f37]" /> Payment Calculator
                      </h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold mb-4 text-gray-700">Estimate Your Monthly Payment</h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Price</label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">SAR</span>
                                  <input type="text" value="114,210" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#f78f37] focus:border-[#f78f37]" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">SAR</span>
                                  <input type="text" value="22,842" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#f78f37] focus:border-[#f78f37]" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#f78f37] focus:border-[#f78f37]">
                                  <option>36 months</option>
                                  <option>48 months</option>
                                  <option selected>60 months</option>
                                  <option>72 months</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                                <div className="relative">
                                  <input type="text" value="3.9" className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:ring-[#f78f37] focus:border-[#f78f37]" />
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                                </div>
                              </div>
                              <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition mt-2">
                                Calculate
                              </button>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h4 className="font-semibold mb-4 text-gray-700">Payment Summary</h4>
                            <div className="space-y-4">
                              <div className="pb-4 border-b border-gray-200">
                                <div className="text-center">
                                  <div className="text-sm text-gray-500">Estimated Monthly Payment</div>
                                  <div className="text-3xl font-bold text-[#f78f37] mt-1">SAR 1,890</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Loan Amount:</span>
                                  <span className="font-medium">SAR 91,368</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Interest:</span>
                                  <span className="font-medium">SAR 22,032</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Cost:</span>
                                  <span className="font-medium">SAR 136,242</span>
                                </div>
                              </div>
                              <div className="pt-4 border-t border-gray-200">
                                <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                                  Apply for Financing
                                </button>
                                <div className="text-center mt-2">
                                  <a href="#" className="text-sm text-[#f78f37] hover:underline">Contact a Finance Specialist</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-8">
                    {/* Vehicle History Overview */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-[#f78f37]" /> Vehicle History Overview
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                              Clean History
                            </div>
                          </div>
                          <button className="text-[#f78f37] hover:text-[#e67d26] font-medium flex items-center">
                            <FileText className="h-4 w-4 mr-1" /> Download Full Report
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center mb-2">
                              <AlertCircle className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold text-gray-700">Accident History</h5>
                            </div>
                            <p className="text-sm text-gray-600">No accidents or damage reported</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center mb-2">
                              <Users className="h-5 w-5 text-[#f78f37] mr-2" />
                              <h5 className="font-semibold text-gray-700">Ownership</h5>
                            </div>
                            <p className="text-sm text-gray-600">1 previous owner, personal use only</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center mb-2">
                              <Truck className="h-5 w-5 text-[#f78f37] mr-2" />
                              <h5 className="font-semibold text-gray-700">Service History</h5>
                            </div>
                            <p className="text-sm text-gray-600">Full service history available</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                          <h4 className="font-semibold text-gray-700 mb-3">Vehicle Summary</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">First Registration:</span>
                                <span className="font-medium">March 15, 2020</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Imported From:</span>
                                <span className="font-medium">Germany</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Odometer Reading:</span>
                                <span className="font-medium">42,500 km (verified)</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Last Service:</span>
                                <span className="font-medium">January 10, 2023</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Warranty Valid Until:</span>
                                <span className="font-medium">March 15, 2025</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Recall Status:</span>
                                <span className="font-medium">No open recalls</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service History */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Wrench className="h-5 w-5 mr-2 text-[#f78f37]" /> Service History
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="relative">
                          {/* Timeline */}
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                          
                          {/* Service Events */}
                          <div className="space-y-8 relative">
                            {/* Service 1 */}
                            <div className="ml-10 relative">
                              <div className="absolute -left-10 mt-1.5">
                                <div className="bg-[#f78f37] h-4 w-4 rounded-full border-4 border-white"></div>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-gray-700">40,000 km Service</h4>
                                  <span className="text-sm text-gray-500">January 10, 2023</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Regular maintenance service performed at authorized dealer.</p>
                                <div className="space-y-1">
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Oil and filter change</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Brake fluid replacement</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Air filter replacement</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Multi-point inspection</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Service 2 */}
                            <div className="ml-10 relative">
                              <div className="absolute -left-10 mt-1.5">
                                <div className="bg-[#f78f37] h-4 w-4 rounded-full border-4 border-white"></div>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-gray-700">20,000 km Service</h4>
                                  <span className="text-sm text-gray-500">February 5, 2022</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Regular maintenance service performed at authorized dealer.</p>
                                <div className="space-y-1">
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Oil and filter change</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Cabin air filter replacement</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Software update</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Multi-point inspection</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Service 3 */}
                            <div className="ml-10 relative">
                              <div className="absolute -left-10 mt-1.5">
                                <div className="bg-[#f78f37] h-4 w-4 rounded-full border-4 border-white"></div>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-gray-700">Pre-Delivery Inspection</h4>
                                  <span className="text-sm text-gray-500">March 10, 2020</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Initial inspection and setup before delivery.</p>
                                <div className="space-y-1">
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Full vehicle inspection</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Fluid levels check</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Software verification</span>
                                  </div>
                                  <div className="flex items-start">
                                    <Check className="h-4 w-4 text-[#f78f37] mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">Road test</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ownership History */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-[#f78f37]" /> Ownership History
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-700">Current Owner</h4>
                              <span className="text-sm text-gray-500">Since April 2023</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Type:</span>
                                <span className="font-medium">Dealership</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Location:</span>
                                <span className="font-medium">Riyadh, Saudi Arabia</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-700">Previous Owner</h4>
                              <span className="text-sm text-gray-500">March 2020 - April 2023</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Type:</span>
                                <span className="font-medium">Private Individual</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Usage:</span>
                                <span className="font-medium">Personal Use Only</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Location:</span>
                                <span className="font-medium">Riyadh, Saudi Arabia</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Similar Cars Tab */}
                {activeTab === 'similar' && (
                  <div className="space-y-8">
                    {/* Similar Cars */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <Car className="h-5 w-5 mr-2 text-[#f78f37]" /> Similar Vehicles
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-6">
                          Explore similar vehicles that match your preferences. Compare features, prices, and specifications to find your perfect car.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Car 1 */}
                          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                            <div className="relative">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8l0IRdya6kunKn7-nw6HW0MjMVD34HaN8YQ&s" 
                                alt="Similar Car 1" 
                                className="w-full h-48 object-cover" />
                              <div className="absolute top-2 right-2 bg-[#f78f37] text-white text-xs font-bold py-1 px-2 rounded">
                                New Arrival
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-gray-800 mb-1 text-truncate">2021 Mercedes-Benz C-Class</h4>
                              <p className="text-sm text-gray-500 mb-3 text-truncate">C 200 AMG Line</p>
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-[#f78f37]">SAR 129,900</span>
                                <span className="text-xs text-gray-500">38,200 km</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="flex items-center text-xs text-gray-600">
                                  <Calendar className="h-3 w-3 mr-1" /> 2021
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Fuel className="h-3 w-3 mr-1" /> Petrol
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Gauge className="h-3 w-3 mr-1" /> Automatic
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <MapPin className="h-3 w-3 mr-1" /> Riyadh
                                </div>
                              </div>
                              <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                                View Details
                              </button>
                            </div>
                          </div>
                          
                          {/* Car 2 */}
                          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                            <div className="relative">
                              <img src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                                alt="Similar Car 2" 
                                className="w-full h-48 object-cover" />
                              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold py-1 px-2 rounded">
                                Best Deal
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-gray-800 mb-1 truncate text-ellipsis">2020 BMW 3 Series</h4>
                              <p className="text-sm text-gray-500 mb-3 truncate text-ellipsis">330i M Sport</p>
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-[#f78f37]">SAR 119,500</span>
                                <span className="text-xs text-gray-500">45,600 km</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="flex items-center text-xs text-gray-600">
                                  <Calendar className="h-3 w-3 mr-1" /> 2020
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Fuel className="h-3 w-3 mr-1" /> Petrol
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Gauge className="h-3 w-3 mr-1" /> Automatic
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <MapPin className="h-3 w-3 mr-1" /> Jeddah
                                </div>
                              </div>
                              <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                                View Details
                              </button>
                            </div>
                          </div>
                          
                          {/* Car 3 */}
                          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                            <div className="relative">
                              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                                alt="Similar Car 3" 
                                className="w-full h-48 object-cover" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-gray-800 mb-1 truncate text-ellipsis">2021 Audi A4</h4>
                              <p className="text-sm text-gray-500 mb-3 truncate text-ellipsis">40 TFSI S Line</p>
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-[#f78f37]">SAR 124,750</span>
                                <span className="text-xs text-gray-500">32,100 km</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="flex items-center text-xs text-gray-600">
                                  <Calendar className="h-3 w-3 mr-1" /> 2021
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Fuel className="h-3 w-3 mr-1" /> Petrol
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <Gauge className="h-3 w-3 mr-1" /> Automatic
                                </div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <MapPin className="h-3 w-3 mr-1" /> Riyadh
                                </div>
                              </div>
                              <button className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-medium py-2 px-4 rounded transition">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <button className="bg-white hover:bg-gray-50 text-[#f78f37] font-medium py-2 px-6 rounded border border-[#f78f37] transition inline-flex items-center">
                            View More Similar Cars <ArrowRight className="h-4 w-4 ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Compare Features */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <BarChart2 className="h-5 w-5 mr-2 text-[#f78f37]" /> Compare Features
                      </h3>
                      
                      <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
                        <table className="w-full min-w-[800px] border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-3 text-left text-gray-700 font-semibold border-b border-gray-200 w-1/4">Feature</th>
                              <th className="p-3 text-center text-gray-700 font-semibold border-b border-gray-200">
                                <div>This Car</div>
                                <div className="text-sm font-normal text-gray-500">Mercedes-Benz E-Class</div>
                              </th>
                              <th className="p-3 text-center text-gray-700 font-semibold border-b border-gray-200">
                                <div>Mercedes-Benz C-Class</div>
                                <div className="text-sm font-normal text-gray-500">C 200 AMG Line</div>
                              </th>
                              <th className="p-3 text-center text-gray-700 font-semibold border-b border-gray-200">
                                <div>BMW 3 Series</div>
                                <div className="text-sm font-normal text-gray-500">330i M Sport</div>
                              </th>
                              <th className="p-3 text-center text-gray-700 font-semibold border-b border-gray-200">
                                <div>Audi A4</div>
                                <div className="text-sm font-normal text-gray-500">40 TFSI S Line</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">Price</td>
                              <td className="p-3 border-b border-gray-200 text-center">SAR 114,210</td>
                              <td className="p-3 border-b border-gray-200 text-center">SAR 129,900</td>
                              <td className="p-3 border-b border-gray-200 text-center">SAR 119,500</td>
                              <td className="p-3 border-b border-gray-200 text-center">SAR 124,750</td>
                            </tr>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">Engine</td>
                              <td className="p-3 border-b border-gray-200 text-center">2.0L Turbo</td>
                              <td className="p-3 border-b border-gray-200 text-center">1.5L Turbo</td>
                              <td className="p-3 border-b border-gray-200 text-center">2.0L Turbo</td>
                              <td className="p-3 border-b border-gray-200 text-center">2.0L Turbo</td>
                            </tr>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">Power</td>
                              <td className="p-3 border-b border-gray-200 text-center">197 HP</td>
                              <td className="p-3 border-b border-gray-200 text-center">184 HP</td>
                              <td className="p-3 border-b border-gray-200 text-center">258 HP</td>
                              <td className="p-3 border-b border-gray-200 text-center">204 HP</td>
                            </tr>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">Fuel Economy</td>
                              <td className="p-3 border-b border-gray-200 text-center">7.1 L/100km</td>
                              <td className="p-3 border-b border-gray-200 text-center">6.5 L/100km</td>
                              <td className="p-3 border-b border-gray-200 text-center">6.8 L/100km</td>
                              <td className="p-3 border-b border-gray-200 text-center">7.0 L/100km</td>
                            </tr>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">0-100 km/h</td>
                              <td className="p-3 border-b border-gray-200 text-center">7.5 sec</td>
                              <td className="p-3 border-b border-gray-200 text-center">7.9 sec</td>
                              <td className="p-3 border-b border-gray-200 text-center">5.8 sec</td>
                              <td className="p-3 border-b border-gray-200 text-center">7.1 sec</td>
                            </tr>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">Warranty</td>
                              <td className="p-3 border-b border-gray-200 text-center">2 years remaining</td>
                              <td className="p-3 border-b border-gray-200 text-center">3 years</td>
                              <td className="p-3 border-b border-gray-200 text-center">2 years</td>
                              <td className="p-3 border-b border-gray-200 text-center">3 years</td>
                            </tr>
                            <tr>
                              <td className="p-3 border-b border-gray-200 font-medium text-gray-700">Mileage</td>
                              <td className="p-3 border-b border-gray-200 text-center">42,500 km</td>
                              <td className="p-3 border-b border-gray-200 text-center">38,200 km</td>
                              <td className="p-3 border-b border-gray-200 text-center">45,600 km</td>
                              <td className="p-3 border-b border-gray-200 text-center">32,100 km</td>
                            </tr>
                          </tbody>
                        </table>
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
                  SAR {numberWithCommas(car?.bookValue)}
                </div>
      
        
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = `/purchase/${car.id}`}
                  className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105"
                >
                  Purchase Now
                </button>
                <button 
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full border-2 border-[#f78f37] text-[#f78f37] hover:bg-[#f78f37] hover:text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Contact Dealer
                </button>
              </div>

         
            </div>

           

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Body Type</span>
                  <span className="font-medium">{car?.bodyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Engine</span>
                  <span className="font-medium">{car?.engine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Drive Type</span>
                  <span className="font-medium">4WD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">Petrol</span>
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