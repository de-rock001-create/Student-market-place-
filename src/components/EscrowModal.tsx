import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  MapPin, 
  AlertCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../utils/formatters';

export const EscrowModal: React.FC = () => {
  const { 
    isEscrowModalOpen, 
    setIsEscrowModalOpen, 
    activeEscrowProduct, 
    createEscrowTransaction,
    showToast 
  } = useApp();

  const [handoffSpot, setHandoffSpot] = useState('SUB Food Court (Daylight Hours 10 AM - 4 PM)');
  const [createdTx, setCreatedTx] = useState<any | null>(null);

  if (!isEscrowModalOpen || !activeEscrowProduct) return null;

  const handleCreate = () => {
    const tx = createEscrowTransaction(activeEscrowProduct, handoffSpot);
    setCreatedTx(tx);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 relative">
          <button
            onClick={() => {
              setIsEscrowModalOpen(false);
              setCreatedTx(null);
            }}
            className="absolute top-4 right-4 text-amber-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-xl font-black tracking-tight">
            UniMarket Safe Campus Escrow 🛡️
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Zero fees. Funds are held safely until you physically test the gadget at SUB.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {createdTx ? (
            /* Success State with Delivery OTP */
            <div className="text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-black text-gray-900">Escrow Locked & Ready!</h3>
                <p className="text-gray-500 mt-1">
                  Reference: <span className="font-mono font-bold text-gray-800">{createdTx.referenceNumber}</span>
                </p>
              </div>

              {/* Secret OTP Display */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                <span className="text-emerald-800 font-bold uppercase text-[10px] tracking-wider block">
                  Your 4-Digit Handshake Delivery OTP:
                </span>
                <div className="text-3xl font-mono font-black text-emerald-800 tracking-widest my-1">
                  {createdTx.deliveryOtp}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">
                  ⚠️ <strong>Rule:</strong> Do NOT disclose this OTP to {activeEscrowProduct.sellerName} until you have physically inspected the item at {handoffSpot}.
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Secured:</span>
                  <span className="font-bold text-gray-900">{formatNaira(createdTx.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seller:</span>
                  <span className="font-bold text-gray-900">{createdTx.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Safe Spot:</span>
                  <span className="font-bold text-emerald-800">{createdTx.handoffLocation}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsEscrowModalOpen(false);
                  setCreatedTx(null);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
              >
                Done • View on Student Dashboard
              </button>
            </div>
          ) : (
            /* Creation Form */
            <div className="space-y-4">
              
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <img
                  src={activeEscrowProduct.images[0]}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 truncate">{activeEscrowProduct.title}</div>
                  <div className="text-emerald-700 font-black text-sm">{formatNaira(activeEscrowProduct.price)}</div>
                </div>
              </div>

              {/* 3 Steps Guide */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2 bg-amber-50/60 rounded-xl border border-amber-100">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span className="text-amber-950 text-[11px]">
                    <strong>Funds Secured:</strong> {formatNaira(activeEscrowProduct.price)} is held in the campus vault.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2 bg-amber-50/60 rounded-xl border border-amber-100">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span className="text-amber-950 text-[11px]">
                    <strong>Daylight Handoff:</strong> Meet {activeEscrowProduct.sellerName} at the designated campus hub to test and verify.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2 bg-amber-50/60 rounded-xl border border-amber-100">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span className="text-amber-950 text-[11px]">
                    <strong>Release via OTP:</strong> When 100% satisfied, share the 4-digit code to instantly release funds to the seller.
                  </span>
                </div>
              </div>

              {/* Meeting Spot */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Choose Safe Handoff Location:
                </label>
                <select
                  value={handoffSpot}
                  onChange={(e) => setHandoffSpot(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-medium"
                >
                  <option value="SUB Food Court & Student Union Arcade">SUB Food Court & Student Union Arcade</option>
                  <option value="Main University Library Front Steps">Main University Library Front Steps</option>
                  <option value="Faculty of Engineering Quadrangle Fountain">Faculty of Engineering Quadrangle</option>
                  <option value="Campus Main Gate Security Pavilion">Campus Main Gate Security Pavilion</option>
                </select>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={handleCreate}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Lock Funds & Generate Handshake OTP</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
