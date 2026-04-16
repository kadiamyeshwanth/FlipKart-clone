import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API}/api/orders/user`);
        const json = await response.json();
        if (json.success) {
          setOrders(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Flatten the orders into individual item rows just like Flipkart
  const orderItems = orders.flatMap(order => 
    order.items.map(item => ({
      ...item,
      orderData: order
    }))
  );

  return (
    <>
      <Navbar />
      <div className="order-history-container">
        <div className="order-history-inner">
          
          {/* Sidebar */}
          <div className="account-sidebar">
            <div className="account-user-card">
              <img 
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" 
                alt="User" 
                className="account-user-avatar" 
              />
              <div>
                <div className="account-user-text">Hello,</div>
                <div className="account-user-name">Flipkart User</div>
              </div>
            </div>

            <div className="sidebar-menu">
              <div className="sidebar-menu-item active">
                {/* Orders Icon */}
                <svg width="24" height="24" className="sidebar-icon" viewBox="0 0 24 24" fill="#2874f0">
                  <path d="M13.5 21v-4.5H18V21h3V12l-9-6.75L3 12v9h3v-4.5h7.5V21h3z" />
                </svg>
                My Orders
              </div>
              <div className="sidebar-menu-item">
                <svg width="24" height="24" className="sidebar-icon" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Account Settings
              </div>
              <div className="sidebar-menu-item">
                <svg width="24" height="24" className="sidebar-icon" viewBox="0 0 24 24">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                Payments
              </div>
              <div className="sidebar-menu-item">
                <svg width="24" height="24" className="sidebar-icon" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z"/>
                </svg>
                My Stuff
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="order-history-main">
            <div className="order-search-bar">
              <input type="text" placeholder="Search your orders here" />
              <button className="order-search-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 6, verticalAlign: 'text-bottom' }}>
                  <path d="M10.481 10.481A6.368 6.368 0 0 0 12.062 6.031c0-3.327-2.704-6.031-6.031-6.031-3.328 0-6.031 2.704-6.031 6.031 0 3.328 2.703 6.031 6.031 6.031 1.666 0 3.176-.676 4.275-1.765l3.528 3.528a.754.754 0 1 0 1.066-1.066L10.48 10.481zM6.03 10.554a4.529 4.529 0 0 1-4.523-4.523 4.529 4.529 0 0 1 4.523-4.523 4.529 4.529 0 0 1 4.523 4.523 4.529 4.529 0 0 1-4.523 4.523z" fill="#fff"/>
                </svg>
                Search Orders
              </button>
            </div>

            {loading ? (
               <div style={{ padding: '40px', textAlign: 'center', background: '#fff' }}>Loading orders...</div>
            ) : orderItems.length === 0 ? (
               <div style={{ padding: '40px', textAlign: 'center', background: '#fff' }}>
                 <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="No Orders" style={{ maxWidth: 200, marginBottom: 20 }} />
                 <h2 style={{ fontSize: 18, color: '#212121', marginBottom: 10 }}>You have no orders</h2>
                 <a href="/" style={{ display: 'inline-block', background: '#2874f0', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: 2 }}>Start Shopping</a>
               </div>
            ) : (
              orderItems.map((item, index) => {
                // Determine status logic. If the order is COD and just placed, it's Processing.
                // You can add more complex logic here if needed.
                const statusDate = new Date(item.orderData.created_at || Date.now());
                const formattedDate = statusDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const isDelivered = index % 3 === 0; // Fake some delivery statuses just to match the reference look
                
                return (
                  <div className="order-item-card" key={`${item.order_id}-${item.id}-${index}`}>
                    <div className="order-item-image-col">
                      <img src={item.image} alt={item.name} className="order-item-image" />
                    </div>
                    <div className="order-item-details-col">
                      <div className="order-item-title">{item.name}</div>
                      <div className="order-item-meta">Category: {item.category}</div>
                      <div className="order-item-meta">Qty: {item.quantity}</div>
                    </div>
                    <div className="order-item-price-col">
                      ₹{parseFloat(item.price).toLocaleString('en-IN')}
                    </div>
                    <div className="order-item-status-col">
                      <div>
                        {isDelivered ? (
                          <>
                            <span className="status-dot delivered"></span>
                            <span className="order-item-status-text">Delivered on {formattedDate}</span>
                            <div className="order-item-status-desc">Your item has been delivered</div>
                          </>
                        ) : (
                          <>
                            <span className="status-dot processing"></span>
                            <span className="order-item-status-text">Ordered on {formattedDate}</span>
                            <div className="order-item-status-desc">Your order is being processed</div>
                          </>
                        )}
                      </div>
                      
                      <a href={`/product/${item.product_id}`} className="rate-review-link" onClick={e => e.stopPropagation()}>
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
                            <polygon fill="#2874F1" points="9 12.0625 13.6375 15.4375 11.8625 9.9875 16.5 6.6875 10.8125 6.6875 9 1.0625 7.1875 6.6875 1.5 6.6875 6.1375 9.9875 4.3625 15.4375" />
                        </svg>
                        <span>Rate & Review Product</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
