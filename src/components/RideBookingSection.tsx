import React, { useState, useEffect } from 'react';
import {
  Car,
  MapPin,
  Navigation,
  Clock,
  Shield,
  Phone,
  MessageSquare,
  Star,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Zap
} from 'lucide-react';
import { RideOption, ActiveRide } from '../types';
import { RIDE_OPTIONS, POPULAR_LOCATIONS } from '../data/mockData';
import { formatNaira, triggerConfetti } from '../utils/formatters';

interface RideBookingSectionProps {
  currentLocation: string;
  walletBalance: number;
  onRideBooked?: (ride: ActiveRide) => void;
}

export const RideBookingSection: React.FC<RideBookingSectionProps> = ({
  currentLocation,
  walletBalance,
  onRideBooked
}) => {
  const [pickup, setPickup] = useState<string>(currentLocation);
  const [destination, setDestination] = useState<string>('Lokoja Central, Kogi State');
  const [selectedRideId, setSelectedRideId] = useState<string>('r-keke');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'cash' | 'transfer'>('wallet');
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [driverRatingInput, setDriverRatingInput] = useState<number>(5);

  // Quick destinations in Nigeria
  const QUICK_DESTINATIONS = [
    'Victoria Island (Adeola Odeku)',
    'Lekki Toll Gate / Phase 1',
    'Ikeja City Mall (Shoprite)',
    'Computer Village, Ikeja',
    'Murtala Muhammed Airport (MM2)',
    'Wuse Market / Wuse 2, Abuja',
    'Port Harcourt Pleasure Park'
  ];

  // Calculate dynamic fare
  const selectedRide = RIDE_OPTIONS.find((r) => r.id === selectedRideId) || RIDE_OPTIONS[0];
  const estimatedDistance = selectedRide.type === 'interstate_charter' ? 120 : 8.5; // km
  const rawFare = selectedRide.baseFare + estimatedDistance * selectedRide.perKmRate;
  const discountedFare = promoApplied ? Math.max(rawFare - 1000, 500) : rawFare;

  // Handle Request Ride
  const handleRequestRide = () => {
    const newRide: ActiveRide = {
      id: `ride-${Date.now()}`,
      rideOptionId: selectedRide.id,
      rideOptionName: selectedRide.name,
      rideType: selectedRide.type,
      pickup: pickup || currentLocation,
      destination: destination || 'Kogi State',
      distanceKm: estimatedDistance,
      durationMins: selectedRide.type === 'keke' ? 15 : 22,
      estimatedFare: discountedFare,
      actualFare: discountedFare,
      status: 'searching',
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: 'Just now',
      paymentMethod
    };

    setActiveRide(newRide);
    triggerConfetti();

    // Simulate driver matching lifecycle
    setTimeout(() => {
      setActiveRide((prev) =>
        prev
          ? {
              ...prev,
              status: 'driver_assigned',
              driverName: selectedRide.type === 'keke' ? 'Musa Ibrahim' : 'Chukwuma Obi',
              driverPhone: '0802 884 9912',
              vehicleModel: selectedRide.type === 'keke' ? 'Bajaj RE 4S Tricycle (Yellow/Black)' : 'Toyota Corolla 2018 (Silver)',
              vehiclePlate: selectedRide.type === 'keke' ? 'KJA-392-XX' : 'LSR-849-BD',
              driverPhoto: selectedRide.type === 'keke' 
                ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
              driverRating: 4.9
            }
          : null
      );
    }, 2500);

    setTimeout(() => {
      setActiveRide((prev) => (prev ? { ...prev, status: 'driver_arriving' } : null));
    }, 6000);

    if (onRideBooked) {
      onRideBooked(newRide);
    }
  };

  const handleCancelRide = () => {
    setActiveRide(null);
  };

  const handleCompleteRideSimulation = () => {
    if (activeRide) {
      setActiveRide({ ...activeRide, status: 'completed' });
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6" id="ride-booking-section">
      {/* Transit Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Nigerian Ride Hailing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Destiny Transit & Keke Booking
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Beat Lagos & Nigerian traffic with swift affordable Keke Napep or glide comfortably in air-conditioned executive saloon cars.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-850/80 border border-emerald-500/30 p-3 rounded-2xl text-xs">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-stone-100">100% Vetted Drivers</div>
              <div className="text-[11px] text-stone-400">Police background checked & insured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Ride Booking Form vs Live Simulation / Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Ride Setup & Options */}
        <div className="lg:col-span-6 space-y-5">
          {/* Pickup & Destination Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <div className="font-bold text-stone-900 text-sm flex items-center justify-between">
              <span>Set Your Trip Route</span>
              <span className="text-xs text-emerald-700 font-semibold">GPS Active</span>
            </div>

            {/* Input fields */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-3 top-3 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                <input
                  type="text"
                  placeholder="Enter pickup location..."
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-3 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Quick destination chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Popular Drop-offs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_DESTINATIONS.slice(0, 5).map((dest) => (
                  <button
                    key={dest}
                    onClick={() => setDestination(dest)}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] text-stone-700 font-medium transition border border-stone-200"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ride Types Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm">Choose Ride Category</h3>
              <span className="text-xs text-stone-500">~{estimatedDistance} km estimated</span>
            </div>

            <div className="space-y-2">
              {RIDE_OPTIONS.map((opt) => {
                const isSelected = selectedRideId === opt.id;
                const optFare = opt.baseFare + estimatedDistance * opt.perKmRate;

                return (
                  <button
                    key={opt.id}
                    id={`ride-option-${opt.id}`}
                    onClick={() => setSelectedRideId(opt.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={opt.image}
                          alt={opt.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-xs sm:text-sm">
                            {opt.name}
                          </span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">{opt.tagline}</p>
                        <div className="flex items-center gap-2 text-[10px] text-stone-500">
                          <span>⏱️ {opt.etaMins} mins away</span>
                          <span>•</span>
                          <span>👥 Max {opt.capacity} seats</span>
                          {opt.acAvailable && (
                            <>
                              <span>•</span>
                              <span className="text-teal-700 font-semibold">❄️ A/C</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-stone-900 text-sm sm:text-base">
                        {formatNaira(optFare)}
                      </div>
                      <span className="text-[10px] text-stone-400">Total Fare</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Promo code & Payment method */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800">
              <span>Payment Option</span>
              <span className="text-[11px] text-stone-500">
                Wallet Balance: <strong className="text-amber-700">{formatNaira(walletBalance)}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`py-2 rounded-xl font-bold border transition ${
                  paymentMethod === 'wallet'
                    ? 'bg-stone-900 text-amber-300 border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                💳 Destiny Wallet
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`py-2 rounded-xl font-bold border transition ${
                  paymentMethod === 'cash'
                    ? 'bg-stone-900 text-amber-300 border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                💵 Cash to Driver
              </button>
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`py-2 rounded-xl font-bold border transition ${
                  paymentMethod === 'transfer'
                    ? 'bg-stone-900 text-amber-300 border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                🏦 Bank Transfer
              </button>
            </div>

            {/* Promo Code input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Promo Code (e.g. DESTINYFIRST)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border border-stone-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500 uppercase"
              />
              <button
                onClick={() => {
                  if (promoCode.trim().toUpperCase() === 'DESTINYFIRST' || promoCode.trim().toUpperCase() === 'NAIJA2026') {
                    setPromoApplied(true);
                  }
                }}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="text-[11px] text-emerald-600 font-bold">
                ✓ Promo code applied! ₦1,000 discount deducted.
              </p>
            )}

            {/* Request Button */}
            {!activeRide ? (
              <button
                id="confirm-request-ride-btn"
                onClick={handleRequestRide}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-700/20 transition flex items-center justify-center gap-2"
              >
                <span>Request {selectedRide.name} ({formatNaira(discountedFare)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCancelRide}
                className="w-full py-2.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs border border-red-200 transition"
              >
                Cancel Current Ride Request
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Simulated Live Transit & Driver Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-stone-900 rounded-2xl border border-stone-800 text-white overflow-hidden shadow-xl">
            {/* Visual Simulated Map Display */}
            <div className="relative h-64 sm:h-72 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-850 p-4 flex flex-col justify-between overflow-hidden">
              {/* Map road lines simulation */}
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-50,80 Q150,180 400,60 T800,160" stroke="#10b981" strokeWidth="6" fill="none" />
                  <path d="M100,-20 L250,400" stroke="#f59e0b" strokeWidth="4" fill="none" />
                  <path d="M-20,220 L700,200" stroke="#6b7280" strokeWidth="4" strokeDasharray="8 6" fill="none" />
                </svg>
              </div>

              {/* Top map info */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-stone-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-stone-700 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-semibold text-stone-200">Lagos Traffic: Normal Flow</span>
                </div>
                <div className="bg-stone-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-stone-700 text-xs text-amber-400 font-mono">
                  {selectedRide.type === 'keke' ? '🛺 14 Keke Nearby' : '🚗 28 Cars Online'}
                </div>
              </div>

              {/* Central Radar Pulse if searching */}
              {activeRide?.status === 'searching' && (
                <div className="relative z-10 text-center space-y-3 py-6">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
                    <div className="absolute inset-2 rounded-full bg-emerald-500/30 animate-pulse"></div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-stone-950 font-black text-sm">
                      {selectedRide.type === 'keke' ? '🛺' : '🚗'}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-stone-200 animate-pulse">
                    Connecting to nearest driver near {pickup}...
                  </p>
                </div>
              )}

              {/* Driver En Route Visual */}
              {activeRide && activeRide.status !== 'searching' && (
                <div className="relative z-10 space-y-2 bg-stone-900/90 backdrop-blur p-3 rounded-xl border border-stone-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold">
                      {activeRide.status === 'driver_assigned' && 'Driver matched & heading to pickup'}
                      {activeRide.status === 'driver_arriving' && '🚖 Driver is 2 mins away!'}
                      {activeRide.status === 'in_transit' && 'Trip in progress to destination'}
                      {activeRide.status === 'completed' && 'Trip successfully completed!'}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      OTP: {activeRide.otpCode}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-1000"
                      style={{
                        width:
                          activeRide.status === 'driver_assigned'
                            ? '35%'
                            : activeRide.status === 'driver_arriving'
                            ? '75%'
                            : activeRide.status === 'in_transit'
                            ? '90%'
                            : '100%'
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Default Preview if no active ride */}
              {!activeRide && (
                <div className="relative z-10 text-center space-y-2 py-4">
                  <div className="inline-block p-3 rounded-full bg-stone-800/80 border border-stone-700 text-2xl">
                    🗺️
                  </div>
                  <p className="text-xs text-stone-300 font-medium">
                    Live GPS Transit Route from <strong className="text-amber-400">{pickup}</strong> to <strong className="text-emerald-400">{destination}</strong>
                  </p>
                </div>
              )}

              {/* Bottom route indicators */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 bg-stone-950/70 p-2 rounded-xl">
                <span className="truncate max-w-[180px]">📍 {pickup}</span>
                <span>➔</span>
                <span className="truncate max-w-[180px]">🏁 {destination}</span>
              </div>
            </div>

            {/* Active Driver Card Details */}
            {activeRide && activeRide.driverName && (
              <div className="p-5 border-t border-stone-800 space-y-4 animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeRide.driverPhoto}
                      alt={activeRide.driverName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-stone-100">{activeRide.driverName}</h4>
                        <div className="flex items-center text-amber-400 text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{activeRide.driverRating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-emerald-400 font-medium">{activeRide.vehicleModel}</p>
                      <p className="text-[11px] font-mono text-stone-400 uppercase tracking-widest font-bold">
                        Plate: {activeRide.vehiclePlate}
                      </p>
                    </div>
                  </div>

                  {/* Call & Chat Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${activeRide.driverPhone}`}
                      className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => alert(`Direct SMS to driver: ${activeRide.driverPhone}`)}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="pt-2 border-t border-stone-800 flex gap-2">
                  {activeRide.status !== 'completed' ? (
                    <button
                      onClick={handleCompleteRideSimulation}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                    >
                      Simulate Arriving & End Ride
                    </button>
                  ) : (
                    <div className="w-full space-y-2 text-center">
                      <div className="text-xs text-emerald-400 font-bold">
                        ✓ Trip Completed. Fare {formatNaira(activeRide.actualFare)} settled via {activeRide.paymentMethod}.
                      </div>
                      <button
                        onClick={() => setActiveRide(null)}
                        className="px-4 py-1.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700"
                      >
                        Book Another Trip
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
