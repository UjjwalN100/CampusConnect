import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleAdminLogin = () => navigate('/admin');

  return (
    <div className="flex justify-center items-center h-[70vh] fade-in-up">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Student Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Email / Student ID</label>
            <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g., student@demo.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-[#112a4a] transition-colors mt-4">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-textSecondary">For demonstration purposes:</p>
          <button onClick={handleLogin} className="text-sm text-accent font-medium hover:underline block w-full text-center">Demo Student Login</button>
          <button onClick={handleAdminLogin} className="text-sm text-secondary font-medium hover:underline block w-full text-center">Demo Admin Login</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
