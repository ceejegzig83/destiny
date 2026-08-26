/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ServiceTab,
  UserRole,
  FashionItem,
  GroceryItem,
  FoodItem,
  BakeryItem,
  CartItem,
  Order,
  CateringBooking,
  ActiveRide,
  NotificationItem,
  WalletTransaction
} from './types';
import {
  FASHION_ITEMS,
  GROCERY_ITEMS,
  FOOD_ITEMS,
  BAKERY_ITEMS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_WALLET_TRANSACTIONS
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FashionSection } from './components/FashionSection';
import { RideBookingSection } from './components/RideBookingSection';
import { GrocerySection } from './components/GrocerySection';
import { CateringSection } from './components/CateringSection';
import { BakerySection } from './components/BakerySection';
import { VendorSection } from './components/VendorSection';
import { DriverSection } from './components/DriverSection';
import { OrdersSection } from './components/OrdersSection';
import { CartDrawer } from './components/CartDrawer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { WalletModal } from './components/WalletModal';
import { ApkInstallModal } from './components/ApkInstallModal';
import {
  ShoppingBag,
  Car,
  Utensils,
  Store,
  Sparkles,
  Cake,
  Package,
  Layers,
  ChevronUp,
  MapPin,
  ShieldCheck,
  Smartphone,
  Download
} from 'lucide-react';
import { formatNaira } from './utils/formatters';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<ServiceTab>('all');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [currentLocation, setCurrentLocation] = useState<string>('Kogi State');

  // Core Data Lists (Supports vendor additions)
  const [fashionList, setFashionList] = useState<FashionItem[]>(FASHION_ITEMS);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(GROCERY_ITEMS);
  const [foodList, setFoodList] = useState<FoodItem[]>(FOOD_ITEMS);
  const [bakeryList, setBakeryList] = useState<BakeryItem[]>(BAKERY_ITEMS);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cateringBookings, setCateringBookings] = useState<CateringBooking[]>([]);
  const [activeRides, setActiveRides] = useState<ActiveRide[]>([]);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState<boolean>(false);

  // Notifications & Wallet State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [walletBalance, setWalletBalance] = useState<number>(45000);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_WALLET_TRANSACTIONS);

  // Toast banner state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.itemId === item.itemId && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.title}" to cart!`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order Placement Handler
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    if (newOrder.paymentMethod === 'wallet') {
      setWalletBalance((prev) => Math.max(0, prev - newOrder.totalAmount));
      setWalletTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          type: 'debit',
          amount: newOrder.totalAmount,
          description: `Order ${newOrder.orderNumber} - ${newOrder.items[0]?.title || 'Store Items'}`,
          date: 'Today',
          status: 'successful',
          reference: newOrder.orderNumber
        },
        ...prev
      ]);
    }

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '📦 Order Confirmed',
        message: `Your order ${newOrder.orderNumber} for ${formatNaira(newOrder.totalAmount)} is now processing!`,
        time: 'Just now',
        read: false,
        serviceType: 'system'
      },
      ...prev
    ]);

    showToast(`Order ${newOrder.orderNumber} placed successfully!`);
  };

  // Ride Booking Handler
  const handleRideBooked = (ride: ActiveRide) => {
    setActiveRides((prev) => [ride, ...prev]);
    if (ride.paymentMethod === 'wallet') {
      setWalletBalance((prev) => Math.max(0, prev - ride.estimatedFare));
      setWalletTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          type: 'debit',
          amount: ride.estimatedFare,
          description: `Ride: ${ride.rideOptionName} to ${ride.destination}`,
          date: 'Today',
          status: 'successful',
          reference: `TRIP-${ride.otpCode}`
        },
        ...prev
      ]);
    }
  };

  // Catering Booking Handler
  const handleCateringBooked = (booking: CateringBooking) => {
    setCateringBookings((prev) => [booking, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '🍽️ Catering Request Sent',
        message: `Your banquet quote (${booking.bookingRef}) for ${booking.guestCount} guests has been received!`,
        time: 'Just now',
        read: false,
        serviceType: 'catering'
      },
      ...prev
    ]);
  };

  // Wallet Top-up Handler
  const handleTopUp = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    setWalletTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        type: 'credit',
        amount,
        description: 'Wallet Top-up via Paystack / Card',
        date: 'Today',
        status: 'successful',
        reference: `TOP-${Math.floor(100000 + Math.random() * 900000)}`
      },
      ...prev
    ]);
    showToast(`Wallet credited with ${formatNaira(amount)}!`);
  };

  // Vendor Add Item Handler
  const handleAddNewVendorProduct = (item: any) => {
    if (item.type === 'fashion') {
      setFashionList((prev) => [
        {
          id: `f-${Date.now()}`,
          name: item.name,
          category: item.category,
          price: item.price,
          rating: 5.0,
          reviewsCount: 1,
          image: item.image,
          inStock: true,
          sizes: ['M', 'L', 'XL'],
          colors: ['Standard Pattern'],
          description: item.description,
          isCustomTailored: true
        },
        ...prev
      ]);
    } else if (item.type === 'groceries') {
      setGroceryList((prev) => [
        {
          id: `g-${Date.now()}`,
          name: item.name,
          category: 'Staples & Grains',
          price: item.price,
          unit: item.unit,
          image: item.image,
          inStock: true,
          rating: 5.0,
          description: item.description
        },
        ...prev
      ]);
    } else if (item.type === 'food') {
      setFoodList((prev) => [
        {
          id: `fd-${Date.now()}`,
          name: item.name,
          category: 'Rice & Specials',
          price: item.price,
          prepTime: '20-30 mins',
          rating: 5.0,
          reviewsCount: 1,
          image: item.image,
          description: item.description
        },
        ...prev
      ]);
    }
    showToast(`Product "${item.name}" published to catalog!`);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900 pb-20 md:pb-12" id="destiny-super-app-root">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-950 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl border border-amber-500/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        walletBalance={walletBalance}
        openWalletModal={() => setIsWalletModalOpen(true)}
        openNotificationsModal={() => setIsNotificationsModalOpen(true)}
        openSearchModal={() => setIsSearchModalOpen(true)}
        openApkModal={() => setIsApkModalOpen(true)}
        notifications={notifications}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Hub / All Services Overview */}
        {activeTab === 'all' && (
          <div className="space-y-10">
            <HeroBanner
              onSelectService={setActiveTab}
              onQuickRideSelect={() => setActiveTab('rides')}
              currentLocation={currentLocation}
            />

            {/* Featured Fashion section */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                    👗 Featured Native & Bespoke Fashion
                  </h2>
                  <p className="text-xs text-stone-500">
                    Handcrafted Agbada, Senator outfits, and Aba luxury leather shoes
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('fashion')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-600 underline"
                >
                  View All Fashion →
                </button>
              </div>
              <FashionSection items={fashionList.slice(0, 4)} onAddToCart={handleAddToCart} />
            </div>

            {/* Featured Groceries section */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                    🛒 Wholesale Groceries & Food Staples
                  </h2>
                  <p className="text-xs text-stone-500">
                    50kg Rice, farm fresh eggs, Benue sweet yam & cooking oils
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('groceries')}
                  className="text-xs font-bold text-blue-700 hover:text-blue-600 underline"
                >
                  Shop Full Mart →
                </button>
              </div>
              <GrocerySection items={groceryList.slice(0, 4)} onAddToCart={handleAddToCart} />
            </div>

            {/* Featured Catering & Bakery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-lg text-stone-900 font-display">
                    🍽️ Wedding & Campaign Catering
                  </h3>
                  <button
                    onClick={() => setActiveTab('catering')}
                    className="text-xs font-bold text-red-700 underline"
                  >
                    View Packages →
                  </button>
                </div>
                <CateringSection
                  foodItems={foodList.slice(0, 3)}
                  onAddToCart={handleAddToCart}
                  onCateringBooked={handleCateringBooked}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-lg text-stone-900 font-display">
                    🧁 Celebration Cakes & Bakes
                  </h3>
                  <button
                    onClick={() => setActiveTab('bakery')}
                    className="text-xs font-bold text-fuchsia-700 underline"
                  >
                    Custom Cakes →
                  </button>
                </div>
                <BakerySection
                  items={bakeryList.slice(0, 3)}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>

            {/* Android App & APK Download Highlight Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-amber-500/40 p-6 shadow-xl text-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-stone-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                  FD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-stone-100 font-display">
                      Install Flourish Destiny on your Android Phone
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      APK / PWA
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 max-w-xl">
                    Get instant access to bespoke tailoring orders, Keke & car transit bookings, wholesale food orders, and live tracking directly from your phone's home screen.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsApkModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Get Android App / APK</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Fashion */}
        {activeTab === 'fashion' && (
          <FashionSection items={fashionList} onAddToCart={handleAddToCart} />
        )}

        {/* Tab 2: Rides & Keke */}
        {activeTab === 'rides' && (
          <RideBookingSection
            currentLocation={currentLocation}
            walletBalance={walletBalance}
            onRideBooked={handleRideBooked}
          />
        )}

        {/* Tab 3: Groceries */}
        {activeTab === 'groceries' && (
          <GrocerySection items={groceryList} onAddToCart={handleAddToCart} />
        )}

        {/* Tab 4: Catering */}
        {activeTab === 'catering' && (
          <CateringSection
            foodItems={foodList}
            onAddToCart={handleAddToCart}
            onCateringBooked={handleCateringBooked}
          />
        )}

        {/* Tab 5: Bakery */}
        {activeTab === 'bakery' && (
          <BakerySection items={bakeryList} onAddToCart={handleAddToCart} />
        )}

        {/* Tab 6: Orders */}
        {activeTab === 'orders' && (
          <OrdersSection
            orders={orders}
            cateringBookings={cateringBookings}
            activeRides={activeRides}
          />
        )}

        {/* Tab 7: Vendor Hub */}
        {activeTab === 'vendor' && (
          <VendorSection orders={orders} onAddNewProduct={handleAddNewVendorProduct} />
        )}

        {/* Tab 8: Driver Cockpit */}
        {activeTab === 'driver' && <DriverSection />}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        walletBalance={walletBalance}
        onOrderPlaced={handleOrderPlaced}
        currentLocation={currentLocation}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        fashionItems={fashionList}
        groceryItems={groceryList}
        foodItems={foodList}
        bakeryItems={bakeryList}
        onSelectService={(tab) => {
          setActiveTab(tab);
          setIsSearchModalOpen(false);
        }}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        balance={walletBalance}
        transactions={walletTransactions}
        onTopUp={handleTopUp}
      />

      {/* APK & Android Installation Modal */}
      <ApkInstallModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Mobile Sticky Bottom Navigation Bar (Phone App Feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 text-stone-300 py-1.5 px-2 flex justify-around items-center shadow-2xl">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'all' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <span className="text-base">✨</span>
          <span className="text-[10px]">Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('fashion')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'fashion' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <span className="text-base">👗</span>
          <span className="text-[10px]">Fashion</span>
        </button>

        <button
          onClick={() => setActiveTab('rides')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'rides' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <span className="text-base">🚕</span>
          <span className="text-[10px]">Rides</span>
        </button>

        <button
          onClick={() => setActiveTab('groceries')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'groceries' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <span className="text-base">🛒</span>
          <span className="text-[10px]">Groceries</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-lg ${
            activeTab === 'orders' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <span className="text-base">📦</span>
          <span className="text-[10px]">Orders</span>
        </button>

        <button
          onClick={() => setIsApkModalOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1 rounded-lg text-emerald-400"
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-[10px] font-bold">APK</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-stone-900 border-t border-stone-800 text-stone-400 text-xs py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center text-xs">
              FD
            </div>
            <span className="font-extrabold text-stone-200 font-display">
              FLOURISH DESTINY COLLECTION
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-stone-400">
            <span>👗 Bespoke Native Tailoring</span>
            <span>•</span>
            <span>🚖 Keke & Saloon Transit</span>
            <span>•</span>
            <span>🛒 50kg Rice & Mart</span>
            <span>•</span>
            <span>🍽️ Banquet Event Catering</span>
            <span>•</span>
            <span>🧁 Custom Cakes</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsApkModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 hover:text-emerald-300 font-bold border border-stone-700 transition"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Download Android APK</span>
            </button>
            <div className="text-[11px] text-stone-500">
              © 2026 Flourish Destiny Collection Nigeria Ltd. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
