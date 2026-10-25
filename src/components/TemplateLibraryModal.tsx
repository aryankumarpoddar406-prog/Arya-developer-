import React from 'react';
import { X, Layers, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppProject } from '../types';
import { SAMPLE_TEMPLATES } from '../data/templates';

interface TemplateLibraryModalProps {
  onSelectTemplate: (tpl: AppProject) => void;
  onClose: () => void;
}

export const TemplateLibraryModal: React.FC<TemplateLibraryModalProps> = ({
  onSelectTemplate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">
              Ready-to-Publish App Templates
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Pick any production-verified Android template. Pre-configured with screens, keystore, and Google Play Store metadata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto pr-1">
          {SAMPLE_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg ring-1 ring-white/10"
                    style={{ backgroundColor: tpl.theme.primaryColor }}
                  >
                    {tpl.storeListing.iconEmoji}
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    {tpl.screens.length} Screens
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                    {tpl.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {tpl.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-emerald-400 font-semibold">
                    {tpl.category}
                  </span>
                  <span>Target SDK 35</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectTemplate(tpl);
                  onClose();
                }}
                className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 group-hover:bg-emerald-500 text-slate-200 group-hover:text-slate-950 transition flex items-center justify-center gap-1.5"
              >
                <span>Load Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
