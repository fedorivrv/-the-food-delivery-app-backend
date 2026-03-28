import 'dotenv/config';
import mongoose from 'mongoose';
import { Shop } from './models/Shop';
import { Product } from './models/Product';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Shop.deleteMany({});
  await Product.deleteMany({});
  console.log('Cleared existing data');

  const shops = await Shop.insertMany([
    { name: 'Mc Donny', description: 'Classic American fast food — burgers, fries, shakes', rating: 4.5 },
    { name: 'CFK', description: 'Crispy fried chicken, wings, and more', rating: 4.2 },
    { name: 'Pizza Palace', description: 'Authentic Italian-style pizzas baked fresh', rating: 4.8 },
    { name: 'Sushi Express', description: 'Fresh rolls, sashimi, and bento boxes', rating: 3.7 },
    { name: 'Burger Bros', description: 'Craft burgers with premium ingredients', rating: 2.9 },
  ]);
  console.log(`Created ${shops.length} shops`);

  const products = [
    // Mc Donny
    { name: 'Big Big Burger', price: 8.99, description: 'Double beef patty with special sauce', shopId: shops[0]._id, category: 'Burgers' },
    { name: 'McChicken Deluxe', price: 7.49, description: 'Crispy chicken filet with lettuce and mayo', shopId: shops[0]._id, category: 'Chicken' },
    { name: 'French Fries Large', price: 3.49, description: 'Golden crispy fries, lightly salted', shopId: shops[0]._id, category: 'Sides' },
    { name: 'Vanilla Shake', price: 4.29, description: 'Thick and creamy vanilla milkshake', shopId: shops[0]._id, category: 'Drinks' },
    { name: 'Apple Pie', price: 1.99, description: 'Warm flaky pastry with cinnamon apple filling', shopId: shops[0]._id, category: 'Desserts' },
    { name: 'Cola Large', price: 2.49, description: 'Ice cold Coca-Cola', shopId: shops[0]._id, category: 'Drinks' },
    // CFK
    { name: 'Original Bucket (8pc)', price: 14.99, description: 'Eight pieces of original recipe chicken', shopId: shops[1]._id, category: 'Chicken' },
    { name: 'Spicy Wings (12pc)', price: 11.49, description: 'Fiery hot wings with blue cheese dip', shopId: shops[1]._id, category: 'Chicken' },
    { name: 'Coleslaw', price: 2.49, description: 'Creamy homestyle coleslaw', shopId: shops[1]._id, category: 'Sides' },
    { name: 'Corn on the Cob', price: 1.99, description: 'Grilled corn with herb butter', shopId: shops[1]._id, category: 'Sides' },
    { name: 'Chicken Sandwich', price: 6.99, description: 'Juicy chicken breast on brioche bun', shopId: shops[1]._id, category: 'Chicken' },
    { name: 'Lemonade', price: 2.99, description: 'Fresh squeezed lemonade', shopId: shops[1]._id, category: 'Drinks' },
    // Pizza Palace
    { name: 'Margherita Pizza', price: 12.99, description: 'San Marzano tomato, fresh mozzarella, basil', shopId: shops[2]._id, category: 'Pizza' },
    { name: 'Pepperoni Feast', price: 14.99, description: 'Loaded with premium pepperoni slices', shopId: shops[2]._id, category: 'Pizza' },
    { name: 'Quattro Formaggi', price: 15.49, description: 'Mozzarella, gorgonzola, parmesan, fontina', shopId: shops[2]._id, category: 'Pizza' },
    { name: 'Garlic Bread', price: 4.99, description: 'Toasted ciabatta with roasted garlic butter', shopId: shops[2]._id, category: 'Sides' },
    { name: 'Tiramisu', price: 5.99, description: 'Classic Italian dessert with mascarpone', shopId: shops[2]._id, category: 'Desserts' },
    { name: 'Caesar Salad', price: 7.49, description: 'Crisp romaine, parmesan, croutons', shopId: shops[2]._id, category: 'Salads' },
    // Sushi Express
    { name: 'Dragon Roll (8pc)', price: 13.99, description: 'Shrimp tempura topped with avocado', shopId: shops[3]._id, category: 'Sushi' },
    { name: 'Salmon Nigiri (2pc)', price: 6.49, description: 'Fresh Atlantic salmon over seasoned rice', shopId: shops[3]._id, category: 'Sushi' },
    { name: 'Edamame', price: 3.99, description: 'Salted steamed soybeans', shopId: shops[3]._id, category: 'Sides' },
    { name: 'Miso Soup', price: 2.49, description: 'Traditional white miso with tofu and wakame', shopId: shops[3]._id, category: 'Drinks' },
    { name: 'Mochi Ice Cream', price: 5.99, description: 'Assorted mochi with ice cream filling', shopId: shops[3]._id, category: 'Desserts' },
    // Burger Bros
    { name: 'Wagyu Smash', price: 17.99, description: 'Wagyu beef, caramelised onion, aged cheddar', shopId: shops[4]._id, category: 'Burgers' },
    { name: 'Mushroom Swiss', price: 13.99, description: 'Sautéed mushrooms, Swiss cheese, garlic aioli', shopId: shops[4]._id, category: 'Burgers' },
    { name: 'Sweet Potato Fries', price: 4.49, description: 'Crispy sweet potato with chipotle mayo', shopId: shops[4]._id, category: 'Sides' },
    { name: 'Craft Lemonade', price: 3.99, description: 'Freshly squeezed with mint and ginger', shopId: shops[4]._id, category: 'Drinks' },
    { name: 'Brownie Sundae', price: 6.49, description: 'Warm brownie with vanilla ice cream', shopId: shops[4]._id, category: 'Desserts' },
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