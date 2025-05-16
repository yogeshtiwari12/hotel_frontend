import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./components/redux/authslice";

import {Navbar,NavbarWrapper} from "./components/navbar.js";
import Home from "./components/pages/home.js";
import Login from "./components/pages/login.js";
import Signup from "./components/pages/signup.js";
import SaveHotel from "./components/pages/savehotel.js";
import Contact from "./components/pages/contact.js";
import RoomDetails from "./components/pages/rooms.js";
import Saveroomdata from "./components/pages/saveroomdata.js";
import DashboardStyle from "./components/dashboard/dashboardstyle.js";
import Hoteldata from "./components/dashboard/hoteldata.js";
import Userprofile from "./components/userprofile.js";
import Allusers from "./components/pages/allusers.js";
import BookingPage from "./components/pages/bookroom.js";
import GetAllBookings from "./components/pages/getallbookings.js";
import Dash from "./components/pages/dash.js";
import Checkinpage from "./components/checkinpage.js";
import About from "./components/pages/about.js";
import ErrorPage from "./components/pages/errorpgae.js";
import Loading from "./components/pages/loading.js";
import Service from "./components/pages/service.js";
import { Toaster } from "react-hot-toast";

function Layout() {
  const dispatch = useDispatch();
  const { isAuthenticated, profile, isProfile, loading } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const isAuth = useMemo(() => { 
    return isAuthenticated && isProfile && !!profile;
  }, [isAuthenticated, isProfile, profile]);



  return (
    <div className="bg-[#1a1a2e] min-h-screen ">
      <Navbar />
      

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/services" element={<Service/>} />

  
        <Route
          path="/roomdetails_related_to_hotel/:id"
          element={isAuth ? <RoomDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/saveroomdetails/:id"
          element={isAuth ? <Saveroomdata /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuth ? <DashboardStyle /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-hotels"
          element={isAuth ? <Hoteldata /> : <Navigate to="/login" />}
        />
        <Route
          path="/userprofile"
          element={isAuth ? <Userprofile /> : <Navigate to="/login" />}
        />
        <Route
          path="/allusers"
          element={isAuth ? <Allusers /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking/:id"
          element={isAuth ? <BookingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/savehotel"
          element={isAuth ? <SaveHotel /> : <Navigate to="/login" />}
        />
        <Route
          path="/view-bookings"
          element={isAuth ? <GetAllBookings /> : <Navigate to="/login" />}
        />
        <Route
          path="/chekindata"
          element={isAuth ? <Checkinpage /> : <Navigate to="/login" />}
        />

        {/* Catch-All Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
<Toaster/>

    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;