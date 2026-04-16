import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DealsCarousel = ({ title, category, bgColor = '#fff' }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products based on category
    axios.get(`${API}/api/products?category=${category}&limit=4`)
      .then(res => setProducts(res.data.data || []))
      .catch(err => console.error(`Error fetching ${title}:`, err));
  }, [category, title]);

  if (products.length === 0) return null;

  return (
    <div style={{ background: bgColor, marginTop: 12, padding: 16, borderRadius: 2 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#212121', margin: 0 }}>{title}</h2>
        <div style={{ 
          background: '#212121', color: '#fff', 
          width: 24, height: 24, borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
        }}>
          {title === "Suggested For You" ? (
             <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
               <path d="M1 8H14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
               <path d="M10 3.5L14.5 8L10 12.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
             </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M1 8H14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M10 3.5L14.5 8L10 12.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          )}
        </div>
      </div>

      {/* Product List */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: 12,
        paddingBottom: 10,
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}>
        {products.map(product => (
          <div 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ 
              minWidth: 150, 
              width: 150,
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              cursor: 'pointer',
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              padding: '12px 8px',
              transition: 'box-shadow 0.2s',
              background: '#fff'
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ width: 130, height: 130, marginBottom: 16 }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.2s' }} 
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#212121', textAlign: 'center', marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.name}
            </div>
            <div style={{ color: '#212121', fontSize: 14, fontWeight: 600, paddingTop: 2 }}>
              From {Number(product.price).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsCarousel;