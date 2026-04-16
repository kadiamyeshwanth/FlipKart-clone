import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState('Highlights');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSlide = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 68, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use environment variable or default to localhost
        const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${API}/api/products/${id}`);
        if (data.success) {
          setProduct(data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product.id, 1);
      navigate('/cart');
    }
  };

  // Fallback assets for UI consistency where DB data is lacking
  const thumb1 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/6/x/n/-original-imaheqpgyrtzghaa.jpeg?q=90";
  const thumb2 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/x/z/x/-original-imahgkgx3y8b4e6j.jpeg?q=90";
  const reasonsImg = "https://rukminim1.flixcart.com/image/316/378/xif0q/shopsy-mobile/a/f/x/-original-imahjzpcbshtapqx.jpeg?q=90";
  const bannerImg = "https://rukminim1.flixcart.com/fk-p-flap/1000/230/image/2540b579de1b565a.jpg?q=20";
  
  const rec1 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/7/g/a/-original-imahh27g4e28qac6.jpeg?q=90";
  const rec2 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/i/w/k/-original-imah3afnzmgfjnrf.jpeg?q=90";
  const rec3 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/j/f/s/-original-imahh27gvbfyrybm.jpeg?q=90";
  const rec4 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/g/s/r/105-single-sim-keypad-mobile-phone-with-wireless-fm-radio-ta-original-imah53fqhhqyadgd.jpeg?q=90";
  const rec5 = "https://rukminim1.flixcart.com/image/316/378/xif0q/mobile/k/6/m/2660-flip-4g-volte-black-keypad-mobile-with-dual-sim-screen-mp3-original-imah53fqgattnxnf.jpeg?q=90";

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 158 }}>
          <div style={{ fontSize: 18 }}>Loading product details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 158 }}>
          <div style={{ fontSize: 18 }}>Product not found.</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate discount dynamically
  const origPrice = parseFloat(product.original_price);
  const currPrice = parseFloat(product.price);
  const discountPercent = origPrice > currPrice ? Math.round(((origPrice - currPrice) / origPrice) * 100) : 0;

  return (
    <div style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', fontFamily: 'Inter, Roboto, Arial, sans-serif', fontSize: 14 }}>
      <Navbar />
      
      <div className="app-content" style={{ paddingTop: 158 }}>
        <div className="layout-container" style={{ maxWidth: 1248, margin: '0 auto', background: '#fff', display: 'flex', flexDirection: 'column' }}>
        
        {/* Main 3 Column Layout */}
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 400px) 1fr 340px', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
          
          {/* 1. LEFT COLUMN: Media Gallery */}
          <div style={{ padding: '0 16px', position: 'relative' }}>
            {/* Sticky Container for images */}
            <div style={{ position: 'sticky', top: 20 }}>
              {/* Main Image */}
              <div style={{ border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 450, padding: 16, marginBottom: 8, position: 'relative' }}>
                <img src={[product.image, thumb1, thumb2, reasonsImg, product.image, thumb1][currentImageIndex]} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                {/* Wishlist Heart */}
                <div style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
              </div>

              {/* Thumbnails Horizontal Slider */}
              <div style={{ position: 'relative', marginTop: 12 }}>
                 {/* Left Arrow */}
                 <button 
                   onClick={() => handleSlide(-1)}
                   style={{
                     position: 'absolute', top: '50%', left: -12, transform: 'translateY(-50%)', zIndex: 2,
                     background: '#fff', border: '1px solid #e0e0e0', borderRadius: '50%', width: 28, height: 28,
                     display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                   }}
                 >
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                 </button>
                 
                 <div ref={sliderRef} style={{ 
                    display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0', 
                    scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' 
                 }}>
                    {[product.image, thumb1, thumb2, reasonsImg, product.image, thumb1].map((imgSrc, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{ 
                           flexShrink: 0, width: 60, height: 60, 
                           border: currentImageIndex === idx ? '2px solid #2874f0' : '1px solid #f0f0f0', 
                           display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', 
                           borderRadius: 2, padding: 4, transition: 'border 0.2s ease-in-out'
                        }}
                      >
                         <img src={imgSrc} alt={`Thumbnail ${idx}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: currentImageIndex === idx ? 1 : 0.6 }} />
                      </div>
                    ))}
                 </div>

                 {/* Right Arrow */}
                 <button 
                   onClick={() => handleSlide(1)}
                   style={{
                     position: 'absolute', top: '50%', right: -12, transform: 'translateY(-50%)', zIndex: 2,
                     background: '#fff', border: '1px solid #e0e0e0', borderRadius: '50%', width: 28, height: 28,
                     display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                   }}
                 >
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                 </button>
              </div>
            </div>
          </div>

          {/* 2. CENTER COLUMN: Product Details */}
          <div style={{ padding: '0 24px', borderLeft: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 12, color: '#878787', marginBottom: 8 }}>
              Home / {product.category} / {product.brand} / {product.name}
            </div>
            
            <h1 style={{ fontSize: 22, fontWeight: 500, color: '#212121', lineHeight: 1.4, margin: '0 0 8px' }}>
              {product.name}
            </h1>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ background: '#388e3c', color: '#fff', fontSize: 13, fontWeight: 600, padding: '2px 6px', borderRadius: 3, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {product.rating} <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </span>
              <span style={{ fontSize: 14, color: '#878787', fontWeight: 500 }}>{product.rating_count} Ratings & Reviews</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" height="21" alt="Flipkart Assured" style={{ marginLeft: 8 }} />
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 20, marginBottom: 20 }}></div>

            {/* Product Highlights */}
            <div style={{ marginBottom: 32 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #f0f0f0', marginBottom: 16 }}>
                 <div style={{ fontSize: 18, fontWeight: 500, color: '#212121' }}>Product details</div>
               </div>
               
               <div style={{ fontSize: 14, color: '#212121', lineHeight: 1.6 }}>
                 {product.description}
               </div>

               <div style={{ color: '#2874f0', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 16 }}>All Details</div>
            </div>

            {/* TABS */}
            <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid #f0f0f0', marginBottom: 24, fontSize: 14, fontWeight: 500 }}>
              {['Highlights', 'Specifications', 'Warranty', 'Manufacturer Info'].map(tab => (
                 <div key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: activeTab === tab ? '3px solid #2874f0' : '3px solid transparent', color: activeTab === tab ? '#2874f0' : '#878787' }}>
                    {tab}
                 </div>
              ))}
            </div>

            {/* Horizontal Promo Banner */}
            {bannerImg && (
               <div style={{ marginBottom: 32 }}>
                 <img src={bannerImg} alt="Promo Banner" style={{ width: '100%', display: 'block' }} />
               </div>
            )}

            {/* Ratings & Reviews Section */}
            <div style={{ borderTop: '4px solid #f0f0f0', paddingTop: 24, margin: '24px -24px 0', padding: '24px 24px' }}>
               <div style={{ fontSize: 24, fontWeight: 500, color: '#212121', marginBottom: 24 }}>Ratings and Reviews</div>
               
               <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
                  <div style={{ textAlign: 'center' }}>
                     <div style={{ fontSize: 42, color: '#212121', fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.rating} <svg width="28" height="28" viewBox="0 0 24 24" fill="#388e3c" style={{ marginLeft: 6 }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     </div>
                     <div style={{ color: '#878787', fontSize: 14, marginTop: 8 }}>Based on {product.rating_count} ratings</div>
                  </div>
                  <div style={{ flex: 1 }}>
                     {/* Bars */}
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                       <span style={{ fontSize: 12, width: 12 }}>5★</span>
                       <div style={{ flex: 1, background: '#f0f0f0', height: 5, borderRadius: 3 }}><div style={{ width: '70%', background: '#388e3c', height: '100%', borderRadius: 3 }}></div></div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                       <span style={{ fontSize: 12, width: 12 }}>4★</span>
                       <div style={{ flex: 1, background: '#f0f0f0', height: 5, borderRadius: 3 }}><div style={{ width: '20%', background: '#388e3c', height: '100%', borderRadius: 3 }}></div></div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                       <span style={{ fontSize: 12, width: 12 }}>3★</span>
                       <div style={{ flex: 1, background: '#f0f0f0', height: 5, borderRadius: 3 }}><div style={{ width: '5%', background: '#ff9f00', height: '100%', borderRadius: 3 }}></div></div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                       <span style={{ fontSize: 12, width: 12 }}>2★</span>
                       <div style={{ flex: 1, background: '#f0f0f0', height: 5, borderRadius: 3 }}><div style={{ width: '2%', background: '#ff6161', height: '100%', borderRadius: 3 }}></div></div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                       <span style={{ fontSize: 12, width: 12 }}>1★</span>
                       <div style={{ flex: 1, background: '#f0f0f0', height: 5, borderRadius: 3 }}><div style={{ width: '3%', background: '#ff6161', height: '100%', borderRadius: 3 }}></div></div>
                     </div>
                  </div>
               </div>

               {/* User images */}
               <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 12 }}>
                 {[rec1, rec2, rec3, rec4, rec5].map((img, i) => (
                    <div key={i} style={{ width: 80, height: 80, flexShrink: 0, borderRadius: 4, overflow: 'hidden' }}>
                      <img src={img} alt="User upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                 ))}
               </div>

               {/* Review Card */}
               <div style={{ padding: '16px 0', borderTop: '1px solid #f0f0f0' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                   <span style={{ background: '#388e3c', color: '#fff', fontSize: 12, fontWeight: 600, padding: '2px 6px', borderRadius: 3 }}>5 ★</span>
                   <span style={{ fontWeight: 500, fontSize: 14, color: '#212121' }}>Nice product</span>
                 </div>
                 <p style={{ fontSize: 14, color: '#212121', lineHeight: 1.5, margin: '0 0 12px' }}>
                   The device is very good 🔥. VERY easy to use and camera is top notch.
                 </p>
                 <div style={{ fontSize: 12, color: '#878787', display: 'flex', alignItems: 'center', gap: 12 }}>
                   <span>Raman Shankar</span>
                   <span>3 months ago</span>
                 </div>
               </div>
               
               <div style={{ color: '#2874f0', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 16 }}>Show all reviews</div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: Price + Offers */}
          <div style={{ padding: '0 16px', position: 'relative' }}>
             <div style={{ position: 'sticky', top: 20 }}>
                {/* Price Box */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#388e3c', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Special price</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                     <span style={{ fontSize: 28, fontWeight: 500, color: '#212121' }}>₹{currPrice.toLocaleString()}</span>
                     {discountPercent > 0 && <span style={{ fontSize: 16, color: '#878787', textDecoration: 'line-through' }}>₹{origPrice.toLocaleString()}</span>}
                     {discountPercent > 0 && <span style={{ fontSize: 16, color: '#388e3c', fontWeight: 600 }}>{discountPercent}% off</span>}
                  </div>
                  <div style={{ fontSize: 14, color: '#212121', marginTop: 8 }}>+₹69 Secured Packaging Fee</div>
                </div>

                {/* Blue Offers Box */}
                <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
                   <div style={{ background: '#2874f0', padding: '12px 16px', color: '#fff', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                      Apply offers for maximum savings
                   </div>
                   
                   <div style={{ padding: 16 }}>
                      {/* Bank Offers */}
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#212121', marginBottom: 12 }}>Bank Offers</div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                         <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-69e7ec.svg" alt="offer" width="18" />
                         <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, color: '#212121' }}>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</div>
                            <div style={{ color: '#2874f0', fontSize: 13, fontWeight: 500, marginTop: 4, cursor: 'pointer' }}>T&C</div>
                         </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                         <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-69e7ec.svg" alt="offer" width="18" />
                         <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, color: '#212121' }}>10% off up to ₹750 on HDFC Bank Credit Card EMI</div>
                            <div style={{ color: '#2874f0', fontSize: 13, fontWeight: 500, marginTop: 4, cursor: 'pointer' }}>T&C</div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Delivery Information */}
                <div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ color: '#878787', fontSize: 14, fontWeight: 500 }}>Deliver to</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, borderBottom: '1px solid #2874f0', paddingBottom: 2 }}>
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                         <input defaultValue="560034" style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 14, fontWeight: 500, width: 60, color: '#2874f0' }} />
                      </div>
                   </div>
                   
                   <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#212121' }}>Tomorrow, by 10 PM</span>
                      <span style={{ fontSize: 14, color: '#388e3c' }}>Free</span>
                   </div>

                   {/* Warranty / Returns / Cash on Delivery */}
                   <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: 20, marginBottom: 20 }}>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                         <div style={{ border: '1px solid #e0e0e0', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                           <span style={{ fontSize: 20 }}>🛡️</span>
                         </div>
                         <div style={{ fontSize: 11, color: '#212121' }}>1 Year<br/>Warranty</div>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                         <div style={{ border: '1px solid #e0e0e0', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                           <span style={{ fontSize: 20 }}>🔁</span>
                         </div>
                         <div style={{ fontSize: 11, color: '#212121' }}>7 Days<br/>Replacement</div>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                         <div style={{ border: '1px solid #e0e0e0', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                           <span style={{ fontSize: 20 }}>💵</span>
                         </div>
                         <div style={{ fontSize: 11, color: '#212121' }}>Cash on<br/>Delivery</div>
                      </div>
                   </div>
                   
                   {/* Add to Cart / Buy Now Sticky Box */}
                   <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                      {product.stock > 0 ? (
                        <>
                          <button onClick={handleAddToCart} style={{ flex: 1, padding: '16px 0', background: '#ff9f00', color: '#fff', border: 'none', borderRadius: 2, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>ADD TO CART</button>
                          <button onClick={() => { handleAddToCart(); navigate('/checkout'); }} style={{ flex: 1, padding: '16px 0', background: '#fb641b', color: '#fff', border: 'none', borderRadius: 2, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>BUY NOW</button>
                        </>
                      ) : (
                        <button disabled style={{ flex: 1, padding: '16px 0', background: '#e0e0e0', color: '#878787', border: 'none', borderRadius: 2, fontSize: 16, fontWeight: 600, cursor: 'not-allowed' }}>OUT OF STOCK</button>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Explore More Like This - Recommendations */}
        <div style={{ padding: '24px 24px 48px' }}>
           <div style={{ fontSize: 22, fontWeight: 500, color: '#212121', marginBottom: 24 }}>Explore more from {product.brand}</div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {[
                { img: rec1, title: "Infinix SMART 8 (Timber Black)", price: "₹7,499" },
                { img: rec2, title: "POCO C65 (Matte Black)", price: "₹6,799" },
                { img: rec3, title: "Motorola g24 Power", price: "₹8,999" },
                { img: rec4, title: "Nokia 105 Single SIM", price: "₹1,299" },
                { img: rec5, title: "SAMSUNG Galaxy M14", price: "₹11,490" },
                { img: thumb1, title: "vivo T2x 5G", price: "₹12,999" }
              ].map((item, id) => (
                 <div key={id} style={{ border: '1px solid #e0e0e0', borderRadius: 4, padding: 12, cursor: 'pointer' }}>
                   <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                     <img src={item.img} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                   </div>
                   <div style={{ fontSize: 14, color: '#212121', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: 40, marginBottom: 8 }}>
                     {item.title}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                      <span style={{ background: '#388e3c', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 4px', borderRadius: 2 }}>4.2 ★</span>
                      <span style={{ fontSize: 12, color: '#878787' }}>(1,234)</span>
                   </div>
                   <div style={{ fontSize: 16, fontWeight: 600, color: '#212121', marginBottom: 4 }}>{item.price}</div>
                   <div style={{ fontSize: 12, color: '#388e3c', fontWeight: 500 }}>Bank Offer</div>
                 </div>
              ))}
           </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
