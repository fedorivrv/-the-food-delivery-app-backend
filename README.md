# Food Delivery — Backend (REST API)

Express + TypeScript + MongoDB (Mongoose). Includes basic security middleware (Helmet, rate limiting) and request validation (Zod).

## Requirements

- Node.js 20+
- MongoDB (local or Atlas)

## Quick start

```bash
npm install

# 1) Create env file
cp .env.example .env

# 2) (Optional) Seed sample data
npm run seed

# 3) Run dev server (hot reload)
npm run dev
```

Server: `http://localhost:4000`  
Health: `GET /health`

## Environment variables

Create `.env` from `.env.example`.

| Variable | Required | Example | Notes |
|---|---:|---|---|
| `PORT` | no | `4000` | Server port |
| `MONGODB_URI` | yes | `mongodb://localhost:27017/food-delivery` | Mongo connection |
| `FRONTEND_URL` | no | `http://localhost:3000` | CORS allowed origin |
| `JWT_SECRET` | yes | `change-me-in-prod` | Used to sign/verify JWT |

## Scripts

```bash
npm run dev     # hot reload
npm run build   # tsc -> dist/
npm start       # run dist
npm run seed    # seed sample shops/products
```

## API

Base URL: `/api`

### Auth

- **POST** `/api/auth/login`

Request:

```json
{ "email": "user@example.com", "password": "anything" }
```

Response:

```json
{ "accessToken": "jwt...", "user": { "email": "user@example.com" } }
```

Note: current implementation is demo-style (no real password verification).

### Shops

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/shops` | List shops |
| GET | `/api/shops/:id` | Get shop by id |
| GET | `/api/shops/:id/products` | Get products for shop (supports `categories`, `sort`, `page`, `limit`) |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List all orders (**protected**) |
| GET | `/api/orders/search` | Find orders by `orderId` OR by `email`+`phone` |

#### POST `/api/orders`

Request:

```json
{
  "items": [{ "productId": "664abc1234567890abcd1234", "quantity": 2 }],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "address": "123 Main St, New York, USA"
  }
}
```

Response:

```json
{ "message": "Order created successfully", "orderId": "..." }
```

## Error format

Most errors are returned as:

```json
{
  "message": "Validation failed",
  "error": { "message": "Validation failed", "code": "VALIDATION_ERROR", "details": [] }
}
```
