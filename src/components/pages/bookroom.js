import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context.js/context';
import { Hotel, Clock, CreditCard, Loader2, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';


const BookingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [checkInType, setCheckInType] = useState('Hotel');
  const [showConfetti, setShowConfetti] = useState(false);
  const { id } = useParams();
  const { profile } = useAuth();
  const bookingroomid = id;
  



  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/hotelroutes/roomdetails_related_to_hotel/${id}`
        );

        if (response.status === 200) {
          setRoomDetails(response.data);
        } else {
          setMessage('Failed to fetch room details.');
        }
      } catch (error) {
        console.error('Error fetching room details:', error.message);
        setMessage('Error fetching room details.');
      }
    };

    fetchRoomDetails();
  }, [id]);

  // Effect to handle confetti duration
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Confetti will show for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleBooking = async () => {
    setMessage('');
    setIsLoading(true);

    try {
      const bookingResponse = await axios.put(
        `http://localhost:4000/hotelroutes/booksingleroom/${id}`,
        { CheckInType: checkInType },
        { withCredentials: true }
      );

      if (bookingResponse.status === 200) {
        setIsBooked(true);
        setMessage('Booking confirmed!');
        setShowConfetti(true); // Trigger confetti on successful booking
      } else {
        setMessage('Booking failed.');
      }
    } catch (error) {
      console.error('Booking Error:', error);
      setMessage(`Error during booking: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex items-center justify-center relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#ffd700', // Yellow
            '#ffffff', // White
            '#ffa500', // Orange
            '#ff4500', // Red-Orange
            '#ff69b4']}
        />
      )}

      <div className="w-full max-w-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#f0a500] to-amber-500 bg-clip-text text-transparent mb-2">
            Book Your Stay
          </h1>
          {roomDetails && (
            <span className="inline-block px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm">
              {roomDetails.allroomdata.hotelname}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {roomDetails ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <Hotel className="h-4 w-4" />
                    <span>Hotel Name</span>
                  </div>
                  <p className="text-lg font-medium text-white">
                    {roomDetails.allroomdata.hotelname}
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Room Price</span>
                  </div>
                  <p className="text-lg font-medium text-white">
                    ₹{roomDetails.roomprice}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-700 my-6" />

              <div className="space-y-2">
                <label className="text-sm text-gray-300 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Check-in Type
                </label>
                <select
                  value={checkInType}
                  onChange={(e) => setCheckInType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f0a500] transition-all"
                >
                  <option value="Hotel">Hotel Check-In</option>
                  <option value="Early">Early Check-In</option>
                </select>
              </div>

              {!isBooked ? (
                <button
                  onClick={handleBooking}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#f0a500] to-amber-500 hover:from-amber-500 hover:to-[#f0a500] text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              ) : (
                <div className="bg-green-500/20 p-4 rounded-lg flex items-center gap-2 justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <p className="text-green-500 font-medium">
                    Booking confirmed successfully!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#f0a500]" />
            </div>
          )}

          {message && (
            <p className={`text-sm text-center ${
              message.includes('confirmed') ? 'text-green-500' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;