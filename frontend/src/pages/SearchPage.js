import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const disc = (p, o) => Math.round((1 - p / o) * 100);

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';
  const category = params.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [priceFilter, setPriceFilter] = useState([]);
  const [discFilter, setDiscFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = `${API}/api/products?limit=50`;
    if (query) url += `&search=${encodeURIComponent(query)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    axios.get(url)
      .then(({ data }) => { if (data.success) setProducts(data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query, category]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.rating_count - a.rating_count;
  });

  const filterProduct = (p) => {
    // Check price
    if (priceFilter.length > 0) {
      const ok = priceFilter.some(range => {
        if (range === 'under500') return p.price < 500;
        if (range === '500-1000') return p.price >= 500 && p.price <= 1000;
        if (range === '1000-5000') return p.price > 1000 && p.price <= 5000;
        if (range === '5000-10000') return p.price > 5000 && p.price <= 10000;
        if (range === 'over10000') return p.price > 10000;
        return true;
      });
      if (!ok) return false;
    }
    
    // Check discount
    if (discFilter.length > 0) {
      const d = disc(p.price, p.original_price);
      const ok = discFilter.some(r => d >= parseInt(r));
      if (!ok) return false;
    }

    // Check rating
    if (ratingFilter) {
      if (p.rating < ratingFilter) return false;
    }

    return true;
  };

  const displayProducts = sortedProducts.filter(filterProduct);

  const togglePrice = (range) => {
    setPriceFilter(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleDisc = (range) => {
    setDiscFilter(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleRating = (r) => setRatingFilter(prev => prev === r ? null : r);

  const pageTitle = category || (query ? `Results for "${query}"` : 'All Products');

  return (
    <div className="app-wrapper">
      <Navbar activeCategory={category} />
      <div className="page-content">
        <div className="products-page">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-sidebar-title">Filters</div>

            {/* Price Range */}
            <div className="filter-section">
              <div className="filter-section-title">Price</div>
              {[
                ['under500', 'Under ₹500'],
                ['500-1000', '₹500 – ₹1,000'],
                ['1000-5000', '₹1,000 – ₹5,000'],
                ['5000-10000', '₹5,000 – ₹10,000'],
                ['over10000', 'Above ₹10,000'],
              ].map(([val, label]) => (
                <label key={val} className="filter-option">
                  <input
                    type="checkbox"
                    checked={priceFilter.includes(val)}
                    onChange={() => togglePrice(val)}
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* Rating */}
            <div className="filter-section">
              <div className="filter-section-title">Customer Ratings</div>
              {[4, 3, 2].map(r => (
                <label key={r} className="filter-option" style={{ cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={ratingFilter === r}
                    onChange={() => toggleRating(r)}
                  />
                  {r} ★ &amp; above
                </label>
              ))}
            </div>

            {/* Discount */}
            <div className="filter-section">
              <div className="filter-section-title">Discount</div>
              {['10', '20', '30', '40', '50'].map(d => (
                <label key={d} className="filter-option" style={{ cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={discFilter.includes(d)}
                    onChange={() => toggleDisc(d)}
                  />
                  {d}% or more
                </label>
              ))}
            </div>
          </aside>

          {/* Products Area */}
          <div className="products-list-area">
            {/* Sort Bar */}
            <div className="sort-bar">
              <span>Sort By</span>
              {[
                ['popularity', 'Popularity'],
                ['price_low', 'Price — Low to High'],
                ['price_high', 'Price — High to Low'],
                ['rating', 'Ratings'],
              ].map(([val, label]) => (
                <button
                  key={val}
                  className={`sort-option ${sortBy === val ? 'active' : ''}`}
                  onClick={() => setSortBy(val)}
                  id={`sort-${val}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Page Title */}
            <div style={{ padding: '10px 24px 0', fontSize: 20, fontWeight: 600, background: '#fff' }}>
              {pageTitle}
            </div>

            {loading ? (
              <div className="spinner-wrap"><div className="spinner" /></div>
            ) : displayProducts.length === 0 ? (
              <div style={{ background: '#fff', padding: 40, textAlign: 'center', color: '#878787' }}>
                No products found.
              </div>
            ) : (
              displayProducts.map(p => (
                <div
                  key={p.id}
                  className="product-list-card"
                  onClick={() => navigate(`/product/${p.id}`)}
                  id={`search-product-${p.id}`}
                >
                  <div className="product-list-thumb">
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/210?text=No+Image'; }}
                    />
                  </div>
                  <div className="product-list-info">
                    <div className="product-list-name">{p.name}</div>
                    <div className="product-list-rating-row">
                      <span className="rating-badge">{p.rating} ★</span>
                      <span className="rating-count">({Number(p.rating_count).toLocaleString('en-IN')} Ratings)</span>
                    </div>
                    <div className="product-list-price-row">
                      <span className="product-list-price">{fmt(p.price)}</span>
                      {p.original_price > p.price && (
                        <>
                          <span className="product-list-original">{fmt(p.original_price)}</span>
                          <span className="product-list-discount">{disc(p.price, p.original_price)}% off</span>
                        </>
                      )}
                    </div>
                    {p.description && (
                      <ul className="product-list-highlights">
                        {p.description.split(',').slice(0, 3).map((h, i) => (
                          <li key={i}>{h.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
