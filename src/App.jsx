import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CountryDetail } from './components/CountryDetail';
import { FavoritesPage } from './components/FavoritesPage';
import { initDatabase } from './db/database';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white">

        {/* Navigation Bar */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedContinent={selectedContinent}
          setSelectedContinent={setSelectedContinent}
        />

        {/* Main Route Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchQuery={searchQuery}
                  selectedContinent={selectedContinent}
                  setSelectedContinent={setSelectedContinent}
                />
              }
            />
            <Route path="/country/:code" element={<CountryDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} World Flavors PWA. Exploring culinary traditions of 194 UN countries.</p>
        </footer>

      </div>
    </Router>
  );
}
