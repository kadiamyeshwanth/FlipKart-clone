/**
 * FLIPKART-STYLE PRODUCT DETAIL PAGE — PIXEL-PERFECT REPLICA
 * ══════════════════════════════════════════════════════════════
 * Real assets from Flipkart CDN, exact layout structure
 * 3-Column: Gallery | Details | Pricing
 */

import React, { useState } from 'react';
import './ProductDetailPro.css';

const ProductDetailPro = () => {
  const [activeTab, setActiveTab] = useState('highlights');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedVariant, setSelectedVariant] = useState('128gb-6gb');

  // ══════ REAL FLIPKART CDN URLS ══════
  const IMAGES = {
    main: 'https://rukminim2.flixcart.com/image/1000/1340/xif0q/mobile/3/u/i/-original-imahkur3ethtv2hq.jpeg?q=60',
    variant: 'https://rukminim2.flixcart.com/image/1000/1340/xif0q/mobile/m/v/f/-original-imahmhmcyjdzvwxn.jpeg?q=60',
    showcase: 'https://rukminim2.flixcart.com/image/2000/1500/cms-rpd-img/6afdfafb05c442a291ca64884fb3f0a1_19cd201b0fc_1.jpg.jpeg?q=60',
  };

  const VIDEOS = [
    'https://img.youtube.com/vi/6RRTF5ymMEg/0.jpg',
    'https://img.youtube.com/vi/XiBr4-RLCsc/0.jpg',
    'https://img.youtube.com/vi/VpLT1913E7k/0.jpg',
  ];

  const HIGHLIGHT_ICONS = [
    'https://rukminim2.flixcart.com/www/60/60/promos/28/06/2025/ca3c722b-3b51-4553-b9f5-5f25f82b5b75.png?q=60',
    'https://rukminim2.flixcart.com/www/60/60/promos/28/06/2025/d5149d46-d48f-448f-af46-174aeb1924f4.png?q=60',
    'https://rukminim2.flixcart.com/www/60/60/promos/28/06/2025/e25e9e36-1c3f-412d-b632-9524aabb873c.png?q=60',
    'https://rukminim2.flixcart.com/www/60/60/promos/28/06/2025/18e5791c-614f-49db-b1a9-1a23921cb33c.png?q=60',
    'https://rukminim2.flixcart.com/www/60/60/promos/28/06/2025/b19e02c0-f7fe-4ff2-9727-07609eecf6e6.png?q=60',
    'https://rukminim2.flixcart.com/www/60/60/promos/28/06/2025/323c3573-6148-4f0d-9b2b-ba5f07cedef9.png?q=60',
  ];

  const OFFER_ICONS = [
    'https://rukminim2.flixcart.com/www/48/48/promos/01/09/2025/5a1f9675-770e-4043-8e1c-4f246b657998.png?q=60',
    'https://rukminim2.flixcart.com/www/48/48/promos/11/09/2025/812a123c-f432-42fc-9f80-502cd78ddaeb.png?q=60',
    'https://rukminim2.flixcart.com/www/48/48/promos/30/08/2024/17db8132-7d7a-423a-8d9e-8ffa588e4751.png?q=60',
    'https://rukminim2.flixcart.com/www/48/48/promos/30/08/2024/0eeba367-989d-49e6-a27b-d7884f43e63d.png?q=60',
    'https://rukminim2.flixcart.com/www/48/48/promos/25/07/2024/40a2087b-81b3-4938-8afe-3565b82a66f0.png?q=60',
  ];

  const PLAY_ICON = 'https://rukminim2.flixcart.com/www/112/112/promos/25/04/2019/0049b8f4-06f2-4488-93e1-f64f194b6415.png?q=60';

  return (
    <div className="product-detail-wrapper">
      {/* ════════════════════════════════════════════════════════════
          3-COLUMN LAYOUT: Gallery | Details | Pricing
      ════════════════════════════════════════════════════════════ */}
      <div className="container-3col">

        {/* ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐
            LEFT: PRODUCT GALLERY
        ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐ */}
        <div className="col-left">
          {/* Main Image */}
          <div className="image-main">
            <img src={IMAGES.main} alt="Samsung Galaxy F70e 5G" />
          </div>

          {/* Thumbnails: 2x2 Grid */}
          <div className="thumbnails-grid">
            {[IMAGES.main, IMAGES.variant, VIDEOS[0], VIDEOS[1]].map((img, idx) => (
              <div
                key={idx}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
                {idx >= 2 && <div className="play-badge">▶</div>}
              </div>
            ))}
          </div>

          {/* Reasons to Frame Up Card */}
          <div className="promo-card">
            <div className="promo-title">Reasons to Frame Up</div>
            <div className="promo-grid">
              <img src={VIDEOS[0]} alt="reason" className="promo-img" />
              <img src={VIDEOS[1]} alt="reason" className="promo-img" />
            </div>
            <div className="promo-count">+23</div>
          </div>
        </div>

        {/* ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐
            CENTER: PRODUCT DETAILS
        ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐ */}
        <div className="col-center">
          {/* Title & Rating */}
          <div className="header-section">
            <h1 className="product-title">Samsung Galaxy F70e 5G (Spotlight Blue, 128 GB) (6 GB RAM)</h1>
            <div className="rating-bar">
              <span className="rating-badge">
                <span className="rating-value">4.3</span>
                <span className="rating-star">★</span>
              </span>
              <span className="rating-count">936 Reviews</span>
            </div>
          </div>

          {/* Highlights List */}
          <div className="highlights-section">
            <div className="highlights-list">
              <div className="highlight-item">
                <img src={HIGHLIGHT_ICONS[0]} alt="RAM" className="highlight-icon" />
                <div>6 GB RAM | 128 GB ROM</div>
              </div>
              <div className="highlight-item">
                <img src={HIGHLIGHT_ICONS[1]} alt="Processor" className="highlight-icon" />
                <div>Dimensity 6300 | Octa Core</div>
              </div>
              <div className="highlight-item">
                <img src={HIGHLIGHT_ICONS[2]} alt="Camera" className="highlight-icon" />
                <div>50MP + 2MP Rear Camera</div>
              </div>
              <div className="highlight-item">
                <img src={HIGHLIGHT_ICONS[3]} alt="Front Camera" className="highlight-icon" />
                <div>8MP Front Camera</div>
              </div>
              <div className="highlight-item">
                <img src={HIGHLIGHT_ICONS[4]} alt="Display" className="highlight-icon" />
                <div>6.74" FHD+ Display | 120Hz</div>
              </div>
              <div className="highlight-item">
                <img src={HIGHLIGHT_ICONS[5]} alt="Battery" className="highlight-icon" />
                <div>6000 mAh Battery | 26h Playback</div>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="color-section">
            <h3 className="section-title">Color</h3>
            <div className="color-options">
              {['blue', 'silver', 'black', 'gold'].map(color => (
                <div
                  key={color}
                  className={`color-box ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundImage: `url(${IMAGES.main})` }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && <span className="checkmark">✓</span>}
                </div>
              ))}
            </div>
            <div className="selected-color">Spotlight Blue</div>
          </div>

          {/* Storage/RAM Variants */}
          <div className="variant-section">
            <h3 className="section-title">Storage</h3>
            <div className="variant-boxes">
              {[
                { id: '128gb-4gb', text: '128 GB + 4 GB' },
                { id: '128gb-6gb', text: '128 GB + 6 GB', recommended: true },
                { id: '256gb-6gb', text: '256 GB + 6 GB' },
                { id: '256gb-8gb', text: '256 GB + 8 GB' },
              ].map(variant => (
                <div
                  key={variant.id}
                  className={`variant-box ${selectedVariant === variant.id ? 'selected' : ''}`}
                  onClick={() => setSelectedVariant(variant.id)}
                >
                  {variant.recommended && <span className="rec-badge">Recommended</span>}
                  <div className="variant-text">{variant.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs: Highlights | Specifications | Warranty */}
          <div className="tabs-section">
            <div className="tabs-header">
              {['highlights', 'specifications', 'warranty'].map(tab => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="tabs-content">
              {activeTab === 'highlights' && (
                <div className="tab-pane">
                  <h4>Key Specifications</h4>
                  <ul>
                    <li>Processor: MediaTek Dimensity 6300</li>
                    <li>RAM: 6 GB</li>
                    <li>Storage: 128 GB</li>
                    <li>Display: 6.74" AMOLED, 120Hz</li>
                    <li>Rear Camera: 50MP + 2MP</li>
                    <li>Front Camera: 8MP</li>
                    <li>Battery: 6000 mAh</li>
                    <li>OS: Android 14</li>
                  </ul>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div className="tab-pane">
                  <h4>Full Specifications</h4>
                  <p>Detailed specs coming soon...</p>
                </div>
              )}
              {activeTab === 'warranty' && (
                <div className="tab-pane">
                  <h4>Warranty Information</h4>
                  <p>1 Year Manufacturer Warranty on Device</p>
                  <p>6 Months Warranty on In-Box Accessories</p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery & Seller Info */}
          <div className="delivery-section">
            <div className="delivery-item">
              <span className="delivery-icon">🚚</span>
              <div>
                <div className="delivery-title">Free Delivery</div>
                <div className="delivery-detail">by 19 Apr, Sunday</div>
              </div>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon">🛡️</span>
              <div>
                <div className="delivery-title">Warranty</div>
                <div className="delivery-detail">1 Year Manufacturer</div>
              </div>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon">♻️</span>
              <div>
                <div className="delivery-title">Replacement</div>
                <div className="delivery-detail">7-day brand support</div>
              </div>
            </div>
          </div>
        </div>

        {/* ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐
            RIGHT: PRICING & OFFERS PANEL
        ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐ */}
        <div className="col-right">
          {/* Price Section */}
          <div className="price-box">
            <div className="price-header">
              <span className="discount-percent">24% Off</span>
            </div>
            <div className="price-main">
              <span className="price-final">₹14,499</span>
              <span className="price-original">₹18,999</span>
            </div>
            <div className="price-footer">
              ₹13,774 Lowest price for you
            </div>
            <div className="protect-fee">+ ₹86 Protect Promise Fee</div>
          </div>

          {/* Blue Offer Banner */}
          <div className="offer-banner">
            <button className="offer-btn">Buy at ₹13,774</button>
            <span className="offer-text">Apply offers for maximum savings</span>
          </div>

          {/* Offers List */}
          <div className="offers-list">
            {[
              { icon: OFFER_ICONS[0], text: '₹725 off', desc: 'Apply Flipkart Axis Credit Card • Cashback' },
              { icon: OFFER_ICONS[1], text: '₹725 off', desc: 'Apply Flipkart SBI Credit Card • Cashback' },
              { icon: OFFER_ICONS[2], text: 'Up to ₹10,000', desc: 'Exchange offer' },
              { icon: OFFER_ICONS[3], text: '₹50 off', desc: 'Apply BHIM UPI • Cashback' },
            ].map((offer, idx) => (
              <div key={idx} className="offer-card">
                <img src={offer.icon} alt="offer" className="offer-icon" />
                <div className="offer-details">
                  <div className="offer-label">{offer.text}</div>
                  <div className="offer-desc">{offer.desc}</div>
                </div>
                <button className="apply-btn">Apply</button>
              </div>
            ))}
          </div>

          {/* EMI Details */}
          <div className="emi-box">
            <div className="emi-text">From ₹510/m</div>
            <button className="emi-btn">View EMI options</button>
          </div>

          {/* Delivery Details */}
          <div className="delivery-box">
            <h4>Delivery Details</h4>
            <div className="delivery-option">
              <input type="text" placeholder="Enter Delivery Pincode" />
              <button>Check</button>
            </div>
            <div className="delivery-info">
              <p>Delivery by 19 Apr, Sun</p>
              <p>Fulfilled by mmkekin • 4.6★ • 1 year with Flipkart</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-cart">
              🛒 Add to Cart
            </button>
            <button className="btn-buy">
              💳 Change Address
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          PROMOTIONAL BANNER
      ════════════════════════════════════════════════════════════ */}
      <div className="promo-banner-section">
        <div className="promo-banner-content">
          <h2>Galaxy F70e 5G – The Showstopper Camera</h2>
          <p>Experience stunning photography with advanced camera features</p>
          <button className="explore-btn">Explore Now</button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          RATINGS & REVIEWS
      ════════════════════════════════════════════════════════════ */}
      <div className="reviews-section">
        <h2 className="section-heading">Ratings & Reviews</h2>
        
        <div className="rating-summary">
          <div className="rating-main">
            <span className="rating-big">4.3 ★</span>
            <span className="rating-text">Very Good</span>
          </div>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="rating-row">
                <span className="stars-label">{stars} ★</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(6 - stars) * 15}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Images Grid */}
        <div className="review-images">
          {[1, 2, 3, 4, 5, 6].map(idx => (
            <div key={idx} className="review-image-box">
              <img src={`https://via.placeholder.com/100?text=Review+${idx}`} alt={`review ${idx}`} />
            </div>
          ))}
        </div>

        {/* Review Cards */}
        <div className="review-cards">
          {[
            { author: 'Ritesh Thakur', rating: 5, text: 'This device is very good 👍 body very nice', helpful: 81 },
            { author: 'Mohammad Shahbaz', rating: 4, text: 'Great display and performance. Highly satisfied!', helpful: 45 },
            { author: 'Sreenath Ragav', rating: 5, text: 'Best in segment. Fully satisfied with purchase.', helpful: 67 },
          ].map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-header">
                <span className="review-rating">{review.rating} ★</span>
                <span className="review-author">{review.author}</span>
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-footer">
                <span className="helpful-count">Helpful? {review.helpful}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          Q&A SECTION
      ════════════════════════════════════════════════════════════ */}
      <div className="qa-section">
        <h2 className="section-heading">Questions & Answers</h2>
        <div className="qa-banner">
          <h3>Earn up to 200 SuperCoins</h3>
          <p>Answer questions asked by buyers</p>
        </div>
        <button className="qa-btn">Ask a Question</button>
      </div>

      {/* ════════════════════════════════════════════════════════════
          RECOMMENDATIONS
      ════════════════════════════════════════════════════════════ */}
      <div className="recommendations-section">
        <h2 className="section-heading">Explore More Like This</h2>
        <div className="products-grid">
          {[
            { name: 'Samsung Galaxy S23 5G', price: '₹46,999', discount: '18%' },
            { name: 'Motorola Edge 70 Fusion', price: '₹29,999', discount: '35%' },
            { name: 'Google Pixel 8', price: '₹62,999', discount: '12%' },
            { name: 'OnePlus 12', price: '₹49,999', discount: '10%' },
            { name: 'Realme GT 6T', price: '₹35,999', discount: '20%' },
            { name: 'POCO X8 Pro', price: '₹32,999', discount: '25%' },
          ].map((product, idx) => (
            <div key={idx} className="product-card">
              <div className="product-image-box">
                <img src={IMAGES.main} alt={product.name} />
                <span className="discount-badge">{product.discount}</span>
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-price">{product.price}</div>
                <div className="product-rating">★ 4.4 (245 reviews)</div>
                <div className="product-delivery">Free Delivery</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPro;
