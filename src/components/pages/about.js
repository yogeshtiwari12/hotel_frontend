import React from 'react';
import { Link } from 'react-router-dom';
import {ReactTyped} from 'react-typed';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
            About Us
          </h1>
          <div className="flex justify-center items-center">
            <h1 className="text-3xl text-amber-600 flex font-bold mb-4 my-4">
              Welcome to HotelDekho We Provide&nbsp;
              <ReactTyped
                className="text-green-500"
                strings={['Luxury', 'Comfort', 'Elegance']}
                typeSpeed={40}
                backSpeed={50}
                loop
              />
            </h1>
          </div>
        </div>

        {/* Overview Section */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-amber-400">Our Story</h2>
            <p className="text-gray-400">
              Since our opening in 2005, we’ve been dedicated to redefining
              luxury and comfort. Located in the heart of the city, our hotel is
              the perfect retreat for travelers seeking world-class hospitality,
              modern amenities, and timeless elegance. Whether you're here for
              a romantic getaway or a business trip, our mission is to make
              your stay truly unforgettable.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
              alt="Luxurious hotel lobby with elegant furnishings"
              className="rounded-lg shadow-lg border border-gray-700 w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Key Features Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-amber-400 text-center">
            Why Stay With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-500">Prime Location</h3>
              <p className="text-gray-400">
                Situated in a vibrant neighborhood, our hotel offers easy access
                to popular attractions, shopping, and entertainment hubs.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-500">Luxury Comfort</h3>
              <p className="text-gray-400">
                Relax in rooms designed to cater to your every need, featuring
                plush furnishings and modern conveniences.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-500">Personalized Service</h3>
              <p className="text-gray-400">
                Our team is committed to making your experience truly memorable,
                from check-in to check-out.
              </p>
            </div>
          </div>
        </div>

        {/* Investors Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-amber-400 text-center">
            Meet Our Investors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center space-y-4">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                alt="John Doe - Managing Partner"
                className="w-32 h-32 mx-auto rounded-full border-4 border-amber-500 object-cover"
              />
              <h3 className="text-xl font-bold text-amber-500">John Doe</h3>
              <p className="text-gray-400">Managing Partner</p>
            </div>
            <div className="text-center space-y-4">
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
                alt="Jane Smith - Lead Investor"
                className="w-32 h-32 mx-auto rounded-full border-4 border-amber-500 object-cover"
              />
              <h3 className="text-xl font-bold text-amber-500">Jane Smith</h3>
              <p className="text-gray-400">Lead Investor</p>
            </div>
            <div className="text-center space-y-4">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                alt="Michael Lee - Chartered Accountant"
                className="w-32 h-32 mx-auto rounded-full border-4 border-amber-500 object-cover"
              />
              <h3 className="text-xl font-bold text-amber-500">Michael Lee</h3>
              <p className="text-gray-400">Chartered Accountant</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center py-10">
          <h3 className="text-3xl font-bold text-amber-400">
            Experience the Difference at Our Hotel
          </h3>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-all"
          >
            Book Your Stay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
