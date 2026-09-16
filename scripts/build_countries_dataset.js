import fs from 'fs';
import path from 'path';

// Curated list of high-quality Unsplash food photo IDs
const foodPhotoIds = [
  "photo-1546069901-ba9599a7e63c", "photo-1567620905732-2d1ec7ab7445", "photo-1565299624946-b28f40a0ae38",
  "photo-1565958011703-44f9829ba187", "photo-1482049016688-2d3e1b311543", "photo-1484723091739-30a097e8f929",
  "photo-1476224203421-9ac39bcb3327", "photo-1498837167922-ddd27525d352", "photo-1493770348161-369560ae357d",
  "photo-1473093295043-cdd812d0e601", "photo-1504674900247-0877df9cc836", "photo-1512621776951-a57141f2eefd",
  "photo-1540420773420-3366772f4999", "photo-1555939594-58d7cb561ad1", "photo-1565299585323-38d6b0865b47",
  "photo-1513104890138-7c749659a591", "photo-1612874742237-6526221588e3", "photo-1571877227200-a0d98ea607e9",
  "photo-1574894709920-11b28e7367e3", "photo-1633964913295-ceb43826e7c9", "photo-1567206563064-6f60f4078b57",
  "photo-1595295333158-4742f28fbd85", "photo-1592417817098-8f3d6ef23a81", "photo-1572695157366-5e585ab2b69f",
  "photo-1551024709-8f23befc6f87", "photo-1579871494447-9811cf80d66c", "photo-1569718212165-3a8278d5f624",
  "photo-1615361200141-f45040f367be", "photo-1528164344705-475426879e0d", "photo-1541544741938-0af808871cc0",
  "photo-1505253716362-afaea1d3d1af", "photo-1617093727343-374698b1b08d", "photo-1547592166-23ac45744acd",
  "photo-1553621042-f6e147245754", "photo-1582293041079-7814c2f12063", "photo-1551504734-5ee1c4a1479b",
  "photo-1615870216519-2f9fa575fa5c", "photo-1624371414361-e670edf4898d", "photo-1534352956036-cd81e27dd615",
  "photo-1618040996337-56904b7850b9", "photo-1528975604071-b4dc52a2d18c", "photo-1555507036-ab1f4038808a",
  "photo-1600891964092-4316c288032e", "photo-1534422298391-e4f8c172dddb", "photo-1572453800999-e8d2d1589b7c",
  "photo-1470124182917-cc6e71b22ecc", "photo-1569864358642-9d1684040f43", "photo-1621236378699-8597faf6a176",
  "photo-1519676867240-f03562e64548", "photo-1588166524941-3bf61a9c41db", "photo-1563379091339-03b21ab4a4f8",
  "photo-1601050690597-df0568f70950", "photo-1668236543090-82eba5ee5976", "photo-1599488615731-7e5c2823ff28",
  "photo-1626777552726-4a6b54c97e46", "photo-1613292443284-8d10ef9383fe", "photo-1626132647523-66f5bf380027",
  "photo-1565557623262-b51c2513a641", "photo-1589301760014-d929f3979dbc", "photo-1540189549336-e6e99c3679fe",
  "photo-1568901346375-23c9450c58cd", "photo-1550547660-d9450f859349", "photo-1529042410759-befb1204b468",
  "photo-1544025162-d76694265947", "photo-1512152272829-2525146b6b5c", "photo-1563245372-f21724e3856d",
  "photo-1585032226651-759b368d7246", "photo-1509722747041-616f39b57569", "photo-1562967914-608f82629710",
  "photo-1543353071-10c8ba85a904", "photo-1532550907401-a500c9a57435", "photo-1525351484163-7529414344d8",
  "photo-1551183053-bf91a1d81141", "photo-1504754524776-8f4f37790ca0", "photo-1530595467537-0b5996c41f2d",
  "photo-1514944288352-fffac99f0bdf", "photo-1563245372-f21724e3856d", "photo-1579684947550-22e945225d9a",
  "photo-1586190848861-99aa4a171e90", "photo-1562059392-096320bccc7e", "photo-1533089860892-a7c6f0a88666",
  "photo-1506084868230-bb9d95c24759", "photo-1511690656952-34342bb7c2f2", "photo-1571091718767-18b5b1457add",
  "photo-1496116218417-1a781b1c416c", "photo-1585238342024-78d387f4a707", "photo-1513104890138-7c749659a591",
  "photo-1565299585323-38d6b0865b47", "photo-1550547660-d9450f859349", "photo-1567620905732-2d1ec7ab7445"
];

let globalImageIndex = 0;
const getUniqueDishImage = (dishName, category, countryCode, dishIdx) => {
  const photoId = foodPhotoIds[globalImageIndex % foodPhotoIds.length];
  globalImageIndex++;
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80&dish=${encodeURIComponent(countryCode.toLowerCase())}-${dishIdx}`;
};

const makeYoutubeUrl = (dishName) => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent("how to make " + dishName + " recipe")}`;
};

const generateRecipeSteps = (dishName, category) => {
  if (category === 'main course' || category === 'soup') {
    return [
      `Gather and prepare fresh ingredients for ${dishName}.`,
      "Heat oil or butter in a heavy-bottomed pot over medium-high heat.",
      "Sauté onions, garlic, and aromatics until golden brown and fragrant.",
      "Add main ingredients, pour in broth or sauce, cover and simmer over low heat.",
      "Garnish with fresh herbs and serve piping hot with fresh bread or rice."
    ];
  } else if (category === 'street food' || category === 'starter') {
    return [
      `Slice, dice, and marinate main ingredients for ${dishName}.`,
      "Prepare dipping chutneys, chili sauces, and fresh garnishes.",
      "Grill, pan-sear, or fry ingredients over medium-high heat until crispy and cooked.",
      "Assemble components on warm bread or serving dish.",
      "Drizzle with signature sauce, garnish with fresh herbs, and serve hot."
    ];
  } else if (category === 'dessert') {
    return [
      `Mix dry flour, sugar, and baking spices in a large bowl.`,
      "Whisk liquid ingredients (milk, butter, eggs, or vanilla) into a smooth batter.",
      "Bake, steam, or fry until cooked through and golden.",
      "Prepare warm sugar syrup, chocolate, or sweet glaze.",
      "Pour glaze over dessert, top with chopped nuts or fresh fruit, and serve."
    ];
  } else if (category === 'breakfast') {
    return [
      `Prepare fresh batter or ingredients for ${dishName}.`,
      "Heat a griddle or skillet with a dab of butter over medium heat.",
      "Cook until evenly golden on both sides and cooked through.",
      "Pair with fresh juice, tea, or hot coffee.",
      "Serve hot and fresh."
    ];
  } else {
    return [
      `Prepare ingredients for ${dishName}.`,
      "Combine ingredients and cook over medium heat.",
      "Season to taste with salt, pepper, and local herbs.",
      "Garnish with fresh greens and serve."
    ];
  }
};

// Full list of 194 UN-recognized countries with codes, continent, and flags
const rawCountries = [
  // AFRICA (54 countries)
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
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Marinate chicken in yogurt, garlic, ginger, lemon juice, and spices for at least 30 minutes.",
        "Sauté chicken in a skillet or grill until golden brown on all sides.",
        "Melt butter in a pan, add garlic, ginger, tomato puree, and simmer until thick.",
        "Blend sauce until smooth, then stir in heavy cream, garam masala, and dried fenugreek leaves.",
        "Simmer chicken in sauce for 10 minutes. Serve hot with garlic naan or basmati rice."
      ],
      youtubeUrl: makeYoutubeUrl("Butter Chicken Murgh Makhani")
    },
    {
      id: "IN-2",
      name: "Biryani",
      localName: "Hyderabadi Biryani",
      description: "An aromatic rice dish made with long-grain basmati rice, tender meat or vegetables, and infused with saffron and spices. It is slow-cooked in a sealed pot using the dum method.",
      ingredients: ["Basmati Rice", "Mutton or Chicken", "Saffron", "Yogurt", "Onions", "Spices"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Marinate meat with yogurt, mint, coriander, ginger, garlic, and biryani spices.",
        "Parboil basmati rice with whole spices (cardamom, cloves, bay leaves).",
        "Layer marinated meat and parboiled rice in a heavy pot.",
        "Top with fried onions, saffron milk, ghee, and seal pot dough lid.",
        "Slow cook on low heat (dum) for 30 minutes before gently fluffing and serving."
      ],
      youtubeUrl: makeYoutubeUrl("Hyderabadi Biryani")
    },
    {
      id: "IN-3",
      name: "Samosa",
      localName: "Samosa",
      description: "A popular fried or baked pastry with a savory filling of spiced potatoes, green peas, and herbs. Usually served crisp with mint and tamarind chutney.",
      ingredients: ["Flour pastry", "Potatoes", "Peas", "Cumin", "Coriander", "Green Chilies"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Boil and mash potatoes; sauté with green peas, cumin, coriander, and chili.",
        "Knead flour dough with carom seeds and oil, roll into thin ovals.",
        "Cut ovals in half, fold into cones, and stuff with potato filling.",
        "Seal dough cone edges tightly with a bit of water.",
        "Deep fry in medium-hot oil until golden brown and crispy."
      ],
      youtubeUrl: makeYoutubeUrl("Crispy Potato Samosa")
    },
    {
      id: "IN-4",
      name: "Masala Dosa",
      localName: "Masala Dosa",
      description: "A thin, crispy fermented rice and lentil crepe stuffed with a spiced mashed potato filling. Served hot alongside coconut chutney and lentil sambar.",
      ingredients: ["Rice", "Urad Dal", "Potatoes", "Mustard Seeds", "Curry Leaves", "Turmeric"],
      category: "breakfast",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Soak rice and urad dal, grind to smooth batter, and ferment overnight.",
        "Prepare potato masala by tempering mustard seeds, curry leaves, onions, and turmeric.",
        "Pour batter on hot tawa pan and spread outwards in a thin circular motion.",
        "Drizzle ghee on edges until dosa turns golden brown and crispy.",
        "Place potato filling in center, fold crepe, and serve with chutney."
      ],
      youtubeUrl: makeYoutubeUrl("Crispy Masala Dosa")
    },
    {
      id: "IN-5",
      name: "Gulab Jamun",
      localName: "Gulab Jamun",
      description: "Soft, spongy milk-solid balls fried to a golden hue and soaked in warm, aromatic rose and cardamom sugar syrup. One of India's most cherished desserts.",
      ingredients: ["Khoya (milk solids)", "Flour", "Sugar", "Rose Water", "Cardamom", "Pistachios"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Prepare sticky sugar syrup with water, sugar, crushed cardamom, and rose water.",
        "Knead khoya and flour into a soft, smooth dough without cracks.",
        "Roll into smooth small balls.",
        "Deep fry on low heat until dark golden brown.",
        "Soak fried balls in warm sugar syrup for at least 2 hours before serving."
      ],
      youtubeUrl: makeYoutubeUrl("Gulab Jamun")
    },
    {
      id: "IN-6",
      name: "Pani Puri",
      localName: "Golgappa / Phuchka",
      description: "Crispy hollow dough balls filled with spicy mashed potatoes or chickpeas, dipped in tangy mint and tamarind water. Eaten whole in one burst of flavor.",
      ingredients: ["Semolina Puri", "Potatoes", "Chickpeas", "Mint Water", "Tamarind Chutney"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Prepare spicy mint-coriander water and sweet tamarind chutney.",
        "Boil and mash potatoes mixed with black salt and roasted cumin.",
        "Crack open top of hollow fried puris.",
        "Stuff with potato filling and tamarind chutney.",
        "Fill completely with chilled mint water and eat immediately in one bite."
      ],
      youtubeUrl: makeYoutubeUrl("Pani Puri Golgappa")
    },
    {
      id: "IN-7",
      name: "Palak Paneer",
      localName: "Palak Paneer",
      description: "A classic North Indian vegetarian staple consisting of fresh Indian cottage cheese cubes in a smooth, vibrant spinach puree cooked with garlic and mild spices.",
      ingredients: ["Spinach", "Paneer Cheese", "Garlic", "Cream", "Garam Masala", "Onions"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Blanch spinach leaves in boiling water and transfer to ice water, then blend into smooth puree.",
        "Sauté chopped onions, garlic, ginger, and green chilies in ghee.",
        "Add spinach puree, garam masala, and salt; simmer for 5 minutes.",
        "Lightly pan-fry paneer cubes and stir into the spinach curry.",
        "Finish with fresh heavy cream and serve hot with rotis."
      ],
      youtubeUrl: makeYoutubeUrl("Palak Paneer")
    },
    {
      id: "IN-8",
      name: "Chole Bhature",
      localName: "Chole Bhature",
      description: "A spicy chickpea curry (chole) paired with giant, fluffy fried leavened bread (bhature). A heart-warming breakfast and lunch favorite across North India.",
      ingredients: ["Chickpeas", "Tomatoes", "Spices", "Refined Flour", "Yogurt", "Pickle"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Pressure cook soaked chickpeas with tea bags and whole spices until soft.",
        "Sauté onions, garlic, tomato puree, and chole masala powder.",
        "Combine cooked chickpeas with spicy gravy and simmer until thick.",
        "Roll flour dough into rounds and deep fry until puffed and golden.",
        "Serve hot bhature with spicy chole, sliced onions, and pickle."
      ],
      youtubeUrl: makeYoutubeUrl("Chole Bhature")
    },
    {
      id: "IN-9",
      name: "Chicken Tikka Masala",
      localName: "Chicken Tikka Masala",
      description: "Roasted marinated chicken chunks in a rich, spiced tomato and cream gravy. Pairs wonderfully with freshly baked garlic naan bread.",
      ingredients: ["Chicken", "Yogurt", "Tomato Sauce", "Garlic", "Ginger", "Kashmiri Chili"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Marinate chicken cubes in yogurt, ginger, garlic, and tikka spices.",
        "Grill or bake chicken skewers until charred.",
        "Cook spiced tomato sauce with garlic, ginger, and heavy cream.",
        "Add charred chicken tikka pieces into creamy sauce.",
        "Simmer for 10 minutes and garnish with fresh coriander."
      ],
      youtubeUrl: makeYoutubeUrl("Chicken Tikka Masala")
    },
    {
      id: "IN-10",
      name: "Jalebi",
      localName: "Jalebi",
      description: "Pretzel-like deep-fried batter coils soaked in hot saffron-infused sugar syrup. Crisp on the outside and bursting with sweet syrup inside.",
      ingredients: ["Maida Flour", "Saffron Syrup", "Yogurt", "Ghee", "Cardamom"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Prepare fermented flour and yogurt batter.",
        "Boil sugar, water, saffron, and cardamom into one-string syrup.",
        "Squeeze batter into hot ghee forming concentric spiral rings.",
        "Fry until golden and crispy on both sides.",
        "Soak instantly in warm saffron syrup for 2 minutes and serve."
      ],
      youtubeUrl: makeYoutubeUrl("Crispy Jalebi Sweet")
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
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Mix 00 flour, yeast, salt, and water, kneading into smooth dough and fermenting for 24 hours.",
        "Stretch dough by hand into round disc with raised edges (cornicione).",
        "Spread crushed San Marzano tomatoes, fresh mozzarella slices, and basil leaves.",
        "Drizzle with extra virgin olive oil.",
        "Bake in wood-fired oven at 480°C (900°F) for 60 to 90 seconds."
      ],
      youtubeUrl: makeYoutubeUrl("Neapolitan Pizza Napoletana")
    },
    {
      id: "IT-2",
      name: "Spaghetti Carbonara",
      localName: "Spaghetti alla Carbonara",
      description: "A traditional Roman pasta dish made with crispy guanciale, egg yolks, Pecorino Romano cheese, and freshly cracked black pepper without any cream.",
      ingredients: ["Spaghetti", "Guanciale", "Egg Yolks", "Pecorino Romano Cheese", "Black Pepper"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Boil spaghetti in salted water until al dente.",
        "Crisp sliced guanciale in skillet until fat renders.",
        "Whisk egg yolks with finely grated Pecorino Romano cheese and coarse black pepper.",
        "Toss hot drained pasta into skillet with guanciale fat off the heat.",
        "Pour in egg mixture quickly with pasta water, tossing until creamy."
      ],
      youtubeUrl: makeYoutubeUrl("Traditional Spaghetti Carbonara")
    },
    {
      id: "IT-3",
      name: "Tiramisu",
      localName: "Tiramisù",
      description: "An iconic Italian dessert featuring espresso-soaked ladyfingers layered with whipped mascarpone cream and dusted generously with cocoa powder.",
      ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Eggs", "Sugar", "Cocoa Powder"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Whip egg yolks with sugar, add mascarpone cheese, and fold in whipped egg whites.",
        "Dip ladyfinger biscuits quickly into strong brewed espresso.",
        "Arrange a layer of ladyfingers at the bottom of a glass dish.",
        "Spread half of mascarpone cream over ladyfingers and repeat layering.",
        "Dust top heavily with dark cocoa powder and chill for 4 hours."
      ],
      youtubeUrl: makeYoutubeUrl("Classic Italian Tiramisu")
    },
    {
      id: "IT-4",
      name: "Lasagna Bolognese",
      localName: "Lasagne alla Bolognese",
      description: "Layered sheets of fresh pasta filled with slow-cooked ragù bolognese meat sauce, silky béchamel, and melted Parmigiano-Reggiano cheese.",
      ingredients: ["Pasta Sheets", "Ragù Bolognese", "Béchamel Sauce", "Parmigiano-Reggiano"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Slow cook beef and pork ragù with tomatoes and wine for 2 hours.",
        "Make creamy white béchamel sauce with butter, flour, milk, and nutmeg.",
        "Layer ragù, béchamel, fresh pasta sheets, and grated Parmigiano in baking dish.",
        "Repeat for 4 to 5 layers.",
        "Bake at 180°C (350°F) for 40 minutes until golden and bubbling."
      ],
      youtubeUrl: makeYoutubeUrl("Lasagna Bolognese")
    },
    {
      id: "IT-5",
      name: "Risotto alla Milanese",
      localName: "Risotto alla Milanese",
      description: "Creamy Arborio rice slow-cooked in broth and infused with golden saffron strands and grated parmesan, finished with butter.",
      ingredients: ["Arborio Rice", "Saffron", "Beef Stock", "Butter", "Parmigiano-Reggiano"],
      category: "main course",
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Steep saffron threads in warm broth.",
        "Toast Arborio rice in butter and sautéed minced onion.",
        "Ladle hot broth into rice gradually while stirring continuously.",
        "Cook until rice is creamy yet al dente.",
        "Mantecare off heat with cold butter and grated Parmigiano-Reggiano."
      ],
      youtubeUrl: makeYoutubeUrl("Risotto alla Milanese")
    },
    {
      id: "IT-6",
      name: "Gelato",
      localName: "Gelato Artigianale",
      description: "Rich, dense Italian ice cream made with less fat and churned slowly to deliver an intense flavor profile and silky texture.",
      ingredients: ["Milk", "Cream", "Sugar", "Natural Flavors (Pistachio, Hazelnut, Cocoa)"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1567206563064-6f60f4078b57?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Heat milk, cream, and sugar in saucepan until sugar dissolves.",
        "Whisk in natural flavor pastes (such as roasted pistachio or cocoa).",
        "Chill mixture thoroughly in ice bath.",
        "Churn slowly in gelato machine to minimize air overrun.",
        "Freeze slightly and serve silky smooth scoops."
      ],
      youtubeUrl: makeYoutubeUrl("Authentic Italian Gelato")
    },
    {
      id: "IT-7",
      name: "Arancini",
      localName: "Arancini di Riso",
      description: "Crispy fried Sicilian rice balls stuffed with savory ragù, green peas, and melted mozzarella, coated in breadcrumbs.",
      ingredients: ["Risotto Rice", "Meat Ragù", "Mozzarella", "Breadcrumbs", "Peas"],
      category: "street food",
      image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Cook saffron risotto and let cool completely.",
        "Form ball of rice in palm, make well, and insert meat ragù and mozzarella.",
        "Shape back into sphere or cone shape.",
        "Coat in thin flour batter and roll in breadcrumbs.",
        "Deep fry until golden brown and crispy."
      ],
      youtubeUrl: makeYoutubeUrl("Sicilian Arancini di Riso")
    },
    {
      id: "IT-8",
      name: "Caprese Salad",
      localName: "Insalata Caprese",
      description: "A simple Italian salad originating from Capri, showcasing sliced fresh mozzarella, ripe tomatoes, basil leaves, and balsamic glaze.",
      ingredients: ["Fresh Mozzarella", "Ripe Tomatoes", "Fresh Basil", "Extra Virgin Olive Oil"],
      category: "starter",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Slice fresh vine tomatoes and mozzarella di bufala into thick rounds.",
        "Alternate overlapping slices of tomato and mozzarella on platter.",
        "Tuck fresh sweet basil leaves between slices.",
        "Drizzle generously with cold-pressed olive oil.",
        "Season with sea salt flakes and freshly cracked pepper."
      ],
      youtubeUrl: makeYoutubeUrl("Caprese Salad Italian")
    },
    {
      id: "IT-9",
      name: "Bruschetta",
      localName: "Bruschetta al Pomodoro",
      description: "Grilled garlic-rubbed bread topped with diced vine tomatoes, fresh basil, garlic, and drizzled with premium olive oil.",
      ingredients: ["Rustic Bread", "Vine Tomatoes", "Garlic", "Basil", "Olive Oil"],
      category: "starter",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Dice ripe tomatoes and toss with chopped basil, garlic, salt, and olive oil.",
        "Grill slices of rustic Italian bread until toasted.",
        "Rub hot grilled bread surfaces with a fresh garlic clove.",
        "Spoon tomato mixture generously onto bread.",
        "Serve immediately warm."
      ],
      youtubeUrl: makeYoutubeUrl("Bruschetta al Pomodoro")
    },
    {
      id: "IT-10",
      name: "Cannoli",
      localName: "Cannoli Siciliani",
      description: "Crispy fried pastry shells filled with a sweet, creamy ricotta filling, often studded with chocolate chips or candied fruit.",
      ingredients: ["Pastry Shells", "Sweetened Ricotta", "Chocolate Chips", "Pistachios"],
      category: "dessert",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      steps: [
        "Wrap pastry dough around metal tubes and deep fry until crispy shells form.",
        "Whip sheep's milk ricotta with powdered sugar until silky.",
        "Fold in dark chocolate chips or candied orange peel.",
        "Pipe ricotta filling into fried shells just before serving.",
        "Garnish ends with crushed pistachios and dust with powdered sugar."
      ],
      youtubeUrl: makeYoutubeUrl("Sicilian Cannoli Recipe")
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
    const dishName = `${country.name} ${template.name}`;
    return {
      id: `${country.code}-${idx + 1}`,
      name: dishName,
      localName: `${template.local} de ${country.name}`,
      description: `${template.desc} A beloved staple dish enjoyed across ${country.name} during family gatherings and local festivals.`,
      ingredients: ["Local Produce", "Regional Spices", "Olive Oil", "Fresh Herbs"],
      category: category,
      image: getUniqueDishImage(template.name, category, country.code, idx + 1),
      steps: generateRecipeSteps(dishName, category),
      youtubeUrl: makeYoutubeUrl(dishName)
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
