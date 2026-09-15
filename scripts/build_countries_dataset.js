import fs from 'fs';
import path from 'path';

// Helper to generate unsplash high quality food images based on dish keywords
const getDishImage = (dishName, category) => {
  const query = encodeURIComponent(`${dishName} food`);
  return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80`;
};

// Full list of 194 UN-recognized countries with codes, continent, and flags
const rawCountries = [
  // AFRIKA (54 countries)
  { code: "DZ", name: "Algeria", continent: "Africa", flag: "🇩🇿" },
  { code: "AO", name: "Angola", continent: "Africa", flag: "🇦🇴" },
  { code: "BJ", name: "Benin", continent: "Africa", flag: "🇧🇯" },
  { code: "BW", name: "Botswana", continent: "Africa", flag: "🇧🇼" },
  { code: "BF", name: "Burkina Faso", continent: "Africa", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", continent: "Africa", flag: "🇧🇮" },
  { code: "CV", name: "Cabo Verde", continent: "Africa", flag: "🇨🇻" },
  { code: "CM", name: "Cameroon", continent: "Africa", flag: "🇨🇲" },
  { code: "CF", name: "Central African Republic", continent: "Africa", flag: "🇨🇫" },
  { code: "TD", name: "Chad", continent: "Africa", flag: "🇹🇩" },
  { code: "KM", name: "Comoros", continent: "Africa", flag: "🇰🇲" },
  { code: "CG", name: "Congo", continent: "Africa", flag: "🇨🇬" },
  { code: "CD", name: "DR Congo", continent: "Africa", flag: "🇨🇩" },
  { code: "DJ", name: "Djibouti", continent: "Africa", flag: "🇩🇯" },
  { code: "EG", name: "Egypt", continent: "Africa", flag: "🇪🇬" },
  { code: "GQ", name: "Equatorial Guinea", continent: "Africa", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", continent: "Africa", flag: "🇪🇷" },
  { code: "SZ", name: "Eswatini", continent: "Africa", flag: "🇸🇿" },
  { code: "ET", name: "Ethiopia", continent: "Africa", flag: "🇪🇹" },
  { code: "GA", name: "Gabon", continent: "Africa", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", continent: "Africa", flag: "🇬🇲" },
  { code: "GH", name: "Ghana", continent: "Africa", flag: "🇬🇭" },
  { code: "GN", name: "Guinea", continent: "Africa", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", continent: "Africa", flag: "🇬🇼" },
  { code: "CI", name: "Ivory Coast", continent: "Africa", flag: "🇨🇮" },
  { code: "KE", name: "Kenya", continent: "Africa", flag: "🇰🇪" },
  { code: "LS", name: "Lesotho", continent: "Africa", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", continent: "Africa", flag: "🇱🇷" },
  { code: "LY", name: "Libya", continent: "Africa", flag: "🇱🇾" },
  { code: "MG", name: "Madagascar", continent: "Africa", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", continent: "Africa", flag: "🇲🇼" },
  { code: "ML", name: "Mali", continent: "Africa", flag: "🇲🇱" },
  { code: "MR", name: "Mauritania", continent: "Africa", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", continent: "Africa", flag: "🇲🇺" },
  { code: "MA", name: "Morocco", continent: "Africa", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", continent: "Africa", flag: "🇲🇿" },
  { code: "NA", name: "Namibia", continent: "Africa", flag: "🇳🇦" },
  { code: "NE", name: "Niger", continent: "Africa", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", continent: "Africa", flag: "🇳🇬" },
  { code: "RW", name: "Rwanda", continent: "Africa", flag: "🇷🇼" },
  { code: "ST", name: "Sao Tome and Principe", continent: "Africa", flag: "🇸🇹" },
  { code: "SN", name: "Senegal", continent: "Africa", flag: "🇸🇳" },
  { code: "SC", name: "Seychelles", continent: "Africa", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", continent: "Africa", flag: "🇸🇱" },
  { code: "SO", name: "Somalia", continent: "Africa", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", continent: "Africa", flag: "🇿🇦" },
  { code: "SS", name: "South Sudan", continent: "Africa", flag: "🇸🇸" },
  { code: "SD", name: "Sudan", continent: "Africa", flag: "🇸🇩" },
  { code: "TZ", name: "Tanzania", continent: "Africa", flag: "🇹🇿" },
  { code: "TG", name: "Togo", continent: "Africa", flag: "🇹🇬" },
  { code: "TN", name: "Tunisia", continent: "Africa", flag: "🇹🇳" },
  { code: "UG", name: "Uganda", continent: "Africa", flag: "🇺🇬" },
  { code: "ZM", name: "Zambia", continent: "Africa", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", continent: "Africa", flag: "🇿🇼" },

  // AMERICAS (35 countries)
  { code: "AG", name: "Antigua and Barbuda", continent: "Americas", flag: "🇦🇬" },
  { code: "AR", name: "Argentina", continent: "Americas", flag: "🇦🇷" },
  { code: "BS", name: "Bahamas", continent: "Americas", flag: "🇧🇸" },
  { code: "BB", name: "Barbados", continent: "Americas", flag: "🇧🇧" },
  { code: "BZ", name: "Belize", continent: "Americas", flag: "🇧🇿" },
  { code: "BO", name: "Bolivia", continent: "Americas", flag: "🇧🇴" },
  { code: "BR", name: "Brazil", continent: "Americas", flag: "🇧🇷" },
  { code: "CA", name: "Canada", continent: "Americas", flag: "🇨🇦" },
  { code: "CL", name: "Chile", continent: "Americas", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", continent: "Americas", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", continent: "Americas", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", continent: "Americas", flag: "🇨🇺" },
  { code: "DM", name: "Dominica", continent: "Americas", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", continent: "Americas", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", continent: "Americas", flag: "🇪🇨" },
  { code: "SV", name: "El Salvador", continent: "Americas", flag: "🇸🇻" },
  { code: "GD", name: "Grenada", continent: "Americas", flag: "🇬🇩" },
  { code: "GT", name: "Guatemala", continent: "Americas", flag: "🇬🇹" },
  { code: "GY", name: "Guyana", continent: "Americas", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", continent: "Americas", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", continent: "Americas", flag: "🇭🇳" },
  { code: "JM", name: "Jamaica", continent: "Americas", flag: "🇯🇲" },
  { code: "MX", name: "Mexico", continent: "Americas", flag: "🇲🇽" },
  { code: "NI", name: "Nicaragua", continent: "Americas", flag: "🇳🇮" },
  { code: "PA", name: "Panama", continent: "Americas", flag: "🇵🇦" },
  { code: "PY", name: "Paraguay", continent: "Americas", flag: "🇵🇾" },
  { code: "PE", name: "Peru", continent: "Americas", flag: "🇵🇪" },
  { code: "KN", name: "Saint Kitts and Nevis", continent: "Americas", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", continent: "Americas", flag: "🇱🇨" },
  { code: "VC", name: "Saint Vincent and the Grenadines", continent: "Americas", flag: "🇻🇨" },
  { code: "SR", name: "Suriname", continent: "Americas", flag: "🇸🇷" },
  { code: "TT", name: "Trinidad and Tobago", continent: "Americas", flag: "🇹🇹" },
  { code: "US", name: "United States", continent: "Americas", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", continent: "Americas", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", continent: "Americas", flag: "🇻🇪" },

  // ASIA (47 countries)
  { code: "AF", name: "Afghanistan", continent: "Asia", flag: "🇦🇫" },
  { code: "AM", name: "Armenia", continent: "Asia", flag: "🇦🇲" },
  { code: "AZ", name: "Azerbaijan", continent: "Asia", flag: "🇦🇿" },
  { code: "BH", name: "Bahrain", continent: "Asia", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", continent: "Asia", flag: "🇧🇩" },
  { code: "BT", name: "Bhutan", continent: "Asia", flag: "🇧🇹" },
  { code: "BN", name: "Brunei", continent: "Asia", flag: "🇧🇳" },
  { code: "KH", name: "Cambodia", continent: "Asia", flag: "🇰🇭" },
  { code: "CN", name: "China", continent: "Asia", flag: "🇨🇳" },
  { code: "CY", name: "Cyprus", continent: "Asia", flag: "🇨🇾" },
  { code: "GE", name: "Georgia", continent: "Asia", flag: "🇬🇪" },
  { code: "IN", name: "India", continent: "Asia", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", continent: "Asia", flag: "🇮🇩" },
  { code: "IR", name: "Iran", continent: "Asia", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", continent: "Asia", flag: "🇮🇶" },
  { code: "IL", name: "Israel", continent: "Asia", flag: "🇮🇱" },
  { code: "JP", name: "Japan", continent: "Asia", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", continent: "Asia", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", continent: "Asia", flag: "🇰🇿" },
  { code: "KW", name: "Kuwait", continent: "Asia", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", continent: "Asia", flag: "🇰🇬" },
  { code: "LA", name: "Laos", continent: "Asia", flag: "🇱🇦" },
  { code: "LB", name: "Lebanon", continent: "Asia", flag: "🇱🇧" },
  { code: "MY", name: "Malaysia", continent: "Asia", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", continent: "Asia", flag: "🇲🇻" },
  { code: "MN", name: "Mongolia", continent: "Asia", flag: "🇲🇳" },
  { code: "MM", name: "Myanmar", continent: "Asia", flag: "🇲🇲" },
  { code: "NP", name: "Nepal", continent: "Asia", flag: "🇳🇵" },
  { code: "KP", name: "North Korea", continent: "Asia", flag: "🇰🇵" },
  { code: "OM", name: "Oman", continent: "Asia", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", continent: "Asia", flag: "🇵🇰" },
  { code: "PS", name: "Palestine", continent: "Asia", flag: "🇵🇸" },
  { code: "PH", name: "Philippines", continent: "Asia", flag: "🇵🇭" },
  { code: "QA", name: "Qatar", continent: "Asia", flag: "🇶🇦" },
  { code: "SA", name: "Saudi Arabia", continent: "Asia", flag: "🇸🇦" },
  { code: "SG", name: "Singapore", continent: "Asia", flag: "🇸🇬" },
  { code: "KR", name: "South Korea", continent: "Asia", flag: "🇰🇷" },
  { code: "LK", name: "Sri Lanka", continent: "Asia", flag: "🇱🇰" },
  { code: "SY", name: "Syria", continent: "Asia", flag: "🇸🇾" },
  { code: "TJ", name: "Tajikistan", continent: "Asia", flag: "🇹🇯" },
  { code: "TH", name: "Thailand", continent: "Asia", flag: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", continent: "Asia", flag: "🇹🇱" },
  { code: "TR", name: "Turkey", continent: "Asia", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", continent: "Asia", flag: "🇹🇲" },
  { code: "AE", name: "United Arab Emirates", continent: "Asia", flag: "🇦🇪" },
  { code: "UZ", name: "Uzbekistan", continent: "Asia", flag: "🇺🇿" },
  { code: "VN", name: "Vietnam", continent: "Asia", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", continent: "Asia", flag: "🇾🇪" },

  // EUROPE (44 countries)
  { code: "AL", name: "Albania", continent: "Europe", flag: "🇦🇱" },
  { code: "AD", name: "Andorra", continent: "Europe", flag: "🇦🇩" },
  { code: "AT", name: "Austria", continent: "Europe", flag: "🇦🇹" },
  { code: "BY", name: "Belarus", continent: "Europe", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", continent: "Europe", flag: "🇧🇪" },
  { code: "BA", name: "Bosnia and Herzegovina", continent: "Europe", flag: "🇧🇦" },
  { code: "BG", name: "Bulgaria", continent: "Europe", flag: "🇧🇬" },
  { code: "HR", name: "Croatia", continent: "Europe", flag: "🇭🇷" },
  { code: "CZ", name: "Czech Republic", continent: "Europe", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", continent: "Europe", flag: "🇩🇰" },
  { code: "EE", name: "Estonia", continent: "Europe", flag: "🇪🇪" },
  { code: "FI", name: "Finland", continent: "Europe", flag: "🇫🇮" },
  { code: "FR", name: "France", continent: "Europe", flag: "🇫🇷" },
  { code: "DE", name: "Germany", continent: "Europe", flag: "🇩🇪" },
  { code: "GR", name: "Greece", continent: "Europe", flag: "🇬🇷" },
  { code: "HU", name: "Hungary", continent: "Europe", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", continent: "Europe", flag: "🇮🇸" },
  { code: "IE", name: "Ireland", continent: "Europe", flag: "🇮🇪" },
  { code: "IT", name: "Italy", continent: "Europe", flag: "🇮🇹" },
  { code: "LV", name: "Latvia", continent: "Europe", flag: "🇱🇻" },
  { code: "LI", name: "Liechtenstein", continent: "Europe", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", continent: "Europe", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", continent: "Europe", flag: "🇱🇺" },
  { code: "MT", name: "Malta", continent: "Europe", flag: "🇲🇹" },
  { code: "MD", name: "Moldova", continent: "Europe", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", continent: "Europe", flag: "🇲🇨" },
  { code: "ME", name: "Montenegro", continent: "Europe", flag: "🇲🇪" },
  { code: "NL", name: "Netherlands", continent: "Europe", flag: "🇳🇱" },
  { code: "MK", name: "North Macedonia", continent: "Europe", flag: "🇲🇰" },
  { code: "NO", name: "Norway", continent: "Europe", flag: "🇳🇴" },
  { code: "PL", name: "Poland", continent: "Europe", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", continent: "Europe", flag: "🇵🇹" },
  { code: "RO", name: "Romania", continent: "Europe", flag: "🇷🇴" },
  { code: "RU", name: "Russia", continent: "Europe", flag: "🇷🇺" },
  { code: "SM", name: "San Marino", continent: "Europe", flag: "🇸🇲" },
  { code: "RS", name: "Serbia", continent: "Europe", flag: "🇸🇷" },
  { code: "SK", name: "Slovakia", continent: "Europe", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", continent: "Europe", flag: "🇸🇮" },
  { code: "ES", name: "Spain", continent: "Europe", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", continent: "Europe", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", continent: "Europe", flag: "🇨🇭" },
  { code: "UA", name: "Ukraine", continent: "Europe", flag: "🇺🇦" },
  { code: "GB", name: "United Kingdom", continent: "Europe", flag: "🇬🇧" },
  { code: "VA", name: "Vatican City", continent: "Europe", flag: "🇻🇦" },

  // OCEANIA (14 countries)
  { code: "AU", name: "Australia", continent: "Oceania", flag: "🇦🇺" },
  { code: "FJ", name: "Fiji", continent: "Oceania", flag: "🇫🇯" },
  { code: "KI", name: "Kiribati", continent: "Oceania", flag: "🇰🇮" },
  { code: "MH", name: "Marshall Islands", continent: "Oceania", flag: "🇲🇭" },
  { code: "FM", name: "Micronesia", continent: "Oceania", flag: "🇫🇲" },
  { code: "NR", name: "Nauru", continent: "Oceania", flag: "🇳🇷" },
  { code: "NZ", name: "New Zealand", continent: "Oceania", flag: "🇳🇿" },
  { code: "PW", name: "Palau", continent: "Oceania", flag: "🇵🇼" },
  { code: "PG", name: "Papua New Guinea", continent: "Oceania", flag: "🇵🇬" },
  { code: "WS", name: "Samoa", continent: "Oceania", flag: "🇼🇸" },
  { code: "SB", name: "Solomon Islands", continent: "Oceania", flag: "🇸🇧" },
  { code: "TO", name: "Tonga", continent: "Oceania", flag: "🇹🇴" },
  { code: "TV", name: "Tuvalu", continent: "Oceania", flag: "🇹🇻" },
  { code: "VU", name: "Vanuatu", continent: "Oceania", flag: "🇻🇺" }
];

// Rich custom dishes for sample countries
const populatedDishes = {
  IN: [
    {
      id: "IN-1",
      name: "Butter Chicken",
      localName: "Murgh Makhani",
      description: "A world-renowned Indian curry featuring tender marinated chicken cooked in a smooth, creamy tomato and butter sauce. It is seasoned with aromatic spices like garam masala, cumin, and fenugreek leaves.",
      ingredients: ["Chicken", "Tomatoes", "Cream", "Butter", "Garam Masala", "Ginger", "Garlic"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-2",
      name: "Biryani",
      localName: "Hyderabadi Biryani",
      description: "An aromatic rice dish made with long-grain basmati rice, tender meat or vegetables, and infused with saffron and spices. It is slow-cooked in a sealed pot using the dum method.",
      ingredients: ["Basmati Rice", "Mutton or Chicken", "Saffron", "Yogurt", "Onions", "Spices"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-3",
      name: "Samosa",
      localName: "Samosa",
      description: "A popular fried or baked pastry with a savory filling of spiced potatoes, green peas, and herbs. Usually served crisp with mint and tamarind chutney.",
      ingredients: ["Flour pastry", "Potatoes", "Peas", "Cumin", "Coriander", "Green Chilies"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-4",
      name: "Masala Dosa",
      localName: "Masala Dosa",
      description: "A thin, crispy fermented rice and lentil crepe stuffed with a spiced mashed potato filling. Served hot alongside coconut chutney and lentil sambar.",
      ingredients: ["Rice", "Urad Dal", "Potatoes", "Mustard Seeds", "Curry Leaves", "Turmeric"],
      category: "breakfast",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-5",
      name: "Gulab Jamun",
      localName: "Gulab Jamun",
      description: "Soft, spongy milk-solid balls fried to a golden hue and soaked in warm, aromatic rose and cardamom sugar syrup. One of India's most cherished desserts.",
      ingredients: ["Khoya (milk solids)", "Flour", "Sugar", "Rose Water", "Cardamom", "Pistachios"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-6",
      name: "Pani Puri",
      localName: "Golgappa / Phuchka",
      description: "Crispy hollow dough balls filled with spicy mashed potatoes or chickpeas, dipped in tangy mint and tamarind water. Eaten whole in one burst of flavor.",
      ingredients: ["Semolina Puri", "Potatoes", "Chickpeas", "Mint Water", "Tamarind Chutney"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-7",
      name: "Palak Paneer",
      localName: "Palak Paneer",
      description: "A classic North Indian vegetarian staple consisting of fresh Indian cottage cheese cubes in a smooth, vibrant spinach puree cooked with garlic and mild spices.",
      ingredients: ["Spinach", "Paneer Cheese", "Garlic", "Cream", "Garam Masala", "Onions"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-8",
      name: "Chole Bhature",
      localName: "Chole Bhature",
      description: "A spicy chickpea curry (chole) paired with giant, fluffy fried leavened bread (bhature). A heart-warming breakfast and lunch favorite across North India.",
      ingredients: ["Chickpeas", "Tomatoes", "Spices", "Refined Flour", "Yogurt", "Pickle"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-9",
      name: "Chicken Tikka Masala",
      localName: "Chicken Tikka Masala",
      description: "Roasted marinated chicken chunks in a rich, spiced tomato and cream gravy. Pairs wonderfully with freshly baked garlic naan bread.",
      ingredients: ["Chicken", "Yogurt", "Tomato Sauce", "Garlic", "Ginger", "Kashmiri Chili"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IN-10",
      name: "Jalebi",
      localName: "Jalebi",
      description: "Pretzel-like deep-fried batter coils soaked in hot saffron-infused sugar syrup. Crisp on the outside and bursting with sweet syrup inside.",
      ingredients: ["Maida Flour", "Saffron Syrup", "Yogurt", "Ghee", "Cardamom"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
    }
  ],
  IT: [
    {
      id: "IT-1",
      name: "Neapolitan Pizza",
      localName: "Pizza Napoletana",
      description: "The classic wood-fired pizza with a puffy leopard-spotted crust, rich San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.",
      ingredients: ["Wheat Flour", "San Marzano Tomatoes", "Fresh Mozzarella", "Basil", "Olive Oil"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-2",
      name: "Spaghetti Carbonara",
      localName: "Spaghetti alla Carbonara",
      description: "A traditional Roman pasta dish made with crispy guanciale, egg yolks, Pecorino Romano cheese, and freshly cracked black pepper without any cream.",
      ingredients: ["Spaghetti", "Guanciale", "Egg Yolks", "Pecorino Romano Cheese", "Black Pepper"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-3",
      name: "Tiramisu",
      localName: "Tiramisù",
      description: "An iconic Italian dessert featuring espresso-soaked ladyfingers layered with whipped mascarpone cream and dusted generously with cocoa powder.",
      ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Eggs", "Sugar", "Cocoa Powder"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-4",
      name: "Lasagna Bolognese",
      localName: "Lasagne alla Bolognese",
      description: "Layered sheets of fresh pasta filled with slow-cooked ragù bolognese meat sauce, silky béchamel, and melted Parmigiano-Reggiano cheese.",
      ingredients: ["Pasta Sheets", "Ragù Bolognese", "Béchamel Sauce", "Parmigiano-Reggiano"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-5",
      name: "Risotto alla Milanese",
      localName: "Risotto alla Milanese",
      description: "Creamy Arborio rice slow-cooked in broth and infused with golden saffron strands and grated parmesan, finished with butter.",
      ingredients: ["Arborio Rice", "Saffron", "Beef Stock", "Butter", "Parmigiano-Reggiano"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-6",
      name: "Gelato",
      localName: "Gelato Artigianale",
      description: "Rich, dense Italian ice cream made with less fat and churned slowly to deliver an intense flavor profile and silky texture.",
      ingredients: ["Milk", "Cream", "Sugar", "Natural Flavors (Pistachio, Hazelnut, Cocoa)"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1567206563064-6f60f4078b57?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-7",
      name: "Arancini",
      localName: "Arancini di Riso",
      description: "Crispy fried Sicilian rice balls stuffed with savory ragù, green peas, and melted mozzarella, coated in breadcrumbs.",
      ingredients: ["Risotto Rice", "Meat Ragù", "Mozzarella", "Breadcrumbs", "Peas"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-8",
      name: "Caprese Salad",
      localName: "Insalata Caprese",
      description: "A simple Italian salad originating from Capri, showcasing sliced fresh mozzarella, ripe tomatoes, basil leaves, and balsamic glaze.",
      ingredients: ["Fresh Mozzarella", "Ripe Tomatoes", "Fresh Basil", "Extra Virgin Olive Oil"],
      category: "starter",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-9",
      name: "Bruschetta",
      localName: "Bruschetta al Pomodoro",
      description: "Grilled garlic-rubbed bread topped with diced vine tomatoes, fresh basil, garlic, and drizzled with premium olive oil.",
      ingredients: ["Rustic Bread", "Vine Tomatoes", "Garlic", "Basil", "Olive Oil"],
      category: "starter",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "IT-10",
      name: "Cannoli",
      localName: "Cannoli Siciliani",
      description: "Crispy fried pastry shells filled with a sweet, creamy ricotta filling, often studded with chocolate chips or candied fruit.",
      ingredients: ["Pastry Shells", "Sweetened Ricotta", "Chocolate Chips", "Pistachios"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    }
  ],
  JP: [
    {
      id: "JP-1",
      name: "Sushi",
      localName: "Sushi (握り寿司)",
      description: "Vinegared rice topped with fresh raw seafood like salmon, tuna, or sweet shrimp, served with wasabi and soy sauce.",
      ingredients: ["Sushi Rice", "Fresh Raw Fish", "Nori Seaweed", "Wasabi", "Soy Sauce"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-2",
      name: "Ramen",
      localName: "Ramen (ラーメン)",
      description: "Wheat noodles served in a rich flavorful broth made from pork bones or dashi, topped with chashu pork, soft-boiled egg, and scallions.",
      ingredients: ["Ramen Noodles", "Pork Broth", "Chashu Pork", "Ajitsuke Tamago Egg", "Green Onion"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-3",
      name: "Tempura",
      localName: "Tempura (天ぷら)",
      description: "Lightly battered and deep-fried seafood and fresh seasonal vegetables, crisp and delicate, served with tentsuyu dipping sauce.",
      ingredients: ["Shrimp", "Seasonal Vegetables", "Tempura Batter", "Dashi Dipping Sauce"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-4",
      name: "Takoyaki",
      localName: "Takoyaki (たこ焼き)",
      description: "Ball-shaped street snacks made of wheat flour batter cooked in a special molded pan and filled with minced octopus, topped with savory sauce.",
      ingredients: ["Octopus", "Batter", "Takoyaki Sauce", "Japanese Mayonnaise", "Bonito Flakes"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1528164344705-475426879e0d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-5",
      name: "Okonomiyaki",
      localName: "Okonomiyaki (お好み焼き)",
      description: "A savory Japanese pancake containing cabbage, pork belly, and seafood, grilled on a hot plate and dressed with okonomiyaki sauce.",
      ingredients: ["Flour Batter", "Shredded Cabbage", "Pork Belly", "Okonomiyaki Sauce", "Aonori"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-6",
      name: "Matcha Parfait",
      localName: "Matcha Parfait (抹茶パフェ)",
      description: "A layered Japanese dessert with matcha green tea ice cream, sweet red bean paste, mochi balls, and crunchy corn flakes.",
      ingredients: ["Matcha Ice Cream", "Anko Red Bean", "Mochi Balls", "Whipped Cream", "Matcha Powder"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-7",
      name: "Chicken Teriyaki",
      localName: "Chicken Teriyaki (照り焼きチキン)",
      description: "Grilled or broiled chicken glazed in a shiny, sweet-and-savory teriyaki sauce made from soy sauce, mirin, and sake.",
      ingredients: ["Chicken Thighs", "Soy Sauce", "Mirin", "Sake", "Sugar", "Sesame Seeds"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-8",
      name: "Miso Soup",
      localName: "Misoshiru (味噌汁)",
      description: "A comforting staple soup made from dashi stock mixed with fermented soybean paste (miso), tofu cubes, and wakame seaweed.",
      ingredients: ["Dashi Stock", "Miso Paste", "Tofu", "Wakame Seaweed", "Green Onion"],
      category: "soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-9",
      name: "Tonkatsu",
      localName: "Tonkatsu (とんかつ)",
      description: "A thick pork cutlet coated with crunchy panko breadcrumbs and deep-fried to golden perfection, served with shredded cabbage.",
      ingredients: ["Pork Loin", "Panko Breadcrumbs", "Tonkatsu Sauce", "Cabbage"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "JP-10",
      name: "Dorayaki",
      localName: "Dorayaki (どら焼き)",
      description: "Two sweet honey pancake-like patties sandwiched around a smooth, delicious sweet red bean paste (anko) filling.",
      ingredients: ["Pancake Batter", "Honey", "Azuki Red Bean Paste"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80"
    }
  ],
  MX: [
    {
      id: "MX-1",
      name: "Tacos al Pastor",
      localName: "Tacos al Pastor",
      description: "Thinly sliced marinted pork roasted on a vertical spit with pineapple, served on warm corn tortillas with cilantro and chopped onions.",
      ingredients: ["Pork Shoulder", "Achiote Paste", "Pineapple", "Corn Tortillas", "Cilantro", "Onions"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-2",
      name: "Guacamole",
      localName: "Guacamole",
      description: "Freshly mashed ripe avocados mixed with lime juice, diced tomatoes, onions, cilantro, and jalapeno peppers. Perfect with crisp tortilla chips.",
      ingredients: ["Avocados", "Lime Juice", "Tomatoes", "Onions", "Cilantro", "Jalapeno"],
      category: "starter",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-3",
      name: "Mole Poblano",
      localName: "Mole Poblano",
      description: "A complex savory sauce made with chili peppers, dark chocolate, nuts, and spices, served over tender chicken with sesame seeds.",
      ingredients: ["Chili Peppers", "Dark Chocolate", "Spices", "Nuts", "Chicken", "Sesame Seeds"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-4",
      name: "Chiles en Nogada",
      localName: "Chiles en Nogada",
      description: "Poblano chilies stuffed with picadillo (meat and dried fruits) topped with a walnut cream sauce and pomegranate seeds, representing flag colors.",
      ingredients: ["Poblano Pepper", "Minced Meat", "Dried Fruits", "Walnut Sauce", "Pomegranate Seeds"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-5",
      name: "Churros",
      localName: "Churros con Chocolate",
      description: "Fried dough pastries dusted in cinnamon sugar, served crispy and piping hot with thick melted chocolate for dipping.",
      ingredients: ["Churro Dough", "Cinnamon", "Sugar", "Dark Chocolate Sauce"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-6",
      name: "Tamales",
      localName: "Tamales",
      description: "Masa corn dough stuffed with seasoned meats, cheeses, or chilies, wrapped in corn husks and steamed until tender.",
      ingredients: ["Masa Harina", "Lard or Oil", "Shredded Chicken or Pork", "Salsa Verde", "Corn Husks"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-7",
      name: "Enchiladas",
      localName: "Enchiladas Verdes",
      description: "Corn tortillas rolled around seasoned chicken, smothered in tangy salsa verde, melted cheese, and fresh crema.",
      ingredients: ["Corn Tortillas", "Chicken", "Tomatillo Salsa", "Queso Fresco", "Crema"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-8",
      name: "Pozole",
      localName: "Pozole Rojo",
      description: "A traditional Mexican stew featuring tender hominy corn and pork cooked in a rich chili broth, garnished with radishes, cabbage, and lime.",
      ingredients: ["Hominy Corn", "Pork Shoulder", "Ancho & Guajillo Chilies", "Radishes", "Lime"],
      category: "soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-9",
      name: "Quesadilla",
      localName: "Quesadilla de Queso y Flor de Calabaza",
      description: "Folded tortillas griddled until golden brown with stringy melted Oaxaca cheese, herbs, or zucchini flowers.",
      ingredients: ["Tortilla", "Oaxaca Cheese", "Zucchini Flowers", "Salsa"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "MX-10",
      name: "Flan",
      localName: "Flan Napolitano",
      description: "A silky smooth baked custard dessert infused with vanilla and coated in a golden caramel sauce.",
      ingredients: ["Condensed Milk", "Evaporated Milk", "Eggs", "Vanilla", "Caramelized Sugar"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80"
    }
  ],
  FR: [
    {
      id: "FR-1",
      name: "Croissant",
      localName: "Croissant au Beurre",
      description: "Flaky, buttery viennoiserie pastry named for its historical crescent shape, featuring layered yeast-leavened dough.",
      ingredients: ["Butter", "Flour", "Yeast", "Milk", "Sugar"],
      category: "breakfast",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-2",
      name: "Coq au Vin",
      localName: "Coq au Vin",
      description: "Classic French stew where chicken is braised slowly with Burgundy red wine, lardons, mushrooms, and garlic.",
      ingredients: ["Chicken", "Burgundy Red Wine", "Bacon Lardons", "Mushrooms", "Pearl Onions"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-3",
      name: "Beef Bourguignon",
      localName: "Bœuf Bourguignon",
      description: "Tender beef chunks braised in rich red wine sauce with carrots, onions, garlic, and bouquet garni herbs.",
      ingredients: ["Beef Chuck", "Red Wine", "Beef Stock", "Carrots", "Mushrooms", "Herbs"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-4",
      name: "Ratatouille",
      localName: "Ratatouille",
      description: "A traditional Provençal stewed vegetable dish featuring eggplants, zucchini, bell peppers, tomatoes, and herbs de Provence.",
      ingredients: ["Eggplant", "Zucchini", "Bell Peppers", "Tomatoes", "Garlic", "Olive Oil"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-5",
      name: "Crème Brûlée",
      localName: "Crème Brûlée",
      description: "A rich custard base topped with a layer of hardened caramelized sugar made using a blowtorch.",
      ingredients: ["Heavy Cream", "Egg Yolks", "Sugar", "Vanilla Bean"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-6",
      name: "French Onion Soup",
      localName: "Soupe à l'Oignon",
      description: "Rich caramelized onion soup cooked in beef broth, served topped with toasted baguette slices and melted Gruyère cheese.",
      ingredients: ["Caramelized Onions", "Beef Broth", "Baguette", "Gruyère Cheese", "Thyme"],
      category: "soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-7",
      name: "Macarons",
      localName: "Macaron",
      description: "Delicate French meringue-based confection filled with ganache, buttercream, or jam in vivid colors.",
      ingredients: ["Almond Flour", "Egg Whites", "Sugar", "Buttercream / Ganache"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-8",
      name: "Quiche Lorraine",
      localName: "Quiche Lorraine",
      description: "A savory open-faced pastry crust tart baked with a custard of milk, eggs, crispy bacon, and cheese.",
      ingredients: ["Pie Crust", "Eggs", "Heavy Cream", "Smoked Bacon", "Swiss Cheese"],
      category: "breakfast",
      image: "https://images.unsplash.com/photo-1621236378699-8597faf6a176?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-9",
      name: "Crêpe Suzette",
      localName: "Crêpe Suzette",
      description: "Thin French pancakes served with a sauce of caramelized sugar, orange juice, grated orange peel, and flambéed Grand Marnier.",
      ingredients: ["Thin Crêpes", "Orange Juice", "Butter", "Grand Marnier Liqueur"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "FR-10",
      name: "Escargots de Bourgogne",
      localName: "Escargots de Bourgogne",
      description: "Burgundy land snails baked in their shells with rich garlic, parsley, and butter sauce.",
      ingredients: ["Land Snails", "Garlic Butter", "Parsley", "Shallots"],
      category: "starter",
      image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

// Generic categories for generating scaffolds
const categories = ["main course", "street food", "breakfast", "dessert", "soup", "starter"];

// Generic dish templates for scaffold generator
const dishTemplates = [
  { name: "National Stew", local: "Stew", desc: "A savory slow-cooked stew prepared with local meat, vegetables, and aromatic indigenous herbs." },
  { name: "Traditional Rice Bowl", local: "Rice Bowl", desc: "Fragrant steamed rice served with seasoned legumes, charred vegetables, and regional spices." },
  { name: "Spiced Flatbread", local: "Flatbread", desc: "Freshly baked artisan flatbread filled or served alongside savory herbal dips and oils." },
  { name: "Seafood Platter", local: "Fresh Catch", desc: "Pan-seared or grilled local fresh seafood tossed with citrus juice and sea salt." },
  { name: "Heritage Dumplings", local: "Dumplings", desc: "Steamed or fried dough pockets stuffed with minced vegetables and tender seasoned meats." },
  { name: "Street Skewer", local: "Skewer", desc: "Charcoal-grilled spiced meat skewers served hot with tangy dipping chili oil." },
  { name: "Herbal Noodle Soup", local: "Noodle Soup", desc: "A rich comforting noodle broth simmering with fresh herbs and slow-boiled vegetables." },
  { name: "Sweet Pastry", local: "Honey Cake", desc: "A golden crispy baked pastry drizzled with pure honey and sprinkled with chopped nuts." },
  { name: "Savory Pancake", local: "Griddle Cake", desc: "Pan-fried savory vegetable pancake served with house dipping sauce." },
  { name: "Spiced Meat Tart", local: "Meat Pie", desc: "Flaky baked pastry shell filled with seasoned minced meat and caramelized onions." }
];

const generateCountryDishes = (country) => {
  if (populatedDishes[country.code]) {
    return populatedDishes[country.code];
  }

  return dishTemplates.map((template, idx) => {
    const category = categories[idx % categories.length];
    return {
      id: `${country.code}-${idx + 1}`,
      name: `${country.name} ${template.name}`,
      localName: `${template.local} de ${country.name}`,
      description: `${template.desc} A beloved staple dish enjoyed across ${country.name} during family gatherings and local festivals.`,
      ingredients: ["Local Produce", "Regional Spices", "Olive Oil", "Fresh Herbs"],
      category: category,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
    };
  });
};

const fullCountriesData = rawCountries.map((c) => ({
  code: c.code,
  name: c.name,
  continent: c.continent,
  flag: c.flag,
  dishes: generateCountryDishes(c)
}));

const outputObj = {
  countries: fullCountriesData
};

const targetPath = path.resolve(process.cwd(), 'src/data/countries.json');
fs.writeFileSync(targetPath, JSON.stringify(outputObj, null, 2), 'utf-8');
console.log(`Successfully written ${fullCountriesData.length} countries and ${fullCountriesData.length * 10} dishes to ${targetPath}`);
