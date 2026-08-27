import React from 'react';
import {
  Car,
  ShoppingBag,
  Utensils,
  Store,
  Sparkles,
  Cake,
  ShieldCheck,
  Clock,
  ArrowRight,
  MapPin,
  Flame,
  Smartphone,
  Download
} from 'lucide-react';
import { ServiceTab, PortalConfig } from '../types';

interface HeroBannerProps {
  onSelectService: (tab: ServiceTab) => void;
  onQuickRideSelect: () => void;
  currentLocation: string;
  portalConfig: PortalConfig;
  onOpenDownloadModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectService,
  onQuickRideSelect,
  currentLocation,
  portalConfig,
  onOpenDownloadModal
}) => {
  const serviceCards = [
    {
      tab: 'fashion' as ServiceTab,
      title: 'Fashion & Tailoring',
      subtitle: 'Native Agbada, Senator, Ankara & Shoes',
      icon: '👗',
      bgColor: 'from-amber-600/90 to-amber-800/90',
      badge: 'Bespoke Fit',
      bgImg: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80'
    },
    {
      tab: 'rides' as ServiceTab,
      title: 'Ride & Keke Transit',
      subtitle: 'Instant Keke Napep & Saloon Car rides',
      icon: '🚕',
      bgColor: 'from-emerald-600/90 to-emerald-900/90',
      badge: 'Fast ETA (3m)',
      bgImg: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80'
    },
    {
      tab: 'groceries' as ServiceTab,
      title: 'Grocery Supermart',
      subtitle: '50kg Rice, Fresh Eggs, Peppers & Yam',
      icon: '🛒',
      bgColor: 'from-blue-600/90 to-indigo-900/90',
      badge: 'Wholesale Price',
      bgImg: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
    },
    {
      tab: 'catering' as ServiceTab,
      title: 'Catering & Banquets',
      subtitle: 'Wedding feasts, Campaign meals & Jollof',
      icon: '🍽️',
      bgColor: 'from-red-600/90 to-rose-900/90',
      badge: 'Up to 10k Guests',
      bgImg: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
    },
    {
      tab: 'bakery' as ServiceTab,
      title: 'Bakery & Sweet Treats',
      subtitle: 'Wedding cakes, Meatpies & Agege bread',
      icon: '🧁',
      bgColor: 'from-fuchsia-600/90 to-purple-900/90',
      badge: 'Fresh Daily',
      bgImg: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Hero */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-stone-800 text-white p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Background decorative styling */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand & Value proposition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Nigeria's Premier Multi-Service Super App</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-tight">
              {portalConfig.portalName.split(' ')[0]} {portalConfig.portalName.split(' ')[1] || ''} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                {portalConfig.portalName.split(' ').slice(2).join(' ') || 'COLLECTION'}
              </span>
            </h1>

            <p className="text-stone-300 text-xs sm:text-base leading-relaxed max-w-xl">
              {portalConfig.portalTagline}. Fast transit, bespoke tailoring, catering banquets and wholesale groceries across <span className="text-amber-300 font-semibold">{currentLocation}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                id="hero-explore-fashion-btn"
                onClick={() => onSelectService('fashion')}
                className="w-full sm:w-auto justify-center bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-amber-600/30 transition flex items-center gap-2"
              >
                <span>Shop Fashion Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-quick-ride-btn"
                onClick={() => onSelectService('rides')}
                className="w-full sm:w-auto justify-center bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 px-5 py-3 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-2"
              >
                <span>🚕 Book a Keke / Car</span>
              </button>

              {onOpenDownloadModal && (
                <button
                  onClick={onOpenDownloadModal}
                  className="w-full sm:w-auto justify-center bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Get App (.APK / Win / iOS)</span>
                </button>
              )}
            </div>

            {/* Guarantees row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-stone-800/80 text-[11px] sm:text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Drivers & Tailors</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Express 30m Mart Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400 shrink-0" />
                <span>Hotline: {portalConfig.hotline}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Super App Transit & Service Launcher */}
          <div className="lg:col-span-5">
            <div className="bg-stone-850/90 backdrop-blur border border-stone-700/80 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-stone-100">Destiny Transit Express</h2>
                    <p className="text-[11px] text-stone-400">Need a ride right now?</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Drivers Active
                </span>
              </div>

              {/* Ride route quick inputs */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 bg-stone-900/80 border border-stone-700/60 rounded-xl p-2.5 text-stone-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></div>
                  <span className="truncate">{currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/80 border border-stone-700/60 rounded-xl p-2.5 text-stone-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></div>
                  <span>Where are you heading to?</span>
                </div>
              </div>

              {/* Quick ride selector */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  id="hero-book-keke-btn"
                  onClick={() => {
                    onSelectService('rides');
                  }}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-left transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-stone-200">🛺 Keke Napep</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">From ₦800 • 3m ETA</div>
                  </div>
                </button>

                <button
                  id="hero-book-saloon-btn"
                  onClick={() => {
                    onSelectService('rides');
                  }}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-left transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-stone-200">🚗 Saloon Go</div>
                    <div className="text-[10px] text-amber-400 font-semibold">From ₦2,200 • AC</div>
                  </div>
                </button>
              </div>

              <button
                id="hero-start-ride-request-btn"
                onClick={() => onSelectService('rides')}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Find Nearest Driver / Keke</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Super App Service Tiles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
            <span>Explore All Destiny Services</span>
            <span className="text-xs font-normal text-stone-500">({serviceCards.length} departments)</span>
          </h2>
          <span className="text-xs text-amber-700 font-semibold">All-in-one Nigerian Super Hub</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {serviceCards.map((card) => (
            <button
              key={card.tab}
              id={`service-card-${card.tab}`}
              onClick={() => onSelectService(card.tab)}
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 text-left shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-44"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-stone-100 group-hover:bg-amber-100 transition">
                  {card.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {card.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition">
                  {card.title}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="flex items-center text-[11px] font-bold text-amber-700 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Enter Store</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
