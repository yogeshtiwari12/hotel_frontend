import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Search,
  Users,
  ShieldCheck,
  UserCircle,
  Filter,
  Sparkles,
  Trash2,
  Edit
} from 'lucide-react';
import { useAuth } from '../context.js/context.js';

const Allusers = () => {
  const { allProfiles , loading2, error2, profile } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const adminProfile = profile;
  console.log("dd",allProfiles);

  // Filtering profiles based on search and role
  const filteredProfiles = allProfiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || profile.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading2) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 animate-pulse text-blue-500" size={64} />
          <p className="text-xl text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error2) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Error loading profiles: {error2}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Users className="mr-4 text-blue-500" size={40} />
            Our Team
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the talented professionals who drive our organization forward
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedRole('all')}
              className={`px-4 py-2 rounded-lg flex items-center ${selectedRole === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              <Users className="mr-2" size={20} />
              All
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`px-4 py-2 rounded-lg flex items-center ${selectedRole === 'admin'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              <ShieldCheck className="mr-2" size={20} />
              Admins
            </button>
            <button
              onClick={() => setSelectedRole('user')}
              className={`px-4 py-2 rounded-lg flex items-center ${selectedRole === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              <UserCircle className="mr-2" size={20} />
              Users
            </button>
          </div>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={profile.photo?.url || '/images/placeholder.png'}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${profile.role.toLowerCase() === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {profile.role}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Mail className="mr-2 text-blue-500" size={18} />
                      <span>{profile.email}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="mr-2 text-green-500" size={18} />
                        <span>{profile.phone}</span>
                      </div>
                    )}

                    {/* Admin-only action buttons */}
                    {profile.role === 'user' && adminProfile?.role === 'admin' && (
                      <div
                        className={`flex justify-between ${profile.role === 'user' ? 'mt-2' : 'mt-6'
                          }`}
                      >
                        <button
                          className="flex items-center px-4 mt-2 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                          onClick={() => alert('Delete functionality goes here')}
                        >
                          <Trash2 className="mr-1" size={16} />
                          Delete
                        </button>
                        <button
                          className="flex items-center mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                          onClick={() => alert('Update functionality goes here')}
                        >
                          <Edit className="mr-1" size={16} />
                          Update
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No profiles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allusers;
