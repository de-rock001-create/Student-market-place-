import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  StudentUser, 
  ProductListing, 
  Conversation, 
  ChatMessage, 
  EscrowTransaction, 
  ProductCategory, 
  CampusCondition 
} from '../types';
import { 
  INITIAL_USER, 
  DEMO_USERS, 
  INITIAL_PRODUCTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_ESCROW_TRANSACTIONS 
} from '../data/mockData';
import { maskMatricNumber } from '../utils/formatters';

interface AppContextType {
  // Auth & Student Profile
  currentUser: StudentUser | null;
  isAuthenticated: boolean;
  loginUser: (user: StudentUser) => void;
  logoutUser: () => void;
  switchDemoUser: (userId: string) => void;
  verifyStudentAccount: (data: {
    universityId: string;
    universityName: string;
    matricNumber: string;
    faculty: string;
    department: string;
    studyLevel: string;
  }) => boolean;

  // Products CRUD
  products: ProductListing[];
  addProduct: (product: Omit<ProductListing, 'id' | 'createdAt' | 'viewsCount' | 'whatsappLeadsCount' | 'status'>) => void;
  updateProduct: (id: string, updates: Partial<ProductListing>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string, newStatus: 'active' | 'pending_escrow' | 'sold') => void;
  boostProduct: (id: string) => void;
  incrementProductViews: (id: string) => void;
  incrementWhatsAppLead: (id: string) => void;

  // Wishlist (tied to authenticated user)
  wishlistIds: string[];
  wishlistProducts: ProductListing[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;

  // Filtering & Search
  selectedUniversity: string;
  setSelectedUniversity: (uniId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  selectedCondition: CampusCondition | 'All';
  setSelectedCondition: (cond: CampusCondition | 'All') => void;
  priceFilter: number;
  setPriceFilter: (maxPrice: number) => void;
  listingViewFilter: 'all' | 'hostel_safe' | 'urgent';
  setListingViewFilter: (filter: 'all' | 'hostel_safe' | 'urgent') => void;

  // Navigation / Views
  currentView: 'marketplace' | 'wishlist' | 'dashboard' | 'safety';
  setCurrentView: (view: 'marketplace' | 'wishlist' | 'dashboard' | 'safety') => void;

  // Modals & Active Selections
  activeProductDetail: ProductListing | null;
  setActiveProductDetail: (product: ProductListing | null) => void;
  isPostModalOpen: boolean;
  setIsPostModalOpen: (open: boolean) => void;
  editingProduct: ProductListing | null;
  setEditingProduct: (product: ProductListing | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isVerifyModalOpen: boolean;
  setIsVerifyModalOpen: (open: boolean) => void;
  
  // Chat & Direct Messaging
  conversations: Conversation[];
  activeConversation: Conversation | null;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  openChatForProduct: (product: ProductListing) => void;
  sendChatMessage: (conversationId: string, text: string) => void;

  // Escrow transactions
  escrowTransactions: EscrowTransaction[];
  createEscrowTransaction: (product: ProductListing, handoffLocation: string) => EscrowTransaction;
  releaseEscrowWithOtp: (transactionId: string, otp: string) => boolean;
  isEscrowModalOpen: boolean;
  setIsEscrowModalOpen: (open: boolean) => void;
  activeEscrowProduct: ProductListing | null;
  setActiveEscrowProduct: (product: ProductListing | null) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current User State
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    const saved = localStorage.getItem('unimarket_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USER;
  });

  // 2. Products State
  const [products, setProducts] = useState<ProductListing[]>(() => {
    const saved = localStorage.getItem('unimarket_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  // 3. User-Tied Wishlist State: Record<userId, string[]>
  const [wishlistByUser, setWishlistByUser] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('unimarket_wishlists');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      usr_chinedu_01: ['prod_pathology_textbook', 'prod_standing_fan_solar']
    };
  });

  // 4. Conversations State
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('unimarket_conversations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CONVERSATIONS;
  });

  // 5. Escrow Transactions State
  const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>(() => {
    const saved = localStorage.getItem('unimarket_escrow');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ESCROW_TRANSACTIONS;
  });

  // 6. Navigation & Filters
  const [currentView, setCurrentView] = useState<'marketplace' | 'wishlist' | 'dashboard' | 'safety'>('marketplace');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('unilag');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedCondition, setSelectedCondition] = useState<CampusCondition | 'All'>('All');
  const [priceFilter, setPriceFilter] = useState<number>(300000);
  const [listingViewFilter, setListingViewFilter] = useState<'all' | 'hostel_safe' | 'urgent'>('all');

  // 7. Modals
  const [activeProductDetail, setActiveProductDetail] = useState<ProductListing | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<ProductListing | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState<boolean>(false);
  const [activeEscrowProduct, setActiveEscrowProduct] = useState<ProductListing | null>(null);

  // 8. Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('unimarket_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('unimarket_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('unimarket_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('unimarket_wishlists', JSON.stringify(wishlistByUser));
  }, [wishlistByUser]);

  useEffect(() => {
    localStorage.setItem('unimarket_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('unimarket_escrow', JSON.stringify(escrowTransactions));
  }, [escrowTransactions]);

  // Auth Functions
  const loginUser = (user: StudentUser) => {
    setCurrentUser(user);
    showToast(`Welcome, ${user.fullName}! Logged in successfully.`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out of UniMarket.');
  };

  const switchDemoUser = (userId: string) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setSelectedUniversity(found.universityId);
      showToast(`Switched account to ${found.fullName} (${found.universityName})`);
    }
  };

  const verifyStudentAccount = (data: {
    universityId: string;
    universityName: string;
    matricNumber: string;
    faculty: string;
    department: string;
    studyLevel: string;
  }) => {
    if (!currentUser) return false;

    const updatedUser: StudentUser = {
      ...currentUser,
      universityId: data.universityId,
      universityName: data.universityName,
      matricNumber: data.matricNumber,
      faculty: data.faculty,
      department: data.department,
      studyLevel: data.studyLevel,
      isVerified: true,
      verifiedAt: new Date().toISOString().split('T')[0],
      badgeLevel: `Active • Level ${data.studyLevel.charAt(0) || '4'} Clearance`,
    };

    setCurrentUser(updatedUser);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast('🎉 Verification Approved! You now have the Verified Student badge.');
    return true;
  };

  // Wishlist Functions (Tied to Authenticated User)
  const currentUserId = currentUser ? currentUser.id : 'guest_session';
  const wishlistIds = wishlistByUser[currentUserId] || [];

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = (productId: string) => {
    if (!currentUser) {
      showToast('Please sign in or select a student account to save items to your wishlist.');
      setIsAuthModalOpen(true);
      return;
    }

    setWishlistByUser(prev => {
      const userList = prev[currentUserId] || [];
      const exists = userList.includes(productId);
      const updated = exists 
        ? userList.filter(id => id !== productId) 
        : [...userList, productId];

      if (exists) {
        showToast('Removed from your Wishlist.');
      } else {
        showToast('❤️ Saved to your Campus Wishlist!');
      }

      return {
        ...prev,
        [currentUserId]: updated
      };
    });
  };

  const removeFromWishlist = (productId: string) => {
    if (!currentUser) return;
    setWishlistByUser(prev => ({
      ...prev,
      [currentUserId]: (prev[currentUserId] || []).filter(id => id !== productId)
    }));
    showToast('Item removed from wishlist.');
  };

  const clearWishlist = () => {
    if (!currentUser) return;
    setWishlistByUser(prev => ({
      ...prev,
      [currentUserId]: []
    }));
    showToast('Your wishlist has been cleared.');
  };

  // Product CRUD
  const addProduct = (productData: Omit<ProductListing, 'id' | 'createdAt' | 'viewsCount' | 'whatsappLeadsCount' | 'status'>) => {
    const newId = `prod_${Date.now()}`;
    const newListing: ProductListing = {
      ...productData,
      id: newId,
      createdAt: 'Just now',
      viewsCount: 1,
      whatsappLeadsCount: 0,
      status: 'active'
    };

    setProducts(prev => [newListing, ...prev]);

    // Update user active ads count if seller is current user
    if (currentUser && currentUser.id === productData.sellerId) {
      setCurrentUser(prev => prev ? { ...prev, activeAdsCount: prev.activeAdsCount + 1 } : null);
    }

    showToast('🚀 Your campus listing is live and visible to students!');
  };

  const updateProduct = (id: string, updates: Partial<ProductListing>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (activeProductDetail && activeProductDetail.id === id) {
      setActiveProductDetail(prev => prev ? { ...prev, ...updates } : null);
    }
    showToast('Listing updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (activeProductDetail?.id === id) {
      setActiveProductDetail(null);
    }
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, activeAdsCount: Math.max(0, prev.activeAdsCount - 1) } : null);
    }
    showToast('Listing deleted.');
  };

  const toggleProductStatus = (id: string, newStatus: 'active' | 'pending_escrow' | 'sold') => {
    updateProduct(id, { status: newStatus });
    if (newStatus === 'sold' && currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        activeAdsCount: Math.max(0, prev.activeAdsCount - 1),
        totalSalesCount: prev.totalSalesCount + 1,
      } : null);
    }
  };

  const boostProduct = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          viewsCount: p.viewsCount + 45,
          createdAt: 'Just now (Boosted ⚡)'
        };
      }
      return p;
    }));
    showToast('⚡ Listing boosted to top of campus feed!');
  };

  const incrementProductViews = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, viewsCount: p.viewsCount + 1 } : p));
  };

  const incrementWhatsAppLead = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, whatsappLeadsCount: p.whatsappLeadsCount + 1 } : p));
  };

  // Chat & Escrow
  const openChatForProduct = (product: ProductListing) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    // Look for existing conversation or create new
    let existing = conversations.find(c => c.productId === product.id);
    if (!existing) {
      existing = {
        id: `conv_${Date.now()}`,
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.images[0] || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        participantOneId: currentUser.id,
        participantTwoId: product.sellerId,
        buyerName: currentUser.fullName,
        buyerAvatar: currentUser.avatarUrl,
        buyerHostel: currentUser.campusName,
        sellerName: product.sellerName,
        sellerAvatar: product.sellerAvatar,
        lastMessage: `Hi ${product.sellerName}, is your ${product.title} still available? Can we meet at ${product.campusHandoffSpot}?`,
        lastTimestamp: 'Just now',
        unreadCount: 0
      };
      setConversations(prev => [existing!, ...prev]);
    }
    setActiveConversation(existing);
    setIsChatModalOpen(true);
  };

  const sendChatMessage = (conversationId: string, text: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastTimestamp: 'Just now'
        };
      }
      return c;
    }));
  };

  const createEscrowTransaction = (product: ProductListing, handoffLocation: string): EscrowTransaction => {
    const refCode = `#ESC-${Math.floor(1000 + Math.random() * 9000)}-${product.universityName.slice(0, 3).toUpperCase()}`;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    const newTx: EscrowTransaction = {
      id: `esc_${Date.now()}`,
      referenceNumber: refCode,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0],
      buyerId: currentUser?.id || 'usr_buyer',
      buyerName: currentUser?.fullName || 'Verified Student Buyer',
      buyerFaculty: currentUser?.faculty || 'Faculty Student',
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      amount: product.price,
      handoffLocation: handoffLocation,
      handoffTime: 'Today, within 2 hours',
      deliveryOtp: otp,
      status: 'funded_in_escrow',
      createdAt: 'Just now'
    };

    setEscrowTransactions(prev => [newTx, ...prev]);
    toggleProductStatus(product.id, 'pending_escrow');
    showToast(`🛡️ Escrow initiated! Funds reserved. Safe handoff OTP: ${otp}`);
    return newTx;
  };

  const releaseEscrowWithOtp = (transactionId: string, otp: string): boolean => {
    const tx = escrowTransactions.find(t => t.id === transactionId);
    if (!tx) {
      showToast('Transaction not found.');
      return false;
    }

    if (tx.deliveryOtp !== otp) {
      showToast('❌ Invalid Delivery OTP. Ask buyer for the exact 4-digit code shown in their UniMarket app.');
      return false;
    }

    setEscrowTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'delivered_released',
          releasedAt: 'Just now'
        };
      }
      return t;
    }));

    toggleProductStatus(tx.productId, 'sold');

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });

    showToast(`✅ OTP Verified! ₦${tx.amount.toLocaleString()} has been released to ${tx.sellerName}'s account.`);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loginUser,
        logoutUser,
        switchDemoUser,
        verifyStudentAccount,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        boostProduct,
        incrementProductViews,
        incrementWhatsAppLead,

        wishlistIds,
        wishlistProducts,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,

        selectedUniversity,
        setSelectedUniversity,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        priceFilter,
        setPriceFilter,
        listingViewFilter,
        setListingViewFilter,

        currentView,
        setCurrentView,

        activeProductDetail,
        setActiveProductDetail,
        isPostModalOpen,
        setIsPostModalOpen,
        editingProduct,
        setEditingProduct,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isVerifyModalOpen,
        setIsVerifyModalOpen,

        conversations,
        activeConversation,
        isChatModalOpen,
        setIsChatModalOpen,
        openChatForProduct,
        sendChatMessage,

        escrowTransactions,
        createEscrowTransaction,
        releaseEscrowWithOtp,
        isEscrowModalOpen,
        setIsEscrowModalOpen,
        activeEscrowProduct,
        setActiveEscrowProduct,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
