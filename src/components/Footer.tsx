import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  LifeBuoy, 
  Facebook, 
  Twitter, 
  Youtube, 
  Rss,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Article } from '../types';

interface FooterProps {
  onSelectArticle: (article: Article) => void;
  featuredArticles: Article[];
  onOpenContact: () => void;
  onSubscribeNewsletter: (name: string, email: string) => void;
  onOpenPolicy: (title: string) => void;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectArticle,
  featuredArticles,
  onOpenContact,
  onSubscribeNewsletter,
  onOpenPolicy,
  onOpenLogin
}) => {
  const [subName, setSubName] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) {
      setSubError('Please enter a valid email address');
      return;
    }
    setSubError('');
    onSubscribeNewsletter(subName || 'Subscriber', subEmail);
    setSubscribed(true);
    setSubName('');
    setSubEmail('');
    setTimeout(() => setSubscribed(false), 6000);
  };

  // Specific 4 feature posts matching screenshot 6
  const featureList = [
    featuredArticles.find(a => a.id === 'coronavirus-california-example') || featuredArticles[0],
    featuredArticles.find(a => a.id === 'crews-union-deal') || featuredArticles[1],
    featuredArticles.find(a => a.id === 'un-net-zero-pledges') || featuredArticles[2],
    featuredArticles.find(a => a.id === 'baseball-tbs-nfl-espn') || featuredArticles[3]
  ].filter(Boolean) as Article[];

  const usefulLinks = [
    'Privacy Policy',
    'Terms of Use',
    'Closed Captioning Policy',
    'Accessibility Statement',
    'Personal Information',
    'Data Tracking',
    'Register New Account',
    'Corporate Information',
    'Apps & Products'
  ];

  return (
    <footer className="w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors">
      {/* 4-Column Main Widget Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: ABOUT US */}
          <div>
            <div className="inline-block border border-neutral-900 dark:border-neutral-200 px-4 py-1.5 mb-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 dark:text-neutral-100">
                About Us
              </h3>
            </div>

            <div className="mb-4">
              <h4 className="font-masthead text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                The Soledad Times
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <span>01 Central Park, US, New York City</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                <span>Phone: (012) 345 6789</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                <span>Email: pencidesign@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LifeBuoy className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                <span>Support: contact@support.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: FEATURE POSTS */}
          <div>
            <div className="inline-block border border-neutral-900 dark:border-neutral-200 px-4 py-1.5 mb-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 dark:text-neutral-100">
                Feature Posts
              </h3>
            </div>

            <div className="space-y-4">
              {featureList.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectArticle(story)}
                  className="group cursor-pointer pb-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                >
                  <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
                    {story.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: USEFUL LINKS */}
          <div>
            <div className="inline-block border border-neutral-900 dark:border-neutral-200 px-4 py-1.5 mb-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 dark:text-neutral-100">
                Useful Links
              </h3>
            </div>

            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => onOpenPolicy(link)}
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="text-neutral-400 text-[10px]">▸</span>
                    <span>{link}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: NEWSLETTER */}
          <div>
            <div className="inline-block border border-neutral-900 dark:border-neutral-200 px-4 py-1.5 mb-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-900 dark:text-neutral-100">
                Newsletter
              </h3>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Subscribe our newsletter for latest news. Let's stay updated!
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Thank you! You have been successfully subscribed to daily briefings.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    placeholder="Name..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-none focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Email..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-none focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                {subError && (
                  <p className="text-[11px] text-red-600 dark:text-red-400">{subError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-neutral-900 hover:bg-red-700 dark:bg-neutral-100 dark:hover:bg-red-600 text-white dark:text-neutral-900 dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600 dark:text-neutral-400">
          
          {/* Left copyright */}
          <div>
            <span>@2026 – Designed and Developed by </span>
            <span className="text-red-600 dark:text-red-500 font-semibold">PenciDesign</span>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-5 font-medium">
            <button 
              onClick={() => onOpenPolicy('About Us')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={onOpenContact}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => onOpenPolicy('eMagazine Subscription')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              eMagazine
            </button>
            <button 
              onClick={() => onOpenPolicy('Place an Advertisement')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Place an Ad
            </button>
            {onOpenLogin && (
              <button
                id="footer-staff-login-btn"
                onClick={onOpenLogin}
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
                title="Staff Newsroom Login"
              >
                Staff Login
              </button>
            )}
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-neutral-900 dark:hover:text-white">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter" className="hover:text-neutral-900 dark:hover:text-white">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-neutral-900 dark:hover:text-white">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href="mailto:contact@soledadtimes.com" aria-label="Mail" className="hover:text-neutral-900 dark:hover:text-white">
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a href="#rss" aria-label="RSS" className="hover:text-neutral-900 dark:hover:text-white">
              <Rss className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
