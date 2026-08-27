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
  ShieldCheck,
  Zap,
  Monitor,
  Apple,
  FileCode,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AppDownloadHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalName: string;
}

export const AppDownloadHubModal: React.FC<AppDownloadHubModalProps> = ({
  isOpen,
  onClose,
  portalName
}) => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios' | 'windows'>('android');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

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

  const currentUrl = window.location.origin || window.location.href.split('#')[0];
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
        `To install ${portalName} on your device:\n\n` +
        `• On Android: Open in Google Chrome, tap 3 dots (⋮) > "Install app" or "Add to Home screen".\n` +
        `• On iOS: Open in Safari, tap Share (⬆️) > "Add to Home Screen".\n` +
        `• On Windows: Open in Microsoft Edge/Chrome, click the Install App icon in the address bar.`
      );
    }
  };

  // 1. Download Windows Standalone Executable Batch Launcher (.bat)
  const handleDownloadWindowsLauncher = () => {
    const batContent = `@echo off
:: =======================================================
:: FLOURISH DESTINY COLLECTION - WINDOWS DESKTOP APP LAUNCHER
:: =======================================================
title Flourish Destiny Collection Desktop
echo Starting Flourish Destiny Super App...

:: Try launching in Microsoft Edge App Mode (Chromeless Standalone Window)
where msedge >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start msedge.exe --app="${currentUrl}" --window-size=1366,860
    exit
)

:: Fallback to Google Chrome App Mode
where chrome >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start chrome.exe --app="${currentUrl}" --window-size=1366,860
    exit
)

:: Fallback to default browser
start "" "${currentUrl}"
exit
`;

    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FlourishDestiny-Windows-Launcher.bat';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 2. Download iOS Apple MobileConfig WebClip Profile (.mobileconfig)
  const handleDownloadIosConfig = () => {
    const configXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>Icon</key>
            <data></data>
            <key>IsRemovable</key>
            <true/>
            <key>Label</key>
            <string>${portalName}</string>
            <key>PayloadDescription</key>
            <string>Flourish Destiny Super App WebClip</string>
            <key>PayloadDisplayName</key>
            <string>${portalName}</string>
            <key>PayloadIdentifier</key>
            <string>com.flourishdestiny.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>A1B2C3D4-E5F6-7890-ABCD-EF1234567890</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>${currentUrl}</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>${portalName} Mobile WebApp</string>
    <key>PayloadIdentifier</key>
    <string>com.flourishdestiny.profile</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>12345678-ABCD-EF01-2345-6789ABCDEF01</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

    const blob = new Blob([configXml], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FlourishDestiny-iOS.mobileconfig';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 3. Download Android Quick-Package Zip Bundle
  const handleDownloadAndroidManifestBundle = () => {
    const jsonContent = JSON.stringify(
      {
        package_name: 'com.flourishdestiny.app',
        app_name: portalName,
        web_url: currentUrl,
        display: 'standalone',
        theme_color: '#1c1917',
        background_color: '#0c0a09',
        instructions: 'Open this URL in PWABuilder or Capacitor to generate signed APK/AAB.'
      },
      null,
      2
    );

    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FlourishDestiny-Android-Package.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-stone-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-stone-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2">
                Download Apps for Android, iOS & Windows
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                  Multi-Platform
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Install <strong className="text-amber-400 font-semibold">{portalName}</strong> on all your devices
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

        {/* Platform Selector Tabs */}
        <div className="bg-stone-950 px-6 pt-3 border-b border-stone-800 flex space-x-2">
          <button
            onClick={() => setActivePlatform('android')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activePlatform === 'android'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Android (.APK)</span>
          </button>

          <button
            onClick={() => setActivePlatform('ios')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activePlatform === 'ios'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Apple className="w-4 h-4 text-amber-400" />
            <span>iOS (iPhone & iPad)</span>
          </button>

          <button
            onClick={() => setActivePlatform('windows')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activePlatform === 'windows'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Monitor className="w-4 h-4 text-blue-400" />
            <span>Windows Desktop (.exe / .bat)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Quick App Link Box */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left truncate max-w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Live App URL for Devices:
              </span>
              <p className="text-xs font-mono text-amber-300 truncate">
                {currentUrl}
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-xs">Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* 1. ANDROID DOWNLOAD & PACKAGING */}
          {activePlatform === 'android' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Method 1: Instant Chrome Install */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-500/10 to-stone-800/60 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Instant Android Install
                      </span>
                      <span className="text-[10px] bg-emerald-500 text-stone-950 font-black px-1.5 py-0.2 rounded">
                        Fastest
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-100 text-sm">Direct Home Screen App</h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Installs directly into your Android app drawer with the golden FD icon. Zero Play Store download needed.
                    </p>
                  </div>
                  <button
                    onClick={handleInstallPwa}
                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    {isInstalled ? 'App Already Installed' : 'Install on Android Phone'}
                  </button>
                </div>

                {/* Method 2: PWABuilder Cloud APK */}
                <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" /> Standalone .APK Package
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded">
                        Free
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-100 text-sm">Generate Signed .APK</h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Converts this live app into a signed Android APK / AAB package ready to distribute on WhatsApp or Google Play.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={pwaBuilderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      PWABuilder .APK
                    </a>
                    <button
                      onClick={handleDownloadAndroidManifestBundle}
                      className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs flex items-center justify-center border border-stone-700 transition"
                      title="Download Manifest Config JSON"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Native Android Studio Build Instructions */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <h4 className="font-bold text-stone-200 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" /> Native Capacitor & Android Studio Build:
                </h4>
                <div className="p-3 bg-stone-900 rounded-lg font-mono text-[11px] text-amber-300 space-y-1 overflow-x-auto">
                  <p className="text-stone-400"># 1. Initialize Capacitor in exported project ZIP</p>
                  <p>npm install @capacitor/core @capacitor/cli @capacitor/android</p>
                  <p>npx cap init "Flourish Destiny" "com.flourishdestiny.app"</p>
                  <p className="text-stone-400 mt-1"># 2. Add Android platform & build APK</p>
                  <p>npx cap add android && npx cap open android</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. IOS (IPHONE / IPAD) */}
          {activePlatform === 'ios' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Safari Add to Home Screen */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-amber-500/10 to-stone-800/60 border border-amber-500/30 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Apple className="w-3.5 h-3.5" /> iPhone & iPad WebApp
                      </span>
                      <span className="text-[10px] bg-amber-500 text-stone-950 font-black px-1.5 py-0.2 rounded">
                        Native iOS
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-100 text-sm">Add to Home Screen (Safari)</h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Opens full-screen without URL bars, with native iOS app switcher and touch gestures.
                    </p>
                  </div>
                  <ol className="text-[11px] text-stone-300 space-y-1 list-decimal list-inside bg-stone-900/60 p-2.5 rounded-lg">
                    <li>Open this URL in <strong>Safari</strong> on iPhone</li>
                    <li>Tap the <strong>Share</strong> button (box with arrow ⬆️)</li>
                    <li>Tap <strong>"Add to Home Screen"</strong></li>
                  </ol>
                </div>

                {/* iOS Configuration Profile */}
                <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-300 flex items-center gap-1">
                        <FileCode className="w-3.5 h-3.5 text-amber-400" /> Apple WebClip Profile
                      </span>
                      <span className="text-[10px] bg-stone-700 text-stone-300 px-1.5 py-0.2 rounded">
                        .mobileconfig
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-100 text-sm">Download iOS WebClip Profile</h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Downloads an Apple configuration profile that installs the Flourish Destiny icon directly on iPhone/iPad home screens.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadIosConfig}
                    className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-500/40 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" /> Download .mobileconfig Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. WINDOWS DESKTOP (.EXE / .BAT / DESKTOP APP) */}
          {activePlatform === 'windows' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1-Click Windows Launcher (.bat) */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-blue-500/10 to-stone-800/60 border border-blue-500/30 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                        <Monitor className="w-3.5 h-3.5" /> Windows Desktop Executable
                      </span>
                      <span className="text-[10px] bg-blue-500 text-stone-950 font-black px-1.5 py-0.2 rounded">
                        Ready
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-100 text-sm">Download Windows App Launcher</h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Downloads a standalone Windows application launcher that boots Flourish Destiny as a dedicated borderless desktop app.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadWindowsLauncher}
                    className="w-full py-2.5 px-4 bg-blue-500 hover:bg-blue-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition active:scale-95"
                  >
                    <Download className="w-4 h-4" /> Download Windows Launcher (.bat)
                  </button>
                </div>

                {/* Microsoft Edge / Chrome Desktop PWA Install */}
                <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Monitor className="w-3.5 h-3.5" /> Edge / Chrome Desktop App
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded">
                        1-Click
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-100 text-sm">Install as Windows App</h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Creates a desktop shortcut and Taskbar pin with dedicated window frame on Windows 10/11.
                    </p>
                  </div>
                  <button
                    onClick={handleInstallPwa}
                    className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition"
                  >
                    <Download className="w-4 h-4" /> Install to Windows Taskbar
                  </button>
                </div>
              </div>

              {/* Electron / Tauri Packaging Code Snippet */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <h4 className="font-bold text-stone-200 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" /> Package into .EXE with Electron / Tauri:
                </h4>
                <div className="p-3 bg-stone-900 rounded-lg font-mono text-[11px] text-blue-300 space-y-1 overflow-x-auto">
                  <p className="text-stone-400"># To bundle into Windows installer (.exe / .msi):</p>
                  <p>npx nativefier --name "Flourish Destiny" "{currentUrl}" --icon "public/icon-512.svg"</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-800 bg-stone-900/90 flex justify-between items-center text-xs">
          <span className="text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Flourish Destiny Cross-Platform Distribution
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
