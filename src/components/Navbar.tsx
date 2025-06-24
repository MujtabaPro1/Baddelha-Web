import React, { useState, useEffect } from 'react';
import { Car, Menu, X, Search, Phone } from 'lucide-react';
import { Link } from './ui/Link';
import Logo from '../logo.png';
import LogoLight from '../logo-light.png';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : window.location.pathname != '/' ? 'bg-[#3d3d40] py-4' :  'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <span
              onClick={() => window.location.href = '/'}
              className={`ml-2 text-xl font-bold ${isScrolled ? 'text-[#3d3d40]' : 'text-white'} cursor-pointer`}>
               <img src={!isScrolled ? LogoLight : Logo} alt="Baddelha Logo" 
               className="w-[150px] h-[50px] object-cover"
               />
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/buy" className={`transition ${isScrolled ? 'text-[#3d3d40]' : 'text-white'}`}>Buy</Link>
              <Link href="/trade-in" className={`transition ${isScrolled ? 'text-[#3d3d40]' : 'text-white'}`}>Trade-In</Link>
              <Link href="/auction" className={`transition ${isScrolled ? 'text-[#3d3d40]' : 'text-white'}`}>Auction</Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search cars..." 
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className={`flex items-center ${isScrolled ? 'text-[#3d3d40]' : 'text-white'}`}>
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">800-DRIVE-123</span>
            </div>
            <button
            onClick={() => window.location.href = '/login'}
            className="bg-[#f78f37] hover:bg-[#f78f37] text-white px-5 py-2 rounded-full transition transform hover:scale-105">
              Sign In
            </button>
          </div>
          
          <button 
            className="md:hidden text-blue-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 p-4 transition-transform">
          <nav className="flex flex-col space-y-4 py-4">
            <Link href="/buy" className="transition hover:text-blue-600">Buy</Link>
            <Link href="/trade-in" className="transition hover:text-blue-600">Trade-In</Link>
            <Link href="/auction" className="transition hover:text-blue-600">Auction</Link>
          </nav>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search cars..." 
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex items-center text-[#3d3d40] hover:text-[#f78f37] mt-4">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">800-DRIVE-123</span>
            </div>
            <button className="mt-4 w-full bg-blue-800 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition transform hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;