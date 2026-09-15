import Dexie from 'dexie';
import countriesData from '../data/countries.json';

export const db = new Dexie('WorldFlavorsDB');

db.version(3).stores({
  countries: 'code, name, continent',
  dishes: 'id, countryCode, name, localName, category',
  favorites: 'id, countryCode, name, addedAt'
});

export async function initDatabase() {
  try {
    const countryCount = await db.countries.count();
    const dishCount = await db.dishes.count();
    const sampleDish = await db.dishes.first();

    const auDumpling = await db.dishes.get('AU-5');
    if (countryCount === 0 || dishCount === 0 || !sampleDish || !sampleDish.steps || (auDumpling && auDumpling.image.includes('photo-1541781774459-bb2af2f05b55'))) {
      console.log('Populating/Updating IndexedDB database...');

      const allCountries = countriesData.countries.map(c => ({
        code: c.code,
        name: c.name,
        continent: c.continent,
        flag: c.flag
      }));

      const allDishes = [];
      countriesData.countries.forEach(c => {
        if (c.dishes && Array.isArray(c.dishes)) {
          c.dishes.forEach(d => {
            allDishes.push({
              ...d,
              countryCode: c.code,
              countryName: c.name,
              countryFlag: c.flag
            });
          });
        }
      });

      await db.countries.clear();
      await db.dishes.clear();
      await db.countries.bulkAdd(allCountries);
      await db.dishes.bulkAdd(allDishes);
      console.log('IndexedDB database update complete.');
    }
  } catch (error) {
    console.error('Error initializing IndexedDB:', error);
    // Fallback in case of Dexie schema error
    try {
      await Dexie.delete('WorldFlavorsDB');
      const newDb = new Dexie('WorldFlavorsDB');
      newDb.version(2).stores({
        countries: 'code, name, continent',
        dishes: 'id, countryCode, name, localName, category',
        favorites: 'id, countryCode, name, addedAt'
      });
      const allCountries = countriesData.countries.map(c => ({
        code: c.code,
        name: c.name,
        continent: c.continent,
        flag: c.flag
      }));
      const allDishes = [];
      countriesData.countries.forEach(c => {
        if (c.dishes && Array.isArray(c.dishes)) {
          c.dishes.forEach(d => {
            allDishes.push({
              ...d,
              countryCode: c.code,
              countryName: c.name,
              countryFlag: c.flag
            });
          });
        }
      });
      await newDb.countries.bulkAdd(allCountries);
      await newDb.dishes.bulkAdd(allDishes);
    } catch (e) {
      console.error('Fallback DB reset error:', e);
    }
  }
}

// Helper methods for Favorites
export async function toggleFavorite(dish) {
  try {
    const existing = await db.favorites.get(dish.id);
    if (existing) {
      await db.favorites.delete(dish.id);
      return false; // removed
    } else {
      await db.favorites.add({
        ...dish,
        addedAt: new Date().toISOString()
      });
      return true; // added
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
}

export async function isFavorite(dishId) {
  try {
    const item = await db.favorites.get(dishId);
    return !!item;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
}

export async function getAllFavorites() {
  try {
    return await db.favorites.orderBy('addedAt').reverse().toArray();
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}
