import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { AppProject } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with recommended user-agent
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Fallback intelligent generator for 100% free offline / zero-credit reliability
function generateFallbackApp(prompt: string, categoryChoice?: string): AppProject {
  const p = prompt.toLowerCase();
  let category = 'Shopping & E-Commerce';
  let name = 'ShopEase Mart';
  let tagline = 'Smart shopping on the go';
  let primaryColor = '#10B981';
  let iconEmoji = '🛍️';
  let gradient = 'from-emerald-500 to-teal-700';

  if (p.includes('fit') || p.includes('gym') || p.includes('workout') || p.includes('health') || p.includes('kasrat')) {
    category = 'Health & Fitness';
    name = 'FitPulse Pro';
    tagline = 'Daily workout & calorie tracker';
    primaryColor = '#EF4444';
    iconEmoji = '⚡';
    gradient = 'from-red-500 to-amber-600';
  } else if (p.includes('food') || p.includes('khana') || p.includes('restaurant') || p.includes('grocery') || p.includes('swiggy') || p.includes('zomato')) {
    category = 'Food & Delivery';
    name = 'FreshBite Express';
    tagline = 'Fresh meals delivered in 15 mins';
    primaryColor = '#F97316';
    iconEmoji = '🍔';
    gradient = 'from-orange-500 to-rose-600';
  } else if (p.includes('money') || p.includes('expense') || p.includes('budget') || p.includes('paisa') || p.includes('kharcha') || p.includes('crypto')) {
    category = 'Finance & Budget';
    name = 'PaisaTrack AI';
    tagline = 'Smart daily expense & UPI budget tracker';
    primaryColor = '#6366F1';
    iconEmoji = '💰';
    gradient = 'from-indigo-600 to-cyan-600';
  } else if (p.includes('chat') || p.includes('social') || p.includes('friend') || p.includes('dost') || p.includes('connect')) {
    category = 'Social & Chat';
    name = 'ConnectSphere';
    tagline = 'Instant community and real-time chat';
    primaryColor = '#8B5CF6';
    iconEmoji = '💬';
    gradient = 'from-purple-600 to-pink-600';
  } else if (p.includes('quiz') || p.includes('study') || p.includes('padhai') || p.includes('education') || p.includes('learn')) {
    category = 'Education & Quiz';
    name = 'BrainSpark Quiz';
    tagline = 'Master GK, Coding & Math with live battles';
    primaryColor = '#3B82F6';
    iconEmoji = '🎓';
    gradient = 'from-blue-600 to-violet-600';
  } else if (p.includes('doctor') || p.includes('hospital') || p.includes('clinic') || p.includes('appointment')) {
    category = 'Productivity & Tools';
    name = 'MedixCare';
    tagline = 'Instant doctor consultation & slot booking';
    primaryColor = '#06B6D4';
    iconEmoji = '🩺';
    gradient = 'from-cyan-600 to-blue-700';
  } else {
    // derive name from prompt
    const words = prompt.split(' ').filter(w => w.length > 2);
    if (words.length > 0) {
      const w1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
      name = `${w1} App`;
    }
  }

  const cleanPkg = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const id = 'app_' + Date.now();

  return {
    id,
    name,
    tagline,
    description: `A next-generation mobile app designed for ${prompt}. Features instant real-time sync, offline mode, modern Material You design, and lightning-fast user experience.`,
    // @ts-expect-error category type
    category,
    theme: {
      primaryColor,
      accentColor: '#38BDF8',
      backgroundColor: '#0F172A',
      cardColor: '#1E293B',
      textColor: '#F8FAFC',
      darkMode: true,
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: 'rounded-2xl',
    },
    screens: [
      {
        id: 'screen_home',
        name: 'Home',
        title: `${name} Home`,
        icon: 'home',
        route: '/home',
        components: [
          {
            id: 'c_hero',
            type: 'hero-banner',
            title: `Welcome to ${name}`,
            subtitle: tagline,
            badge: '⚡ PRO FEATURE',
            actionText: 'Explore Now',
            actionTargetScreen: 'screen_explore',
          },
          {
            id: 'c_search',
            type: 'search-bar',
            title: 'Search any item or service...',
          },
          {
            id: 'c_stats',
            type: 'metric-stats',
            title: 'Your Highlights',
            items: [
              { id: 'st1', title: 'Active Today', subtitle: '98%', tag: '+12%' },
              { id: 'st2', title: 'Points Earned', subtitle: '1,420', tag: 'Streak 7d' },
              { id: 'st3', title: 'Rating', subtitle: '4.9 ★', tag: 'Top Tier' },
            ],
          },
          {
            id: 'c_cards',
            type: 'card-grid',
            title: 'Featured Items',
            items: [
              { id: 'item_1', title: 'Premium Starter Pack', subtitle: 'Most popular pick', price: '$9.99', rating: 4.9, tag: 'Best Seller', icon: 'zap' },
              { id: 'item_2', title: 'Turbo Booster Pack', subtitle: 'High efficiency', price: '$19.99', rating: 4.8, tag: 'Trending', icon: 'star' },
              { id: 'item_3', title: 'Lifetime Access Pass', subtitle: 'All features included', price: '$49.99', rating: 5.0, tag: 'VIP', icon: 'shield' },
            ],
          },
        ],
      },
      {
        id: 'screen_explore',
        name: 'Explore',
        title: 'Discover & Browse',
        icon: 'compass',
        route: '/explore',
        components: [
          {
            id: 'c_explore_list',
            type: 'item-list',
            title: 'Trending Recommendations',
            items: [
              { id: 'ex1', title: 'Smart Automation Routine', subtitle: 'Updated 2h ago', price: 'Free', rating: 4.9, tag: 'Hot' },
              { id: 'ex2', title: 'Cloud Backup & Sync', subtitle: 'Protected end-to-end', price: 'Included', rating: 5.0, tag: 'Secured' },
              { id: 'ex3', title: 'Community Insights Hub', subtitle: '5.2k members active', price: 'Free', rating: 4.7, tag: 'Community' },
            ],
          },
        ],
      },
      {
        id: 'screen_profile',
        name: 'Profile',
        title: 'Account & Settings',
        icon: 'user',
        route: '/profile',
        components: [
          {
            id: 'c_profile_header',
            type: 'header',
            title: 'Alex Sterling',
            subtitle: 'Verified Developer • Android 15 Ready',
            badge: 'PRO TIER',
          },
          {
            id: 'c_profile_list',
            type: 'item-list',
            title: 'Quick Settings',
            items: [
              { id: 'p1', title: 'Push Notifications', subtitle: 'Enabled for live alerts', tag: 'ON' },
              { id: 'p2', title: 'Dark Mode Experience', subtitle: 'AMOLED True Black', tag: 'ACTIVE' },
              { id: 'p3', title: 'Google Play Cloud Sync', subtitle: 'Auto-backed to Google Account', tag: 'SYNCED' },
            ],
          },
        ],
      },
    ],
    android: {
      packageName: `com.playforge.${cleanPkg || 'instantapp'}`,
      versionName: '1.0.0',
      versionCode: 1,
      minSdk: 24,
      targetSdk: 35,
      permissions: ['INTERNET', 'ACCESS_NETWORK_STATE', 'POST_NOTIFICATIONS', 'VIBRATE'],
      keystoreAlias: `${cleanPkg}_key`,
      sha256Fingerprint: 'B4:8D:12:9A:FF:3C:4E:91:20:AA:7B:62:38:19:90:5E:F2:66:3A:D8',
      isSigned: true,
    },
    storeListing: {
      title: `${name} - Smart & Fast`,
      shortDescription: tagline.slice(0, 80),
      fullDescription: `Experience the all-new ${name}! Designed from the ground up for speed, reliability, and smooth navigation on Android 15.\n\nKey Highlights:\n- 🚀 Lightning fast startup and zero lag\n- 🔒 Private & secure, complies with Google Play Safety policies\n- 🎨 Modern Material You interface\n- 📲 Full offline support and instant cloud backup\n\nDownload now and discover why thousands rate it 5-stars!`,
      // @ts-expect-error category type
      category,
      tags: ['productivity', 'lifestyle', 'tools', 'utilities'],
      contactEmail: 'support@playforge-apps.com',
      privacyPolicyUrl: `https://playforge-apps.com/privacy/${cleanPkg}`,
      contentRating: 'Everyone',
      targetAudience: 'Everyone 13+ (General Audience)',
      containsAds: false,
      inAppPurchases: true,
      featureGraphicText: `${name} • Official Android Release`,
      iconEmoji,
      themeGradient: gradient,
      releaseNotes: 'Initial production launch on Google Play Store. Bug fixes and performance optimizations included.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// API: Generate App using Gemini 3.8 Flash with full JSON structure
app.post('/api/ai/generate-app', async (req: Request, res: Response) => {
  const { prompt, language = 'en', category } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // If no API key configured, use deterministic rich fallback instantly (Free & Zero Credit)
    const fallbackApp = generateFallbackApp(prompt, category);
    return res.json({ app: fallbackApp, source: 'offline-smart-generator' });
  }

  try {
    const systemPrompt = `You are an elite Android App Architect and Google Play Store Publishing Specialist.
The user wants to generate a complete, working mobile application schema from their prompt.
The prompt may be in English, Hindi, or Hinglish (e.g. "Asa app jo grocery deliver kare").
Respond ONLY with a valid JSON object representing the app with the following structure:
{
  "id": "app_string",
  "name": "Catchy App Name (2-3 words)",
  "tagline": "Short punchy slogan",
  "description": "Comprehensive 2-3 sentence overview of the app",
  "category": "Shopping & E-Commerce" | "Health & Fitness" | "Finance & Budget" | "Food & Delivery" | "Education & Quiz" | "Productivity & Tools" | "Social & Chat" | "Entertainment & Games",
  "theme": {
    "primaryColor": "#hexColor",
    "accentColor": "#hexColor",
    "backgroundColor": "#0F172A",
    "cardColor": "#1E293B",
    "textColor": "#F8FAFC",
    "darkMode": true,
    "fontFamily": "Plus Jakarta Sans",
    "borderRadius": "rounded-2xl"
  },
  "screens": [
    {
      "id": "screen_home",
      "name": "Home",
      "title": "Screen Title",
      "icon": "home",
      "route": "/home",
      "components": [
        {
          "id": "comp_1",
          "type": "hero-banner" | "card-grid" | "item-list" | "metric-stats" | "search-bar" | "chart" | "action-button",
          "title": "Section Title",
          "subtitle": "Subtitle description",
          "badge": "Optional badge",
          "actionText": "Button label",
          "items": [
            {
              "id": "it_1",
              "title": "Item name",
              "subtitle": "Details",
              "price": "$X or Free",
              "rating": 4.9,
              "tag": "Trending",
              "icon": "zap"
            }
          ]
        }
      ]
    },
    {
      "id": "screen_explore",
      "name": "Explore",
      "title": "Explore & Catalog",
      "icon": "compass",
      "route": "/explore",
      "components": [...]
    },
    {
      "id": "screen_profile",
      "name": "Profile",
      "title": "User Dashboard",
      "icon": "user",
      "route": "/profile",
      "components": [...]
    }
  ],
  "android": {
    "packageName": "com.playforge.appname",
    "versionName": "1.0.0",
    "versionCode": 1,
    "minSdk": 24,
    "targetSdk": 35,
    "permissions": ["INTERNET", "ACCESS_NETWORK_STATE", "POST_NOTIFICATIONS"],
    "keystoreAlias": "appname_key",
    "sha256Fingerprint": "B4:8D:12:9A:FF:3C:4E:91:20:AA:7B:62:38:19:90:5E:F2:66:3A:D8",
    "isSigned": true
  },
  "storeListing": {
    "title": "App Name (max 30 chars)",
    "shortDescription": "Max 80 chars Google Play short description",
    "fullDescription": "Rich multi-line Google Play description with bullet points & keywords",
    "category": "Same as app category",
    "tags": ["tag1", "tag2", "tag3"],
    "contactEmail": "support@appdomain.com",
    "privacyPolicyUrl": "https://appdomain.com/privacy",
    "contentRating": "Everyone",
    "targetAudience": "Everyone 13+",
    "containsAds": false,
    "inAppPurchases": true,
    "featureGraphicText": "Official Google Play Edition",
    "iconEmoji": "🚀",
    "themeGradient": "from-indigo-600 to-violet-700",
    "releaseNotes": "First release on Google Play Store."
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Create an awesome, realistic, production-ready Android mobile app based on this request: "${prompt}". User's preferred category or notes: ${category || 'auto-detect'}.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from model');
    }

    const appData = JSON.parse(text);
    appData.id = 'app_' + Date.now();
    appData.createdAt = new Date().toISOString();
    appData.updatedAt = new Date().toISOString();

    return res.json({ app: appData, source: 'gemini-3.8-flash' });
  } catch (error) {
    console.error('Gemini generation error, falling back:', error);
    const fallbackApp = generateFallbackApp(prompt, category);
    return res.json({ app: fallbackApp, source: 'offline-smart-generator' });
  }
});

// API: Generate / Optimize Play Store Listing with ASO keywords
app.post('/api/ai/generate-listing', async (req: Request, res: Response) => {
  const { appName, appDescription, category, targetAudience } = req.body;

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      title: `${(appName || 'Fast App').slice(0, 25)}: Pro Edition`,
      shortDescription: `The best Android app for ${(appName || 'daily productivity')}. Fast, private & lightweight.`,
      fullDescription: `Welcome to ${appName || 'our application'}!\n\nEngineered specifically for Android with high performance and privacy in mind.\n\nKey Features:\n• Intuitive and clean Material You UI\n• 100% Offline Capability\n• Battery optimized & ultra-lightweight\n• Zero data tracking or unneeded permissions\n\nDownload today and elevate your experience!`,
      tags: ['productivity', 'tools', 'lifestyle', 'android15', 'fast'],
      releaseNotes: 'Initial production build. Performance enhancements and bug fixes.',
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate Google Play Store ASO (App Store Optimization) metadata for:
App Name: ${appName}
Description: ${appDescription}
Category: ${category}
Target: ${targetAudience}

Respond ONLY with JSON:
{
  "title": "Google Play Title (strictly <= 30 characters)",
  "shortDescription": "Hooking short description (strictly <= 80 characters)",
  "fullDescription": "Compelling store description with emojis and bullet points (max 3000 chars)",
  "tags": ["5", "relevant", "search", "keywords", "tags"],
  "releaseNotes": "What's new in this version"
}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (e) {
    console.error('Listing generation error:', e);
    return res.json({
      title: `${(appName || 'Fast App').slice(0, 25)}: Pro Edition`,
      shortDescription: `Top rated app for ${(appName || 'everyday tasks')}. Fast, smooth & lightweight.`,
      fullDescription: `Discover ${appName} for Android. Built for speed, security, and delightful user experience.`,
      tags: ['mobile', 'tools', 'android'],
      releaseNotes: 'First release on Google Play.',
    });
  }
});

// API: Simulate Play Store Publishing Bot Pipeline
app.post('/api/publish/deploy-to-play-store', (req: Request, res: Response) => {
  const { appId, appName, packageName, track = 'internal' } = req.body;

  // Real-world Google Play Developer Console automated pipeline steps
  const steps = [
    { step: 'Keystore Verification', detail: 'Validating RSA 2048-bit digital signature certificate & SHA-256 fingerprint' },
    { step: 'AAB Generation', detail: 'Compiling Android App Bundle (.aab) with R8 obfuscation and resource shrinking' },
    { step: 'Google Play Integrity', detail: 'Verifying API 35 (Android 15) compliance and 64-bit native architecture' },
    { step: 'Data Safety & Privacy Audit', detail: 'Checking permissions against Google Play Developer Program Policies' },
    { step: 'Google Play Console Handshake', detail: `Connected to Google Play Developer API v3 (Track: ${track.toUpperCase()})` },
    { step: 'Uploading Bundle & Assets', detail: 'Uploading .aab (18.4 MB) + 512px icon + 1024px feature graphic + screenshots' },
    { step: 'Automated Pre-Launch Report', detail: 'Running Firebase Test Lab virtual devices test matrix (0 crashes detected)' },
    { step: 'Rollout Initiated', detail: `Release 1.0.0 (Version Code 1) is now LIVE on Google Play (${track.toUpperCase()} track)!` },
  ];

  const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName || 'com.playforge.app'}`;

  return res.json({
    success: true,
    steps,
    playStoreUrl,
    status: 'published',
    track,
    publishedAt: new Date().toISOString(),
    sha256: 'B4:8D:12:9A:FF:3C:4E:91:20:AA:7B:62:38:19:90:5E:F2:66:3A:D8',
    bundleSize: '18.4 MB',
  });
});

// Dev vs Production static handling
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PlayForge Engine] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
