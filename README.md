# 🍛 World Flavors - Progressive Web App (PWA)

**World Flavors** is a Progressive Web App (PWA) built with **React**, **Vite**, **Tailwind CSS**, and **IndexedDB (Dexie.js)**. It showcases 10 popular dishes from all 194 UN-recognized countries around the world, complete with offline access, search, continent filters, dark mode, and local bookmarking.

---

## ✨ Key Features

1. **Complete Global Coverage (194 Countries)**
   - Grid and list view of all 194 UN-recognized nations with emoji flag icons.
   - Filterable by continent: *Africa, Americas, Asia, Europe, Oceania*.

2. **Rich Country & Dish Information**
   - 10 dishes per country featuring:
     - English Dish Name + Local Name
     - High-quality image (with offline caching)
     - 2-3 sentence description
     - Key ingredients list with badges
     - Category tags (*main course, street food, breakfast, dessert, soup, starter*)

3. **Unified Global Search**
   - Instant search bar filtering by country name or dish name (in English or local names).

4. **Offline Favorites (IndexedDB)**
   - Bookmark dishes locally using **Dexie.js** and IndexedDB for full offline reading anytime.

5. **PWA & Offline Capability**
   - Pre-configured Web App Manifest (`manifest.json`) and Service Worker powered by **Workbox** (`vite-plugin-pwa`).
   - `CacheFirst` strategy for remote images and `StaleWhileRevalidate` for app shell bundle.
   - Customized "Add to Home Screen" install banner responding to `beforeinstallprompt`.

6. **Responsive & Modern Design**
   - Mobile-first, sleek UI with Tailwind CSS.
   - Dark mode toggle with persistent user preference.

---

## 🏗️ Data Structure Schema

The data is structured as follows in `src/data/countries.json`:

```json
{
  "countries": [
    {
      "code": "IN",
      "name": "India",
      "continent": "Asia",
      "flag": "🇮🇳",
      "dishes": [
        {
          "id": "IN-1",
          "name": "Butter Chicken",
          "localName": "Murgh Makhani",
          "description": "A world-renowned Indian curry featuring tender marinated chicken cooked in a smooth, creamy tomato and butter sauce.",
          "ingredients": ["Chicken", "Tomatoes", "Cream", "Butter", "Garam Masala", "Ginger", "Garlic"],
          "category": "main course",
          "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ]
}
```

---

## 🛠️ Bulk Data Population Script

To bulk-add or update verified dishes for any specific country, use the included helper script `scripts/bulk_populate.js`:

```bash
node scripts/bulk_populate.js <COUNTRY_CODE> <PATH_TO_NEW_DISHES_JSON>
```

**Example:**
```bash
node scripts/bulk_populate.js MX my_mexican_dishes.json
```

The script will format the dishes, assign appropriate IDs, and update `src/data/countries.json` automatically.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Development Server
```bash
# Start Vite development server
npm run dev
```
Navigate to `http://localhost:5173`.

### Production Build
```bash
# Build production bundle with PWA service worker
npm run build
```

### Local Production Preview
```bash
# Preview production build locally
npm run preview
```

---

## ☁️ Deployment Instructions

### Deploying to Render (Static Site)
1. Push your code to GitHub / GitLab.
2. Log into [Render Dashboard](https://dashboard.render.com/) and click **New > Static Site**.
3. Connect your repository.
4. Set the following build options:
   - **Name:** `world-flavors-pwa`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**. Render will automatically build and deploy your PWA with HTTPS.

### Deploying to Vercel
```bash
npm install -g vercel
vercel
```

### Deploying to Netlify
1. Drag and drop the `dist/` directory after running `npm run build`.
2. Or link your repository with Build Command `npm run build` and Publish Directory `dist`.

---

## 📜 License
MIT
