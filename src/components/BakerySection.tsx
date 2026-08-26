import React, { useState } from 'react';
import {
  Cake,
  ShoppingBag,
  Sparkles,
  Clock,
  Star,
  Layers,
  Heart,
  CheckCircle,
  Plus,
  ArrowRight,
  X
} from 'lucide-react';
import { BakeryItem, CartItem, CustomCakeRequest } from '../types';
import { formatNaira, triggerConfetti } from '../utils/formatters';

interface BakerySectionProps {
  items: BakeryItem[];
  onAddToCart: (cartItem: CartItem) => void;
}

export const BakerySection: React.FC<BakerySectionProps> = ({
  items,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCustomCakeModalOpen, setIsCustomCakeModalOpen] = useState<boolean>(false);
  const [customSubmitted, setCustomSubmitted] = useState<boolean>(false);

  // Custom cake builder state
  const [cakeForm, setCakeForm] = useState({
    flavor: 'Red Velvet & Cream Cheese',
    tiers: 2,
    shape: 'Round Tiered',
    colorScheme: 'Rose Gold & Marble White',
    customInscription: 'Happy Birthday My Love',
    eventDate: '2026-09-15',
    customerName: '',
    customerPhone: '',
    deliveryAddress: 'Lekki Phase 1, Lagos',
    specialNotes: 'Please add gold leaf accents and French macarons on top.'
  });

  const categories = [
    'All',
    'Celebration Cakes',
    'Cupcakes',
    'Pastries & Pies',
    'Fresh Loaf Bread'
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // Calculate estimated custom cake price
  const basePricePerTier = 25000;
  const customCakeEstimate = cakeForm.tiers * basePricePerTier + 5000;

  const handleCustomCakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSubmitted(true);
    triggerConfetti();
  };

  const handleAddStandardCake = (item: BakeryItem) => {
    const cartItem: CartItem = {
      id: `bakery-${item.id}-${Date.now()}`,
      serviceType: 'bakery',
      itemId: item.id,
      title: item.name,
      unitPrice: item.price,
      quantity: 1,
      image: item.image
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="space-y-6" id="bakery-section">
      {/* Bakery Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-fuchsia-950 via-purple-950 to-stone-900 text-white p-6 sm:p-8 border border-fuchsia-900/40 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 text-xs font-semibold">
              <Cake className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Artisan Pâtisserie & Fresh Bakes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Destiny Sweet Treats, Cakes & Pastries
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Decadent multi-tier wedding cakes, spiced Nigerian meat pies, fluffy Agege butter bread, and custom celebration cakes with gold foil inscriptions.
            </p>
            <div className="pt-2">
              <button
                id="open-custom-cake-builder-btn"
                onClick={() => {
                  setCustomSubmitted(false);
                  setIsCustomCakeModalOpen(true);
                }}
                className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Custom Cake Designer</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-850/80 border border-fuchsia-500/30 p-4 rounded-2xl text-xs space-y-1 text-stone-300 max-w-xs">
            <div className="font-bold text-fuchsia-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Baked Fresh Every Morning</span>
            </div>
            <p className="text-[11px] text-stone-400">
              Fresh hot meatpies and Agege loaves dispatched starting 6:30 AM daily.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`bakery-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-fuchsia-700 text-white shadow-md'
                : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`bakery-item-${item.id}`}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-fuchsia-600 text-white text-[10px] font-black uppercase shadow">
                {item.category}
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur text-white text-[10px] font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-fuchsia-300" />
                <span>{item.prepTime}</span>
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                  {item.isCustomizable && (
                    <span className="text-fuchsia-700 font-semibold">Custom Inscription</span>
                  )}
                </div>

                <h3 className="font-bold text-stone-900 text-sm">{item.name}</h3>

                <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-stone-900">
                    {formatNaira(item.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddStandardCake(item)}
                  className="px-4 py-2 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Cake Designer Modal */}
      {isCustomCakeModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-fuchsia-100 text-fuchsia-800">
                  <Cake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">
                    Custom Celebration Cake Builder
                  </h3>
                  <p className="text-stone-500 text-xs">Crafted by Destiny Master Pâtissiers</p>
                </div>
              </div>
              <button
                onClick={() => setIsCustomCakeModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {customSubmitted ? (
              <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  Custom Cake Order Submitted!
                </h4>
                <div className="bg-stone-50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-stone-200">
                  <div><strong>Flavor:</strong> {cakeForm.flavor}</div>
                  <div><strong>Tiers:</strong> {cakeForm.tiers} Tiers ({cakeForm.shape})</div>
                  <div><strong>Inscription:</strong> "{cakeForm.customInscription}"</div>
                  <div><strong>Event Date:</strong> {cakeForm.eventDate}</div>
                  <div><strong>Estimated Price:</strong> {formatNaira(customCakeEstimate)}</div>
                </div>
                <p className="text-xs text-stone-600">
                  Our bakery team will send you a 3D digital cake draft on WhatsApp to confirm design before baking.
                </p>
                <button
                  onClick={() => setIsCustomCakeModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomCakeSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Cake Flavour</label>
                    <select
                      value={cakeForm.flavor}
                      onChange={(e) => setCakeForm({ ...cakeForm, flavor: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-fuchsia-500"
                    >
                      <option>Red Velvet & Cream Cheese</option>
                      <option>Rich Belgian Chocolate Fudge</option>
                      <option>Madagascan Vanilla Bean & Strawberry</option>
                      <option>Salted Caramel & White Chocolate</option>
                      <option>Moist Spiced Carrot & Walnut</option>
                      <option>Marble Swirl (Choc + Vanilla)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Number of Tiers</label>
                    <select
                      value={cakeForm.tiers}
                      onChange={(e) => setCakeForm({ ...cakeForm, tiers: Number(e.target.value) })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-fuchsia-500"
                    >
                      <option value={1}>1 Tier (Single Birthday/Anniversary - ~15 slices)</option>
                      <option value={2}>2 Tiers (Milestone Party - ~40 slices)</option>
                      <option value={3}>3 Tiers (Wedding/Grand Feast - ~90 slices)</option>
                      <option value={4}>4 Tiers (Royal Mega Banquet - ~180 slices)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Theme & Color Palette</label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Emerald Green & Gold Leaf"
                      value={cakeForm.colorScheme}
                      onChange={(e) => setCakeForm({ ...cakeForm, colorScheme: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Event Delivery Date</label>
                    <input
                      required
                      type="date"
                      value={cakeForm.eventDate}
                      onChange={(e) => setCakeForm({ ...cakeForm, eventDate: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Custom Inscription on Cake</label>
                  <input
                    type="text"
                    placeholder="e.g. Happy 60th Birthday Otunba!"
                    value={cakeForm.customInscription}
                    onChange={(e) => setCakeForm({ ...cakeForm, customInscription: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-fuchsia-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Mrs. Folashade"
                      value={cakeForm.customerName}
                      onChange={(e) => setCakeForm({ ...cakeForm, customerName: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">WhatsApp / Phone</label>
                    <input
                      required
                      type="tel"
                      placeholder="0802 334 5566"
                      value={cakeForm.customerPhone}
                      onChange={(e) => setCakeForm({ ...cakeForm, customerPhone: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Special Decoration / Cake Topper Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Add golden crown topper, edible pearls, acrylic age topper..."
                    value={cakeForm.specialNotes}
                    onChange={(e) => setCakeForm({ ...cakeForm, specialNotes: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-fuchsia-500"
                  ></textarea>
                </div>

                <div className="p-3 bg-fuchsia-50 rounded-xl border border-fuchsia-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-fuchsia-950">Estimated Custom Cake Price:</span>
                    <p className="text-[11px] text-fuchsia-800">{cakeForm.tiers} Tiers • Handcrafted decor</p>
                  </div>
                  <span className="text-base font-black text-fuchsia-900">
                    {formatNaira(customCakeEstimate)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-extrabold text-xs shadow-md transition"
                >
                  Confirm Custom Cake Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
