import React from 'react';
import { ShieldCheck, Heart, GraduationCap, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsPostModalOpen, setIsVerifyModalOpen } = useApp();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-xs text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                U
              </div>
              <span className="font-extrabold text-lg text-gray-900 tracking-tight">
                UniMarket<span className="text-emerald-600">.ng</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              The institutional peer-to-peer campus marketplace connecting tertiary scholars across Nigerian universities for verified, safe student trade.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Union Validated</span>
            </div>
          </div>

          {/* Campus Safety Zones */}
          <div>
            <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-[11px] mb-3">
              Campus Safety Zones
            </h4>
            <p className="text-[11px] text-gray-500 mb-2">
              Always complete exchanges in public campus daylight zones:
            </p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>UNILAG: SUB Cafeteria & Main Library</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>UI IBADAN: Kenneth Dike Library Foyer</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>UNIBEN: June 12 Basement Arcade</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>OAU: Hezekiah Library / SUB Quad</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>UNICROSS: ETF Complex & Main Gate</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-[11px] mb-3">
              Student Marketplace Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setCurrentView('marketplace')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Academic Textbooks & Handouts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('wishlist')}
                  className="hover:text-rose-700 transition-colors flex items-center gap-1"
                >
                  <span>My Campus Wishlist</span>
                  <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsPostModalOpen(true)}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Post New Item For Sale
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsVerifyModalOpen(true)}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Student Verification Program
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Seller Dashboard Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Safety Guidelines */}
          <div>
            <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-[11px] mb-3">
              Safety Guidelines
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Never send payment before inspecting items in person. Inspect condition and confirm student ID badges prior to monetary exchange.
            </p>
            <button
              onClick={() => setCurrentView('safety')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
            >
              Read Complete Safety Tips →
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © 2026 UniMarket.ng. Built for Nigerian University Scholars (UNILAG, UI, UNIBEN, OAU, UNN, UNICROSS, UNICAL, FUTA).
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('safety')} className="hover:text-gray-800">
              Safety Policy
            </button>
            <span>•</span>
            <span className="text-gray-400">Terms of Service</span>
            <span>•</span>
            <span className="text-gray-400">Campus Directory</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
