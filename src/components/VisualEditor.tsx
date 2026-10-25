import React, { useState } from 'react';
import { 
  Palette, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  LayoutGrid, 
  List, 
  TrendingUp, 
  Search, 
  ShoppingCart,
  Check,
  Smartphone
} from 'lucide-react';
import { AppProject, AppScreen, UIComponent } from '../types';

interface VisualEditorProps {
  app: AppProject;
  onUpdateApp: (app: AppProject) => void;
  activeScreenId: string;
  setActiveScreenId: (id: string) => void;
}

const COLOR_PRESETS = [
  { name: 'Emerald Mint', primary: '#10B981', accent: '#34D399' },
  { name: 'Indigo Pulse', primary: '#6366F1', accent: '#06B6D4' },
  { name: 'Crimson Fire', primary: '#EF4444', accent: '#F59E0B' },
  { name: 'Amber Sunset', primary: '#F59E0B', accent: '#F97316' },
  { name: 'Electric Violet', primary: '#8B5CF6', accent: '#EC4899' },
  { name: 'Ocean Cyan', primary: '#06B6D4', accent: '#3B82F6' },
];

export const VisualEditor: React.FC<VisualEditorProps> = ({
  app,
  onUpdateApp,
  activeScreenId,
  setActiveScreenId,
}) => {
  const [editorTab, setEditorTab] = useState<'screens' | 'components' | 'theme'>('components');
  const [newScreenName, setNewScreenName] = useState('');
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null);

  const activeScreen = app.screens.find((s) => s.id === activeScreenId) || app.screens[0];

  // Add Screen
  const handleAddScreen = () => {
    if (!newScreenName.trim()) return;
    const cleanId = 'screen_' + Date.now();
    const newScreen: AppScreen = {
      id: cleanId,
      name: newScreenName.trim(),
      title: `${newScreenName.trim()} Hub`,
      icon: 'compass',
      route: `/${newScreenName.toLowerCase().replace(/\s+/g, '-')}`,
      components: [
        {
          id: 'c_' + Date.now(),
          type: 'hero-banner',
          title: `Welcome to ${newScreenName}`,
          subtitle: 'Custom section created with visual editor',
          badge: 'NEW',
          actionText: 'Explore',
        },
      ],
    };

    onUpdateApp({
      ...app,
      screens: [...app.screens, newScreen],
    });
    setNewScreenName('');
    setActiveScreenId(cleanId);
  };

  // Delete Screen
  const handleDeleteScreen = (screenId: string) => {
    if (app.screens.length <= 1) return;
    const remaining = app.screens.filter((s) => s.id !== screenId);
    onUpdateApp({
      ...app,
      screens: remaining,
    });
    if (activeScreenId === screenId) {
      setActiveScreenId(remaining[0].id);
    }
  };

  // Add Component to current screen
  const handleAddComponent = (type: UIComponent['type']) => {
    const compId = 'comp_' + Date.now();
    let newComp: UIComponent = {
      id: compId,
      type,
      title: 'New Section',
      subtitle: 'Customize this block',
    };

    if (type === 'hero-banner') {
      newComp = {
        id: compId,
        type: 'hero-banner',
        title: 'Special Promo Announcement',
        subtitle: 'Tap to unlock exclusive member privileges today',
        badge: 'LIMITED TIME',
        actionText: 'Claim Offer',
      };
    } else if (type === 'card-grid') {
      newComp = {
        id: compId,
        type: 'card-grid',
        title: 'Featured Collection',
        items: [
          { id: 'it_1', title: 'Top Ranked Item', subtitle: 'Bestseller rating', price: '₹249', rating: 4.9, tag: 'Hot' },
          { id: 'it_2', title: 'Super Combo Pack', subtitle: 'Fast delivery', price: '₹499', rating: 5.0, tag: 'Popular' },
        ],
      };
    } else if (type === 'metric-stats') {
      newComp = {
        id: compId,
        type: 'metric-stats',
        title: 'Performance Tracker',
        items: [
          { id: 'm1', title: 'Speed', subtitle: '99.8%', tag: 'Fast' },
          { id: 'm2', title: 'Completed', subtitle: '24 Tasks', tag: '+5' },
          { id: 'm3', title: 'Score', subtitle: 'A+', tag: 'Tier 1' },
        ],
      };
    } else if (type === 'search-bar') {
      newComp = {
        id: compId,
        type: 'search-bar',
        title: 'Search by keyword or tags...',
      };
    } else if (type === 'item-list') {
      newComp = {
        id: compId,
        type: 'item-list',
        title: 'Quick Activity Stream',
        items: [
          { id: 'l1', title: 'Instant Cloud Sync', subtitle: 'Completed 5m ago', tag: 'Synced' },
          { id: 'l2', title: 'Security Encryption Check', subtitle: 'TLS 1.3 Active', tag: 'Protected' },
        ],
      };
    }

    const updatedScreens = app.screens.map((sc) => {
      if (sc.id === activeScreen.id) {
        return {
          ...sc,
          components: [...sc.components, newComp],
        };
      }
      return sc;
    });

    onUpdateApp({
      ...app,
      screens: updatedScreens,
    });
  };

  // Remove Component
  const handleDeleteComponent = (compId: string) => {
    const updatedScreens = app.screens.map((sc) => {
      if (sc.id === activeScreen.id) {
        return {
          ...sc,
          components: sc.components.filter((c) => c.id !== compId),
        };
      }
      return sc;
    });
    onUpdateApp({ ...app, screens: updatedScreens });
  };

  // Update Component properties
  const handleUpdateComponent = (compId: string, field: string, val: string) => {
    const updatedScreens = app.screens.map((sc) => {
      if (sc.id === activeScreen.id) {
        return {
          ...sc,
          components: sc.components.map((c) => {
            if (c.id === compId) {
              return { ...c, [field]: val };
            }
            return c;
          }),
        };
      }
      return sc;
    });
    onUpdateApp({ ...app, screens: updatedScreens });
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setEditorTab('components')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            editorTab === 'components'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Screen Components ({activeScreen.name})</span>
        </button>

        <button
          onClick={() => setEditorTab('screens')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            editorTab === 'screens'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>App Screens ({app.screens.length})</span>
        </button>

        <button
          onClick={() => setEditorTab('theme')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            editorTab === 'theme'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Theme & Colors</span>
        </button>
      </div>

      {/* TAB: COMPONENTS */}
      {editorTab === 'components' && (
        <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          {/* Active Screen Switcher Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Editing Screen:</span>
              <div className="flex items-center gap-1.5">
                {app.screens.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScreenId(sc.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      sc.id === activeScreen.id
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Add Component Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-400 mr-1">+ Add:</span>
              <button
                onClick={() => handleAddComponent('hero-banner')}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Hero Banner
              </button>
              <button
                onClick={() => handleAddComponent('card-grid')}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Product Grid
              </button>
              <button
                onClick={() => handleAddComponent('metric-stats')}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Stats Bar
              </button>
              <button
                onClick={() => handleAddComponent('item-list')}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                List View
              </button>
            </div>
          </div>

          {/* List of components in this screen */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">
              Current Components on "{activeScreen.name}"
            </h4>

            {activeScreen.components.map((comp, idx) => (
              <div
                key={comp.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      {comp.type}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {comp.title || 'Untitled Block'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        setEditingComponentId(editingComponentId === comp.id ? null : comp.id)
                      }
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Edit component"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteComponent(comp.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400"
                      title="Delete component"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inline Property Editor if selected */}
                {editingComponentId === comp.id && (
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fadeIn">
                    <div>
                      <span className="text-slate-400 block mb-1">Title Text</span>
                      <input
                        type="text"
                        value={comp.title || ''}
                        onChange={(e) => handleUpdateComponent(comp.id, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1">Subtitle / Details</span>
                      <input
                        type="text"
                        value={comp.subtitle || ''}
                        onChange={(e) => handleUpdateComponent(comp.id, 'subtitle', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>

                    {comp.type === 'hero-banner' && (
                      <>
                        <div>
                          <span className="text-slate-400 block mb-1">Badge Tag</span>
                          <input
                            type="text"
                            value={comp.badge || ''}
                            onChange={(e) => handleUpdateComponent(comp.id, 'badge', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-1">Button CTA Label</span>
                          <input
                            type="text"
                            value={comp.actionText || ''}
                            onChange={(e) => handleUpdateComponent(comp.id, 'actionText', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SCREENS */}
      {editorTab === 'screens' && (
        <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Manage App Screens</h3>
            <span className="text-xs text-slate-400">Total: {app.screens.length} screens</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {app.screens.map((sc, index) => (
              <div
                key={sc.id}
                className={`p-4 rounded-xl border transition ${
                  sc.id === activeScreen.id
                    ? 'border-emerald-500 bg-emerald-500/5'
                    : 'border-slate-800 bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {index + 1}. {sc.name}
                    </span>
                    {sc.id === activeScreen.id && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.2 rounded">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveScreenId(sc.id)}
                      className="px-2 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      Open
                    </button>
                    {app.screens.length > 1 && (
                      <button
                        onClick={() => handleDeleteScreen(sc.id)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Route: <code className="text-emerald-400">{sc.route}</code> • {sc.components.length} components
                </p>
              </div>
            ))}
          </div>

          {/* Add New Screen Form */}
          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={newScreenName}
              onChange={(e) => setNewScreenName(e.target.value)}
              placeholder="New Screen Name (e.g. Wishlist, Analytics, Rewards)..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <button
              onClick={handleAddScreen}
              disabled={!newScreenName.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition disabled:opacity-50 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Screen</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB: THEME */}
      {editorTab === 'theme' && (
        <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white">App Color Palette & Brand</h3>
            <p className="text-xs text-slate-400">
              Changes update immediately in both the live mobile emulator and the Play Store graphics banner.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">Preset Color Themes:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COLOR_PRESETS.map((p) => {
                const isSelected = app.theme.primaryColor === p.primary;
                return (
                  <button
                    key={p.name}
                    onClick={() =>
                      onUpdateApp({
                        ...app,
                        theme: {
                          ...app.theme,
                          primaryColor: p.primary,
                          accentColor: p.accent,
                        },
                      })
                    }
                    className={`p-3 rounded-xl border flex items-center justify-between transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full ring-2 ring-white/20"
                        style={{ backgroundColor: p.primary }}
                      />
                      <span className="text-xs font-bold text-white">{p.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 block mb-1.5">Custom Primary Hex Code</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={app.theme.primaryColor}
                  onChange={(e) =>
                    onUpdateApp({
                      ...app,
                      theme: { ...app.theme, primaryColor: e.target.value },
                    })
                  }
                  className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={app.theme.primaryColor}
                  onChange={(e) =>
                    onUpdateApp({
                      ...app,
                      theme: { ...app.theme, primaryColor: e.target.value },
                    })
                  }
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1.5">Corner Radius</span>
              <div className="flex gap-2">
                {(['rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() =>
                      onUpdateApp({
                        ...app,
                        theme: { ...app.theme, borderRadius: r },
                      })
                    }
                    className={`px-3 py-1.5 text-xs rounded-lg border font-mono transition ${
                      app.theme.borderRadius === r
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {r.replace('rounded-', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
