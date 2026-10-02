import React, { useState } from 'react';
import { Download, Printer, QrCode, ShieldCheck, ArrowLeft } from 'lucide-react';

const Fees = () => {
  const [status, setStatus] = useState('Pending'); // Pending, QRCode, Processing, Successful
  const [receipt, setReceipt] = useState(null);

  const handleGenerateQR = () => {
    setStatus('QRCode');
  };

  const handleSimulatePayment = () => {
    setStatus('Processing');
    setTimeout(() => {
      setStatus('Successful');
      setReceipt({
        receiptNumber: 'REC-2026-' + Math.floor(Math.random()*10000),
        transactionId: 'TXN-' + Math.floor(Math.random()*1000000),
        date: new Date().toLocaleDateString(),
        amount: 25000
      });
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto fade-in-up">
      <h1 className="text-3xl font-bold text-textPrimary mb-8 text-center">Fee Payment</h1>

      {status === 'Pending' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 fade-in-up">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">Fee Breakdown</h2>
          <div className="space-y-4 mb-6 text-sm">
            <div className="flex justify-between"><span>Admission Fee</span><span>₹ 5,000</span></div>
            <div className="flex justify-between"><span>Tuition Fee</span><span>₹ 15,000</span></div>
            <div className="flex justify-between"><span>Laboratory Fee</span><span>₹ 3,000</span></div>
            <div className="flex justify-between"><span>Library Fee</span><span>₹ 1,000</span></div>
            <div className="flex justify-between"><span>Other Charges</span><span>₹ 1,000</span></div>
          </div>
          <div className="flex justify-between border-t pt-4 font-bold text-lg mb-8 text-primary">
            <span>Total Payable</span><span>₹ 25,000</span>
          </div>

          <button 
            onClick={handleGenerateQR} 
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-[#112a4a] transition-colors flex items-center justify-center gap-2"
          >
            <QrCode size={20} /> Generate Payment QR Code
          </button>
        </div>
      )}

      {(status === 'QRCode' || status === 'Processing') && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 fade-in-up text-center">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
             <button onClick={() => setStatus('Pending')} className="text-textSecondary hover:text-primary transition-colors disabled:opacity-50" disabled={status === 'Processing'}>
               <ArrowLeft size={24} />
             </button>
             <h2 className="text-xl font-bold">Scan to Pay</h2>
             <div className="w-6"></div> {/* Spacer for alignment */}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl inline-block mb-6 border border-gray-200 shadow-sm relative">
             {status === 'Processing' && (
               <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="font-semibold text-primary">Verifying Payment...</p>
               </div>
             )}
             {/* Using a public API to generate a real-looking QR code for UPI */}
             <img 
               src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=campusconnect@demo&pn=CampusConnect&am=25000&cu=INR" 
               alt="Payment QR Code" 
               className="w-48 h-48 mx-auto mix-blend-multiply"
             />
          </div>

          <div className="text-center mb-8">
             <p className="text-2xl font-bold text-primary mb-1">₹ 25,000</p>
             <p className="text-sm text-textSecondary flex items-center justify-center gap-1">
               <ShieldCheck size={16} className="text-success" /> Secure CampusConnect Gateway
             </p>
          </div>

          <button 
            onClick={handleSimulatePayment} 
            disabled={status === 'Processing'}
            className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-[#0da070] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'Processing' ? 'Processing...' : 'Simulate Payment Completion'}
          </button>
          <p className="text-xs text-textSecondary mt-3">In a real app, the scanner automatically detects successful payment.</p>
        </div>
      )}

      {status === 'Successful' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 fade-in-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4 scale-in" style={{animation: 'scaleIn 0.5s ease-out'}}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-textPrimary">Payment Successful</h2>
            <p className="text-textSecondary mt-1">Your fee has been paid successfully.</p>
          </div>
          
          <div className="bg-gray-50 border rounded-xl p-6 mb-8 text-sm">
            <h3 className="font-bold text-lg mb-4 text-center text-primary">CampusConnect Receipt</h3>
            <div className="grid grid-cols-2 gap-y-4 mb-6">
              <div className="text-textSecondary">Receipt Number</div><div className="font-medium">{receipt.receiptNumber}</div>
              <div className="text-textSecondary">Transaction ID</div><div className="font-medium">{receipt.transactionId}</div>
              <div className="text-textSecondary">Date</div><div className="font-medium">{receipt.date}</div>
              <div className="text-textSecondary">Amount Paid</div><div className="font-bold text-primary">₹ {receipt.amount}</div>
            </div>
            <div className="border-t pt-4 text-center font-bold text-success tracking-wider flex items-center justify-center gap-2">
              <ShieldCheck size={18} /> STATUS: SUCCESSFUL
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => alert("Downloading Receipt as PDF...")} className="flex-1 border py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2"><Download size={18} /> Download</button>
            <button onClick={() => window.print()} className="flex-1 border py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2"><Printer size={18} /> Print</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
