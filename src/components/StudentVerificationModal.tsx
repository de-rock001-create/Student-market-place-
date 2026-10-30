import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  FileCheck, 
  QrCode,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';

export const StudentVerificationModal: React.FC = () => {
  const { 
    currentUser, 
    isVerifyModalOpen, 
    setIsVerifyModalOpen, 
    verifyStudentAccount,
    showToast 
  } = useApp();

  const [universityId, setUniversityId] = useState(currentUser?.universityId || 'unilag');
  const [matricNumber, setMatricNumber] = useState(currentUser?.matricNumber || '190805041');
  const [faculty, setFaculty] = useState(currentUser?.faculty || 'Faculty of Science');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science');
  const [studyLevel, setStudyLevel] = useState(currentUser?.studyLevel || '400L (Final Year)');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStage, setVerificationStage] = useState('');

  if (!isVerifyModalOpen || !currentUser) return null;

  const currentUni = NIGERIAN_UNIVERSITIES.find(u => u.id === universityId) || NIGERIAN_UNIVERSITIES[0];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricNumber.trim()) {
      showToast('Please enter your Matriculation Number or JAMB Registration Number.');
      return;
    }

    setIsVerifying(true);
    setVerificationStage('Validating with ' + currentUni.shortName + ' EduID Portal Gateway...');

    setTimeout(() => {
      setVerificationStage('Verifying active enrollment for Matric: ' + matricNumber + '...');
      setTimeout(() => {
        setVerificationStage('Generating cryptographic Verified Student Badge...');
        setTimeout(() => {
          setIsVerifying(false);
          verifyStudentAccount({
            universityId,
            universityName: currentUni.fullName,
            matricNumber: matricNumber.trim(),
            faculty,
            department,
            studyLevel
          });
          setIsVerifyModalOpen(false);
        }, 800);
      }, 900);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={() => setIsVerifyModalOpen(false)}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
            <GraduationCap className="w-7 h-7 text-emerald-300" />
          </div>

          <h2 className="text-xl font-black tracking-tight">
            Student Identity Verification 🇳🇬
          </h2>
          <p className="text-xs text-emerald-200 mt-1">
            Unlock the <strong>Verified Student Badge</strong> by linking your authentic university matriculation credentials.
          </p>
        </div>

        {/* Benefits Pill */}
        <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified sellers close sales 3.5x faster
          </span>
          <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded font-extrabold">
            100% Free
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleVerify} className="p-6 space-y-4 text-xs">
          
          {/* University */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Select Your University *
            </label>
            <select
              value={universityId}
              onChange={(e) => {
                setUniversityId(e.target.value);
                const uni = NIGERIAN_UNIVERSITIES.find(u => u.id === e.target.value);
                if (uni) {
                  setFaculty(uni.faculties[0]);
                }
              }}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-emerald-500"
            >
              {NIGERIAN_UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.fullName} ({u.shortName})</option>
              ))}
            </select>
          </div>

          {/* Matric Number or JAMB Reg */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Matriculation or JAMB Reg Number *</span>
              <span className="text-[10px] text-gray-400 font-medium">Privacy Masked (190805***)</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 190805041 or 202484910283FA"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Faculty & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Faculty
              </label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-medium"
              >
                {currentUni.faculties.map((f, i) => (
                  <option key={i} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, MBBS, Law"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-medium"
              />
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Current Academic Level
            </label>
            <select
              value={studyLevel}
              onChange={(e) => setStudyLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-medium"
            >
              <option value="100L (Fresher)">100L (Fresher)</option>
              <option value="200L">200L</option>
              <option value="300L">300L</option>
              <option value="400L (Final Year)">400L (Final Year)</option>
              <option value="500L (Finalist)">500L (Finalist - Engineering/Pharmacy/Medicine)</option>
              <option value="Postgraduate / Masters">Postgraduate / Masters</option>
            </select>
          </div>

          {/* Simulated ID Card Card Preview */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-1">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Simulated EduID Digital Card Ready</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Validates your status against {currentUni.shortName} student registrar database
            </p>
          </div>

          {/* Progress loader if verifying */}
          {isVerifying && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin mx-auto" />
              <div className="font-bold text-emerald-900 text-xs">{verificationStage}</div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isVerifying}
              onClick={() => setIsVerifyModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{currentUser.isVerified ? 'Update & Re-verify' : 'Verify My Student Status'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
