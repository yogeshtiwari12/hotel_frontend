import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Calendar, Mail, Phone, Home, Hash, DollarSign, User, Clock, Search, 
  Pencil, Trash2, X, CheckCircle, AlertCircle, Hotel, CalendarDays, 
  BadgeCheck, CreditCard, Users
} from 'lucide-react';
import { frontend_url } from './front';

function GetAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refresher, setrefresher] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBookings();
  }, [refresher]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${frontend_url}/hotelroutes/getallbookings`, {
        withCredentials: true
      });
      setBookings(response.data.bookings || []);
    } catch (err) {
      setError('An error occurred while fetching bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${frontend_url}/hotelroutes/deletebooking/${id}`, {
        withCredentials: true
      });
      if (response.status) {
        setMessage({ type: 'success', text: 'Booking deleted successfully' });
        setrefresher(prev => !prev);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting booking' });
    }
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${frontend_url}/userroutes/updatebookinguser/${selectedBooking._id}`,
        selectedBooking,
        { withCredentials: true }
      );
      if (response.status) {
        setMessage({ type: 'success', text: 'Booking updated successfully' });
        setrefresher(prev => !prev);
        setSelectedBooking(null);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating booking' });
    }
  };

  const handleInputChange = (e) => {
    setSelectedBooking({
      ...selectedBooking,
      [e.target.name]: e.target.value
    });
  };

  const filteredBookings = bookings.filter(booking =>
    (booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_hotel_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

 

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f0a500] to-[#f0c056] blur-xl opacity-20 animate-pulse"></div>
        <div className="w-20 h-20 border-t-4 border-b-4 border-[#f0a500] rounded-full animate-spin"></div>
        <p className="mt-6 text-[#f0a500] text-xl font-medium">Loading Bookings...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-red-500/10 p-8 rounded-xl border border-red-500/20 backdrop-blur-sm">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 text-lg font-medium text-center">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 sm:p-6 md:p-10">
      {message.text && (
        <div className={`fixed top-2 right-2 sm:top-4 sm:right-4 p-3 sm:p-4 rounded-xl shadow-lg z-50 flex items-center gap-2 sm:gap-3 text-sm sm:text-base animate-fade-in ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        } backdrop-blur-sm max-w-[90vw] sm:max-w-md`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          )}
          <span className="line-clamp-2">{message.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3">
            <Hotel className="w-8 h-8 sm:w-12 sm:h-12 text-[#f0a500]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0a500] to-[#f0c056]">
              Booking Management
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 px-2 sm:px-0">
           
          </div>
        </div>

        <div className="relative mb-6 px-2 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f0a500] to-[#f0c056] rounded-lg blur opacity-10"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[#f0a500]" />
            <input
              type="text"
              placeholder="Search by name, email, or hotel..."
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-800/40 border border-[#f0a500]/20 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-700/50 overflow-hidden px-2 sm:px-0">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#f0a500]/20 scrollbar-track-gray-800/40">
            <table className="min-w-full divide-y divide-gray-700/50">
              <thead className="hidden sm:table-header-group">
                <tr className="bg-gradient-to-r from-[#f0a500]/10 to-transparent">
                  <th className="px-8 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#f0a500]" />
                      <span className="text-sm font-semibold text-[#f0a500] tracking-wider">GUEST DETAILS</span>
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-[#f0a500]" />
                      <span className="text-sm font-semibold text-[#f0a500] tracking-wider">HOTEL INFO</span>
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-[#f0a500]" />
                      <span className="text-sm font-semibold text-[#f0a500] tracking-wider">ROOM</span>
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-[#f0a500]" />
                      <span className="text-sm font-semibold text-[#f0a500] tracking-wider">PRICE</span>
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#f0a500]" />
                      <span className="text-sm font-semibold text-[#f0a500] tracking-wider">DATE</span>
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-[#f0a500] tracking-wider">ACTIONS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredBookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`
                      block sm:table-row
                      transition-all duration-300 hover:bg-[#f0a500]/5
                      ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}
                    `}
                  >
                    <td className="block sm:table-cell px-4 sm:px-8 py-4 sm:py-6">
                      <div className="flex flex-col space-y-2">
                        <span className="text-base sm:text-lg font-semibold text-white/90">{booking.user_name}</span>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#f0a500]/70" />
                          <span className="font-medium">{booking.user_email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#f0a500]/70" />
                          <span className="font-medium">{booking.user_phone_number}</span>
                        </div>
                      </div>
                    </td>
                    <td className="block sm:table-cell px-4 sm:px-8 py-2 sm:py-6">
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0a500]" />
                        <span className="text-sm sm:text-base text-white/90 font-medium">{booking.user_hotel_name}</span>
                      </div>
                    </td>
                    <td className="block sm:table-cell px-4 sm:px-8 py-2 sm:py-6">
                      <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#f0a500]/20 to-[#f0a500]/10 text-[#f0a500] border border-[#f0a500]/20">
                        Room {booking.user_room_no}
                      </span>
                    </td>
                    <td className="block sm:table-cell px-4 sm:px-8 py-2 sm:py-6">
                      <span className="text-base sm:text-lg font-bold text-[#f0a500]">₹{booking.total_price}</span>
                    </td>
                    <td className="block sm:table-cell px-4 sm:px-8 py-2 sm:py-6">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm sm:text-base text-white/90 font-medium">
                          {new Date(booking.user_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400">
                          {new Date(booking.user_date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="block sm:table-cell px-4 sm:px-8 py-4 sm:py-6 border-b sm:border-b-0">
                      <div className="flex space-x-2 justify-end sm:justify-start">
                        <button
                          onClick={() => handleUpdate(booking)}
                          className="p-2 rounded-lg bg-[#f0a500]/10 hover:bg-[#f0a500]/20 transition-all duration-200 group"
                          title="Update Booking"
                        >
                          <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0a500] group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 group"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-gray-800/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm mx-2 sm:mx-0">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#f0a500]/10 mb-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#f0a500]" />
            </div>
            <p className="text-lg sm:text-xl font-medium text-gray-400">No bookings found</p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">Try adjusting your search criteria</p>
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-800/90 rounded-2xl shadow-xl border border-gray-700/50 w-full max-w-lg relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f0a500]/5 to-transparent rounded-2xl"></div>
              <div className="relative p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0a500] to-[#f0c056]">
                    Update Booking
                  </h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Name</label>
                    </div>
                    <input
                      type="text"
                      name="user_name"
                      value={selectedBooking.user_name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Email</label>
                    </div>
                    <input
                      type="email"
                      name="user_email"
                      value={selectedBooking.user_email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Phone Number</label>
                    </div>
                    <input
                      type="text"
                      name="user_phone_number"
                      value={selectedBooking.user_phone_number}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Hotel Name</label>
                    </div>
                    <input
                      type="text"
                      name="user_hotel_name"
                      value={selectedBooking.user_hotel_name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Room Number</label>
                    </div>
                    <input
                      type="number"
                      name="user_room_no"
                      value={selectedBooking.user_room_no}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Total Price</label>
                    </div>
                    <input
                      type="number"
                      name="total_price"
                      value={selectedBooking.total_price}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0a500]" />
                      <label className="text-xs sm:text-sm font-medium text-gray-300">Date</label>
                    </div>
                    <input
                      type="date"
                      name="user_date"
                      value={new Date(selectedBooking.user_date).toISOString().split('T')[0]}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40 transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 sm:space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(null)}
                      className="px-3 sm:px-4 py-2 bg-gray-700/50 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#f0a500] to-[#f0c056] text-white rounded-lg hover:from-[#d18e00] hover:to-[#d1a046] transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetAllBookings;
