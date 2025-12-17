# Grocery Ecommerce Backend

Complete Node.js + Express + MongoDB Atlas backend for grocery ecommerce application.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB Atlas connection string

3. **Start Server**
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Products
- `POST /api/products` - Add new product
- `GET /api/products` - Get all products

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/cart/:userId` - Get user's cart items

## Response Format
All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {...}
}
```

## Frontend Integration
Use the `frontend-api.js` file in your React app for API calls.

## Features
- Password hashing with bcrypt
- Input validation
- CORS enabled for React frontend
- MongoDB Atlas integration
- Production-ready folder structure