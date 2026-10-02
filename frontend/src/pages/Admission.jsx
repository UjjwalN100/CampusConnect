import React, { useState } from 'react';

const Admission = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = (e) => { e.preventDefault(); setStep(s => Math.min(s + 1, totalSteps)); };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">Online Admission</h1>
        <p className="text-textSecondary mt-2">Complete your profile to apply for admission.</p>
      </div>
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-secondary transition-all duration-300" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}></div>
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'}`}>
            {s}
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={step === totalSteps ? (e) => { e.preventDefault(); alert('Application Submitted (Demo)'); } : nextStep}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">1. Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-1">Full Name</label><input required className="w-full border p-2 rounded" defaultValue="Rahul Patil" /></div>
                <div><label className="block text-sm mb-1">Date of Birth</label><input type="date" required className="w-full border p-2 rounded" defaultValue="2004-05-15" /></div>
                <div className="col-span-2"><label className="block text-sm mb-1">Address</label><textarea required className="w-full border p-2 rounded" defaultValue="Mumbai, MH"></textarea></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">2. Academic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm mb-1">Previous Institution</label><input required className="w-full border p-2 rounded" defaultValue="Demo Junior College" /></div>
                <div><label className="block text-sm mb-1">Qualification</label><input required className="w-full border p-2 rounded" defaultValue="HSC" /></div>
                <div><label className="block text-sm mb-1">Percentage/CGPA</label><input required className="w-full border p-2 rounded" defaultValue="85%" /></div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">3. Course Selection</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm mb-1">Preferred Program</label>
                  <select className="w-full border p-2 rounded"><option>Undergraduate</option><option>Postgraduate</option></select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Course</label>
                  <select className="w-full border p-2 rounded"><option>B.Sc. Computer Science</option><option>B.Com</option><option>BCA</option><option>BBA</option><option>B.Tech</option></select>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">4. Document Upload</h2>
              <p className="text-sm text-textSecondary mb-4">Please upload clear copies of the following documents.</p>
              <div className="space-y-3">
                {['Passport Photo', 'Identity Proof', 'Previous Marksheet'].map((doc, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                    <span className="font-medium text-sm">{doc}</span>
                    <input type="file" className="text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button type="button" onClick={prevStep} className={`px-6 py-2 rounded-lg font-medium ${step === 1 ? 'invisible' : 'bg-gray-100'}`}>Back</button>
            <button type="submit" className="px-6 py-2 rounded-lg font-medium bg-primary text-white">{step === totalSteps ? 'Submit' : 'Next Step'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Admission;
