import { UserAccount, SiteSettings } from '../types';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr_superadmin',
    name: 'Victoria Vance',
    email: 'superadmin@soledadtimes.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Editor-in-Chief & Super Admin',
    joinedDate: 'Jan 2024',
    articlesCount: 42,
    status: 'active'
  },
  {
    id: 'usr_moderator_1',
    name: 'Marcus Cole',
    email: 'moderator@soledadtimes.com',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Senior News Desk Moderator',
    joinedDate: 'Mar 2024',
    articlesCount: 28,
    status: 'active'
  },
  {
    id: 'usr_moderator_2',
    name: 'Elena Rostova',
    email: 'elena@soledadtimes.com',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Culture & World Affairs Moderator',
    joinedDate: 'Jun 2024',
    articlesCount: 15,
    status: 'active'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'The Soledad Times',
  tagline: 'Daily News & Magazine Portal',
  breakingNewsEnabled: true,
  breakingTickerText: 'BREAKING: Global summit confirms multilateral AI safety treaty • MARKETS: Clean energy indices climb +3.4% • EDUCATION: State universities expand debt-free grants for STEM students',
  adBannersEnabled: true,
  allowComments: true,
  autoApproveComments: false,
  heroFeaturedCategory: 'All'
};
