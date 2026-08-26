import React, { useState } from 'react';
import {
  Utensils,
  Calendar,
  Users,
  Award,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  ShoppingBag,
  Sliders,
  DollarSign
} from 'lucide-react';
import { FoodItem, CateringPackage, CateringBooking, CartItem } from '../types';
import { CATERING_PACKAGES } from '../data/mockData';
import { formatNaira, triggerConfetti } from '../utils/formatters';

interface CateringSectionProps {
  foodItems: FoodItem[];
  onAddToCart: (cartItem: CartItem) => void;
  onCateringBooked?: (booking: CateringBooking) => void;
}

export const CateringSection: React.FC<CateringSectionProps> = ({
  foodItems,
  onAddToCart,
  onCateringBooked,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'restaurant' | 'events'>('events');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('cat-wedding');
  const [guestCount, setGuestCount] = useState<number>(250);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Mobile Cold-Room Chilled Drinks Van'
  ]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Banquet Booking Form State
  const [bookingForm, setBookingForm] = useState({
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    eventDate: '2026-09-20',
    eventTime: '12:00 PM',
    eventVenue: 'Eko Hotels & Suites Convention Centre, Victoria Island',
    state: 'Lagos',
    specialRequests: ''
  });

  const ADDONS_OPTIONS = [
    { name: 'Mobile Cold-Room Chilled Drinks Van', price: 150000 },
    { name: 'Uniformed VIP Waitstaff & Banquet Stewards (10 Staff)', price: 90000 },
    { name: 'Custom Foil Branded Takeaway Packs & Monogrammed Napkins', price: 120000 },
    { name: 'Live Charcoal Suya & Grilling Station on-site', price: 200000 },
    { name: 'Mixology Cocktail / Mocktail Open Bar', price: 180000 }
  ];

  const selectedPkg =
    CATERING_PACKAGES.find((p) => p.id === selectedPackageId) || CATERING_PACKAGES[0];

  const baseFoodQuote = selectedPkg.pricePerPlate * guestCount;
  const addonsTotal = selectedAddons.reduce((sum, addonName) => {
    const addon = ADDONS_OPTIONS.find((a) => a.name === addonName);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalCateringQuote = baseFoodQuote + addonsTotal;

  const toggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : [...prev, addonName]
    );
  };

  const handleBookBanquetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: CateringBooking = {
      id: `cat-book-${Date.now()}`,
      bookingRef: `CAT-NG-${Math.floor(10000 + Math.random() * 90000)}`,
      eventType: selectedPkg.eventType,
      packageName: selectedPkg.title,
      guestCount,
      eventDate: bookingForm.eventDate,
      eventTime: bookingForm.eventTime,
      eventVenue: bookingForm.eventVenue,
      state: bookingForm.state,
      totalQuote: totalCateringQuote,
      specialRequests: bookingForm.specialRequests,
      selectedAddons,
      contactName: bookingForm.contactName,
      contactPhone: bookingForm.contactPhone,
      contactEmail: bookingForm.contactEmail,
      status: 'quote_generated',
      createdAt: 'Just now'
    };

    if (onCateringBooked) {
      onCateringBooked(newBooking);
    }
    setBookingSuccess(true);
    triggerConfetti();
  };

  const handleAddFoodToCart = (item: FoodItem) => {
    const cartItem: CartItem = {
      id: `food-${item.id}-${Date.now()}`,
      serviceType: 'food',
      itemId: item.id,
      title: item.name,
      unitPrice: item.price,
      quantity: 1,
      image: item.image
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="space-y-6" id="catering-section">
      {/* Catering Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-rose-950 to-stone-900 text-white p-6 sm:p-8 border border-red-900/40 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold">
              <Utensils className="w-3.5 h-3.5 text-red-400" />
              <span>Royal Banquet & Fast Food Ordering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Destiny Gourmet Catering & Event Banquet
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Full-service Nigerian & Continental event catering for lavish weddings, high-volume political rallies (up to 20,000+ pax), executive corporate galas, and instant Smokey Jollof delivery.
            </p>
          </div>

          <div className="flex bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('events')}
              className={`px-4 py-2 rounded-lg transition ${
                activeSubTab === 'events'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🎉 Event Banquet Booking
            </button>
            <button
              onClick={() => setActiveSubTab('restaurant')}
              className={`px-4 py-2 rounded-lg transition ${
                activeSubTab === 'restaurant'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🍲 Order Food Meals
            </button>
          </div>
        </div>
      </div>

      {/* View 1: Event & Banquet Catering Engine */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">
          {/* Package Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATERING_PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  id={`cat-package-${pkg.id}`}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`text-left rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-red-50/80 border-red-500 shadow-lg ring-2 ring-red-500'
                      : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-stone-100">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {pkg.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-stone-900 text-sm">{pkg.title}</h3>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                        {pkg.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between mt-3">
                    <div>
                      <span className="text-xs text-stone-500">From</span>
                      <div className="text-sm font-black text-red-700">
                        {formatNaira(pkg.pricePerPlate)} <span className="text-[10px] font-normal text-stone-600">/ plate</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-500 font-semibold">
                      {pkg.minGuests.toLocaleString()} - {pkg.maxGuests.toLocaleString()} Guests
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Dynamic Banquet Quote Engine */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  Configuring Catering Plan
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                  {selectedPkg.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{selectedPkg.description}</p>
              </div>

              <div className="text-right bg-red-50 border border-red-200 p-3.5 rounded-2xl">
                <span className="text-[11px] text-stone-600 font-semibold block">
                  Estimated Total Quote (Naira)
                </span>
                <span className="text-2xl sm:text-3xl font-black text-red-700">
                  {formatNaira(totalCateringQuote)}
                </span>
                <span className="text-[10px] text-stone-500 block">
                  ({formatNaira(selectedPkg.pricePerPlate)} x {guestCount.toLocaleString()} guests + addons)
                </span>
              </div>
            </div>

            {/* Guest Count Slider */}
            <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between">
                <label className="font-extrabold text-stone-800 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-600" />
                  <span>Number of Expected Guests / Plates</span>
                </label>
                <span className="px-3 py-1 bg-red-600 text-white rounded-xl font-black text-sm shadow">
                  {guestCount.toLocaleString()} Guests
                </span>
              </div>

              <input
                type="range"
                min={selectedPkg.minGuests}
                max={Math.min(selectedPkg.maxGuests, 5000)}
                step={selectedPkg.eventType === 'political_campaign' ? 100 : 25}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />

              <div className="flex justify-between text-[11px] text-stone-500 font-medium">
                <span>Min: {selectedPkg.minGuests.toLocaleString()}</span>
                <span>Mid: {Math.round((selectedPkg.minGuests + Math.min(selectedPkg.maxGuests, 5000)) / 2).toLocaleString()}</span>
                <span>Max: {Math.min(selectedPkg.maxGuests, 5000).toLocaleString()} Pax</span>
              </div>
            </div>

            {/* Menu Highlights & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Included banquet features */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Standard Included Services</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedPkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Banquet Menu */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Curated Sample Menu</span>
                </h4>
                <div className="space-y-1.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  {selectedPkg.sampleMenu.map((menu, idx) => (
                    <div key={idx} className="text-xs text-stone-700 flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{menu}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Banquet Add-ons Selection */}
            <div className="space-y-2.5 pt-2">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Select Luxury Add-On Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <label
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs ${
                        isChecked
                          ? 'bg-red-50/70 border-red-500 text-stone-900 font-medium'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-red-600 rounded"
                        />
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-bold text-red-700 shrink-0">
                        +{formatNaira(addon.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-stone-500">
                ⚡ <strong>Instant Confirmation:</strong> Destiny banquet team delivers full tasting kits within 48 hours.
              </div>
              <button
                id="book-banquet-cta-btn"
                onClick={() => {
                  setBookingSuccess(false);
                  setIsBookingModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm shadow-lg shadow-red-700/30 transition flex items-center justify-center gap-2"
              >
                <span>Reserve Catering Date & Get Formal Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Instant Restaurant Food Ordering */}
      {activeSubTab === 'restaurant' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-base">
              Fresh Hot Meals & Small Chops Ready in 20-30 Mins
            </h3>
            <span className="text-xs text-stone-500">Delivered piping hot across town</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {foodItems.map((food) => (
              <div
                key={food.id}
                id={`food-card-${food.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-2.5 left-2.5 flex gap-1">
                    {food.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase shadow">
                        Hot Favorite
                      </span>
                    )}
                    {food.isSpicy && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold shadow">
                        🌶️ Spiced
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur text-white text-[10px] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{food.prepTime}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-red-800 uppercase tracking-wider">
                      {food.category}
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{food.name}</h4>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-stone-900">
                        {formatNaira(food.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddFoodToCart(food)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catering Banquet Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Catering Banquet Booking Request
                </h3>
                <p className="text-stone-500 text-xs">
                  {selectedPkg.title} • {guestCount.toLocaleString()} Guests • {formatNaira(totalCateringQuote)}
                </p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  Event Catering Reservation Submitted!
                </h4>
                <div className="bg-stone-50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-stone-200">
                  <div><strong>Package:</strong> {selectedPkg.title}</div>
                  <div><strong>Event Date:</strong> {bookingForm.eventDate} ({bookingForm.eventTime})</div>
                  <div><strong>Venue:</strong> {bookingForm.eventVenue}</div>
                  <div><strong>Estimated Quote:</strong> {formatNaira(totalCateringQuote)}</div>
                  <div><strong>Contact:</strong> {bookingForm.contactName} ({bookingForm.contactPhone})</div>
                </div>
                <p className="text-xs text-stone-600">
                  Our Head Catering Director will contact you within 2 hours with the formal invoice, tasting kit schedule, and contract.
                </p>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookBanquetSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Contact Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Barrister Emeka"
                      value={bookingForm.contactName}
                      onChange={(e) => setBookingForm({ ...bookingForm, contactName: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Phone / WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="0803 992 1144"
                      value={bookingForm.contactPhone}
                      onChange={(e) => setBookingForm({ ...bookingForm, contactPhone: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Event Date</label>
                    <input
                      required
                      type="date"
                      value={bookingForm.eventDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Event Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 1:00 PM Reception"
                      value={bookingForm.eventTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventTime: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Event Venue & Address</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Landmark Event Centre, Oniru, Victoria Island"
                    value={bookingForm.eventVenue}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventVenue: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Dietary or Custom Menu Requests</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Extra peppered goat meat, 50 vegetarian plates, customized champagne cocktail..."
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>

                <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-red-900">Total Projected Quote:</span>
                    <p className="text-[11px] text-red-700">Includes food preparation, waitstaff & selected add-ons</p>
                  </div>
                  <span className="text-base font-black text-red-700">
                    {formatNaira(totalCateringQuote)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md transition"
                >
                  Confirm & Send Catering Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
