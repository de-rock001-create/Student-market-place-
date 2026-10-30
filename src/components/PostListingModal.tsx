import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Camera, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';
import { ProductCategory, CampusCondition, ProductListing } from '../types';

export const PostListingModal: React.FC = () => {
  const { 
    currentUser, 
    isPostModalOpen, 
    setIsPostModalOpen, 
    addProduct, 
    updateProduct, 
    editingProduct, 
    setEditingProduct,
    showToast 
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Laptops & Gadgets');
  const [price, setPrice] = useState<number | ''>('');
  const [priceNegotiable, setPriceNegotiable] = useState(true);
  const [condition, setCondition] = useState<CampusCondition>('Fairly Used (Clean)');
  const [universityId, setUniversityId] = useState('unilag');
  const [hostelOrFaculty, setHostelOrFaculty] = useState('');
  const [campusHandoffSpot, setCampusHandoffSpot] = useState('SUB Food Court & Student Union Arcade');
  const [description, setDescription] = useState('');
  const [itemStory, setItemStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [batteryHealth, setBatteryHealth] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [bundleInput, setBundleInput] = useState('');
  const [includedBundle, setIncludedBundle] = useState<string[]>([]);

  // Preset image placeholders for fast creation
  const presetImages: Record<ProductCategory, string[]> = {
    'Textbooks & Handouts': [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80'
    ],
    'Laptops & Gadgets': [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80'
    ],
    'Hostel Appliances': [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    'Bedspace & Sublets': [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    'Campus Fashion': [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    'Campus Gigs & Tech Services': [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    ]
  };

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price);
      setPriceNegotiable(editingProduct.priceNegotiable);
      setCondition(editingProduct.condition);
      setUniversityId(editingProduct.universityId);
      setHostelOrFaculty(editingProduct.hostelOrFaculty);
      setCampusHandoffSpot(editingProduct.campusHandoffSpot);
      setDescription(editingProduct.description);
      setItemStory(editingProduct.itemStory || '');
      setImages(editingProduct.images);
      setBatteryHealth(editingProduct.batteryHealth || '');
      setIsUrgent(!!editingProduct.isUrgentSale);
      setIncludedBundle(editingProduct.includedBundle || []);
    } else {
      resetForm();
      if (currentUser) {
        setUniversityId(currentUser.universityId);
        setHostelOrFaculty(currentUser.campusName);
      }
    }
  }, [editingProduct, currentUser, isPostModalOpen]);

  const resetForm = () => {
    setTitle('');
    setCategory('Laptops & Gadgets');
    setPrice('');
    setPriceNegotiable(true);
    setCondition('Fairly Used (Clean)');
    setHostelOrFaculty('');
    setCampusHandoffSpot('SUB Food Court & Student Union Arcade');
    setDescription('');
    setItemStory('');
    setImageUrl('');
    setImages([]);
    setBatteryHealth('');
    setIsUrgent(false);
    setIncludedBundle([]);
  };

  if (!isPostModalOpen) return null;

  const currentUni = NIGERIAN_UNIVERSITIES.find(u => u.id === universityId) || NIGERIAN_UNIVERSITIES[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [event.target!.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      setImages(prev => [imageUrl.trim(), ...prev]);
      setImageUrl('');
    }
  };

  const handleAddBundleItem = () => {
    if (bundleInput.trim()) {
      setIncludedBundle(prev => [...prev, bundleInput.trim()]);
      setBundleInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || price === '' || Number(price) <= 0) {
      showToast('Please provide a listing title and valid price in Naira.');
      return;
    }

    const finalImages = images.length > 0 ? images : presetImages[category];

    const listingData = {
      title: title.trim(),
      description: description.trim() || `${condition} item in great working condition. Available for pickup on campus.`,
      category,
      price: Number(price),
      priceNegotiable,
      condition,
      images: finalImages,
      sellerId: currentUser?.id || 'usr_chinedu_01',
      sellerName: currentUser?.fullName || 'Verified Student Seller',
      sellerAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      sellerDept: currentUser?.department || 'Computer Science',
      sellerLevel: currentUser?.studyLevel || '400L',
      sellerMatricMasked: currentUser?.matricNumber ? `${currentUser.matricNumber.slice(0, 6)}***` : '190805***',
      sellerRating: currentUser?.trustRating || 4.9,
      sellerIsVerified: currentUser?.isVerified ?? true,
      sellerPhone: currentUser?.phoneNumber || '2348039281144',
      universityId,
      universityName: currentUni.fullName,
      campusHandoffSpot,
      hostelOrFaculty: hostelOrFaculty || `${currentUni.popularHalls[0]} / SUB`,
      isUrgentSale: isUrgent,
      isHostelSafeVerified: true,
      itemStory: itemStory.trim(),
      batteryHealth: batteryHealth.trim() || undefined,
      includedBundle: includedBundle.length > 0 ? includedBundle : ['Campus pickup packaging'],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, listingData);
      setEditingProduct(null);
    } else {
      addProduct(listingData);
    }

    setIsPostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black tracking-tight">
              {editingProduct ? 'Edit Campus Listing' : 'Post New Campus Listing 🇳🇬'}
            </h2>
            <p className="text-xs text-emerald-200">
              Free student peer-to-peer sale with zero middleman markups
            </p>
          </div>
          <button
            onClick={() => {
              setIsPostModalOpen(false);
              setEditingProduct(null);
            }}
            className="p-1 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Item Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HP Pavilion 15 (16GB RAM, Core i7, 512GB SSD) or Robbins Pathology"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Textbooks & Handouts">📚 Textbooks & Handouts</option>
                <option value="Laptops & Gadgets">💻 Laptops & Gadgets</option>
                <option value="Hostel Appliances">⚡ Hostel Appliances</option>
                <option value="Bedspace & Sublets">🛏️ Bedspace & Sublets</option>
                <option value="Campus Fashion">👕 Campus Fashion</option>
                <option value="Campus Gigs & Tech Services">🛠️ Campus Gigs & Tech Services</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as CampusCondition)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Brand New">Brand New (Unopened / Boxed)</option>
                <option value="Like New">Like New (Barely Used)</option>
                <option value="Fairly Used (Clean)">Fairly Used (Clean / Great)</option>
                <option value="Good Condition">Good Condition (Functional)</option>
                <option value="Move-in Ready">Move-in Ready (For Hostels/Sublets)</option>
              </select>
            </div>
          </div>

          {/* Price in Naira (₦) */}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-2">
            <label className="block text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
              Asking Price in Naira (₦) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-bold text-emerald-800 text-base">₦</span>
              <input
                type="number"
                required
                min="0"
                step="500"
                placeholder="25000"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 text-base font-black text-gray-900 bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={priceNegotiable}
                  onChange={(e) => setPriceNegotiable(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Price is slightly negotiable</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-600">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>🔥 Mark as Urgent Sale</span>
              </label>
            </div>
          </div>

          {/* Campus Location & Safe Spot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                University Campus *
              </label>
              <select
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-800"
              >
                {NIGERIAN_UNIVERSITIES.map(u => (
                  <option key={u.id} value={u.id}>{u.fullName} ({u.shortName})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Your Hostel or Faculty *
              </label>
              <input
                type="text"
                placeholder="e.g. Moremi Hall, Jaja Hall, Faculty of Tech"
                value={hostelOrFaculty}
                onChange={(e) => setHostelOrFaculty(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          {/* Designated Campus Meeting Spot */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Designated Daylight Meeting Spot</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Campus Monitored</span>
            </label>
            <input
              type="text"
              value={campusHandoffSpot}
              onChange={(e) => setCampusHandoffSpot(e.target.value)}
              placeholder="e.g. SUB Food Court, Main Library front steps"
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
            <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
              <span className="text-gray-400">Suggestions:</span>
              <button
                type="button"
                onClick={() => setCampusHandoffSpot(currentUni.subSafeZone)}
                className="px-2 py-0.5 rounded bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800"
              >
                SUB Safe Arcade
              </button>
              <button
                type="button"
                onClick={() => setCampusHandoffSpot(currentUni.librarySafeZone)}
                className="px-2 py-0.5 rounded bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800"
              >
                Central Library Steps
              </button>
            </div>
          </div>

          {/* Product Photos */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Photos (Upload or Image URL)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                placeholder="Paste photo link (or use local upload)..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-xl"
              >
                Add Link
              </button>
              <label className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1 border border-emerald-200">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Photo previews */}
            {images.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto py-1">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-gray-400 italic">
                * We will automatically attach high-res authentic campus category imagery if you leave this empty!
              </div>
            )}
          </div>

          {/* Honest Item Story / Reason for Sale */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Honest Item Story & Reason for Sale</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Graduating final-year student parting with laptop due to NYSC posting. Battery lasts 5 hours on overnight SUB study sessions..."
              value={itemStory}
              onChange={(e) => setItemStory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Included Bundles */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Included Accessories / Free Extras
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Original 65W Fast Charger, Mouse, Summary Flashcards..."
                value={bundleInput}
                onChange={(e) => setBundleInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
              <button
                type="button"
                onClick={handleAddBundleItem}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-xl"
              >
                + Add
              </button>
            </div>
            {includedBundle.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {includedBundle.map((b, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium flex items-center gap-1">
                    {b}
                    <button type="button" onClick={() => setIncludedBundle(prev => prev.filter((_, i) => i !== idx))}>
                      <X className="w-3 h-3 text-emerald-600" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsPostModalOpen(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md hover:shadow-lg transition-all"
            >
              {editingProduct ? 'Save Changes' : 'Publish Listing to Campus Feed'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
