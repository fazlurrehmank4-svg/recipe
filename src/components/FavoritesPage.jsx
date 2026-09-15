import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, toggleFavorite } from '../db/database';
import { Heart, Trash2, ArrowLeft, Tag, CheckCircle, Search, Utensils, ChefHat, PlayCircle } from 'lucide-react';
import { CountryFlag } from './CountryFlag';
import { DishModal } from './DishModal';

export function FavoritesPage() {
  const favorites = useLiveQuery(() => db.favorites.orderBy('addedAt').reverse().toArray(), []);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  if (!favorites) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredFavorites = favorites.filter(dish => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      dish.name.toLowerCase().includes(q) ||
      (dish.localName && dish.localName.toLowerCase().includes(q)) ||
      (dish.countryName && dish.countryName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Navigation & Header */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Countries
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="w-8 h-8 text-rose-500 fill-current" />
            Bookmarked Favorites
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your saved global culinary dishes available anytime offline.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search saved favorites..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 my-4 shadow-sm">
          <Utensils className="w-16 h-16 text-rose-300 dark:text-rose-900 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No favorite dishes saved yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            Click the heart icon on any dish card to bookmark it for quick offline access.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition"
          >
            Explore World Cuisines
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">No saved favorites match "{filterQuery}".</p>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFavorites.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Image & Header */}
              <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800">
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

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 capitalize shadow-md">
                    <Tag className="w-3 h-3 text-orange-400" />
                    {dish.category}
                  </span>
                  {dish.countryCode && (
                    <Link
                      to={`/country/${dish.countryCode}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-600/90 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-orange-500 transition"
                    >
                      <CountryFlag code={dish.countryCode} flag={dish.countryFlag} className="w-4 h-3" />
                      <span>{dish.countryName}</span>
                    </Link>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dish);
                  }}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition z-10"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Dish Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {dish.name}
                  </h2>
                  {dish.localName && dish.localName !== dish.name && (
                    <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-0.5 italic">
                      "{dish.localName}"
                    </p>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2 mb-4 line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients && dish.ingredients.slice(0, 4).map((ing, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {ing}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                    <span className="flex items-center gap-1.5">
                      <ChefHat className="w-4 h-4" /> View Full Step-by-Step Recipe
                    </span>
                    <PlayCircle className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Popup Modal */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isFav={true}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
}
