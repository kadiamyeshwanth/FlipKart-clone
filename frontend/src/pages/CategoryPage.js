import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FashionLayout from './FashionLayout';
import MobilesLayout from './MobilesLayout';
import BeautyLayout from './BeautyLayout';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const fmt = n => `₹${Number(n).toLocaleString('en-IN')}`;
const disc = (p, o) => (o > p ? Math.round((1 - p / o) * 100) : 0);

/* ─── Actual Flipkart CDN URLs extracted from live site ─── */
const CATEGORY_CONFIG = {
  Fashion: {
    color: '#2874f0',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/c6f4be74f3f4339a.jpg?q=20',
    tagline: 'India ka Fashion Capital',
    subtitle: 'Clothing • Footwear • Accessories',
    subCats: [
      { label: 'Men',           img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/apparels-combo/h/g/m/-original-imaghgfntfz4c3pq.jpeg?q=70' },
      { label: 'Women',         img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/salwar-dupatta/h/j/d/-original-imaga5k6bzyuxygf.jpeg?q=70' },
      { label: 'Kids',          img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/kids-dress/z/d/z/-original-imagfhywzn5hfyuz.jpeg?q=70' },
      { label: 'Ethnic Wear',   img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/lehenga-choli/n/c/i/-original-imaghpqfz8zhz6gy.jpeg?q=70' },
      { label: 'Western Wear',  img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/jeans/j/l/6/-original-imagfbgsdyrjh3zh.jpeg?q=70' },
      { label: 'Sports & Fitness', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/track-pant/b/d/o/-original-imagkcjhytpyq3fz.jpeg?q=70' },
      { label: 'Footwear',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/shoe/g/l/u/-original-imagfqzrk7hbqzze.jpeg?q=70' },
      { label: 'Watches',       img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/watch/g/m/k/-original-imaghg3hnpybgcss.jpeg?q=70' },
      { label: 'Bags & Wallets', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/handbag/j/m/m/-original-imaghkgmfk88dhyf.jpeg?q=70' },
      { label: 'Tshirts',       img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/t-shirt/y/b/x/-original-imaghgcbhxg2nzh9.jpeg?q=70' },
    ],
    promos: [
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/533768a12d211dd7.png?q=20', title: 'Ethnic Wear', subtitle: 'Min 50-80% Off' },
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/c6f4be74f3f4339a.jpg?q=20', title: 'Western Wear', subtitle: 'Min 40-70% Off' },
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/19e834f3d4aa82b3.jpg?q=20', title: "Men's Clothing", subtitle: 'Upto 70% Off' },
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/7d3438302d7fdb2a.jpg?q=20', title: 'Footwear', subtitle: 'Min 40% Off' },
    ],
  },
  Mobiles: {
    color: '#2874f0',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/22fddf3c7da4c4f4.jpg?q=20',
    tagline: 'Best Smartphones & Accessories',
    subtitle: 'Phones • Tablets • Accessories',
    subCats: [
      { label: 'Samsung',   img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/d/e/n/-original-imagjcknd8ncepgq.jpeg?q=70' },
      { label: 'Apple',     img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/a/j/h/-original-imagfhzhfkxvgqzz.jpeg?q=70' },
      { label: 'Realme',    img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/v/d/a/-original-imagshd6ffjk8cnh.jpeg?q=70' },
      { label: 'Redmi',     img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/l/2/r/-original-imaghb4qqzagggfg.jpeg?q=70' },
      { label: 'OnePlus',   img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/s/a/p/nord-ce-4-5g-oneplus-original-imagfsg4kbhwhtqz.jpeg?q=70' },
      { label: 'POCO',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/d/9/p/-original-imaghwnze8wngbyb.jpeg?q=70' },
      { label: 'Under ₹10K', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/mobile/m/s/y/-original-imagghqfmkdp6fjk.jpeg?q=70' },
    ],
    promos: [
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/22fddf3c7da4c4f4.jpg?q=20', title: 'Samsung', subtitle: 'Up to 40% Off' },
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/089d6aaccb5d6f08.png?q=20', title: 'Apple iPhones', subtitle: 'No Cost EMI' },
    ],
  },
  Electronics: {
    color: '#ff9f00',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/089d6aaccb5d6f08.png?q=20',
    tagline: 'Top Electronics Brands',
    subtitle: 'Laptops • Cameras • Audio',
    subCats: [
      { label: 'Laptops',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/laptop/u/y/e/hp-15s-fq5007tu-original-imagfz7qbxhgyzq2.jpeg?q=70' },
      { label: 'Cameras',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/dslr-camera/w/n/w/canon-eos-1500d-original-imagfh9dcjqgrpjs.jpeg?q=70' },
      { label: 'Headphones',   img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/headphone/a/u/e/-original-imaghgeefqkkrg4r.jpeg?q=70' },
      { label: 'Tablets',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/tablet/r/j/5/samsung-galaxy-tab-a9-plus-original-imagwf2sj54hvgbg.jpeg?q=70' },
      { label: 'Smart TV',     img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/television/s/v/b/-original-imaghqhxxgbrzfhf.jpeg?q=70' },
    ],
    promos: [
      { img: 'https://rukminim2.flixcart.com/fk-p-flap/480/234/image/089d6aaccb5d6f08.png?q=20', title: 'Laptops', subtitle: 'Up to 50% Off' },
    ],
  },
  Beauty: {
    color: '#ff6b9d',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0fe0a65805b3fb9f.jpg?q=20',
    tagline: 'Beauty & Personal Care',
    subtitle: 'Skincare • Makeup • Fragrances',
    subCats: [
      { label: 'Skincare',    img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/moisturizer-cream/f/v/r/-original-imaghgd7d77zzgqr.jpeg?q=70' },
      { label: 'Makeup',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/lipstick/c/3/x/lakme-enrich-matte-original-imagfhzhzm36mfhf.jpeg?q=70' },
      { label: 'Haircare',    img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/shampoo/e/u/8/matrix-smooth-to-the-core-original-imaghgvzfjjtazgz.jpeg?q=70' },
      { label: 'Fragrances',  img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/perfume/a/7/j/-original-imaghdhzjzfhngzr.jpeg?q=70' },
      { label: 'Men Grooming', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/beard-oil/p/p/m/-original-imaghaqhzpz3jgzq.jpeg?q=70' },
    ],
    promos: [],
  },
  Appliances: {
    color: '#0f9d58',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/f4ed6bd976ebbd65.png?q=20',
    tagline: 'Home Appliances',
    subtitle: 'TVs • ACs • Washing Machines',
    subCats: [
      { label: 'Smart TVs',    img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/television/s/v/b/-original-imaghqhxxgbrzfhf.jpeg?q=70' },
      { label: 'ACs',          img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/air-conditioner/h/r/p/-original-imaghwcygjg84bgq.jpeg?q=70' },
      { label: 'Refrigerators', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/refrigerator/z/x/l/-original-imaghg5zhqzg6ggq.jpeg?q=70' },
      { label: 'Washing Machines', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/washing-machine/r/s/d/-original-imaghg3dbfjzggzf.jpeg?q=70' },
    ],
    promos: [],
  },
  Furniture: {
    color: '#7c5c3e',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/089d6aaccb5d6f08.png?q=20',
    tagline: 'FurniSure — Be Sure, Always',
    subtitle: 'Sofas • Beds • Wardrobes',
    subCats: [
      { label: 'Sofas',     img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/sofa-set/a/b/c/-original-imaghg3yhfzggqff.jpeg?q=70' },
      { label: 'Beds',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/bed/b/c/d/-original-imaghgfyz3ghbqzf.jpeg?q=70' },
      { label: 'Wardrobes', img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/wardrobe/a/b/c/-original-imaghgfyz3ghbqzg.jpeg?q=70' },
    ],
    promos: [],
  },
  Grocery: {
    color: '#4caf50',
    banner: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0fe0a65805b3fb9f.jpg?q=20',
    tagline: 'Fresh Groceries & Daily Essentials',
    subtitle: 'Food • Health • Daily Needs',
    subCats: [
      { label: 'Dry Fruits',  img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/dry-fruit/a/b/c/-original-imaghgzyz3ghbqzf.jpeg?q=70' },
      { label: 'Cereals',     img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/cereal/a/b/c/-original-imaghgzyz3ghbqzg.jpeg?q=70' },
      { label: 'Snacks',      img: 'https://rukminim2.flixcart.com/image/200/200/xif0q/snack/a/b/c/-original-imaghgzyz3ghbqzh.jpeg?q=70' },
    ],
    promos: [],
  },
};

const DEFAULT_CONFIG = {
  color: '#2874f0',
  banner: '',
  tagline: 'Shop Now',
  subtitle: 'Best deals on all products',
  subCats: [],
  promos: [],
};

/* ─── Helpers ─── */
const disc_val = (p, o) => (o > p ? Math.round((1 - p / o) * 100) : 0);

const RatingBadge = ({ rating }) => {
  const color = rating >= 4 ? '#388e3c' : rating >= 3 ? '#ff9f00' : '#f44336';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      background: color, color: '#fff', fontSize: 10, fontWeight: 700,
      borderRadius: 3, padding: '2px 4px', letterSpacing: 0.3,
    }}>
      {Number(rating).toFixed(1)} ★
    </span>
  );
};

/* ─── Grid product card — exact Flipkart style ─── */
const GridCard = ({ product, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const d = disc_val(product.price, product.original_price);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'box-shadow 0.15s',
        boxShadow: hovered ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* Image area */}
      <div style={{
        height: 200, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 12, position: 'relative',
      }}>
        <img
          src={product.image_url || product.image}
          alt={product.name}
          style={{
            maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.25s ease',
          }}
          onError={e => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
        />
        {d >= 10 && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            background: '#ff6161', color: '#fff',
            fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 2,
          }}>
            {d}% off
          </div>
        )}
      </div>

      {/* Info area */}
      <div style={{ padding: '8px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontSize: 13, color: '#212121', lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          marginBottom: 4,
        }}>
          {product.name}
        </div>

        {product.rating > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <RatingBadge rating={product.rating} />
            <span style={{ fontSize: 11, color: '#878787' }}>
              ({(product.rating_count || 0).toLocaleString('en-IN')})
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#212121' }}>
            {fmt(product.price)}
          </span>
          {product.original_price > product.price && (
            <>
              <span style={{ fontSize: 11, color: '#878787', textDecoration: 'line-through' }}>
                {fmt(product.original_price)}
              </span>
              <span style={{ fontSize: 11, color: '#388e3c', fontWeight: 600 }}>
                {d}% off
              </span>
            </>
          )}
        </div>

        {product.brand && (
          <div style={{ fontSize: 11, color: '#878787', marginTop: 3 }}>
            by <span style={{ color: '#2874f0' }}>{product.brand}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── List product card — Flipkart browse page style ─── */
const ListCard = ({ product, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const d = disc_val(product.price, product.original_price);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: 20, background: '#fff',
        padding: '16px 20px', borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer', transition: 'box-shadow 0.15s',
        boxShadow: hovered ? '0 2px 16px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{
        width: 200, height: 200, minWidth: 200, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f9f9f9', borderRadius: 4, padding: 8,
      }}>
        <img
          src={product.image_url || product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          onError={e => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, color: '#212121', lineHeight: 1.5, marginBottom: 5 }}>
          {product.name}
        </div>

        {product.rating > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <RatingBadge rating={product.rating} />
            <span style={{ fontSize: 12, color: '#878787' }}>
              {(product.rating_count || 0).toLocaleString('en-IN')} Ratings
            </span>
            {product.rating >= 4.3 && (
              <span style={{
                fontSize: 11, color: '#388e3c', background: '#eafaf1',
                padding: '2px 8px', borderRadius: 3, fontWeight: 600,
              }}>
                Flipkart's Choice
              </span>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#212121' }}>{fmt(product.price)}</span>
          {product.original_price > product.price && (
            <>
              <span style={{ fontSize: 14, color: '#878787', textDecoration: 'line-through' }}>
                {fmt(product.original_price)}
              </span>
              <span style={{ fontSize: 14, color: '#388e3c', fontWeight: 600 }}>{d}% off</span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {['Bank Offer', 'No Cost EMI', 'Free Delivery'].map(o => (
            <span key={o} style={{
              fontSize: 11, color: '#2874f0', border: '1px solid #c5dcfc',
              borderRadius: 3, padding: '2px 8px', background: '#f0f5ff',
            }}>{o}</span>
          ))}
        </div>

        {product.description && (
          <ul style={{ margin: 0, paddingLeft: 14 }}>
            {product.description.split(/[,;]/).slice(0, 3).map((h, i) => (
              <li key={i} style={{ fontSize: 13, color: '#212121', lineHeight: 1.6 }}>
                {h.trim()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right col */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 140, flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: '#388e3c', fontWeight: 600 }}>✓ Free Delivery</div>
        <button
          onClick={e => { e.stopPropagation(); onClick(); }}
          style={{
            padding: '10px 0', background: '#ff9f00', color: '#fff',
            border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 13,
            cursor: 'pointer', width: '100%', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e65c00'}
          onMouseLeave={e => e.currentTarget.style.background = '#ff9f00'}
        >
          View Details
        </button>
        <div style={{ fontSize: 11, color: '#878787', textAlign: 'center' }}>
          {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
        </div>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      border: '3px solid #f0f0f0', borderTop: '3px solid #2874f0',
      animation: 'cpspin 0.8s linear infinite',
    }} />
    <style>{`@keyframes cpspin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

/* ═══════════════════════════ CATEGORY PAGE ═══════════════════════════ */
const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const category = decodeURIComponent(categoryName || '');
  const config = CATEGORY_CONFIG[category] || DEFAULT_CONFIG;

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [sortBy, setSortBy]           = useState('popularity');
  const [priceFilter, setPriceFilter] = useState([]);
  const [discFilter, setDiscFilter]   = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [activeSub, setActiveSub]     = useState('All');
  const [viewMode, setViewMode]       = useState('grid'); // 'grid' | 'list'
  const [page, setPage]               = useState(1);
  const [bannerError, setBannerError] = useState(false);
  const PER_PAGE = 24;

  useEffect(() => {
    setLoading(true);
    setAllProducts([]);
    setPage(1);
    setPriceFilter([]);
    setDiscFilter([]);
    setRatingFilter(null);
    setActiveSub('All');
    setBannerError(false);

    axios.get(`${API}/api/products?category=${encodeURIComponent(category)}&limit=100`)
      .then(({ data }) => { if (data.success) setAllProducts(data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  /* Filter + sort */
  const filtered = allProducts.filter(p => {
    if (priceFilter.length) {
      const ok = priceFilter.some(r => {
        if (r === 'u500')  return p.price < 500;
        if (r === 'u1k')   return p.price >= 500 && p.price < 1000;
        if (r === 'u5k')   return p.price >= 1000 && p.price < 5000;
        if (r === 'u10k')  return p.price >= 5000 && p.price < 10000;
        if (r === 'o10k')  return p.price >= 10000;
        return true;
      });
      if (!ok) return false;
    }
    if (discFilter.length) {
      const d = disc(p.price, p.original_price);
      if (!discFilter.some(r => d >= parseInt(r))) return false;
    }
    if (ratingFilter && p.rating < ratingFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_low')  return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating')     return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'newest')     return new Date(b.created_at) - new Date(a.created_at);
    return (b.rating_count || 0) - (a.rating_count || 0);
  });

  const displayed = sorted.slice(0, page * PER_PAGE);
  const hasMore   = displayed.length < sorted.length;

  const togglePrice  = r => setPriceFilter(p => p.includes(r) ? p.filter(x => x !== r) : [...p, r]);
  const toggleDisc   = r => setDiscFilter(p  => p.includes(r) ? p.filter(x => x !== r) : [...p, r]);
  const toggleRating = r => setRatingFilter(prev => prev === r ? null : r);
  const clearAll = () => { setPriceFilter([]); setDiscFilter([]); setRatingFilter(null); };
  const hasFilters = priceFilter.length || discFilter.length || ratingFilter;

  /* Sub-cat filtered list (client-side name match) */
  const displayedWithSub = activeSub === 'All'
    ? displayed
    : displayed.filter(p =>
        (p.sub_category || p.name || '').toLowerCase().includes(activeSub.toLowerCase())
      );

  if (category.toLowerCase() === 'fashion') {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
        <Navbar activeCategory={category} />
        <div style={{ paddingTop: 151 }}>
          <FashionLayout />
        </div>
        <Footer />
      </div>
    );
  }

  if (category.toLowerCase() === 'mobiles') {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
        <Navbar activeCategory={category} />
        <div style={{ paddingTop: 151 }}>
          <MobilesLayout />
        </div>
        <Footer />
      </div>
    );
  }

  if (category.toLowerCase() === 'beauty') {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
        <Navbar activeCategory={category} />
        <div style={{ paddingTop: 151 }}>
          <BeautyLayout />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
      <Navbar activeCategory={category} />

      <div style={{ paddingTop: 151 }}>

        {/* ════ HERO BANNER ════ */}
        {!bannerError && config.banner ? (
          <div style={{ width: '100%', lineHeight: 0 }}>
            <img
              src={config.banner}
              alt={category}
              style={{ width: '100%', height: 'auto', maxHeight: 270, objectFit: 'cover' }}
              onError={() => setBannerError(true)}
            />
          </div>
        ) : (
          <div style={{
            background: 'linear-gradient(270deg, #2874f0 0%, #0950c7 100%)',
            padding: '28px 32px',
          }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <h1 style={{ margin: 0, color: '#fff', fontSize: 26, fontWeight: 700 }}>{category}</h1>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>{config.subtitle}</div>
            </div>
          </div>
        )}

        {/* ════ SUB-CATEGORY ICON STRIP ════ */}
        {config.subCats.length > 0 && (
          <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{
              maxWidth: 1280, margin: '0 auto',
              display: 'flex', gap: 0, overflowX: 'auto',
              scrollbarWidth: 'none', padding: '0 8px',
            }}>
              {/* "All" chip */}
              <button
                onClick={() => setActiveSub('All')}
                style={{
                  flexShrink: 0, padding: '12px 16px',
                  background: 'none', border: 'none',
                  borderBottom: activeSub === 'All' ? '3px solid #2874f0' : '3px solid transparent',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4, minWidth: 70,
                }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: '50%',
                  background: '#f0f5ff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, border: activeSub === 'All' ? '2px solid #2874f0' : '2px solid transparent',
                }}>
                  🛒
                </div>
                <span style={{
                  fontSize: 11, color: activeSub === 'All' ? '#2874f0' : '#333',
                  fontWeight: activeSub === 'All' ? 700 : 400, whiteSpace: 'nowrap',
                }}>All</span>
              </button>

              {config.subCats.map(sc => (
                <button
                  key={sc.label}
                  onClick={() => setActiveSub(sc.label)}
                  style={{
                    flexShrink: 0, padding: '12px 12px',
                    background: 'none', border: 'none',
                    borderBottom: activeSub === sc.label ? '3px solid #2874f0' : '3px solid transparent',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 4, minWidth: 80,
                  }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%', overflow: 'hidden',
                    border: activeSub === sc.label ? '2px solid #2874f0' : '2px solid #e0e0e0',
                  }}>
                    <img
                      src={sc.img}
                      alt={sc.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <span style={{
                    fontSize: 11, color: activeSub === sc.label ? '#2874f0' : '#333',
                    fontWeight: activeSub === sc.label ? 700 : 400, whiteSpace: 'nowrap',
                  }}>{sc.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ════ PROMO BANNER GRID ════ */}
        {config.promos.length > 0 && (
          <div style={{ maxWidth: 1280, margin: '12px auto 0', padding: '0 12px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: config.promos.length >= 4
                ? 'repeat(4, 1fr)'
                : `repeat(${config.promos.length}, 1fr)`,
              gap: 12,
            }}>
              {config.promos.map((p, i) => (
                <div key={i} style={{
                  borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
                  position: 'relative', boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width: '100%', display: 'block', minHeight: 80, objectFit: 'cover', background: '#f0f0f0' }}
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = '#2874f0';
                      e.target.parentNode.style.padding = '20px';
                      e.target.parentNode.style.minHeight = '80px';
                    }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
                    padding: '12px 10px 8px',
                  }}>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{p.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>{p.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ MAIN: SIDEBAR + PRODUCTS ════ */}
        <div style={{
          display: 'flex', maxWidth: 1280, margin: '12px auto 0',
          alignItems: 'flex-start', gap: 0,
        }}>

          {/* ── FILTERS SIDEBAR ── */}
          <aside style={{
            width: 232, minWidth: 232, background: '#fff',
            position: 'sticky', top: 151,
            maxHeight: 'calc(100vh - 155px)', overflowY: 'auto',
            borderRight: '1px solid #f0f0f0',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px', borderBottom: '1px solid #f0f0f0',
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#212121', letterSpacing: 0.5 }}>
                FILTERS
              </span>
              {hasFilters ? (
                <button onClick={clearAll} style={{
                  background: 'none', border: 'none', color: '#2874f0',
                  fontSize: 12, cursor: 'pointer', fontWeight: 600, padding: 0,
                }}>
                  CLEAR ALL
                </button>
              ) : null}
            </div>

            {/* Active filter pills */}
            {hasFilters ? (
              <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: 6, borderBottom: '1px solid #f0f0f0' }}>
                {priceFilter.map(f => <FilterPill key={f} label={f} onRemove={() => togglePrice(f)} />)}
                {discFilter.map(f  => <FilterPill key={f} label={`${f}% off`} onRemove={() => toggleDisc(f)} />)}
                {ratingFilter && <FilterPill label={`${ratingFilter}★+`} onRemove={() => setRatingFilter(null)} />}
              </div>
            ) : null}

            <FilterSection title="PRICE RANGE">
              {[
                ['u500',  'Under ₹500'],
                ['u1k',   '₹500 – ₹1,000'],
                ['u5k',   '₹1,000 – ₹5,000'],
                ['u10k',  '₹5,000 – ₹10,000'],
                ['o10k',  'Above ₹10,000'],
              ].map(([val, label]) => (
                <FilterCheckbox
                  key={val} label={label}
                  checked={priceFilter.includes(val)}
                  onChange={() => togglePrice(val)}
                />
              ))}
            </FilterSection>

            <FilterSection title="DISCOUNT">
              {[['10','10% or more'], ['20','20% or more'], ['30','30% or more'],
                ['40','40% or more'], ['50','50% or more']].map(([val, label]) => (
                <FilterCheckbox
                  key={val} label={label}
                  checked={discFilter.includes(val)}
                  onChange={() => toggleDisc(val)}
                />
              ))}
            </FilterSection>

            <FilterSection title="CUSTOMER RATINGS">
              {[4, 3, 2].map(r => (
                <FilterCheckbox
                  key={r} label={`${r}★ & above`}
                  checked={ratingFilter === r}
                  onChange={() => toggleRating(r)}
                />
              ))}
            </FilterSection>

            <FilterSection title="AVAILABILITY">
              <FilterCheckbox label="In Stock Only" checked={false} onChange={() => {}} />
            </FilterSection>
          </aside>

          {/* ── PRODUCTS AREA ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Sort bar + view toggle */}
            <div style={{
              display: 'flex', alignItems: 'center',
              background: '#fff', padding: '0 16px',
              borderBottom: '1px solid #f0f0f0',
              position: 'sticky', top: 151, zIndex: 9,
            }}>
              <span style={{ fontSize: 12, color: '#878787', marginRight: 16, fontWeight: 500 }}>
                Sort By
              </span>
              {[
                ['popularity',  'Popularity'],
                ['price_low',   'Price — Low to High'],
                ['price_high',  'Price — High to Low'],
                ['rating',      'Ratings'],
                ['newest',      'Newest First'],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSortBy(val)}
                  style={{
                    padding: '14px 14px',
                    background: 'none', border: 'none',
                    fontSize: 12, cursor: 'pointer',
                    fontWeight: sortBy === val ? 700 : 400,
                    color: sortBy === val ? '#2874f0' : '#212121',
                    borderBottom: sortBy === val ? '3px solid #2874f0' : '3px solid transparent',
                    whiteSpace: 'nowrap', transition: 'all 0.15s',
                  }}
                >
                  {label}
                </button>
              ))}

              {/* View toggle */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                <button
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  style={{
                    padding: '6px 8px', border: '1px solid',
                    borderColor: viewMode === 'grid' ? '#2874f0' : '#ddd',
                    background: viewMode === 'grid' ? '#e8f0fe' : '#fff',
                    borderRadius: 3, cursor: 'pointer', lineHeight: 1,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="6" height="6" rx="1" fill={viewMode==='grid'?'#2874f0':'#888'}/>
                    <rect x="9" y="1" width="6" height="6" rx="1" fill={viewMode==='grid'?'#2874f0':'#888'}/>
                    <rect x="1" y="9" width="6" height="6" rx="1" fill={viewMode==='grid'?'#2874f0':'#888'}/>
                    <rect x="9" y="9" width="6" height="6" rx="1" fill={viewMode==='grid'?'#2874f0':'#888'}/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="List View"
                  style={{
                    padding: '6px 8px', border: '1px solid',
                    borderColor: viewMode === 'list' ? '#2874f0' : '#ddd',
                    background: viewMode === 'list' ? '#e8f0fe' : '#fff',
                    borderRadius: 3, cursor: 'pointer', lineHeight: 1,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="2" width="14" height="2.5" rx="1" fill={viewMode==='list'?'#2874f0':'#888'}/>
                    <rect x="1" y="6.5" width="14" height="2.5" rx="1" fill={viewMode==='list'?'#2874f0':'#888'}/>
                    <rect x="1" y="11" width="14" height="2.5" rx="1" fill={viewMode==='list'?'#2874f0':'#888'}/>
                  </svg>
                </button>
              </div>

              <span style={{ marginLeft: 12, fontSize: 12, color: '#878787' }}>
                {sorted.length} items
              </span>
            </div>

            {/* Products */}
            {loading ? (
              <div style={{ background: '#fff' }}><Spinner /></div>
            ) : displayedWithSub.length === 0 ? (
              <div style={{ background: '#fff', padding: '60px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 72, marginBottom: 16 }}>🛍️</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#212121', marginBottom: 8 }}>
                  No products found
                </div>
                <div style={{ fontSize: 14, color: '#878787', marginBottom: 24 }}>
                  Try adjusting your filters or explore a different category.
                </div>
                <button
                  onClick={clearAll}
                  style={{
                    padding: '10px 32px', background: '#2874f0', color: '#fff',
                    border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1, background: '#f1f3f6',
              }}>
                {displayedWithSub.map(p => (
                  <GridCard
                    key={p.id}
                    product={p}
                    onClick={() => navigate(`/product/${p.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div style={{ background: '#fff' }}>
                {displayedWithSub.map(p => (
                  <ListCard
                    key={p.id}
                    product={p}
                    onClick={() => navigate(`/product/${p.id}`)}
                  />
                ))}
              </div>
            )}

            {/* Load more / End */}
            {!loading && displayedWithSub.length > 0 && (
              <div style={{ textAlign: 'center', padding: '20px 0', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
                {hasMore && activeSub === 'All' ? (
                  <>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      style={{
                        padding: '11px 48px', background: '#fff', color: '#2874f0',
                        border: '1px solid #2874f0', borderRadius: 4,
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#2874f0'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#2874f0'; }}
                    >
                      Load More
                    </button>
                    <div style={{ fontSize: 12, color: '#878787', marginTop: 8 }}>
                      Showing {displayedWithSub.length} of {sorted.length} products
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 13, color: '#878787' }}>
                    ✓ You've seen all {displayedWithSub.length} products
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

/* ─── Helper sub-components ─── */
const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: '#212121', letterSpacing: 0.6 }}>{title}</span>
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d={open ? 'M1 5L5 1L9 5' : 'M1 1L5 5L9 1'} stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && <div style={{ padding: '2px 16px 12px' }}>{children}</div>}
    </div>
  );
};

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '5px 0', cursor: 'pointer', userSelect: 'none',
  }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ width: 14, height: 14, accentColor: '#2874f0', cursor: 'pointer' }}
    />
    <span style={{ fontSize: 13, color: '#212121' }}>{label}</span>
  </label>
);

const FilterPill = ({ label, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: '#e8f0fe', color: '#2874f0', borderRadius: 12,
    padding: '2px 8px', fontSize: 11, fontWeight: 500,
  }}>
    {label}
    <button onClick={onRemove} style={{
      background: 'none', border: 'none', color: '#2874f0',
      cursor: 'pointer', padding: 0, fontSize: 13, lineHeight: 1,
    }}>×</button>
  </span>
);

export default CategoryPage;
