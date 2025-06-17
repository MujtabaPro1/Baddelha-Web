import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Gavel, 
  TrendingUp, 
  Eye, 
  Heart, 
  Car, 
  Building2, 
  Truck, 
  Filter, 
  Search, 
  ArrowUp, 
  ArrowDown,
  Users,
  DollarSign,
  Timer,
  Zap,
  Award,
  Shield,
  Star,
  MapPin,
  Calendar,
  ChevronDown,
  Play,
  Pause
} from 'lucide-react';

interface AuctionCar {
  id: string;
  make: string;
  model: string;
  year: number;
  image: string;
  category: 'dealer' | 'car-auction' | 'fleet';
  currentBid: number;
  minBid: number;
  maxBid: number;
  reservePrice: number;
  timeLeft: number; // in seconds
  totalBids: number;
  watchers: number;
  location: string;
  mileage: number;
  condition: string;
  seller: string;
  sellerRating: number;
  features: string[];
  isLive: boolean;
  isHot: boolean;
  isReserveMetr: boolean;
  lastBidTime: string;
  estimatedValue: number;
  startingPrice: number;
}

const Auction: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dealer' | 'car-auction' | 'fleet'>('all');
  const [sortBy, setSortBy] = useState<'ending-soon' | 'price-low' | 'price-high' | 'most-bids'>('ending-soon');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [likedCars, setLikedCars] = useState<Set<string>>(new Set());
  const [watchedCars, setWatchedCars] = useState<Set<string>>(new Set());
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});

  // Sample auction data
  const [auctionCars, setAuctionCars] = useState<AuctionCar[]>([
    {
      id: '1',
      make: 'BMW',
      model: 'X5',
      year: 2022,
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'dealer',
      currentBid: 185000,
      minBid: 180000,
      maxBid: 250000,
      reservePrice: 190000,
      timeLeft: 3600, // 1 hour
      totalBids: 23,
      watchers: 45,
      location: 'Riyadh',
      mileage: 15000,
      condition: 'Excellent',
      seller: 'Premium BMW Riyadh',
      sellerRating: 4.8,
      features: ['Leather Seats', 'Sunroof', 'Navigation'],
      isLive: true,
      isHot: true,
      isReserveMetr: false,
      lastBidTime: '2 minutes ago',
      estimatedValue: 195000,
      startingPrice: 170000
    },
    {
      id: '2',
      make: 'Mercedes',
      model: 'C-Class',
      year: 2023,
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'car-auction',
      currentBid: 165000,
      minBid: 160000,
      maxBid: 200000,
      reservePrice: 170000,
      timeLeft: 7200, // 2 hours
      totalBids: 18,
      watchers: 32,
      location: 'Jeddah',
      mileage: 8000,
      condition: 'Like New',
      seller: 'Classic Car Auctions',
      sellerRating: 4.6,
      features: ['AMG Package', 'Premium Sound', 'Heated Seats'],
      isLive: true,
      isHot: false,
      isReserveMetr: false,
      lastBidTime: '5 minutes ago',
      estimatedValue: 175000,
      startingPrice: 155000
    },
    {
      id: '3',
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fleet',
      currentBid: 85000,
      minBid: 80000,
      maxBid: 110000,
      reservePrice: 90000,
      timeLeft: 1800, // 30 minutes
      totalBids: 12,
      watchers: 28,
      location: 'Dammam',
      mileage: 45000,
      condition: 'Good',
      seller: 'Corporate Fleet Solutions',
      sellerRating: 4.4,
      features: ['Fleet Maintained', 'Service Records', 'Low Mileage'],
      isLive: true,
      isHot: true,
      isReserveMetr: true,
      lastBidTime: '1 minute ago',
      estimatedValue: 92000,
      startingPrice: 75000
    },
    {
      id: '4',
      make: 'Audi',
      model: 'Q7',
      year: 2023,
      image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'dealer',
      currentBid: 220000,
      minBid: 215000,
      maxBid: 280000,
      reservePrice: 225000,
      timeLeft: 5400, // 1.5 hours
      totalBids: 31,
      watchers: 67,
      location: 'Riyadh',
      mileage: 5000,
      condition: 'Excellent',
      seller: 'Audi Center Riyadh',
      sellerRating: 4.9,
      features: ['Quattro AWD', 'Virtual Cockpit', 'Premium Plus'],
      isLive: true,
      isHot: false,
      isReserveMetr: false,
      lastBidTime: '3 minutes ago',
      estimatedValue: 235000,
      startingPrice: 200000
    },
    {
      id: '5',
      make: 'Lexus',
      model: 'ES',
      year: 2022,
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'car-auction',
      currentBid: 145000,
      minBid: 140000,
      maxBid: 180000,
      reservePrice: 150000,
      timeLeft: 10800, // 3 hours
      totalBids: 15,
      watchers: 41,
      location: 'Jeddah',
      mileage: 12000,
      condition: 'Excellent',
      seller: 'Luxury Auto Auctions',
      sellerRating: 4.7,
      features: ['Hybrid Engine', 'Mark Levinson Audio', 'Safety+'],
      isLive: true,
      isHot: false,
      isReserveMetr: true,
      lastBidTime: '7 minutes ago',
      estimatedValue: 155000,
      startingPrice: 135000
    },
    {
      id: '6',
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fleet',
      currentBid: 72000,
      minBid: 70000,
      maxBid: 95000,
      reservePrice: 75000,
      timeLeft: 900, // 15 minutes
      totalBids: 8,
      watchers: 19,
      location: 'Riyadh',
      mileage: 38000,
      condition: 'Good',
      seller: 'Fleet Management Co.',
      sellerRating: 4.2,
      features: ['Corporate Owned', 'Regular Service', 'Clean Title'],
      isLive: true,
      isHot: true,
      isReserveMetr: false,
      lastBidTime: '4 minutes ago',
      estimatedValue: 78000,
      startingPrice: 65000
    }
  ]);

  // Timer effect to update countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionCars(prevCars => 
        prevCars.map(car => ({
          ...car,
          timeLeft: Math.max(0, car.timeLeft - 1)
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (seconds: number) => {
    if (seconds <= 0) return 'ENDED';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getTimeColor = (seconds: number) => {
    if (seconds <= 300) return 'text-red-600'; // 5 minutes
    if (seconds <= 1800) return 'text-orange-600'; // 30 minutes
    return 'text-green-600';
  };

  const filteredAndSortedCars = () => {
    let filtered = auctionCars.filter(car => {
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ending-soon':
          return a.timeLeft - b.timeLeft;
        case 'price-low':
          return a.currentBid - b.currentBid;
        case 'price-high':
          return b.currentBid - a.currentBid;
        case 'most-bids':
          return b.totalBids - a.totalBids;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const toggleLike = (carId: string) => {
    const newLiked = new Set(likedCars);
    if (newLiked.has(carId)) {
      newLiked.delete(carId);
    } else {
      newLiked.add(carId);
    }
    setLikedCars(newLiked);
  };

  const toggleWatch = (carId: string) => {
    const newWatched = new Set(watchedCars);
    if (newWatched.has(carId)) {
      newWatched.delete(carId);
    } else {
      newWatched.add(carId);
    }
    setWatchedCars(newWatched);
  };

  const placeBid = (carId: string) => {
    const bidAmount = parseFloat(bidAmounts[carId] || '0');
    const car = auctionCars.find(c => c.id === carId);
    
    if (car && bidAmount > car.currentBid) {
      setAuctionCars(prevCars =>
        prevCars.map(c =>
          c.id === carId
            ? { ...c, currentBid: bidAmount, totalBids: c.totalBids + 1, lastBidTime: 'Just now' }
            : c
        )
      );
      setBidAmounts(prev => ({ ...prev, [carId]: '' }));
      alert(`Bid placed successfully for SAR ${bidAmount.toLocaleString()}!`);
    } else {
      alert('Bid must be higher than current bid!');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dealer': return <Building2 className="h-4 w-4" />;
      case 'car-auction': return <Gavel className="h-4 w-4" />;
      case 'fleet': return <Truck className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dealer': return 'bg-blue-100 text-blue-800';
      case 'car-auction': return 'bg-purple-100 text-purple-800';
      case 'fleet': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#3d3d40] to-gray-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Gavel className="h-12 w-12 text-[#f78f37] mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Live Car Auctions
              </h1>
            </div>
            <p className="text-xl text-gray-200 mb-8">
              Bid on premium vehicles from dealers, auctions, and fleet sales
            </p>
            
            {/* Live Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-[#f78f37]">{auctionCars.length}</div>
                <div className="text-sm">Live Auctions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-[#f78f37]">
                  {auctionCars.reduce((sum, car) => sum + car.totalBids, 0)}
                </div>
                <div className="text-sm">Total Bids</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-[#f78f37]">
                  {auctionCars.reduce((sum, car) => sum + car.watchers, 0)}
                </div>
                <div className="text-sm">Active Watchers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Auctions', icon: Car },
                { id: 'dealer', label: 'Dealer Auctions', icon: Building2 },
                { id: 'car-auction', label: 'Car Auctions', icon: Gavel },
                { id: 'fleet', label: 'Fleet Sales', icon: Truck }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id as any)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === id
                      ? 'bg-[#f78f37] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#f78f37] focus:border-transparent"
                >
                  <option value="ending-soon">Ending Soon</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="most-bids">Most Bids</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedCars().map(car => (
            <AuctionCard
              key={car.id}
              car={car}
              isLiked={likedCars.has(car.id)}
              isWatched={watchedCars.has(car.id)}
              onToggleLike={() => toggleLike(car.id)}
              onToggleWatch={() => toggleWatch(car.id)}
              bidAmount={bidAmounts[car.id] || ''}
              onBidAmountChange={(amount) => setBidAmounts(prev => ({ ...prev, [car.id]: amount }))}
              onPlaceBid={() => placeBid(car.id)}
              formatTimeLeft={formatTimeLeft}
              getTimeColor={getTimeColor}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>

        {filteredAndSortedCars().length === 0 && (
          <div className="text-center py-12">
            <Gavel className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No auctions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface AuctionCardProps {
  car: AuctionCar;
  isLiked: boolean;
  isWatched: boolean;
  onToggleLike: () => void;
  onToggleWatch: () => void;
  bidAmount: string;
  onBidAmountChange: (amount: string) => void;
  onPlaceBid: () => void;
  formatTimeLeft: (seconds: number) => string;
  getTimeColor: (seconds: number) => string;
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  car,
  isLiked,
  isWatched,
  onToggleLike,
  onToggleWatch,
  bidAmount,
  onBidAmountChange,
  onPlaceBid,
  formatTimeLeft,
  getTimeColor,
  getCategoryIcon,
  getCategoryColor
}) => {
  const [showBidForm, setShowBidForm] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image and Status */}
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(car.category)}`}>
            {getCategoryIcon(car.category)}
            <span className="ml-1 capitalize">{car.category.replace('-', ' ')}</span>
          </span>
          
          {car.isLive && (
            <span className="inline-flex items-center bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
              LIVE
            </span>
          )}
          
          {car.isHot && (
            <span className="inline-flex items-center bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              🔥 HOT
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={onToggleLike}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={onToggleWatch}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
          >
            <Eye className={`h-4 w-4 ${isWatched ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Timer */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
          <div className="flex items-center text-sm font-medium">
            <Timer className="h-3 w-3 mr-1" />
            <span className={getTimeColor(car.timeLeft)}>
              {formatTimeLeft(car.timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Car Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {car.year} {car.make} {car.model}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{car.location}</span>
              <span className="mx-2">•</span>
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Current Bid</div>
            <div className="font-bold text-lg text-[#f78f37]">
              SAR {car.currentBid.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Bid Range */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Min Bid: SAR {car.minBid.toLocaleString()}</span>
            <span className="text-gray-600">Max Bid: SAR {car.maxBid.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#f78f37] h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((car.currentBid - car.minBid) / (car.maxBid - car.minBid)) * 100}%` 
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Reserve: SAR {car.reservePrice.toLocaleString()}</span>
            <span className={car.isReserveMetr ? 'text-green-600 font-medium' : ''}>
              {car.isReserveMetr ? 'Reserve Met' : 'Reserve Not Met'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="font-semibold text-sm">{car.totalBids}</div>
            <div className="text-xs text-gray-500">Bids</div>
          </div>
          <div>
            <div className="font-semibold text-sm">{car.watchers}</div>
            <div className="text-xs text-gray-500">Watching</div>
          </div>
          <div className="flex items-center justify-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-semibold text-sm">{car.sellerRating}</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="text-xs text-gray-600 mb-4">
          <div className="flex items-center justify-between">
            <span>Seller: {car.seller}</span>
            <span>Last bid: {car.lastBidTime}</span>
          </div>
        </div>

        {/* Bidding Section */}
        {!showBidForm ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowBidForm(true)}
              className="flex-1 bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105"
            >
              Place Bid
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => onBidAmountChange(e.target.value)}
                  placeholder={`Min: ${car.currentBid + 1000}`}
                  min={car.currentBid + 1000}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f78f37] focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={onPlaceBid}
                disabled={!bidAmount || parseFloat(bidAmount) <= car.currentBid}
                className="bg-[#f78f37] hover:bg-[#e67d26] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Bid
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onBidAmountChange((car.currentBid + 1000).toString())}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded"
              >
                +1K
              </button>
              <button
                onClick={() => onBidAmountChange((car.currentBid + 5000).toString())}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded"
              >
                +5K
              </button>
              <button
                onClick={() => onBidAmountChange((car.currentBid + 10000).toString())}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded"
              >
                +10K
              </button>
              <button
                onClick={() => setShowBidForm(false)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs py-1 px-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auction;