const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../models/cartModel');

const { protect } = require('../middleware/authMiddleware');

// GET  /api/cart           → get all cart items
router.get('/', protect, getCart);

// POST /api/cart           → add item { product_id, quantity }
router.post('/', protect, addToCart);

// PATCH /api/cart/:id      → update quantity { quantity }
router.patch('/:id', protect, updateCartItem);

// DELETE /api/cart/:id     → remove single item
router.delete('/:id', protect, removeFromCart);

// DELETE /api/cart         → clear entire cart
router.delete('/', protect, clearCart);

module.exports = router;
