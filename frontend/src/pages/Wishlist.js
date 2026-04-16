import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { token, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/wishlist');
      if (res.data.success) {
        setItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await axios.post('http://localhost:5000/api/wishlist/toggle', { product_id: id });
      if (res.data.success) {
        setItems(items.filter(item => item.product_id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', paddingBottom: 40 }}>
        <Navbar />
        <div style={{ padding: '80px 20px', textAlign: 'center', marginTop: 60 }}>
          <div style={{ background: '#fff', padding: 40, maxWidth: 600, margin: '0 auto', borderRadius: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist" style={{ width: 150, marginBottom: 20 }} />
            <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>Please log in to view your wishlist</h2>
            <p style={{ color: '#878787', marginBottom: 20 }}>Save your favourite items here for later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-content" style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', paddingBottom: 40, paddingTop: 130 }}>
      <Navbar />
      <div className="layout-container" style={{
        maxWidth: 1200, margin: '0 auto', paddingLeft: 20, paddingRight: 20
      }}>
        <div className="stack-on-mobile" style={{ display: 'flex', gap: 16 }}>
          {/* Account Sidebar (hidden on mobile ideally) */}
          <div className="account-sidebar hide-on-mobile" style={{ width: 280, flexShrink: 0, background: '#fff', boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)', alignSelf: 'flex-start' }}>
            <div style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 15, borderBottom: '1px solid #f0f0f0' }}>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="Profile" width="50" />
              <div>
                <div style={{ fontSize: 12 }}>Hello,</div>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{user.name}</div>
              </div>
            </div>
            <div style={{ padding: '0' }}>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', color: '#878787', fontWeight: 500 }}>ACCOUNT SETTINGS</div>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>Profile Information</div>
              <div style={{ padding: '15px 20px', backgroundColor: '#f5faff', color: '#2874f0', fontWeight: 500, cursor: 'pointer' }}>My Wishlist ({items.length})</div>
            </div>
          </div>

          {/* Wishlist Items */}
          <div style={{ flex: 1, background: '#fff', boxShadow: '0 2px 4px 0 rgba(0,0,0,.08)' }}>
            <h1 style={{ padding: '24px 32px', fontSize: 18, fontWeight: 500, borderBottom: '1px solid #f0f0f0', margin: 0 }}>
              My Wishlist ({items.length})
            </h1>

            {loading ? (
              <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>
            ) : items.length === 0 ? (
              <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist" style={{ width: 150, marginBottom: 20 }} />
                <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>Empty Wishlist</h2>
                <p style={{ color: '#878787' }}>You have no items in your wishlist. Start adding!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', borderTop: '1px solid #f0f0f0' }}>
                {items.map(item => (
                  <div key={item.product_id} style={{ position: 'relative' }}>
                    <ProductCard 
                      product={{ 
                        id: item.product_id, 
                        name: item.name, 
                        price: item.price, 
                        original_price: item.original_price, 
                        image: item.image, 
                        rating: item.rating 
                      }} 
                    />
                    <button 
                      onClick={() => removeFromWishlist(item.product_id)}
                      style={{
                        position: 'absolute', top: 12, left: 12, zIndex: 10,
                        background: '#fff', border: 'none', borderRadius: '50%',
                        width: 28, height: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                      title="Remove from Wishlist"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
