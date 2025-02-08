import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Phone, FileText, Search, Upload } from 'lucide-react';

export function FindDonor() {
  const [formData, setFormData] = useState({
    patientName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    bloodGroup: '',
    urgency: '',
    prescription: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.type === 'file' && e.target.files) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Find donor form submitted:', formData);
  };

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(circle at 0% 0%, #dfd9db, #830200)' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Find a Donor</h2>
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
            {/* Patient Information */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="patientName"
                placeholder="Patient's Full Name"
                required
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.patientName}
                onChange={handleChange}
              />
            </div>

            {/* Contact */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                required
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Blood Group */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="bloodGroup"
                required
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Required Blood Group</option>
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

            {/* Urgency Level */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="urgency"
                required
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="">Select Urgency Level</option>
                <option value="immediate">Immediate (Within 24 hours)</option>
                <option value="urgent">Urgent (2-3 days)</option>
                <option value="planned">Planned (Within a week)</option>
              </select>
            </div>

            {/* Address */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Hospital/Clinic Address"
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

            {/* Prescription Upload */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Doctor's Prescription (PDF or JPG)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="prescription"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="prescription"
                        name="prescription"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg"
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF or JPG up to 10MB</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
            >
              <Search className="h-5 w-5 mr-2" />
              Search for Donors
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}