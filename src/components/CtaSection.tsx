import React from 'react';
import { Phone, Mail, ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 mb-8 max-w-lg">
                Whether you're looking to buy, sell, or trade-in, our team is here to help you every step of the way. 
                Contact us today to get the process started.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition">
                  <Phone className="h-5 w-5 text-amber-400 mr-3" />
                  <span className="text-white font-medium">800-DRIVE-123</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition">
                  <Mail className="h-5 w-5 text-amber-400 mr-3" />
                  <span className="text-white font-medium">support@drivemarket.com</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-500 hover:bg-amber-400 text-blue-900 font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 flex items-center justify-center">
                  Schedule Appointment <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-[url('https://images.pexels.com/photos/3849554/pexels-photo-3849554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center min-h-[300px] md:min-h-0">
              <div className="h-full w-full bg-blue-900/30 backdrop-blur-sm p-10 md:p-12 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Get a Free Car Valuation</h3>
                  <p className="text-blue-100 mb-6">
                    Discover your car's true value in under 2 minutes with our instant valuation tool.
                  </p>
                  <button className="w-full bg-white hover:bg-gray-100 text-blue-800 font-semibold py-3 px-6 rounded-lg transition">
                    Start Free Valuation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;