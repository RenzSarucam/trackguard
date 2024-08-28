import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import People from './pages/People';
import Register from './pages/Register';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/people" element={<People />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help />} />
        
      </Routes>
    </Router>
  );
}

export default App;
