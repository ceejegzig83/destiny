export type ServiceTab = 'all' | 'fashion' | 'rides' | 'groceries' | 'catering' | 'bakery' | 'orders' | 'vendor' | 'driver';

export type UserRole = 'customer' | 'vendor' | 'driver';

export interface FashionItem {
  id: string;
  name: string;
  category: 'Native & Agbada' | 'Contemporary' | 'Shoes & Footwear' | 'Bags & Accessories' | 'Bridal & Asoebi';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  inStock: boolean;
  sizes: string[];
  colors: string[];
  fabricType?: string;
  isCustomTailored?: boolean;
  description: string;
  isBestSeller?: boolean;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Staples & Grains' | 'Fresh Eggs & Dairy' | 'Peppers & Veggies' | 'Cooking Oils' | 'Household';
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  inStock: boolean;
  rating: number;
  description: string;
  origin?: string;
  isBulkDeal?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Rice & Specials' | 'Soups & Swallows' | 'Grills & Suya' | 'Small Chops & Bites';
  price: number;
  prepTime: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  isSpicy?: boolean;
  isPopular?: boolean;
}

export interface CateringPackage {
  id: string;
  eventType: 'wedding' | 'political_campaign' | 'corporate_gala' | 'birthday_banquet' | 'burial_memorial';
  title: string;
  subtitle: string;
  minGuests: number;
  maxGuests: number;
  pricePerPlate: number;
  image: string;
  description: string;
  features: string[];
  sampleMenu: string[];
  badge?: string;
}

export interface CateringBooking {
  id: string;
  bookingRef: string;
  eventType: string;
  packageName: string;
  guestCount: number;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  state: string;
  totalQuote: number;
  specialRequests: string;
  selectedAddons: string[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: 'quote_generated' | 'deposit_paid' | 'confirmed' | 'in_preparation' | 'completed';
  createdAt: string;
}

export interface BakeryItem {
  id: string;
  name: string;
  category: 'Celebration Cakes' | 'Cupcakes' | 'Pastries & Pies' | 'Fresh Loaf Bread';
  price: number;
  prepTime: string;
  image: string;
  description: string;
  rating: number;
  isCustomizable?: boolean;
}

export interface CustomCakeRequest {
  id: string;
  flavor: string;
  tiers: number;
  shape: string;
  colorScheme: string;
  customInscription: string;
  eventDate: string;
  budgetEstimated: number;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
  specialNotes?: string;
  customerName: string;
  customerPhone: string;
  status: 'pending_review' | 'confirmed' | 'baking' | 'ready';
  createdAt: string;
}

export interface RideOption {
  id: string;
  type: 'keke' | 'saloon_go' | 'saloon_comfort' | 'vip_suv' | 'interstate_charter';
  name: string;
  tagline: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  capacity: number;
  etaMins: number;
  image: string;
  description: string;
  badge?: string;
  acAvailable: boolean;
}

export interface ActiveRide {
  id: string;
  rideOptionId: string;
  rideOptionName: string;
  rideType: string;
  pickup: string;
  destination: string;
  distanceKm: number;
  durationMins: number;
  estimatedFare: number;
  actualFare: number;
  status: 'searching' | 'driver_assigned' | 'driver_arriving' | 'in_transit' | 'completed' | 'cancelled';
  driverName?: string;
  driverPhone?: string;
  vehicleModel?: string;
  vehiclePlate?: string;
  driverPhoto?: string;
  driverRating?: number;
  otpCode: string;
  createdAt: string;
  paymentMethod: 'wallet' | 'cash' | 'transfer';
}

export interface CartItem {
  id: string;
  serviceType: 'fashion' | 'groceries' | 'food' | 'bakery';
  itemId: string;
  title: string;
  unitPrice: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
  selectedUnit?: string;
  customNote?: string;
  customMeasurements?: {
    chest?: string;
    waist?: string;
    hips?: string;
    length?: string;
    shoulder?: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  serviceType: 'fashion' | 'groceries' | 'food' | 'bakery' | 'catering' | 'ride';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: 'placed' | 'confirmed' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliveryState: string;
  recipientName: string;
  recipientPhone: string;
  paymentMethod: 'wallet' | 'card' | 'bank_transfer' | 'cash_on_delivery';
  paymentStatus: 'paid' | 'pending' | 'failed';
  trackingNumber: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  rideDetails?: ActiveRide;
  cateringDetails?: CateringBooking;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  serviceType: 'fashion' | 'rides' | 'catering' | 'groceries' | 'bakery' | 'system';
  actionUrl?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'successful' | 'pending';
  reference: string;
}
