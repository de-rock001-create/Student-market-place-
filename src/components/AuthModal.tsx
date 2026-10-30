import React, { useState } from 'react';
import { X, Mail, Lock, User, Building2, Phone, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';
import { DEMO_USERS } from '../data/mockData';
import { StudentUser } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    switchDemoUser,
    setIsVerifyModalOpen,
    showToast 
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [universityId, setUniversityId] = useState('unilag');

  if (!isAuthModalOpen) return null;

  const currentUni = NIGERIAN_UNIVERSITIES.find(u => u.id === universityId) || NIGERIAN_UNIVERSITIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your university email.');
      return;
    }

    const newUser: StudentUser = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim() || 'Student Scholar',
      email: email.trim(),
      phoneNumber: phone.trim() || '+2348012345678',
      whatsappNumber: phone.replace(/[^0-9]/g, '') || '2348012345678',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      universityId,
      universityName: currentUni.fullName,
      campusName: currentUni.mainCampus,
      faculty: currentUni.faculties[0] || 'General Studies',
      department: 'Undergraduate',
      studyLevel: '200L',
      isVerified: false,
      trustRating: 5.0,
      totalSalesCount: 0,
      totalSalesAmount: 0,
      activeAdsCount: 0,
      joinedDate: 'Oct 2026',
    };

    loginUser(newUser);
    setIsAuthModalOpen(false);
    
    // Prompt for matric verification
    setTimeout(() => {
      setIsVerifyModalOpen(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="bg-emerald-900 text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-xl mb-2">
            U
          </div>
          <h2 className="text-xl font-black tracking-tight">
            {isRegister ? 'Create Student Account' : 'Welcome to UniMarket.ng'}
          </h2>
          <p className="text-xs text-emerald-200 mt-1">
            Buy & sell securely inside Nigerian university campuses
          </p>
        </div>

        {/* Quick Demo Switcher */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100">
          <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-2">
            ⚡ Quick Demo Student Sign-In:
          </div>
          <div className="space-y-1.5">
            {DEMO_USERS.map(demo => (
              <button
                key={demo.id}
                onClick={() => {
                  switchDemoUser(demo.id);
                  setIsAuthModalOpen(false);
                }}
                className="w-full p-2 rounded-xl bg-white hover:bg-emerald-100/50 border border-emerald-200 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <img src={demo.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-gray-800">{demo.fullName}</span>
                    <span className="text-gray-500 text-[10px] ml-1.5">({demo.universityName.split(' ')[0]} • {demo.studyLevel})</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Use Profile
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Regular Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {isRegister && (
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Student Email (Institutional or Personal)
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. yourname@live.unilag.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              WhatsApp Phone Number (For Buyer Direct Leads)
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 08031234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Your University
            </label>
            <select
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold"
            >
              {NIGERIAN_UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.fullName} ({u.shortName})</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer"
          >
            {isRegister ? 'Continue to Verification' : 'Sign In as Student'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-emerald-700 hover:underline font-bold"
            >
              {isRegister ? 'Already registered? Sign in here' : "Don't have an account? Register free"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
