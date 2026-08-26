import React, { useState } from 'react';
import { Wallet, X, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard, Building2 } from 'lucide-react';
import { WalletTransaction } from '../types';
import { formatNaira, triggerConfetti } from '../utils/formatters';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  transactions: WalletTransaction[];
  onTopUp: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance,
  transactions,
  onTopUp,
}) => {
  const [customAmount, setCustomAmount] = useState<number>(10000);
  const [topUpSuccess, setTopUpSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickAmounts = [5000, 10000, 25000, 50000];

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmount > 0) {
      onTopUp(customAmount);
      setTopUpSuccess(true);
      triggerConfetti();
      setTimeout(() => setTopUpSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-stone-950">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-display">Destiny Cash Wallet</h3>
              <p className="text-[11px] text-amber-300 font-semibold">1-Click Naira Payments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Balance card */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-stone-950 shadow-lg space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
              Available Balance
            </span>
            <div className="text-3xl font-black">{formatNaira(balance)}</div>
            <div className="text-[11px] font-semibold text-amber-950/80 flex items-center justify-between pt-1">
              <span>Account: DST-8492-9102</span>
              <span>Lagos / Nigeria</span>
            </div>
          </div>

          {/* Top up form */}
          <form onSubmit={handleTopUpSubmit} className="space-y-3">
            <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Add Money to Wallet (₦)
            </div>

            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setCustomAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    customAmount === amt
                      ? 'bg-stone-900 text-white border-stone-900 shadow'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  +{formatNaira(amt)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                min="500"
                step="500"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="flex-1 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-md transition"
              >
                Top-Up Now
              </button>
            </div>

            {topUpSuccess && (
              <p className="text-[11px] text-emerald-600 font-bold text-center">
                ✓ Wallet successfully credited with {formatNaira(customAmount)}!
              </p>
            )}
          </form>

          {/* Transactions List */}
          <div className="space-y-2.5 pt-2">
            <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              Recent Transactions
            </div>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-lg ${
                        tx.type === 'credit'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900">{tx.description}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{tx.date} • {tx.reference}</div>
                    </div>
                  </div>

                  <span
                    className={`font-black ${
                      tx.type === 'credit' ? 'text-emerald-700' : 'text-stone-900'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}
                    {formatNaira(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
