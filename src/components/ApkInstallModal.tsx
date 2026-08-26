import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Terminal,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface ApkInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkInstallModal: React.FC<ApkInstallModalProps> = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'instant' | 'pwabuilder' | 'capacitor'>('instant');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Capture PWA install prompt event if available in browser
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const pwaBuilderUrl = `https://www.pwabuilder.com?url=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'To install directly on Android:\n1. Open this link in Google Chrome on your Android phone\n2. Tap the 3 dots (⋮) menu at the top right\n3. Tap "Install app" or "Add to Home screen"\n\nIt will install as a native Android app with the Flourish Destiny icon!'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-stone-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-stone-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                Android APK & App Installation
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Android Ready
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Install <strong className="text-amber-400 font-semibold">FLOURISH DESTINY COLLECTION</strong> directly on Android phones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Direct PWA Mobile Install */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-amber-500/10 to-stone-800/60 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Instant Android Install
                  </span>
                  <span className="text-[10px] bg-amber-500 text-stone-950 font-extrabold px-1.5 py-0.2 rounded">
                    Recommended
                  </span>
                </div>
                <h3 className="font-bold text-stone-100 text-sm mb-1">
                  Install Direct to Home Screen
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-4">
                  Runs full-screen with native FD icon, offline caching, instant boot & zero Play Store overhead.
                </p>
              </div>
              <button
                onClick={handleInstallPwa}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                {isInstalled ? 'App Already Installed' : 'Install on Android Phone'}
              </button>
            </div>

            {/* PWABuilder 1-Click APK */}
            <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Standalone .APK File
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold px-1.5 py-0.2 rounded">
                    PWABuilder
                  </span>
                </div>
                <h3 className="font-bold text-stone-100 text-sm mb-1">
                  Download .APK Package
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-4">
                  Converts this live app into a signed Android APK / AAB package ready for sideloading or Google Play.
                </p>
              </div>
              <a
                href={pwaBuilderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition active:scale-95 text-center"
              >
                <ExternalLink className="w-4 h-4" />
                Generate APK on PWABuilder
              </a>
            </div>
          </div>

          {/* App URL Share & QR Helper */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Your Live App URL for Mobile Devices:
              </span>
              <p className="text-xs font-mono text-amber-300 truncate max-w-xs sm:max-w-md">
                {currentUrl}
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Tabs for detailed instructions */}
          <div>
            <div className="flex border-b border-stone-800 mb-4">
              <button
                onClick={() => setActiveGuideTab('instant')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
                  activeGuideTab === 'instant'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Method 1: Direct Android Install (30s)
              </button>
              <button
                onClick={() => setActiveGuideTab('pwabuilder')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
                  activeGuideTab === 'pwabuilder'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Method 2: PWABuilder APK (Free)
              </button>
              <button
                onClick={() => setActiveGuideTab('capacitor')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition ${
                  activeGuideTab === 'capacitor'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Method 3: Native Build (Capacitor)
              </button>
            </div>

            {/* Guide Content */}
            {activeGuideTab === 'instant' && (
              <div className="space-y-3 text-xs text-stone-300 bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                <p className="font-semibold text-amber-400 text-sm">
                  How to install directly onto any Android phone:
                </p>
                <ol className="space-y-2 list-decimal list-inside text-stone-300 leading-relaxed">
                  <li>
                    Open <strong>Google Chrome</strong> or <strong>Brave Browser</strong> on your Android device.
                  </li>
                  <li>
                    Paste and open this app URL (or tap the <strong>Copy Link</strong> button above).
                  </li>
                  <li>
                    Tap the <strong>three dots (⋮)</strong> menu in the upper-right corner of Chrome.
                  </li>
                  <li>
                    Select <span className="px-1.5 py-0.5 bg-stone-800 rounded font-semibold text-amber-300">"Install app"</span> or <span className="px-1.5 py-0.5 bg-stone-800 rounded font-semibold text-amber-300">"Add to Home screen"</span>.
                  </li>
                  <li>
                    Tap <strong>Install</strong>. The app will install with the golden <strong>FD Flourish Destiny</strong> icon on your phone's home screen and app drawer!
                  </li>
                </ol>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 mt-2 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Works completely standalone with full responsiveness, geolocation, local storage & zero storage lag.</span>
                </div>
              </div>
            )}

            {activeGuideTab === 'pwabuilder' && (
              <div className="space-y-3 text-xs text-stone-300 bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                <p className="font-semibold text-emerald-400 text-sm">
                  Generate signed APK / Google Play package in 1 minute:
                </p>
                <ol className="space-y-2 list-decimal list-inside text-stone-300 leading-relaxed">
                  <li>
                    Go to <a href={pwaBuilderUrl} target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">PWABuilder.com</a> (we've configured your <code className="bg-stone-800 px-1 rounded text-amber-300">manifest.json</code> and icons).
                  </li>
                  <li>
                    Click <strong>"Start"</strong> and wait 5 seconds while it audits the PWA score (all Android manifest requirements are met).
                  </li>
                  <li>
                    Under the <strong>Android</strong> section, click <strong>"Package"</strong>.
                  </li>
                  <li>
                    Download the signed <code className="bg-stone-800 px-1 rounded text-amber-300">.apk</code> file for direct installation on Android or <code className="bg-stone-800 px-1 rounded text-amber-300">.aab</code> for Google Play Store upload.
                  </li>
                </ol>
              </div>
            )}

            {activeGuideTab === 'capacitor' && (
              <div className="space-y-3 text-xs text-stone-300 bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                <p className="font-semibold text-amber-400 text-sm">
                  Build custom Android Studio project locally:
                </p>
                <p className="text-stone-400">
                  If you exported the project ZIP from the top menu, you can wrap it into a native Android Studio project with Capacitor:
                </p>
                <div className="bg-stone-900 p-3 rounded-lg font-mono text-[11px] text-amber-300 space-y-1 overflow-x-auto border border-stone-800">
                  <p># 1. Install Capacitor CLI & Android package</p>
                  <p className="text-stone-200">npm install @capacitor/core @capacitor/cli @capacitor/android</p>
                  <p className="mt-2"># 2. Initialize Capacitor & Build web dist</p>
                  <p className="text-stone-200">npx cap init "Flourish Destiny" "com.flourishdestiny.app"</p>
                  <p className="text-stone-200">npm run build</p>
                  <p className="mt-2"># 3. Add Android platform & open Android Studio</p>
                  <p className="text-stone-200">npx cap add android</p>
                  <p className="text-stone-200">npx cap open android</p>
                  <p className="mt-2 text-stone-400"># In Android Studio: Click Build &gt; Build Bundle(s) / APK(s) &gt; Build APK</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-800 bg-stone-900/90 flex justify-between items-center text-xs">
          <span className="text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Flourish Destiny Mobile App v1.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
