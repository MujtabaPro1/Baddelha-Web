import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Step3 = () => {
    const [branch, setBranch] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [revealPrice,setRevealPrice] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Process form data and handle booking
        console.log('Booking submitted with:', { branch, date, time, firstName, lastName, phone, email });
        // Here you would typically send the data to your backend
        window.location.href = '/confirmation';
    };

    return (
        <div className="max-w-5xl mt-[120px] mx-auto px-4 py-8">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: '100%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#f78f37]"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-center">
                            <div className="w-10 h-10 mx-auto rounded-full bg-[#f78f37] flex items-center justify-center">
                                <Check className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-2 font-medium text-[#f78f37]">SELECT</div>
                        </div>
                        <div className="text-center">
                            <div className="w-10 h-10 mx-auto rounded-full bg-[#f78f37] flex items-center justify-center">
                                <Check className="h-6 w-6 text-white" />
                            </div>
                            <div className="mt-2 font-medium text-[#f78f37]">CONDITION</div>
                        </div>
                        <div className="text-center">
                            <div className="w-10 h-10 mx-auto rounded-full bg-[#f78f37] flex items-center justify-center">
                                <div className="h-3 w-3 bg-white rounded-full"></div>
                            </div>
                            <div className="mt-2 font-medium text-[#f78f37]">BOOK</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Success Message */}
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Only 1 step left! 319 slots taken. Secure yours now. 2:41</span>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">Book a FREE car inspection now!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Car Image & Price */}
                <div className="md:col-span-1">
                    <div className="bg-[#3d3d40] text-white p-4 rounded-t-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Your vehicle market price</p>
                                <h3 className="text-3xl font-bold flex items-center animate-pulse">SAR
                                {revealPrice ? ' 75,000' : 
                                  <button
                                    onClick={()=>{
                                        setRevealPrice(true);
                                    }}
                                    className="bg-[#f78f37] ml-2 mr-2 text-xs px-3 py-1 rounded hover:bg-yellow-600 transition">
                                        REVEAL PRICE
                                    </button>
                                }
                                </h3>
                            </div>
                           
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-b-lg shadow-md">
                        <img 
                            src="https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                            alt="Car" 
                            className="w-full h-auto rounded-lg mb-4" 
                        />
                        <div className="text-sm text-gray-600">
                            <p className="flex items-center mb-2">
                                <span className="mr-2">✓</span> Extra cash no hassle. 100% free.
                            </p>
                            <p className="flex items-center mb-2">
                                <span className="mr-2">✓</span> You might get more cash, if your car has special equipment.
                            </p>
                            <p className="flex items-center mb-2">
                                <span className="mr-2">✓</span> Instant payment, no paperwork hassle. We buy ANY car, even if it is financed.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Right Column - Booking Form */}
                <div className="md:col-span-2 bg-[#eaeaea] p-6 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        {/* Branch Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Branches</label>
                            <div className="relative">
                                <select
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 py-3 px-4 pr-8 focus:border-blue-500 focus:ring-blue-500 appearance-none bg-white"
                                    required
                                >
                                    <option value="">Select a branch</option>
                                    <option value="riyadh-tahlia">Riyadh - Tahlia Street</option>
                                    <option value="riyadh-olaya">Riyadh - Olaya</option>
                                    <option value="jeddah-main">Jeddah - Main Branch</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            {branch && (
                                <p className="text-xs mt-1">8485 Prince Muhammad bin Abd Al Aziz, As Sulimaniyah, 3545, Riyadh 12223</p>
                            )}
                        </div>
                        
                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Time</label>
                                <div className="relative">
                                    <select
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 py-3 px-4 pr-8 focus:border-blue-500 focus:ring-blue-500 appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select time</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    className="block w-full rounded-lg border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className="block w-full rounded-lg border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Mobile */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Mobile</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                                    +966
                                </span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone Number"
                                    className="block w-full rounded-r-lg border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                className="block w-full rounded-lg border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                required
                            />
                            <p className="text-xs mt-1 flex items-center">
                                <span className="inline-block w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs mr-1">i</span>
                                You'll receive new updates on your appointment and vehicle status
                            </p>
                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 shadow-md mt-4"
                        >
                            BOOK APPOINTMENT
                        </button>
                    </form>
                    
                    <div className="mt-4 text-xs text-gray-700">
                        <p>By continuing you agree to the <a href="#" className="underline">Terms and Conditions</a> and <a href="#" className="underline">Privacy Policy</a></p>
                        <p className="mt-1">This site is protected by reCAPTCHA and the Google <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms and Conditions</a> apply.</p>
                    </div>
                </div>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-sm text-gray-600">
                <h3 className="font-bold mb-2">DISCLAIMER</h3>
                <p className="mb-2">These are the assumptions we have made for your vehicle before going into an in-office valuation:</p>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>It doesn't have major cosmetic or mechanical damage, or an accident history.</li>
                    <li>It has a clean title with no liens or loans.</li>
                    <li>It is in a marketable condition, including interior and mechanical.</li>
                    <li>It isn't a non-runner.</li>
                </ol>
                <p className="mt-2">If our assumptions do not apply, this final offer might vary from your online valuation, but we may still buy your car! (Guaranteed)</p>
            </div>
        </div>
    );
};

export default Step3;
