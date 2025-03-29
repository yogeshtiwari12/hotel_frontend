import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const formdata = {
      access_key: "47f909a4-8e3e-46d9-9870-eff6ccfcb223",
      name: data.name,
      email: data.email,
      message: data.message
    };
  
    try {
      await axios.post('https://api.web3forms.com/submit', formdata);
      alert("Message sent successfully");
      reset();
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      alert("Failed to send message. Please try again later");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400">Contact Us</h1>
          <p className="mt-2 text-gray-400">
            We'd love to hear from you! Drop us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-amber-400 mb-1">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:ring focus:ring-amber-500 text-white outline-none"
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-amber-400 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:ring focus:ring-amber-500 text-white outline-none"
                  placeholder="Your Email"
                />
                {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-amber-400 mb-1">Message</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={4}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:ring focus:ring-amber-500 text-white outline-none"
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <span className="text-red-400 text-sm">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-amber-500 rounded hover:bg-amber-600 text-white font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="space-y-4">
            
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-amber-400 font-medium">Yogesh Tiwari</h3>
                  <p className="text-gray-400 text-sm">Web Developer</p>
                </div>
              </div>

             
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center ">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-amber-400 font-medium">Email</h3>
                  <p className="text-gray-400 text-sm">yt781703@gmail.com</p>
                </div>
              </div>

      
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-amber-400 font-medium">Phone</h3>
                  <p className="text-gray-400 text-sm">+91 7817032598</p>
                </div>
              </div>

      
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-amber-400 font-medium">Location</h3>
                  <p className="text-gray-400 text-sm">
                    123 Luxury Avenue<br />
                    City Center, State<br />
                    Country India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
