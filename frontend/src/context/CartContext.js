import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartSummary, setCartSummary] = useState({ itemCount: 0, total: '0', savings: '0' });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/cart`);
      if (data.success) {
        setCart(data.data);
        setCartSummary(data.summary);
      }
    } catch (err) { console.error('Cart fetch error', err); }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await axios.post(`${API}/api/cart`, { product_id: productId, quantity });
      await fetchCart();
      return true;
    } catch (err) { return false; }
    finally { setLoading(false); }
  };

  const updateQty = async (cartId, quantity) => {
    try {
      await axios.patch(`${API}/api/cart/${cartId}`, { quantity });
      await fetchCart();
    } catch (err) { console.error(err); }
  };

  const removeItem = async (cartId) => {
    try {
      await axios.delete(`${API}/api/cart/${cartId}`);
      await fetchCart();
    } catch (err) { console.error(err); }
  };

  return (
    <CartContext.Provider value={{ cart, cartSummary, loading, addToCart, updateQty, removeItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
