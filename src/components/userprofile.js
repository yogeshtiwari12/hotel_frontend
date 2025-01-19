import React, { useEffect, useState } from 'react';
import { FiUser, FiCalendar, FiDollarSign, FiHome, FiMail, FiPhone, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAuth } from './context.js/context';

function UserProfile() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green-400"></div>
      </div>
    );
  }

  const formattedPhoneNumber = `+91 ${profile?.user?.phone || 'N/A'}`;
  const capitalizedUserName = profile?.user?.name
    ? profile.user.name.charAt(0).toUpperCase() + profile.user.name.slice(1)
    : 'Guest';

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8 text-white">
        {/* Profile Card */}
        <div className="bg-gradient-to-b bg-gray-900 p-6 rounded-lg shadow-lg">

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-blue-300">
              <img
                src={profile?.user?.photo?.url || 'https://via.placeholder.com/150'}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">{capitalizedUserName}</h1>
            <span className="mt-2 px-4 py-1 bg-blue-500/60 text-blue-200 text-sm rounded-full uppercase tracking-wide">
              {profile?.user?.role || 'User'}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center bg-gray-800 shadow rounded-lg p-4 space-x-4">
            <div className="p-3 bg-green-600 rounded-full">
              <FiMail className="text-white text-lg" />
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase">Email</p>
              <p className="text-gray-400 font-medium">{profile?.user?.email || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-800 shadow rounded-lg p-4 space-x-4">
            <div className="p-3 bg-green-600 rounded-full">
              <FiPhone className="text-white text-lg" />
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase">Phone</p>
              <p className="text-gray-400 font-medium">{formattedPhoneNumber}</p>
            </div>
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-gray-900 shadow rounded-lg p-6">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-green-600 rounded-full">
              <FiCalendar className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-bold text-green-400">Reservations</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {profile?.bookings && profile.bookings.length > 0 ? (
              profile.bookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-600 rounded-full">
                        <FiHome className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{booking.hotel_name}</h3>
                        <p className="text-gray-400 text-sm">Room {booking.room_no}</p>
                      </div>
                    </div>
                    <div
                      className={`px-4 py-1 text-xs font-semibold rounded-full ${
                        booking.CheckIn
                          ? 'bg-green-700 text-green-300'
                          : 'bg-red-700 text-red-300'
                      }`}
                    >
                      {booking.CheckIn ? (
                        <span className="flex items-center gap-1">
                          <FiCheckCircle /> Checked In
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <FiXCircle /> Not Checked In
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center bg-gray-700 rounded-lg p-4 space-x-3">
                      <FiDollarSign className="text-green-400 text-xl" />
                      <div>
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-green-300 font-semibold">₹{booking.total_price}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-700 rounded-lg p-4 space-x-3">
                      <FiCalendar className="text-green-400 text-xl" />
                      <div>
                        <p className="text-gray-400 text-sm">Reserved</p>
                        <p className="text-white font-semibold">
                          {new Date(booking.booking_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-400">No reservations found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
