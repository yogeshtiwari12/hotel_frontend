import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { motion, AnimatePresence } from "framer-motion";
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
  BellRing,
  Search,
  RefreshCw
} from "lucide-react";
import { frontend_url } from "./pages/front";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function CheckinPage() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [roomInputs, setRoomInputs] = useState({});



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${frontend_url}/hotelroutes/checkindata`,
          { withCredentials: true }
        );
     
        if (response.status === 200) {
          setBookings(response.data.data);
       console.log("response",bookings.map((booking) => booking.id))

        
          const initialRoomInputs = {};
          response.data.data.forEach(booking => {
            initialRoomInputs[booking.id] = booking.user_room_no || "";
          });
          setRoomInputs(initialRoomInputs);
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

  const handleRoomInputChange = (bookingId, value) => {
    setRoomInputs({
      ...roomInputs,
      [bookingId]: value
    });
  };

  const setRoom = async (id, currentRoomNumber) => {
    try {
    
      if (currentRoomNumber && !roomInputs[id]) {
        setMessage("Room number is already set.");
        return;
      }
      console.log("id",id)
      console.log("roomInputs[id]",roomInputs[id])


      if (!roomInputs[id] || roomInputs[id].trim() === "") {
        Swal.fire({
          title: 'Room Number Required',
          text: 'Please enter a room number.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#F59E0B',
          background: '#1F2937',
          color: '#fff',
          iconColor: '#F59E0B',
        });
        return;
      }

      // Custom endpoint to set room number with user input
      const response = await axios.post(
        `${frontend_url}/hotelroutes/setroom/${id}`,
        { user_room_no: roomInputs[id] },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Room number set successfully!", )
        // Update local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === id 
              ? { ...booking, user_room_no: roomInputs[id] } 
              : booking
          )
        );console.log("response",response)
        
        Swal.fire({
          title: 'Room Set Successfully',
          text: `Room number ${roomInputs[id]} has been assigned.`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10B981',
          background: '#1F2937',
          color: '#fff',
          iconColor: '#10B981',
        });
        setMessage("");
      }
    } catch (error) {
      Swal.fire({
        title: 'Error Setting Room',
        text: 'There was an error setting the room number. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EF4444',
        background: '#1F2937',
        color: '#fff',
        iconColor: '#EF4444',
      });
      setMessage("Error setting room.");
    }
  };

  const updateCheckInStatus = async (bookingId, guestName, roomNumber, hotelName) => {
    if (!roomNumber) {
      Swal.fire({
        title: 'Room Number Required',
        text: 'Please set a room number before checking in.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#F59E0B',
        background: '#1F2937',
        color: '#fff',
        iconColor: '#F59E0B',
      });
      return;
    }
    
    try {
      const response = await axios.post(
        `${frontend_url}/hotelroutes/updatechekin/${bookingId}`,
        { CheckIn: true },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        toast.success("Check-in successful!", )
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, CheckIn: true }
              : booking
          )
        );

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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.user_hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (booking.user_room_no && booking.user_room_no.toString().includes(searchTerm));
    
    if (filterStatus === "checked") return matchesSearch && booking.CheckIn;
    if (filterStatus === "pending") return matchesSearch && !booking.CheckIn;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-gray-800 p-8 rounded-2xl shadow-xl"
        >
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4 mx-auto" />
          <p className="text-blue-400 text-lg font-medium animate-pulse">Loading your bookings...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the latest data</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-500/20 p-4 rounded-2xl">
              <Hotel className="w-16 h-16 text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Hotel Check-in Portal
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Streamline your check-in process with our modern management system
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by guest, hotel, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-800 rounded-xl p-1 border border-gray-700">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterStatus === "all" 
                    ? "bg-blue-500 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("checked")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterStatus === "checked" 
                    ? "bg-green-500 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Checked In
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterStatus === "pending" 
                    ? "bg-yellow-500 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Pending
              </button>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="p-3 bg-gray-800 rounded-xl border border-gray-700 text-gray-400 hover:text-white transition-all hover:bg-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-700 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-4 rounded-xl">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">Active Bookings</p>
                <p className="text-3xl font-bold text-white">{bookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-700 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-4 rounded-xl">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">Verified Check-ins</p>
                <p className="text-3xl font-bold text-white">
                  {bookings.filter(b => b.CheckIn).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-700 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/20 p-4 rounded-xl">
                <BellRing className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">Pending Check-ins</p>
                <p className="text-3xl font-bold text-white">
                  {bookings.filter(b => !b.CheckIn).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        <AnimatePresence>
          <motion.div 
            layout
            className="grid gap-6"
          >
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 shadow-xl border border-gray-700 backdrop-blur-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/20 p-3 rounded-xl">
                        <User className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Guest Name</p>
                        <p className="text-lg font-medium text-white">{booking.user_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-purple-500/20 p-3 rounded-xl">
                        <Mail className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-lg font-medium text-white">{booking.user_email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-green-500/20 p-3 rounded-xl">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                        <p className="text-lg font-medium text-white">{booking.user_phone_number}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-500/20 p-3 rounded-xl">
                        <Hotel className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Hotel Name</p>
                        <p className="text-lg font-medium text-white">{booking.user_hotel_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-red-500/20 p-3 rounded-xl">
                        <DoorClosed className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Room Number</p>
                        {booking.user_room_no ? (
                          <p className="text-lg font-medium text-white">{booking.user_room_no}</p>
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              placeholder="Enter room #"
                              value={roomInputs[booking.id] || ""}
                              onChange={(e) => handleRoomInputChange(booking.id, e.target.value)}
                              className="bg-gray-700 border border-gray-600 rounded-lg py-1 px-3 text-white w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => setRoom(booking.id, booking.user_room_no)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
                            >
                              Set
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-500/20 p-3 rounded-xl">
                        <CreditCard className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Total Price</p>
                        <p className="text-lg font-medium text-white">₹{booking.total_price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 border-t border-gray-600 pt-6 mt-2">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-500/20 p-3 rounded-xl">
                          <Calendar className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Check-in Type</p>
                          <p className="text-lg font-medium text-white">{booking.CheckInType}</p>
                        </div>
                      </div>

                      <div className="flex justify-center gap-4 ">
                        <div className={`p-3 rounded-xl ${
                          booking.CheckIn 
                            ? "bg-green-500/20" 
                            : "bg-yellow-500/20"
                        }`}>
                          <CheckSquare className={`w-6 h-6  top-4 ${
                            booking.CheckIn 
                              ? "text-green-400" 
                              : "text-yellow-400"
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Status</p>
                          <span className={`px-4 py-2 rounded-xl text-sm font-medium ${
                            booking.CheckIn 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {booking.CheckIn ? "Checked In" : "Pending Check-in"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Check-in Button */}
                    {!booking.CheckIn && (
                      <div className="mt-6">
                        <button
                          onClick={() => updateCheckInStatus(
                            booking.id, 
                            booking.user_name,
                            booking.user_room_no || roomInputs[booking.id],
                            booking.user_hotel_name
                          )}
                          className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center gap-2"
                        >
                          <CheckSquare className="w-5 h-5" />
                          <span>Complete Check-in Process</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="inline-block text-red-400 bg-red-500/20 py-4 px-8 rounded-xl border border-red-500/20">
              <p className="flex items-center gap-2">
                <span className="text-red-500">⚠</span>
                {message}
              </p>
            </div>
          </motion.div>
        )}

        {filteredBookings.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700"
          >
            <Hotel className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No bookings found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CheckinPage;