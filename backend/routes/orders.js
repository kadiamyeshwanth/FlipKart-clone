const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, getUserOrders } = require('../models/orderModel');

// POST /api/orders   → place order { address, city, pincode, phone, payment_method }
router.post('/', placeOrder);

// GET /api/orders/user → get all orders for the current user
router.get('/user', getUserOrders);

// GET  /api/orders/:id → get order details with items
router.get('/:id', getOrder);

module.exports = router;
