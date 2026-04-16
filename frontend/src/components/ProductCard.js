import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const disc = (p, o) => Math.round((1 - p / o) * 100);

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const discPct = product.original_price > product.price ? disc(product.price, product.original_price) : 0;
  
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    await toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      id={`product-card-${product.id}`}
      style={{
        width: 185, minWidth: 185, padding: '16px 12px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        borderRight: '1px solid #f0f0f0', background: '#fff',
        transition: 'box-shadow 0.2s', flexShrink: 0, position: 'relative'
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Wishlist Heart */}
      <div 
        onClick={handleWishlistClick}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 5,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)', transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={inWishlist ? '#ff4343' : '#c2c2c2'} stroke={inWishlist ? '#ff4343' : '#c2c2c2'} strokeWidth="1.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Product Image */}
      <div style={{ width: 152, height: 152, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s' }}
          onError={e => { e.target.src = 'https://via.placeholder.com/152x152?text=No+Image'; }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Name */}
      <p style={{
        fontSize: 14, color: '#212121', textAlign: 'center', marginBottom: 4,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden', lineHeight: 1.4, fontWeight: 400, width: '100%'
      }}>{product.name}</p>

      {/* Rating badge */}
      {product.rating && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
          <span style={{
            background: '#388e3c', color: '#fff', fontSize: 11, fontWeight: 600,
            padding: '1px 6px', borderRadius: 3
          }}>{product.rating} ★</span>
          {product.rating_count && (
            <span style={{ fontSize: 11, color: '#878787' }}>({Number(product.rating_count).toLocaleString('en-IN')})</span>
          )}
        </div>
      )}

      {/* Price Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#212121' }}>{fmt(product.price)}</span>
        {product.original_price > product.price && (
          <>
            <span style={{ fontSize: 12, color: '#878787', textDecoration: 'line-through' }}>{fmt(product.original_price)}</span>
            <span style={{ fontSize: 12, color: '#388e3c', fontWeight: 500 }}>{discPct}% off</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
