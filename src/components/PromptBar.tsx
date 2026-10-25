import React, { useState } from 'react';
import { Sparkles, Wand2, ShieldCheck, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { AppCategory } from '../types';

interface PromptBarProps {
  onGenerate: (prompt: string, category?: string) => Promise<void>;
  isGenerating: boolean;
  lang: Language;
}

const CATEGORIES: AppCategory[] = [
  'Shopping & E-Commerce',
  'Health & Fitness',
  'Finance & Budget',
  'Food & Delivery',
  'Education & Quiz',
  'Productivity & Tools',
  'Social & Chat',
  'Entertainment & Games',
];

const PROMPT_SUGGESTIONS = {
  en: [
    { label: '🥦 10-Min Grocery Delivery', prompt: 'Create a 10-minute grocery delivery app with UPI checkout, fresh vegetables, order tracking, and cart summary' },
    { label: '💪 Gym Workout Streak Tracker', prompt: 'Create an offline gym workout logger with exercise sets, rest timer, 14-day streak tracker, and calorie stats' },
    { label: '💰 UPI Spends & Expense Diary', prompt: 'Create an expense manager app that categorizes daily spends, shows monthly budget alerts, and tracks savings' },
    { label: '🎓 GK & Coding Quiz Battle', prompt: 'Create a multiplayer quiz app for students with daily challenges, leaderboard, badges, and timer questions' },
    { label: '🩺 Doctor Appointment & Clinic', prompt: 'Create a telehealth doctor appointment booking app with specialist search, time slots, and prescription records' },
  ],
  hinglish: [
    { label: '🥦 10-Min Grocery & Sabzi', prompt: 'Ek aisa app banao jo 10 minute me grocery aur taaza sabzi deliver kare with UPI checkout aur live tracking' },
    { label: '💪 Gym & Kasrat Logger', prompt: 'Gym workout aur daily exercise track karne wala app with streak counter, diet notes aur offline support' },
    { label: '💰 Kharcha & Budget Diary', prompt: 'Daily kharcha aur monthly budget manage karne wala app with UPI spends categorization aur alerts' },
    { label: '🎓 Padhaai aur Quiz Game', prompt: 'Students ke liye GK aur coding quiz battle app with live leaderboard, scorecards aur badges' },
    { label: '🩺 Doctor Appointment Book', prompt: 'Doctor clinic appointment book karne wala app with patient history aur live queue status' },
  ],
  hi: [
    { label: '🥦 किराना डिलीवरी ऐप', prompt: '10 मिनट में ताज़ा सब्ज़ी और किराना डिलीवरी ऐप यूपीआई भुगतान और लाइव ट्रैकिंग के साथ' },
    { label: '💪 जिम वर्कआउट ट्रैकर', prompt: 'दैनिक व्यायाम और कैलोरी ट्रैकिंग ऐप ऑफलाइन सपोर्ट और स्ट्रीक रिकॉर्ड के साथ' },
    { label: '💰 दैनिक खर्च डायरी', prompt: 'दैनिक खर्च और बजट प्रबंधन ऐप वित्तीय चार्ट और बचत अलर्ट के साथ' },
    { label: '🎓 सामान्य ज्ञान क्विज़', prompt: 'छात्रों के लिए लाइव क्विज़ गेम ऐप स्कोरकार्ड और लीडरबोर्ड के साथ' },
  ],
};

export const PromptBar: React.FC<PromptBarProps> = ({ onGenerate, isGenerating, lang }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt.trim(), selectedCategory || undefined);
  };

  const handleChipClick = (suggestionPrompt: string) => {
    setPrompt(suggestionPrompt);
    onGenerate(suggestionPrompt, selectedCategory || undefined);
  };

  const currentSuggestions = PROMPT_SUGGESTIONS[lang] || PROMPT_SUGGESTIONS.en;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 p-4 sm:p-6 shadow-inner">
      <div className="max-w-5xl mx-auto space-y-3.5">
        {/* Title & Free Promise */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Wand2 className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {lang === 'hinglish' ? 'Apna App Idea Likhein (AI Khud Banna Dega)' : lang === 'hi' ? 'अपना ऐप विचार लिखें' : 'Describe Any App (AI Builds & Deploys It)'}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.zeroCreditNotice}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.promptPlaceholder}
              disabled={isGenerating}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition shadow-inner disabled:opacity-60"
            />
            {prompt && (
              <button
                type="button"
                onClick={() => setPrompt('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={isGenerating}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="">Auto-Detect Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.generating}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.generateBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3 text-amber-400" />
            {lang === 'hinglish' ? 'Try karein:' : lang === 'hi' ? 'सुझाव:' : 'Quick Ideas:'}
          </span>
          {currentSuggestions.map((sugg, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(sugg.prompt)}
              disabled={isGenerating}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white transition flex items-center gap-1 disabled:opacity-50"
            >
              <span>{sugg.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
