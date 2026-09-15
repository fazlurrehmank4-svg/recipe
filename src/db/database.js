import Dexie from 'dexie';
import countriesData from '../data/countries.json';

export const db = new Dexie('WorldFlavorsDB');

db.version(1).stores({
  countries: 'code, name, continent',
  dishes: 'id, countryCode, name, localName, category',
  favorites: 'id, countryCode, name, addedAt'
});

export async function initDatabase() {
  try {
    const countryCount = await db.countries.count();
    if (countryCount === 0) {
      console.log('Initializing IndexedDB with initial country and dish dataset...');

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

      await db.countries.bulkAdd(allCountries);
      await db.dishes.bulkAdd(allDishes);
      console.log('IndexedDB initialization complete.');
    }
  } catch (error) {
    console.error('Error initializing IndexedDB:', error);
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
