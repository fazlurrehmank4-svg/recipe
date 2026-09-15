import React, { useEffect } from 'react';
import { X, Heart, Tag, ExternalLink, CheckCircle, ChefHat, PlayCircle } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

export function DishModal({ dish, isFav, onToggleFavorite, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-100 dark:bg-slate-800 shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-lg hover:scale-105 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 capitalize shadow-lg">
              <Tag className="w-3.5 h-3.5 text-orange-400" />
              {dish.category}
            </span>
          </div>

          {/* Dish Header Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end gap-4">
            <div>
              {dish.countryFlag && (
                <div className="flex items-center gap-2 mb-1">
                  <CountryFlag code={dish.countryCode} flag={dish.countryFlag} className="w-6 h-4 text-sm" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {dish.countryName}
                  </span>
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                {dish.name}
              </h2>
              {dish.localName && dish.localName !== dish.name && (
                <p className="text-sm font-semibold text-orange-300 italic">
                  Local name: "{dish.localName}"
                </p>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(dish)}
              className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-200 shadow-xl shrink-0 ${
                isFav
                  ? 'bg-rose-500 text-white scale-105'
                  : 'bg-slate-900/70 text-white hover:bg-rose-500 hover:scale-105'
              }`}
              title={isFav ? "Remove from Favorites" : "Bookmark Dish"}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              About this dish
            </h3>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-base font-normal">
              {dish.description}
            </p>
          </div>

          {/* Key Ingredients */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Key Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients && dish.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-200 border border-orange-200/50 dark:border-orange-800/40 text-xs font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-Step Recipe Instructions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-5 h-5 text-orange-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step-by-Step Recipe
              </h3>
            </div>
            {dish.steps && dish.steps.length > 0 ? (
              <ol className="space-y-3">
                {dish.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs shrink-0 shadow-sm mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-slate-500 italic">No instructions available.</p>
            )}
          </div>

          {/* YouTube Recipe Video Link Button */}
          {dish.youtubeUrl && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={dish.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg hover:shadow-red-600/30 transition-all group"
              >
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch Video Recipe on YouTube</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
