import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "./context.js/context";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { 
  Hotel, 
  User, 
  Mail, 
  Phone, 
  DoorClosed, 
  CreditCard,
  Calendar,
  CheckSquare,
  Loader2,
  Clock,
  Shield,
  BellRing
} from "lucide-react";

function CheckinPage() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/hotelroutes/checkindata",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBookings(response.data.data);
        } else {
          setMessage("Failed to fetch booking details.");
        }
      } catch (error) {
        setMessage("Error fetching booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const updateCheckInStatus = async (bookingId, guestName, roomNumber, hotelName) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/hotelroutes/updatechekin/${bookingId}`,
        { CheckIn: true },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, CheckIn: true }
              : booking
          )
        );

        // Success Alert
        Swal.fire({
          title: '✨ Check-in Successful!',
          html: `
            <div style="color: #E5E7EB">
              <div style="margin-bottom: 15px;">
                <i class="fas fa-user"></i>
                <p style="margin: 5px 0; font-size: 1.1em;">Guest: <strong>${guestName}</strong></p>
              </div>
              <div style="margin-bottom: 15px;">
                <i class="fas fa-hotel"></i>
                <p style="margin: 5px 0; font-size: 1.1em;">Hotel: <strong>${hotelName}</strong></p>
              </div>
              <div>
                <i class="fas fa-door-closed"></i>
                <p style="margin: 5px 0; font-size: 1.1em;">Room: <strong>${roomNumber}</strong></p>
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'Done',
          confirmButtonColor: '#10B981',
          background: '#1F2937',
          color: '#fff',
          iconColor: '#10B981',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          customClass: {
            title: 'text-xl font-bold mb-4',
            confirmButton: 'px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out'
          }
        });
      }
    } catch (error) {
      // Error Alert
      Swal.fire({
        title: 'Check-in Failed',
        text: 'There was an error processing the check-in. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EF4444',
        background: '#1F2937',
        color: '#fff',
        iconColor: '#EF4444',
        customClass: {
          confirmButton: 'px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
        }
      });
      setMessage("Error updating booking status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
          <p className="text-blue-300 animate-pulse">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Hotel className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Hotel Check-in Portal
          </h1>
          <p className="text-gray-400">
            Manage your bookings with ease
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Bookings</p>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Verified Check-ins</p>
              <p className="text-2xl font-bold">
                {bookings.filter(b => b.CheckIn).length}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center gap-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <BellRing className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Check-ins</p>
              <p className="text-2xl font-bold">
                {bookings.filter(b => !b.CheckIn).length}
              </p>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] border border-gray-700"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Guest Name</p>
                      <p className="text-white">{booking.user_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{booking.user_email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">{booking.user_phone_number}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Hotel className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Hotel Name</p>
                      <p className="text-white">{booking.user_hotel_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <DoorClosed className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Room Number</p>
                      <p className="text-white">{booking.user_room_no}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Total Price</p>
                      <p className="text-white">₹{booking.total_price}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 border-t border-gray-700 pt-4 mt-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Check-in Type</p>
                        <p className="text-white">{booking.CheckInType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className={`px-4 py-1 rounded-full text-sm ${
                          booking.CheckIn 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {booking.CheckIn ? "Checked In" : "Not Checked In"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Check-in Button */}
                  {!booking.CheckIn && (
                    <div className="mt-4">
                      <button
                        onClick={() => updateCheckInStatus(
                          booking.id, 
                          booking.user_name,
                          booking.user_room_no,
                          booking.user_hotel_name
                        )}
                        className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <CheckSquare className="w-5 h-5" />
                        Mark as Checked In
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {message && (
          <div className="mt-6 text-center">
            <div className="inline-block text-red-400 bg-red-500/10 py-3 px-6 rounded-lg">
              {message}
            </div>
          </div>
        )}

        {bookings.length === 0 && !loading && (
          <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
            <Hotel className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No booking details available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckinPage;