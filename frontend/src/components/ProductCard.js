import React from 'react';
import { useNavigate } from 'react-router-dom';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const disc = (p, o) => Math.round((1 - p / o) * 100);

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const discPct = product.original_price > product.price ? disc(product.price, product.original_price) : 0;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      id={`product-card-${product.id}`}
      style={{
        width: 185, minWidth: 185, padding: '16px 12px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        borderRight: '1px solid #f0f0f0', background: '#fff',
        transition: 'box-shadow 0.2s', flexShrink: 0
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
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
