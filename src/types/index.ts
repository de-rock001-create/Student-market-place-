export type CampusCondition = 
  | 'Brand New' 
  | 'Like New' 
  | 'Fairly Used (Clean)' 
  | 'Good Condition' 
  | 'Move-in Ready';

export type ProductCategory = 
  | 'Textbooks & Handouts' 
  | 'Laptops & Gadgets' 
  | 'Hostel Appliances' 
  | 'Bedspace & Sublets' 
  | 'Campus Fashion' 
  | 'Campus Gigs & Tech Services';

export interface UniversityCampus {
  id: string;
  shortName: string;
  fullName: string;
  state: string;
  mainCampus: string;
  subSafeZone: string;
  librarySafeZone: string;
  alternativeSafeZone: string;
  popularHalls: string[];
  faculties: string[];
  verifiedStudentsCount: number;
}

export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string; // for WhatsApp
  whatsappNumber: string;
  avatarUrl: string;
  universityId: string;
  universityName: string;
  campusName: string;
  faculty: string;
  department: string;
  studyLevel: string; // '100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate'
  matricNumber?: string;
  isVerified: boolean;
  verifiedAt?: string;
  badgeLevel?: string; // 'Active • Level 4 Clearance'
  trustRating: number;
  totalSalesCount: number;
  totalSalesAmount: number;
  activeAdsCount: number;
  joinedDate: string;
}

export interface ProductListing {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number; // in NGN (₦)
  priceNegotiable: boolean;
  condition: CampusCondition;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerDept: string;
  sellerLevel: string;
  sellerMatricMasked: string;
  sellerRating: number;
  sellerIsVerified: boolean;
  sellerPhone: string;
  universityId: string;
  universityName: string;
  campusHandoffSpot: string;
  hostelOrFaculty: string;
  createdAt: string;
  viewsCount: number;
  whatsappLeadsCount: number;
  status: 'active' | 'pending_escrow' | 'sold';
  isUrgentSale?: boolean;
  isHostelSafeVerified?: boolean;
  specifications?: Record<string, string>;
  includedBundle?: string[];
  itemStory?: string;
  batteryHealth?: string;
  retailComparisonPrice?: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  isHandoffProposal?: boolean;
  handoffLocation?: string;
  handoffTime?: string;
}

export interface Conversation {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  participantOneId: string;
  participantTwoId: string;
  buyerName: string;
  buyerAvatar: string;
  buyerHostel: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export interface EscrowTransaction {
  id: string;
  referenceNumber: string; // e.g. #ESC-9821-LAG
  productId: string;
  productTitle: string;
  productImage: string;
  buyerId: string;
  buyerName: string;
  buyerFaculty: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  handoffLocation: string;
  handoffTime: string;
  deliveryOtp: string; // 4-digit code e.g. "8492"
  status: 'funded_in_escrow' | 'delivered_released' | 'cancelled';
  createdAt: string;
  releasedAt?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
