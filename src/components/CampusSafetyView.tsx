import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  ArrowLeft,
  Building2,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';

export const CampusSafetyView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <button
          onClick={() => setCurrentView('marketplace')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </button>

        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
          Institutional Integrity Protocol
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Engineered for Nigerian Student Protection 🛡️
        </h1>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          UniMarket pairs student identity validation with physically designated campus daylight hubs to render campus marketplace fraud statistically obsolete.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">
            Matric Number & ID Verification
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every seller profile is linked to official university registrar credentials. We verify student badges, faculty, matric hash, and current course level so you know exactly which peer you are trading with.
          </p>
          <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Academic Registry Cross-Check</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">
            Designated Campus Safe Spots
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Transact safely in daylight at recognized public campus locations monitored by student union officials and campus security guards. Power sockets are available inside SUB cafeterias for laptop testing.
          </p>
          <div className="pt-2 text-[11px] font-bold text-blue-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Covered by Campus Security Patrols</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">
            WhatsApp Direct & Escrow Guarantee
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Chat instantly on WhatsApp to negotiate terms. For high-value transactions like laptops or multi-semester sublets, lock funds in optional UniMarket Campus Escrow until physical condition is thoroughly inspected.
          </p>
          <div className="pt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero Advance Fee Mandate</span>
          </div>
        </div>

      </div>

      {/* Directory of Designated Safe Spots Per University */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            Designated Campus Safe Spots Directory
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Official daylight meeting coordinates for student peer exchanges:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NIGERIAN_UNIVERSITIES.map(uni => (
            <div key={uni.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-gray-900">{uni.shortName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {uni.state}
                </span>
              </div>
              <div className="text-[11px] text-gray-600 font-medium">{uni.fullName}</div>
              
              <div className="pt-2 border-t border-gray-200 space-y-1.5 text-xs">
                <div className="flex items-start gap-1.5 text-gray-800">
                  <span className="text-emerald-600 font-bold flex-shrink-0">SUB:</span>
                  <span className="text-[11px]">{uni.subSafeZone}</span>
                </div>
                <div className="flex items-start gap-1.5 text-gray-800">
                  <span className="text-blue-600 font-bold flex-shrink-0">Library:</span>
                  <span className="text-[11px]">{uni.librarySafeZone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Alert Box */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-rose-950 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm text-rose-900">
            Crucial Student Safety Advisory (SUG Welfare Approved)
          </h3>
          <p className="mt-1 text-xs text-rose-800/90 leading-relaxed">
            Never send payment before inspecting items in person. Inspect condition and confirm student ID badges prior to monetary exchange. Under no circumstances should you meet an unknown seller off-campus after 8:00 PM or in isolated residential quarters.
          </p>
        </div>
      </div>

    </div>
  );
};
