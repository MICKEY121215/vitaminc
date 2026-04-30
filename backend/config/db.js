const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try connecting to the configured MongoDB URI first
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Local MongoDB unavailable, starting in-memory database...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      console.log(`⚠  Data will not persist between restarts. Install MongoDB for persistence.`);

      // Auto-seed products when using in-memory DB
      await seedProducts();
    } catch (memError) {
      console.error(`Database connection failed: ${memError.message}`);
      process.exit(1);
    }
  }
};

async function seedProducts() {
  const Product = require('../models/Product');
  const count = await Product.countDocuments();
  if (count > 0) return;

  console.log('Seeding products into in-memory database...');
  await Product.insertMany([
    {
      name: 'GlowVit C 20% Vitamin C Face Serum',
      price: 599,
      originalPrice: 1299,
      description: 'Our flagship Vitamin C serum formulated with 20% L-Ascorbic Acid, Hyaluronic Acid, and Vitamin E. This powerful antioxidant serum brightens skin, reduces dark spots, and evens out skin tone for a radiant, youthful glow. Lightweight, fast-absorbing formula suitable for all skin types.',
      shortDescription: 'Brightening face serum with 20% Vitamin C for radiant, glowing skin',
      image: '/images/product-serum.png',
      benefits: ['Brightens dull skin & adds natural glow', 'Reduces dark spots & hyperpigmentation', 'Evens out skin tone', 'Boosts collagen production', 'Protects against sun damage & pollution', 'Hydrates with Hyaluronic Acid'],
      ingredients: ['L-Ascorbic Acid (Vitamin C) 20%', 'Hyaluronic Acid', 'Vitamin E (Tocopherol)', 'Ferulic Acid', 'Niacinamide', 'Aloe Vera Extract', 'Purified Water'],
      category: 'serum', stock: 150, rating: 4.8, reviewCount: 2847, featured: true,
    },
    {
      name: 'GlowVit C Vitamin C Moisturizer',
      price: 499,
      originalPrice: 999,
      description: 'A luxurious daily moisturizer infused with Vitamin C, Shea Butter, and Jojoba Oil. Deeply hydrates while brightening skin. Perfect as a day or night cream.',
      shortDescription: 'Hydrating moisturizer with Vitamin C for all-day glow',
      image: '/images/product-moisturizer.png',
      benefits: ['Deep 24-hour hydration', 'Brightens complexion', 'Softens & smooths skin texture', 'Reduces fine lines', 'Non-greasy formula'],
      ingredients: ['Vitamin C (Ascorbyl Glucoside)', 'Shea Butter', 'Jojoba Oil', 'Hyaluronic Acid', 'Aloe Vera', 'Green Tea Extract'],
      category: 'moisturizer', stock: 200, rating: 4.6, reviewCount: 1523, featured: true,
    },
    {
      name: 'GlowVit C Vitamin C Face Wash',
      price: 349,
      originalPrice: 699,
      description: 'A gentle yet effective Vitamin C face wash that cleanses deeply while brightening your skin. Enriched with Vitamin C, Turmeric, and Neem extracts.',
      shortDescription: 'Brightening face wash with Vitamin C & natural extracts',
      image: '/images/product-facewash.png',
      benefits: ['Deep cleansing without stripping moisture', 'Brightens with every wash', 'Removes dead skin cells', 'Controls excess oil', 'Refreshing citrus scent'],
      ingredients: ['Vitamin C', 'Turmeric Extract', 'Neem Extract', 'Salicylic Acid', 'Glycerin', 'Tea Tree Oil'],
      category: 'facewash', stock: 300, rating: 4.5, reviewCount: 987, featured: false,
    },
    {
      name: 'GlowVit C Complete Skincare Kit',
      price: 1199,
      originalPrice: 2997,
      description: 'The ultimate Vitamin C skincare bundle! Includes our bestselling Vitamin C Serum, Moisturizer, and Face Wash. Everything you need for a complete brightening routine. Save 60% compared to buying individually.',
      shortDescription: 'Complete 3-piece Vitamin C skincare routine at 60% off',
      image: '/images/product-kit.png',
      benefits: ['Complete skincare routine in one box', 'Save 60% vs individual purchase', 'Cleanse, treat, & moisturize', 'Visible results in 2 weeks', 'Perfect gift set'],
      ingredients: ['Includes: Face Wash + Serum + Moisturizer'],
      category: 'kit', stock: 75, rating: 4.9, reviewCount: 654, featured: true,
    },
  ]);
  console.log('Products seeded successfully!');
}

module.exports = connectDB;
