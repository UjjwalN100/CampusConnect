import React, { useEffect, useState } from 'react';
import { fetchNotices } from '../services/api';
import { Search, Calendar, Tag, X } from 'lucide-react';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchNotices().then(setNotices).catch(console.error);
  }, []);

  const categories = ['All', 'Examinations', 'Academic', 'Activities', 'Opportunities', 'General', 'Urgent'];
  const filtered = filter === 'All' ? notices : notices.filter(n => n.category === filter);

  return (
    <div className="fade-in-up">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-textPrimary">Student Notice Hub</h1>
        <p className="text-textSecondary mt-2">All important college updates in one place.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === c ? 'bg-primary text-white' : 'bg-white border text-textSecondary hover:bg-gray-50'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search notices..." className="w-full pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(notice => (
          <div key={notice._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover-card relative overflow-hidden">
            {notice.priority === 'High' && <div className="absolute top-0 right-0 bg-error text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">URGENT</div>}
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-secondary" />
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{notice.category}</span>
            </div>
            <h2 className="text-lg font-bold text-textPrimary mb-2 leading-tight">{notice.title}</h2>
            <p className="text-textSecondary text-sm mb-4 line-clamp-3 flex-grow">{notice.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {new Date(notice.publishedDate).toLocaleDateString()}
              </div>
              <button onClick={() => setSelectedNotice(notice)} className="text-sm font-medium text-primary hover:underline">View Details</button>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-textSecondary">No new notices in this category.</p>
          <p className="text-textPrimary font-medium mt-1">You're all caught up.</p>
        </div>
      )}

      {/* Notice Details Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col fade-in-up" style={{ animationDuration: '0.2s' }}>
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-secondary bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{selectedNotice.category}</span>
                {selectedNotice.priority === 'High' && <span className="text-xs font-bold text-error bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider">URGENT</span>}
              </div>
              <button onClick={() => setSelectedNotice(null)} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-textPrimary mb-2 leading-tight">{selectedNotice.title}</h2>
              <div className="flex items-center gap-2 text-sm text-textSecondary mb-8">
                <Calendar className="w-4 h-4" />
                Published: {new Date(selectedNotice.publishedDate).toLocaleDateString()}
              </div>
              <div className="prose prose-sm md:prose-base max-w-none text-textPrimary whitespace-pre-wrap">
                {selectedNotice.fullContent || selectedNotice.description}
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
              <button onClick={() => setSelectedNotice(null)} className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#112a4a] transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Notices;
