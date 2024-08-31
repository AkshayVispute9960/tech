import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegistration from './pages/CustomerRegistration.js';
import AdminRegistration from './pages/AdminRegistration.js';
import AdminLogin from './pages/AdminLogin.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/register" element={<CustomerRegistration />} />
        <Route path="/users/adminRegister" element={<AdminRegistration />} />
        <Route path="/users/adminLogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
