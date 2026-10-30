import React, { useState } from 'react';
import { 
  PlusCircle, 
  Eye, 
  MessageSquare, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Edit3, 
  Trash2, 
  Zap, 
  MapPin, 
  Check, 
  ExternalLink,
  Lock,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira, generateWhatsAppUrl } from '../utils/formatters';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    products, 
    deleteProduct, 
    boostProduct, 
    toggleProductStatus,
    setEditingProduct, 
    setIsPostModalOpen, 
    setIsVerifyModalOpen,
    openChatForProduct,
    setActiveProductDetail,
    conversations,
    escrowTransactions,
    releaseEscrowWithOtp,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'sold'>('active');
  const [otpInput, setOtpInput] = useState<{ [txId: string]: string }>({});

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-gray-900">Student Dashboard</h2>
        <p className="mt-2 text-sm text-gray-500">Sign in to manage your campus listings, track inquiries, and release escrow funds.</p>
      </div>
    );
  }

  // Filter listings belonging to this seller
  const userProducts = products.filter(p => p.sellerId === currentUser.id || p.sellerName === currentUser.fullName);

  const displayedProducts = userProducts.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return p.status === 'active';
    if (activeTab === 'pending') return p.status === 'pending_escrow';
    if (activeTab === 'sold') return p.status === 'sold';
    return true;
  });

  const handleOtpSubmit = (txId: string) => {
    const code = otpInput[txId];
    if (!code || code.length < 4) {
      showToast('Please enter the 4-digit OTP provided by the student buyer.');
      return;
    }
    const success = releaseEscrowWithOtp(txId, code);
    if (success) {
      setOtpInput(prev => ({ ...prev, [txId]: '' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Semester Week 8 • Mid-Term Trade Surge • Matric No: {currentUser.matricNumber ? `${currentUser.matricNumber.slice(0, 6)}***` : 'Verified'}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2">
              Welcome back, {currentUser.fullName.split(' ')[0]} <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-xl">
              Managing your live student listings and escrow releases across {currentUser.universityName} ({currentUser.campusName}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>+ Create New Listing</span>
            </button>
          </div>
        </div>

        {/* Decorative corner ring */}
        <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border-8 border-white/5 pointer-events-none"></div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sales Generated</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              ₦
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {formatNaira(currentUser.totalSalesAmount)}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% this semester</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Listings</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              📢
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {userProducts.filter(p => p.status === 'active').length} Live Ads
          </div>
          <div className="mt-2 text-[11px] text-gray-500 font-medium">
            Visible to 42k+ {currentUser.universityName.split(' ')[0]} students
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Items Sold</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              🤝
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {currentUser.totalSalesCount} Completed
          </div>
          <div className="mt-2 text-[11px] text-teal-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% successful handshakes</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Buyer Trust Rating</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              ⭐
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {currentUser.trustRating} <span className="text-sm font-normal text-gray-400">/ 5.0</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-700 font-semibold">
            Top 5% Student Seller Badge
          </div>
        </div>

      </div>

      {/* University Verified Status Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-gray-900">University Verified Status</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {currentUser.badgeLevel || 'Active • Level 4 Clearance'}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Validated through {currentUser.universityName.split(' ')[0]} EduID SSO Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('📲 Seller QR Flyer generated! You can print and stick it on your hostel notice board.')}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Download Seller QR Flyer</span>
            </button>
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold cursor-pointer"
            >
              Update Credentials
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-gray-400 block font-semibold uppercase text-[10px]">Institution</span>
            <span className="font-bold text-gray-900 text-sm">{currentUser.universityName}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold uppercase text-[10px]">Faculty & Dept</span>
            <span className="font-bold text-gray-900 text-sm">{currentUser.department} ({currentUser.studyLevel})</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold uppercase text-[10px]">Institutional Email</span>
            <span className="font-bold text-gray-900 text-sm truncate block">{currentUser.email}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold uppercase text-[10px]">Matric ID Expiry</span>
            <span className="font-bold text-gray-900 text-sm">Nov 2026 (Digital Sync)</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-emerald-800 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span><strong>Campus Safe Zone Active:</strong> Buyers feel 94% more confident transacting with verified matriculated students inside recognized campus halls and libraries.</span>
        </div>
      </div>

      {/* Main Grid: Listings Hub (8 cols) and Chats & Leads (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Campus Listings Hub (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            
            {/* Hub Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-black text-gray-900">Campus Listings Hub</h3>
                <p className="text-xs text-gray-500">Track views, pending escrow funds, and buyer bids</p>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'active' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Active ({userProducts.filter(p => p.status === 'active').length})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'pending' ? 'bg-white text-amber-800 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Pending Escrow ({userProducts.filter(p => p.status === 'pending_escrow').length})
                </button>
                <button
                  onClick={() => setActiveTab('sold')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'sold' ? 'bg-white text-gray-800 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Sold ({userProducts.filter(p => p.status === 'sold').length})
                </button>
              </div>
            </div>

            {/* Listings List */}
            <div className="divide-y divide-gray-100">
              {displayedProducts.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No listings found under this tab.
                </div>
              ) : (
                displayedProducts.map(product => (
                  <div key={product.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div className="flex items-start gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0 border border-gray-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold">
                            {product.category}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            👁️ {product.viewsCount} views • 💬 {product.whatsappLeadsCount} WhatsApp Leads
                          </span>
                        </div>
                        <h4 
                          onClick={() => setActiveProductDetail(product)}
                          className="font-bold text-gray-900 text-sm mt-0.5 hover:text-emerald-700 cursor-pointer line-clamp-1"
                        >
                          {product.title}
                        </h4>
                        <div className="text-sm font-black text-emerald-700 mt-1">
                          {formatNaira(product.price)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => boostProduct(product.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold flex items-center gap-1 hover:bg-amber-100 transition-colors cursor-pointer"
                        title="Boost listing to top of campus feed"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Boost</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsPostModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                        title="Edit listing"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {product.status === 'active' ? (
                        <button
                          onClick={() => toggleProductStatus(product.id, 'sold')}
                          className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer"
                        >
                          Mark Sold
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleProductStatus(product.id, 'active')}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold cursor-pointer"
                        >
                          Relist
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (window.confirm('Delete this listing?')) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>

          {/* Safe Escrow Transactions Section */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <span>Safe Escrow Transactions</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Zero Merchant Fee Promo
                  </span>
                </h3>
                <p className="text-xs text-gray-500">
                  Guaranteed fund release upon buyer physical verification on campus
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="pb-2">Transaction Ref</th>
                    <th className="pb-2">Campus Buyer</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Handoff Location</th>
                    <th className="pb-2">Escrow Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {escrowTransactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-gray-50/50">
                      <td className="py-3 font-mono font-bold text-gray-800">{tx.referenceNumber}</td>
                      <td className="py-3 font-semibold text-gray-800">{tx.buyerName}</td>
                      <td className="py-3 font-black text-emerald-700">{formatNaira(tx.amount)}</td>
                      <td className="py-3 text-gray-600">{tx.handoffLocation}</td>
                      <td className="py-3">
                        {tx.status === 'funded_in_escrow' ? (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Pending OTP
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Released to Bank
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {tx.status === 'funded_in_escrow' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="OTP"
                              value={otpInput[tx.id] || ''}
                              onChange={(e) => setOtpInput({ ...otpInput, [tx.id]: e.target.value })}
                              className="w-16 px-1.5 py-1 text-center font-mono font-bold text-xs border border-gray-300 rounded-lg"
                            />
                            <button
                              onClick={() => handleOtpSubmit(tx.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                            >
                              Release
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-gray-400 font-medium">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Campus Chats & Safe Handoffs (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Campus Safe Handoffs Recommended Spots */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Campus Safe Handoffs
              </h4>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
            <p className="text-xs text-amber-900/80 mb-3">
              Safe meeting coordinates monitored with {currentUser.universityName.split(' ')[0]} Security presence during daytime:
            </p>
            <div className="space-y-2 text-xs">
              <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/50 flex items-center justify-between">
                <span className="font-bold text-gray-800">🏛️ Main Library Arcade</span>
                <span className="text-[10px] text-gray-500">8am - 6pm</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/50 flex items-center justify-between">
                <span className="font-bold text-gray-800">☕ SUB Cafeteria Hub</span>
                <span className="text-[10px] text-gray-500">All Day</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/50 flex items-center justify-between">
                <span className="font-bold text-gray-800">🏫 Faculty Quadrangle</span>
                <span className="text-[10px] text-gray-500">Until 8pm</span>
              </div>
            </div>
          </div>

          {/* Campus Chats & Leads */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h4 className="font-black text-sm text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Campus Chats & Leads</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {conversations.length} active
              </span>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {conversations.map(conv => (
                <div key={conv.id} className="py-3 text-xs space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={conv.buyerAvatar}
                        alt={conv.buyerName}
                        className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{conv.buyerName}</div>
                        <div className="text-[10px] text-gray-400">{conv.buyerHostel} • {conv.lastTimestamp}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs line-clamp-2 bg-gray-50 p-2 rounded-lg italic">
                    "{conv.lastMessage}"
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        const product = products.find(p => p.id === conv.productId);
                        if (product) openChatForProduct(product);
                      }}
                      className="flex-1 py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] text-center cursor-pointer"
                    >
                      Reply on UniChat
                    </button>
                    <a
                      href={generateWhatsAppUrl('2348039281144', conv.productTitle, conv.productPrice)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 px-2.5 rounded-lg border border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-bold text-[11px]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Hustle Tip */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200/80 text-xs text-emerald-950">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <span>💡</span> Campus Hustle Tip
            </div>
            <p className="text-gray-700 leading-relaxed text-[11px]">
              Listings with specific hostel pick-up tags sell <strong>2.4x faster</strong> during exam prep week. Add your hall name to attract immediate room-to-room buyers.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
