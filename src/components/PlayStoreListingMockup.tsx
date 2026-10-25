import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  ThumbsUp
} from 'lucide-react';
import { AppProject } from '../types';

interface PlayStoreListingMockupProps {
  app: AppProject;
  onClose: () => void;
}

export const PlayStoreListingMockup: React.FC<PlayStoreListingMockupProps> = ({ app, onClose }) => {
  const [installStatus, setInstallStatus] = useState<'idle' | 'downloading' | 'installing' | 'installed'>('idle');
  const [installProgress, setInstallProgress] = useState(0);

  const handleInstallClick = () => {
    if (installStatus === 'installed') {
      alert(`Launching "${app.name}" on device emulator!`);
      return;
    }
    setInstallStatus('downloading');
    setInstallProgress(15);
    const interval = setInterval(() => {
      setInstallProgress((p) => {
        if (p >= 95) {
          clearInterval(interval);
          setInstallStatus('installing');
          setTimeout(() => {
            setInstallStatus('installed');
          }, 1200);
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1F1F1F] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/60 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Google Play App Bar */}
        <div className="px-5 py-3.5 bg-[#1F1F1F] border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-white">
                <span className="text-[#01875F] font-black text-base">Google Play</span> Store Preview
              </span>
              <span className="text-[10px] bg-[#01875F]/20 text-[#01875F] font-bold px-2 py-0.5 rounded-full border border-[#01875F]/40">
                Official Listing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              id={app.android.packageName}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Store Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-700">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* App Icon */}
            <div 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-5xl shadow-2xl ring-1 ring-white/10 shrink-0"
              style={{ backgroundColor: app.theme.primaryColor || '#10B981' }}
            >
              {app.storeListing.iconEmoji || '🚀'}
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {app.storeListing.title || app.name}
              </h1>
              <p className="text-[#01875F] font-semibold text-sm hover:underline cursor-pointer">
                PlayForge Studios • Verified Publisher
              </p>
              <p className="text-xs text-slate-400">
                {app.storeListing.containsAds ? 'Contains ads' : 'No ads'} • In-app purchases
              </p>

              {/* Install Button & Action Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleInstallClick}
                  disabled={installStatus === 'downloading' || installStatus === 'installing'}
                  className="px-8 py-2.5 rounded-full font-bold text-sm bg-[#01875F] hover:bg-[#00704e] text-white shadow-lg transition active:scale-95 disabled:opacity-60 flex items-center gap-2"
                >
                  {installStatus === 'idle' && (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Install</span>
                    </>
                  )}
                  {installStatus === 'downloading' && (
                    <span>Downloading ({installProgress}%)...</span>
                  )}
                  {installStatus === 'installing' && (
                    <span>Installing...</span>
                  )}
                  {installStatus === 'installed' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Open App</span>
                    </>
                  )}
                </button>

                <button className="p-2.5 rounded-full hover:bg-slate-800 text-slate-300 border border-slate-700">
                  <Share2 className="w-4 h-4" />
                </button>

                <button className="p-2.5 rounded-full hover:bg-slate-800 text-slate-300 border border-slate-700">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Ribbon (Ratings, Downloads, Age Rating) */}
          <div className="grid grid-cols-3 divide-x divide-slate-800 bg-[#161616] p-3 rounded-2xl border border-slate-800/80 text-center">
            <div className="px-2">
              <div className="flex items-center justify-center gap-1 font-bold text-white text-sm sm:text-base">
                <span>4.9</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">2.4K reviews</span>
            </div>

            <div className="px-2">
              <div className="font-bold text-white text-sm sm:text-base">
                10K+
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">Downloads</span>
            </div>

            <div className="px-2">
              <div className="flex items-center justify-center gap-1 font-bold text-white text-sm sm:text-base">
                <span className="border border-slate-600 px-1 py-0.2 rounded text-[10px]">
                  {app.storeListing.contentRating || 'Everyone'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">Rated for 3+</span>
            </div>
          </div>

          {/* Feature Graphic Banner */}
          <div 
            className="w-full h-44 sm:h-56 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-slate-800"
            style={{ 
              background: `linear-gradient(135deg, ${app.theme.primaryColor || '#10B981'}, #1F1F1F)`
            }}
          >
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                Google Play Verified
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {app.storeListing.featureGraphicText || app.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md mt-1">
                {app.tagline}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs text-white/90 font-medium">
                Version {app.android.versionName} • Updated Today
              </span>
              <div className="text-3xl">
                {app.storeListing.iconEmoji || '🚀'}
              </div>
            </div>
          </div>

          {/* About this app */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">About this app</h3>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
              {app.storeListing.fullDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {app.storeListing.tags.map((tg, idx) => (
                <span key={idx} className="text-xs bg-[#2B2B2B] hover:bg-[#333] text-slate-200 px-3 py-1 rounded-full border border-slate-700">
                  #{tg}
                </span>
              ))}
            </div>
          </div>

          {/* Data Safety Section */}
          <div className="p-4 rounded-2xl bg-[#161616] border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#01875F]" />
              Data safety
            </h3>
            <p className="text-xs text-slate-400">
              Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age.
            </p>
            <div className="space-y-2 text-xs text-slate-300 divide-y divide-slate-800">
              <div className="pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#01875F]" />
                <span>No data shared with third parties</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#01875F]" />
                <span>Data is encrypted in transit via TLS 1.3</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#01875F]" />
                <span>You can request that your account and data be deleted</span>
              </div>
            </div>
          </div>

          {/* Ratings & Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Ratings and reviews</h3>
            <div className="space-y-3">
              {[
                { name: 'Rohit Sharma', date: 'October 24, 2026', comment: 'Super fast and lightweight! The UPI checkout and instant delivery tracking works like a charm. 5 stars!', stars: 5 },
                { name: 'Priya Patel', date: 'October 22, 2026', comment: 'Very clean UI without annoying ads or spam. Exactly what I needed for my daily routine.', stars: 5 },
              ].map((rev, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#161616] border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{rev.name}</span>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.stars }).map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful (18)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
