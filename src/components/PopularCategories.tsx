import React from 'react';
import { BookOpen, Laptop, Flame, Home, Wrench, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';

export const PopularCategories: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const categories: {
    id: ProductCategory;
    name: string;
    listings: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  }[] = [
    {
      id: 'Textbooks & Handouts',
      name: 'Engineering & Law Textbooks',
      listings: '420+ listings',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100',
    },
    {
      id: 'Laptops & Gadgets',
      name: 'Laptops, Powerbanks & Phones',
      listings: '310+ listings',
      icon: <Laptop className="w-5 h-5" />,
      color: 'text-blue-700',
      bg: 'bg-blue-50 hover:bg-blue-100/70 border-blue-100',
    },
    {
      id: 'Hostel Appliances',
      name: 'Hostel Appliances & Hot Plates',
      listings: '190+ listings',
      icon: <Flame className="w-5 h-5" />,
      color: 'text-orange-700',
      bg: 'bg-orange-50 hover:bg-orange-100/70 border-orange-100',
    },
    {
      id: 'Bedspace & Sublets',
      name: 'Sublets & Bedspace Shares',
      listings: '85+ listings',
      icon: <Home className="w-5 h-5" />,
      color: 'text-purple-700',
      bg: 'bg-purple-50 hover:bg-purple-100/70 border-purple-100',
    },
    {
      id: 'Campus Gigs & Tech Services',
      name: 'Campus Gigs & Tech Services',
      listings: '140+ listings',
      icon: <Wrench className="w-5 h-5" />,
      color: 'text-teal-700',
      bg: 'bg-teal-50 hover:bg-teal-100/70 border-teal-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
            ● In-Demand Right Now
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Popular Campus Categories
          </h2>
        </div>
        <button 
          onClick={() => setSelectedCategory('All')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
        >
          <span>Explore all faculties</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? 'All' : cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all transform hover:-translate-y-0.5 cursor-pointer ${cat.bg} ${
                isSelected ? 'ring-2 ring-emerald-600 shadow-md' : 'shadow-2xs'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-2xs mb-3 ${cat.color}`}>
                {cat.icon}
              </div>
              <div className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 leading-tight">
                {cat.name}
              </div>
              <div className="text-[11px] text-gray-500 mt-1 font-medium">
                {cat.listings}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
