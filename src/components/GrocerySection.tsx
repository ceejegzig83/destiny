import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Percent,
  Truck,
  Leaf,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';
import { GroceryItem, CartItem } from '../types';
import { formatNaira } from '../utils/formatters';

interface GrocerySectionProps {
  items: GroceryItem[];
  onAddToCart: (cartItem: CartItem) => void;
}

export const GrocerySection: React.FC<GrocerySectionProps> = ({
  items,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  const categories = [
    'All',
    'Staples & Grains',
    'Fresh Eggs & Dairy',
    'Peppers & Veggies',
    'Cooking Oils',
    'Household'
  ];

  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleQtyChange = (id: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = (item: GroceryItem) => {
    const qty = itemQuantities[item.id] || 1;
    const cartItem: CartItem = {
      id: `grocery-${item.id}-${Date.now()}`,
      serviceType: 'groceries',
      itemId: item.id,
      title: item.name,
      unitPrice: item.price,
      quantity: qty,
      image: item.image,
      selectedUnit: item.unit
    };
    onAddToCart(cartItem);
    // Reset quantity after adding
    setItemQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <div className="space-y-6" id="grocery-section">
      {/* Supermart banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-stone-900 text-white p-6 sm:p-8 border border-blue-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Destiny Wholesale & Fresh Market</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Groceries, Staples & Fresh Farm Produce
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Order 50kg Royal Stallion rice bags, jumbo brown egg crates, crisp Ijebu garri, Benue sweet yams, and pure palm oil at farm-gate wholesale prices.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-850/80 border border-blue-500/30 p-3 rounded-2xl text-xs">
            <Clock className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <div className="font-bold text-stone-100">Same-Day 45m Delivery</div>
              <div className="text-[11px] text-stone-400">Direct to your kitchen doorstep</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`grocery-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search rice, eggs, oil, yam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Grocery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => {
          const qty = itemQuantities[item.id] || 1;
          const discountPercent = item.originalPrice
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : 0;

          return (
            <div
              key={item.id}
              id={`grocery-item-${item.id}`}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {item.isBulkDeal && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                      Bulk Deal
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-lg bg-stone-900/80 backdrop-blur text-white text-[10px] font-bold">
                  {item.unit}
                </div>
              </div>

              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-semibold text-blue-800">{item.category}</span>
                    {item.origin && (
                      <span className="text-stone-400 truncate max-w-[120px]">{item.origin}</span>
                    )}
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-black text-stone-900">
                        {formatNaira(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-1.5 text-xs text-stone-400 line-through">
                          {formatNaira(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold">In Stock</span>
                  </div>

                  {/* Quantity & Add to cart */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-0.5">
                      <button
                        onClick={() => handleQtyChange(item.id, -1)}
                        className="p-1 rounded-lg hover:bg-stone-200 text-stone-600 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-stone-800">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(item.id, 1)}
                        className="p-1 rounded-lg hover:bg-stone-200 text-stone-600 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className="flex-1 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add ({formatNaira(item.price * qty)})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
