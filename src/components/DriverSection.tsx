import React, { useState, useEffect } from 'react';
import {
  Car,
  Power,
  Navigation,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Phone,
  Shield,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { formatNaira, triggerConfetti } from '../utils/formatters';

export const DriverSection: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [todayEarnings, setTodayEarnings] = useState<number>(38400);
  const [completedTrips, setCompletedTrips] = useState<number>(14);
  const [incomingRide, setIncomingRide] = useState<{
    id: string;
    passengerName: string;
    pickup: string;
    dropoff: string;
    fare: number;
    distance: string;
    type: string;
  } | null>(null);

  const [activeTrip, setActiveTrip] = useState<any>(null);

  // Trigger simulated incoming trip when online
  useEffect(() => {
    if (isOnline && !activeTrip && !incomingRide) {
      const timer = setTimeout(() => {
        setIncomingRide({
          id: `req-${Date.now()}`,
          passengerName: 'Dr. Adeyemi Adeleke',
          pickup: 'Admiralty Way, Lekki Phase 1',
          dropoff: 'Civic Centre, Ozumba Mbadiwe, VI',
          fare: 2800,
          distance: '4.2 km (12 mins)',
          type: '🛺 Keke Express'
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, activeTrip, incomingRide]);

  const handleAcceptRide = () => {
    if (incomingRide) {
      setActiveTrip(incomingRide);
      setIncomingRide(null);
      triggerConfetti();
    }
  };

  const handleDeclineRide = () => {
    setIncomingRide(null);
  };

  const handleCompleteActiveTrip = () => {
    if (activeTrip) {
      setTodayEarnings((prev) => prev + activeTrip.fare);
      setCompletedTrips((prev) => prev + 1);
      setActiveTrip(null);
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6" id="driver-section">
      {/* Driver Cockpit Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Car className="w-3.5 h-3.5 text-emerald-400" />
            <span>Destiny Transit Driver Cockpit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">
            Driver & Keke Rider Portal
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
            Vehicle: <strong>Bajaj RE 4S Keke (KJA-392-XX)</strong> • License Verified
          </p>
        </div>

        {/* Online/Offline Toggle */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition flex items-center gap-2 ${
            isOnline
              ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-600/30'
              : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isOnline ? 'ONLINE (Receiving Trips)' : 'OFFLINE (Paused)'}</span>
        </button>
      </div>

      {/* Driver Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500">Today's Take-Home Earnings</span>
          <div className="text-2xl font-black text-emerald-600">
            {formatNaira(todayEarnings)}
          </div>
          <span className="text-[10px] text-stone-400">Direct wallet payout</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500">Trips Completed Today</span>
          <div className="text-2xl font-black text-stone-900">
            {completedTrips} Trips
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">100% Acceptance Rate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500">Driver Star Rating</span>
          <div className="text-2xl font-black text-amber-500 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400" />
            <span>4.95</span>
          </div>
          <span className="text-[10px] text-stone-400">Based on 280 rider ratings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500">Fuel & Trip Bonus</span>
          <div className="text-2xl font-black text-teal-600">
            +₦5,000
          </div>
          <span className="text-[10px] text-teal-700 font-bold">Weekly milestone achieved</span>
        </div>
      </div>

      {/* Active Trip or Waiting status */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        {activeTrip ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                  Active Passenger Onboard
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Trip to {activeTrip.dropoff}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500 block">Trip Fare</span>
                <span className="text-xl font-black text-emerald-600">
                  {formatNaira(activeTrip.fare)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <span className="text-stone-400">Pickup:</span>
                    <div className="font-bold text-stone-900">{activeTrip.pickup}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div>
                    <span className="text-stone-400">Drop-off:</span>
                    <div className="font-bold text-stone-900">{activeTrip.dropoff}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-800">Passenger Info:</div>
                <div className="text-stone-900 font-bold">{activeTrip.passengerName}</div>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:08030000000"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Rider</span>
                  </a>
                  <button
                    onClick={() => alert('GPS Navigation Opened in Google Maps')}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 text-white font-bold flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Start Navigation</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteActiveTrip}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              Arrived at Destination • End Trip & Collect {formatNaira(activeTrip.fare)}
            </button>
          </div>
        ) : (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
              🚕
            </div>
            <h3 className="font-bold text-stone-900 text-base">
              {isOnline ? 'Listening for Trips in Lagos & Nearby...' : 'You are currently Offline'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {isOnline
                ? 'High demand detected in Lekki, Victoria Island, and Ikeja. Stay online to receive trips.'
                : 'Turn toggle ON above to start earning.'}
            </p>
          </div>
        )}
      </div>

      {/* Simulated Incoming Ride Request Alert Modal */}
      {incomingRide && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="bg-stone-900 text-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-emerald-500/40 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-xs font-black uppercase tracking-wider animate-pulse">
                New Trip Request!
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">
                12s to accept
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {formatNaira(incomingRide.fare)}
              </div>
              <div className="text-xs text-stone-400">{incomingRide.type} • {incomingRide.distance}</div>
            </div>

            <div className="space-y-2 text-xs bg-stone-850 p-3.5 rounded-xl border border-stone-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">Pickup:</span>
                <span className="text-stone-200">{incomingRide.pickup}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">Dropoff:</span>
                <span className="text-stone-200">{incomingRide.dropoff}</span>
              </div>
              <div className="pt-1 text-[11px] text-stone-400">
                Passenger: <strong className="text-stone-200">{incomingRide.passengerName}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDeclineRide}
                className="py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition border border-stone-700"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptRide}
                className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-extrabold shadow-lg shadow-emerald-600/40 transition"
              >
                Accept Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
