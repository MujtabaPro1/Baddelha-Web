import React from 'react';
import { Award, Users, Globe, TrendingUp, Shield, Clock } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-[60px]">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About BADDELHA</h1>
          <p className="text-xl text-gray-600 mb-8">
            Premium Car Marketplace in the Middle East
          </p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </p>
          <div className="flex justify-center">
           
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Our Mission</h2>
          <p className="text-gray-600 mb-6 text-center">
            Donec vestibulum justo a diam ultricies pellentesque. Quisque mattis diam vel lacus tincidunt elementum. Sed vitae adipiscing turpis. Aenean ligula nibh, molestie id viverra a, dapibus at dolor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="text-center">
              <div className="bg-[#F79626] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Quality</h3>
              <p className="text-gray-600">
                In mollis pretium lorem a pretium. Nullam at justo elit. Vivamus sit amet sapien eget eros iaculis rhoncus.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F79626] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Trust</h3>
              <p className="text-gray-600">
                Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F79626] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Innovation</h3>
              <p className="text-gray-600">
                Nam at est in risus facilisis eleifend eget ut augue. Phasellus at est in tellus facilisis ullamcorper id in ante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="BADDELHA History" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-600">
                Aliquam mauris arcu, tristique a lobortis vitae, condimentum feugiat lectus. Sed in eros ut magna ultricies mattis sed et dolor. Morbi ut arcu dolor. Maecenas id nulla nec nibh viverra vehicula.
              </p>
              <p className="text-gray-600">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
              <p className="text-gray-600">
                Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Our Leadership Team</h2>
          <p className="text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team Member" 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1 text-gray-800">Abdullah Al-Fahad</h3>
              <p className="text-[#F79626] mb-3">Chief Executive Officer</p>
              <p className="text-gray-600 mb-4">
                Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi. Pellentesque fermentum dolor.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team Member" 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1 text-gray-800">Sara Al-Qahtani</h3>
              <p className="text-[#F79626] mb-3">Chief Operations Officer</p>
              <p className="text-gray-600 mb-4">
                Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team Member" 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1 text-gray-800">Mohammed Al-Harbi</h3>
              <p className="text-[#F79626] mb-3">Chief Technology Officer</p>
              <p className="text-gray-600 mb-4">
                Aliquam tincidunt mauris eu risus. Vestibulum facilisis, purus nec pulvinar iaculis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">BADDELHA by the Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#F79626] mb-2">10,000+</div>
              <p className="text-[#F79626]">Cars Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#F79626] mb-2">5,000+</div>
              <p className="text-[#F79626]">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#F79626] mb-2">15+</div>
              <p className="text-gray-600">Cities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#F79626] mb-2">24/7</div>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Our Values</h2>
          <p className="text-gray-600 mb-10 text-center">
            Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-[#F79626] p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Customer First</h3>
                <p className="text-gray-600">
                  Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
            <div className="bg-[#F79626] p-3 rounded-full mr-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Sustainability</h3>
                <p className="text-gray-600">
                  Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F79626] p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Efficiency</h3>
                <p className="text-gray-600">
                  Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#F79626] p-3 rounded-full mr-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Excellence</h3>
                <p className="text-gray-600">
                  Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;