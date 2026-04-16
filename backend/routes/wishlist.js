const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/wishlist
// @desc    Get user's wishlist items
router.get('/', protect, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        w.id as wishlist_id,
        w.product_id,
        p.name,
        p.price,
        p.original_price,
        p.image,
        p.category,
        p.rating,
        p.brand
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ?
      ORDER BY w.created_at DESC
    `, [req.user.id]);
    
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/wishlist/toggle
// @desc    Add or remove item from wishlist
router.post('/toggle', protect, async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) return res.status(400).json({ success: false, message: 'product_id is required' });

    // Check if it already exists
    const [existing] = await pool.query('SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?', [req.user.id, product_id]);

    if (existing.length > 0) {
      // Remove it
      await pool.query('DELETE FROM wishlist WHERE id = ?', [existing[0].id]);
      res.json({ success: true, message: 'Removed from wishlist', action: 'removed' });
    } else {
      // Add it
      await pool.query('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)', [req.user.id, product_id]);
      res.json({ success: true, message: 'Added to wishlist', action: 'added' });
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/wishlist/ids
// @desc    Get array of product IDs in wishlist for quick heart-toggling
router.get('/ids', protect, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT product_id FROM wishlist WHERE user_id = ?', [req.user.id]);
    const ids = rows.map(r => r.product_id);
    res.json({ success: true, data: ids });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
