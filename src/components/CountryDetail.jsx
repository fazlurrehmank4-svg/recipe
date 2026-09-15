import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, toggleFavorite } from '../db/database';
import { ArrowLeft, Heart, Utensils, Tag, Layers, CheckCircle } from 'lucide-react';

export function CountryDetail() {
  const { code } = useParams();
  const countryCode = code ? code.toUpperCase() : '';

  const country = useLiveQuery(() => db.countries.get(countryCode), [countryCode]);
  const dishes = useLiveQuery(() => db.dishes.where('countryCode').equals(countryCode).toArray(), [countryCode]);
  const favorites = useLiveQuery(() => db.favorites.toArray(), []);

  const [filterCategory, setFilterCategory] = useState('All');

  if (!country || !dishes) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const favoriteIds = new Set(favorites ? favorites.map(f => f.id) : []);

  // Extract unique categories for this country's dishes
  const categories = ['All', ...Array.from(new Set(dishes.map(d => d.category)))];

  const filteredDishes = filterCategory === 'All'
    ? dishes
    : dishes.filter(d => d.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Countries
      </Link>

      {/* Country Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="text-6xl sm:text-7xl drop-shadow-md select-none">
              {country.flag}
            </span>
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                {country.continent}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                {country.name}
              </h1>
              <p className="text-orange-100 text-sm sm:text-base mt-1 font-medium">
                10 Traditional & Iconic National Dishes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border border-white/10 self-start sm:self-auto">
            <Utensils className="w-4 h-4 text-amber-300" />
            <span>{dishes.length} Dishes Cataloged</span>
          </div>
        </div>
      </div>

      {/* Filter by Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1 shrink-0">
          <Layers className="w-3.5 h-3.5" /> Category:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dishes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDishes.map((dish) => {
          const isFav = favoriteIds.has(dish.id);
          return (
            <div
              key={dish.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Dish Image Header */}
              <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                  }}
                />

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-md text-white border border-white/20 capitalize shadow-lg">
                    <Tag className="w-3 h-3 text-orange-400" />
                    {dish.category}
                  </span>
                </div>

                {/* Favorite Bookmark Button */}
                <button
                  onClick={() => toggleFavorite(dish)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg ${
                    isFav
                      ? 'bg-rose-500 text-white scale-110'
                      : 'bg-slate-900/60 text-white hover:bg-rose-500 hover:scale-110'
                  }`}
                  title={isFav ? "Remove from Favorites" : "Bookmark Dish"}
                  aria-label="Favorite Dish"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Dish Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-between gap-2">
                      <span>{dish.name}</span>
                    </h2>
                    {dish.localName && dish.localName !== dish.name && (
                      <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-0.5 italic">
                        Local name: "{dish.localName}"
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Ingredients List */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                    Key Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
