import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/admission', label: 'Admission' },
    { path: '/notices', label: 'Notices' },
    { path: '/timetable', label: 'Timetable' },
    { path: '/opportunities', label: 'Opportunities' },
    { path: '/fees', label: 'Fees' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary font-bold text-xl tracking-tight">CampusConnect</Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-gray-50 transition-colors">Login</Link>
              <Link to="/dashboard" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-[#112a4a] transition-colors">Dashboard</Link>
            </div>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden p-2 text-textPrimary hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 absolute w-full shadow-lg fade-in-up" style={{ animationDuration: '0.2s' }}>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-base font-medium text-textSecondary hover:text-primary">
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3">
                <Link to="/login" className="w-full text-center px-4 py-2 text-base font-medium border border-primary text-primary rounded-lg hover:bg-gray-50">Login</Link>
                <Link to="/dashboard" className="w-full text-center px-4 py-2 text-base font-medium bg-primary text-white rounded-lg hover:bg-[#112a4a]">Dashboard</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-textSecondary">
          <p>&copy; 2026 CampusConnect. Demo Prototype.</p>
        </div>
      </footer>
    </div>
  );
};