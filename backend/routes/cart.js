const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../models/cartModel');

// GET  /api/cart           → get all cart items
router.get('/', getCart);

// POST /api/cart           → add item { product_id, quantity }
router.post('/', addToCart);

// PATCH /api/cart/:id      → update quantity { quantity }
router.patch('/:id', updateCartItem);

// DELETE /api/cart/:id     → remove single item
router.delete('/:id', removeFromCart);

// DELETE /api/cart         → clear entire cart
router.delete('/', clearCart);

module.exports = router;
