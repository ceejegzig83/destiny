import {
  FashionItem,
  GroceryItem,
  FoodItem,
  CateringPackage,
  BakeryItem,
  RideOption,
  Order,
  NotificationItem,
  WalletTransaction
} from '../types';

export const POPULAR_LOCATIONS = [
  'Kogi State',
  'Lokoja, Kogi State',
  'Okene, Kogi State',
  'Kabba, Kogi State',
  'Anyigba, Kogi State',
  'Victoria Island, Lagos',
  'Lekki Phase 1, Lagos',
  'Ikeja GRA, Lagos',
  'Wuse II, Abuja',
  'Maitama, Abuja',
  'Port Harcourt GRA, Rivers',
  'Bodija / Ring Road, Ibadan',
  'Independence Layout, Enugu',
  'Asaba Central, Delta',
];

export const FASHION_ITEMS: FashionItem[] = [
  {
    id: 'f-1',
    name: 'Royal Heritage Agbada 3-Piece Set',
    category: 'Native & Agbada',
    price: 85000,
    originalPrice: 110000,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['M', 'L', 'XL', 'XXL', 'Custom Fitted'],
    colors: ['Emerald Green & Gold', 'Midnight Black & Silver', 'Royal Navy', 'Burgundy Wine'],
    fabricType: 'Premium Heavy Swiss Damask with Gold Thread Hand Embroidery',
    isCustomTailored: true,
    isBestSeller: true,
    description: 'Masterpiece 3-piece Agbada set with intricate chest embroidery and matching cap (Fila). Made to command presence at weddings, royal banquets, and high-profile state functions.'
  },
  {
    id: 'f-2',
    name: 'Executive Senator Wear with Brocade Pocket Detail',
    category: 'Native & Agbada',
    price: 48000,
    originalPrice: 60000,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Bespoke Measurement'],
    colors: ['Charcoal Grey', 'Deep Navy Blue', 'Pure White & Gold', 'Forest Green'],
    fabricType: '100% Cashmere Wool Blend',
    isCustomTailored: true,
    isBestSeller: true,
    description: 'Crisp, structured Senator outfit engineered for the discerning modern gentleman. Features hidden button placket, side slit, and tailored slim trousers.'
  },
  {
    id: 'f-3',
    name: 'Luxe Silk Crepe Boubou with Crystal Embellishments',
    category: 'Bridal & Asoebi',
    price: 62000,
    originalPrice: 75000,
    rating: 4.9,
    reviewsCount: 176,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['Free Size (Fits S - 3XL)', 'Custom Length'],
    colors: ['Champagne Gold', 'Sunset Orange', 'Teal Blue', 'Hot Magenta'],
    fabricType: 'Grade A Duchess Satin & Micro Crystal Stones',
    isCustomTailored: true,
    description: 'Effortlessly regal flowy Boubou dress crafted with thousands of hand-pressed rhinestones along the neckline and sleeves. Perfect for Owambe parties.'
  },
  {
    id: 'f-4',
    name: 'Vibrant Ankara Infinity Tiered Maxi Gown',
    category: 'Contemporary',
    price: 34000,
    originalPrice: 42000,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18'],
    colors: ['Sunflower Gold / Indigo', 'Kente Red / Green Pattern'],
    fabricType: 'Authentic 100% Hollandis Cotton Wax',
    description: 'Contemporary Ankara tiered dress with multi-way convertible straps and deep functional side pockets. Versatile for brunch, church, or casual events.'
  },
  {
    id: 'f-5',
    name: 'Handcrafted Italian Leather Half-Loafers (Made in Aba)',
    category: 'Shoes & Footwear',
    price: 38000,
    originalPrice: 48000,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45', 'EU 46'],
    colors: ['Burgundy Wine', 'Tuscan Brown', 'Jet Black'],
    fabricType: 'Genuine Calfskin Leather & Cushioned Orthopedic Insole',
    description: 'Premium slip-on mule half-loafers built for ultimate comfort under Senator and Agbada attire. Hand-stitched with durable rubber outsoles.'
  },
  {
    id: 'f-6',
    name: 'Bridal Coral Beads Royal Choker & Earring Set',
    category: 'Bags & Accessories',
    price: 55000,
    originalPrice: 70000,
    rating: 5.0,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['Standard Royal Length'],
    colors: ['Traditional Edo Coral Red', 'Royal Terracotta Orange'],
    fabricType: 'Authentic Polished African Coral Stones & Gold Plated Clasps',
    description: 'Magnificent authentic Nigerian traditional wedding coral bead jewelry set, suitable for Yoruba, Edo, and Igbo traditional marriages.'
  },
  {
    id: 'f-7',
    name: 'Structured Ankara & Suede Luxury Tote Bag',
    category: 'Bags & Accessories',
    price: 26000,
    originalPrice: 32000,
    rating: 4.7,
    reviewsCount: 43,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['Medium 14-inch', 'Large 16-inch'],
    colors: ['Geometric Gold Wax', 'Royal Purple African Print'],
    fabricType: 'High-Density Ankara Wax & Vegan Suede Trim',
    description: 'Spacious everyday tote with zipper compartment, laptop sleeve, and detachable shoulder strap.'
  },
  {
    id: 'f-8',
    name: 'Handwoven Aso-Oke Autogele & Ipele Set',
    category: 'Bridal & Asoebi',
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    sizes: ['Pre-Tied Adjustable Velcro (All Head Sizes)'],
    colors: ['Rose Gold Metallic', 'Champagne Beige', 'Royal Violet'],
    fabricType: 'Traditional Metallic Handwoven Aso-Oke',
    description: 'Instant effortless beauty in 30 seconds. Pre-tied adjustable Autogele with matching shoulder Ipele adorned with Swarovski-grade stones.'
  }
];

export const GROCERY_ITEMS: GroceryItem[] = [
  {
    id: 'g-1',
    name: 'Royal Stallion Long Grain Rice (50kg Bag)',
    category: 'Staples & Grains',
    price: 78000,
    originalPrice: 85000,
    unit: '50kg Jute Sack',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    origin: 'Premium Clean Stone-Free Polish',
    isBulkDeal: true,
    description: 'Direct mill supply. Guaranteed 100% stone-free, parboiled long grain rice suitable for high-end cooking and bulk catering.'
  },
  {
    id: 'g-2',
    name: 'Mama Gold Premium Jasmine Rice (25kg Bag)',
    category: 'Staples & Grains',
    price: 42000,
    originalPrice: 46000,
    unit: '25kg Bag',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    origin: 'Imported Grade A',
    description: 'Fragrant and fluffy grains that expand perfectly when cooked for party fried rice and jollof.'
  },
  {
    id: 'g-3',
    name: 'Crispy Ijebu White Garri (5kg Paint Bucket)',
    category: 'Staples & Grains',
    price: 6500,
    originalPrice: 7500,
    unit: '1 Custard Paint Bucket',
    image: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    origin: 'Ijebu Ode, Ogun State',
    description: 'Very sour, super crunchy, sand-free Ijebu Garri. Excellent for cold water soaking with groundnuts or hot swallow.'
  },
  {
    id: 'g-4',
    name: 'Fresh Farm Jumbo Brown Eggs (Crate of 30)',
    category: 'Fresh Eggs & Dairy',
    price: 5200,
    originalPrice: 5800,
    unit: 'Crate (30 Eggs)',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    origin: 'Daily Harvested Free-Range Farm',
    isBulkDeal: true,
    description: 'Freshly harvested large table eggs with rich golden yolks. Packed securely in sturdy egg crates.'
  },
  {
    id: 'g-5',
    name: 'Fresh Pepper Combo (Rodo, Tatase, Sombo & Onions)',
    category: 'Peppers & Veggies',
    price: 7500,
    originalPrice: 9000,
    unit: 'Big Market Basket (~6kg)',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.7,
    origin: 'Northern Farm Harvest',
    description: 'Super fresh, spicy scotch bonnets (Ata Rodo), bell peppers (Tatase), chili peppers (Sombo), and sweet purple Kano onions.'
  },
  {
    id: 'g-6',
    name: 'Kings Pure Vegetable Cooking Oil (5 Litres Keg)',
    category: 'Cooking Oils',
    price: 14500,
    originalPrice: 16000,
    unit: '5 Litres Sealed Keg',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    origin: 'NAFDAC Certified Fortified with Vitamin A',
    description: 'Cholesterol-free, crystal clear refined vegetable oil for all your frying and stew preparations.'
  },
  {
    id: 'g-7',
    name: 'Pure Traditional Oloba Red Palm Oil (5 Litres)',
    category: 'Cooking Oils',
    price: 11000,
    originalPrice: 12500,
    unit: '5 Litres Bottle',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    origin: 'Edo State Unadulterated Mill',
    description: 'Thick, sweet, unadulterated traditional palm oil with zero water mix. Brings out the deep aroma in Egusi, Ogbono, and Banga.'
  },
  {
    id: 'g-8',
    name: 'Sweet Abuja Yam Tubers (Pack of 5 Big Tubers)',
    category: 'Staples & Grains',
    price: 18500,
    originalPrice: 22000,
    unit: '5 Large Tubers (~15kg)',
    image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    origin: 'Zaki Biam, Benue State',
    description: 'Poundable, non-watery sweet yam tubers. Perfect for smooth pounded yam, boiled yam with egg sauce, or fried yam chips.'
  }
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'fd-1',
    name: 'Signature Smokey Party Jollof & Asun Goat Meat Combo',
    category: 'Rice & Specials',
    price: 4500,
    prepTime: '20-30 mins',
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isPopular: true,
    description: 'Authentic firewood-infused Nigerian party Jollof rice served with fried sweet plantain (Dodo), spicy chopped goat meat (Asun), and fresh coleslaw.'
  },
  {
    id: 'fd-2',
    name: 'Royal Fishermans Seafood Soup & Pounded Yam',
    category: 'Soups & Swallows',
    price: 7200,
    prepTime: '25-35 mins',
    rating: 5.0,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    description: 'Rich Niger-Delta fisherman broth loaded with jumbo tiger prawns, fresh catfish cutlets, periwinkles, sea crabs, and served with fluffy pounded yam.'
  },
  {
    id: 'fd-3',
    name: 'Special Egusi Soup with Goat Meat, Stockfish & Pando Swallow',
    category: 'Soups & Swallows',
    price: 4800,
    prepTime: '20-30 mins',
    rating: 4.8,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    description: 'Lumpy fried melon seed soup enriched with bitter leaf, uziza, dried stockfish (Panla), soft cow skin (Kpomo), and tender goat meat.'
  },
  {
    id: 'fd-4',
    name: 'Charcoal Suya Mega Platter with Spicy Yaji & Onions',
    category: 'Grills & Suya',
    price: 6000,
    prepTime: '15-20 mins',
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isPopular: true,
    description: 'Thinly sliced tender beef fillet marinated in authentic Kano Yaji spice mix, charcoal smoked to perfection, served with onions, tomatoes, and lime.'
  },
  {
    id: 'fd-5',
    name: 'VIP Small Chops Platter (Spring Rolls, Samosa, Puff-Puff, Gizzard)',
    category: 'Small Chops & Bites',
    price: 3500,
    prepTime: '15 mins',
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    description: 'Fresh hot Nigerian small chops: 4 Crunchy Spring Rolls, 4 Spiced Beef Samosas, 8 Golden Sweet Puff-Puffs, and 4 Peppered Gizzard Skewers.'
  }
];

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'cat-wedding',
    eventType: 'wedding',
    title: 'Royal Destiny Wedding Banquet',
    subtitle: 'Lavish Full-Service Wedding Feast (Buffet & VIP Service)',
    minGuests: 100,
    maxGuests: 3000,
    pricePerPlate: 6500,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for memorable Nigerian wedding celebrations. Includes live buffet stations, VIP table executive service, cocktail bar, and dedicated event banquet manager.',
    features: [
      '3-Course African & Continental Live Buffet',
      'Uniformed Professional Stewards & VIP Servers',
      'Stainless Chafing Dishes, Cutlery & Glassware',
      'Mobile Cold-Room Chilled Drinks & Mixology Bar',
      'Custom Monogrammed Menu Cards & Napkins',
      'Pre-Event Food Tasting Session for Bride & Groom'
    ],
    sampleMenu: [
      'Party Jollof / Fried Basmati Rice / Chinese Stir-fry Rice',
      'Egusi Soup / Seafood Okro / Afang Soup with Pounded Yam / Semovita',
      'Peppered Croaker Fish / Grilled Turkey / Asun Goat Meat / BBQ Chicken',
      'Gourmet Small Chops Starter Platter',
      'Dessert Cups & Fresh Fruit Skewers'
    ]
  },
  {
    id: 'cat-political',
    eventType: 'political_campaign',
    title: 'Mega Campaign & Rally Rally Catering',
    subtitle: 'High-Volume Rapid Packaged Meal Logistics (500 - 15,000 Pax)',
    minGuests: 500,
    maxGuests: 20000,
    pricePerPlate: 3200,
    badge: 'High Capacity',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty campaign catering logistics for political rallies, party conventions, and large civic gatherings. Hot, branded, tamper-proof packed boxes distributed swiftly.',
    features: [
      'Guaranteed Fast Turnaround for up to 20,000+ Guests',
      'Heavy-Duty Branded Foil Takeaway Containers & Cutlery',
      'Dedicated Distribution Logistics Team & Chilled Water Van',
      'High-Calorie Protein & Hot Smokey Jollof Rice',
      'Direct On-Site Mobile Kitchen Trucks'
    ],
    sampleMenu: [
      'Smokey Campaign Party Jollof Rice with Fried Plantain',
      'Quarter Crispy Fried Chicken or Large Peppered Beef',
      'Chilled Malt / Carbonated Drink & 75cl Bottled Water',
      'Snack Pack (Gourmet Meat Pie & Sweet Puff Puff)'
    ]
  },
  {
    id: 'cat-corporate',
    eventType: 'corporate_gala',
    title: 'Executive Corporate Gala & Summit',
    subtitle: 'Sophisticated Multi-Course Plated & Buffet Catering for AGM / Summits',
    minGuests: 50,
    maxGuests: 1500,
    pricePerPlate: 8500,
    badge: 'Executive VIP',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    description: 'Polished dining for Annual General Meetings, corporate galas, foreign delegations, and executive boardroom retreats.',
    features: [
      'Plated Executive Dining or High-End Silver Chafing Buffet',
      'International & Pan-African Gourmet Fusion Menus',
      'Dietary Special Accommodations (Vegan, Halal, Gluten-Free)',
      'Espresso & High-Tea Coffee Station with French Pastries',
      'Soundless, White-Glove Professional Service'
    ],
    sampleMenu: [
      'Starter: Caesar Salad with Grilled Prawns or Pepper Soup Shots',
      'Mains: Herb-Crusted Salmon / Jollof Risotto / Tender Beef Medallions',
      'Sides: Sauteed Seasonal Veggies, Roasted Baby Potatoes',
      'Dessert: Tiramisu, Mango Panna Cotta & Tropical Fruit Tart'
    ]
  },
  {
    id: 'cat-birthday',
    eventType: 'birthday_banquet',
    title: 'Milestone Birthday & Anniversary Soirée',
    subtitle: 'Vibrant Owambe Celebration Feast with Live Grills & Asun Bar',
    minGuests: 50,
    maxGuests: 1000,
    pricePerPlate: 5500,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrate life in grand style with live on-site charcoal grilling, open cocktail bars, and mouthwatering Nigerian traditional dishes.',
    features: [
      'Live Charcoal Suya & BBQ Asun Grilling Station',
      'Hot Small Chops Passing Trays Throughout the Event',
      'Buffet Spread with Traditional Soups & Choice Rices',
      'Cocktail & Mocktail Mixologist Bar',
      'Celebration Cake Cutting Service'
    ],
    sampleMenu: [
      'Live Suya & Peppered Snail Skewers',
      'Special Fried Rice with Jumbo Prawns & Coconut Jollof',
      'Egusi / Edikaikong with Assorted Bushmeat',
      'Dodo, Moi-Moi Elegidi with boiled egg & fish',
      'Assorted Exotic Fruit Parfaits'
    ]
  }
];

export const BAKERY_ITEMS: BakeryItem[] = [
  {
    id: 'b-1',
    name: 'Royal Velvet & Gold Fondant Wedding Cake (3-Tier)',
    category: 'Celebration Cakes',
    price: 145000,
    prepTime: '24-48 hrs Notice',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    description: '3 tiered masterpiece layered with Red Velvet, Rich Chocolate Fudge, and Madagascan Vanilla sponge covered in smooth marble fondant with edible 24k gold leaf trimming.',
    rating: 5.0,
    isCustomizable: true
  },
  {
    id: 'b-2',
    name: '2-Tier Birthday Drip Cake with Custom Acrylic Topper',
    category: 'Celebration Cakes',
    price: 45000,
    prepTime: '24 hrs Notice',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    description: 'Decadent buttercream drip cake topped with French macarons, Ferrero Rocher chocolates, custom gold name acrylic topper, and mini alcohol bottles if desired.',
    rating: 4.9,
    isCustomizable: true
  },
  {
    id: 'b-3',
    name: 'Signature Box of 12 Gourmet Assorted Cupcakes',
    category: 'Cupcakes',
    price: 16500,
    prepTime: 'Same Day (2 hrs)',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80',
    description: 'Fluffy cupcakes in 4 signature flavors: Red Velvet Cream Cheese, Salted Caramel Crunch, Oreo Cookies & Cream, and Strawberry Swirl.',
    rating: 4.9
  },
  {
    id: 'b-4',
    name: 'Traditional Nigerian Spiced Meat Pies (Box of 6)',
    category: 'Pastries & Pies',
    price: 7200,
    prepTime: '30 mins (Fresh Baked)',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
    description: 'Golden, buttery, flaky crust bursting with rich minced beef, diced Irish potatoes, carrots, and warm Nigerian nutmeg spices.',
    rating: 4.9
  },
  {
    id: 'b-5',
    name: 'Jumbo Golden Sausage Rolls (Box of 6)',
    category: 'Pastries & Pies',
    price: 6000,
    prepTime: '30 mins',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'Crispy puff pastry rolled around seasoned beef sausage filling, baked to golden perfection.',
    rating: 4.7
  },
  {
    id: 'b-6',
    name: 'Fresh Fluffy Agege Butter Loaf Bread (Family Size)',
    category: 'Fresh Loaf Bread',
    price: 1800,
    prepTime: 'Baked Daily at 6am',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'Pillowy soft, sweet, stretchy Agege-style butter bread. Pairs miraculously with hot tea, beans, fried eggs, or akara.',
    rating: 4.9
  }
];

export const RIDE_OPTIONS: RideOption[] = [
  {
    id: 'r-keke',
    type: 'keke',
    name: 'Destiny Keke Express',
    tagline: 'Fast, breeze-filled & affordable for daily city traffic',
    baseFare: 800,
    perKmRate: 150,
    perMinuteRate: 30,
    capacity: 3,
    etaMins: 3,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    badge: 'Cheapest & Fastest in Traffic',
    acAvailable: false,
    description: 'The beloved Nigerian Tricycle (Keke Napep). Nimble through narrow lanes and heavy city traffic.'
  },
  {
    id: 'r-saloon-go',
    type: 'saloon_go',
    name: 'Destiny Saloon Go',
    tagline: 'Everyday air-conditioned comfortable saloon car',
    baseFare: 2200,
    perKmRate: 280,
    perMinuteRate: 50,
    capacity: 4,
    etaMins: 5,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular',
    acAvailable: true,
    description: 'Smooth, reliable Corolla/Elantra with chilling air conditioning and verified courteous drivers.'
  },
  {
    id: 'r-saloon-comfort',
    type: 'saloon_comfort',
    name: 'Destiny Executive Comfort',
    tagline: 'Spacious late-model sedan with phone chargers & quiet ride',
    baseFare: 3800,
    perKmRate: 400,
    perMinuteRate: 70,
    capacity: 4,
    etaMins: 7,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    badge: 'Extra Legroom',
    acAvailable: true,
    description: 'Premium Camry/Accord with top-rated 4.9+ star drivers, complimentary bottled water, and quiet cabin.'
  },
  {
    id: 'r-vip-suv',
    type: 'vip_suv',
    name: 'Destiny VIP Prado SUV',
    tagline: 'Luxury high-clearance SUV for executives & events',
    baseFare: 14000,
    perKmRate: 1100,
    perMinuteRate: 180,
    capacity: 6,
    etaMins: 12,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    badge: 'Luxury Executive',
    acAvailable: true,
    description: 'Toyota Prado / Lexus GX with tinted windows, full leather interior, and professional uniformed chauffeur.'
  },
  {
    id: 'r-interstate',
    type: 'interstate_charter',
    name: 'Interstate Private Charter',
    tagline: 'Direct interstate travel (Lagos-Ibadan, Abuja-Kaduna, etc.)',
    baseFare: 55000,
    perKmRate: 350,
    perMinuteRate: 0,
    capacity: 4,
    etaMins: 25,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    badge: 'Interstate Direct',
    acAvailable: true,
    description: 'Dedicated private car service across Nigerian state lines with experienced interstate route drivers.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'DST-94821',
    serviceType: 'fashion',
    items: [
      {
        id: 'cart-1',
        serviceType: 'fashion',
        itemId: 'f-2',
        title: 'Executive Senator Wear with Brocade Pocket Detail',
        unitPrice: 48000,
        quantity: 1,
        selectedSize: 'XL',
        selectedColor: 'Charcoal Grey',
        image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 48000,
    deliveryFee: 2500,
    discount: 0,
    totalAmount: 50500,
    status: 'out_for_delivery',
    deliveryAddress: 'Plot 14 Admiralty Way, Lekki Phase 1',
    deliveryState: 'Lagos',
    recipientName: 'Emeka Okafor',
    recipientPhone: '0803 249 8812',
    paymentMethod: 'wallet',
    paymentStatus: 'paid',
    trackingNumber: 'TRK-LG-8849',
    createdAt: 'Today, 10:15 AM',
    estimatedDeliveryTime: 'Today, 2:30 PM'
  },
  {
    id: 'ord-102',
    orderNumber: 'DST-94820',
    serviceType: 'food',
    items: [
      {
        id: 'cart-2',
        serviceType: 'food',
        itemId: 'fd-1',
        title: 'Signature Smokey Party Jollof & Asun Combo',
        unitPrice: 4500,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'cart-3',
        serviceType: 'food',
        itemId: 'fd-5',
        title: 'VIP Small Chops Platter',
        unitPrice: 3500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 12500,
    deliveryFee: 1500,
    discount: 1000,
    totalAmount: 13000,
    status: 'delivered',
    deliveryAddress: 'Suite 4B, Silverbird Galleria, Victoria Island',
    deliveryState: 'Lagos',
    recipientName: 'Emeka Okafor',
    recipientPhone: '0803 249 8812',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    trackingNumber: 'TRK-LG-7712',
    createdAt: 'Yesterday, 1:20 PM',
    estimatedDeliveryTime: 'Delivered'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🚖 Keke Ride Update',
    message: 'Your Destiny Keke (Plate: KJA-294-QK) is 2 minutes away from Admiralty Way.',
    time: '5 mins ago',
    read: false,
    serviceType: 'rides'
  },
  {
    id: 'notif-2',
    title: '✨ 20% Off Senator Outfits',
    message: 'Flash weekend sale! Use code DESTINYFIRST for 10% off your native tailoring order.',
    time: '2 hours ago',
    read: false,
    serviceType: 'fashion'
  },
  {
    id: 'notif-3',
    title: '🍲 Fresh Pot of Fisherman Soup Ready',
    message: 'Today\'s fresh seafood catch just arrived at the kitchen. Order before 4 PM!',
    time: '4 hours ago',
    read: true,
    serviceType: 'catering'
  }
];

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    type: 'credit',
    amount: 50000,
    description: 'Wallet Top-up via Paystack / Card',
    date: 'Aug 24, 2026',
    status: 'successful',
    reference: 'PAY-892019'
  },
  {
    id: 'tx-2',
    type: 'debit',
    amount: 1450,
    description: 'Destiny Keke Ride to Lekki Tollgate',
    date: 'Aug 25, 2026',
    status: 'successful',
    reference: 'RIDE-11029'
  }
];
