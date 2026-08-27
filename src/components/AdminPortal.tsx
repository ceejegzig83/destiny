import React, { useState } from 'react';
import {
  Settings,
  ShoppingBag,
  Car,
  Utensils,
  Store,
  Cake,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Shield,
  Phone,
  MapPin,
  Tag,
  Truck,
  Check,
  Search,
  Filter,
  ArrowLeft,
  Sparkles,
  Smartphone,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Lock,
  Unlock
} from 'lucide-react';
import {
  FashionItem,
  GroceryItem,
  FoodItem,
  BakeryItem,
  CateringPackage,
  CateringBooking,
  RideOption,
  Order,
  PortalConfig,
  DriverInfo,
  VendorInfo,
  NotificationItem
} from '../types';
import { formatNaira } from '../utils/formatters';

interface AdminPortalProps {
  portalConfig: PortalConfig;
  setPortalConfig: React.Dispatch<React.SetStateAction<PortalConfig>>;
  fashionList: FashionItem[];
  setFashionList: React.Dispatch<React.SetStateAction<FashionItem[]>>;
  groceryList: GroceryItem[];
  setGroceryList: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
  foodList: FoodItem[];
  setFoodList: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  bakeryList: BakeryItem[];
  setBakeryList: React.Dispatch<React.SetStateAction<BakeryItem[]>>;
  cateringPackages: CateringPackage[];
  setCateringPackages: React.Dispatch<React.SetStateAction<CateringPackage[]>>;
  cateringBookings: CateringBooking[];
  setCateringBookings: React.Dispatch<React.SetStateAction<CateringBooking[]>>;
  rideOptions: RideOption[];
  setRideOptions: React.Dispatch<React.SetStateAction<RideOption[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  drivers: DriverInfo[];
  setDrivers: React.Dispatch<React.SetStateAction<DriverInfo[]>>;
  vendors: VendorInfo[];
  setVendors: React.Dispatch<React.SetStateAction<VendorInfo[]>>;
  onExitAdmin: () => void;
  onOpenDownloadModal: () => void;
  showToast: (msg: string) => void;
}

type AdminTab = 
  | 'overview' 
  | 'settings' 
  | 'fashion' 
  | 'rides' 
  | 'groceries' 
  | 'catering' 
  | 'bakery' 
  | 'orders' 
  | 'drivers_vendors' 
  | 'backup';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  portalConfig,
  setPortalConfig,
  fashionList,
  setFashionList,
  groceryList,
  setGroceryList,
  foodList,
  setFoodList,
  bakeryList,
  setBakeryList,
  cateringPackages,
  setCateringPackages,
  cateringBookings,
  setCateringBookings,
  rideOptions,
  setRideOptions,
  orders,
  setOrders,
  drivers,
  setDrivers,
  vendors,
  setVendors,
  onExitAdmin,
  onOpenDownloadModal,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings Form State
  const [tempConfig, setTempConfig] = useState<PortalConfig>(portalConfig);
  const [hasUnsavedSettings, setHasUnsavedSettings] = useState(false);

  // Edit Modals / Inline Form States
  const [editingFashion, setEditingFashion] = useState<FashionItem | null>(null);
  const [isAddingFashion, setIsAddingFashion] = useState(false);

  const [editingGrocery, setEditingGrocery] = useState<GroceryItem | null>(null);
  const [isAddingGrocery, setIsAddingGrocery] = useState(false);

  const [editingBakery, setEditingBakery] = useState<BakeryItem | null>(null);
  const [isAddingBakery, setIsAddingBakery] = useState(false);

  const [editingRide, setEditingRide] = useState<RideOption | null>(null);
  const [editingCatering, setEditingCatering] = useState<CateringPackage | null>(null);

  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Quick Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => o.paymentStatus === 'paid' ? sum + o.totalAmount : sum, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'placed' || o.status === 'confirmed').length;
  const activeDriversCount = drivers.filter(d => d.status === 'active').length;
  const verifiedVendorsCount = vendors.filter(v => v.status === 'verified').length;

  // Settings Handlers
  const handleConfigChange = (key: keyof PortalConfig, value: any) => {
    setTempConfig(prev => ({ ...prev, [key]: value }));
    setHasUnsavedSettings(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setPortalConfig(tempConfig);
    setHasUnsavedSettings(false);
    showToast('✅ Portal settings updated and published live!');
  };

  const handleResetSettings = () => {
    setTempConfig(portalConfig);
    setHasUnsavedSettings(false);
  };

  // Fashion Item Handlers
  const handleSaveFashion = (item: FashionItem) => {
    if (editingFashion) {
      setFashionList(prev => prev.map(f => f.id === item.id ? item : f));
      showToast(`Updated "${item.name}"`);
      setEditingFashion(null);
    } else if (isAddingFashion) {
      const newItem = { ...item, id: `f-${Date.now()}` };
      setFashionList(prev => [newItem, ...prev]);
      showToast(`Added new fashion outfit "${item.name}"`);
      setIsAddingFashion(false);
    }
  };

  const handleDeleteFashion = (id: string) => {
    if (confirm('Are you sure you want to delete this fashion item?')) {
      setFashionList(prev => prev.filter(f => f.id !== id));
      showToast('Fashion item deleted.');
    }
  };

  const handleToggleFashionStock = (id: string) => {
    setFashionList(prev => prev.map(f => f.id === id ? { ...f, inStock: !f.inStock } : f));
    showToast('Toggled stock availability.');
  };

  // Grocery Handlers
  const handleSaveGrocery = (item: GroceryItem) => {
    if (editingGrocery) {
      setGroceryList(prev => prev.map(g => g.id === item.id ? item : g));
      showToast(`Updated grocery "${item.name}"`);
      setEditingGrocery(null);
    } else if (isAddingGrocery) {
      const newItem = { ...item, id: `g-${Date.now()}` };
      setGroceryList(prev => [newItem, ...prev]);
      showToast(`Added new grocery item "${item.name}"`);
      setIsAddingGrocery(false);
    }
  };

  const handleDeleteGrocery = (id: string) => {
    if (confirm('Delete this grocery product?')) {
      setGroceryList(prev => prev.filter(g => g.id !== id));
      showToast('Grocery product removed.');
    }
  };

  const handleToggleGroceryStock = (id: string) => {
    setGroceryList(prev => prev.map(g => g.id === id ? { ...g, inStock: !g.inStock } : g));
    showToast('Grocery stock updated.');
  };

  // Bakery Handlers
  const handleSaveBakery = (item: BakeryItem) => {
    if (editingBakery) {
      setBakeryList(prev => prev.map(b => b.id === item.id ? item : b));
      showToast(`Updated cake/pastry "${item.name}"`);
      setEditingBakery(null);
    } else if (isAddingBakery) {
      const newItem = { ...item, id: `b-${Date.now()}` };
      setBakeryList(prev => [newItem, ...prev]);
      showToast(`Added new bakery item "${item.name}"`);
      setIsAddingBakery(false);
    }
  };

  const handleDeleteBakery = (id: string) => {
    if (confirm('Delete this bakery product?')) {
      setBakeryList(prev => prev.filter(b => b.id !== id));
      showToast('Bakery item removed.');
    }
  };

  // Ride Option Handlers
  const handleSaveRide = (ride: RideOption) => {
    setRideOptions(prev => prev.map(r => r.id === ride.id ? ride : r));
    showToast(`Updated ride fares for ${ride.name}`);
    setEditingRide(null);
  };

  // Catering Package Handlers
  const handleSaveCatering = (pkg: CateringPackage) => {
    setCateringPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p));
    showToast(`Updated catering package "${pkg.title}"`);
    setEditingCatering(null);
  };

  // Order Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to "${newStatus.replace('_', ' ')}"`);
  };

  const handleUpdatePaymentStatus = (orderId: string, newPaymentStatus: Order['paymentStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o));
    showToast(`Payment status updated to "${newPaymentStatus}"`);
  };

  // Driver & Vendor Status Toggles
  const handleToggleDriverStatus = (id: string) => {
    setDrivers(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === 'active' ? 'suspended' : 'active';
        showToast(`Driver ${d.name} is now ${nextStatus}`);
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const handleToggleVendorStatus = (id: string) => {
    setVendors(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'verified' ? 'suspended' : 'verified';
        showToast(`Vendor ${v.businessName} is now ${nextStatus}`);
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  // Export / Backup Handlers
  const handleExportBackup = () => {
    const backupData = {
      portalConfig,
      fashionList,
      groceryList,
      foodList,
      bakeryList,
      cateringPackages,
      rideOptions,
      orders,
      drivers,
      vendors,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flourish_destiny_portal_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Portal data backup exported successfully!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.portalConfig) setPortalConfig(imported.portalConfig);
        if (imported.fashionList) setFashionList(imported.fashionList);
        if (imported.groceryList) setGroceryList(imported.groceryList);
        if (imported.foodList) setFoodList(imported.foodList);
        if (imported.bakeryList) setBakeryList(imported.bakeryList);
        if (imported.cateringPackages) setCateringPackages(imported.cateringPackages);
        if (imported.rideOptions) setRideOptions(imported.rideOptions);
        if (imported.orders) setOrders(imported.orders);
        if (imported.drivers) setDrivers(imported.drivers);
        if (imported.vendors) setVendors(imported.vendors);
        showToast('✅ Portal state successfully restored from backup!');
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-20">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-500/30 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-stone-950 font-black text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                FD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-tight text-amber-400 text-base sm:text-lg font-display">
                    {portalConfig.portalName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Master Admin
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Full Portal CMS & Operations Control (Hash: <code className="text-amber-400 bg-stone-800 px-1 rounded">/#admin</code>)
                </p>
              </div>
            </div>

            <button
              onClick={onExitAdmin}
              className="md:hidden px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Exit
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={onOpenDownloadModal}
              className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              title="Download Android APK, iOS WebApp & Windows Executable"
            >
              <Smartphone className="w-4 h-4" />
              <span>Download Apps (.APK / Win / iOS)</span>
            </button>

            <button
              onClick={onExitAdmin}
              className="hidden md:flex px-4 py-1.5 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-xs font-bold rounded-xl items-center gap-1.5 transition border border-stone-700"
            >
              <Eye className="w-4 h-4" />
              <span>View Live Storefront</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Sub-Navbar / Tabs */}
      <div className="bg-stone-900 border-b border-stone-800 sticky top-[69px] z-30 overflow-x-auto scrollbar-none px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 py-2">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: TrendingUp },
            { id: 'settings', label: 'Portal Settings & Branding', icon: Settings },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'fashion', label: `Fashion (${fashionList.length})`, icon: ShoppingBag },
            { id: 'rides', label: `Rides & Transit (${rideOptions.length})`, icon: Car },
            { id: 'groceries', label: `Groceries (${groceryList.length})`, icon: Store },
            { id: 'catering', label: `Catering (${cateringPackages.length})`, icon: Utensils },
            { id: 'bakery', label: `Bakery (${bakeryList.length})`, icon: Cake },
            { id: 'drivers_vendors', label: 'Drivers & Vendors', icon: Users },
            { id: 'backup', label: 'Data Backup', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">

        {/* 1. OVERVIEW & ANALYTICS TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Sales GMV</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-display">
                  {formatNaira(totalRevenue)}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">Paid and fulfilled customer orders</p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-400 font-display">
                  {totalOrdersCount} Orders
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  {pendingOrdersCount} pending / in-progress
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Fleet & Drivers</span>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Car className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-blue-400 font-display">
                  {activeDriversCount} Online
                </div>
                <p className="text-[11px] text-stone-500 mt-1">Keke Napep & Saloons active in Kogi State</p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Catalog Items</span>
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-purple-400 font-display">
                  {fashionList.length + groceryList.length + bakeryList.length} Items
                </div>
                <p className="text-[11px] text-stone-500 mt-1">Across Fashion, Groceries, Bakery & Catering</p>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-900 to-amber-500/10 border border-amber-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Live Portal Control
                </h2>
                <p className="text-xs text-stone-300 mt-1 max-w-2xl">
                  You can edit portal branding, update hotline <strong>{portalConfig.hotline}</strong>, adjust delivery fees, add new fashion items, modify ride fares, manage wholesale food products, and dispatch customer orders live.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition"
                >
                  Edit Portal Settings
                </button>
                <button
                  onClick={() => {
                    setIsAddingFashion(true);
                    setActiveTab('fashion');
                  }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs border border-stone-700 transition"
                >
                  + Add New Outfit
                </button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-stone-100 text-base">Recent Platform Orders</h3>
                  <p className="text-xs text-stone-400">Latest transactions across all service categories</p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
                >
                  View All Orders <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-800/50">
                        <td className="py-3 px-4 font-mono font-bold text-amber-400">{ord.orderNumber}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-stone-200">{ord.recipientName}</div>
                          <div className="text-[10px] text-stone-500">{ord.recipientPhone}</div>
                        </td>
                        <td className="py-3 px-4 capitalize">
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-medium">
                            {ord.serviceType}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-stone-100">{formatNaira(ord.totalAmount)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                            ord.status === 'out_for_delivery' ? 'bg-blue-500/20 text-blue-400' :
                            ord.status === 'processing' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-stone-800 text-stone-400'
                          }`}>
                            {ord.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ord.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {ord.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PORTAL SETTINGS & BRANDING TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn">
            <form onSubmit={handleSaveSettings} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Master Portal Settings & Business Info
                  </h3>
                  <p className="text-xs text-stone-400">
                    Changes made here update the storefront headers, hotlines, logos, delivery calculations, and banners immediately.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {hasUnsavedSettings && (
                    <button
                      type="button"
                      onClick={handleResetSettings}
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Revert
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                  >
                    <Save className="w-4 h-4" /> Save & Publish Changes
                  </button>
                </div>
              </div>

              {/* General Branding */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Identity & Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Portal Name / Brand Title</label>
                    <input
                      type="text"
                      value={tempConfig.portalName}
                      onChange={(e) => handleConfigChange('portalName', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Primary State / Location</label>
                    <input
                      type="text"
                      value={tempConfig.primaryLocation}
                      onChange={(e) => handleConfigChange('primaryLocation', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Official Customer Hotline</label>
                    <input
                      type="text"
                      value={tempConfig.hotline}
                      onChange={(e) => handleConfigChange('hotline', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">WhatsApp Support Number</label>
                    <input
                      type="text"
                      value={tempConfig.whatsappNumber}
                      onChange={(e) => handleConfigChange('whatsappNumber', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 font-mono"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-stone-400 font-semibold mb-1">Brand Tagline & Services Summary</label>
                    <input
                      type="text"
                      value={tempConfig.portalTagline}
                      onChange={(e) => handleConfigChange('portalTagline', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Top Announcement Banner
                  </h4>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300">
                    <input
                      type="checkbox"
                      checked={tempConfig.showAnnouncement}
                      onChange={(e) => handleConfigChange('showAnnouncement', e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span>Show Announcement Banner</span>
                  </label>
                </div>
                <div>
                  <textarea
                    rows={2}
                    value={tempConfig.announcementText}
                    onChange={(e) => handleConfigChange('announcementText', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-amber-400 text-xs"
                    placeholder="Enter announcement text to broadcast to all users..."
                  />
                </div>
              </div>

              {/* Delivery & Promo Settings */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Delivery Rates & Discount Codes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Base Delivery Fee (₦)</label>
                    <input
                      type="number"
                      value={tempConfig.baseDeliveryFee}
                      onChange={(e) => handleConfigChange('baseDeliveryFee', Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Free Delivery Threshold (₦)</label>
                    <input
                      type="number"
                      value={tempConfig.freeDeliveryThreshold}
                      onChange={(e) => handleConfigChange('freeDeliveryThreshold', Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Active Promo Code</label>
                    <input
                      type="text"
                      value={tempConfig.promoCode}
                      onChange={(e) => handleConfigChange('promoCode', e.target.value.toUpperCase())}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 font-mono font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Discount Percentage (%)</label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={tempConfig.promoDiscountPercent}
                      onChange={(e) => handleConfigChange('promoDiscountPercent', Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bank Transfer Info */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Official Bank Account Details (for Customer Transfers)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={tempConfig.bankName}
                      onChange={(e) => handleConfigChange('bankName', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Account Number</label>
                    <input
                      type="text"
                      value={tempConfig.bankAccountNumber}
                      onChange={(e) => handleConfigChange('bankAccountNumber', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 font-mono font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 font-semibold mb-1">Account Name</label>
                    <input
                      type="text"
                      value={tempConfig.bankAccountName}
                      onChange={(e) => handleConfigChange('bankAccountName', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 font-semibold"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-stone-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" /> Save Portal Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. MASTER ORDERS MANAGER TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Package className="w-5 h-5" /> Master Orders & Operations
                  </h3>
                  <p className="text-xs text-stone-400">
                    Track, dispatch, update fulfillment statuses, and manage customer payments
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by order # or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Service & Items</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Fulfillment Status</th>
                      <th className="py-3 px-4">Payment Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {orders
                      .filter(o => 
                        searchQuery === '' || 
                        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        o.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-800/40">
                          <td className="py-3 px-4 font-mono font-bold text-amber-400">{ord.orderNumber}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-stone-100">{ord.recipientName}</div>
                            <div className="text-[10px] text-stone-400">{ord.recipientPhone}</div>
                            <div className="text-[10px] text-stone-500 truncate max-w-xs">{ord.deliveryAddress}, {ord.deliveryState}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-bold uppercase text-[10px]">
                              {ord.serviceType}
                            </span>
                            <div className="text-[11px] text-stone-400 mt-1">
                              {ord.items.length} item(s) • {ord.items[0]?.title || 'Custom booking'}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold text-stone-100 font-mono">
                            {formatNaira(ord.totalAmount)}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                              className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                            >
                              <option value="placed">Placed</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ord.paymentStatus}
                              onChange={(e) => handleUpdatePaymentStatus(ord.id, e.target.value as any)}
                              className={`border rounded-lg px-2.5 py-1 text-xs focus:outline-none ${
                                ord.paymentStatus === 'paid'
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                                  : 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
                              }`}
                            >
                              <option value="paid">Paid</option>
                              <option value="pending">Pending</option>
                              <option value="failed">Failed</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                alert(
                                  `Order Reference: ${ord.orderNumber}\nCustomer: ${ord.recipientName} (${ord.recipientPhone})\nAddress: ${ord.deliveryAddress}\nTotal: ₦${ord.totalAmount.toLocaleString()}\nStatus: ${ord.status}\nPayment: ${ord.paymentStatus} (${ord.paymentMethod})`
                                );
                              }}
                              className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[11px] font-semibold transition"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. FASHION COLLECTION CRUD TAB */}
        {activeTab === 'fashion' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" /> Fashion & Bespoke Tailoring Collection ({fashionList.length})
                  </h3>
                  <p className="text-xs text-stone-400">
                    Add new Senator wears, Royal Agbadas, footwear, accessories, edit prices & stock
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingFashion(null);
                    setIsAddingFashion(true);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" /> Add New Fashion Item
                </button>
              </div>

              {/* Add / Edit Form Modal if active */}
              {(isAddingFashion || editingFashion) && (
                <div className="mb-6 p-5 rounded-xl bg-stone-950 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-400">
                      {editingFashion ? `Edit Fashion Item: ${editingFashion.name}` : 'Add New Fashion Outfit'}
                    </h4>
                    <button
                      onClick={() => {
                        setIsAddingFashion(false);
                        setEditingFashion(null);
                      }}
                      className="text-stone-400 hover:text-white"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const name = (form.elements.namedItem('f_name') as HTMLInputElement).value;
                      const category = (form.elements.namedItem('f_cat') as HTMLSelectElement).value as any;
                      const price = Number((form.elements.namedItem('f_price') as HTMLInputElement).value);
                      const originalPrice = Number((form.elements.namedItem('f_orig_price') as HTMLInputElement).value) || undefined;
                      const image = (form.elements.namedItem('f_image') as HTMLInputElement).value;
                      const fabricType = (form.elements.namedItem('f_fabric') as HTMLInputElement).value;
                      const description = (form.elements.namedItem('f_desc') as HTMLTextAreaElement).value;

                      const itemToSave: FashionItem = {
                        id: editingFashion?.id || `f-${Date.now()}`,
                        name,
                        category,
                        price,
                        originalPrice,
                        rating: editingFashion?.rating || 5.0,
                        reviewsCount: editingFashion?.reviewsCount || 1,
                        image: image || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
                        inStock: true,
                        sizes: ['M', 'L', 'XL', 'XXL', 'Custom Fitted'],
                        colors: ['Black & Gold', 'Emerald Green', 'Royal Navy'],
                        fabricType,
                        description,
                        isCustomTailored: true,
                        isBestSeller: true
                      };

                      handleSaveFashion(itemToSave);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs"
                  >
                    <div className="md:col-span-2">
                      <label className="block text-stone-400 mb-1">Outfit Title / Name</label>
                      <input
                        name="f_name"
                        defaultValue={editingFashion?.name || ''}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                        placeholder="e.g. Kogi Royal Damask Agbada 3-Piece"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Category</label>
                      <select
                        name="f_cat"
                        defaultValue={editingFashion?.category || 'Native & Agbada'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      >
                        <option value="Native & Agbada">Native & Agbada</option>
                        <option value="Contemporary">Contemporary</option>
                        <option value="Shoes & Footwear">Shoes & Footwear</option>
                        <option value="Bags & Accessories">Bags & Accessories</option>
                        <option value="Bridal & Asoebi">Bridal & Asoebi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Selling Price (₦)</label>
                      <input
                        name="f_price"
                        type="number"
                        defaultValue={editingFashion?.price || 45000}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Original Price (₦, Optional)</label>
                      <input
                        name="f_orig_price"
                        type="number"
                        defaultValue={editingFashion?.originalPrice || 60000}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Fabric & Material Spec</label>
                      <input
                        name="f_fabric"
                        defaultValue={editingFashion?.fabricType || 'Premium Swiss Damask & Wool'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-stone-400 mb-1">Image URL</label>
                      <input
                        name="f_image"
                        defaultValue={editingFashion?.image || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-stone-400 mb-1">Product Description</label>
                      <textarea
                        name="f_desc"
                        rows={2}
                        defaultValue={editingFashion?.description || 'Bespoke hand-crafted traditional tailoring by Flourish Destiny master artisans.'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>

                    <div className="md:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingFashion(false);
                          setEditingFashion(null);
                        }}
                        className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-stone-950 rounded-lg font-bold hover:bg-amber-400"
                      >
                        Save Fashion Item
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Items List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {fashionList.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-800/40">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-stone-700" />
                          <div>
                            <div className="font-bold text-stone-100">{item.name}</div>
                            <div className="text-[10px] text-stone-400">{item.fabricType}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4 font-bold text-amber-400 font-mono">{formatNaira(item.price)}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleFashionStock(item.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              item.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingFashion(item);
                                setIsAddingFashion(false);
                              }}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200"
                              title="Edit item"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteFashion(item.id)}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 text-rose-400"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. RIDES & TRANSIT FLEET TAB */}
        {activeTab === 'rides' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Car className="w-5 h-5" /> Rides & Transit Fleet Fares ({rideOptions.length} Tiers)
                  </h3>
                  <p className="text-xs text-stone-400">
                    Adjust base fares, per-kilometer rates, passenger capacities, and vehicle descriptions
                  </p>
                </div>
              </div>

              {editingRide && (
                <div className="mb-6 p-5 rounded-xl bg-stone-950 border border-amber-500/40 space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-400">Edit Ride Tier: {editingRide.name}</h4>
                    <button onClick={() => setEditingRide(null)} className="text-stone-400 hover:text-white">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const baseFare = Number((form.elements.namedItem('r_base') as HTMLInputElement).value);
                      const perKmRate = Number((form.elements.namedItem('r_km') as HTMLInputElement).value);
                      const perMinuteRate = Number((form.elements.namedItem('r_min') as HTMLInputElement).value);
                      const capacity = Number((form.elements.namedItem('r_cap') as HTMLInputElement).value);
                      const tagline = (form.elements.namedItem('r_tag') as HTMLInputElement).value;

                      handleSaveRide({
                        ...editingRide,
                        baseFare,
                        perKmRate,
                        perMinuteRate,
                        capacity,
                        tagline
                      });
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
                  >
                    <div>
                      <label className="block text-stone-400 mb-1">Base Fare (₦)</label>
                      <input
                        name="r_base"
                        type="number"
                        defaultValue={editingRide.baseFare}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Rate Per Km (₦)</label>
                      <input
                        name="r_km"
                        type="number"
                        defaultValue={editingRide.perKmRate}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Rate Per Minute (₦)</label>
                      <input
                        name="r_min"
                        type="number"
                        defaultValue={editingRide.perMinuteRate}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Passenger Capacity</label>
                      <input
                        name="r_cap"
                        type="number"
                        defaultValue={editingRide.capacity}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-stone-400 mb-1">Marketing Tagline</label>
                      <input
                        name="r_tag"
                        defaultValue={editingRide.tagline}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>
                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingRide(null)}
                        className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400"
                      >
                        Save Ride Rates
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rideOptions.map((ride) => (
                  <div key={ride.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-100 text-sm">{ride.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">
                        {ride.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">{ride.tagline}</p>
                    <div className="p-2.5 rounded-lg bg-stone-900 space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Base Fare:</span>
                        <span className="text-amber-400 font-bold">{formatNaira(ride.baseFare)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Per Km:</span>
                        <span className="text-stone-200">{formatNaira(ride.perKmRate)}/km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Capacity:</span>
                        <span className="text-stone-200">{ride.capacity} Passengers</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingRide(ride)}
                      className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Fares & Rates
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. GROCERIES CATALOG TAB */}
        {activeTab === 'groceries' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Store className="w-5 h-5" /> Wholesale Groceries & Food Commodities ({groceryList.length})
                  </h3>
                  <p className="text-xs text-stone-400">
                    Manage bags of rice, palm oil kegs, farm eggs, yam tubers, and seasonings
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingGrocery(null);
                    setIsAddingGrocery(true);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add Grocery Product
                </button>
              </div>

              {/* Add/Edit Grocery Modal Form */}
              {(isAddingGrocery || editingGrocery) && (
                <div className="mb-6 p-5 rounded-xl bg-stone-950 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-400">
                      {editingGrocery ? `Edit Grocery Item: ${editingGrocery.name}` : 'Add New Grocery Product'}
                    </h4>
                    <button onClick={() => { setIsAddingGrocery(false); setEditingGrocery(null); }} className="text-stone-400 hover:text-white">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const name = (form.elements.namedItem('g_name') as HTMLInputElement).value;
                      const category = (form.elements.namedItem('g_cat') as HTMLSelectElement).value as any;
                      const price = Number((form.elements.namedItem('g_price') as HTMLInputElement).value);
                      const unit = (form.elements.namedItem('g_unit') as HTMLInputElement).value;
                      const image = (form.elements.namedItem('g_image') as HTMLInputElement).value;
                      const description = (form.elements.namedItem('g_desc') as HTMLTextAreaElement).value;

                      const itemToSave: GroceryItem = {
                        id: editingGrocery?.id || `g-${Date.now()}`,
                        name,
                        category,
                        price,
                        unit,
                        image: image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
                        inStock: true,
                        rating: editingGrocery?.rating || 4.9,
                        description
                      };

                      handleSaveGrocery(itemToSave);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs"
                  >
                    <div className="md:col-span-2">
                      <label className="block text-stone-400 mb-1">Product Name</label>
                      <input
                        name="g_name"
                        defaultValue={editingGrocery?.name || ''}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                        placeholder="e.g. Confluence Royal Palm Oil (5L Keg)"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Category</label>
                      <select
                        name="g_cat"
                        defaultValue={editingGrocery?.category || 'Cooking Oils'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      >
                        <option value="Staples & Grains">Staples & Grains</option>
                        <option value="Fresh Eggs & Dairy">Fresh Eggs & Dairy</option>
                        <option value="Peppers & Veggies">Peppers & Veggies</option>
                        <option value="Cooking Oils">Cooking Oils</option>
                        <option value="Household">Household</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Wholesale Price (₦)</label>
                      <input
                        name="g_price"
                        type="number"
                        defaultValue={editingGrocery?.price || 12000}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Packaging Unit</label>
                      <input
                        name="g_unit"
                        defaultValue={editingGrocery?.unit || '5L Sealed Keg'}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Image URL</label>
                      <input
                        name="g_image"
                        defaultValue={editingGrocery?.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-stone-400 mb-1">Product Description</label>
                      <textarea
                        name="g_desc"
                        rows={2}
                        defaultValue={editingGrocery?.description || 'Fresh agricultural commodity harvested and delivered across Kogi State & Nigeria.'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>
                    <div className="md:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { setIsAddingGrocery(false); setEditingGrocery(null); }}
                        className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400">
                        Save Grocery Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Unit Measure</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {groceryList.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-800/40">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-stone-700" />
                          <div>
                            <div className="font-bold text-stone-100">{item.name}</div>
                            <div className="text-[10px] text-stone-400">{item.category}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{item.unit}</td>
                        <td className="py-3 px-4 font-bold text-amber-400 font-mono">{formatNaira(item.price)}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleGroceryStock(item.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              item.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setEditingGrocery(item); setIsAddingGrocery(false); }}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteGrocery(item.id)}
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. CATERING & EVENTS MANAGEMENT TAB */}
        {activeTab === 'catering' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Utensils className="w-5 h-5" /> Catering Packages & Mega Event Banquets ({cateringPackages.length})
                  </h3>
                  <p className="text-xs text-stone-400">
                    Edit price per plate, sample menus, and event guest limits
                  </p>
                </div>
              </div>

              {editingCatering && (
                <div className="mb-6 p-5 rounded-xl bg-stone-950 border border-amber-500/40 space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-400">Edit Catering Package: {editingCatering.title}</h4>
                    <button onClick={() => setEditingCatering(null)} className="text-stone-400 hover:text-white">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const pricePerPlate = Number((form.elements.namedItem('c_price') as HTMLInputElement).value);
                      const minGuests = Number((form.elements.namedItem('c_min') as HTMLInputElement).value);
                      const maxGuests = Number((form.elements.namedItem('c_max') as HTMLInputElement).value);
                      const subtitle = (form.elements.namedItem('c_sub') as HTMLInputElement).value;

                      handleSaveCatering({
                        ...editingCatering,
                        pricePerPlate,
                        minGuests,
                        maxGuests,
                        subtitle
                      });
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
                  >
                    <div>
                      <label className="block text-stone-400 mb-1">Price Per Plate (₦)</label>
                      <input
                        name="c_price"
                        type="number"
                        defaultValue={editingCatering.pricePerPlate}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Min Guests</label>
                      <input
                        name="c_min"
                        type="number"
                        defaultValue={editingCatering.minGuests}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Max Guests</label>
                      <input
                        name="c_max"
                        type="number"
                        defaultValue={editingCatering.maxGuests}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-stone-400 mb-1">Subtitle / Catering Package Focus</label>
                      <input
                        name="c_sub"
                        defaultValue={editingCatering.subtitle}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>
                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setEditingCatering(null)} className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg">
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400">
                        Save Package Rates
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cateringPackages.map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex gap-4">
                    <img src={pkg.image} alt={pkg.title} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-stone-100 text-sm">{pkg.title}</h4>
                        <span className="text-amber-400 font-bold text-sm font-mono">{formatNaira(pkg.pricePerPlate)}/plt</span>
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-2">{pkg.description}</p>
                      <div className="text-[10px] text-stone-500">
                        Guest Capacity: {pkg.minGuests.toLocaleString()} - {pkg.maxGuests.toLocaleString()} Pax
                      </div>
                      <button
                        onClick={() => setEditingCatering(pkg)}
                        className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Package Pricing
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. BAKERY & CAKES TAB */}
        {activeTab === 'bakery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Cake className="w-5 h-5" /> Bakery, Wedding Cakes & Pastries ({bakeryList.length})
                  </h3>
                  <p className="text-xs text-stone-400">
                    Manage fondant cakes, celebration tiers, Agege bread loaves, and pastries
                  </p>
                </div>

                <button
                  onClick={() => { setEditingBakery(null); setIsAddingBakery(true); }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add Bakery Item
                </button>
              </div>

              {/* Add/Edit Bakery Modal Form */}
              {(isAddingBakery || editingBakery) && (
                <div className="mb-6 p-5 rounded-xl bg-stone-950 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-bold text-amber-400">
                      {editingBakery ? `Edit Bakery Item: ${editingBakery.name}` : 'Add New Cake / Pastry'}
                    </h4>
                    <button onClick={() => { setIsAddingBakery(false); setEditingBakery(null); }} className="text-stone-400 hover:text-white">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const name = (form.elements.namedItem('b_name') as HTMLInputElement).value;
                      const category = (form.elements.namedItem('b_cat') as HTMLSelectElement).value as any;
                      const price = Number((form.elements.namedItem('b_price') as HTMLInputElement).value);
                      const prepTime = (form.elements.namedItem('b_prep') as HTMLInputElement).value;
                      const image = (form.elements.namedItem('b_image') as HTMLInputElement).value;
                      const description = (form.elements.namedItem('b_desc') as HTMLTextAreaElement).value;

                      const itemToSave: BakeryItem = {
                        id: editingBakery?.id || `b-${Date.now()}`,
                        name,
                        category,
                        price,
                        prepTime,
                        image: image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
                        rating: editingBakery?.rating || 4.9,
                        description,
                        isCustomizable: true
                      };

                      handleSaveBakery(itemToSave);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
                  >
                    <div className="sm:col-span-2">
                      <label className="block text-stone-400 mb-1">Cake / Item Name</label>
                      <input
                        name="b_name"
                        defaultValue={editingBakery?.name || ''}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                        placeholder="e.g. 3-Tier Royal Gold Birthday Cake"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Category</label>
                      <select
                        name="b_cat"
                        defaultValue={editingBakery?.category || 'Celebration Cakes'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      >
                        <option value="Celebration Cakes">Celebration Cakes</option>
                        <option value="Cupcakes">Cupcakes</option>
                        <option value="Pastries & Pies">Pastries & Pies</option>
                        <option value="Fresh Loaf Bread">Fresh Loaf Bread</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Price (₦)</label>
                      <input
                        name="b_price"
                        type="number"
                        defaultValue={editingBakery?.price || 35000}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Baking Notice Time</label>
                      <input
                        name="b_prep"
                        defaultValue={editingBakery?.prepTime || '24 hrs Notice'}
                        required
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Image URL</label>
                      <input
                        name="b_image"
                        defaultValue={editingBakery?.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 font-mono"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-stone-400 mb-1">Description</label>
                      <textarea
                        name="b_desc"
                        rows={2}
                        defaultValue={editingBakery?.description || 'Freshly baked with premium butter and top ingredients.'}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-stone-100"
                      />
                    </div>
                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => { setIsAddingBakery(false); setEditingBakery(null); }} className="px-4 py-2 bg-stone-800 text-stone-300 rounded-lg">
                        Cancel
                      </button>
                      <button type="submit" className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400">
                        Save Bakery Item
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bakeryList.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                    <img src={item.image} alt={item.name} className="w-full h-36 rounded-lg object-cover" />
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-stone-100 text-xs">{item.name}</h4>
                      <span className="text-amber-400 font-bold text-xs font-mono">{formatNaira(item.price)}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-stone-800">
                      <span className="text-[10px] text-stone-500">{item.prepTime}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => { setEditingBakery(item); setIsAddingBakery(false); }}
                          className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-400"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBakery(item.id)}
                          className="p-1.5 rounded bg-stone-800 hover:bg-rose-900/40 text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. DRIVERS & VENDORS MANAGEMENT */}
        {activeTab === 'drivers_vendors' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Drivers Section */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" /> Registered Transit Drivers & Fleet
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Driver Name</th>
                      <th className="py-3 px-4">Vehicle & Plate</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Trips / Rating</th>
                      <th className="py-3 px-4">Wallet Earnings</th>
                      <th className="py-3 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {drivers.map((drv) => (
                      <tr key={drv.id} className="hover:bg-stone-800/40">
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-100">{drv.name}</div>
                          <div className="text-[10px] text-stone-400">{drv.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{drv.vehicleType}</div>
                          <div className="font-mono text-[10px] text-amber-400">{drv.plateNumber}</div>
                        </td>
                        <td className="py-3 px-4">{drv.location}</td>
                        <td className="py-3 px-4">
                          <span className="text-amber-400">★ {drv.rating}</span> ({drv.totalTrips} trips)
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-400 font-mono">
                          {formatNaira(drv.walletEarnings)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleDriverStatus(drv.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              drv.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30'
                            }`}
                          >
                            {drv.status === 'active' ? 'Active (Suspend)' : 'Suspended (Activate)'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vendors Section */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <Store className="w-5 h-5" /> Registered Store Vendors & Kitchens
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Business Name</th>
                      <th className="py-3 px-4">Owner & Phone</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Total Sales</th>
                      <th className="py-3 px-4">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {vendors.map((vnd) => (
                      <tr key={vnd.id} className="hover:bg-stone-800/40">
                        <td className="py-3 px-4 font-bold text-stone-100">{vnd.businessName}</td>
                        <td className="py-3 px-4">
                          <div>{vnd.ownerName}</div>
                          <div className="text-[10px] text-stone-400">{vnd.phone}</div>
                        </td>
                        <td className="py-3 px-4">{vnd.category}</td>
                        <td className="py-3 px-4 font-mono">{vnd.totalSalesCount} units sold</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleVendorStatus(vnd.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              vnd.status === 'verified'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}
                          >
                            {vnd.status === 'verified' ? '✓ Verified Partner' : 'Pending Verification'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 10. BACKUP & SYSTEM SYNC TAB */}
        {activeTab === 'backup' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  <Download className="w-5 h-5" /> Portal Database Backup & Restore
                </h3>
                <p className="text-xs text-stone-400">
                  Export all your modified products, orders, ride fares, and portal settings into a single JSON file or restore from a previous backup.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                    <Download className="w-4 h-4 text-amber-400" /> Export Live Portal Data (JSON)
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Downloads a full backup copy of all {fashionList.length} fashion outfits, {groceryList.length} groceries, {orders.length} orders, ride fares, and business contacts.
                  </p>
                  <button
                    onClick={handleExportBackup}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" /> Download Backup JSON
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" /> Restore From Backup (JSON)
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Upload a previously exported backup file to restore all settings and catalog items instantly.
                  </p>
                  <label className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition">
                    <Upload className="w-4 h-4 text-emerald-400" /> Choose Backup File (.json)
                    <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
