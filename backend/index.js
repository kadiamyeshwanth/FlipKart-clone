require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────
app.use(cors()); // Allow React frontend to call this API
app.use(express.json()); // Allow reading JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ── API Routes ─────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ── Health check ───────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🚀 Flipkart Clone API is running!', version: '1.0.0' });
});

// ── 404 handler ────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.url} not found` });
});

// ── Start server ───────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🛒 Cart API:     http://localhost:${PORT}/api/cart`);
  console.log(`📋 Orders API:   http://localhost:${PORT}/api/orders\n`);
});
