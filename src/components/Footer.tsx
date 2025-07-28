import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import Logo from '../logo-light.png';
import { useLanguage } from '../contexts/LanguageContext';
import lang from '../locale';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const languageContent = language === 'ar' ? 'ar' : 'en';
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
              {lang[languageContent].footerText}
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
            <h3 className="font-semibold text-lg mb-4">{lang[languageContent].quickLinks}</h3>
            <ul className="space-y-3">
              {[lang[languageContent].buy, lang[languageContent].sell, lang[languageContent].tradeIn, lang[languageContent].carValuation].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{lang[languageContent].legal}</h3>
            <ul className="space-y-3">
              {[lang[languageContent].aboutUs, lang[languageContent].contactUs, lang[languageContent].privacyPolicy, lang[languageContent].termsOfService].map((link, index) => (
                <li key={index}>
                  <a href={index == 0 ? "/about-us" : index == 1 ? "/contact-us" : index == 2 ? "/privacy" : "/terms"} className="text-gray-400 hover:text-amber-500 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{lang[languageContent].contactUs}</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <p>{lang[languageContent].address}</p>
              <p>{lang[languageContent].address1}</p>
              <p>{lang[languageContent].address2}</p>
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
              <a href="/terms" className="hover:text-amber-500 transition">{lang[languageContent].termsOfService}</a>
              <a href="/privacy" className="hover:text-amber-500 transition">{lang[languageContent].privacyPolicy}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;