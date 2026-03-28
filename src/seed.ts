import 'dotenv/config';
import mongoose from 'mongoose';
import { Shop } from './models/Shop';
import { Product } from './models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Shop.deleteMany({});
  await Product.deleteMany({});
  console.log('Cleared existing data');

  // Create shops
  const shops = await Shop.insertMany([
    {
      name: 'Mc Donny',
      description: 'Classic American fast food — burgers, fries, shakes',
    },
    {
      name: 'CFK',
      description: 'Crispy fried chicken, wings, and more',
    },
    {
      name: 'Pizza Palace',
      description: 'Authentic Italian-style pizzas baked fresh',
    },
    {
      name: 'Sushi Express',
      description: 'Fresh rolls, sashimi, and bento boxes',
    },
    {
      name: 'Burger Bros',
      description: 'Craft burgers with premium ingredients',
    },
  ]);

  console.log(`Created ${shops.length} shops`);

  // Create products for each shop
  const products = [
    // Mc Donny
    { name: 'Big Big Burger', price: 8.99, description: 'Double beef patty with special sauce', shopId: shops[0]._id },
    { name: 'McChicken Deluxe', price: 7.49, description: 'Crispy chicken filet with lettuce and mayo', shopId: shops[0]._id },
    { name: 'French Fries Large', price: 3.49, description: 'Golden crispy fries, lightly salted', shopId: shops[0]._id },
    { name: 'Vanilla Shake', price: 4.29, description: 'Thick and creamy vanilla milkshake', shopId: shops[0]._id },
    { name: 'Apple Pie', price: 1.99, description: 'Warm flaky pastry with cinnamon apple filling', shopId: shops[0]._id },

    // CFK
    { name: 'Original Bucket (8pc)', price: 14.99, description: 'Eight pieces of original recipe chicken', shopId: shops[1]._id },
    { name: 'Spicy Wings (12pc)', price: 11.49, description: 'Fiery hot wings with blue cheese dip', shopId: shops[1]._id },
    { name: 'Coleslaw', price: 2.49, description: 'Creamy homestyle coleslaw', shopId: shops[1]._id },
    { name: 'Corn on the Cob', price: 1.99, description: 'Grilled corn with herb butter', shopId: shops[1]._id },
    { name: 'Chicken Sandwich', price: 6.99, description: 'Juicy chicken breast on brioche bun', shopId: shops[1]._id },

    // Pizza Palace
    { name: 'Margherita Pizza', price: 12.99, description: 'San Marzano tomato, fresh mozzarella, basil', shopId: shops[2]._id },
    { name: 'Pepperoni Feast', price: 14.99, description: 'Loaded with premium pepperoni slices', shopId: shops[2]._id },
    { name: 'Quattro Formaggi', price: 15.49, description: 'Mozzarella, gorgonzola, parmesan, fontina', shopId: shops[2]._id },
    { name: 'Garlic Bread', price: 4.99, description: 'Toasted ciabatta with roasted garlic butter', shopId: shops[2]._id },

    // Sushi Express
    { name: 'Dragon Roll (8pc)', price: 13.99, description: 'Shrimp tempura topped with avocado', shopId: shops[3]._id },
    { name: 'Salmon Nigiri (2pc)', price: 6.49, description: 'Fresh Atlantic salmon over seasoned rice', shopId: shops[3]._id },
    { name: 'Edamame', price: 3.99, description: 'Salted steamed soybeans', shopId: shops[3]._id },
    { name: 'Miso Soup', price: 2.49, description: 'Traditional white miso with tofu and wakame', shopId: shops[3]._id },

    // Burger Bros
    { name: 'Wagyu Smash', price: 17.99, description: 'Wagyu beef, caramelised onion, aged cheddar', shopId: shops[4]._id },
    { name: 'Mushroom Swiss', price: 13.99, description: 'Sautéed mushrooms, Swiss cheese, garlic aioli', shopId: shops[4]._id },
    { name: 'Sweet Potato Fries', price: 4.49, description: 'Crispy sweet potato with chipotle mayo', shopId: shops[4]._id },
    { name: 'Craft Lemonade', price: 3.99, description: 'Freshly squeezed with mint and ginger', shopId: shops[4]._id },
  ];

  await Product.insertMany(products);
  console.log(`Created ${products.length} products`);

  await mongoose.disconnect();
  console.log('✅ Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
