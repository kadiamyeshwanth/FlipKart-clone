const pool = require('../db/db');

// GET all cart items (joined with product details)
const getCart = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ci.id as cart_id,
        ci.quantity,
        p.id as product_id,
        p.name,
        p.price,
        p.original_price,
        p.image,
        p.category,
        p.stock,
        p.rating,
        p.brand
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
      ORDER BY ci.created_at DESC
    `, [req.user.id]);
    
    const total = rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = rows.reduce((sum, item) => sum + (item.original_price * item.quantity), 0);
    const savings = originalTotal - total;

    res.json({ 
      success: true, 
      data: rows,
      summary: {
        itemCount: rows.length,
        total: total.toFixed(2),
        originalTotal: originalTotal.toFixed(2),
        savings: savings.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST add item to cart (or increase qty if already exists)
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) {
      return res.status(400).json({ success: false, message: 'product_id is required' });
    }

    // Check if product exists
    const [product] = await pool.query('SELECT id, stock FROM products WHERE id = ?', [product_id]);
    if (product.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if already in cart
    const [existing] = await pool.query('SELECT id, quantity FROM cart_items WHERE product_id = ? AND user_id = ?', [product_id, req.user.id]);
    
    if (existing.length > 0) {
      const newQty = existing[0].quantity + parseInt(quantity);
      await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?', [newQty, existing[0].id, req.user.id]);
      res.json({ success: true, message: 'Cart updated', cartId: existing[0].id });
    } else {
      const [result] = await pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [req.user.id, product_id, quantity]);
      res.json({ success: true, message: 'Added to cart', cartId: result.insertId });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PATCH update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }
    
    await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?', [quantity, id, req.user.id]);
    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [id, req.user.id]);
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE clear entire cart
const clearCart = async (req, res) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
