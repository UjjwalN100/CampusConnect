import React, { useEffect, useState } from 'react';
import { fetchTimetables } from '../services/api';

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [tab, setTab] = useState('Exam');

  useEffect(() => {
    fetchTimetables().then(setTimetables).catch(console.error);
  }, []);

  const filtered = timetables.filter(t => t.type === tab);

  return (
    <div className="fade-in-up">
      <h1 className="text-3xl font-bold text-textPrimary mb-8 text-center">Academic Timetable</h1>
      
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex">
          <button onClick={() => setTab('Subject')} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'Subject' ? 'bg-white shadow-sm text-primary' : 'text-textSecondary hover:text-textPrimary'}`}>Subject Timetable</button>
          <button onClick={() => setTab('Exam')} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'Exam' ? 'bg-white shadow-sm text-primary' : 'text-textSecondary hover:text-textPrimary'}`}>Exam Timetable</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-textSecondary uppercase tracking-wider">
                <th className="p-4 font-medium">Date / Day</th>
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(t => (
                <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-textPrimary">{t.date}</div>
                    <div className="text-xs text-textSecondary">{t.day}</div>
                  </td>
                  <td className="p-4 font-medium text-primary">{t.subject}</td>
                  <td className="p-4 text-sm text-textPrimary">{t.startTime} - {t.endTime}</td>
                  <td className="p-4 text-sm text-textSecondary">{t.room}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="4" className="p-8 text-center text-textSecondary">No timetable records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Timetable;
