import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartSummary } = useCart();

  const navItems = [
    { label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', path: '/' },
    { label: 'Categories', icon: 'M4 6h16M4 12h16M4 18h16', path: '/search' },
    { label: 'Account', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', path: '/account/orders' },
    { label: 'Cart', icon: 'M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6', path: '/cart' },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map(item => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <div 
            key={item.label} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div style={{ position: 'relative' }}>
              <svg 
                viewBox="0 0 24 24" 
                fill={isActive ? '#2874f0' : 'none'} 
                stroke={isActive ? '#2874f0' : '#878787'} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                width="24" height="24"
              >
                <path d={item.icon}></path>
              </svg>
              {item.label === 'Cart' && cartSummary.itemCount > 0 && (
                <span className="cart-badge">{cartSummary.itemCount}</span>
              )}
            </div>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
