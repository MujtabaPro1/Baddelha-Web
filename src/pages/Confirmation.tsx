import React, { useEffect, useState } from 'react';
import { Check, Calendar, MapPin, Clock, Car, Phone, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingDetails {
    branch: string;
    date: string;
    time: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

interface CarDetails {
    make: string;
    model: string;
    year: string;
    price: string;
    image: string;
}

const Confirmation = () => {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        branch: 'Riyadh Main Branch',
        date: '2025-06-05',
        time: '10:30 AM',
        firstName: 'John',
        lastName: 'Doe',
        phone: '555-123-4567',
        email: 'john.doe@example.com'
    });

    const [carDetails, setCarDetails] = useState<CarDetails>({
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        price: '75,000',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    });

    // In a real application, you would fetch this data from localStorage, context, or an API
    useEffect(() => {
        // Example of retrieving data from localStorage
        const storedBookingDetails = localStorage.getItem('bookingDetails');
        const storedCarDetails = localStorage.getItem('carDetails');
        
        if (storedBookingDetails) {
            setBookingDetails(JSON.parse(storedBookingDetails));
        }
        
        if (storedCarDetails) {
            setCarDetails(JSON.parse(storedCarDetails));
        }
    }, []);

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="max-w-5xl mt-[120px] mx-auto px-4 py-8">
            {/* Success Message */}
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 flex items-center shadow-md">
                <div className="bg-green-500 rounded-full p-2 mr-4">
                    <Check className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Booking Confirmed!</h2>
                    <p>Your car inspection appointment has been successfully scheduled.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Car Details */}
                <div className="md:col-span-1">
                    <div className="bg-[#3d3d40] text-white p-4 rounded-t-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Your vehicle market price</p>
                                <h3 className="text-3xl font-bold">SAR {carDetails.price}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-b-lg shadow-md">
                        <img 
                            src={carDetails.image} 
                            alt={`${carDetails.make} ${carDetails.model}`} 
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <div className="flex items-center mb-2">
                            <Car className="h-5 w-5 mr-2 text-gray-500" />
                            <span className="font-medium">{carDetails.year} {carDetails.make} {carDetails.model}</span>
                        </div>
                    </div>
                </div>

                {/* Appointment Details */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">Appointment Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                <div>
                                    <p className="font-medium">Branch</p>
                                    <p className="text-gray-600">{bookingDetails.branch}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Calendar className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                <div>
                                    <p className="font-medium">Date</p>
                                    <p className="text-gray-600">{formatDate(bookingDetails.date)}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Clock className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                <div>
                                    <p className="font-medium">Time</p>
                                    <p className="text-gray-600">{bookingDetails.time}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <User className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                <div>
                                    <p className="font-medium">Name</p>
                                    <p className="text-gray-600">{bookingDetails.firstName} {bookingDetails.lastName}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Phone className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-gray-600">{bookingDetails.phone}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Mail className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-gray-600">{bookingDetails.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-600 mb-2">A confirmation email has been sent to your email address.</p>
                        <p className="text-sm text-gray-600">If you need to reschedule or cancel your appointment, please contact our customer service.</p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Link to="/" className="bg-[#f78f37] hover:bg-[#e67d26] text-white font-bold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#f78f37] focus:ring-opacity-50 shadow-md">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* What to Expect Section */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                        <div className="bg-[#f78f37] w-10 h-10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-white font-bold">1</span>
                        </div>
                        <h4 className="font-bold mb-2">Arrival</h4>
                        <p className="text-sm text-gray-600">Please arrive 10 minutes before your scheduled appointment. Bring your vehicle registration and ID.</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="bg-[#f78f37] w-10 h-10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-white font-bold">2</span>
                        </div>
                        <h4 className="font-bold mb-2">Inspection</h4>
                        <p className="text-sm text-gray-600">Our experts will conduct a comprehensive inspection of your vehicle, which takes approximately 30-45 minutes.</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="bg-[#f78f37] w-10 h-10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-white font-bold">3</span>
                        </div>
                        <h4 className="font-bold mb-2">Results</h4>
                        <p className="text-sm text-gray-600">You'll receive a detailed report and our final offer for your vehicle, with no obligation to sell.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
