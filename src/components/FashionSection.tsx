import React, { useState } from 'react';
import {
  Scissors,
  Sparkles,
  ShoppingBag,
  Star,
  Check,
  Ruler,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  X,
  Heart,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { FashionItem, CartItem } from '../types';
import { formatNaira } from '../utils/formatters';

interface FashionSectionProps {
  items: FashionItem[];
  onAddToCart: (cartItem: CartItem) => void;
}

export const FashionSection: React.FC<FashionSectionProps> = ({
  items,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<FashionItem | null>(null);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Product modal states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isCustomFitted, setIsCustomFitted] = useState<boolean>(false);

  // Bespoke form states
  const [bespokeForm, setBespokeForm] = useState({
    styleName: 'Custom 3-Piece Agbada with Fila',
    gender: 'Male',
    chest: '',
    shoulder: '',
    waist: '',
    armLength: '',
    trouserLength: '',
    neck: '',
    fabricChoice: 'Swiss Cashmere Damask',
    colorPreference: 'Emerald Green & Gold',
    visitTailorRequested: true,
    fullName: '',
    phoneNumber: '',
    deliveryCity: 'Lagos',
    notes: ''
  });

  const [bespokeSubmitted, setBespokeSubmitted] = useState<boolean>(false);

  const categories = [
    'All',
    'Native & Agbada',
    'Contemporary',
    'Shoes & Footwear',
    'Bags & Accessories',
    'Bridal & Asoebi'
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenProduct = (item: FashionItem) => {
    setSelectedProduct(item);
    setSelectedSize(item.sizes[0] || 'Standard');
    setSelectedColor(item.colors[0] || 'Default');
    setIsCustomFitted(false);
  };

  const handleAddToCart = (item: FashionItem) => {
    const cartItem: CartItem = {
      id: `fashion-${item.id}-${Date.now()}`,
      serviceType: 'fashion',
      itemId: item.id,
      title: item.name,
      unitPrice: item.price,
      quantity: 1,
      image: item.image,
      selectedSize: selectedSize || item.sizes[0],
      selectedColor: selectedColor || item.colors[0],
      customNote: isCustomFitted ? 'Custom fitted tailoring requested' : undefined
    };
    onAddToCart(cartItem);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6" id="fashion-section">
      {/* Fashion Banner & Tailoring Feature */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 sm:p-8 border border-amber-900/40 shadow-xl">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              <span>Bespoke Native Tailoring & Ready-To-Wear</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Destiny Haute Couture & Native Elegance
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Impeccably tailored Senator styles, heavy Swiss Agbada sets, handwoven Aso-Oke bridal sets, and luxury Aba handcrafted leather shoes.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="book-bespoke-tailor-btn"
                onClick={() => setIsBespokeModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
              >
                <Ruler className="w-4 h-4" />
                <span>Submit Body Measurements / Bespoke Order</span>
              </button>
            </div>
          </div>
          <div className="md:col-span-4 hidden md:flex justify-end">
            <div className="bg-stone-850/80 backdrop-blur border border-amber-500/30 p-4 rounded-xl text-xs space-y-2 text-stone-300 max-w-xs">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>Nationwide & Global Shipping</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Doorstep delivery in Lagos within 24hrs, interstate in 48hrs, and DHL express worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`fashion-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Local search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search fashion & shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => {
          const isFav = favorites.includes(item.id);
          const discountPercent = item.originalPrice
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : 0;

          return (
            <div
              key={item.id}
              id={`fashion-product-${item.id}`}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {item.isBestSeller && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow">
                      Best Seller
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Favorite toggle */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition shadow ${
                    isFav
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-stone-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Tailor measurement badge */}
                {item.isCustomTailored && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur text-amber-300 text-[10px] font-medium flex items-center gap-1">
                    <Scissors className="w-3 h-3" />
                    <span>Custom Fit Available</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-semibold text-amber-800">{item.category}</span>
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{item.rating}</span>
                      <span className="text-stone-400">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-amber-700 transition">
                    {item.name}
                  </h3>

                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-extrabold text-stone-900">
                        {formatNaira(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-1.5 text-xs text-stone-400 line-through">
                          {formatNaira(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">In Stock</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleOpenProduct(item)}
                      className="w-full py-1.5 rounded-xl border border-stone-300 hover:border-stone-400 bg-stone-50 text-stone-700 font-semibold text-xs transition flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart(item);
                      }}
                      className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail & Customization Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="relative aspect-video sm:aspect-21/9 bg-stone-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 p-2 bg-stone-900/80 text-white rounded-full hover:bg-stone-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-stone-900/80 text-white text-xs font-semibold">
                {selectedProduct.category}
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-stone-900 font-display">
                    {selectedProduct.name}
                  </h3>
                  <span className="text-xl font-black text-amber-700">
                    {formatNaira(selectedProduct.price)}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {selectedProduct.description}
                </p>
                {selectedProduct.fabricType && (
                  <p className="text-xs text-amber-800 font-medium mt-1">
                    Fabric: {selectedProduct.fabricType}
                  </p>
                )}
              </div>

              {/* Size Selector */}
              {selectedProduct.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          selectedSize === sz
                            ? 'bg-amber-600 text-white border-amber-600 shadow'
                            : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {selectedProduct.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Color & Theme:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          selectedColor === col
                            ? 'bg-stone-900 text-white border-stone-900 shadow'
                            : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom tailoring note */}
              {selectedProduct.isCustomTailored && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-amber-700 shrink-0" />
                    <div>
                      <span className="font-bold text-amber-900">Custom Fitted Tailoring</span>
                      <p className="text-amber-800 text-[11px]">
                        Need this made to your exact measurements?
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isCustomFitted}
                    onChange={(e) => setIsCustomFitted(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-stone-200 flex gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-1/3 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition"
                >
                  Cancel
                </button>
                <button
                  id="add-to-cart-confirm-btn"
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="w-2/3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Cart ({formatNaira(selectedProduct.price)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bespoke Measurement Booking Modal */}
      {isBespokeModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">
                    Destiny Bespoke Native Tailoring
                  </h3>
                  <p className="text-stone-500 text-xs">Direct Master Tailor Crafting Service</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsBespokeModalOpen(false);
                  setBespokeSubmitted(false);
                }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bespokeSubmitted ? (
              <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  Bespoke Fitting Request Received!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Our Master Tailor lead in Lagos will contact you at{' '}
                  <strong className="text-stone-900">{bespokeForm.phoneNumber || 'your phone'}</strong> within 2 hours to confirm fabric swatch and delivery date.
                </p>
                <button
                  onClick={() => {
                    setIsBespokeModalOpen(false);
                    setBespokeSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBespokeSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Chief Adeleke"
                      value={bespokeForm.fullName}
                      onChange={(e) => setBespokeForm({ ...bespokeForm, fullName: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Phone / WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="0803 123 4567"
                      value={bespokeForm.phoneNumber}
                      onChange={(e) => setBespokeForm({ ...bespokeForm, phoneNumber: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Outfit Style</label>
                    <select
                      value={bespokeForm.styleName}
                      onChange={(e) => setBespokeForm({ ...bespokeForm, styleName: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option>Royal 3-Piece Agbada & Fila</option>
                      <option>Executive Senator Suit Set</option>
                      <option>Luxe Silk Boubou with Stones</option>
                      <option>Aso-Oke Complete Bridal Set</option>
                      <option>Contemporary Ankara Jumpsuit</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Fabric Preference</label>
                    <select
                      value={bespokeForm.fabricChoice}
                      onChange={(e) => setBespokeForm({ ...bespokeForm, fabricChoice: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option>Swiss Cashmere Damask</option>
                      <option>100% Wool Cashmere</option>
                      <option>Duchess Satin & Crepe</option>
                      <option>Authentic Vlisco / Hollandis Wax</option>
                      <option>Client Will Provide Own Fabric</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-800 flex items-center justify-between">
                    <span>Body Measurements (Inches)</span>
                    <span className="text-[10px] text-stone-500 font-normal">Optional if sending physical sample</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-500">Chest</span>
                      <input
                        type="text"
                        placeholder='42"'
                        value={bespokeForm.chest}
                        onChange={(e) => setBespokeForm({ ...bespokeForm, chest: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-1.5 text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500">Shoulder</span>
                      <input
                        type="text"
                        placeholder='18.5"'
                        value={bespokeForm.shoulder}
                        onChange={(e) => setBespokeForm({ ...bespokeForm, shoulder: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-1.5 text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500">Waist</span>
                      <input
                        type="text"
                        placeholder='36"'
                        value={bespokeForm.waist}
                        onChange={(e) => setBespokeForm({ ...bespokeForm, waist: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-1.5 text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500">Trouser Length</span>
                      <input
                        type="text"
                        placeholder='41"'
                        value={bespokeForm.trouserLength}
                        onChange={(e) => setBespokeForm({ ...bespokeForm, trouserLength: e.target.value })}
                        className="w-full border border-stone-300 rounded-lg p-1.5 text-center"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Special Design Notes & Event Date</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. For my daughter's wedding on Sept 12th. Gold embroidery along the neckline..."
                    value={bespokeForm.notes}
                    onChange={(e) => setBespokeForm({ ...bespokeForm, notes: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="visit-tailor"
                    checked={bespokeForm.visitTailorRequested}
                    onChange={(e) => setBespokeForm({ ...bespokeForm, visitTailorRequested: e.target.checked })}
                    className="w-4 h-4 accent-amber-600"
                  />
                  <label htmlFor="visit-tailor" className="text-stone-700">
                    Request Destiny Mobile Tailor visit to my home / office for physical tape fitting
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition"
                >
                  Submit Tailoring Order Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
