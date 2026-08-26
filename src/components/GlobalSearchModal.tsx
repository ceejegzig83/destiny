import React, { useState } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { FashionItem, GroceryItem, FoodItem, BakeryItem, ServiceTab } from '../types';
import { formatNaira } from '../utils/formatters';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fashionItems: FashionItem[];
  groceryItems: GroceryItem[];
  foodItems: FoodItem[];
  bakeryItems: BakeryItem[];
  onSelectService: (tab: ServiceTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  fashionItems,
  groceryItems,
  foodItems,
  bakeryItems,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedFashion = fashionItems.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );
  const matchedGroceries = groceryItems.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );
  const matchedFood = foodItems.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );
  const matchedBakery = bakeryItems.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults =
    query.trim().length > 0 &&
    (matchedFashion.length > 0 ||
      matchedGroceries.length > 0 ||
      matchedFood.length > 0 ||
      matchedBakery.length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search Senator wear, 50kg rice, jollof, wedding cakes, keke..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {query.trim().length === 0 ? (
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Quick Category Jump:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  onClick={() => {
                    onSelectService('fashion');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 border border-stone-200 text-left transition"
                >
                  👗 Native Agbada & Suits
                </button>
                <button
                  onClick={() => {
                    onSelectService('rides');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-stone-800 border border-stone-200 text-left transition"
                >
                  🚕 Keke & Car Transit
                </button>
                <button
                  onClick={() => {
                    onSelectService('groceries');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-blue-50 text-stone-800 border border-stone-200 text-left transition"
                >
                  🛒 50kg Rice & Farm Market
                </button>
                <button
                  onClick={() => {
                    onSelectService('catering');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-red-50 text-stone-800 border border-stone-200 text-left transition"
                >
                  🍽️ Wedding Banquet Catering
                </button>
                <button
                  onClick={() => {
                    onSelectService('bakery');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-fuchsia-50 text-stone-800 border border-stone-200 text-left transition"
                >
                  🧁 Cakes & Meat Pies
                </button>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-12 text-xs text-stone-500">
              No exact products found for "{query}". Try checking categories above.
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {matchedFashion.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-amber-800 uppercase tracking-wider text-[11px]">
                    Fashion & Native Wear ({matchedFashion.length})
                  </div>
                  {matchedFashion.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        onSelectService('fashion');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl border border-stone-200 hover:bg-amber-50 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={f.image}
                          alt={f.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-stone-900">{f.name}</div>
                          <div className="text-stone-500 text-[10px]">{f.category}</div>
                        </div>
                      </div>
                      <span className="font-bold text-amber-700">{formatNaira(f.price)}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedGroceries.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-blue-800 uppercase tracking-wider text-[11px]">
                    Groceries & Staples ({matchedGroceries.length})
                  </div>
                  {matchedGroceries.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        onSelectService('groceries');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl border border-stone-200 hover:bg-blue-50 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={g.image}
                          alt={g.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-stone-900">{g.name}</div>
                          <div className="text-stone-500 text-[10px]">{g.unit}</div>
                        </div>
                      </div>
                      <span className="font-bold text-blue-700">{formatNaira(g.price)}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedFood.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-red-800 uppercase tracking-wider text-[11px]">
                    Catering & Kitchen ({matchedFood.length})
                  </div>
                  {matchedFood.map((fd) => (
                    <button
                      key={fd.id}
                      onClick={() => {
                        onSelectService('catering');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl border border-stone-200 hover:bg-red-50 flex items-center justify-between text-left transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={fd.image}
                          alt={fd.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="font-bold text-stone-900">{fd.name}</div>
                      </div>
                      <span className="font-bold text-red-700">{formatNaira(fd.price)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
