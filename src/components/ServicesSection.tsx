import React from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  Repeat, 
  FileText, 
  Clock, 
  Sparkles, 
  ThumbsUp, 
  Heart 
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  btnColor: string;
  btnText: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  bgColor, 
  textColor,
  btnColor,
  btnText
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-6 transition-transform hover:scale-105 shadow-md`}>
      <div className={`${textColor} p-3 rounded-full inline-block bg-white/10 mb-4`}>
        {icon}
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>{title}</h3>
      <p className={`mb-5 ${textColor} opacity-90`}>{description}</p>
      <button className={`${btnColor} font-medium py-2 px-4 rounded-lg transition hover:opacity-90`}>
        {btnText}
      </button>
    </div>
  );
};

const services = [
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Buy a Car",
    description: "Browse thousands of certified pre-owned and new cars with complete history and inspection reports.",
    bgColor: "bg-[#3d3d40]",
    textColor: "text-white",
    btnColor: "bg-amber-400 text-blue-900",
    btnText: "Browse Cars"
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Sell Your Car",
    description: "Get the best offer for your car in minutes. Free pickup and same-day payment available.",
    bgColor: "bg-amber-500",
    textColor: "text-blue-900",
    btnColor: "bg-blue-800 text-white",
    btnText: "Get an Offer"
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "Trade-In",
    description: "Compare trade-in offers and get the best value when upgrading to your next vehicle.",
    bgColor: "bg-gray-800",
    textColor: "text-white",
    btnColor: "bg-amber-400 text-gray-900",
    btnText: "Trade Now"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Bank Valuation",
    description: "Get official bank-approved car valuation for financing, insurance, or legal requirements.",
    bgColor: "bg-[#3d3d40]",
    textColor: "text-white",
    btnColor: "bg-amber-400 text-blue-900",
    btnText: "Get Valuation"
  }
];

const features = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Fast Process",
    description: "Complete transactions in as little as 30 minutes"
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Premium Service",
    description: "Dedicated concierge to assist you every step of the way"
  },
  {
    icon: <ThumbsUp className="h-5 w-5" />,
    title: "Best Value",
    description: "Competitive prices and exclusive financing options"
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "100% Satisfaction",
    description: "30-day money-back guarantee on all purchases"
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Everything You Need for Your Car</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DriveMarket provides comprehensive automotive services to make your car buying, 
            selling, and ownership experience seamless and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold">Why Choose DriveMarket?</h3>
            <p className="text-gray-600 mt-2">Experience the difference with our premium car services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;