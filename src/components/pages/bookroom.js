import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { 
  Hotel, 
  Loader2, 
  CheckCircle, 
  Clock, 
  Home,
  Calendar,
  Users,
  CreditCard,
  Shield,
  ArrowLeft
} from "lucide-react";
import Confetti from "react-confetti";
import { load } from "@cashfreepayments/cashfree-js";
import { useSelector } from "react-redux";
import { frontend_url } from "./front";

const BookingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // "info", "success", "error"
  const [isBooked, setIsBooked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkInType, setCheckInType] = useState("Hotel");
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Payment
  const { id } = useParams();
  const { profile } = useSelector((state) => state.auth);

  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",//"production"
    });
  };
  initializeSDK();

  const doPayment = async (payment_session_id, paymentDetails) => {
    let checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: "_modal",
    };

    try {
      const result = await cashfree.checkout(checkoutOptions);
      
      if (result.error) {
        setMessageType("error");
        setMessage("Payment failed. Please try again.");
        return;
      }

      if (result.paymentDetails) {
        try {
          const res = await axios.post(`${frontend_url}/payments/savepayment`, {
            order_id: paymentDetails.order_id,
            cf_order_id: paymentDetails.cf_order_id,
            created_at: paymentDetails.created_at,
            order_expiry_time: paymentDetails.order_expiry_time,
            order_amount: paymentDetails.order_amount,
            order_currency: paymentDetails.order_currency,
            customer_details: paymentDetails.customer_details,
          });

          if (res.data) {
            setMessageType("success");
            setMessage("Payment processed successfully!");
            await confirmBooking();
          }
        } catch (error) {
          setMessageType("error");
          setMessage("Error saving payment details.");
        }
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Payment processing failed. Please try again.");
    }
  };

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(
        `${frontend_url}/hotelroutes/roomdetails_related_to_hotel/${id}`
        , { withCredentials: true }
      );

      if (response.status === 200) {
        setRoomDetails(response.data);
      } else {
        setMessageType("error");
        setMessage("Failed to fetch room details.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Error fetching room details.");
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const confirmBooking = async () => {
    try {
      const bookingResponse = await axios.put(
        `${frontend_url}/hotelroutes/booksingleroom/${id}`,
        { CheckInType: checkInType },
        { withCredentials: true }
      );

      if (bookingResponse.status === 200) {
        setIsBooked(true);
        setShowConfetti(true);
        setMessageType("success");
        setMessage("Booking confirmed successfully!");
      } else {
        setMessageType("error");
        setMessage("Booking confirmation failed.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || "Error during booking");
    }
  };

  const handlePayment = async () => {
    setMessage("");
    setIsLoading(true);

    try {
      const paymentResponse = await axios.post(
        `${frontend_url}/payments/paymentkrdobhaiya`,
        {
          order_amount: roomDetails.roomprice,
          customer_details: {
            customer_id: profile?.id || "temp_user",
            customer_name: profile?.name || "temp User",
            customer_email: profile?.email || "temp@example.com",
            customer_phone: profile?.phone || "0000000000",
          },
        },
        { withCredentials: true }
      );

      const paymentSessionId = paymentResponse.data?.payment_session_id?.trim();
      const paymentDetails = paymentResponse.data?.res;
      console.log("Payment Details:", paymentSessionId);

      if (paymentSessionId) {
        await doPayment(paymentSessionId, paymentDetails);
      } else {
        throw new Error("Payment session ID not found");
      }
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || "Error processing payment");
    } finally {
      setIsLoading(false);
    }
  };

  const MessageDisplay = ({ type, message }) => {
    const bgColors = {
      error: "bg-red-500/10 border-red-500/50 text-red-500",
      success: "bg-green-500/10 border-green-500/50 text-green-500",
      info: "bg-blue-500/10 border-blue-500/50 text-blue-500"
    };

    return message ? (
      <div className={`p-4 rounded-lg border ${bgColors[type]} text-sm text-center`}>
        {message}
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={["#ffd700", "#ffffff", "#ffa500", "#ff4500", "#ff69b4"]}
        />
      )}

      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Link to={`/`} className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Room Details
        </Link>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-8 text-center border-b border-gray-700/50">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#f0a500] to-amber-500 bg-clip-text text-transparent">
              Complete Your Booking
            </h1>
            {roomDetails && (
              <div className="mt-4 space-y-2">
                <span className="inline-block px-4 py-1.5 bg-gray-700 text-gray-200 rounded-full text-sm font-medium">
                  {roomDetails.allroomdata.hotelname}
                </span>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    1 Night Stay
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    2 Guests
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 space-y-6">
            {roomDetails ? (
              <>
                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= 1 ? 'bg-[#f0a500] text-white' : 'bg-gray-700 text-gray-400'
                    }`}>
                      1
                    </div>
                    <div className={`w-16 h-0.5 ${
                      currentStep >= 2 ? 'bg-[#f0a500]' : 'bg-gray-700'
                    }`} />
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= 2 ? 'bg-[#f0a500] text-white' : 'bg-gray-700 text-gray-400'
                    }`}>
                      2
                    </div>
                  </div>
                </div>

                {/* Check-in Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setCheckInType("Hotel")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                      checkInType === "Hotel" 
                        ? 'bg-[#f0a500] text-white' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <Home className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Standard Check-in</div>
                      <div className="text-xs opacity-80">From 2:00 PM</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => setCheckInType("Early")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                      checkInType === "Early" 
                        ? 'bg-[#f0a500] text-white' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <Clock className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Early Check-in</div>
                      <div className="text-xs opacity-80">From 10:00 AM</div>
                    </div>
                  </button>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-700/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-medium text-white">Price Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Room Rate</span>
                      <span>₹{roomDetails.roomprice}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Taxes & Fees</span>
                      <span>Included</span>
                    </div>
                    <div className="pt-2 border-t border-gray-600">
                      <div className="flex justify-between text-white font-medium">
                        <span>Total Amount</span>
                        <span>₹{roomDetails.roomprice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Security Notice */}
                <div className="flex items-center gap-2 text-sm text-gray-400 justify-center">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment powered by Cashfree</span>
                </div>

                {/* Action Button */}
                {!isBooked ? (
                  <button 
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#f0a500] to-amber-500 text-white rounded-xl font-medium hover:opacity-90 transition-all transform hover:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 rounded-xl">
                      <CheckCircle className="h-5 w-5" />
                      Booking Confirmed!
                    </div>
                  </div>
                )}

                {/* Message Display */}
                {message && <MessageDisplay type={messageType} message={message} />}
              </>
            ) : (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#f0a500]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
