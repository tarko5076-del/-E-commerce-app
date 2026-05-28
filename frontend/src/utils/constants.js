// Central store constants keep brand and Ethiopia-specific settings consistent.
export const STORE = {
  name: 'Kdame Gebya',
  nameAmharic: 'ቅዳሜ ገብያ',
  tagline: "Ethiopia's #1 Electronics Marketplace",
  whatsapp:
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    import.meta.env.REACT_APP_WHATSAPP ||
    '+251900000000',
}

export const CATEGORIES = [
  'Smartphones & Tablets',
  'Laptops & Computers',
  'Audio',
  'TV & Home Theater',
  'Cameras & Photography',
  'Gaming',
  'Smart Home Devices',
  'Accessories',
  'Networking',
  'Wearables',
]

export const BRANDS = [
  'Samsung',
  'Apple',
  'Xiaomi',
  'Tecno',
  'Itel',
  'Huawei',
  'HP',
  'Dell',
  'Sony',
  'Lenovo',
]

export const DELIVERY_ZONES = [
  {
    name: 'Addis Ababa',
    nameAmharic: 'አዲስ አበባ',
    cities: ['Addis Ababa'],
    baseCost: 150,
    freeDeliveryThreshold: 15000,
    estimatedDays: 'Same day / Next day',
  },
  {
    name: 'Major Cities',
    nameAmharic: 'ዋና ዋና ከተሞች',
    cities: ['Dire Dawa', 'Bahir Dar', 'Hawassa', 'Mekelle', 'Adama'],
    baseCost: 350,
    freeDeliveryThreshold: 25000,
    estimatedDays: '3-5 days',
  },
  {
    name: 'Other Regions',
    nameAmharic: 'ሌሎች ክልሎች',
    cities: ['Other regions'],
    baseCost: 500,
    freeDeliveryThreshold: 35000,
    estimatedDays: '5-7 days',
  },
]

export const ORDER_STATUSES = [
  { value: 'received', label: 'Order Received', amharic: 'ትዕዛዝ ተቀብሏል' },
  { value: 'processing', label: 'Processing', amharic: 'እየተዘጋጀ ነው' },
  { value: 'shipped', label: 'Shipped', amharic: 'ተልኳል' },
  { value: 'out_for_delivery', label: 'Out for Delivery', amharic: 'እየደረሰ ነው' },
  { value: 'delivered', label: 'Delivered', amharic: 'ደርሷል' },
]

export const PAYMENT_METHODS = [
  { id: 'chapa', name: 'Chapa', description: 'Card and Ethiopian banks' },
  { id: 'telebirr', name: 'Telebirr', description: 'Most used mobile money' },
  { id: 'cbe', name: 'CBE Birr', description: 'Commercial Bank of Ethiopia' },
  { id: 'amhara_bank', name: 'Amhara Bank', description: 'Bank payment' },
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when delivered' },
]
