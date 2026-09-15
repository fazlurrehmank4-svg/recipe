import fs from 'fs';
import path from 'path';

/**
 * Utility script to bulk add or update dish data for a specific country in src/data/countries.json
 *
 * Usage:
 * node scripts/bulk_populate.js <COUNTRY_CODE> <PATH_TO_NEW_DISHES_JSON>
 *
 * Example:
 * node scripts/bulk_populate.js IN new_india_dishes.json
 */

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node scripts/bulk_populate.js <COUNTRY_CODE> <PATH_TO_DISHES_JSON>");
  console.log("Example format for dishes JSON array:");
  console.log(JSON.stringify([
    {
      "name": "Dish Name",
      "localName": "Local Dish Name",
      "description": "2-3 sentences description...",
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "category": "main course",
      "image": "https://..."
    }
  ], null, 2));
  process.exit(1);
}

const countryCode = args[0].toUpperCase();
const dishesFilePath = path.resolve(process.cwd(), args[1]);

const datasetPath = path.resolve(process.cwd(), 'src/data/countries.json');

try {
  const datasetRaw = fs.readFileSync(datasetPath, 'utf-8');
  const dataset = JSON.parse(datasetRaw);

  const newDishesRaw = fs.readFileSync(dishesFilePath, 'utf-8');
  const newDishes = JSON.parse(newDishesRaw);

  const countryIndex = dataset.countries.findIndex(c => c.code === countryCode);
  if (countryIndex === -1) {
    console.error(`Country code ${countryCode} not found in database.`);
    process.exit(1);
  }

  const formattedDishes = newDishes.map((dish, idx) => ({
    id: `${countryCode}-${idx + 1}`,
    name: dish.name,
    localName: dish.localName || dish.name,
    description: dish.description || "Delicacy with local ingredients.",
    ingredients: dish.ingredients || [],
    category: dish.category || "main course",
    image: dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  }));

  dataset.countries[countryIndex].dishes = formattedDishes;

  fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 2), 'utf-8');
  console.log(`Successfully updated ${formattedDishes.length} dishes for country ${dataset.countries[countryIndex].name} (${countryCode})`);

} catch (err) {
  console.error("Error updating dishes:", err.message);
  process.exit(1);
}
