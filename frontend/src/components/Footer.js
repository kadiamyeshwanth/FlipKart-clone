import React, { useState } from 'react';

/* ── helper: a footer navigation link ── */
const FLink = ({ href, children }) => (
  <a
    href={href || '#'}
    style={{
      cursor: 'pointer', padding: 0,
      color: 'rgba(255,255,255,0.75)', fontSize: 13,
      display: 'block', width: '100%', marginBottom: 10,
      textDecoration: 'none',
    }}
    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
  >
    {children}
  </a>
);

const ColHead = ({ children }) => (
  <h4 style={{
    fontSize: 12, fontWeight: 600, color: '#878787',
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginBottom: 16, marginTop: 0
  }}>{children}</h4>
);

/* ── SEO collapsible text (Flipkart-style "About" section) ── */
const SeoBlock = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: '#fff', padding: '20px 24px', marginBottom: 0, borderBottom: '1px solid #e0e0e0' }}>
      <div style={{
        maxHeight: expanded ? 'none' : 200,
        overflow: 'hidden',
        position: 'relative',
        fontSize: 13,
        color: '#333',
        lineHeight: 1.7,
      }}>
        <h2 style={{ fontSize: 16, marginTop: 0, marginBottom: 8, color: '#212121' }}>
          About Flipkart: India's Largest Online Marketplace
        </h2>
        <p>
          Welcome to <strong>Flipkart</strong>, India's largest e-commerce marketplace! With over 500 million registered users and a catalogue spanning 150+ million products across 80+ categories, Flipkart makes online shopping accessible, joyful, and rewarding for every Indian.
        </p>
        <h2 style={{ fontSize: 14, margin: '12px 0 6px', color: '#212121' }}>Online Shopping Made Easy: The Flipkart Advantage</h2>
        <p>
          Flipkart has revolutionised the way India shops online. We offer an unparalleled selection of products at competitive prices, backed by a trusted and reliable delivery network. Shop for <a href="/mobiles/pr?sid=tyy,4io" style={{ color: '#2874f0', textDecoration: 'none' }}>mobiles</a>, <a href="/laptops/pr?sid=6bo,b5g" style={{ color: '#2874f0', textDecoration: 'none' }}>laptops</a>, <a href="/clothing-and-accessories/pr?sid=clo" style={{ color: '#2874f0', textDecoration: 'none' }}>fashion</a>, <a href="/home-furniture-appliances/pr?sid=ect" style={{ color: '#2874f0', textDecoration: 'none' }}>home appliances</a>, groceries, and much more — all from the comfort of your home.
        </p>
        <h2 style={{ fontSize: 14, margin: '12px 0 6px', color: '#212121' }}>Explore Our Massive Product Categories</h2>
        <p>
          <strong>Mobiles &amp; Electronics:</strong> Discover the latest smartphones from Apple, Samsung, POCO, Motorola, Realme, and more. Browse powerful laptops — ultraportables, gaming, business, and Chromebooks. Explore tablets, smart home devices, cameras, headphones, and speakers from top brands.
        </p>
        <p>
          <strong>Home &amp; Kitchen Appliances:</strong> Upgrade your home with Smart TVs, refrigerators, washing machines, air conditioners, microwaves, and water purifiers from trusted brands like LG, Samsung, Whirlpool, Godrej, and Voltas. Our Dependable TV and Appliance Store guarantees zero transit damage and a replacement guarantee.
        </p>
        <p>
          <strong>Fashion &amp; Beauty:</strong> Flipkart, India ka Fashion Capital, has clothing for men, women, and kids — ethnic wear, western wear, activewear, footwear, <a href="/bags-wallets-belts/handbags-clutches/handbags/pr?sid=reh,ihu,m08" style={{ color: '#2874f0', textDecoration: 'none' }}>handbags</a>, <a href="/watches/pr?sid=r18" style={{ color: '#2874f0', textDecoration: 'none' }}>watches</a>, and jewellery. Beauty and grooming products cover skincare, <a href="/beauty-and-grooming/makeup/pr?sid=g9b,ffi" style={{ color: '#2874f0', textDecoration: 'none' }}>makeup</a>, <a href="/beauty-and-grooming/hair-care-and-accessory/pr?sid=g9b,lcf" style={{ color: '#2874f0', textDecoration: 'none' }}>haircare</a>, and fragrances.
        </p>
        <p>
          <strong>Home &amp; Furniture:</strong> Furnish your home with sofa sets, dining tables, bookshelves, cupboards, and modular kitchen solutions. Our Durability Certified Furniture Store passes 35 rigorous stability tests to guarantee up to 10 years of durability. Be FurniSure, always.
        </p>
        <p>
          <strong>Daily Essentials:</strong> Order household supplies, health and hygiene products, pet food, and baby care essentials — <a href="/baby-care/diaper-potty-training/baby-diapers/pr?sid=kyh,fdp,yvf" style={{ color: '#2874f0', textDecoration: 'none' }}>diapers</a>, wipes, baby food, strollers, and more.
        </p>
        <p>
          <strong>Sports &amp; Two Wheelers:</strong> Browse <a href="/vehicles/bikes-scooters/pr?sid=7dk,0aj" style={{ color: '#2874f0', textDecoration: 'none' }}>scooters</a>, <a href="/electric-scooters-store" style={{ color: '#2874f0', textDecoration: 'none' }}>electric vehicles</a>, cricket, badminton, and gym equipment. Find video games, consoles, and <a href="/musical-instruments/pr?sid=ypu" style={{ color: '#2874f0', textDecoration: 'none' }}>musical instruments</a>.
        </p>
        <h2 style={{ fontSize: 14, margin: '12px 0 6px', color: '#212121' }}>Flipkart Plus: Exclusive Rewards for Loyal Shoppers</h2>
        <p>
          Join Flipkart Plus to unlock exclusive benefits including free and priority delivery, early access to sales, and earn SuperCoins on every purchase. Redeem SuperCoins for exciting rewards, flight bookings, and Flikart services.
        </p>
        <h2 style={{ fontSize: 14, margin: '12px 0 6px', color: '#212121' }}>Flipkart Pay Later: Shop Now, Pay Later</h2>
        <p>
          Flipkart Pay Later lets you buy now and pay at the end of the month — interest-free for qualifying amounts. Accept UPI, Pay Later, Credit/Debit Cards, and Net Banking.
        </p>
        <h2 style={{ fontSize: 14, margin: '12px 0 6px', color: '#212121' }}>Why Choose Flipkart?</h2>
        <p>
          1. India's Largest Selection: Millions of genuine products across every category.<br />
          2. Unbeatable Value: Best prices guaranteed, amplified by frequent <a href="/offers-store" style={{ color: '#2874f0', textDecoration: 'none' }}>Flipkart offers</a> and sale mega-events.<br />
          3. Lightning-Fast Delivery: From standard shipping to 10-minute deliveries and slot-based options.<br />
          4. Trust &amp; Authenticity: 100% genuine products, secure payment gateways, and transparent policies.<br />
          5. Customer First: Dedicated 24×7 customer support.
        </p>
        <h2 style={{ fontSize: 14, margin: '12px 0 6px', color: '#212121' }}>Get Exclusive Offers in Popular Sale Events</h2>
        <p>
          Major events like Big Billion Days, End of Season Sale (EOSS), GOAT Sale and more bring great discounts. Plan purchases to make sure you get the best benefits.
        </p>
        {/* Fade mask when collapsed */}
        {!expanded && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 60,
            background: 'linear-gradient(transparent, #fff)',
          }} />
        )}
      </div>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          marginTop: 10, background: 'none', border: 'none',
          color: '#2874f0', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4,
        }}
      >
        {expanded ? 'Read Less' : 'Read More'}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2874f0" strokeWidth="2.5" strokeLinecap="round">
          <polyline points={expanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
        </svg>
      </button>
    </div>
  );
};

/* ── Main Footer ── */
const Footer = () => (
  <footer style={{ background: '#172337', color: '#fff', marginTop: 12 }}>

    {/* ── SEO text above footer ── */}
    <SeoBlock />

    {/* ── MAIN LINK GRID ── */}
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
      gap: 32, padding: '40px 60px',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>

      {/* ABOUT */}
      <div>
        <ColHead>About</ColHead>
        <FLink href="/helpcentre">Contact Us</FLink>
        <FLink href="https://corporate.flipkart.net/corporate-home">About Us</FLink>
        <FLink href="https://www.flipkartcareers.com/">Careers</FLink>
        <FLink href="http://stories.flipkart.com/">Flipkart Stories</FLink>
        <FLink href="http://stories.flipkart.com/category/top-stories/news/">Press</FLink>
        <FLink href="/corporate-information">Corporate Information</FLink>
      </div>

      {/* GROUP COMPANIES */}
      <div>
        <ColHead>Group Companies</ColHead>
        <FLink href="https://www.myntra.com/">Myntra</FLink>
        <FLink href="https://www.cleartrip.com/">Cleartrip</FLink>
        <FLink href="https://www.shopsy.in">Shopsy</FLink>
      </div>

      {/* HELP */}
      <div>
        <ColHead>Help</ColHead>
        <FLink href="/pages/payments">Payments</FLink>
        <FLink href="/pages/shipping">Shipping</FLink>
        <FLink href="/helpcentre?catalog=55c9c6edb000002e002c1701&view=CATALOG">Cancellation &amp; Returns</FLink>
        <FLink href="/helpcentre?catalog=55c9c8e2b0000023002c1702&view=CATALOG">FAQ</FLink>
      </div>

      {/* CONSUMER POLICY */}
      <div>
        <ColHead>Consumer Policy</ColHead>
        <FLink href="/pages/returnpolicy">Cancellation &amp; Returns</FLink>
        <FLink href="/pages/terms">Terms Of Use</FLink>
        <FLink href="/pages/paymentsecurity">Security</FLink>
        <FLink href="/pages/privacypolicy">Privacy</FLink>
        <FLink href="/sitemap">Sitemap</FLink>
        <FLink href="/pages/grievance-redressal-mechanism">Grievance Redressal</FLink>
        <FLink href="/pages/ewaste-compliance-tnc">EPR Compliance</FLink>
        <FLink href="https://fssai.gov.in/cms/food-safety-connect.php">FSSAI Food Safety</FLink>
      </div>

      {/* MAIL US + SOCIAL */}
      <div>
        <ColHead>Mail Us:</ColHead>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, margin: '0 0 14px 0' }}>
          Flipkart Internet Private Limited,<br />
          Buildings Alyssa, Begonia &amp;<br />
          Clove Embassy Tech Village,<br />
          Outer Ring Road,<br />
          Devarabeesanahalli Village,<br />
          Bengaluru, 560103,<br />
          Karnataka, India
        </p>
        <ColHead>Social:</ColHead>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="https://www.facebook.com/flipkart" aria-label="Facebook"
            style={{ width: 30, height: 30, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
          </a>
          <a href="https://www.twitter.com/flipkart" aria-label="Twitter"
            style={{ width: 30, height: 30, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://www.youtube.com/flipkart" aria-label="YouTube"
            style={{ width: 30, height: 30, borderRadius: '50%', background: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000" /></svg>
          </a>
          <a href="https://www.instagram.com/flipkart" aria-label="Instagram"
            style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      {/* REGISTERED OFFICE */}
      <div>
        <ColHead>Registered Office Address:</ColHead>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, margin: 0 }}>
          Flipkart Internet Private Limited,<br />
          Buildings Alyssa, Begonia &amp;<br />
          Clove Embassy Tech Village,<br />
          Outer Ring Road,<br />
          Devarabeesanahalli Village,<br />
          Bengaluru, 560103,<br />
          Karnataka, India<br />
          CIN: U51109KA2012PTC066107<br />
          Telephone:{' '}
          <a href="tel:044-45614700" style={{ color: '#2874f0', textDecoration: 'none' }}>044-45614700</a>
          {' / '}
          <a href="tel:044-67415800" style={{ color: '#2874f0', textDecoration: 'none' }}>044-67415800</a>
        </p>
      </div>
    </div>

    {/* ── BOTTOM BAR ── */}
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 60px', background: '#0d1b2e', flexWrap: 'wrap', gap: 12
    }}>
      {/* Seller / partner links */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'Become a Seller', href: 'https://seller.flipkart.com/?utm_source=fkwebsite' },
          { label: 'Advertise',       href: 'https://brands.flipkart.com' },
          { label: 'Gift Cards',      href: '/the-gift-card-store' },
          { label: 'Help Center',     href: '/helpcentre' },
        ].map(({ label, href }) => (
          <a key={label} href={href}
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >{label}</a>
        ))}
      </div>

      {/* Copyright */}
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
        © 2007-2026 Flipkart.com
      </div>

      {/* Real Flipkart payment methods SVG from CDN */}
      <img
        alt="Payment methods"
        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-69e7ec.svg"
        style={{ height: 28 }}
        onError={e => { e.target.style.display = 'none'; }}
      />
    </div>
  </footer>
);

export default Footer;
