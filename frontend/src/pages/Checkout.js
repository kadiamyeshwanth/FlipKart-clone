import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSummary, fetchCart } = useCart();
  const [step, setStep] = useState(2); // 1 = Login (stub), 2=Address, 3=OrderSummary, 4=Payment
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [form, setForm] = useState({ name: '', phone: '', pincode: '', city: '', state: '', address: '' });

  const total = parseFloat(cartSummary.total || 0);
  const savings = parseFloat(cartSummary.savings || 0);
  const originalTotal = total + savings;
  const platformFee = 7;
  const delivery = total > 500 ? 0 : 40;

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    if (!form.phone || !form.address || !form.pincode) { alert('Please fill all required fields'); return; }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/orders`, {
        address: form.address, city: form.city, pincode: form.pincode,
        phone: form.phone, payment_method: paymentMethod
      });
      if (data.success) { setOrderId(data.orderId); await fetchCart(); }
    } catch { alert('Failed to place order. Please try again.'); }
    finally { setLoading(false); }
  };

  if (orderId) return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6' }}>
      <Navbar />
      <div style={{ paddingTop: 78, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 110px)' }}>
        <div style={{
          background: '#fff', borderRadius: 2, padding: 60, textAlign: 'center',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)', maxWidth: 480, width: '100%'
        }}>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/orderPlacedV2_cb4f54.png" alt="Order Placed" style={{ width: '40%', marginBottom: 24 }} />
          <h2 style={{ fontSize: 24, fontWeight: 500, color: '#212121', marginBottom: 8 }}>Order placed for {fmt(total + delivery + platformFee)}!</h2>
          <p style={{ fontSize: 14, color: '#878787', marginBottom: 16 }}>Your 1 item will be delivered shortly.</p>
          <div style={{ fontSize: 14, color: '#2874f0', fontWeight: 500, marginBottom: 24 }}>Order ID: #{orderId}</div>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#2874f0', color: '#fff', border: 'none',
              padding: '12px 40px', fontSize: 14, fontWeight: 500,
              borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)'
            }}
          >Continue Shopping</button>
        </div>
      </div>
    </div>
  );

  if (!cart.length) { navigate('/cart'); return null; }

  const StepHeader = ({ num, title, isActive, isCompleted, onEdit, subtitle }) => (
    <div style={{ 
      background: isActive ? '#2874f0' : '#fff', 
      padding: '16px 24px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottom: '1px solid #f0f0f0',
      borderRadius: isActive ? '2px 2px 0 0' : 0,
      transition: 'background 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ 
          background: isActive ? '#fff' : '#f0f0f0', 
          color: isActive ? '#2874f0' : '#878787',
          width: 24, height: 24, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 500, flexShrink: 0
        }}>
          {num}
        </div>
        <div>
          <span style={{ fontSize: 16, fontWeight: 500, color: isActive ? '#fff' : '#878787', textTransform: 'uppercase' }}>{title}</span>
          {isCompleted && subtitle && !isActive && (
            <div style={{ fontSize: 14, color: '#212121', fontWeight: 500, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              {subtitle} <span style={{ color: '#2874f0' }}>✓</span>
            </div>
          )}
        </div>
      </div>
      {isCompleted && !isActive && (
        <button onClick={onEdit} style={{ 
          background: '#fff', border: '1px solid #e0e0e0', color: '#2874f0', 
          padding: '8px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 2,
          transition: 'box-shadow 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)'}
           onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}>CHANGE</button>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', fontFamily: 'Roboto, Arial, sans-serif' }}>
      <Navbar />
      <div style={{ paddingTop: 78 }}>
        <div style={{ maxWidth: 1128, margin: '18px auto', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          
          {/* LEFT: Checkout Steps */}
          <div style={{ flex: 1, minWidth: 0, paddingBottom: 60 }}>
            <div style={{ background: '#fff', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)', borderRadius: 2 }}>
              
              {/* STEP 1: LOGIN (Fixed) */}
              <StepHeader num="1" title="LOGIN" isActive={false} isCompleted={true} subtitle={'+91XXXXXX0000'} onEdit={() => {}} />

              {/* STEP 2: DELIVERY ADDRESS */}
              <StepHeader num="2" title="DELIVERY ADDRESS" isActive={step === 2} isCompleted={step > 2} subtitle={form.name ? `${form.name}, ${form.address}...` : ''} onEdit={() => setStep(2)} />
              {step === 2 && (
                <div style={{ padding: '24px 24px 24px 64px', background: '#f5faff', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 500 }}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: 2, outlineColor: '#2874f0', fontSize: 14 }} />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: 2, outlineColor: '#2874f0', fontSize: 14 }} />
                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: 2, outlineColor: '#2874f0', fontSize: 14 }} />
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City/District/Town" style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: 2, outlineColor: '#2874f0', fontSize: 14 }} />
                    <select name="state" value={form.state} onChange={handleChange} style={{ padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: 2, outlineColor: '#2874f0', background: '#fff', fontSize: 14 }}>
                      <option value="">--Select State--</option>
                      {['Andhra Pradesh','Telangana','Karnataka','Maharashtra','Delhi'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address (Area and Street)" rows={3} style={{ width: '100%', maxWidth: 500, padding: '14px 12px', border: '1px solid #e0e0e0', borderRadius: 2, outlineColor: '#2874f0', marginTop: 16, fontFamily: 'inherit', fontSize: 14 }} />
                  <div style={{ marginTop: 24 }}>
                    <button onClick={() => setStep(3)} style={{ background: '#fb641b', color: '#fff', border: 'none', padding: '16px 40px', fontSize: 14, fontWeight: 500, borderRadius: 2, cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)' }}>DELIVER HERE</button>
                  </div>
                </div>
              )}

              {/* STEP 3: ORDER SUMMARY */}
              <StepHeader num="3" title="ORDER SUMMARY" isActive={step === 3} isCompleted={step > 3} subtitle={`${cart.length} Item(s)`} onEdit={() => setStep(3)} />
              {step === 3 && (
                <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                  {cart.map(item => (
                    <div key={item.cart_id} style={{ padding: '24px', display: 'flex', gap: 24, borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ width: 112, flexShrink: 0, textAlign: 'center' }}>
                        <div style={{ height: 112, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                          <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500, border: '1px solid #e0e0e0', borderRadius: 2, padding: '4px 0', width: 80, margin: '0 auto' }}>Qty: {item.quantity}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, color: '#212121', marginBottom: 8 }}>{item.name}</div>
                        {item.brand && <div style={{ fontSize: 14, color: '#878787', marginBottom: 12 }}>Seller: {item.brand}</div>}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                          <span style={{ fontSize: 14, color: '#878787', textDecoration: 'line-through' }}>{fmt(item.original_price)}</span>
                          <span style={{ fontSize: 18, color: '#212121', fontWeight: 500 }}>{fmt(item.price)}</span>
                          <span style={{ fontSize: 14, color: '#388e3c', fontWeight: 500 }}>{item.original_price > item.price ? `${Math.round((1 - item.price / item.original_price) * 100)}% off` : ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5faff' }}>
                    <div style={{ fontSize: 14, color: '#212121' }}>Order confirmation email will be sent to your registered Email ID.</div>
                    <button onClick={() => setStep(4)} style={{ background: '#fb641b', color: '#fff', border: 'none', padding: '16px 40px', fontSize: 14, fontWeight: 500, borderRadius: 2, cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)' }}>CONTINUE</button>
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT OPTIONS */}
              <StepHeader num="4" title="PAYMENT OPTIONS" isActive={step === 4} isCompleted={false} />
              {step === 4 && (
                <div style={{ padding: '0', background: '#fff' }}>
                  {[
                    { val: 'UPI', label: 'UPI' },
                    { val: 'Wallets', label: 'Wallets' },
                    { val: 'Card', label: 'Credit / Debit / ATM Card' },
                    { val: 'NetBanking', label: 'Net Banking' },
                    { val: 'COD', label: 'Cash on Delivery' },
                  ].map(opt => (
                    <div key={opt.val} style={{ borderBottom: '1px solid #f0f0f0', background: paymentMethod === opt.val ? '#f5faff' : '#fff' }}>
                      <label style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', cursor: 'pointer' }}>
                        <input type="radio" checked={paymentMethod === opt.val} onChange={() => setPaymentMethod(opt.val)} style={{ accentColor: '#2874f0', width: 16, height: 16, marginRight: 16 }} />
                        <span style={{ fontSize: 15, color: '#212121', fontWeight: paymentMethod === opt.val ? 500 : 400 }}>{opt.label}</span>
                      </label>
                      {paymentMethod === opt.val && (
                        <div style={{ padding: '0 24px 24px 56px' }}>
                          {opt.val === 'COD' && (
                            <>
                              <div style={{ padding: '8px 16px', background: '#eafaf1', border: '1px solid #a3e4a6', borderRadius: 2, color: '#388e3c', fontSize: 14, marginBottom: 16, display: 'inline-block' }}>
                                Cash on Delivery is available for this order.
                              </div>
                              <br/>
                            </>
                          )}
                          <button disabled={loading} onClick={handlePlaceOrder} style={{ background: '#fb641b', color: '#fff', border: 'none', padding: '16px 40px', fontSize: 16, fontWeight: 500, borderRadius: 2, cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)' }}>
                            {loading ? 'CONFIRMING...' : opt.val === 'COD' ? 'CONFIRM ORDER' : `PAY ${fmt(total + delivery + platformFee)}`}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Price Summary */}
          <div style={{ width: 340, flexShrink: 0, position: 'sticky', top: 96 }}>
            <div style={{ background: '#fff', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)', borderRadius: 2 }}>
              <div style={{ padding: '13px 24px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: 16, color: '#878787', fontWeight: 500, textTransform: 'uppercase' }}>Price details</span>
              </div>
              <div style={{ padding: '0 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121' }}>
                  <span>Price ({cart.length} items)</span>
                  <span>{fmt(originalTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121' }}>
                  <span>Discount</span>
                  <span style={{ color: '#388e3c' }}>−{fmt(savings)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121' }}>
                  <span>Platform Fee</span>
                  <span>{fmt(platformFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121', borderBottom: '1px dashed #e0e0e0' }}>
                  <span>Delivery Charges</span>
                  <span style={{ color: '#388e3c' }}>{delivery === 0 ? 'Free' : fmt(delivery)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontSize: 18, color: '#212121', fontWeight: 500, borderBottom: '1px dashed #e0e0e0' }}>
                  <span>Total Amount</span>
                  <span>{fmt(total + platformFee + delivery)}</span>
                </div>
                
                <div style={{ padding: '16px 0', fontSize: 16, color: '#388e3c', fontWeight: 500 }}>
                  You will save {fmt(savings)} on this order
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', padding: '24px 0', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/shield_b33c0c.svg" alt="Safe and secure" style={{ width: 29 }} />
              <div style={{ fontSize: 14, color: '#878787', fontWeight: 500 }}>
                Safe and secure payments. Easy returns. <br/>100% Authentic products.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
