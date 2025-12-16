// Frontend API integration file for React
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const authAPI = {
  // User signup
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Product API calls
export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add new product
  addProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Cart API calls
export const cartAPI = {
  // Add item to cart
  addToCart: async (cartData) => {
    try {
      const response = await api.post('/cart/add', cartData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Remove item from cart
  removeFromCart: async (cartData) => {
    try {
      const response = await api.post('/cart/remove', cartData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get cart items for user
  getCartItems: async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Example usage in React components:

/*
// Login component example
import { authAPI } from './api/frontend-api';

const handleLogin = async (email, password) => {
  try {
    const result = await authAPI.login({ email, password });
    if (result.success) {
      console.log('Login successful:', result.data);
      // Store user data in state/context
      localStorage.setItem('user', JSON.stringify(result.data));
    }
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Signup component example
const handleSignup = async (name, email, password) => {
  try {
    const result = await authAPI.signup({ name, email, password });
    if (result.success) {
      console.log('Signup successful:', result.data);
    }
  } catch (error) {
    console.error('Signup failed:', error.message);
  }
};

// Products component example
import { productAPI } from './api/frontend-api';

const fetchProducts = async () => {
  try {
    const result = await productAPI.getAllProducts();
    if (result.success) {
      setProducts(result.data);
    }
  } catch (error) {
    console.error('Failed to fetch products:', error.message);
  }
};

// Cart component example
import { cartAPI } from './api/frontend-api';

const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const result = await cartAPI.addToCart({ userId, productId, quantity });
    if (result.success) {
      console.log('Added to cart:', result.data);
    }
  } catch (error) {
    console.error('Failed to add to cart:', error.message);
  }
};
*/