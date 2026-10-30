import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Phone, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Check, 
  Share2, 
  Building2, 
  BatteryCharging, 
  Cpu, 
  HardDrive, 
  Sparkles,
  ArrowRight,
  Flag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira, generateWhatsAppUrl } from '../utils/formatters';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeProductDetail, 
    setActiveProductDetail, 
    isInWishlist, 
    toggleWishlist, 
    openChatForProduct,
    setIsEscrowModalOpen,
    setActiveEscrowProduct,
    incrementWhatsAppLead,
    showToast
  } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const isFavorited = isInWishlist(product.id);
  const whatsAppUrl = generateWhatsAppUrl(product.sellerPhone, product.title, product.price);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 Product link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Header with Back & Actions */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-emerald-700">{product.universityName}</span>
            <span>/</span>
            <span className="font-medium text-gray-700">{product.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isFavorited 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'border-gray-200 text-gray-600 hover:text-rose-500 hover:bg-rose-50/50'
              }`}
              title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => setActiveProductDetail(null)}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safe Zone Alert Banner */}
        <div className="bg-emerald-50 px-4 sm:px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Campus Safe Zone:</strong> Verified on-campus exchange. Recommended handoff: SUB Atrium or Faculty Library.
            </span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px]">
            Zero Merchant Fees
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery, Specs, Story, Campus Spot (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Image Gallery */}
              <div>
                <div className="relative aspect-16/10 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-800/90 backdrop-blur-xs text-white text-xs font-bold">
                      {product.universityName.includes('(') ? product.universityName.split('(')[1]?.replace(')', '') : product.universityName}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-gray-900 text-xs font-bold shadow-xs">
                      {product.condition}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 mt-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImageIndex === idx ? 'border-emerald-600 scale-102 shadow-xs' : 'border-gray-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Listed {product.createdAt} • Reference #{product.id.slice(0, 10).toUpperCase()}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  {product.title}
                </h1>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Core Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Condition</div>
                  <div className="text-xs font-black text-gray-900 mt-0.5">{product.condition}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Campus Handoff</div>
                  <div className="text-xs font-black text-emerald-800 mt-0.5">SUB Safe Spot</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Views</div>
                  <div className="text-xs font-black text-gray-900 mt-0.5">{product.viewsCount} scholars</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">WhatsApp Leads</div>
                  <div className="text-xs font-black text-emerald-600 mt-0.5">{product.whatsappLeadsCount} active</div>
                </div>
              </div>

              {/* Verified Specifications Table (if available) */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      Verified Specifications
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Hardware Checked
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="bg-white p-2.5 rounded-xl border border-gray-200/60">
                        <span className="text-gray-400 font-semibold block text-[10px] uppercase">{key}</span>
                        <span className="text-gray-900 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included in this student sale bundle */}
              {product.includedBundle && product.includedBundle.length > 0 && (
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Included in this student sale bundle:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {product.includedBundle.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Item Story & Honest Reason for Sale */}
              {product.itemStory && (
                <div className="bg-emerald-50/40 rounded-2xl p-4 sm:p-5 border border-emerald-100/70">
                  <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Item Story & Reason for Sale
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "{product.itemStory}"
                  </p>
                  {product.batteryHealth && (
                    <div className="mt-3 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-600 flex items-center gap-1.5">
                        <BatteryCharging className="w-4 h-4 text-emerald-600" />
                        Diagnostic Health Check:
                      </span>
                      <span className="font-extrabold text-emerald-800">{product.batteryHealth}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Campus Inspection Location & Safe Meetup Guide */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Designated Campus Inspection Spot
                  </h4>
                  <span className="text-[10px] font-bold text-gray-500">
                    Daylight Hours: 9 AM - 5 PM
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-3">
                  <div className="text-xs font-bold text-gray-900">
                    📍 {product.campusHandoffSpot}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">
                    Student hostel / faculty hub: {product.hostelOrFaculty}. Monitored public spot with power sockets and daylight presence.
                  </div>
                </div>

                {/* Visual Campus Zone Card */}
                <div className="p-3 bg-gradient-to-r from-emerald-100/60 to-teal-100/60 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-emerald-950">Campus Safe Spot Verified</div>
                    <div className="text-[11px] text-emerald-800">
                      Both buyer and seller have confirmed meeting inside official university gates.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveProductDetail(null);
                      // Switch to safety view
                    }}
                    className="px-2.5 py-1 bg-white text-emerald-800 font-bold text-[10px] rounded-lg shadow-2xs hover:bg-emerald-50"
                  >
                    View Map
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing, CTAs, Wishlist, WhatsApp & Seller Profile (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Price & Primary Action Card */}
              <div className="bg-white rounded-2xl border-2 border-emerald-600/30 p-5 shadow-lg space-y-4">
                
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Asking Price
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                      {formatNaira(product.price)}
                    </span>
                    {product.priceNegotiable && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Slightly Negotiable
                      </span>
                    )}
                  </div>
                  {product.retailComparisonPrice && (
                    <div className="mt-1 text-[11px] text-gray-500">
                      Fair campus valuation (Retail is ~{formatNaira(product.retailComparisonPrice)} new)
                    </div>
                  )}
                </div>

                {/* Wishlist Button on Product Details Page (Key Requirement!) */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : 'text-gray-500'}`} />
                  <span>{isFavorited ? '❤️ In Your Campus Wishlist (Click to Remove)' : '🤍 Add to Campus Wishlist'}</span>
                </button>

                {/* Primary WhatsApp Direct CTA (Required Spec) */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => incrementWhatsAppLead(product.id)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Chat with Seller via WhatsApp</span>
                </a>

                {/* Safe Campus Escrow Offer Button */}
                <button
                  onClick={() => {
                    setActiveEscrowProduct(product);
                    setIsEscrowModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Make Secure Escrow Offer</span>
                </button>

                {/* In-App Direct Chat Button */}
                <button
                  onClick={() => openChatForProduct(product)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Reply via UniChat (In-App)</span>
                </button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                  <a
                    href={`tel:${product.sellerPhone}`}
                    className="py-2 px-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>Call Student</span>
                  </a>
                  <button
                    onClick={() => showToast('Report submitted for security team review.')}
                    className="py-2 px-3 rounded-lg border border-gray-200 text-gray-500 hover:text-rose-600 hover:bg-rose-50 font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report Listing</span>
                  </button>
                </div>

              </div>

              {/* Seller Verified Profile Card */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Seller Information
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={product.sellerAvatar}
                    alt={product.sellerName}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <div className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                      {product.sellerName}
                      {product.sellerIsVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {product.universityName}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      {product.sellerDept} • {product.sellerLevel}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/80 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Matric Verification:</span>
                    <span className="font-bold text-gray-900">{product.sellerMatricMasked} (EduID Verified)</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Student Trust Rating:</span>
                    <span className="font-bold text-amber-600">⭐ {product.sellerRating} / 5.0 (Top Seller)</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Safe Campus Deals:</span>
                    <span className="font-bold text-emerald-700">18 completed (0 disputes)</span>
                  </div>
                </div>
              </div>

              {/* UniMarket Campus Guarantee Box */}
              <div className="bg-emerald-900 text-white rounded-2xl p-4 space-y-2.5">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  UniMarket Campus Guarantee
                </div>
                <ul className="text-[11px] text-emerald-100 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Inspect First:</strong> Physical inspection on campus before handing over payment.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Escrow Protection:</strong> Funds secured until you exchange the 4-digit code.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Advance Fees:</strong> Never transfer dispatch fees outside campus gates.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
