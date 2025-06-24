import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import Logo from '../logo-light.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">
                <img src={Logo} alt="Baddelha Logo" 
                className="w-[150px] h-[70px] object-cover"
                />
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              BADDELHA |
بدلها is your trusted partner for all car-related services. 
              From buying and selling to valuation and financing, we make the process 
              simple, transparent, and enjoyable.
            </p>
            <div className="flex space-x-4 mb-6">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-800 p-2 rounded-full transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Buy a Car', 'Sell Your Car', 'Trade-In', 'Car Valuation', 'Financing Options'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-3">
              {['Our Story', 'How It Works', 'Testimonials', 'Careers', 'Press', 'Blog'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <p>123 Market Street</p>
              <p>San Francisco, CA 94103</p>
              <p>United States</p>
              <p className="pt-2">
                <a href="tel:+18003765432" className="hover:text-amber-500 transition">
                  800-DRIVE-123
                </a>
              </p>
              <p>
                <a href="mailto:info@drivemarket.com" className="hover:text-amber-500 transition flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@drivemarket.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BADDELHA |
بدلها. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-amber-500 transition">Terms of Service</a>
              <a href="#" className="hover:text-amber-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition">Cookie Policy</a>
              <a href="#" className="hover:text-amber-500 transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;