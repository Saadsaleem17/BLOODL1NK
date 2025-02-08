import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, LogIn, UserPlus } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Droplet className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">BLOODL1NK</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium rounded-lg flex items-center"
            >
              <LogIn className="h-5 w-5 mr-1" />
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-medium rounded-lg flex items-center"
            >
              <UserPlus className="h-5 w-5 mr-1" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}