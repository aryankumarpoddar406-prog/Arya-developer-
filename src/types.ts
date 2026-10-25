export type AppCategory = 
  | 'Shopping & E-Commerce'
  | 'Health & Fitness'
  | 'Finance & Budget'
  | 'Food & Delivery'
  | 'Education & Quiz'
  | 'Productivity & Tools'
  | 'Social & Chat'
  | 'Entertainment & Games';

export interface UIComponent {
  id: string;
  type: 
    | 'header'
    | 'hero-banner'
    | 'card-grid'
    | 'item-list'
    | 'metric-stats'
    | 'action-button'
    | 'search-bar'
    | 'form-input'
    | 'rating-review'
    | 'chart'
    | 'cart-summary';
  title?: string;
  subtitle?: string;
  content?: string;
  icon?: string;
  badge?: string;
  items?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    price?: string;
    rating?: number;
    tag?: string;
    icon?: string;
    completed?: boolean;
    imageColor?: string;
  }>;
  actionText?: string;
  actionTargetScreen?: string;
}

export interface AppScreen {
  id: string;
  name: string;
  title: string;
  icon: string;
  route: string;
  components: UIComponent[];
}

export interface AppTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  darkMode: boolean;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Roboto' | 'Poppins';
  borderRadius: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
}

export interface AndroidConfig {
  packageName: string;
  versionName: string;
  versionCode: number;
  minSdk: number;
  targetSdk: number;
  permissions: string[];
  keystoreAlias: string;
  sha256Fingerprint: string;
  isSigned: boolean;
}

export interface PlayStoreListing {
  title: string; // Max 30 chars
  shortDescription: string; // Max 80 chars
  fullDescription: string; // Max 4000 chars
  category: AppCategory;
  tags: string[];
  contactEmail: string;
  privacyPolicyUrl: string;
  contentRating: 'Everyone' | 'Teen' | 'Everyone 10+' | 'Mature 17+';
  targetAudience: string;
  containsAds: boolean;
  inAppPurchases: boolean;
  featureGraphicText: string;
  iconEmoji: string;
  themeGradient: string;
  releaseNotes: string;
}

export interface AppProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  theme: AppTheme;
  screens: AppScreen[];
  android: AndroidConfig;
  storeListing: PlayStoreListing;
  createdAt: string;
  updatedAt: string;
  isPublishedToPlayStore?: boolean;
  playStoreUrl?: string;
  releaseTrack?: 'internal' | 'closed' | 'open' | 'production';
  liveInstallCount?: number;
}

export interface DeploymentLog {
  id: string;
  timestamp: string;
  step: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  detail: string;
}
