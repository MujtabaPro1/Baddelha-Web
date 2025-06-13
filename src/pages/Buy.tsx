import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Heart, MapPin, Fuel, Calendar, Settings, ChevronDown, X, SlidersHorizontal } from 'lucide-react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  image: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  condition: 'New' | 'Used' | 'Certified Pre-Owned';
  bodyType: string;
  engine: string;
  features: string[];
  dealer: string;
  isLiked?: boolean;
  discount?: number;
}

const cars: Car[] = [
  {
    id: 1,
    make: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    price: 185000,
    originalPrice: 195000,
    image: 'https://images.carswitch.com/674674hyundai/1834616745255781.jpeg?fit=crop&w=305&h=228&auto=format,compress&q=30',
    mileage: 5000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    location: 'Riyadh',
    condition: 'Certified Pre-Owned',
    bodyType: 'Sedan',
    engine: '2.0L Turbo',
    features: ['Leather Seats', 'Sunroof', 'Navigation', 'Backup Camera'],
    dealer: 'BMW Riyadh',
    discount: 5
  },
  {
    id: 2,
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2024,
    price: 220000,
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Jeddah',
    condition: 'New',
    bodyType: 'Sedan',
    engine: '2.0L Hybrid',
    features: ['Premium Sound', 'Heated Seats', 'Wireless Charging', 'Lane Assist'],
    dealer: 'Mercedes Jeddah'
  },
  {
    id: 3,
    make: 'Audi',
    model: 'Q5',
    year: 2022,
    price: 165000,
    originalPrice: 175000,
    image: 'https://images.carswitch.com/666243audi/1832076984183556.jpeg?fit=crop&w=611&h=456&auto=format,compress&sat=30&vib=10&q=46',
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    location: 'Dammam',
    condition: 'Used',
    bodyType: 'SUV',
    engine: '2.0L TFSI',
    features: ['Quattro AWD', 'Virtual Cockpit', 'Panoramic Roof'],
    dealer: 'Audi Dammam',
    discount: 6
  },
  {
    id: 4,
    make: 'Lexus',
    model: 'ES',
    year: 2023,
    price: 195000,
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 8000,
    fuelType: 'Hybrid',
    transmission: 'CVT',
    location: 'Riyadh',
    condition: 'Certified Pre-Owned',
    bodyType: 'Sedan',
    engine: '2.5L Hybrid',
    features: ['Lexus Safety+', 'Mark Levinson Audio', 'Heated/Cooled Seats'],
    dealer: 'Lexus Riyadh'
  },
  {
    id: 5,
    make: 'Changan',
    model: 'CS75',
    year: 2024,
    price: 175000,
    image: 'https://images.carswitch.com/659337changan/1833913078922593.jpeg?fit=crop&w=611&h=456&auto=format,compress&sat=30&vib=10&q=46',
    mileage: 2000,
    fuelType: 'Gasoline',
    transmission: 'Single Speed',
    location: 'Riyadh',
    condition: 'Used',
    bodyType: 'Sedan',
    engine: 'Electric Motor',
    features: ['Autopilot', 'Supercharging', 'Over-the-Air Updates', 'Glass Roof'],
    dealer: 'Tesla Riyadh'
  },
  {
    id: 6,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 125000,
    image: 'https://images.carswitch.com/669440toyota/1832837275591336.jpg?fit=crop&w=611&h=456&auto=format,compress&sat=30&vib=10&q=46',
    mileage: 12000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    location: 'Jeddah',
    condition: 'Used',
    bodyType: 'Sedan',
    engine: '2.5L',
    features: ['Toyota Safety Sense', 'Apple CarPlay', 'Wireless Charging'],
    dealer: 'Toyota Jeddah'
  }
];

const makes = ['All Makes', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Tesla', 'Toyota'];
const bodyTypes = ['All Types', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'];
const fuelTypes = ['All Fuel Types', 'Gasoline', 'Hybrid', 'Electric', 'Diesel'];
const conditions = ['All Conditions', 'New', 'Used', 'Certified Pre-Owned'];
const locations = ['All Locations', 'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'];

function Buy() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [selectedBodyType, setSelectedBodyType] = useState('All Types');
  const [selectedFuelType, setSelectedFuelType] = useState('All Fuel Types');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [yearRange, setYearRange] = useState([2020, 2024]);
  const [mileageRange, setMileageRange] = useState([0, 50000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price-low');
  const [showFilters, setShowFilters] = useState(false);
  const [likedCars, setLikedCars] = useState<Set<number>>(new Set());

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMake = selectedMake === 'All Makes' || car.make === selectedMake;
      const matchesBodyType = selectedBodyType === 'All Types' || car.bodyType === selectedBodyType;
      const matchesFuelType = selectedFuelType === 'All Fuel Types' || car.fuelType === selectedFuelType;
      const matchesCondition = selectedCondition === 'All Conditions' || car.condition === selectedCondition;
      const matchesLocation = selectedLocation === 'All Locations' || car.location === selectedLocation;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1];
      const matchesMileage = car.mileage >= mileageRange[0] && car.mileage <= mileageRange[1];

      return matchesSearch && matchesMake && matchesBodyType && matchesFuelType && 
             matchesCondition && matchesLocation && matchesPrice && matchesYear && matchesMileage;
    });

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'mileage-low':
          return a.mileage - b.mileage;
        case 'mileage-high':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedMake, selectedBodyType, selectedFuelType, selectedCondition, 
      selectedLocation, priceRange, yearRange, mileageRange, sortBy]);

  const toggleLike = (carId: number) => {
    const newLikedCars = new Set(likedCars);
    if (newLikedCars.has(carId)) {
      newLikedCars.delete(carId);
    } else {
      newLikedCars.add(carId);
    }
    setLikedCars(newLikedCars);
  };

  const clearFilters = () => {
    setSelectedMake('All Makes');
    setSelectedBodyType('All Types');
    setSelectedFuelType('All Fuel Types');
    setSelectedCondition('All Conditions');
    setSelectedLocation('All Locations');
    setPriceRange([0, 300000]);
    setYearRange([2020, 2024]);
    setMileageRange([0, 50000]);
    setSearchTerm('');
  };

  const activeFiltersCount = [
    selectedMake !== 'All Makes',
    selectedBodyType !== 'All Types',
    selectedFuelType !== 'All Fuel Types',
    selectedCondition !== 'All Conditions',
    selectedLocation !== 'All Locations',
    priceRange[0] !== 0 || priceRange[1] !== 300000,
    yearRange[0] !== 2020 || yearRange[1] !== 2024,
    mileageRange[0] !== 0 || mileageRange[1] !== 50000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-[60px]">
      {/* Hero Section */}
      <div className="bg-[#3d3d40] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Car
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Browse thousands of quality vehicles from trusted dealers across Saudi Arabia
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#f78f37] shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 py-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-[#f78f37] text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Make Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                  >
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                {/* Body Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                  <select
                    value={selectedBodyType}
                    onChange={(e) => setSelectedBodyType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                  >
                    {bodyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={selectedFuelType}
                    onChange={(e) => setSelectedFuelType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                  >
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: SAR {priceRange[0].toLocaleString()} - SAR {priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year: {yearRange[0]} - {yearRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="2015"
                      max="2024"
                      value={yearRange[0]}
                      onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="2015"
                      max="2024"
                      value={yearRange[1]}
                      onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Mileage Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage: {mileageRange[0].toLocaleString()} - {mileageRange[1].toLocaleString()} km
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={mileageRange[0]}
                      onChange={(e) => setMileageRange([parseInt(e.target.value), mileageRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={mileageRange[1]}
                      onChange={(e) => setMileageRange([mileageRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">
                    {filteredAndSortedCars.length} Cars Found
                  </h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-[#f78f37] text-white text-xs px-2 py-1 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                    >
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="year-new">Year: Newest First</option>
                      <option value="year-old">Year: Oldest First</option>
                      <option value="mileage-low">Mileage: Low to High</option>
                      <option value="mileage-high">Mileage: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Listings */}
            {filteredAndSortedCars.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No cars found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#f78f37] text-white px-6 py-2 rounded-lg hover:bg-[#e67d26] transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredAndSortedCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    viewMode={viewMode}
                    isLiked={likedCars.has(car.id)}
                    onToggleLike={() => toggleLike(car.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CarCardProps {
  car: Car;
  viewMode: 'grid' | 'list';
  isLiked: boolean;
  onToggleLike: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, viewMode, isLiked, onToggleLike }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 relative">
            <img 
              src={car.image} 
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-48 md:h-full object-cover"
            />
            <button
              onClick={onToggleLike}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
            {car.condition === 'New' && (
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                New
              </div>
            )}
            {car.discount && (
              <div className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {car.discount}% OFF
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {car.year} {car.make} {car.model}
                </h3>
                <p className="text-gray-600">{car.condition} • {car.bodyType}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#3d3d40]">
                  SAR {car.price.toLocaleString()}
                </div>
                {car.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    SAR {car.originalPrice.toLocaleString()}
                  </div>
                )}
                <div className="text-sm text-gray-600">Est. SAR 2,500/mo</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Settings className="h-4 w-4 mr-2" />
                <span>{car.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Fuel className="h-4 w-4 mr-2" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{car.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {car.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span className="text-gray-500 text-xs">+{car.features.length - 3} more</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Sold by: <span className="font-medium">{car.dealer}</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition text-sm">
                  View Details
                </button>
                <button className="bg-[#f78f37] hover:bg-[#e67d26] text-white px-4 py-2 rounded-lg transition text-sm">
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onToggleLike}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        
        {car.condition === 'New' && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            New
          </div>
        )}
        {car.discount && (
          <div className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {car.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-gray-600 text-sm">{car.condition} • {car.bodyType}</p>
          </div>
      
        </div>
        
        <div className="grid grid-cols-2 gap-y-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Fuel className="h-4 w-4 mr-2" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </div>

        {car.features && car.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {car.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {/* {car.features.length > 2 && (
              <span className="text-gray-500 text-xs flex items-center">+{car.features.length - 2}</span>
            )} */}
          </div>
        )}

        <div className="text-xs text-gray-600 mb-4">
          Sold by: <span className="font-medium">{car.dealer}</span>
        </div>
        

        <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-md text-[#3d3d40]">
              SAR {car.price.toLocaleString()}
            </div>
            {/* {car.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                SAR {car.originalPrice.toLocaleString()}
              </div>
            )} */}
            <div className="text-xs text-gray-600">Est. SAR {(car.price / 50).toFixed(0).toLocaleString()}/mo</div>
          </div>

        <div className="flex gap-2">
          <a href={`/car/${car.id}`} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition text-sm text-center">
            View Details
          </a>
          <a href="#" className="flex-1 bg-[#f78f37] hover:bg-[#e67d26] text-white py-2 px-3 rounded-lg transition text-sm text-center">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Buy;