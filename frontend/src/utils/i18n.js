// Lightweight bilingual copy. The app is ready to grow into i18next later.
export const translations = {
  en: {
    shopNow: 'Shop now',
    addToCart: 'Add to cart',
    checkout: 'Checkout',
    admin: 'Admin',
    orders: 'Orders',
    search: 'Search electronics',
    lowStock: 'Only a few left!',
    warranty: 'Warranty',
    customs: 'Import tax / customs',
  },
  am: {
    shopNow: 'አሁን ይግዙ',
    addToCart: 'ወደ ጋሪ ጨምር',
    checkout: 'ክፍያ',
    admin: 'አስተዳዳሪ',
    orders: 'ትዕዛዞች',
    search: 'ኤሌክትሮኒክስ ፈልግ',
    lowStock: 'ጥቂት ቀሪ!',
    warranty: 'ዋስትና',
    customs: 'የጉምሩክ መረጃ',
  },
}

export function t(language, key) {
  return translations[language]?.[key] || translations.en[key] || key
}
