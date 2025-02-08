import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Donate } from './pages/Donate';
import { FindDonor } from './pages/FindDonor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/find-donor" element={<FindDonor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;