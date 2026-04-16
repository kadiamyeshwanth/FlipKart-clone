import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchWishlistIds();
    } else {
      setWishlistIds([]);
    }
  }, [token]);

  const fetchWishlistIds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist/ids');
      if (res.data.success) {
        setWishlistIds(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist IDs', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      // Assuming a global event or prop to show login modal here
      // For now, return false to indicate it wasn't added
      alert('Please log in to add items to your wishlist');
      return false;
    }
    
    setIsLoading(true);
    try {
      // Optimistic update
      const isCurrentlyInWishlist = wishlistIds.includes(productId);
      if (isCurrentlyInWishlist) {
        setWishlistIds(prev => prev.filter(id => id !== productId));
      } else {
        setWishlistIds(prev => [...prev, productId]);
      }

      const res = await axios.post('http://localhost:5000/api/wishlist/toggle', { product_id: productId });
      
      // If failed, revert the optimistic update
      if (!res.data.success) {
        fetchWishlistIds();
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to toggle wishlist', error);
      fetchWishlistIds(); // Revert
      setIsLoading(false);
      return false;
    }
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist, isLoading }}>
      {children}
    </WishlistContext.Provider>
  );
};
