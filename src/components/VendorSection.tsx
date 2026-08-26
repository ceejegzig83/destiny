import React, { useState } from 'react';
import {
  Store,
  DollarSign,
  Package,
  TrendingUp,
  Plus,
  CheckCircle,
  Truck,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  X,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { Order, FashionItem } from '../types';
import { formatNaira, triggerConfetti } from '../utils/formatters';

interface VendorSectionProps {
  orders: Order[];
  onAddNewProduct: (item: any) => void;
}

export const VendorSection: React.FC<VendorSectionProps> = ({
  orders,
  onAddNewProduct,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory'>('overview');

  const [newItem, setNewItem] = useState({
    type: 'fashion',
    name: '',
    category: 'Native & Agbada',
    price: 35000,
    unit: '1 Set',
    description: '',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
  });

  const totalSales = orders.reduce((sum, ord) => sum + ord.totalAmount, 3850000);
  const activeOrderCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNewProduct(newItem);
    setIsAddModalOpen(false);
    triggerConfetti();
  };

  return (
    <div className="space-y-6" id="vendor-section">
      {/* Vendor Header */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 sm:p-8 border border-amber-900/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>Merchant Partner Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display mt-1">
            Destiny Merchant & Store Operations
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
            Manage your fashion catalog, kitchen orders, supermarket inventory, and instant Keke dispatch.
          </p>
        </div>

        <button
          id="vendor-add-item-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-amber-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product / Dish</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>Total Gross Sales</span>
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">₦</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900">
            {formatNaira(totalSales)}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% this month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>Active Pending Orders</span>
            <Package className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            {activeOrderCount + 4} Orders
          </div>
          <span className="text-[11px] text-stone-500">Requires packaging & dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>Listed Catalog Items</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-stone-900">
            38 SKUs
          </div>
          <span className="text-[11px] text-stone-500">Fashion, Mart & Kitchen</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>Fulfillment Score</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">
            99.4%
          </div>
          <span className="text-[11px] text-stone-500">Top Rated Merchant Badge</span>
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div className="flex border-b border-stone-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition ${
            activeTab === 'overview'
              ? 'border-b-2 border-amber-600 text-amber-700'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Live Dispatch Queue
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 transition ${
            activeTab === 'inventory'
              ? 'border-b-2 border-amber-600 text-amber-700'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Inventory Stock Manager
        </button>
      </div>

      {/* Dispatch queue table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm">Real-Time Store Orders</h3>
          <span className="text-xs text-stone-500">Auto-refresh active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
              <tr>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total (₦)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50 transition">
                  <td className="p-3 font-mono font-bold text-amber-800">
                    {ord.orderNumber}
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{ord.recipientName}</div>
                    <div className="text-[10px] text-stone-500">{ord.deliveryAddress}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-stone-800 font-medium">
                      {ord.items.map((i) => `${i.quantity}x ${i.title}`).join(', ')}
                    </div>
                  </td>
                  <td className="p-3 font-extrabold text-stone-900">
                    {formatNaira(ord.totalAmount)}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 capitalize">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => alert(`Order ${ord.orderNumber} marked as Packed & Keke Rider Dispatched!`)}
                      className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold"
                    >
                      Dispatch Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-extrabold text-stone-900 text-base">
                Add New Product / Meal to Store
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Department</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-amber-500"
                >
                  <option value="fashion">👗 Fashion & Native Wear</option>
                  <option value="groceries">🛒 Supermarket & Farm Produce</option>
                  <option value="food">🍽️ Kitchen Meal & Small Chops</option>
                  <option value="bakery">🧁 Bakery & Celebration Cakes</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Item Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Gold Embroidered Senator Suit"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Price (₦ Naira)</label>
                  <input
                    required
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Packaging / Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Outfit, 50kg Bag, Plate"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Detailed material, origin, spice level..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-md transition"
              >
                Publish Item to Destiny Store
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
