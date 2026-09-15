import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Utensils, Heart, Search, Download, Globe, Languages } from 'lucide-react';
import { db } from '../db/database';
import { useLiveQuery } from 'dexie-react-hooks';
import { useLanguage } from '../context/LanguageContext';

export function Header({ searchQuery, setSearchQuery, selectedContinent, setSelectedContinent }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const { lang, setLang, t, currentLangObj, LANGUAGES } = useLanguage();

  const location = useLocation();
  const navigate = useNavigate();

  // Live Query for total favorites count
  const favoritesCount = useLiveQuery(
    async () => {
      return await db.favorites.count();
    },
    [],
    0
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="bg-orange-600 text-white px-4 py-2 flex items-center justify-between text-sm font-medium shadow-inner">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            <span>{t.installBannerText}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {t.installBtn}
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-orange-200 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                {t.appName}
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
                {t.subtitle}
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 border border-slate-200 dark:border-slate-700 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {t.clearSearch}
                </button>
              )}
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition border border-slate-200 dark:border-slate-700"
                title="Change Language"
              >
                <span className="text-base leading-none">{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
                <Languages className="w-3.5 h-3.5 text-orange-500" />
              </button>

              {showLangMenu && (
                <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                    Select Language
                  </div>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left ltr:text-left rtl:text-right px-3.5 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition ${
                        lang === l.code ? 'text-orange-600 font-bold bg-orange-50/50 dark:bg-orange-950/20' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <div className="flex flex-col">
                        <span>{l.nativeName}</span>
                        <span className="text-[10px] text-slate-400">{l.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorites Link */}
            <Link
              to="/favorites"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-sm font-semibold transition"
              title="View Favorite Dishes"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{t.favorites}</span>
              {favoritesCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder={t.searchMobilePlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 border border-slate-200 dark:border-slate-700 transition"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
