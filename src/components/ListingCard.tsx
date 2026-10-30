import React from 'react';
import { Heart, MessageSquare, ShieldCheck, MapPin, ExternalLink, Check } from 'lucide-react';
import { ProductListing } from '../types';
import { useApp } from '../context/AppContext';
import { formatNaira, generateWhatsAppUrl } from '../utils/formatters';

interface ListingCardProps {
  listing: ProductListing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    setActiveProductDetail, 
    openChatForProduct,
    incrementWhatsAppLead 
  } = useApp();

  const isFavorited = isInWishlist(listing.id);
  const whatsAppUrl = generateWhatsAppUrl(listing.sellerPhone, listing.title, listing.price);

  return (
    <div 
      onClick={() => setActiveProductDetail(listing)}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image & Top Floating Badges */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-emerald-800/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wide shadow-2xs">
            {listing.universityName.includes('(') ? listing.universityName.split('(')[1]?.replace(')', '') : listing.universityName}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-gray-800 text-[10px] font-bold shadow-2xs">
            {listing.condition}
          </span>
        </div>

        {/* Wishlist Heart Button (Tied to Authenticated User) */}
        <button
          type="button"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
            isFavorited 
              ? 'bg-rose-50 text-rose-600 scale-110' 
              : 'bg-white/90 backdrop-blur-xs text-gray-500 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Price Tag Overlay on bottom left */}
        {listing.isUrgentSale && (
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
            🔥 Urgent Sale
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Location / Hall */}
          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mb-1 truncate">
            <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{listing.hostelOrFaculty}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {listing.title}
          </h3>

          {/* Seller micro tag */}
          <div className="mt-2.5 flex items-center gap-2">
            <img
              src={listing.sellerAvatar}
              alt={listing.sellerName}
              className="w-5 h-5 rounded-full object-cover border border-emerald-500"
            />
            <span className="text-[11px] text-gray-600 font-medium truncate">
              {listing.sellerName} • {listing.sellerLevel} {listing.sellerDept}
            </span>
            {listing.sellerIsVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-black text-emerald-700 leading-tight">
              {formatNaira(listing.price)}
            </div>
            {listing.priceNegotiable ? (
              <div className="text-[10px] text-gray-400 font-medium">Slightly Negotiable</div>
            ) : (
              <div className="text-[10px] text-gray-400 font-medium">Fixed Price</div>
            )}
          </div>

          {/* Buttons: WhatsApp direct & UniChat */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => incrementWhatsAppLead(listing.id)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1 border border-emerald-200 transition-colors cursor-pointer"
              title="Chat on WhatsApp"
            >
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">WA</span>
            </a>

            <button
              onClick={() => openChatForProduct(listing)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
              title="In-app Campus Chat"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Chat</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
