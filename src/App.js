import React from 'react';
import Navbar from './components/navbar.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/home.js';
import Contact from './components/pages/contact.js';
import Login from './components/pages/login.js';
import SaveHotel from './components/pages/savehotel.js';
import About from './about.js';
import RoomDetails from './components/pages/rooms.js';
import Saveroomdata from './components/pages/saveroomdata.js';
import DashboardStyle from './components/dashboard/dashboardstyle.js';
import Hoteldata from './components/dashboard/hoteldata.js';
import Userprofile from './components/userprofile.js';
import Allusers from './components/pages/allusers.js';
import BookingPage from './components/pages/bookroom.js';
import GetAllBookings from './components/pages/getallbookings.js';
import Cookie  from 'js-cookie';
import PlacesToVisit from './components/pages/nearbyplaces.js';
import Dash from './components/pages/dash.js';
import { useAuth } from './components/context.js/context';


import Signup from './components/pages/signup.js';
import Checkinpage from './components/checkinpage.js';




function App() {
  // const {isProfile}  = useAuth();
  const { isProfile, loading ,allProfiles} = useAuth();
  const PrivateRoute = ({ children }) => {
    if (loading) {
        return <div>Loading...</div>; // Show a loader while checking profile status
    }

    return isProfile ? children : <Navigate to="/login" replace />;
}; 

  return (
    <div className="bg-[#1a1a2e]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dash" element={<Dash />} />
          

          <Route path="/roomdetails_related_to_hotel/:id" element={<PrivateRoute><RoomDetails /></PrivateRoute>} />
          <Route path="/saveroomdetails/:id" element={<PrivateRoute><Saveroomdata /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardStyle /></PrivateRoute>} />
          <Route path="/view-hotels" element={<PrivateRoute><Hoteldata /></PrivateRoute>} />
          <Route path="/userprofile" element={<PrivateRoute><Userprofile /></PrivateRoute>} />
          <Route path="/allusers" element={<PrivateRoute><Allusers /></PrivateRoute>} />
          <Route path="/booking/:id" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path="/savehotel" element={<PrivateRoute><SaveHotel /></PrivateRoute>} />
          <Route path="/view-bookings" element={<PrivateRoute><GetAllBookings /></PrivateRoute>} />
          <Route path="/chekindata" element={<PrivateRoute><Checkinpage/></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
