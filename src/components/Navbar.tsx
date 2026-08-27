import React, { useState } from 'react';
import {
  ShoppingBag,
  MapPin,
  Search,
  Bell,
  Wallet,
  Car,
  Utensils,
  Store,
  ChevronDown,
  Sparkles,
  UserCheck,
  Menu,
  X,
  Layers,
  Smartphone,
  Download,
  ShieldCheck,
  Shield
} from 'lucide-react';
import { ServiceTab, UserRole, CartItem, NotificationItem, PortalConfig } from '../types';
import { POPULAR_LOCATIONS } from '../data/mockData';
import { formatNaira } from '../utils/formatters';

interface NavbarProps {
  activeTab: ServiceTab;
  setActiveTab: (tab: ServiceTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  walletBalance: number;
  openWalletModal: () => void;
  openNotificationsModal: () => void;
  openSearchModal: () => void;
  notifications: NotificationItem[];
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  openApkModal: () => void;
  portalConfig: PortalConfig;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  cartItems,
  setIsCartOpen,
  walletBalance,
  openWalletModal,
  openNotificationsModal,
  openSearchModal,
  notifications,
  currentLocation,
  setCurrentLocation,
  openApkModal,
  portalConfig,
  onOpenAdmin
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const serviceNavItems: { id: ServiceTab; label: string; icon: string }[] = [
    { id: 'all', label: 'Explore Hub', icon: '✨' },
    { id: 'fashion', label: 'Fashion & Native', icon: '👗' },
    { id: 'rides', label: 'Ride Transit', icon: '🚕' },
    { id: 'groceries', label: 'Groceries Mart', icon: '🛒' },
    { id: 'catering', label: 'Catering & Food', icon: '🍽️' },
    { id: 'bakery', label: 'Bakery & Cakes', icon: '🧁' },
    { id: 'orders', label: 'My Orders & Rides', icon: '📦' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md border-b border-stone-800" id="main-header">
      {/* Top Announcement Bar if enabled in portalConfig */}
      {portalConfig.showAnnouncement && portalConfig.announcementText && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 text-[11px] sm:text-xs font-bold py-1 px-4 text-center shadow-inner flex items-center justify-center gap-2">
          <span>{portalConfig.announcementText}</span>
        </div>
      )}

      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 border-b border-stone-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {portalConfig.primaryLocation} & Nationwide Nigeria
          </span>

          {/* Location selector */}
          <div className="relative">
            <button
              id="location-picker-btn"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-1 text-stone-300 hover:text-white transition py-1 px-2 rounded hover:bg-stone-800/60"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium truncate max-w-[140px] sm:max-w-[200px]">{currentLocation}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-700">
                  Select Delivery / Ride City
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setCurrentLocation(loc);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-700 transition ${
                        currentLocation === loc ? 'text-amber-400 font-semibold bg-stone-700/50' : 'text-stone-300'
                      }`}
                    >
                      <span>{loc}</span>
                      {currentLocation === loc && <span className="text-amber-400 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Role switcher, Admin Link & Hotline */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="hidden md:inline text-stone-400">
            Hotline: <strong className="text-stone-200 font-mono">{portalConfig.hotline}</strong>
          </span>

          {/* Quick Admin Dashboard Link */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-lg text-xs font-semibold transition"
            title="Access Admin CMS Portal via /#admin"
          >
            <Shield className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Admin (/#admin)</span>
            <span className="sm:hidden">Admin</span>
          </button>

          <div className="relative">
            <button
              id="role-switcher-btn"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-2.5 py-1 rounded-lg transition text-xs font-medium"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="capitalize">{userRole} View</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl py-1 z-50 text-xs">
                <button
                  onClick={() => {
                    setUserRole('customer');
                    setIsRoleDropdownOpen(false);
                    if (activeTab === 'vendor' || activeTab === 'driver' || activeTab === 'admin') setActiveTab('all');
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-stone-700 flex items-center gap-2 ${
                    userRole === 'customer' ? 'text-amber-400 font-semibold' : 'text-stone-300'
                  }`}
                >
                  <span>🛍️ Customer Mode</span>
                </button>
                <button
                  onClick={() => {
                    setUserRole('vendor');
                    setIsRoleDropdownOpen(false);
                    setActiveTab('vendor');
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-stone-700 flex items-center gap-2 ${
                    userRole === 'vendor' ? 'text-amber-400 font-semibold' : 'text-stone-300'
                  }`}
                >
                  <span>🏪 Vendor / Partner Portal</span>
                </button>
                <button
                  onClick={() => {
                    setUserRole('driver');
                    setIsRoleDropdownOpen(false);
                    setActiveTab('driver');
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-stone-700 flex items-center gap-2 ${
                    userRole === 'driver' ? 'text-amber-400 font-semibold' : 'text-stone-300'
                  }`}
                >
                  <span>🚕 Driver & Keke Mode</span>
                </button>
                <div className="border-t border-stone-700 my-1"></div>
                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-amber-500/20 text-amber-300 font-bold flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>🛡️ Master Admin (/#admin)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Brand logo */}
        <div className="flex items-center gap-2.5">
          <button
            id="brand-logo-btn"
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-900/40 text-stone-950 font-black text-lg tracking-tighter group-hover:scale-105 transition-transform">
              FD
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold tracking-tight text-base sm:text-lg text-amber-400 font-display">
                  {portalConfig.portalName}
                </span>
                <span className="hidden xs:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Collection
                </span>
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold -mt-0.5 hidden sm:block truncate max-w-xs">
                {portalConfig.portalTagline}
              </p>
            </div>
          </button>
        </div>

        {/* Global Search pill */}
        <button
          id="global-search-trigger"
          onClick={openSearchModal}
          className="flex-1 max-w-md hidden md:flex items-center justify-between bg-stone-800/90 hover:bg-stone-800 border border-stone-700/80 rounded-xl px-3.5 py-2 text-stone-400 text-xs transition shadow-inner group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
            <span className="truncate">Search Senator wear, Keke rides, Jollof, 50kg Rice, Cakes...</span>
          </div>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-700 text-stone-300 rounded border border-stone-600">
            Ctrl+K
          </kbd>
        </button>

        {/* Right side interactive icons */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* Mobile search button */}
          <button
            id="mobile-search-btn"
            onClick={openSearchModal}
            className="md:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Android App / APK / Multi-Platform Download button */}
          <button
            id="install-apk-btn"
            onClick={openApkModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/15 to-emerald-600/25 hover:from-emerald-500/25 hover:to-emerald-600/35 text-emerald-300 border border-emerald-500/40 px-2.5 sm:px-3 py-1.5 rounded-xl transition text-xs font-bold shadow-sm"
            title="Download Android APK, iOS WebApp & Windows Desktop App"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Download App</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-200 font-bold">
              APK / Win / iOS
            </span>
          </button>

          {/* Destiny Wallet balance */}
          <button
            id="wallet-modal-btn"
            onClick={openWalletModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 to-amber-600/20 hover:from-amber-500/20 hover:to-amber-600/30 text-amber-300 border border-amber-500/40 px-2.5 sm:px-3 py-1.5 rounded-xl transition text-xs font-semibold"
          >
            <Wallet className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Wallet:</span>
            <span className="text-amber-200">{formatNaira(walletBalance)}</span>
          </button>

          {/* Notifications */}
          <button
            id="notifications-btn"
            onClick={openNotificationsModal}
            className="relative p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            id="cart-drawer-toggle-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-xl transition shadow-lg shadow-amber-600/20 text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[11px] bg-stone-950 text-amber-400 rounded-full font-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop service navigation tabs */}
      <nav className="hidden md:flex border-t border-stone-800 bg-stone-900/90 backdrop-blur px-3 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 py-1 max-w-7xl mx-auto w-full">
          {serviceNavItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          {userRole === 'vendor' && (
            <button
              onClick={() => setActiveTab('vendor')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'vendor'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-amber-400 hover:bg-stone-800'
              }`}
            >
              <span>🏪</span>
              <span>Vendor Hub</span>
            </button>
          )}

          {userRole === 'driver' && (
            <button
              onClick={() => setActiveTab('driver')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'driver'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-amber-400 hover:bg-stone-800'
              }`}
            >
              <span>🚕</span>
              <span>Driver Cockpit</span>
            </button>
          )}

          <button
            onClick={onOpenAdmin}
            className="ml-auto px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition flex items-center gap-1.5 text-amber-300 hover:bg-amber-500/20"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Portal</span>
          </button>
        </div>
      </nav>

      {/* Mobile expandable drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {serviceNavItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left text-xs font-medium flex items-center gap-2 border ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                      : 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-800 space-y-2">
            <button
              onClick={() => {
                openApkModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Download Apps (Android APK / Win / iOS)</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Open Admin Portal (/#admin)</span>
            </button>

            <div className="flex justify-between items-center text-xs text-stone-400 pt-1">
              <span>Role: <strong className="text-amber-400 capitalize">{userRole}</strong></span>
              <button
                onClick={() => {
                  const nextRole: UserRole = userRole === 'customer' ? 'vendor' : userRole === 'vendor' ? 'driver' : 'customer';
                  setUserRole(nextRole);
                  if (nextRole === 'vendor') setActiveTab('vendor');
                  if (nextRole === 'driver') setActiveTab('driver');
                }}
                className="text-amber-400 font-semibold underline"
              >
                Switch Role
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
