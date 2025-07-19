import React, { useState, useEffect } from 'react';
import { Check, Phone as PhoneIcon, X } from 'lucide-react';
import axiosInstance from '../services/axiosInstance';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

const Step3 = () => {
    const [branch, setBranch] = useState('');
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [revealPrice, setRevealPrice] = useState(false);
    const [carPrice, setCarPrice] = useState<number | null>(null);
    const [carImage, setCarImage] = useState<string | null>(null);
    const [showPhoneVerification, setShowPhoneVerification] = useState(false);
    const [verificationPhone, setVerificationPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpError, setOtpError] = useState('');
    
    // State for branches from API
    const [branches, setBranches] = useState<{id: string; name: string; address: string}[]>([]);
    const [loadingBranches, setLoadingBranches] = useState(false);
    const [branchError, setBranchError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // State for branch timing slots
    type TimeSlot = {
        label: string;
    };
    
    type DaySchedule = {
        day: string;
        date: string;
        slots: TimeSlot[];
    };
    
    const [branchTimings, setBranchTimings] = useState<DaySchedule[]>([]);
    const [loadingTimings, setLoadingTimings] = useState(false);
    const [timingsError, setTimingsError] = useState('');
    
    // State for Step2 data
    const [step2Data, setStep2Data] = useState<{
        bodyType: string;
        engineSize: string;
        mileage: string;
        option: string;
        paint: string;
        gccSpecs: string;
    } | null>(null);

    // Load Step2 data from sessionStorage
    useEffect(() => {
        const storedStep2Data = sessionStorage.getItem('step2Data');
        if (storedStep2Data) {
            setStep2Data(JSON.parse(storedStep2Data));
        }
    }, []);
    
    // Fetch branches from API
    useEffect(() => {
        const fetchBranches = async () => {
            setLoadingBranches(true);
            setBranchError('');
            
            try {
                const response = await axiosInstance.get('/api/1.0/branch');
                setBranches(response?.data || []);
                if (response?.data?.length > 0) {
                    // Don't auto-select a branch, let user choose
                }
            } catch (err) {
                console.error('Error fetching branches:', err);
                setBranchError('Failed to load branches');
            } finally {
                setLoadingBranches(false);
            }
        };
        
        fetchBranches();
    }, []);
    
    // Fetch branch timings from API
    useEffect(() => {
        const fetchBranchTimings = async () => {
            if (!branch) return;
            
            setLoadingTimings(true);
            setTimingsError('');
            setSelectedDay(null);
            setSelectedTimeSlot(null);
            
            try {
                const response = await axiosInstance.get('/api/1.0/branch-timing');
                setBranchTimings(response?.data || []);
                if (response?.data?.length > 0) {
                    // Don't auto-select a day/time, let user choose
                }
            } catch (err) {
                console.error('Error fetching branch timings:', err);
                setTimingsError('Failed to load available time slots');
            } finally {
                setLoadingTimings(false);
            }
        };
        
        fetchBranchTimings();
    }, [branch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Get step1 data from sessionStorage if available
            const storedStep1Data = sessionStorage.getItem('carDetails');
            const step1Data = storedStep1Data ? JSON.parse(storedStep1Data) : {};
            
            // Format the appointment date and time
            // Find the selected day's date from branchTimings
            const selectedDayObj = branchTimings.find(day => day.day === selectedDay);
            
            if (!selectedDayObj || !selectedTimeSlot) {
                throw new Error('Please select both a day and time slot');
            }
            
            // Extract date parts from the selectedDayObj.date (format: "Jun 30")
            const [month, day] = selectedDayObj.date.split(' ');
            const currentYear = new Date().getFullYear();
            
            // Create a date string in ISO format
            const appointmentDate = new Date(`${month} ${day}, ${currentYear}`).toISOString();
            
            // Combine all car details from step1 and step2
            const carDetail = JSON.stringify({
                ...step1Data,
                ...step2Data,
                engineSize: step2Data.engineSizeName,
                mileage: step2Data.mileageName,
                carPrice: carPrice ? carPrice : 0,
            });
            
            // Prepare the request body
            const bookingData = {
                branchId: Number(branch),
                appointmentDate: appointmentDate,
                appointmentTime: appointmentDate, // Using the same date for now, would need proper time parsing
                firstName,
                lastName,
                phone,
                email,
                carDetail,
                status: 'Scheduled',
                type: 'sell'
            };

       
            
            // Make the API call
     
            const response = await axiosInstance.post('/api/1.0/book-appointment/', bookingData);
            
            // Store the response data in localStorage for the confirmation page
            localStorage.setItem('bookingDetails', JSON.stringify({
                branch: branches.find(b => b.id == branch)?.enName || '',
                date: appointmentDate,
                time: selectedTimeSlot,
                firstName,
                lastName,
                phone,
                email,
                bookingId: response.data?.id || '',
                carPrice: carPrice,
            }));
            
            // Store car details in localStorage
            if (step1Data && step2Data) {
                localStorage.setItem('carDetails', JSON.stringify({
                    make: step1Data.make || '',
                    model: step1Data.model || '',
                    year: step1Data.year || '',
                    price: carPrice,
                    image: step1Data.image || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb'
                }));
            }
            
            // Redirect to confirmation page
            window.location.href = '/confirmation';
            
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('There was an error submitting your booking. Please try again.');
        }
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
                                {revealPrice ? (carPrice ? ` ${carPrice.toLocaleString()}` : '') : 
                                  <button
                                    onClick={async ()=>{
                                        try {
                                            setIsLoading(true);
                                            // Sample car data - in a real app, you would get this from form inputs or state
                                            const storedStep1Data = sessionStorage.getItem('carDetails');
                                            const step1Data = storedStep1Data ? JSON.parse(storedStep1Data) : {};
                                            const step2 = sessionStorage.getItem('step2Data');
                                            const step2Data = step2 ? JSON.parse(step2) : {};
                                            const carData = {
                                                make: step1Data.make,
                                                model: step1Data.model,
                                                year: Number(step1Data.year),
                                                mileage: step2Data.mileageName,
                                                bodyType: step2Data.bodyTypeName,
                                                engineType: 'Petrol',
                                                engineSize: step2Data.engineSizeName,
                                                gearType: 'Manual',
                                            };
                                            const response = await axiosInstance.post('/api/1.0/core/evaluate/car', carData);
                                            
                                            if (response.data) {
                                                setCarPrice(response.data.estimatedPriceSAR);
                                                if (response.data.sampleImageUrl) {
                                                    setCarImage('https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=6');
                                                }
                                            }
                                            setRevealPrice(true);
                                            setIsLoading(false);
                                        } catch (error) {
                                            console.error('Error fetching car price:', error);
                                            setRevealPrice(true); // Still reveal the UI section even if API fails
                                            setIsLoading(false);
                                        }
                                    
                                    }}
                                    className="bg-[#f78f37] ml-2 mr-2 text-xs px-3 py-1 rounded hover:bg-yellow-600 transition w-[110px] mt-2 h-[40px] flex items-center justify-center">
                                        {!isLoading? 'REVEAL PRICE': 
                                        
                                        <div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>

                                        }
                                    </button>
                                }
                                </h3>
                            </div>
                           
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-b-lg shadow-md">
                        <img 
                            src={carImage || "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"} 
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
                                {loadingBranches ? (
                                    <div className="py-3 px-4 text-gray-500">Loading branches...</div>
                                ) : branchError ? (
                                    <div className="py-3 px-4 text-red-500">{branchError}</div>
                                ) : (
                                    <select
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 py-3 px-4 pr-8 focus:border-blue-500 focus:ring-blue-500 appearance-none bg-white"
                                        required
                                    >
                                        <option value="">Select a branch</option>
                                        {branches.map((branchItem) => (
                                            <option key={branchItem.id} value={branchItem.id}>
                                                {branchItem.enName}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Date and Time Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Select Day & Time</label>
                            
                            {loadingTimings ? (
                                <div className="text-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f78f37] mx-auto"></div>
                                    <p className="mt-2 text-sm text-gray-600">Loading available time slots...</p>
                                </div>
                            ) : timingsError ? (
                                <div className="text-red-500 text-sm py-2">{timingsError}</div>
                            ) : branchTimings.length === 0 && branch ? (
                                <div className="text-gray-500 text-sm py-2">No time slots available for this branch</div>
                            ) : branch ? (
                                <div>
                                    {/* Days selection */}
                                    <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                                        {branchTimings.map((daySchedule, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedDay(daySchedule.day);
                                                    setSelectedTimeSlot(null);
                                                }}
                                                className={`flex-shrink-0 px-4 py-2 rounded-lg border ${
                                                    selectedDay === daySchedule.day
                                                        ? 'bg-[#f78f37] text-white border-[#f78f37]'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#f78f37]'
                                                }`}
                                            >
                                                <div className="text-center">
                                                    <div className="font-medium">{daySchedule.day}</div>
                                                    <div className="text-xs">{daySchedule.date}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Time slots */}
                                    {selectedDay && (
                                        <div>
                                            <h4 className="text-sm font-medium mb-2">Available Time Slots</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                                {branchTimings
                                                    .find(day => day.day === selectedDay)
                                                    ?.slots.map((slot, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => setSelectedTimeSlot(slot.label)}
                                                            className={`px-3 py-2 text-sm rounded-lg border ${
                                                                selectedTimeSlot === slot.label
                                                                    ? 'bg-[#f78f37] text-white border-[#f78f37]'
                                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#f78f37]'
                                                            }`}
                                                        >
                                                            {slot.label}
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm py-2">Please select a branch first</div>
                            )}
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
            
            {/* Phone Verification Modal */}
            {showPhoneVerification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                        <button 
                            onClick={() => setShowPhoneVerification(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        
                        <div className="text-center mb-6">
                            <div className="bg-orange-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <PhoneIcon className="h-8 w-8 text-[#f78f37]" />
                            </div>
                            <h3 className="text-xl font-bold">{otpVerified ? 'Verification Successful!' : (otpSent ? 'Enter Verification Code' : 'Verify Your Phone Number')}</h3>
                            <p className="text-gray-600 mt-1">
                                {otpVerified ? 'Thank you for verifying your phone number.' : 
                                 (otpSent ? 'We sent a 6-digit code to your phone.' : 'To reveal your vehicle price, please verify your phone number.')}
                            </p>
                        </div>
                        
                        {!otpVerified && (
                            <div>
                                {!otpSent ? (
                                    <div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1">Mobile Number</label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                                                    +966
                                                </span>
                                                <input
                                                    type="tel"
                                                    value={verificationPhone}
                                                    onChange={(e) => setVerificationPhone(e.target.value)}
                                                    placeholder="Phone Number"
                                                    className="block w-full border-2 rounded-r-lg border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (verificationPhone.trim()) {
                                                    // Simulate sending OTP
                                                    setOtpSent(true);
                                                    setOtpError('');
                                                    // In a real app, you would call an API to send the OTP
                                                }
                                            }}
                                            className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#f78f37] focus:ring-opacity-50 shadow-md"
                                        >
                                            Send Verification Code
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium mb-3 text-center">Enter the 6-digit code</label>
                                            <InputOTP
                                                maxLength={6}
                                                value={otp}
                                                onChange={(value: string) => setOtp(value)}
                                                containerClassName="justify-center gap-2"
                                            >
                                                <InputOTPGroup className="gap-2">
                                                    <InputOTPSlot index={0} className="rounded-md border-gray-300" />
                                                    <InputOTPSlot index={1} className="rounded-md border-gray-300" />
                                                    <InputOTPSlot index={2} className="rounded-md border-gray-300" />
                                                    <InputOTPSlot index={3} className="rounded-md border-gray-300" />
                                                    <InputOTPSlot index={4} className="rounded-md border-gray-300" />
                                                    <InputOTPSlot index={5} className="rounded-md border-gray-300" />
                                                </InputOTPGroup>
                                            </InputOTP>
                                            {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
                                        </div>
                                        
                                        <div className="flex flex-col space-y-3">
                                            <button
                                                onClick={() => {
                                                    // Simulate OTP verification
                                                    if (otp.length === 6) {
                                                        // For demo, we'll accept any 6-digit code
                                                        // In a real app, you would verify this with your backend
                                                        setOtpVerified(true);
                                                        setOtpError('');
                                                        // Set the phone number for the booking form
                                                        setPhone(verificationPhone);
                                                    } else {
                                                        setOtpError('Please enter a valid 6-digit code');
                                                    }
                                                }}
                                                className="bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#f78f37] focus:ring-opacity-50 shadow-md"
                                            >
                                                Verify Code
                                            </button>
                                            
                                            <button
                                                onClick={() => {
                                                    // Resend OTP logic would go here
                                                    setOtp('');
                                                    setOtpError('');
                                                }}
                                                className="text-[#f78f37] hover:text-[#e67d26] text-sm font-medium"
                                            >
                                                Resend Code
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {otpVerified && (
                            <div className="mt-6">
                                <button
                                    onClick={() => {
                                        setShowPhoneVerification(false);
                                        setRevealPrice(true);
                                    }}
                                    className="w-full bg-[#f78f37] hover:bg-[#e67d26] text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#f78f37] focus:ring-opacity-50 shadow-md"
                                >
                                    View Your Vehicle Price
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
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
