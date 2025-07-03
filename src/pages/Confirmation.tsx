import React, { useEffect, useState } from 'react';
import { Check, Calendar, MapPin, Clock, Car, Phone, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

interface BookingDetails {
    branch: string;
    date: string;
    time: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    bookingId?: string;
}

interface CarDetails {
    make: string;
    model: string;
    year: string;
    price: string;
    image: string;
}

interface ApiBookingResponse {
    id: string;
    branch: string;
    appointmentDate: string;
    appointmentTime: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    price?: string;
    status: string;
}

const Confirmation = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        branch: '',
        date: '',
        time: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        bookingId: ''
    });

    const [carDetails, setCarDetails] = useState<CarDetails>({
        make: '',
        model: '',
        year: '',
        price: '',
        image: ''
    });

    useEffect(() => {
        const fetchBookingData = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Get data from localStorage first
                const storedBookingDetails = localStorage.getItem('bookingDetails');
                const storedCarDetails = localStorage.getItem('carDetails');
                
                if (storedBookingDetails) {
                    const parsedBookingDetails = JSON.parse(storedBookingDetails);
                    setBookingDetails(parsedBookingDetails);
                    
                    // If we have a booking ID, try to fetch the latest details from API
                    if (parsedBookingDetails.bookingId) {
                        try {
                            const response = await axiosInstance.get(`/api/1.0/book-appointment/${parsedBookingDetails.bookingId}`);
                            const apiData: ApiBookingResponse = response.data;
                            
                            // Update with the latest data from API
                            setBookingDetails(prev => ({
                                ...prev,
                                branch: apiData.branch || prev.branch,
                                date: apiData.appointmentDate || prev.date,
                                time: apiData.appointmentTime || prev.time,
                                firstName: apiData.firstName || prev.firstName,
                                lastName: apiData.lastName || prev.lastName,
                                phone: apiData.phone || prev.phone,
                                email: apiData.email || prev.email
                            }));
                            
                            // Update car price if available from API
                            if (apiData.price && storedCarDetails) {
                                const parsedCarDetails = JSON.parse(storedCarDetails);
                                setCarDetails({
                                    ...parsedCarDetails,
                                    price: apiData.price
                                });
                            }
                        } catch (apiError) {
                            console.warn('Could not fetch latest booking details from API:', apiError);
                            // Continue with localStorage data
                        }
                    }
                } else {
                    setError('Booking details not found. Please try booking again.');
                }
                
                if (storedCarDetails && !error) {
                    setCarDetails(JSON.parse(storedCarDetails));
                }
            } catch (err) {
                console.error('Error loading confirmation data:', err);
                setError('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };
        
        fetchBookingData();
    }, []);

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="max-w-5xl mt-[120px] mx-auto px-4 py-8">
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f78f37] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your booking details...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                    <div className="mt-4">
                        <Link to="/" className="bg-[#f78f37] hover:bg-[#e67d26] text-white font-bold py-2 px-4 rounded-lg transition">
                            Return to Home
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Success Message */}
                    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 flex items-center shadow-md">
                        <div className="bg-green-500 rounded-full p-2 mr-4">
                            <Check className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Booking Confirmed!</h2>
                            <p>Your car inspection appointment has been successfully scheduled.</p>
                            {bookingDetails.bookingId && (
                                <p className="text-sm mt-1">Booking ID: {bookingDetails.bookingId}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Car Details */}
                        <div className="md:col-span-1">
                            <div className="bg-[#3d3d40] text-white p-4 rounded-t-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm">Your vehicle market price</p>
                                        <h3 className="text-3xl font-bold">SAR {carDetails.price || 'N/A'}</h3>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-b-lg shadow-md">
                                {carDetails.image ? (
                                    <img 
                                        src={carDetails.image} 
                                        alt={`${carDetails.make} ${carDetails.model}`} 
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                                        <Car className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                                <div className="flex items-center mb-2">
                                    <Car className="h-5 w-5 mr-2 text-gray-500" />
                                    <span className="font-medium">
                                        {carDetails.year ? `${carDetails.year} ` : ''}
                                        {carDetails.make ? `${carDetails.make} ` : ''}
                                        {carDetails.model || 'Vehicle'}
                                    </span>
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
                                            <p className="text-gray-600">{bookingDetails.branch || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <Calendar className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                        <div>
                                            <p className="font-medium">Date</p>
                                            <p className="text-gray-600">
                                                {bookingDetails.date ? formatDate(bookingDetails.date) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <Clock className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                        <div>
                                            <p className="font-medium">Time</p>
                                            <p className="text-gray-600">{bookingDetails.time || 'Not specified'}</p>
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
                                            <p className="text-gray-600">
                                                {bookingDetails.firstName || ''} {bookingDetails.lastName || ''}
                                                {!bookingDetails.firstName && !bookingDetails.lastName && 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <Phone className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-gray-600">{bookingDetails.phone || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <Mail className="h-5 w-5 mr-3 text-[#f78f37] mt-0.5" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-gray-600">{bookingDetails.email || 'Not specified'}</p>
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
                </>
            )}
        </div>
    );    
};

export default Confirmation;
