import React, { useEffect, useState } from 'react'; 
import { fetchApplications, fetchDocuments, fetchNotices } from '../services/api';
import { CheckCircle, Clock, AlertCircle, User, BookOpen, FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [app, setApp] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchApplications().then(d => setApp(d[0])).catch(console.error);
    fetchDocuments('DEMO-STU-001').then(data => setDocuments(data)).catch(console.error);
    fetchNotices().then(data => setNotices(data.slice(0, 3))).catch(console.error);
  }, []);

  if (!app) return <div className="text-center py-20 text-textSecondary flex items-center justify-center gap-3"><div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> Loading dashboard...</div>;

  const verifiedDocs = documents.filter(d => d.verificationStatus === 'Verified').length;
  
  return (
    <div className="fade-in-up space-y-6">
      {/* Enhanced Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-24 bg-primary relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="px-8 pb-6 relative flex flex-col md:flex-row justify-between items-end md:items-center">
          <div className="flex items-center gap-6 -mt-10">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
              <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center text-primary">
                <User size={40} />
              </div>
            </div>
            <div className="pt-10">
              <h1 className="text-2xl font-bold text-textPrimary">{app.personal?.fullName || 'Student Name'}</h1>
              <div className="flex items-center gap-2 mt-1 text-textSecondary font-medium">
                <GraduationCap size={16} className="text-secondary" />
                <span>{app.course?.courseName || 'Branch Not Selected'}</span>
                <span className="hidden md:inline text-gray-300">•</span>
                <span className="hidden md:inline">ID: {app.studentId}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3 w-full md:w-auto">
            <Link to="/admission" className="flex-1 md:flex-none text-center bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0da070] transition-colors shadow-sm">
              Resume Admission
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Quick Stats & Overview */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h2 className="font-bold text-textPrimary mb-4 border-b pb-2">Overview</h2>
             <div className="space-y-4">
               <div>
                 <p className="text-xs text-textSecondary uppercase tracking-wider font-bold mb-1">Application</p>
                 <p className="text-xl font-bold text-primary">{app.progress}% Complete</p>
               </div>
               <div>
                 <p className="text-xs text-textSecondary uppercase tracking-wider font-bold mb-1">Documents</p>
                 <p className="text-xl font-bold text-primary">{verifiedDocs} / {documents.length} Verified</p>
               </div>
               <div>
                 <p className="text-xs text-textSecondary uppercase tracking-wider font-bold mb-1">Fee Status</p>
                 <p className="text-xl font-bold text-warning">Pending Payment</p>
               </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h2 className="font-bold text-textPrimary mb-4 border-b pb-2">Quick Links</h2>
             <div className="space-y-2">
               <Link to="/fees" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                 <span className="text-sm font-medium">Pay Fees</span>
                 <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
               </Link>
               <Link to="/timetable" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                 <span className="text-sm font-medium">View Timetable</span>
                 <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
               </Link>
               <Link to="/opportunities" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                 <span className="text-sm font-medium">Explore Events</span>
                 <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
               </Link>
             </div>
          </div>
        </div>

        {/* Middle Column: Detailed Admission Process Tracker */}
        <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h2 className="text-xl font-bold text-textPrimary">Admission Process</h2>
              <p className="text-sm text-textSecondary">Track your onboarding journey</p>
            </div>
            <span className="bg-blue-50 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{app.applicationStatus}</span>
          </div>
          
          <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4">
            {[
              { 
                step: '1. Personal & Academic Info', 
                status: 'completed',
                desc: 'You have successfully submitted your basic information.',
                action: null
              },
              { 
                step: '2. Document Submission', 
                status: 'completed',
                desc: 'All required documents have been uploaded successfully.',
                action: 'View Uploads'
              },
              { 
                step: '3. Document Verification', 
                status: 'current',
                desc: 'The administration is currently reviewing your documents. 1 document is pending verification.',
                action: 'Check Status'
              },
              { 
                step: '4. Admission Approval', 
                status: 'pending',
                desc: 'Waiting for final approval from the department head.',
                action: null
              },
              { 
                step: '5. Fee Payment', 
                status: 'pending',
                desc: 'Pay your first semester fees to confirm your seat.',
                action: 'Go to Payments'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-8">
                <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white ${item.status === 'completed' ? 'bg-success text-white' : item.status === 'current' ? 'bg-secondary text-white shadow-[0_0_0_4px_rgba(37,99,235,0.1)]' : 'bg-gray-200 text-gray-400'}`}>
                  {item.status === 'completed' ? <CheckCircle size={16} /> : item.status === 'current' ? <Clock size={16} /> : <span className="w-2 h-2 rounded-full bg-gray-400"></span>}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${item.status === 'pending' ? 'text-textSecondary' : 'text-textPrimary'}`}>
                    {item.step}
                  </h3>
                  <p className="text-sm text-textSecondary mt-1 leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                  {item.action && (
                    <button className={`mt-3 text-sm font-semibold flex items-center gap-1 ${item.status === 'current' ? 'text-primary hover:underline' : 'text-gray-400'}`} disabled={item.status === 'pending'}>
                      {item.action} <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Notices & Updates */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="font-bold text-textPrimary">Recent Notices</h2>
              <Link to="/notices" className="text-xs font-bold text-secondary hover:underline">VIEW ALL</Link>
            </div>
            <div className="space-y-4">
              {notices.map((n, i) => (
                <div key={i} className="border-l-4 border-secondary pl-3 py-1">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{n.category}</span>
                  <p className="font-semibold text-sm text-textPrimary mt-1 leading-tight">{n.title}</p>
                  <p className="text-xs text-textSecondary mt-1">{new Date(n.publishedDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="font-bold text-textPrimary mb-4 border-b pb-2">Upcoming Events</h2>
            <div className="space-y-4">
               <div className="flex gap-3 items-start">
                 <div className="bg-blue-50 p-2 rounded-xl text-center min-w-[50px] border border-blue-100">
                   <p className="text-[10px] font-bold text-primary uppercase">OCT</p>
                   <p className="font-bold text-primary">15</p>
                 </div>
                 <div>
                   <p className="font-semibold text-sm text-textPrimary">Semester Examination</p>
                   <p className="text-xs text-textSecondary flex items-center gap-1 mt-1"><Clock size={12}/> 10:00 AM</p>
                 </div>
               </div>
               
               <div className="flex gap-3 items-start">
                 <div className="bg-green-50 p-2 rounded-xl text-center min-w-[50px] border border-green-100">
                   <p className="text-[10px] font-bold text-success uppercase">OCT</p>
                   <p className="font-bold text-success">18</p>
                 </div>
                 <div>
                   <p className="font-semibold text-sm text-textPrimary">Web Dev Workshop</p>
                   <p className="text-xs text-textSecondary flex items-center gap-1 mt-1"><Clock size={12}/> 09:00 AM</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;