import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { Utensils, ChevronRight, Globe2, Compass } from 'lucide-react';
import { CountryFlag } from './CountryFlag';
import { useLanguage } from '../context/LanguageContext';

export function HomePage({ searchQuery, selectedContinent, setSelectedContinent }) {
  const { t } = useLanguage();

  const CONTINENTS = [
    { key: 'All', label: t.allContinents },
    { key: 'Africa', label: t.africa },
    { key: 'Americas', label: t.americas },
    { key: 'Asia', label: t.asia },
    { key: 'Europe', label: t.europe },
    { key: 'Oceania', label: t.oceania }
  ];

  // Query all countries and dishes from IndexedDB
  const countries = useLiveQuery(() => db.countries.toArray(), []);
  const dishes = useLiveQuery(() => db.dishes.toArray(), []);

  const isLoading = !countries || !dishes;

  // Filter countries by continent & search query (matching country name or dish name)
  const filteredCountries = useMemo(() => {
    if (!countries || !dishes) return [];

    let result = countries;

    if (selectedContinent && selectedContinent !== 'All') {
      result = result.filter(c => c.continent.toLowerCase() === selectedContinent.toLowerCase());
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      // Find country codes where at least one dish matches
      const matchingDishCountryCodes = new Set(
        dishes
          .filter(d => d.name.toLowerCase().includes(query) || (d.localName && d.localName.toLowerCase().includes(query)))
          .map(d => d.countryCode)
      );

      result = result.filter(
        c => c.name.toLowerCase().includes(query) || matchingDishCountryCodes.has(c.code)
      );
    }

    return result;
  }, [countries, dishes, selectedContinent, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Hero Banner / Continent Selector */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-7 h-7 text-orange-500" />
              {t.exploreTitle}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.exploreSubtitle}
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            {t.showingCount} <span className="text-orange-600 dark:text-orange-400 font-bold">{filteredCountries.length}</span> / {t.unNations}
          </div>
        </div>

        {/* Continent Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CONTINENTS.map(c => (
            <button
              key={c.key}
              onClick={() => setSelectedContinent(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedContinent === c.key
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {c.key === 'All' ? `🌐 ${c.label}` : c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl p-5 h-32 border border-slate-200 dark:border-slate-800" />
          ))}
        </div>
      ) : filteredCountries.length === 0 ? (
        /* Empty Search State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 my-8">
          <Globe2 className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t.noResultsTitle}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {t.noResultsSubtitle}
          </p>
          <button
            onClick={() => { setSelectedContinent('All'); }}
            className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold transition"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        /* Country Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.map(country => (
            <Link
              key={country.code}
              to={`/country/${country.code}`}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <CountryFlag code={country.code} flag={country.flag} className="w-12 h-9 text-2xl" />
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                      {country.name}
                    </h2>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      {country.continent}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Utensils className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.dishesCount}</span>
                </div>
                <div className="flex items-center text-orange-500 font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {t.explore} <ChevronRight className="w-3.5 h-3.5 ml-0.5 rtl:rotate-180" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
