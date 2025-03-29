import React, { useState } from 'react';

function Service() {
  const [currentVilla, setCurrentVilla] = useState(0);
  
  const villas = [
    {
      id: 1,
      name: "Villa Serenity",
      location: "Bali, Indonesia",
      description: "Nestled amidst lush tropical gardens, Villa Serenity offers a perfect blend of traditional Balinese architecture and modern luxury. The open-plan living areas seamlessly connect to the outdoor pool and sundeck, creating an atmosphere of peaceful relaxation.",
      features: [
        "3 en-suite bedrooms with king-size beds",
        "Private infinity pool overlooking rice terraces",
        "Open-air living pavilion with comfortable seating",
        "Fully equipped gourmet kitchen",
        "Daily housekeeping and personal chef service"
      ],
      image: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
    },
    {
      id: 2,
      name: "Coastal Haven Villa",
      location: "Amalfi Coast, Italy",
      description: "Perched on the cliffs of the stunning Amalfi Coast, this villa commands breathtaking views of the Mediterranean Sea. Traditional Italian design elements combine with contemporary comforts to create an unforgettable coastal retreat.",
      features: [
        "4 luxury bedrooms with sea views",
        "Multiple terraces for outdoor dining and relaxation",
        "Private access to secluded beach cove",
        "Wood-fired pizza oven and outdoor kitchen",
        "Wine cellar stocked with local vintages"
      ],
      image: "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg"
    },
    {
      id: 3,
      name: "Mountain Retreat Villa",
      location: "Aspen, Colorado",
      description: "This magnificent mountain lodge offers the perfect combination of rustic charm and sophisticated luxury. Surrounded by pine forests and mountain views, it's an ideal base for both winter and summer activities.",
      features: [
        "5 bedrooms with en-suite bathrooms",
        "Floor-to-ceiling windows with panoramic mountain views",
        "Stone fireplace and vaulted wooden ceilings",
        "Indoor hot tub and sauna",
        "Ski-in/ski-out access to slopes"
      ],
      image: "https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg"
    },
    {
      id: 4,
      name: "Beachfront Paradise",
      location: "Maldives",
      description: "This overwater villa embodies tropical luxury at its finest. Built on stilts over a crystal-clear lagoon, each aspect of this property has been designed to maximize the stunning ocean views and provide direct access to the vibrant marine life below.",
      features: [
        "2 bedrooms with glass floor panels",
        "Private deck with steps leading directly to the ocean",
        "Outdoor shower and bathtub",
        "Personal butler service",
        "Complimentary water sports equipment"
      ],
      image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg"
    }
  ];
  
  const nextVilla = () => {
    setCurrentVilla((prev) => (prev + 1) % villas.length);
  };
  
  const prevVilla = () => {
    setCurrentVilla((prev) => (prev - 1 + villas.length) % villas.length);
  };
  
  const villa = villas[currentVilla];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Luxury Villa Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of exceptional villas from around the world,
            each offering unparalleled comfort, privacy, and breathtaking surroundings.
          </p>
        </header>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
          <div className="md:flex">
            {/* Villa Image */}
            <div className="md:w-1/2">
              <div className="relative h-80 md:h-full">
                <img 
                  src={villa.image} 
                  alt={villa.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:hidden">
                  <h2 className="text-white text-2xl font-bold">{villa.name}</h2>
                  <p className="text-white opacity-90">{villa.location}</p>
                </div>
              </div>
            </div>
            
            {/* Villa Information */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="hidden md:block mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{villa.name}</h2>
                <p className="text-gray-600 text-lg">{villa.location}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">About This Villa</h3>
                <p className="text-gray-700 leading-relaxed">{villa.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {villa.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <button 
                  onClick={prevVilla}
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded-lg font-medium transition duration-300"
                >
                  Previous Villa
                </button>
                <span className="text-gray-500 text-sm">
                  {currentVilla + 1} of {villas.length}
                </span>
                <button 
                  onClick={nextVilla}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition duration-300"
                >
                  Next Villa
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Villa Collection Thumbnails */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse All Villas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {villas.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => setCurrentVilla(index)}
                className={`
                  cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-300
                  ${currentVilla === index ? 'ring-4 ring-blue-500' : 'hover:shadow-lg'}
                `}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <div>
                      <h3 className="text-white font-bold">{item.name}</h3>
                      <p className="text-white text-sm opacity-90">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About Our Villas</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Exceptional Quality</h3>
              <p className="text-gray-700 leading-relaxed">
                Each villa in our collection has been personally inspected to ensure it meets our rigorous standards for quality, 
                comfort, and service. From the finest linens to the most modern amenities, every detail has been carefully considered.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prime Locations</h3>
              <p className="text-gray-700 leading-relaxed">
                Our villas are situated in the world's most desirable destinations, offering spectacular views, privacy, and 
                convenient access to local attractions. Whether you're seeking beachfront serenity, mountain majesty, or 
                urban sophistication, our collection includes the perfect setting for your ideal getaway.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bespoke Services</h3>
              <p className="text-gray-700 leading-relaxed">
                Beyond the physical spaces, our villas come with exceptional service. From personal chefs to dedicated concierges, 
                in-villa spa treatments to private yacht charters, we can arrange any experience to enhance your stay. 
                Our goal is to exceed your expectations in every way.
              </p>
            </div>
          </div>
        </div>
        
        {/* More Pexels Villa Images */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Villa Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg" 
                alt="Luxury villa interior" 
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg" 
                alt="Villa with infinity pool" 
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg" 
                alt="Modern villa living room" 
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg" 
                alt="Beach villa exterior" 
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg" 
                alt="Tropical villa bedroom" 
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" 
                alt="Villa bathroom with view" 
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;