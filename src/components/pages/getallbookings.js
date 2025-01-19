import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Mail, Phone, Home, Hash, DollarSign, User, Clock, Search, Pencil, Trash2, X } from 'lucide-react';

function GetAllBookings() {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refresher, setrefresher] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [refresher]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:4000/hotelroutes/getallbookings', {
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
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await axios.delete(`http://localhost:4000/hotelroutes/deletebooking/${id}`, {
          withCredentials: true
        });
        if (response.status) {
          alert("Booking deleted successfully")
          setrefresher((p)=>!p)
        }
      } catch (err) {
        console.error('Error deleting booking:', err);
      }
    }
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/userroutes/updatebookinguser/${selectedBooking._id}`,
        selectedBooking,
        { withCredentials: true }
      );
      fetchBookings();
      setSelectedBooking(null);
      if (response.status) {
        alert("Booking updated successfully")
        setrefresher(true)
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleInputChange = (e) => {
    setSelectedBooking({
      ...selectedBooking,
      [e.target.name]: e.target.value
    });
  };

  const filteredBookings = bookings.filter(booking =>
    booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_hotel_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 border-t-4 border-b-4 border-[#f0a500] rounded-full animate-spin"></div>
        <p className="mt-6 text-[#f0a500] text-xl font-medium">Loading Bookings...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-red-500/10 p-8 rounded-xl border border-red-500/20">
        <p className="text-red-400 text-lg font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0a500] to-[#f0c056]">
            Booking Records
          </h2>
          <p className="text-gray-400 text-lg font-medium">
            Total Bookings: <span className="text-[#f0a500]">{bookings.length}</span>
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#f0a500]" />
          <input
            type="text"
            placeholder="Search by name, email, or hotel..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800/40 border border-[#f0a500]/20 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-gray-800/40 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700/50">
              <thead>
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
                      transition-all duration-200 hover:bg-[#f0a500]/5
                      ${index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/10'}
                    `}
                  >
                    <td className="px-8 py-6">
                      <div className="flex flex-col space-y-2">
                        <span className="text-lg font-semibold text-white/90">{booking.user_name}</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Mail className="w-4 h-4 text-[#f0a500]/70" />
                          <span className="font-medium">{booking.user_email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Phone className="w-4 h-4 text-[#f0a500]/70" />
                          <span className="font-medium">{booking.user_phone_number}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-white/90 font-medium">{booking.user_hotel_name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#f0a500]/20 to-[#f0a500]/10 text-[#f0a500] border border-[#f0a500]/20">
                        Room {booking.user_room_no}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-lg font-bold text-[#f0a500]">₹{booking.total_price}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col space-y-1">
                        <span className="text-white/90 font-medium">
                          {new Date(booking.user_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(booking.user_date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(booking)}
                          className="p-2 rounded-lg bg-[#f0a500]/10 hover:bg-[#f0a500]/20 transition-all duration-200"
                          title="Update Booking"
                        >
                          <Pencil className="w-5 h-5 text-[#f0a500]" />
                        </button>
                        <button

                          onClick={() =>
                            handleDelete(booking._id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
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
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
              <Clock className="w-8 h-8 text-[#f0a500]" />
            </div>
            <p className="text-gray-400 text-xl font-medium">No bookings found</p>
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-gray-800/90 rounded-2xl shadow-xl border border-gray-700/50 w-full max-w-lg p-6 m-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0a500] to-[#f0c056]">
                  Update Booking
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-200"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Name</label>
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    value={selectedBooking.user_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Email</label>
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    value={selectedBooking.user_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                  </div>

                  <input
                    type="text"
                    name="user_phone_number"
                    value={selectedBooking.user_phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Hotel Name</label>
                  </div>
                  <input
                    type="text"
                    name="user_hotel_name"
                    value={selectedBooking.user_hotel_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Room Number</label>
                  </div>
                  <input
                    type="number"
                    name="user_room_no"
                    value={selectedBooking.user_room_no}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Total Price</label>
                  </div>
                  <input
                    type="number"
                    name="total_price"
                    value={selectedBooking.total_price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#f0a500]" />
                    <label className="text-sm font-medium text-gray-300">Date</label>
                  </div>
                  <input
                    type="date"
                    name="user_date"
                    value={new Date(selectedBooking.user_date).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/40"
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(null)}
                    className="px-4 py-2 bg-gray-700/50 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f0a500] text-white rounded-lg hover:bg-[#d18e00] transition-all duration-200"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetAllBookings;
