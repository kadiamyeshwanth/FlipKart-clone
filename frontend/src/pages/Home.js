import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const API  = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const FLX  = 'https://rukminim2.flixcart.com/fk-p-flap';
const flxi = (w, h, id, q = 90) => `${FLX}/${w}/${h}/image/${id}?q=${q}`;

const fmt  = (n)    => '₹' + Number(n).toLocaleString('en-IN');
const disc = (p, o) => Math.round((1 - p / o) * 100);

/* ═══════════════════════════════════════════════════════════════
   BANNER DATA — real Flipkart 1600×780 from saved index.html
═══════════════════════════════════════════════════════════════ */
const BANNERS = [
  { imgId: 'cf9d31cac0471567.png', route: '/category/Fashion'     },
  { imgId: '3f799f64ec9059f6.png', route: '/category/Mobiles'     },
  { imgId: '0cba33c922876852.png', route: '/category/Electronics'  },
  { imgId: '125076aaf37e22ed.png', route: '/category/Appliances'   },
  { imgId: '9168b97b16b87f76.png', route: '/category/Beauty'       },
];

/* ═══════════════════════════════════════════════════════════════
   BRAND CIRCLES — from saved index.html
═══════════════════════════════════════════════════════════════ */
const BRANDS = [
  { name: 'For GenZ',  imgId: 'd69e80ba5a9dcefa.jpg', route: '/category/Fashion'     },
  { name: 'Flipkart',  imgId: '91cb975f8f533924.jpg', route: '/'                     },
  { name: 'Originals', imgId: '3b10b0ff1ebd0d10.jpg', route: '/category/Fashion'     },
  { name: 'Gift Card', imgId: '252dd4b73b5eddc6.jpg', route: '/'                     },
  { name: 'BLACK',     imgId: 'bb002da7361ed1bc.jpg', route: '/category/Electronics' },
  { name: 'SuperCoin', imgId: '094caff8b21c4dc7.jpg', route: '/'                     },
  { name: 'Next-Gen',  imgId: 'd3a54b38bf2cc2e8.jpg', route: '/category/Mobiles'     },
];

/* ═══════════════════════════════════════════════════════════════
   SHIMMER / SKELETON
═══════════════════════════════════════════════════════════════ */
const Skeleton = ({ width = 225, height = 300, radius = 8 }) => (
  <div style={{
    width, minWidth: width, height, flexShrink: 0, borderRadius: radius,
    background: 'linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)',
    backgroundSize: '400% 100%',
    animation: 'fkShimmer 1.4s infinite linear',
  }} />
);

/* ═══════════════════════════════════════════════════════════════
   GLOBAL KEYFRAMES (injected once)
═══════════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @keyframes fkShimmer {
      0%   { background-position:  200% 0; }
      100% { background-position: -200% 0; }
    }
    /* Flipkart scrollbar-hide: already in index.css but reaffirm */
    .fk-scroll { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
    .fk-scroll::-webkit-scrollbar { display: none; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   ① BANNER CAROUSEL — auto-slides every 4 s, pauses on hover
═══════════════════════════════════════════════════════════════ */
const BannerCarousel = () => {
  const [cur, setCur]       = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();
  const timer    = useRef(null);

  const goTo = useCallback((i) => setCur((i + BANNERS.length) % BANNERS.length), []);
  const next  = useCallback(() => goTo(cur + 1), [cur, goTo]);
  const prev  = useCallback(() => goTo(cur - 1), [cur, goTo]);

  useEffect(() => {
    if (paused) { clearInterval(timer.current); return; }
    timer.current = setInterval(next, 4000);
    return () => clearInterval(timer.current);
  }, [paused, next]);

  const Arrow = ({ side }) => (
    <button
      onClick={(e) => { e.stopPropagation(); side === 'left' ? prev() : next(); }}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [side]: 6, background: 'rgba(255,255,255,0.92)', border: 'none',
        width: 32, height: 64, cursor: 'pointer', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 4,
        boxShadow: '0 1px 4px rgba(0,0,0,.18)',
      }}
    >
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
        {side === 'left'
          ? <path d="M8 2 L2 9 L8 16" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M2 2 L8 9 L2 16" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
      </svg>
    </button>
  );

  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', padding: '10px 0 14px', background: '#f1f3f6'
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide track — width: 31% to show ~3 banners at once */}
      <div style={{
        display: 'flex',
        paddingLeft: '1.5%', /* align first card with sidebar */
        transform: `translateX(-${cur * 31}%)`,
        transition: 'transform 0.6s cubic-bezier(.2,.6,.4,1)',
        willChange: 'transform',
      }}>
        {BANNERS.map((b, i) => (
          <div key={i} onClick={() => navigate(b.route)}
            style={{
              minWidth: '31%',
              paddingRight: 8,
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,.08)' }}>
              <img
                src={flxi(1600, 780, b.imgId)}
                alt={`Banner ${i + 1}`}
                style={{ width: '100%', aspectRatio: '1600/780', display: 'block', objectFit: 'cover' }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        ))}
      </div>

      <Arrow side="left"  />
      <Arrow side="right" />

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 5, zIndex: 10,
      }}>
        {BANNERS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{
              width: i === cur ? 20 : 6, height: 6, borderRadius: 3,
              border: 'none', cursor: 'pointer', padding: 0,
              background: i === cur ? '#fff' : 'rgba(255,255,255,0.4)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ② DEAL PRODUCT CARD  (used in horizontal carousel sections)
   — Exact Flipkart design: full-bleed portrait image,
     brand bold + product name, strikethrough MRP + sale price
═══════════════════════════════════════════════════════════════ */
const DealCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const discPct  = disc(product.price, product.original_price);
  const [hov, setHov] = useState(false);

  const handleAddCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  return (
    <div
      id={`deal-card-${product.id}`}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 220, minWidth: 220, flexShrink: 0,
        background: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        /* Flipkart uses a very subtle shadow on card hover */
        boxShadow: hov
          ? '0 4px 20px rgba(0,0,0,.13)'
          : '0 1px 4px rgba(0,0,0,.07)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.22s ease, transform 0.22s ease',
      }}
    >
      {/* ── Full-bleed product image ── */}
      <div style={{
        width: '100%',
        aspectRatio: '1 / 1',       /* perfect square image */
        overflow: 'hidden',
        background: '#f5f5f5',
        position: 'relative',
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.35s ease',
          }}
          onError={e => { e.target.src = 'https://via.placeholder.com/220x220?text=No+Image'; }}
        />
        {/* Discount badge — top-right, Flipkart green */}
        {discPct >= 10 && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: '#388e3c', color: '#fff',
            fontSize: 11, fontWeight: 700,
            padding: '3px 7px', borderRadius: 4,
          }}>
            {discPct}% off
          </div>
        )}
        
        {/* ADD TO CART OVERLAY - Appears on Hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%',
          background: 'rgba(255,255,255,0.95)',
          padding: '10px',
          transform: hov ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.25s cubic-bezier(0,0,0.2,1)',
          display: 'flex', justifyContent: 'center',
          borderTop: '1px solid #f0f0f0',
        }}>
          <button
            onClick={handleAddCart}
            style={{
              width: '100%', padding: '8px 0',
              background: '#ff9f00', color: '#fff',
              border: 'none', borderRadius: 2,
              fontWeight: 600, fontSize: 13,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ── Product info ── */}
      <div style={{ padding: '10px 10px 12px' }}>
        {/* Rating row */}
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
            <span style={{
              background: product.rating >= 4 ? '#388e3c' : product.rating >= 3 ? '#ff9f00' : '#f44336',
              color: '#fff', fontSize: 11, fontWeight: 700,
              padding: '2px 6px', borderRadius: 3,
              display: 'inline-flex', alignItems: 'center', gap: 2,
            }}>
              {product.rating}
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            </span>
            <span style={{ fontSize: 11, color: '#878787' }}>
              ({Number(product.rating_count || 0).toLocaleString('en-IN')})
            </span>
          </div>
        )}

        {/* Brand + Name — "Pepe Jeans Men Regular Fit Floral Pr..." */}
        <p style={{
          fontSize: 13, color: '#212121', margin: '0 0 6px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', lineHeight: 1.45,
        }}>
          {product.brand && (
            <span style={{ fontWeight: 700 }}>{product.brand} </span>
          )}
          <span style={{ color: '#666' }}>{product.name}</span>
        </p>

        {/* Price row — "₹2,399  ₹839" */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
          {product.original_price > product.price && (
            <span style={{ fontSize: 12, color: '#878787', textDecoration: 'line-through' }}>
              {fmt(product.original_price)}
            </span>
          )}
          <span style={{ fontSize: 15, fontWeight: 700, color: '#212121' }}>
            {fmt(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ③ HORIZONTAL DEAL SECTION
   — title + "See All →" + scrollable DealCards with arrows
═══════════════════════════════════════════════════════════════ */
const DealSection = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const scrollRef = useRef(null);
  const navigate  = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/products?category=${encodeURIComponent(category)}&limit=12`)
      .then(r => setProducts(r.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 680, behavior: 'smooth' });

  if (!loading && products.length === 0) return null;

  return (
    <div style={{ background: '#fff', marginTop: 10, borderRadius: 2 }}>

      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 16px 4px',
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#212121', margin: 0 }}>{title}</h2>
        <button
          id={`view-all-${category.toLowerCase()}`}
          onClick={() => navigate(`/category/${category}`)}
          style={{
            width: 30, height: 30, borderRadius: '50%', background: '#2874f0',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1a5dc8'; e.currentTarget.style.transform = 'scale(1.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2874f0'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Carousel with nav arrows */}
      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        <button onClick={() => scroll(-1)} style={arrowStyle('left')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7l6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Scroll container */}
        <div ref={scrollRef} className="fk-scroll"
          style={{ display: 'flex', gap: 10, padding: '14px 16px 18px', overflowX: 'auto' }}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} width={220} height={300} />)
            : products.map(p => <DealCard key={p.id} product={p} />)
          }
        </div>

        {/* Right arrow */}
        <button onClick={() => scroll(1)} style={arrowStyle('right')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1l6 6-6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

/* shared arrow button style */
const arrowStyle = (side) => ({
  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  [side]: 0, background: '#fff', border: 'none', cursor: 'pointer', zIndex: 5,
  width: 24, height: 88,
  borderRadius: side === 'left' ? '0 4px 4px 0' : '4px 0 0 4px',
  boxShadow: side === 'left' ? '2px 0 8px rgba(0,0,0,.1)' : '-2px 0 8px rgba(0,0,0,.1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});

/* ═══════════════════════════════════════════════════════════════
   ④ "SAMPREETH, STILL LOOKING FOR THESE?" SECTION
   — Light lavender background, white rounded cards,
     full-bleed portrait, only category label below
═══════════════════════════════════════════════════════════════ */
const StillLookingCard = ({ product }) => {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);
  return (
    <div
      id={`still-card-${product.id}`}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 152, minWidth: 152, flexShrink: 0,
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hov ? '0 4px 14px rgba(0,0,0,.13)' : '0 1px 4px rgba(0,0,0,.06)',
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Portrait editorial image — full bleed, 188px tall */}
      <div style={{ width: '100%', height: 188, overflow: 'hidden', background: '#f5f5f5' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.35s ease',
          }}
          onError={e => { e.target.src = 'https://via.placeholder.com/152x188?text=No+Image'; }}
        />
      </div>
      {/* Category label */}
      <div style={{ padding: '7px 10px 9px', fontSize: 12, color: '#878787', lineHeight: 1.3 }}>
        {product.category}
      </div>
    </div>
  );
};

const StillLookingSection = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Mix products from Fashion, Mobiles, Beauty for variety
    Promise.all([
      axios.get(`${API}/api/products?category=Fashion&limit=4`),
      axios.get(`${API}/api/products?category=Mobiles&limit=3`),
      axios.get(`${API}/api/products?category=Beauty&limit=3`),
    ])
      .then(([f, m, b]) => {
        const merged = [
          ...(f.data.data || []),
          ...(m.data.data || []),
          ...(b.data.data || []),
        ];
        setProducts(merged);
      })
      .catch(console.error);
  }, []);

  const scroll = () => scrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' });

  if (products.length === 0) return null;

  return (
    /* Light lavender-blue background — exact Flipkart "still looking" bg */
    <div style={{ background: '#EFF0F9', padding: '18px 16px', marginTop: 10 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#212121', margin: '0 0 14px' }}>
        Sampreeth, still looking for these?
      </h2>
      <div style={{ position: 'relative' }}>
        <div ref={scrollRef} className="fk-scroll"
          style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {products.map(p => <StillLookingCard key={p.id} product={p} />)}
        </div>
        {/* Only a right arrow (Flipkart style) */}
        <button
          onClick={scroll}
          style={{
            position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)',
            background: '#fff', border: 'none', cursor: 'pointer', zIndex: 5,
            width: 32, height: 32, borderRadius: '50%',
            boxShadow: '0 2px 10px rgba(0,0,0,.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1l6 6-6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⑤ EDITORIAL CARD — rating overlaid, "Hot Deal", "From ₹X"
   Used for the bigger product grid sections
═══════════════════════════════════════════════════════════════ */
const EditorialCard = ({ product }) => {
  const navigate = useNavigate();
  const discPct  = disc(product.price, product.original_price);
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 175, minWidth: 175, flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        cursor: 'pointer',
        padding: '12px 10px 14px',
        display: 'flex', flexDirection: 'column',
        boxShadow: hov ? '0 4px 18px rgba(0,0,0,.12)' : 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Rating badge */}
      {product.rating && (
        <div style={{
          alignSelf: 'flex-start', marginBottom: 8,
          background: product.rating >= 4 ? '#388e3c' : '#ff9f00',
          color: '#fff', fontSize: 11, fontWeight: 700,
          padding: '2px 6px', borderRadius: 3,
          display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          {product.rating}
          <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
          <span style={{ fontWeight: 400, fontSize: 10, opacity: 0.9 }}>
            | {Number(product.rating_count || 0).toLocaleString('en-IN')} Ratings
          </span>
        </div>
      )}

      {/* Image */}
      <div style={{ height: 156, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.3s',
          }}
          onError={e => { e.target.src = 'https://via.placeholder.com/152'; }}
        />
      </div>

      {/* Name */}
      <p style={{
        fontSize: 13, color: '#212121', lineHeight: 1.4, marginBottom: 4,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{product.name}</p>

      {/* Hot Deal */}
      {discPct >= 20 && (
        <div style={{ fontSize: 12, color: '#388e3c', fontWeight: 600, marginBottom: 4 }}>
          ↓ {discPct}% off — Hot Deal
        </div>
      )}

      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 'auto' }}>
        {product.original_price > product.price && (
          <span style={{ fontSize: 12, color: '#878787', textDecoration: 'line-through' }}>
            {fmt(product.original_price)}
          </span>
        )}
        <span style={{ fontSize: 14, fontWeight: 700, color: '#212121' }}>
          {fmt(product.price)}
        </span>
      </div>
    </div>
  );
};

const EditorialSection = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const scrollRef = useRef(null);
  const navigate  = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/products?category=${encodeURIComponent(category)}&limit=10`)
      .then(r => setProducts(r.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 600, behavior: 'smooth' });

  if (!loading && products.length === 0) return null;

  return (
    <div style={{ background: '#fff', marginTop: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 0' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#212121', margin: 0 }}>{title}</h2>
        <button
          onClick={() => navigate(`/category/${category}`)}
          style={{
            width: 30, height: 30, borderRadius: '50%', background: '#2874f0',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div style={{ position: 'relative' }}>
        <button onClick={() => scroll(-1)} style={arrowStyle('left')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div ref={scrollRef} className="fk-scroll"
          style={{ display: 'flex', overflowX: 'auto', padding: '14px 0 18px' }}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} width={175} height={290} radius={0} />)
            : products.map(p => <EditorialCard key={p.id} product={p} />)
          }
        </div>
        <button onClick={() => scroll(1)} style={arrowStyle('right')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⑥ BRAND CIRCLES STRIP
═══════════════════════════════════════════════════════════════ */
const BrandCirclesStrip = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#fff', marginTop: 10, padding: '18px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {BRANDS.map((b, i) => (
          <div key={i} onClick={() => navigate(b.route)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', overflow: 'hidden',
              background: '#f5f5f5', border: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,.16)'; e.currentTarget.style.transform = 'scale(1.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <img
                src={flxi(50, 50, b.imgId)}
                alt={b.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.src = 'https://via.placeholder.com/56'; }}
              />
            </div>
            <span style={{ fontSize: 11, color: '#212121', fontWeight: 500, whiteSpace: 'nowrap' }}>{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⑦ ABOUT FLIPKART
═══════════════════════════════════════════════════════════════ */
const AboutFlipkart = () => (
  <div style={{ background: '#fff', marginTop: 10, padding: '22px 24px 24px' }}>
    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#212121', marginBottom: 10 }}>
      About Flipkart: India's Largest Online Marketplace
    </h3>
    <p style={{ fontSize: 13, color: '#878787', lineHeight: 1.9, marginBottom: 10 }}>
      Flipkart is India's leading e-commerce marketplace with over 100 million registered customers. With 15 million+ products across 80+ categories, Flipkart offers the best prices backed by a trusted, reliable delivery network.
    </p>
    <p style={{ fontSize: 13, color: '#878787', lineHeight: 1.9 }}>
      From Mobiles, Laptops, TVs and Appliances to Fashion, Beauty, Grocery and Books — shop everything you need at India's best prices. Flipkart Plus, No Cost EMI, and easy returns make every purchase a great deal.
    </p>
    <button style={{ color: '#2874f0', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, fontWeight: 500, padding: 0 }}>
      Read More ▾
    </button>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   HOME — complete composition
═══════════════════════════════════════════════════════════════ */
const Home = () => (
  <div style={{ background: '#f1f3f6', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
    <GlobalStyles />
    <Navbar />

    <div style={{ paddingTop: 158 }}>
      {/* ── ① Full-width auto-sliding banner ── */}
      <BannerCarousel />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ── ② Horizontal deal carousels ── */}
        <DealSection title="Best Gadgets & Appliances" category="Electronics" />
        <DealSection title="Shop For Men's Shirt"      category="Fashion"     />
        <DealSection title="Add to your wishlist"      category="Beauty"      />

        {/* ── ③ "Still looking" lavender section ── */}
        <StillLookingSection />

        {/* ── ④ Editorial sections (big cards with ratings) ── */}
        <EditorialSection title="Top Picks in Mobiles"    category="Mobiles"    />
        <EditorialSection title="Trending Appliances"     category="Appliances" />

        {/* ── ⑤ Brand circles ── */}
        <BrandCirclesStrip />

        {/* ── ⑥ More carousels ── */}
        <DealSection title="Shop for a Cool Summer"  category="Fashion"    />
        <DealSection title="Furniture & Home Decor"  category="Furniture"  />
        <DealSection title="Fresh Grocery Picks"     category="Grocery"    />

        {/* ── ⑦ About ── */}
        <AboutFlipkart />
      </div>
    </div>

    <Footer />
  </div>
);

export default Home;
