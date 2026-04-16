const pool = require('../db/db');

// GET all products (with optional category filter and search)
const getProducts = async (req, res) => {
  try {
    const { category, search, limit = 20 } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];

    if (category && search) {
      query += ' WHERE category = ? AND name LIKE ?';
      params.push(category, `%${search}%`);
    } else if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    } else if (search) {
      query += ' WHERE name LIKE ? OR description LIKE ? OR brand LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET categories (unique list)
const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT category FROM products ORDER BY category');
    const categories = rows.map(r => r.category);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getProducts, getCategories, getProductById };
