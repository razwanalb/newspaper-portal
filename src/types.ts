export type CategoryType = 
  | 'News'
  | 'Politics'
  | 'Business'
  | 'Education'
  | 'Entertainment'
  | 'Environment'
  | 'Sports'
  | 'Technology'
  | 'World News';

export type UserRole = 'super_admin' | 'moderator' | 'reader';

export type ArticleStatus = 'published' | 'draft' | 'review' | 'archived';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  joinedDate: string;
  articlesCount: number;
  status: 'active' | 'suspended';
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  breakingNewsEnabled: boolean;
  breakingTickerText: string;
  adBannersEnabled: boolean;
  allowComments: boolean;
  autoApproveComments: boolean;
  heroFeaturedCategory: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryType;
  subcategory?: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  commentCount: number;
  imageUrl: string;
  imageCaption?: string;
  excerpt: string;
  content: string[];
  trending?: boolean;
  featured?: boolean;
  hotBadge?: string;
  tags: string[];
  views: number;
  status?: ArticleStatus;
  publishedBy?: string;
  updatedAt?: string;
}

export interface AdPlacement {
  id: string;
  type: 'leaderboard' | 'medium-rectangle' | 'sidebar';
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaUrl: string;
  dimensions: string;
  imageUrl: string;
  active: boolean;
}

export interface AnalyticsData {
  pageViews: number;
  articleReads: number;
  avgTimeOnPage: number; // in seconds
  scrollDepth: number; // percentage
  adClicks: number;
  newsletterSignups: number;
  topCategories: { category: string; count: number }[];
  events: { time: string; action: string; details: string }[];
}

export interface CommentItem {
  id: string;
  articleId: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}
