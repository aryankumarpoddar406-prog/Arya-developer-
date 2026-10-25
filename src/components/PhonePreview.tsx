import React, { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Search, 
  Bell, 
  ArrowLeft, 
  Star, 
  Plus, 
  Check, 
  Home, 
  Compass, 
  User, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Heart,
  ChevronRight,
  TrendingUp,
  Package
} from 'lucide-react';
import { AppProject, UIComponent } from '../types';

interface PhonePreviewProps {
  app: AppProject;
  activeScreenId: string;
  setActiveScreenId: (id: string) => void;
  onComponentClick?: (component: UIComponent) => void;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  app,
  activeScreenId,
  setActiveScreenId,
  onComponentClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inAppToast, setInAppToast] = useState<string | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(2);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [currentTime] = useState('09:41');

  const currentScreen = app.screens.find((s) => s.id === activeScreenId) || app.screens[0];

  const triggerToast = (msg: string) => {
    setInAppToast(msg);
    setTimeout(() => {
      setInAppToast(null);
    }, 2500);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      triggerToast(next[id] ? 'Added to Wishlist ❤️' : 'Removed from Wishlist');
      return next;
    });
  };

  const handleAddToCart = (itemTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartItemsCount((prev) => prev + 1);
    triggerToast(`Added "${itemTitle}" to Cart 🛒`);
  };

  const getScreenIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `w-5 h-5 transition-transform ${isSelected ? 'scale-110 text-white' : 'text-slate-400'}`;
    switch (iconName.toLowerCase()) {
      case 'home':
        return <Home className={iconClass} />;
      case 'compass':
      case 'explore':
        return <Compass className={iconClass} />;
      case 'shopping-cart':
      case 'cart':
        return <ShoppingCart className={iconClass} />;
      case 'user':
      case 'profile':
        return <User className={iconClass} />;
      case 'package':
      case 'orders':
        return <Package className={iconClass} />;
      default:
        return <Home className={iconClass} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      {/* Device Frame */}
      <div className="relative w-[340px] sm:w-[380px] h-[720px] sm:h-[760px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800 border-[6px] border-slate-900 overflow-hidden flex flex-col transition-all">
        {/* Android Punch Hole Camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full ring-2 ring-slate-800 z-50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
        </div>

        {/* Screen Content Wrapper */}
        <div 
          className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col text-slate-100 transition-colors"
          style={{ backgroundColor: app.theme.backgroundColor || '#0B0F19' }}
        >
          {/* Android Status Bar */}
          <div className="w-full pt-3 px-6 pb-2 flex items-center justify-between text-xs text-slate-300 font-medium z-40 bg-inherit">
            <span>{currentTime}</span>
            <div className="flex items-center gap-2">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">98%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* In-App Floating Toast Notification */}
          {inAppToast && (
            <div className="absolute top-12 left-4 right-4 z-50 bg-slate-900/95 text-white border border-emerald-500/50 shadow-xl px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-between animate-bounce">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                {inAppToast}
              </span>
            </div>
          )}

          {/* Top App Bar */}
          <div 
            className="px-4 py-3 border-b flex items-center justify-between z-30"
            style={{ 
              borderColor: 'rgba(255,255,255,0.08)',
              backgroundColor: app.theme.cardColor || '#161F30'
            }}
          >
            <div className="flex items-center gap-2.5">
              {currentScreen.id !== app.screens[0].id ? (
                <button 
                  onClick={() => setActiveScreenId(app.screens[0].id)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
                  style={{ backgroundColor: app.theme.primaryColor || '#10B981' }}
                >
                  {app.storeListing.iconEmoji || '🚀'}
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white leading-tight">
                  {currentScreen.title || app.name}
                </h3>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {app.tagline}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => triggerToast('No new notifications')}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              </button>
              <button 
                onClick={() => {
                  const cartScreen = app.screens.find(s => s.id.includes('cart'));
                  if (cartScreen) setActiveScreenId(cartScreen.id);
                  else triggerToast(`Cart items: ${cartItemsCount}`);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 relative"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: app.theme.primaryColor || '#10B981' }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Scrollable Screen Body */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
            {currentScreen.components.map((comp) => {
              return (
                <div 
                  key={comp.id}
                  onClick={() => onComponentClick && onComponentClick(comp)}
                  className="group relative transition"
                >
                  {/* Hero Banner Component */}
                  {comp.type === 'hero-banner' && (
                    <div 
                      className={`p-4 rounded-2xl relative overflow-hidden shadow-lg transition-transform active:scale-[0.99]`}
                      style={{ 
                        background: `linear-gradient(135deg, ${app.theme.primaryColor || '#10B981'}, #0F766E)`
                      }}
                    >
                      <div className="relative z-10 space-y-1.5">
                        {comp.badge && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
                            {comp.badge}
                          </span>
                        )}
                        <h4 className="text-base font-extrabold text-white leading-snug">
                          {comp.title}
                        </h4>
                        <p className="text-xs text-white/90 line-clamp-2">
                          {comp.subtitle}
                        </p>
                        {comp.actionText && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (comp.actionTargetScreen) {
                                setActiveScreenId(comp.actionTargetScreen);
                              } else {
                                triggerToast(`Action: ${comp.actionText}`);
                              }
                            }}
                            className="mt-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-900 shadow hover:bg-slate-100 transition active:scale-95"
                          >
                            {comp.actionText}
                          </button>
                        )}
                      </div>
                      {/* Ambient graphic */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    </div>
                  )}

                  {/* Search Bar Component */}
                  {comp.type === 'search-bar' && (
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={comp.title || 'Search items, products, services...'}
                        className="w-full bg-slate-900/90 border border-slate-700/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
                      />
                    </div>
                  )}

                  {/* Metric Stats Component */}
                  {comp.type === 'metric-stats' && (
                    <div className="space-y-1.5">
                      {comp.title && (
                        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                          <span>{comp.title}</span>
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-2">
                        {comp.items?.map((st) => (
                          <div 
                            key={st.id}
                            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-center space-y-0.5"
                          >
                            <span className="text-[10px] text-slate-400 block truncate">
                              {st.title}
                            </span>
                            <span className="text-xs font-extrabold text-white block">
                              {st.subtitle}
                            </span>
                            {st.tag && (
                              <span className="text-[9px] font-semibold text-emerald-400 block">
                                {st.tag}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card Grid Component */}
                  {comp.type === 'card-grid' && (
                    <div className="space-y-2">
                      {comp.title && (
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white tracking-wide">
                            {comp.title}
                          </h4>
                          <span className="text-[10px] text-emerald-400 font-semibold cursor-pointer">
                            View All
                          </span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2.5">
                        {comp.items
                          ?.filter((it) => !searchQuery || it.title.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item) => (
                            <div 
                              key={item.id}
                              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 flex flex-col justify-between hover:border-slate-700 transition group relative"
                            >
                              <div className="space-y-1">
                                <div className="flex items-start justify-between">
                                  {item.tag ? (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                      {item.tag}
                                    </span>
                                  ) : <span />}
                                  <button 
                                    onClick={(e) => toggleLike(item.id, e)}
                                    className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-red-400 transition"
                                  >
                                    <Heart className={`w-3.5 h-3.5 ${likedItems[item.id] ? 'fill-red-500 text-red-500' : ''}`} />
                                  </button>
                                </div>
                                <h5 className="text-xs font-bold text-white line-clamp-1 mt-1">
                                  {item.title}
                                </h5>
                                {item.subtitle && (
                                  <p className="text-[10px] text-slate-400 line-clamp-1">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                  <span className="text-xs font-black text-emerald-400">
                                    {item.price || 'Free'}
                                  </span>
                                  {item.rating && (
                                    <div className="flex items-center gap-0.5 text-[9px] text-amber-400">
                                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                                      <span>{item.rating}</span>
                                    </div>
                                  )}
                                </div>

                                <button 
                                  onClick={(e) => handleAddToCart(item.title, e)}
                                  className="w-6 h-6 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 flex items-center justify-center transition active:scale-90"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Item List Component */}
                  {comp.type === 'item-list' && (
                    <div className="space-y-1.5">
                      {comp.title && (
                        <h4 className="text-xs font-bold text-white tracking-wide">
                          {comp.title}
                        </h4>
                      )}
                      <div className="space-y-1.5">
                        {comp.items?.map((item) => (
                          <div 
                            key={item.id}
                            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 flex items-center justify-between hover:bg-slate-800/80 transition"
                          >
                            <div className="space-y-0.5">
                              <h5 className="text-xs font-semibold text-white">
                                {item.title}
                              </h5>
                              {item.subtitle && (
                                <p className="text-[10px] text-slate-400">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {item.price && (
                                <span className="text-xs font-bold text-emerald-400">
                                  {item.price}
                                </span>
                              )}
                              {item.tag && (
                                <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                                  {item.tag}
                                </span>
                              )}
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cart Summary Component */}
                  {comp.type === 'cart-summary' && (
                    <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/95 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">
                          {comp.title || 'Checkout Summary'}
                        </h4>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          UPI / COD Ready
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300 divide-y divide-slate-800">
                        {comp.items?.map((ci) => (
                          <div key={ci.id} className="pt-1.5 flex justify-between">
                            <span>{ci.title} ({ci.subtitle})</span>
                            <span className="font-bold text-white">{ci.price}</span>
                          </div>
                        ))}
                        <div className="pt-2 flex justify-between font-extrabold text-white text-sm">
                          <span>Total Amount:</span>
                          <span className="text-emerald-400">₹316</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => triggerToast('Order Placed Successfully! 🎉 (Delivery in 10 mins)')}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition active:scale-95"
                      >
                        {comp.actionText || 'Place Order via UPI (Instant)'}
                      </button>
                    </div>
                  )}

                  {/* Header Component */}
                  {comp.type === 'header' && (
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400">
                        AS
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          {comp.title}
                          {comp.badge && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                              {comp.badge}
                            </span>
                          )}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {comp.subtitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Android Bottom Navigation Bar */}
          <div 
            className="px-2 py-2 border-t flex items-center justify-around z-30"
            style={{ 
              borderColor: 'rgba(255,255,255,0.08)',
              backgroundColor: app.theme.cardColor || '#161F30'
            }}
          >
            {app.screens.map((sc) => {
              const isSelected = sc.id === activeScreenId;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScreenId(sc.id)}
                  className="flex flex-col items-center justify-center p-1.5 rounded-xl transition min-w-[50px]"
                >
                  <div className={`p-1 rounded-xl transition ${isSelected ? 'bg-emerald-500/20' : ''}`}>
                    {getScreenIcon(sc.icon || sc.name, isSelected)}
                  </div>
                  <span 
                    className={`text-[10px] mt-0.5 font-medium transition ${
                      isSelected ? 'text-emerald-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {sc.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Android Home Navigation Gesture Bar */}
          <div className="w-full py-1.5 flex items-center justify-center bg-inherit">
            <div className="w-28 h-1 bg-slate-500/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Under-Phone Status Bar */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Android 15 (Target SDK 35) • Live Interactive Emulator</span>
      </div>
    </div>
  );
};
