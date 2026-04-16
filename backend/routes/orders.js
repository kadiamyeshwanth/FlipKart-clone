const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, getUserOrders } = require('../models/orderModel');

const { protect } = require('../middleware/authMiddleware');

// POST /api/orders   → place order { address, city, pincode, phone, payment_method }
router.post('/', protect, placeOrder);

// GET /api/orders/user → get all orders for the current user
router.get('/user', protect, getUserOrders);

// GET  /api/orders/:id → get order details with items
router.get('/:id', protect, getOrder);

module.exports = router;
