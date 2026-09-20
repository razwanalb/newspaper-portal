import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  Bell, 
  DollarSign, 
  MessageSquare, 
  Lock, 
  Save, 
  Check, 
  ShieldCheck,
  Radio
} from 'lucide-react';
import { SiteSettings, UserAccount } from '../../types';

interface SiteSettingsPanelProps {
  settings: SiteSettings;
  currentUser: UserAccount;
  onSaveSettings: (settings: SiteSettings) => void;
}

export const SiteSettingsPanel: React.FC<SiteSettingsPanelProps> = ({
  settings,
  currentUser,
  onSaveSettings
}) => {
  const isSuperAdmin = currentUser.role === 'super_admin';

  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isSuperAdmin) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 text-center max-w-2xl mx-auto my-12">
        <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold font-serif text-neutral-900 dark:text-neutral-100">
          Super Admin Authorization Required
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
          Site-wide configuration, monetization ads, ticker broadcasts, and editorial parameters can only be altered by the <span className="font-bold text-red-600 dark:text-red-400">Super Administrator</span>.
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-100">
              Site Governance & System Settings
            </h1>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[10px] font-black uppercase rounded tracking-wider">
              Super Admin Only
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Global controls for broadcast breaking ticker, banner ads, and reader engagement rules.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-lg text-xs font-bold">
            <Check className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Breaking News Ticker Settings */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <Radio className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Breaking News Ticker Broadcast
                </h3>
                <p className="text-xs text-neutral-500">
                  Controls the live marquee ticker at the top of the newspaper front page.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.breakingNewsEnabled}
                onChange={(e) => setFormData({ ...formData, breakingNewsEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1">
              Ticker Headline Text (Bullet • separated)
            </label>
            <textarea
              rows={3}
              value={formData.breakingTickerText}
              onChange={(e) => setFormData({ ...formData, breakingTickerText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none font-sans"
            />
          </div>
        </div>

        {/* Ad Placements & Monetization */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Dynamic Ad Banner Widgets
                </h3>
                <p className="text-xs text-neutral-500">
                  Toggle advertising displays (Leaderboard 728x90 and Sidebar 300x250).
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.adBannersEnabled}
                onChange={(e) => setFormData({ ...formData, adBannersEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            When disabled, advertisement units across the header, body columns, and footer are cleanly hidden from readers for an ad-free editorial reading experience.
          </p>
        </div>

        {/* Reader Comments & Moderation Rules */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Reader Commenting Policy
                </h3>
                <p className="text-xs text-neutral-500">
                  Control discussion forums on all published reports.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowComments}
                onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Instant Auto-Approve Comments
              </p>
              <p className="text-xs text-neutral-500">
                If off, comments are held in editorial review before appearing publicly.
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.autoApproveComments}
              onChange={(e) => setFormData({ ...formData, autoApproveComments: e.target.checked })}
              className="w-4 h-4 text-red-600 rounded border-neutral-300 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save System Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};
