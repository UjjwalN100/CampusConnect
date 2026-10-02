import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: '1,248' },
          { label: 'New Applications', value: '86', highlight: true },
          { label: 'Pending Verification', value: '23', warning: true },
          { label: 'Pending Payments', value: '14' }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-xl shadow-sm border ${stat.highlight ? 'border-primary bg-blue-50' : stat.warning ? 'border-warning bg-orange-50' : 'bg-white border-gray-100'}`}>
            <p className="text-sm font-medium text-textSecondary mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.highlight ? 'text-primary' : stat.warning ? 'text-warning' : 'text-textPrimary'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-textSecondary text-sm uppercase">
                <th className="p-4">App ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">Course</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">CC-2026-00124</td>
                <td className="p-4">Rahul Patil</td>
                <td className="p-4">B.Sc. CS</td>
                <td className="p-4"><span className="bg-blue-100 text-secondary px-2 py-1 rounded text-xs font-bold">Under Review</span></td>
                <td className="p-4"><button className="text-primary hover:underline text-sm font-medium">Review</button></td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">CC-2026-00125</td>
                <td className="p-4">Sneha Desai</td>
                <td className="p-4">B.Com</td>
                <td className="p-4"><span className="bg-yellow-100 text-warning px-2 py-1 rounded text-xs font-bold">Pending</span></td>
                <td className="p-4"><button className="text-primary hover:underline text-sm font-medium">Review</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
