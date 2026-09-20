import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Moon, 
  Sun, 
  ChevronDown, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Rss, 
  BarChart3,
  BookmarkCheck,
  TrendingUp,
  Flame,
  Sparkles,
  ShieldCheck,
  Shield,
  LayoutDashboard
} from 'lucide-react';
import { CategoryType, UserAccount } from '../types';

interface HeaderProps {
  currentCategory: string | null;
  onSelectCategory: (category: CategoryType | null) => void;
  onOpenContact: () => void;
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
  onOpenAnalytics: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isContactPage: boolean;
  onGoHome: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  currentUser?: UserAccount | null;
  onOpenAdmin?: () => void;
  onOpenLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenContact,
  onOpenSearch,
  onOpenDrawer,
  onOpenAnalytics,
  darkMode,
  onToggleDarkMode,
  isContactPage,
  onGoHome,
  savedCount,
  onOpenSaved,
  currentUser,
  onOpenAdmin,
  onOpenLogin
}) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 140);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      {/* Top Banner / Masthead Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Masthead Branding (The Soledad Times) */}
          <div className="flex items-center justify-between md:justify-start">
            <button 
              onClick={onGoHome}
              className="text-left group cursor-pointer focus:outline-none"
              title="The Soledad Times - Return Home"
            >
              <h1 className="font-masthead text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 hover:text-red-700 dark:hover:text-red-500 transition-colors">
                The Soledad Times
              </h1>
            </button>

            {/* Mobile Actions: Dark Mode & Search & Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                id="theme-toggle-mobile-btn"
                onClick={onToggleDarkMode}
                aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-red-600 rounded-md cursor-pointer"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={onOpenSearch}
                aria-label="Open Search"
                className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-red-600"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenDrawer}
                aria-label="Open Navigation Drawer"
                className="p-2 text-neutral-800 dark:text-neutral-100 hover:text-red-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Desktop Right Header: Social Icons & Utilities */}
          <div className="hidden md:flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            {/* Social Links matching demo */}
            <div className="flex items-center gap-3.5 pr-4 border-r border-neutral-200 dark:border-neutral-700 text-sm">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X / Twitter"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@soledadtimes.com" 
                aria-label="Email Newsletter"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="#rss" 
                aria-label="RSS Feed"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-desktop-btn"
              onClick={onToggleDarkMode}
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-700 dark:text-neutral-300 cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={onOpenSaved}
              className="relative p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-700 dark:text-neutral-300"
              title="Saved Articles"
            >
              <BookmarkCheck className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Analytics Telemetry Button */}
            <button
              onClick={onOpenAnalytics}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
              title="View Engagement Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </button>

            {/* Search Icon Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition-colors"
              title="Search The Soledad Times"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`w-full border-t border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all ${
        isScrolled ? 'sticky top-0 z-40 shadow-sm' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* Left Hamburger + Navigation Links */}
            <div className="flex items-center gap-6">
              {/* Hamburger Button */}
              <button
                onClick={onOpenDrawer}
                className="p-1 text-neutral-800 dark:text-neutral-200 hover:text-red-600 transition-colors"
                title="Open Sections"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Nav Links */}
              <nav className="hidden md:flex items-center gap-7 text-[15px] font-bold">
                {/* Home */}
                <button
                  id="nav-home-btn"
                  onClick={onGoHome}
                  className={`flex items-center gap-1 transition-colors cursor-pointer ${
                    !currentCategory && !isContactPage 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                  }`}
                >
                  Home
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* News with Mega Menu */}
                <div 
                  className="relative py-2"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <button
                    onClick={() => {
                      onSelectCategory('News');
                      setShowMegaMenu(false);
                    }}
                    className={`flex items-center gap-1 transition-colors ${
                      currentCategory === 'News' 
                        ? 'text-red-600 dark:text-red-500' 
                        : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                    }`}
                  >
                    News
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMegaMenu ? 'rotate-180 text-red-600' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown (Matches Screenshot 7) */}
                  {showMegaMenu && (
                    <div 
                      className="absolute left-0 top-full w-[680px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 z-50 rounded-b-md grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      {/* Column 1: World News */}
                      <div>
                        <h4 className="text-sm font-bold tracking-wider text-neutral-900 dark:text-neutral-100 uppercase pb-2 border-b border-neutral-200 dark:border-neutral-800 mb-3 flex items-center gap-1.5">
                          <span>World News</span>
                        </h4>
                        <ul className="space-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('World News'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Africa
                            </button>
                          </li>
                          <li className="flex items-center justify-between">
                            <button 
                              onClick={() => { onSelectCategory('World News'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors"
                            >
                              Australia
                            </button>
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW</span>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('World News'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Americas
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('World News'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Asia Pacific
                            </button>
                          </li>
                          <li className="flex items-center justify-between">
                            <button 
                              onClick={() => { onSelectCategory('World News'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors"
                            >
                              Europe
                            </button>
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">HOT</span>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('World News'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Canada
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Technology */}
                      <div>
                        <h4 className="text-sm font-bold tracking-wider text-neutral-900 dark:text-neutral-100 uppercase pb-2 border-b border-neutral-200 dark:border-neutral-800 mb-3 flex items-center gap-1.5">
                          <span>Technology</span>
                        </h4>
                        <ul className="space-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          <li className="flex items-center justify-between">
                            <button 
                              onClick={() => { onSelectCategory('Technology'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors"
                            >
                              Personal Tech
                            </button>
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW</span>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Technology'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Cybersecurity
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Technology'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Social Media
                            </button>
                          </li>
                          <li className="flex items-center justify-between">
                            <button 
                              onClick={() => { onSelectCategory('Technology'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors"
                            >
                              Trending
                            </button>
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">HOT</span>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Technology'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              New Tech
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Technology'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Reviews
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Sports */}
                      <div>
                        <h4 className="text-sm font-bold tracking-wider text-neutral-900 dark:text-neutral-100 uppercase pb-2 border-b border-neutral-200 dark:border-neutral-800 mb-3 flex items-center gap-1.5">
                          <span>Sports</span>
                        </h4>
                        <ul className="space-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Sports'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Winter Olympics
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Sports'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              MLB
                            </button>
                          </li>
                          <li className="flex items-center justify-between">
                            <button 
                              onClick={() => { onSelectCategory('Sports'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors"
                            >
                              Football
                            </button>
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">UPDATE</span>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Sports'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Soccer
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onSelectCategory('Sports'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors block text-left"
                            >
                              Tennis
                            </button>
                          </li>
                          <li className="flex items-center justify-between">
                            <button 
                              onClick={() => { onSelectCategory('Sports'); setShowMegaMenu(false); }}
                              className="hover:text-red-600 transition-colors"
                            >
                              NFL
                            </button>
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW LEAGUE</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Politics */}
                <button
                  onClick={() => onSelectCategory('Politics')}
                  className={`transition-colors ${
                    currentCategory === 'Politics' 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                  }`}
                >
                  Politics
                </button>

                {/* Business */}
                <button
                  onClick={() => onSelectCategory('Business')}
                  className={`transition-colors ${
                    currentCategory === 'Business' 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                  }`}
                >
                  Business
                </button>

                {/* Education */}
                <button
                  onClick={() => onSelectCategory('Education')}
                  className={`transition-colors ${
                    currentCategory === 'Education' 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                  }`}
                >
                  Education
                </button>

                {/* Entertainment */}
                <button
                  onClick={() => onSelectCategory('Entertainment')}
                  className={`transition-colors ${
                    currentCategory === 'Entertainment' 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                  }`}
                >
                  Entertainment
                </button>

                {/* Contact */}
                <button
                  onClick={onOpenContact}
                  className={`transition-colors ${
                    isContactPage 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-red-600'
                  }`}
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* Right Date and Quick Search in Navigation Bar */}
            <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {currentDate}
              </span>
              <button
                onClick={onOpenSearch}
                className="hidden sm:block p-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
