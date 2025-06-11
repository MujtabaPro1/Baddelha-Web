import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  featured?: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    price: 42999,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    featured: true
  },
  {
    id: 2,
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 48500,
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 8000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    featured: true
  },
  {
    id: 3,
    make: 'Audi',
    model: 'A4',
    year: 2021,
    price: 39999,
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 22000,
    fuelType: 'Gasoline',
    transmission: 'Automatic'
  },
  {
    id: 4,
    make: 'Lexus',
    model: 'ES',
    year: 2022,
    price: 45800,
    image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 18500,
    fuelType: 'Hybrid',
    transmission: 'Automatic'
  },
  {
    id: 5,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 52999,
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mileage: 5000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    featured: true
  }
];

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`} 
          className="w-full h-56 object-cover"
        />
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        
        {car.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{car.make} {car.model}</h3>
            <p className="text-gray-500 text-sm">{car.year}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-blue-800">${car.price.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">Est. $499/mo</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex items-center text-gray-700">
            <span className="font-medium">Mileage:</span>
            <span className="ml-1">{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="font-medium">Fuel:</span>
            <span className="ml-1">{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="font-medium">Transmission:</span>
            <span className="ml-1">{car.transmission}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-5">
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full transition">
            View Details
          </button>
          <button className="border border-blue-800 text-blue-800 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition flex items-center justify-center">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedCars: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + cardsToShow >= cars.length ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, cars.length - cardsToShow) : prevIndex - 1
    );
  };
  
  const visibleCars = cars.slice(currentIndex, currentIndex + cardsToShow);
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Featured Cars</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Find Your Perfect Match</h2>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={prevSlide}
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        {/* For mobile */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.filter(car => car.featured).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold py-3 px-6 rounded-lg transition">
            View All Cars
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;