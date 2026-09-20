import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroGrid } from './components/HeroGrid';
import { SubHeroGrid } from './components/SubHeroGrid';
import { AdBanner } from './components/AdBanner';
import { WorldPoliticsSection } from './components/WorldPoliticsSection';
import { BusinessSection } from './components/BusinessSection';
import { StripNewsSection } from './components/StripNewsSection';
import { Footer } from './components/Footer';
import { CategoryView } from './components/CategoryView';
import { ContactView } from './components/ContactView';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { OffcanvasDrawer } from './components/OffcanvasDrawer';
import { AnalyticsDrawer } from './components/AnalyticsDrawer';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { PolicyModal } from './components/PolicyModal';
import { BreakingTicker } from './components/BreakingTicker';
import { AdminBar } from './components/AdminBar';
import { LoginModal } from './components/LoginModal';
import { LoginPage } from './components/LoginPage';

// Admin CMS Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { NewsManager } from './components/admin/NewsManager';
import { ArticleEditorModal } from './components/admin/ArticleEditorModal';
import { UserManager } from './components/admin/UserManager';
import { SiteSettingsPanel } from './components/admin/SiteSettingsPanel';
import { CommentModerationPanel } from './components/admin/CommentModerationPanel';

import { INITIAL_ARTICLES, ADS, INITIAL_COMMENTS } from './data/articles';
import { INITIAL_USERS, INITIAL_SETTINGS } from './data/users';
import { 
  Article, 
  CategoryType, 
  AnalyticsData, 
  AdPlacement, 
  CommentItem,
  UserAccount,
  UserRole,
  SiteSettings,
  ArticleStatus
} from './types';

export default function App() {
  // Articles state
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem('soledad_articles');
      return stored ? JSON.parse(stored) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  // Users / Roles state
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('soledad_users');
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current active user: Defaults to NULL for normal public visitors!
  // Only staff who manually login via /login will have an active session.
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem('soledad_current_user');
      if (!stored || stored === 'null' || stored === 'undefined') return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem('soledad_site_settings');
      return stored ? JSON.parse(stored) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Navigation & View Modes: 'public' (newspaper) vs 'login' (/login) vs 'admin' (/admin CMS)
  const [viewMode, setViewMode] = useState<'public' | 'login' | 'admin'>('public');
  const [adminTab, setAdminTab] = useState<'overview' | 'news' | 'users' | 'settings' | 'comments'>('overview');

  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);
  const [isContactPage, setIsContactPage] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [policyModalTitle, setPolicyModalTitle] = useState<string | null>(null);

  // Article Editor Modal
  const [isArticleEditorOpen, setIsArticleEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Role Switcher Modal (for testing when logged in)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Bookmarks
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('soledad_saved_articles');
      return stored ? JSON.parse(stored) : ['cal-state-graduation'];
    } catch {
      return ['cal-state-graduation'];
    }
  });

  // Comments
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentItem[]>>(() => {
    try {
      const stored = localStorage.getItem('soledad_comments');
      return stored ? JSON.parse(stored) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('soledad_dark_mode');
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  // Analytics & Telemetry
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 12450,
    articleReads: 3820,
    avgTimeOnPage: 195,
    scrollDepth: 45,
    adClicks: 342,
    newsletterSignups: 890,
    topCategories: [
      { category: 'Education', count: 3240 },
      { category: 'Politics', count: 2890 },
      { category: 'Business', count: 2450 },
      { category: 'Sports', count: 2110 },
      { category: 'Entertainment', count: 1760 }
    ],
    events: [
      { time: '12:04:12', action: 'PageView', details: 'Front Page / Cover' },
      { time: '12:04:35', action: 'ScrollDepth', details: '50% Read Progress' },
      { time: '12:05:02', action: 'Impression', details: '300x250 Ad Rendered' }
    ]
  });

  // URL Route Synchronization: handles /login, /admin, and / seamlessly
  const navigateTo = useCallback((mode: 'public' | 'login' | 'admin') => {
    setViewMode(mode);
    const targetPath = mode === 'login' ? '/login' : mode === 'admin' ? '/admin' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser URL changes (e.g. typing domain.com/login or back/forward buttons)
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (path === '/login' || path === '/wp-login.php' || hash === '#/login' || search.includes('login')) {
        setViewMode('login');
      } else if (path === '/admin' || path === '/wp-admin' || hash === '#/admin' || search.includes('admin')) {
        if (currentUser) {
          setViewMode('admin');
        } else {
          setViewMode('login');
          if (window.location.pathname !== '/login') {
            window.history.replaceState({}, '', '/login');
          }
        }
      } else {
        setViewMode('public');
      }
    };

    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    window.addEventListener('hashchange', handleUrlRouting);
    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('hashchange', handleUrlRouting);
    };
  }, [currentUser]);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('soledad_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist articles
  useEffect(() => {
    localStorage.setItem('soledad_articles', JSON.stringify(articles));
  }, [articles]);

  // Persist users
  useEffect(() => {
    localStorage.setItem('soledad_users', JSON.stringify(users));
  }, [users]);

  // Persist current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('soledad_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('soledad_current_user');
    }
  }, [currentUser]);

  // Persist site settings
  useEffect(() => {
    localStorage.setItem('soledad_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('soledad_saved_articles', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  // Persist comments
  useEffect(() => {
    localStorage.setItem('soledad_comments', JSON.stringify(commentsMap));
  }, [commentsMap]);

  // Telemetry event logger
  const logEvent = useCallback((action: string, details: string) => {
    const time = new Date().toLocaleTimeString();
    setAnalytics(prev => ({
      ...prev,
      events: [...prev.events.slice(-30), { time, action, details }]
    }));
  }, []);

  // Track scroll depth
  useEffect(() => {
    let maxDepth = 0;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentDepth = Math.round((window.scrollY / totalHeight) * 100);
        if (currentDepth > maxDepth) {
          maxDepth = currentDepth;
          setAnalytics(prev => ({
            ...prev,
            scrollDepth: Math.max(prev.scrollDepth, maxDepth)
          }));
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Public Newspaper Article Selection
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, views: a.views + 1 } : a));
    setAnalytics(prev => ({
      ...prev,
      articleReads: prev.articleReads + 1,
      pageViews: prev.pageViews + 1
    }));
    logEvent('ArticleRead', `Read "${article.title.slice(0, 30)}..."`);
  };

  const handleSelectCategory = (category: CategoryType | null) => {
    setCurrentCategory(category);
    setIsContactPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (category) {
      logEvent('CategoryFilter', `Navigated to ${category}`);
      setAnalytics(prev => ({
        ...prev,
        pageViews: prev.pageViews + 1,
        topCategories: prev.topCategories.map(c => 
          c.category === category ? { ...c, count: c.count + 1 } : c
        )
      }));
    } else {
      logEvent('HomeView', 'Returned to Home Cover');
    }
  };

  const handleOpenContact = () => {
    setIsContactPage(true);
    setCurrentCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logEvent('ContactPage', 'Viewed Contact & Office Location');
  };

  const handleGoHome = () => {
    setIsContactPage(false);
    setCurrentCategory(null);
    navigateTo('public');
    logEvent('HomeView', 'Returned to Home Cover');
  };

  const handleToggleBookmark = (article: Article) => {
    setSavedArticleIds(prev => {
      const exists = prev.includes(article.id);
      const updated = exists ? prev.filter(id => id !== article.id) : [...prev, article.id];
      logEvent(exists ? 'BookmarkRemoved' : 'BookmarkSaved', `Article: ${article.id}`);
      return updated;
    });
  };

  const handleAddComment = (articleId: string, author: string, content: string) => {
    const newComment: CommentItem = {
      id: 'c_' + Date.now(),
      articleId,
      author,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      date: 'Just now',
      content,
      likes: 1
    };

    setCommentsMap(prev => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newComment]
    }));

    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, commentCount: a.commentCount + 1 } : a
    ));

    logEvent('NewComment', `Added by ${author} on ${articleId}`);
  };

  const handleLikeComment = (commentId: string) => {
    setCommentsMap(prev => {
      const nextMap = { ...prev };
      for (const artId in nextMap) {
        nextMap[artId] = nextMap[artId].map(c => 
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        );
      }
      return nextMap;
    });
  };

  const handleSubscribeNewsletter = (name: string, email: string) => {
    setAnalytics(prev => ({
      ...prev,
      newsletterSignups: prev.newsletterSignups + 1
    }));
    logEvent('NewsletterSignup', `Subscribed: ${email}`);
  };

  const handleAdClick = (ad: AdPlacement) => {
    setAnalytics(prev => ({
      ...prev,
      adClicks: prev.adClicks + 1
    }));
    logEvent('AdClick', `Clicked ${ad.dimensions}: ${ad.title}`);
    window.open(ad.ctaUrl, '_blank');
  };

  const handleSimulateTraffic = () => {
    setAnalytics(prev => ({
      ...prev,
      pageViews: prev.pageViews + 500,
      articleReads: prev.articleReads + 180,
      adClicks: prev.adClicks + 24
    }));
    logEvent('TrafficSurge', 'Simulated +500 concurrent visitors test');
  };

  // Staff Sign-in Success Handler
  const handleLoginSuccess = (authenticatedUser: UserAccount) => {
    setCurrentUser(authenticatedUser);
    navigateTo('admin');
    logEvent('StaffLogin', `Authenticated ${authenticatedUser.role}: ${authenticatedUser.name}`);
  };

  // Staff Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('public');
    logEvent('StaffLogout', 'Logged out to public reader view');
  };

  // Article Management (Upload, Edit, Publish, Delete)
  const handleSaveArticle = (savedArticle: Article) => {
    setArticles(prev => {
      const index = prev.findIndex(a => a.id === savedArticle.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedArticle;
        return updated;
      } else {
        return [savedArticle, ...prev];
      }
    });

    if (!articles.some(a => a.id === savedArticle.id) && currentUser) {
      setUsers(prev => prev.map(u => 
        u.id === currentUser.id ? { ...u, articlesCount: u.articlesCount + 1 } : u
      ));
    }

    logEvent('StorySaved', `Story "${savedArticle.title.slice(0, 25)}..." [${savedArticle.status}]`);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    logEvent('StoryDeleted', `Deleted story ID: ${id}`);
  };

  const handleToggleArticleStatus = (id: string, newStatus: ArticleStatus) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    logEvent('StoryStatusToggled', `Article ${id} switched to ${newStatus}`);
  };

  // Staff / User Management (Super Admin only)
  const handleAddUser = (newUser: UserAccount) => {
    setUsers(prev => [...prev, newUser]);
    logEvent('StaffCreated', `Registered ${newUser.role}: ${newUser.name}`);
  };

  const handleUpdateUserRole = (id: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
    }
    logEvent('RoleUpdated', `User ${id} role updated to ${newRole}`);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
    ));
    logEvent('UserStatusToggled', `User ${id} status toggled`);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    logEvent('UserDeleted', `User ${id} removed`);
  };

  // Site Settings
  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    logEvent('SettingsSaved', 'Updated site configuration');
  };

  // Comment Moderation
  const handleDeleteComment = (articleId: string, commentId: string) => {
    setCommentsMap(prev => ({
      ...prev,
      [articleId]: (prev[articleId] || []).filter(c => c.id !== commentId)
    }));
    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, commentCount: Math.max(0, a.commentCount - 1) } : a
    ));
    logEvent('CommentModerated', `Removed comment ${commentId}`);
  };

  // Filtered articles for current category view
  const categoryArticles = currentCategory
    ? articles.filter(a => a.category.toLowerCase() === currentCategory.toLowerCase())
    : [];

  const savedArticlesList = articles.filter(a => savedArticleIds.includes(a.id));

  // 1. /login Dedicated Route
  if (viewMode === 'login') {
    return (
      <LoginPage
        allUsers={users}
        onLoginSuccess={handleLoginSuccess}
        onGoHome={() => navigateTo('public')}
        darkMode={darkMode}
      />
    );
  }

  // 2. /admin Dedicated Route (requires authentication; otherwise redirected to /login)
  if (viewMode === 'admin') {
    if (!currentUser) {
      return (
        <LoginPage
          allUsers={users}
          onLoginSuccess={handleLoginSuccess}
          onGoHome={() => navigateTo('public')}
          darkMode={darkMode}
        />
      );
    }

    return (
      <>
        <AdminLayout
          currentUser={currentUser}
          onSwitchUser={(user) => setCurrentUser(user)}
          allUsers={users}
          activeTab={adminTab}
          onSelectTab={(tab) => setAdminTab(tab)}
          onExitToSite={() => navigateTo('public')}
          onNewArticle={() => {
            setEditingArticle(null);
            setIsArticleEditorOpen(true);
          }}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(prev => !prev)}
        >
          {adminTab === 'overview' && (
            <AdminDashboardOverview
              articles={articles}
              currentUser={currentUser}
              analytics={analytics}
              onNavigateTab={(tab) => setAdminTab(tab)}
              onNewArticle={() => {
                setEditingArticle(null);
                setIsArticleEditorOpen(true);
              }}
              onEditArticle={(art) => {
                setEditingArticle(art);
                setIsArticleEditorOpen(true);
              }}
            />
          )}

          {adminTab === 'news' && (
            <NewsManager
              articles={articles}
              currentUser={currentUser}
              onEditArticle={(art) => {
                setEditingArticle(art);
                setIsArticleEditorOpen(true);
              }}
              onDeleteArticle={handleDeleteArticle}
              onToggleStatus={handleToggleArticleStatus}
              onNewArticle={() => {
                setEditingArticle(null);
                setIsArticleEditorOpen(true);
              }}
              onViewLiveArticle={(art) => {
                setSelectedArticle(art);
              }}
            />
          )}

          {adminTab === 'comments' && (
            <CommentModerationPanel
              commentsMap={commentsMap}
              articles={articles}
              currentUser={currentUser}
              onDeleteComment={handleDeleteComment}
              onViewLiveArticle={(art) => setSelectedArticle(art)}
            />
          )}

          {adminTab === 'users' && (
            <UserManager
              users={users}
              currentUser={currentUser}
              onAddUser={handleAddUser}
              onUpdateUserRole={handleUpdateUserRole}
              onToggleUserStatus={handleToggleUserStatus}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {adminTab === 'settings' && (
            <SiteSettingsPanel
              settings={siteSettings}
              currentUser={currentUser}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </AdminLayout>

        {/* Story Editor Modal */}
        <ArticleEditorModal
          isOpen={isArticleEditorOpen}
          onClose={() => {
            setIsArticleEditorOpen(false);
            setEditingArticle(null);
          }}
          onSave={handleSaveArticle}
          initialArticle={editingArticle}
          currentUser={currentUser}
        />

        {/* Live Reader Preview Modal inside Admin */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectRelated={handleSelectArticle}
          relatedArticles={selectedArticle ? articles.filter(a => a.category === selectedArticle.category && a.id !== selectedArticle.id) : []}
          isBookmarked={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
          onToggleBookmark={handleToggleBookmark}
          comments={selectedArticle ? (commentsMap[selectedArticle.id] || []) : []}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
      </>
    );
  }

  // 3. Normal Public Newspaper View (Front Cover, Category, Article Reader)
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      
      {/* WordPress-style Admin Top Ribbon: ONLY rendered if staff has logged in manually! */}
      {currentUser && (
        <AdminBar
          currentUser={currentUser}
          onOpenDashboard={() => navigateTo('admin')}
          onNewArticle={() => {
            setEditingArticle(null);
            setIsArticleEditorOpen(true);
          }}
          onOpenRoleSwitcher={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* Breaking News Ticker */}
      <BreakingTicker
        enabled={siteSettings.breakingNewsEnabled}
        tickerText={siteSettings.breakingTickerText}
      />

      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white"
      >
        Skip to main content
      </a>

      {/* Main Header (Clean for regular users, identical to theme demo) */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        onOpenContact={handleOpenContact}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => {
          setDarkMode(prev => !prev);
          logEvent('DarkModeToggle', `Switched to ${!darkMode ? 'Dark' : 'Light'} Mode`);
        }}
        isContactPage={isContactPage}
        onGoHome={handleGoHome}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        currentUser={currentUser}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenLogin={() => navigateTo('login')}
      />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {isContactPage ? (
          /* Contact Us View */
          <ContactView onGoHome={handleGoHome} />
        ) : currentCategory ? (
          /* Category Archive View */
          <CategoryView
            category={currentCategory}
            articles={categoryArticles}
            allArticles={articles}
            onSelectArticle={handleSelectArticle}
            onGoHome={handleGoHome}
            onSubscribeNewsletter={handleSubscribeNewsletter}
          />
        ) : (
          /* Front Cover / Homepage Layout */
          <>
            {/* Top Multi-Story Hero Grid */}
            <HeroGrid
              articles={articles}
              onSelectArticle={handleSelectArticle}
              ad={siteSettings.adBannersEnabled ? ADS.find(a => a.type === 'medium-rectangle') : undefined}
              onAdClick={handleAdClick}
            />

            {/* 4-Column Sub-Hero Cards */}
            <SubHeroGrid
              articles={articles}
              onSelectArticle={handleSelectArticle}
            />

            {/* 728x90 Leaderboard Ad Space */}
            {siteSettings.adBannersEnabled && (
              <AdBanner
                ad={ADS.find(a => a.type === 'leaderboard') || ADS[1]}
                onClick={handleAdClick}
              />
            )}

            {/* World & Politics Section with Education Feature */}
            <WorldPoliticsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* Business News Section */}
            <BusinessSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* 6-Column Strip News Section */}
            <StripNewsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
            />
          </>
        )}
      </main>

      {/* Full 4-Column Footer */}
      <Footer
        onSelectArticle={handleSelectArticle}
        featuredArticles={articles}
        onOpenContact={handleOpenContact}
        onSubscribeNewsletter={handleSubscribeNewsletter}
        onOpenPolicy={(title) => setPolicyModalTitle(title)}
        onOpenLogin={() => navigateTo('login')}
      />

      {/* Modals & Drawers */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectRelated={handleSelectArticle}
        relatedArticles={selectedArticle ? articles.filter(a => a.category === selectedArticle.category && a.id !== selectedArticle.id) : []}
        isBookmarked={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        comments={selectedArticle ? (commentsMap[selectedArticle.id] || []) : []}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />

      <OffcanvasDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectCategory={handleSelectCategory}
        onOpenContact={handleOpenContact}
        onSelectArticle={handleSelectArticle}
        recentArticles={articles}
        darkMode={darkMode}
        onToggleDarkMode={() => {
          setDarkMode(prev => !prev);
          logEvent('DarkModeToggle', `Switched to ${!darkMode ? 'Dark' : 'Light'} Mode`);
        }}
        currentUser={currentUser}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenLogin={() => navigateTo('login')}
      />

      <AnalyticsDrawer
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        analytics={analytics}
        onSimulateTraffic={handleSimulateTraffic}
      />

      <SavedArticlesModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={(id) => setSavedArticleIds(prev => prev.filter(i => i !== id))}
      />

      <PolicyModal
        isOpen={!!policyModalTitle}
        title={policyModalTitle || ''}
        onClose={() => setPolicyModalTitle(null)}
      />

      {/* Quick Article Composer from Public Top Bar (for logged in staff) */}
      {currentUser && (
        <ArticleEditorModal
          isOpen={isArticleEditorOpen}
          onClose={() => {
            setIsArticleEditorOpen(false);
            setEditingArticle(null);
          }}
          onSave={handleSaveArticle}
          initialArticle={editingArticle}
          currentUser={currentUser}
        />
      )}

      {/* Staff Login / Quick Role Switcher Modal (for logged in staff) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        allUsers={users}
        onSelectUser={(u) => setCurrentUser(u)}
        onOpenDashboard={() => navigateTo('admin')}
      />

    </div>
  );
}
