# kdame gebya Ecommerce App

Full-stack ecommerce app with a React + Tailwind frontend, a Python FastAPI backend, demo card payments, admin product management, and MongoDB persistence for products and orders.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Run the backend

```bash
cd backend
py -m pip install -r requirements.txt
py -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Backend health check: `http://localhost:8000/api/health`

## MongoDB

The backend looks for MongoDB at:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=ecommerce_app
```

Copy `backend/.env.example` to `backend/.env` if you want to customize it.

If MongoDB is not running, the API uses an in-memory development store so the frontend remains usable. Admin product changes and orders will work for the current server session. Once MongoDB is available, products are seeded automatically and checkout orders are saved to the database.

## App pages

- `Shop`: browse, search, filter, and add products to cart
- `Cart`: change quantities and checkout
- `Orders`: view saved customer orders
- `Admin`: add, edit, and delete products

## Useful API routes

- `GET /api/products`
- `GET /api/products/{product_id}`
- `POST /api/products`
- `PUT /api/products/{product_id}`
- `DELETE /api/products/{product_id}`
- `POST /api/payments`
- `POST /api/orders`
- `GET /api/orders`

Payments are currently demo payments. To go production, replace `/api/payments` with Stripe, PayPal, M-Pesa, or another provider using real secret keys on the backend only.
