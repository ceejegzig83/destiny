import React from 'react';
import { Bell, X, Check, Car, ShoppingBag, Utensils, Sparkles } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-start justify-center sm:justify-end p-4 pt-16 sm:pr-8 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm">Notifications & Alerts</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-amber-300 hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`py-3 first:pt-0 last:pb-0 space-y-1 ${
                !notif.read ? 'bg-amber-50/50 -mx-4 px-4 rounded-xl' : ''
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">{notif.title}</span>
                <span className="text-[10px] text-stone-400">{notif.time}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
