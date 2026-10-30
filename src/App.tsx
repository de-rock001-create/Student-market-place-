/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SafeTradingBanner } from './components/SafeTradingBanner';
import { Navbar } from './components/Navbar';
import { MarketplaceView } from './components/MarketplaceView';
import { WishlistPage } from './components/WishlistPage';
import { DashboardView } from './components/DashboardView';
import { CampusSafetyView } from './components/CampusSafetyView';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PostListingModal } from './components/PostListingModal';
import { StudentVerificationModal } from './components/StudentVerificationModal';
import { UniChatModal } from './components/UniChatModal';
import { EscrowModal } from './components/EscrowModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#f8faf9] text-gray-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Campus Safety Alert Banner */}
      <SafeTradingBanner />

      {/* Main Top Navigation */}
      <Navbar />

      {/* View Switcher */}
      <main className="flex-1">
        {currentView === 'marketplace' && <MarketplaceView />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'safety' && <CampusSafetyView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Application Modals */}
      <ProductDetailModal />
      <PostListingModal />
      <StudentVerificationModal />
      <UniChatModal />
      <EscrowModal />
      <AuthModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-gray-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-800 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
