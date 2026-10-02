import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Admission from './pages/Admission';
import Notices from './pages/Notices';
import Timetable from './pages/Timetable';
import Opportunities from './pages/Opportunities';
import Fees from './pages/Fees';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admission" element={<Admission />} />
          <Route path="notices" element={<Notices />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="fees" element={<Fees />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;