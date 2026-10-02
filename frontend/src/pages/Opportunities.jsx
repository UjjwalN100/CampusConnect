import React, { useEffect, useState } from 'react';
import { fetchOpportunities } from '../services/api';
import { MapPin, Calendar, Clock, Check } from 'lucide-react';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [registeredIds, setRegisteredIds] = useState(new Set());

  useEffect(() => {
    fetchOpportunities().then(setOpportunities).catch(console.error);
  }, []);

  const handleRegister = (id) => {
    // In a real app, this would be an API call to the backend
    setRegisteredIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    alert("Successfully registered for this event! (Demo Simulation)");
  };

  const handleViewDetails = (title) => {
    alert(`Displaying full details page for: ${title}\n\n(This is a prototype placeholder. In the real app, this would open a dedicated details page.)`);
  };

  return (
    <div className="fade-in-up">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-textPrimary">Student Opportunities</h1>
        <p className="text-textSecondary mt-2">Discover workshops, internships and hackathons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map(opp => (
          <div key={opp._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-card flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-50 text-success px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{opp.type}</span>
            </div>
            <h2 className="text-xl font-bold text-textPrimary mb-2">{opp.title}</h2>
            <p className="text-sm text-textSecondary mb-6 flex-grow">{opp.description}</p>
            
            <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center text-sm text-textPrimary"><Calendar className="w-4 h-4 mr-2 text-primary" /> Date: {opp.date}</div>
              <div className="flex items-center text-sm text-textPrimary"><Clock className="w-4 h-4 mr-2 text-warning" /> Deadline: {opp.deadline}</div>
              <div className="flex items-center text-sm text-textPrimary"><MapPin className="w-4 h-4 mr-2 text-secondary" /> {opp.location}</div>
            </div>

            <div className="flex gap-3 mt-auto">
              {registeredIds.has(opp._id) ? (
                <button disabled className="flex-1 bg-success text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed transition-colors">
                  <Check size={18} /> Registered
                </button>
              ) : (
                <button onClick={() => handleRegister(opp._id)} className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-[#112a4a] transition-colors">
                  Register
                </button>
              )}
              <button onClick={() => handleViewDetails(opp.title)} className="flex-1 bg-white border border-gray-200 text-textPrimary py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
        {opportunities.length === 0 && <p className="col-span-full text-center text-textSecondary">No opportunities available right now.</p>}
      </div>
    </div>
  );
};

export default Opportunities;
