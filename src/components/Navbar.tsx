import React from 'react';
import { Sparkles, Layers, Download, Plus, Globe, CheckCircle2, Bot } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { AppProject } from '../types';

interface NavbarProps {
  currentApp: AppProject;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onNewApp: () => void;
  onDeployToPlayStore: () => void;
  isDeploying: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentApp,
  lang,
  setLang,
  onOpenTemplates,
  onOpenExport,
  onNewApp,
  onDeployToPlayStore,
  isDeploying,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/20 text-white font-bold">
            <Bot className="w-5 h-5 text-white" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
                PlayForge <span className="text-emerald-400 font-bold">AI</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                {t.freeTag}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-xs rounded-md font-medium transition ${
                lang === 'en'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('hinglish')}
              className={`px-2 py-1 text-xs rounded-md font-medium transition ${
                lang === 'hinglish'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hinglish
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-1 text-xs rounded-md font-medium transition ${
                lang === 'hi'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Templates Gallery Button */}
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{t.templates}</span>
          </button>

          {/* New App Button */}
          <button
            onClick={onNewApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">New App</span>
          </button>

          {/* Export Bundle Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export APK/AAB</span>
          </button>

          {/* 1-Click Google Play Direct Publish Button */}
          <button
            onClick={onDeployToPlayStore}
            disabled={isDeploying}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50"
          >
            {isDeploying ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{t.deploying}</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 text-slate-950" />
                <span>{t.deployNow}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
