import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/* ═══════════════════════════════════════════════════════════════════
   ALL ASSET URLS extracted directly from the live Flipkart source code
   ∙ Logo pill images (flap images)
   ∙ Category icons (apex-static/images/svgs/L1Nav/)
   ∙ Header icons (batman-returns static SVGs)
═══════════════════════════════════════════════════════════════════ */

// ── Row 1 logo pill: "f" brand mark (26×22) + "Flipkart" text (46×18)
const LOGO_F_URL    = 'https://rukminim2.flixcart.com/fk-p-flap/52/44/image/d2ecfddf891a3922.png?q=90';
const LOGO_TEXT_URL = 'https://rukminim2.flixcart.com/fk-p-flap/92/36/image/31f7e3af490c225f.png?q=90';

// ── Row 1 Minutes pill: scooter icon (56×44) + "Minutes" text (96×36)
const MINUTES_ICON_URL = 'https://rukminim2.flixcart.com/fk-p-flap/56/44/image/716adbc920ad1eba.png?q=90';
const MINUTES_TEXT_URL = 'https://rukminim2.flixcart.com/fk-p-flap/96/36/image/256fdf0144fd6d52.png?q=90';

// ── Row 1 Travel pill: airplane icon (58×44) + "Travel" text (72×36)
const TRAVEL_ICON_URL = 'https://rukminim2.flixcart.com/fk-p-flap/58/44/image/7ab4040af860941d.png?q=90';
const TRAVEL_TEXT_URL = 'https://rukminim2.flixcart.com/fk-p-flap/72/36/image/5a9ff48eef96b876.png?q=90';

// ── Header icons (Row 2 right side)
const PROFILE_ICON_URL      = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-6bae67.svg';
const CART_ICON_URL         = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart_v4-6ac9a8.svg';
const NOTIFICATIONS_ICON    = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Notifications-f53178.svg';

// ── More dropdown SVG icons
const BECOME_SELLER_ICON    = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-134a49.svg';
const NOTIF_SETTINGS_ICON   = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/NotificationSetting-caba6c.svg';
const CUSTOMER_CARE_ICON    = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/helpcenter-f09fd8.svg';
const ADVERTISE_ICON        = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/AdvertiseV2-e6b830.svg';
const LOGOUT_ICON           = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-bcecbb.svg';

// ── Login Dropdown Icons
const PLUS_ICON_URL        = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkplus-f1a046.svg';
const ORDERS_ICON_URL      = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-e444ac.svg';
const WISHLIST_ICON_URL    = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIwLjI0OUMxMiAyMC4yNDkgMi42MjUgMTQuOTk5IDIuNjI1IDguNjI0MDNDMi42MjUgNy40OTcwNSAzLjAxNTQ2IDYuNDA0ODggMy43Mjk5NiA1LjUzMzM0QzQuNDQ0NDUgNC42NjE3OSA1LjQzODg0IDQuMDY0NzIgNi41NDM5MyAzLjg0MzdDNy42NDkwMyAzLjYyMjY4IDguNzk2NTcgMy43OTEzNyA5Ljc5MTMxIDQuMzIxMDZDMTAuNzg2MSA0Ljg1MDc2IDExLjU2NjUgNS43MDg3NCAxMiA2Ljc0OTAzVjYuNzQ5MDNDMTIuNDMzNSA1LjcwODc0IDEzLjIxMzkgNC44NTA3NiAxNC4yMDg3IDQuMzIxMDZDMTUuMjAzNCAzLjc5MTM3IDE2LjM1MSAzLjYyMjY4IDE3LjQ1NjEgMy44NDM3QzE4LjU2MTIgNC4wNjQ3MiAxOS41NTU1IDQuNjYxNzkgMjAuMjcgNS41MzMzNEMyMC45ODQ1IDYuNDA0ODggMjEuMzc1IDcuNDk3MDUgMjEuMzc1IDguNjI0MDNDMjEuMzc1IDE0Ljk5OSAxMiAyMC4yNDkgMTIgMjAuMjQ5WiIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
const REWARDS_ICON_URL     = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/rewards-a8acd9.svg';
const GIFT_CARDS_ICON_URL  = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/giftcard-46825a.svg';
const DOWNLOAD_APP_ICON    = 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/downloadApp-0bb9D.svg';

// ── L1 Category Nav icons (apex-static SVGs — exact Flipkart paths)
const BASE = 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/';
const CATEGORY_ICONS = {
  all:       BASE + 'all.svg',
  fashion:   BASE + 'fashion.svg',
  mobiles:   BASE + 'mobiles.svg',
  beauty:    BASE + 'beauty.svg',
  electronics: BASE + 'electronics.svg',
  home:      BASE + 'home-final.svg',
  tv:        BASE + 'tv.svg',
  toys:      BASE + 'toy.svg',
  food:      BASE + 'food.svg',
  auto:      BASE + 'auto-acc.svg',
  twowheeler: BASE + 'auto-new.svg',
  sports:    BASE + 'sport.svg',
  books:     BASE + 'books.svg',
  furniture: BASE + 'furniture.svg',
};

/* ── 14 CATEGORIES — map to internal /category/:name routes ──
   DB categories: Appliances, Beauty, Electronics, Fashion,
                  Furniture, Grocery, Mobiles
   Others show a filtered search page as fallback             */
const CATEGORIES = [
  { name: 'For You',       icon: 'all',        route: '/' },
  { name: 'Fashion',       icon: 'fashion',    route: '/category/Fashion' },
  { name: 'Mobiles',       icon: 'mobiles',    route: '/category/Mobiles' },
  { name: 'Beauty',        icon: 'beauty',     route: '/beauty' },
  { name: 'Electronics',   icon: 'electronics',route: '/category/Electronics' },
  { name: 'Home',          icon: 'home',       route: '/search?category=Home' },
  { name: 'Appliances',    icon: 'tv',         route: '/category/Appliances' },
  { name: 'Toys, ba..',    icon: 'toys',       route: '/search?category=Toys' },
  { name: 'Food & Health', icon: 'food',       route: '/category/Grocery' },
  { name: 'Auto Acc..',    icon: 'auto',       route: '/search?category=Auto' },
  { name: '2 Wheelers',    icon: 'twowheeler', route: '/search?category=2Wheelers' },
  { name: 'Sports & ..',   icon: 'sports',     route: '/search?category=Sports' },
  { name: 'Books & ..',    icon: 'books',      route: '/search?category=Books' },
  { name: 'Furniture',     icon: 'furniture',  route: '/category/Furniture' },
];

/* ── SEARCH ICON SVG from Flipkart's source ── */
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
      stroke="#717478" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16L21 21" stroke="#717478" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── SUPERCOIN SVG from Flipkart's source ── */
const SuperCoinIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M21.015 13.811c0 5.04-4.035 8.879-9.015 8.879s-9.013-3.838-9.013-8.879c0-5.04 4.036-9.125 9.013-9.125s9.015 4.087 9.015 9.125Z" fill="#FFC30D"/>
    <path d="M12 24C5.271 24 0 18.792 0 12.146 0 5.45 5.383 0 12 0c6.616 0 12 5.449 12 12.146C24 18.792 18.729 24 12 24Z" fill="#FFD700"/>
    <path d="m14.166 2.624-7.984 8.83c-1.028 1.137-.423 2.743 1.099 2.703l4.607.043a.42.42 0 0 1 .417.428.5.5 0 0 1-.014.11l-1.85 6.84 7.92-8.692c.992-1.089.23-2.853-1.236-2.853l-4.545.085a.422.422 0 0 1-.412-.545c.485-1.724 1.937-6.887 1.998-6.95Z" fill="#fff"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════ */
const Navbar = ({ activeCategory }) => {
  const navigate = useNavigate();
  const { cartSummary } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  /* Shared font for nav */
  const fk = { fontFamily: 'Inter, Arial, sans-serif' };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#fff', borderBottom: '1px solid #D6D6D6',
      ...fk
    }}>

      {/* ════════════════════════════════════════════════════════
          ROW 1 — Logo | Minutes | Travel           Location | Coins
      ════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 20px 4px', gap: 8,
        borderBottom: '1px solid rgba(0,0,0,0.08)', minHeight: 44,
        maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box'
      }}>

        {/* ── Logo Pill — yellow bg, exact Flipkart images ── */}
        <button
          onClick={() => navigate('/')}
          id="logo-pill"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: '#FFE51F', border: '1.4px solid rgba(255,255,255,0.4)',
            borderRadius: 6, padding: '6px 10px', cursor: 'pointer',
            height: 44, flexShrink: 0, outline: 'none'
          }}
        >
          <img src={LOGO_F_URL} alt="Flipkart f" width="26" height="22" style={{ objectFit: 'contain' }} />
          <img src={LOGO_TEXT_URL} alt="Flipkart" width="46" height="18" style={{ objectFit: 'contain' }} />
        </button>

        {/* ── Minutes Pill ── */}
        <a
          href="/flipkart-minutes-store?marketplace=HYPERLOCAL&autoSwitchAddress=true"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: '#fff', border: '1px solid #d0d0d0', borderRadius: 20,
            padding: '5px 12px', cursor: 'pointer', height: 34, flexShrink: 0,
            textDecoration: 'none'
          }}
        >
          <img src={MINUTES_ICON_URL} alt="" width="28" height="22" style={{ objectFit: 'contain' }} />
          <img src={MINUTES_TEXT_URL} alt="Minutes" width="48" height="18" style={{ objectFit: 'contain' }} />
        </a>

        {/* ── Travel Pill ── */}
        <a
          href="/flights-travel-uhp-at-store?marketplace=travel"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: '#fff', border: '1px solid #d0d0d0', borderRadius: 20,
            padding: '5px 12px', cursor: 'pointer', height: 34, flexShrink: 0,
            textDecoration: 'none'
          }}
        >
          <img src={TRAVEL_ICON_URL} alt="" width="30" height="22" style={{ objectFit: 'contain' }} />
          <img src={TRAVEL_TEXT_URL} alt="Travel" width="36" height="18" style={{ objectFit: 'contain' }} />
        </a>

        <div style={{ flex: 1 }} />

        {/* ── Location ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          cursor: 'pointer', maxWidth: 280
        }}>
          {/* Location pin SVG from Flipkart source */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M9.08414 13.8688C10.5546 12.555 13 9.89704 13 6.75C13 5.42392 12.4732 4.15215 11.5355 3.21447C10.5979 2.27678 9.32608 1.75 8 1.75C6.67392 1.75 5.40215 2.27678 4.46447 3.21447C3.52678 4.15215 3 5.42392 3 6.75C3 9.89704 5.4454 12.555 6.91586 13.8688C7.38418 14.2872 7.61834 14.4964 8 14.4964C8.38166 14.4964 8.61582 14.2872 9.08414 13.8688ZM10.5 6.75C10.5 8.13071 9.38071 9.25 8 9.25C6.61929 9.25 5.5 8.13071 5.5 6.75C5.5 5.36929 6.61929 4.25 8 4.25C9.38071 4.25 10.5 5.36929 10.5 6.75Z"
              fill="#1F1F1F"/>
          </svg>
          <span style={{ fontSize: 12, color: '#212121', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
            Academic Block, IIIT Sricity...
          </span>
          <svg width="16" height="17" viewBox="0 0 17 17" fill="none">
            <path d="m6.627 3.749 5 5-5 5" stroke="#1F1F1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* ── SuperCoins ── */}
        <a
          href="/supercoin"
          style={{
            display: 'flex', alignItems: 'center', gap: 3,
            background: '#fff8e1', borderRadius: 8,
            padding: '3px 10px 3px 6px', marginLeft: 8,
            border: '1px solid #ffe082', cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <SuperCoinIcon />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#212121' }}>0</span>
        </a>
      </div>

      {/* ════════════════════════════════════════════════════════
          ROW 2 — Search Bar                 Profile | More | Cart
      ════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 20px', gap: 12,
        maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box',
        minHeight: 52
      }}>

        {/* ── Search Bar — border: 2px solid #2EA1FF; border-radius: 12px ── */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: 1, display: 'flex', alignItems: 'center',
            border: '2px solid #2EA1FF', borderRadius: 12, background: '#fff',
            height: 44, overflow: 'hidden', padding: '0 4px'
          }}
        >
          {/* Search button on the LEFT (Flipkart puts it left) */}
          <button
            type="submit"
            aria-label="Search"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0 8px', display: 'flex', alignItems: 'center', flexShrink: 0
            }}
          >
            <SearchIcon />
          </button>
          <input
            id="navbar-search-input"
            type="text"
            name="q"
            placeholder="Search for Products, Brands and More"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoComplete="off"
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 14,
              color: '#3d3d3d', background: 'transparent', height: '100%',
              fontFamily: 'Inter, Arial, sans-serif'
            }}
          />
        </form>

        {/* Phone download icon */}
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="2.25" width="12" height="19.5" rx="1.5" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 10.1055L12 17.6055" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.75 15.3555L12 17.6055L14.25 15.3555" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 4.5H13.5" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Profile / User with Dropdown ── */}
        <div 
          style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setShowLogin(true)}
          onMouseLeave={() => setShowLogin(false)}
        >
          <button style={{
            background: showLogin ? '#2874f0' : 'none', 
            border: showLogin ? '1px solid #2874f0' : 'none', 
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 500, color: showLogin ? '#fff' : '#333', 
            padding: '8px 16px',
            borderRadius: 8,
            fontFamily: 'Inter, Arial, sans-serif', whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}>
            <img 
              src={PROFILE_ICON_URL} 
              alt="Profile" 
              width="24" height="24" 
              style={{ display: 'block', flexShrink: 0, filter: showLogin ? 'brightness(0) invert(1)' : 'none' }} 
            />
            <span>Login</span>
            <svg width="12" height="12" viewBox="0 0 14 11" fill="none" style={{ 
              transform: showLogin ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s'
            }}>
              <path d="M3 2L7 6L11 2" stroke={showLogin ? "#fff" : "#111112"} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {showLogin && (
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              paddingTop: 10, zIndex: 1100
            }}>
              {/* Triangle Caret */}
              <div style={{
                position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid #fff',
                zIndex: 1101
              }} />
              
              <div style={{
                background: '#fff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                borderRadius: 4,
                minWidth: 260,
                overflow: 'hidden',
                border: '1px solid #f0f0f0'
              }}>
                {/* Header: New customer? */}
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px', borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{ fontSize: 13, color: '#212121' }}>New customer?</span>
                  <a href="/signup" style={{ fontSize: 13, color: '#2874f0', fontWeight: 600, textDecoration: 'none' }}>Sign Up</a>
                </div>

                {[
                  { icon: PROFILE_ICON_URL,     label: 'My Profile',           href: '/account' },
                  { icon: PLUS_ICON_URL,        label: 'Flipkart Plus Zone',   href: '/plus' },
                  { icon: ORDERS_ICON_URL,      label: 'Orders',               href: '/account/orders' },
                  { icon: WISHLIST_ICON_URL,    label: 'Wishlist',             href: '/wishlist' },
                  { icon: BECOME_SELLER_ICON,   label: 'Become a Seller',      href: '/seller' },
                  { icon: REWARDS_ICON_URL,     label: 'Rewards',             href: '/account/rewards' },
                  { icon: GIFT_CARDS_ICON_URL,  label: 'Gift Cards',           href: '/the-gift-card-store' },
                  { icon: NOTIF_SETTINGS_ICON,  label: 'Notification Preferences', href: '/communication-preferences' },
                  { icon: CUSTOMER_CARE_ICON,   label: '24x7 Customer Care',   href: '/helpcentre' },
                  { icon: ADVERTISE_ICON,       label: 'Advertise',            href: '/advertise' },
                  { icon: DOWNLOAD_APP_ICON,    label: 'Download App',         href: '/mobile-apps' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 16px', color: '#212121', fontSize: 14,
                      textDecoration: 'none', transition: 'background 0.1s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f5f7fa'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={item.icon} alt="" width="18" height="18" style={{ flexShrink: 0 }} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── More ▾ dropdown ── */}
        <div style={{ position: 'relative' }}>
          <button
            id="more-btn"
            onClick={() => setShowMore(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 14, fontWeight: 500, color: '#333',
              fontFamily: 'Inter, Arial, sans-serif', padding: '4px 6px'
            }}
          >
            More
            <svg width="12" height="12" viewBox="0 0 14 11" fill="none">
              <path d={showMore ? "M11 6L7 2L3 6" : "M3 2L7 6L11 2"} stroke="#111112" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {showMore && (
            <div
              onMouseLeave={() => setShowMore(false)}
              style={{
                position: 'absolute', top: '110%', right: 0, background: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)', borderRadius: 4,
                minWidth: 280, zIndex: 999, border: '1px solid #f0f0f0'
              }}
            >
              <div style={{ padding: '12px 18px', fontWeight: 600, fontSize: 15, borderBottom: '1px solid #f0f0f0', color: '#333' }}>More</div>
              {[
                { icon: BECOME_SELLER_ICON,  label: 'Become a Seller',       href: 'https://seller.flipkart.com/sell-online/?utm_source=fkwebsite' },
                { icon: NOTIF_SETTINGS_ICON, label: 'Notification Settings',  href: '/communication-preferences/push?t=all' },
                { icon: CUSTOMER_CARE_ICON,  label: '24x7 Customer Care',     href: '/helpcentre' },
                { icon: ADVERTISE_ICON,      label: 'Advertise on Flipkart',  href: 'https://advertising.flipkart.com/' },
                { icon: NOTIFICATIONS_ICON,  label: 'Notifications',          href: '/notifications' },
                { icon: LOGOUT_ICON,         label: 'Logout',                 href: '#' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '11px 18px', cursor: 'pointer', fontSize: 14, color: '#212121',
                    borderBottom: '1px solid #f5f5f5', textDecoration: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <img src={item.icon} alt={item.label} width="20" height="20" />
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ── Cart ── */}
        <a
          id="cart-btn"
          href="/viewcart?marketplace=FLIPKART"
          onClick={e => { e.preventDefault(); navigate('/cart'); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 500, color: '#333',
            fontFamily: 'Inter, Arial, sans-serif', padding: '4px 12px',
            position: 'relative', textDecoration: 'none'
          }}
        >
          <div style={{ position: 'relative' }}>
            <img src={CART_ICON_URL} alt="Cart" width="24" height="24" />
            {cartSummary.itemCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -8,
                background: '#e3122e', color: '#fff', fontSize: 10, fontWeight: 700,
                minWidth: 15, height: 15, borderRadius: '50%', border: '2px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2px'
              }}>{cartSummary.itemCount}</span>
            )}
          </div>
          Cart
        </a>
      </div>

      {/* ════════════════════════════════════════════════════════
          ROW 3 — CATEGORY L1 NAV (exact Flipkart apex-static SVG icons)
          background: white; border-bottom: 1px solid #D6D6D6
      ════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        overflowX: 'auto', scrollbarWidth: 'none',
        background: '#fff', padding: '0 8px',
        borderTop: '1px solid rgba(0,0,0,0.16)',
        maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box'
      }}>
        {CATEGORIES.map((cat, i) => {
          /* Determine active state */
          const isActive = activeCategory !== undefined
            ? cat.name === activeCategory
            : i === 0;

          return (
            <div
              key={i}
              id={`cat-${i}`}
              onClick={() => navigate(cat.route)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'flex-end', gap: 2,
                padding: '4px 4px', cursor: 'pointer', flexShrink: 0,
                minWidth: 82, height: 63,
                /* Active has a blue 4px bottom bar inside a gradient rounded bg */
                position: 'relative'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  const icon = e.currentTarget.querySelector('img');
                  if (icon) icon.style.transform = 'scale(1)';
                }
              }}
              onMouseLeave={e => {}}
            >
              {/* Active background pill */}
              {isActive && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(rgb(186,225,255), rgb(255,255,255))',
                  borderRadius: 8, zIndex: 0
                }} />
              )}

              {/* Icon */}
              <div style={{ position: 'relative', zIndex: 1, transform: 'scale(0.889)' }}>
                <img
                  loading="lazy"
                  src={CATEGORY_ICONS[cat.icon]}
                  alt={cat.name}
                  width="36"
                  height="36"
                  style={{ display: 'block' }}
                />
              </div>

              {/* Label */}
              <span style={{
                fontSize: 12, lineHeight: '16px',
                fontFamily: 'inter_regular, Inter, Arial, sans-serif',
                color: '#212121', whiteSpace: 'nowrap',
                position: 'relative', zIndex: 1,
                transform: 'translateY(1px)',
                fontWeight: isActive ? 700 : 400
              }}>{cat.name}</span>

              {/* Active bottom bar — 4px blue, matches Flipkart: background-color: rgb(17,98,242) */}
              {isActive && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: '100%', height: 4,
                  background: '#1162f2', borderRadius: '2px 2px 0 0',
                  zIndex: 2
                }} />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
