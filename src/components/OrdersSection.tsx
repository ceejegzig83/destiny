import React, { useState } from 'react';
import {
  Package,
  Car,
  Utensils,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  FileText,
  Phone,
  RotateCcw,
  ChevronRight,
  ExternalLink,
  Receipt
} from 'lucide-react';
import { Order, ActiveRide, CateringBooking } from '../types';
import { formatNaira } from '../utils/formatters';

interface OrdersSectionProps {
  orders: Order[];
  cateringBookings: CateringBooking[];
  activeRides: ActiveRide[];
}

export const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  cateringBookings,
  activeRides,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'orders' | 'rides' | 'catering'>('all');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            ✓ Delivered
          </span>
        );
      case 'out_for_delivery':
      case 'in_transit':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold animate-pulse">
            🚚 Out for Delivery
          </span>
        );
      case 'processing':
      case 'quote_generated':
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            ⏳ Processing / Confirmed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold capitalize">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" id="orders-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-display">
            Order Tracking & Trip History
          </h2>
          <p className="text-xs text-stone-500">
            Real-time status updates for all your fashion, rides, catering, and grocery deliveries.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === 'all' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setSelectedTab('orders')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === 'orders' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            📦 Deliveries ({orders.length})
          </button>
          <button
            onClick={() => setSelectedTab('rides')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === 'rides' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🚕 Rides ({activeRides.length})
          </button>
          <button
            onClick={() => setSelectedTab('catering')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedTab === 'catering' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🍽️ Banquets ({cateringBookings.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 && cateringBookings.length === 0 && activeRides.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
            <Package className="w-12 h-12 mx-auto text-stone-300" />
            <h3 className="font-bold text-stone-800 text-sm">No Orders or Rides Yet</h3>
            <p className="text-xs text-stone-500">
              Explore our native fashion collections, order groceries, or book a swift Keke ride!
            </p>
          </div>
        ) : null}

        {/* Regular Store Orders */}
        {(selectedTab === 'all' || selectedTab === 'orders') &&
          orders.map((ord) => (
            <div
              key={ord.id}
              id={`order-card-${ord.id}`}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 hover:border-amber-400 transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-stone-900 text-sm">
                        {ord.orderNumber}
                      </span>
                      {getStatusBadge(ord.status)}
                    </div>
                    <span className="text-[11px] text-stone-400">Placed on {ord.createdAt}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-stone-900">
                    {formatNaira(ord.totalAmount)}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    Paid via {ord.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ord.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="text-xs space-y-0.5 flex-1">
                      <h4 className="font-bold text-stone-900 line-clamp-1">{item.title}</h4>
                      <div className="text-[11px] text-stone-500 flex items-center justify-between">
                        <span>
                          {item.quantity}x {formatNaira(item.unitPrice)}
                        </span>
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Receipt action */}
              <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-stone-600">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Delivering to: <strong>{ord.deliveryAddress}, {ord.deliveryState}</strong></span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReceiptOrder(ord)}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-800 font-semibold text-xs flex items-center gap-1"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </button>
                  <button
                    onClick={() => alert(`Connecting to Destiny Support regarding ${ord.orderNumber}...`)}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs"
                  >
                    Need Help?
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* Catering Banquets List */}
        {(selectedTab === 'all' || selectedTab === 'catering') &&
          cateringBookings.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-100 text-red-700">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-stone-900 text-sm">
                        {cat.packageName}
                      </span>
                      {getStatusBadge(cat.status)}
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">Ref: {cat.bookingRef}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-red-700">
                    {formatNaira(cat.totalQuote)}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    {cat.guestCount.toLocaleString()} Guests
                  </span>
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                <div><strong>Event Date:</strong> {cat.eventDate} ({cat.eventTime})</div>
                <div><strong>Venue:</strong> {cat.eventVenue}, {cat.state}</div>
                {cat.selectedAddons.length > 0 && (
                  <div><strong>Addons:</strong> {cat.selectedAddons.join(', ')}</div>
                )}
              </div>
            </div>
          ))}

        {/* Ride History */}
        {(selectedTab === 'all' || selectedTab === 'rides') &&
          activeRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{ride.rideOptionName}</span>
                      {getStatusBadge(ride.status)}
                    </div>
                    <span className="text-[11px] text-stone-400">{ride.createdAt}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-emerald-600">
                    {formatNaira(ride.actualFare || ride.estimatedFare)}
                  </span>
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                <div><strong>Route:</strong> {ride.pickup} ➔ {ride.destination}</div>
                {ride.driverName && (
                  <div><strong>Driver:</strong> {ride.driverName} ({ride.vehicleModel} - {ride.vehiclePlate})</div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Order Receipt Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center">
                  D
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">DESTINY SUPER APP</h3>
                  <p className="text-[10px] text-stone-500">Official Payment Receipt</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Receipt Ref:</span>
                <span className="font-mono font-bold text-stone-900">{selectedReceiptOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Date:</span>
                <span className="text-stone-900">{selectedReceiptOrder.createdAt}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Customer:</span>
                <span className="text-stone-900 font-medium">{selectedReceiptOrder.recipientName}</span>
              </div>

              {/* Items summary */}
              <div className="py-2 space-y-1.5">
                <div className="font-bold text-stone-800">Purchased Items:</div>
                {selectedReceiptOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-stone-600">
                    <span>{i.quantity}x {i.title}</span>
                    <span className="font-bold">{formatNaira(i.unitPrice * i.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price tally */}
              <div className="pt-2 border-t border-stone-200 space-y-1">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal:</span>
                  <span>{formatNaira(selectedReceiptOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery Fee:</span>
                  <span>{formatNaira(selectedReceiptOrder.deliveryFee)}</span>
                </div>
                {selectedReceiptOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Discount:</span>
                    <span>-{formatNaira(selectedReceiptOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-stone-900 pt-1 border-t border-stone-200">
                  <span>Total Paid (Naira):</span>
                  <span className="text-amber-700">{formatNaira(selectedReceiptOrder.totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Receipt downloaded as PDF');
                setSelectedReceiptOrder(null);
              }}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition"
            >
              Download PDF Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
