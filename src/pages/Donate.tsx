import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Phone, Calendar, Droplet, Heart, Weight, FileText } from 'lucide-react';

export function Donate() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    bloodGroup: '',
    age: '',
    weight: '',
    lastDonation: '',
    medicalConditions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation form submitted:', formData);
  };

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(circle at 0% 0%, #dfd9db, #830200)' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Become a Donor</h2>
            <div className="flex gap-4">
              <Link
                to="/"
                className="px-4 py-2 text-red-600 hover:text-red-700 font-medium rounded-lg border-2 border-red-600 hover:border-red-700"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-red-600 hover:text-red-700 font-medium rounded-lg border-2 border-red-600 hover:border-red-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-medium rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Information */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Blood Group */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Droplet className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="bloodGroup"
                  required
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Age and Weight */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  required
                  min="18"
                  max="65"
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Weight className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  required
                  min="45"
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                required
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                required
                className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                required
                className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            {/* Medical Information */}
            <div className="relative">
              <div className="absolute top-3 left-3">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="medicalConditions"
                placeholder="Any medical conditions we should know about?"
                rows={4}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.medicalConditions}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
            >
              <Heart className="h-5 w-5 mr-2" />
              Register as Donor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}