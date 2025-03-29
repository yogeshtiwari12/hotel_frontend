import React, { useEffect, useState } from 'react';
import { 
  FiUser, 
  FiCalendar, 
  FiDollarSign, 
  FiHome, 
  FiMail, 
  FiPhone, 
  FiCheckCircle, 
  FiXCircle,
  FiClock,
  FiBell
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function UserProfile() {
  const { profile } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <p className="text-green-400 animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const formattedPhoneNumber = `+91 ${profile?.user?.phone || 'N/A'}`;
  const capitalizedUserName = profile?.user?.name
    ? profile?.user?.name.charAt(0).toUpperCase() + profile?.user?.name.slice(1)
    : 'Guest';

  const filteredBookings = profile?.bookings?.filter(booking => {
    if (activeTab === 'checked') return booking.CheckIn;
    if (activeTab === 'pending') return !booking.CheckIn;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-green-500/30">
                <img
                  src={profile?.user?.photo?.url || 'https://via.placeholder.com/150'}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 shadow-lg">
                <FiUser className="text-white text-xl" />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {capitalizedUserName}
            </h1>
            <span className="mt-3 px-6 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 text-sm rounded-full uppercase tracking-wider font-medium border border-green-500/20">
              {profile?.user?.role || 'User'}
            </span>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-x-4 border border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <FiMail className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-green-400 text-sm font-medium uppercase tracking-wider">Email</p>
              <p className="text-white font-medium mt-1">{profile?.user?.email || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-x-4 border border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <FiPhone className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-green-400 text-sm font-medium uppercase tracking-wider">Phone</p>
              <p className="text-white font-medium mt-1">{formattedPhoneNumber}</p>
            </div>
          </div>
        </motion.div>

        {/* Reservations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg mb-4">
              <FiCalendar className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Your Reservations
            </h2>
          </div>

          {/* Booking Filters */}
         

          <div className="grid grid-cols-1 gap-6">
            {filteredBookings && filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:bg-gray-900/70 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <FiHome className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{booking.hotel_name}</h3>
                        <p className="text-gray-400">Room {booking.room_no}</p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center px-6 py-2 rounded-xl ${
                        booking.CheckIn 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                      }`}
                    >
                      {booking.CheckIn ? (
                        <>
                          <FiCheckCircle className="mr-2" />
                          <span className="font-medium">Checked In</span>
                        </>
                      ) : (
                        <>
                          <FiClock className="mr-2" />
                          <span className="font-medium">Awaiting Check-in</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center bg-gray-800/50 rounded-xl p-4 space-x-4">
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <FiDollarSign className="text-green-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Total Amount</p>
                        <p className="text-green-400 text-lg font-bold">₹{booking.total_price}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-800/50 rounded-xl p-4 space-x-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg">
                        <FiBell className="text-blue-400 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Reserved On</p>
                        <p className="text-white font-medium">
                          {new Date(booking.booking_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-white font-medium">
                          {(booking.user_room_no) 
                            ? `Room No   ${booking.user_room_no}`
                            : 'Room No: N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
              >
                <FiCalendar className="mx-auto text-4xl text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">No reservations found</p>
                <p className="text-gray-500 mt-2">Your booking history will appear here</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
