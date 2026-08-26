import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  Wallet,
  Truck,
  CheckCircle,
  Tag
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { formatNaira, triggerConfetti, generateOrderNumber } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  walletBalance: number;
  onOrderPlaced: (order: Order) => void;
  currentLocation: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  walletBalance,
  onOrderPlaced,
  currentLocation,
}) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card' | 'bank_transfer' | 'cash_on_delivery'>('wallet');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<Order | null>(null);

  // Delivery Form State
  const [deliveryForm, setDeliveryForm] = useState({
    recipientName: 'Chief Emeka Okafor',
    recipientPhone: '0803 249 8812',
    deliveryAddress: 'Plot 14 Admiralty Way, Lekki Phase 1',
    deliveryState: 'Lagos State',
    notes: 'Please call before arriving'
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 2500 : 0;
  const totalAmount = Math.max(0, subtotal + deliveryFee - promoDiscount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'DESTINYFIRST') {
      setPromoDiscount(Math.round(subtotal * 0.1));
    } else if (code === 'NAIJA2026') {
      setPromoDiscount(2000);
    } else {
      alert('Invalid promo code. Try DESTINYFIRST or NAIJA2026');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (paymentMethod === 'wallet' && walletBalance < totalAmount) {
      alert('Insufficient Destiny Wallet balance. Please select Card or Bank Transfer, or top up wallet.');
      return;
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber('DST'),
      serviceType: cartItems[0]?.serviceType || 'fashion',
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discount: promoDiscount,
      totalAmount,
      status: 'placed',
      deliveryAddress: deliveryForm.deliveryAddress,
      deliveryState: deliveryForm.deliveryState,
      recipientName: deliveryForm.recipientName,
      recipientPhone: deliveryForm.recipientPhone,
      paymentMethod,
      paymentStatus: 'paid',
      trackingNumber: `TRK-NG-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      estimatedDeliveryTime: 'Today, within 45 mins'
    };

    onOrderPlaced(newOrder);
    setCheckoutSuccess(newOrder);
    onClearCart();
    triggerConfetti();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500 text-stone-950">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base font-display">Your Destiny Cart</h3>
                <p className="text-[11px] text-stone-400">
                  {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content or Checkout Flow */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {checkoutSuccess ? (
              /* Success confirmation */
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-black">
                  ✓
                </div>
                <h4 className="text-xl font-extrabold text-stone-900">
                  Order Successfully Placed!
                </h4>
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Order Number:</span>
                    <span className="font-mono font-bold text-amber-800">
                      {checkoutSuccess.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Total Paid:</span>
                    <span className="font-black text-stone-900">
                      {formatNaira(checkoutSuccess.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Delivery To:</span>
                    <span className="text-stone-900 font-medium">
                      {checkoutSuccess.deliveryAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Method:</span>
                    <span className="text-stone-900 font-bold capitalize">
                      {checkoutSuccess.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600">
                  Your delivery rider has been assigned. You can track this in the <strong>My Orders</strong> tab.
                </p>

                <button
                  onClick={() => {
                    setCheckoutSuccess(null);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <h4 className="text-base font-bold text-stone-900">Your Cart is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse native outfits, 50kg rice bags, party jollof, or celebration cakes to add items.
                </p>
              </div>
            ) : !isCheckingOut ? (
              /* Items List View */
              <div className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div className="flex-1 min-w-0 text-xs space-y-1">
                        <h4 className="font-bold text-stone-900 truncate">{item.title}</h4>
                        <div className="text-[11px] text-stone-500 flex flex-wrap gap-2">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedUnit && <span>Unit: {item.selectedUnit}</span>}
                        </div>
                        <div className="font-black text-amber-800">
                          {formatNaira(item.unitPrice)}
                        </div>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-stone-300 rounded-lg bg-white p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-bold text-xs text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (DESTINYFIRST)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border border-stone-300 rounded-xl px-3 py-1.5 text-xs uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {promoDiscount > 0 && (
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">
                      ✓ Promo discount of {formatNaira(promoDiscount)} applied!
                    </p>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-stone-900">{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Lagos Delivery Logistics:</span>
                    <span className="font-bold text-stone-900">{formatNaira(deliveryFee)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount:</span>
                      <span>-{formatNaira(promoDiscount)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                    <span>Total Amount (Naira):</span>
                    <span className="text-amber-800">{formatNaira(totalAmount)}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Checkout Form View */
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-stone-900 text-sm">Delivery & Recipient Details</h4>
                  <p className="text-[11px] text-stone-500">Provide direct Nigerian contact info</p>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="font-bold text-stone-700 block mb-0.5">Recipient Full Name</label>
                    <input
                      required
                      type="text"
                      value={deliveryForm.recipientName}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientName: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-0.5">Phone Number for Dispatch</label>
                    <input
                      required
                      type="tel"
                      value={deliveryForm.recipientPhone}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientPhone: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-0.5">Delivery Address</label>
                    <input
                      required
                      type="text"
                      value={deliveryForm.deliveryAddress}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryAddress: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-0.5">State</label>
                    <select
                      value={deliveryForm.deliveryState}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryState: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-amber-500"
                    >
                      <option>Lagos State</option>
                      <option>Abuja FCT</option>
                      <option>Rivers State (Port Harcourt)</option>
                      <option>Oyo State (Ibadan)</option>
                      <option>Enugu State</option>
                      <option>Delta State</option>
                    </select>
                  </div>
                </div>

                {/* Payment method picker */}
                <div className="space-y-2 pt-2">
                  <label className="font-extrabold text-stone-900 block">Select Payment Method</label>
                  <div className="space-y-1.5">
                    <label
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        paymentMethod === 'wallet'
                          ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-amber-600" />
                        <div>
                          <span className="font-bold text-stone-900">Destiny Wallet</span>
                          <span className="text-[10px] text-stone-500 block">
                            Balance: {formatNaira(walletBalance)}
                          </span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'wallet'}
                        onChange={() => {}}
                        className="accent-amber-600"
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        paymentMethod === 'card'
                          ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="font-bold text-stone-900">Paystack / Card</span>
                          <span className="text-[10px] text-stone-500 block">
                            Mastercard, Visa, Verve
                          </span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => {}}
                        className="accent-amber-600"
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        paymentMethod === 'bank_transfer'
                          ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="font-bold text-stone-900">Direct Bank Transfer</span>
                          <span className="text-[10px] text-stone-500 block">
                            Virtual Account: Wema Bank / Destiny App
                          </span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => {}}
                        className="accent-amber-600"
                      />
                    </label>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Bottom Action Footer */}
          {!checkoutSuccess && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-stone-500">Amount Due:</span>
                <span className="text-xl font-black text-amber-800">
                  {formatNaira(totalAmount)}
                </span>
              </div>

              {!isCheckingOut ? (
                <button
                  id="proceed-to-checkout-btn"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-2/3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2"
                  >
                    <span>Pay {formatNaira(totalAmount)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
