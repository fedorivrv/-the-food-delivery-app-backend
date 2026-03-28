# Food Delivery — Backend

Built with **Express.js**, **TypeScript**, **MongoDB** (Mongoose).

## Getting Started

```bash
# Install dependencies
npm install

# Seed the database with sample data
npm run seed

# Run dev server (with hot reload)
npm run dev

# Build for production
npm run build
npm start
```

Server runs at **http://localhost:4000**

## API Endpoints

### Shops

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | `/api/shops`                | Get all shops                |
| GET    | `/api/shops/:id`            | Get shop by ID               |
| GET    | `/api/shops/:id/products`   | Get all products for a shop  |

### Orders

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| POST   | `/api/orders`   | Create a new order    |
| GET    | `/api/orders`   | Get all orders        |

### Health

| Method | Endpoint    | Description        |
|--------|-------------|--------------------|
| GET    | `/health`   | Health check       |

## POST /api/orders — Request Body

```json
{
  "items": [
    {
      "productId": "664abc123...",
      "name": "Big Big Burger",
      "price": 8.99,
      "quantity": 2
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "address": "123 Main St, New York, USA"
  },
  "totalPrice": 17.98
}
```

## Project Structure

```
src/
├── index.ts              # Express app + server bootstrap
├── lib/
│   └── db.ts             # MongoDB connection
├── models/
│   ├── Shop.ts           # Shop schema
│   ├── Product.ts        # Product schema (indexed by shopId)
│   └── Order.ts          # Order schema with nested CustomerInfo
├── controllers/
│   ├── shopController.ts
│   └── orderController.ts
├── routes/
│   ├── shopRoutes.ts
│   └── orderRoutes.ts
└── seed.ts               # Sample data seeder
```

## Environment Variables

| Variable        | Default                                        | Description            |
|-----------------|------------------------------------------------|------------------------|
| `PORT`          | `4000`                                         | Server port            |
| `MONGODB_URI`   | `mongodb://localhost:27017/food-delivery`      | MongoDB connection URI  |
| `FRONTEND_URL`  | `http://localhost:3000`                        | CORS allowed origin    |
