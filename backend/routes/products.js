const express = require('express');
const router = express.Router();
const { getProducts, getCategories, getProductById } = require('../models/productModel');

// GET /api/products          → all products (supports ?category=Mobiles&search=samsung&limit=10)
router.get('/', getProducts);

// GET /api/products/categories → unique category list  
router.get('/categories', getCategories);

// GET /api/products/:id      → single product
router.get('/:id', getProductById);

module.exports = router;
