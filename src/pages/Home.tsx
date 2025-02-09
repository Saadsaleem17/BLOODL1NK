import React, { useState } from 'react';
import { Heart, Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';  // ✅ Ensure correct import

export function Home() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);  // ✅ State for chatbot visibility

  return (
    <>
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Connecting Lives Through</span>
            <span className="block text-red-600">Blood Donation</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track blood availability across hospitals in real-time. Join our mission to save lives by becoming a donor or finding blood when you need it most.
          </p>
          <div className="mt-10">
            <img
              src="https://www.eternalhospital.com/uploadedfiles/gallery/1718272629_Blogs_1300-x-700_Blood-Donation.jpg"
              alt="Blood Donation Center"
              className="rounded-lg shadow-xl mx-auto max-w-full h-auto"
            />
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col space-y-4">
        {/* Donate Button */}
        <button
          onClick={() => navigate('/donate')}
          className="px-6 py-3 bg-red-600 text-white hover:bg-red-700 font-medium rounded-full shadow-lg flex items-center"
        >
          <Heart className="h-5 w-5 mr-2" />
          Donate
        </button>

        {/* Find Donor Button */}
        <button
          onClick={() => navigate('/find-donor')}
          className="px-6 py-3 bg-white text-red-600 hover:bg-gray-50 font-medium rounded-full shadow-lg border-2 border-red-600 flex items-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Find a Donor
        </button>

        {/* ChatBot Toggle Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-full shadow-lg flex items-center"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat
        </button>
      </div>

      {/* ChatBot Component (Shown Only When isChatOpen is True) */}
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
