import React, { useEffect, useState } from 'react';
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
  Edit, 
  X, 
  Check, 
  AlertCircle,
  Crown,
  Star,
  Hotel
} from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProfiles } from '../redux/authslice';
import toast from 'react-hot-toast';
import { frontend_url } from './front';

const Allusers = () => {
  const { allProfiles, loading2, error2, profile } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [changestate, setChangestate] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, [dispatch, changestate]);

  const [message, setMessage] = useState({ type: '', text: '' });
  const adminProfile = profile;

  const filteredProfiles = allProfiles.allusers?.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || profile.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  }) || [];

  const handleUpdate = (user) => {
    if (!user) return;
    setSelectedUser(user);
    setUpdateFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${frontend_url}/userroutes/updateuser/${selectedUser._id}`, 
        updateFormData,
        {
          withCredentials: true,
    
        }
      );
      
      if (response.data) {
        toast.success('User updated successfully!');
 
        setShowUpdateModal(false);
        setChangestate(prev => !prev);
      }
    } catch (error) {
      toast.error('Error updating user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${frontend_url}/userroutes/deleteuser/${id}`,
        {
          withCredentials: true,
      
        }
      );
      
      if (response.data) {
        toast.success('User deleted successfully!');
        setMessage({ type: 'success', text: 'User deleted successfully!' });
        setShowDeleteConfirm(false);
        setChangestate(prev => !prev);
      }
    } catch (error) {
toast.error('Error deleting user');
    }
  };


  if (loading2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 animate-pulse text-[#f0a500]" size={64} />
          <p className="text-xl text-gray-300">Loading customer profiles...</p>
        </div>
      </div>
    );
  }

  if (error2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400 p-8 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/20">
          <AlertCircle className="mx-auto mb-4" size={48} />
          <p className="text-xl">Error loading profiles: {error2}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Message Toast */}
      {message.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-xl shadow-lg ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
        } backdrop-blur-sm flex items-center gap-2 z-50`}>
          {message.type === 'success' ? (
            <Check size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-96 relative border border-gray-700 shadow-xl">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Update User</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={updateFormData.name}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={updateFormData.email}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  value={updateFormData.phone}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, phone: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#f0a500] text-white py-2 px-4 rounded-lg hover:bg-[#f0a500]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-96 border border-gray-700 shadow-xl">
            <div className="flex items-center gap-4 mb-4 text-red-400">
              <AlertCircle size={32} />
              <h2 className="text-2xl font-bold text-white">Confirm Delete</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedUser._id)}
                className="flex-1 bg-red-500/10 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Hotel className="mr-4 text-[#f0a500]" size={40} />
            Customer Management
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage and monitor your hotel guests efficiently
          </p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedRole('all')}
              className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                selectedRole === 'all' 
                  ? 'bg-[#f0a500] text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Users className="mr-2" size={20} />
              All Customers
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                selectedRole === 'admin' 
                  ? 'bg-[#f0a500] text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <ShieldCheck className="mr-2" size={20} />
              Staff
            </button>
            <button
              onClick={() => setSelectedRole('user')}
              className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                selectedRole === 'user' 
                  ? 'bg-[#f0a500] text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <UserCircle className="mr-2" size={20} />
              Guests
            </button>
          </div>
        </div>

        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div 
                key={profile._id} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img 
                        src={profile.photo?.url || 'https://ui-avatars.com/api/?name=' + profile.name} 
                        alt={profile.name} 
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-[#f0a500]/20"
                      />
                      {profile.role.toLowerCase() === 'admin' && (
                        <div className="absolute -top-1 -right-1 bg-[#f0a500] rounded-full p-1">
                          <Star size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#f0a500] transition-colors">
                        {profile.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        profile.role.toLowerCase() === 'admin' 
                          ? 'bg-[#f0a500]/10 text-[#f0a500]' 
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {profile.role.toLowerCase() === 'admin' ? (
                          <>
                            <Crown size={12} className="mr-1" />
                           Administrator
                          </>
                        ) : (
                          <>
                            <UserCircle size={12} className="mr-1" />
                            Hotel Guest
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                      <Mail className="mr-2 text-[#f0a500]" size={18} />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                        <Phone className="mr-2 text-[#f0a500]" size={18} />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  {profile.role === 'user' && adminProfile?.user?.role === 'admin' && (
                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-700">
                      <button
                        className="flex items-center px-4 py-2 bg-red-500/10 text-red-400 text-sm rounded-lg hover:bg-red-500/20 transition-all duration-200"
                        onClick={() => {
                          setSelectedUser(profile);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <Trash2 className="mr-2" size={16} />
                        Remove
                      </button>
                      <button
                        className="flex items-center px-4 py-2 bg-[#f0a500]/10 text-[#f0a500] text-sm rounded-lg hover:bg-[#f0a500]/20 transition-all duration-200"
                        onClick={() => handleUpdate(profile)}
                      >
                        <Edit className="mr-2" size={16} />
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
            <Filter className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No customers found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allusers;
