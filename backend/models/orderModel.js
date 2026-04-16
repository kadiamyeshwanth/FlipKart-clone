const pool = require('../db/db');

// POST place an order
const placeOrder = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { address, city, pincode, phone, payment_method = 'COD' } = req.body;
    
    if (!address || !phone) {
      return res.status(400).json({ success: false, message: 'Address and phone are required' });
    }

    // Get all cart items
    const [cartItems] = await conn.query(`
      SELECT ci.product_id, ci.quantity, p.price, p.name, p.stock
      FROM cart_items ci JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [req.user.id]);

    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Start transaction (all-or-nothing: if one step fails, roll everything back)
    await conn.beginTransaction();

    // 1. Insert the order
    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, address, city, pincode, phone, total, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, address, city, pincode, phone, total.toFixed(2), payment_method]
    );
    const orderId = orderResult.insertId;

    // 2. Insert each order item
    for (const item of cartItems) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      // 3. Reduce stock
      await conn.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // 4. Clear cart after successful order
    await conn.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);

    await conn.commit();

    res.json({ 
      success: true, 
      message: 'Order placed successfully!',
      orderId: orderId,
      total: total.toFixed(2)
    });
  } catch (error) {
    await conn.rollback();
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  } finally {
    conn.release();
  }
};

// GET order by ID  
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    const [items] = await pool.query(`
      SELECT oi.*, p.name, p.image, p.category 
      FROM order_items oi 
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id]);
    
    res.json({ success: true, data: { ...orders[0], items } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// GET all orders for the current user (currently fetches all globally)
const getUserOrders = async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    
    if (orders.length === 0) {
      return res.json({ success: true, data: [] });
    }
    
    const [items] = await pool.query(`
      SELECT oi.*, p.name, p.image, p.category 
      FROM order_items oi 
      JOIN products p ON oi.product_id = p.id
    `);

    // Attach the respective items to each order
    const ordersWithItems = orders.map(order => ({
      ...order,
      items: items.filter(item => item.order_id === order.id)
    }));
    
    res.json({ success: true, data: ordersWithItems });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { placeOrder, getOrder, getUserOrders };
