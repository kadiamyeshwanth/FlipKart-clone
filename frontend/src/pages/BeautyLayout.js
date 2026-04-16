import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './FashionLayout.css';
import './BeautyLayout.css';

/* ═══════════════════════════════════════════════════════════════
   Beauty & Personal Care — Flipkart-accurate layout
   All images sourced from index.html (Flipkart CDN)
═══════════════════════════════════════════════════════════════ */

/* ── Hero Banner: 1600×640 aspect 82/33 ── */
const HERO = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1600/640/image/2f59231fedfeae63.jpg?q=80', link: '/g9b' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1600/640/image/533768a12d211dd7.png?q=80', link: '/beauty-and-grooming' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1600/640/image/0fe0a65805b3fb9f.jpg?q=80', link: '/skincare' },
];

/* ── Quick Links: 196×196 circles ── */
const QUICK_LINKS = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/b44b34aa0cc14e69.png?q=90', label: 'Skincare' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e1b85ada3b94f7ad.png?q=90', label: 'Makeup' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/a5a07cbb74491f96.png?q=90', label: 'Haircare' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/ff607e5dab36d3dc.png?q=90', label: 'Fragrances' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/b44b34aa0cc14e69.png?q=90', label: 'Face Wash' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e2efb00c5f4c7ea4.png?q=90', label: 'Sunscreen' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/a5a07cbb74491f96.png?q=90', label: 'Eye Care' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/ff607e5dab36d3dc.png?q=90', label: 'Body Care' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/b44b34aa0cc14e69.png?q=90', label: 'Nail Care' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e1b85ada3b94f7ad.png?q=90', label: 'Foundation' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/a5a07cbb74491f96.png?q=90', label: 'Kajal' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e2efb00c5f4c7ea4.png?q=90', label: 'Compact' },
];

/* ── The Launch Party: tall portrait cards 195/256 (from index.html) ── */
const LAUNCH_PARTY = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/3f9aa115e6d8e29b.png?q=90', link: '/beauty-and-grooming/fragrances/attar', label: 'Attarnation' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/d0a8ea8883214a2b.png?q=90', link: '/g9b/~cs-be3doq761k', label: 'Medicube' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/05b7fba38eaa4504.png?q=90', link: '/g9b/0yh/~cs-m291x0nw33', label: 'GUESS' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/c79d9e26f71c533f.png?q=90', link: '/beauty-and-grooming/body-face-skin-care', label: 'ClayCo.' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/e509a841e27d0351.png?q=90', link: '/g9b/0yh/~cs-m291x0nw33/Police', label: 'Police' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/789b29c265067b31.png?q=90', link: '/g9b/0yh/~cs-m291x0nw33/NAUTICA', label: 'NAUTICA' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/905c9f7ccac6509b.png?q=90', link: '/g9b/~cs-31a0cgw8pe', label: 'Beauty & Grooming' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/75f8414784a31f91.png?q=90', link: '/g9b/0yh/~cs-m291x0nw33/JAGUAR', label: 'JAGUAR' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/11d94f774f2fafc6.png?q=90', link: '/g9b/~cs-tj5dta8aug', label: 'Grooming' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/17b478fbf94ece02.png?q=90', link: '/g9b/~cs-7m4snkdxor/Nua', label: 'Nua' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/903b25175852146f.png?q=90', link: '/g9b/ema/5la/~cs-lo6z9u83xa', label: 'Reginald' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/442d610e7e445bbe.png?q=90', link: '/g9b/~cs-hg37wkwrhg/SKIN1004', label: 'SKIN1004' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/cb23feafebb91dc7.png?q=90', link: '/g9b/~cs-jeo1kjelk6', label: 'Grooming' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/781e54128acc7e40.png?q=90', link: '/g9b/~cs-gfnishi7o0/Gillette', label: 'Gillette' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1670/2190/image/7bf2c749ea9ebed7.png?q=90', link: '/plum-bodylovin-vanilla-caramello', label: 'Plum' },
];

/* ── 3-col promo banners ── */
const PROMO3 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/1af5636faaafcfa1.jpg?q=90', link: '/skincare-store', label: 'Skincare Sale' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/2392d60360955cc8.jpg?q=90', link: '/makeup-store', label: 'Makeup Deals' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/6ab8be63241d392b.jpg?q=90', link: '/fragrances-store', label: 'Fragrances' },
];

/* ── Skincare Portrait grid 1020×1350 ── */
const SKINCARE_GRID = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/082c1d6a00407e04.jpg?q=20', link: '/moisturizers' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/b2e033cb5b02ad23.jpg?q=90', link: '/serums' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/6871d015db6f11ee.jpg?q=90', link: '/face-wash' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/27d63c31cd1fa0f3.jpg?q=90', link: '/sunscreen' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3b576ad56c675d48.jpg?q=90', link: '/toner' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/5b443b73a7dc8cd7.jpg?q=90', link: '/eye-cream' },
];

/* ── Full-width strip ── */
const STRIP1 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/400/image/dae5feb56e759072.png?q=90', link: '/beauty-deals' };

/* ── Makeup grid 1050×1580 tall ── */
const MAKEUP_GRID = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/27d30a0f8e01e73e.jpg?q=20', link: '/lipstick' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/b704273c758c5df3.jpg?q=90', link: '/foundation' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/7b5c3ccf2a5fa1fe.jpg?q=90', link: '/eyeshadow' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/68f4a31b7b3aaa65.jpg?q=90', link: '/mascara' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/f42e7751e0e71ea1.jpg?q=90', link: '/kajal' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/25bf6477e9fb67fb.jpg?q=90', link: '/nail-polish' },
];

/* ── Thin strip ── */
const STRIP2 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/c01289cced45a3b2.jpg?q=90', link: '/haircare' };

/* ── Fragrance grid 1020×1350 ── */
const FRAGRANCE_GRID = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3259df9a4f8f8adb.jpg?q=20', link: '/perfume' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/9a2e17c513b3b826.png?q=90', link: '/deodorant' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/2cb6f16fb4b916dc.jpg?q=90', link: '/body-mist' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/22372af2fcf36ba2.jpg?q=90', link: '/attar' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/233da949d729bdd9.jpg?q=90', link: '/luxury-perfume' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/62f5735cfb06805c.jpg?q=90', link: '/gift-pack' },
];

/* ── 4-col brand banners 220×230 ── */
const BRAND4 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/191ce500e5475980.png?q=90', link: '/lakme', label: 'Lakmé' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/48daec06c2ea504b.png?q=90', link: '/maybelline', label: 'Maybelline' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/a3f2c4a802a18b56.png?q=90', link: '/loreal', label: "L'Oréal" },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/5be13f3fbc48ef66.png?q=90', link: '/mamaearth', label: 'Mamaearth' },
];

/* ── Haircare tall grid 635×844 ── */
const HAIR_GRID = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/220347b84d4a2b28.png?q=90', link: '/shampoo' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/7cd6d63ca018fdc8.jpg?q=90', link: '/conditioner' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/9c83699dff51f81c.png?q=90', link: '/hair-oil' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/36f634428837c2a8.png?q=90', link: '/hair-serum' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/f7dbce57472cf8a8.jpg?q=90', link: '/hair-mask' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/fdfba1eafb1e29a6.jpg?q=90', link: '/hair-color' },
];

/* ── Wide strip ── */
const STRIP3 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/490/image/0e8e8290cb342e12.jpg?q=90', link: '/grooming' };

/* ── Men's Grooming grid ── */
const MENS_GRID = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/973be4d6bcc6c190.jpg?q=20', link: '/mens-grooming' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/291aafbf93d35d75.jpg?q=90', link: '/shaving' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/a73277ddaf13e3d6.jpg?q=90', link: '/face-wash-men' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/b3b8d231816eea16.jpg?q=90', link: '/deodorant-men' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/53c3c80bfd2e3659.jpg?q=90', link: '/beard-care' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/e1fd10682c4736ec.jpg?q=90', link: '/trimmers' },
];

/* ════════════════════════════════════════════════════
   COMPONENTS
════════════════════════════════════════════════════ */

/* Auto-play Hero Carousel */
const HeroCarousel = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const next = useCallback(() => setCurrent(c => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + items.length) % items.length), [items.length]);
  const reset = () => { clearInterval(timerRef.current); timerRef.current = setInterval(next, 4500); };
  useEffect(() => { timerRef.current = setInterval(next, 4500); return () => clearInterval(timerRef.current); }, [next]);

  return (
    <div className="bty-hero-carousel">
      <div className="bty-hero-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((item, i) => (
          <div className="bty-hero-slide" key={i}>
            <a href={item.link || '#'}>
              <img
                src={item.src}
                alt={`Beauty banner ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </a>
          </div>
        ))}
      </div>
      <button className="bty-hero-btn bty-hero-prev" onClick={() => { prev(); reset(); }} aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button className="bty-hero-btn bty-hero-next" onClick={() => { next(); reset(); }} aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="bty-hero-dots">
        {items.map((_, i) => (
          <button key={i} className={`bty-hero-dot${i === current ? ' active' : ''}`}
            onClick={() => { setCurrent(i); reset(); }} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

/* Horizontal scroll carousel – tall portrait cards (195/256) */
const PortraitCarousel = ({ title, accent = '#ff6b9d', bg = '#fff', items }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };
  return (
    <div className="bty-section" style={{ background: bg }}>
      <div className="bty-section-header" style={{ borderLeft: `4px solid ${accent}` }}>
        <span className="bty-section-title">{title}</span>
        <a href="#" className="bty-see-all">See All</a>
      </div>
      <div className="bty-portrait-wrapper">
        <button className="bty-scroll-btn bty-scroll-left" onClick={() => scroll(-1)} aria-label="Scroll left">
          <svg width="10" height="20" viewBox="0 0 13 23" fill="none">
            <path d="M11.4 21.4L1.4 11.4L11.4 1.4" stroke="#333333" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="bty-portrait-track" ref={scrollRef}>
          {items.map((item, i) => (
            <div className="bty-portrait-card" key={i}>
              <a href={item.link || '#'} className="bty-portrait-link">
                <div className="bty-portrait-img-wrap">
                  <img
                    src={item.src}
                    alt={item.label || `Product ${i + 1}`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
        <button className="bty-scroll-btn bty-scroll-right" onClick={() => scroll(1)} aria-label="Scroll right">
          <svg width="10" height="20" viewBox="0 0 13 23" fill="none">
            <path d="M1.4 1.4L11.4 11.4L1.4 21.4" stroke="#333333" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

/* Portrait grid (non-scrollable, 6-up) */
const PortraitGrid = ({ title, accent, items, cols = 6 }) => (
  <div className="bty-section bty-section-white">
    {title && (
      <div className="bty-section-header" style={{ borderLeft: `4px solid ${accent || '#ff6b9d'}` }}>
        <span className="bty-section-title">{title}</span>
        <a href="#" className="bty-see-all">See All</a>
      </div>
    )}
    <div className={`fk-grid fk-grid-${cols}`}>
      {items.map((item, i) => (
        <div className="fk-grid-cell" key={i}>
          <a href={item.link || '#'} className="fk-banner-link">
            <img src={item.src} alt={item.label || `Item ${i + 1}`} loading="lazy" className="fk-banner-img" />
          </a>
        </div>
      ))}
    </div>
  </div>
);

/* 4-col brand grid */
const BrandGrid = ({ title, items }) => (
  <div className="bty-section bty-section-white">
    {title && (
      <div className="bty-section-header" style={{ borderLeft: '4px solid #e91e8c' }}>
        <span className="bty-section-title">{title}</span>
        <a href="#" className="bty-see-all">See All</a>
      </div>
    )}
    <div className="bty-brand-grid">
      {items.map((item, i) => (
        <a href={item.link || '#'} className="bty-brand-card" key={i}>
          <img src={item.src} alt={item.label || `Brand ${i + 1}`} loading="lazy" />
          {item.label && <span className="bty-brand-label">{item.label}</span>}
        </a>
      ))}
    </div>
  </div>
);

/* 3-col promo cards */
const PromoRow = ({ title, items }) => (
  <div className="bty-section bty-section-grey">
    {title && (
      <div className="bty-section-header" style={{ borderLeft: '4px solid #ff6b9d' }}>
        <span className="bty-section-title">{title}</span>
      </div>
    )}
    <div className="bty-promo-row">
      {items.map((item, i) => (
        <a href={item.link || '#'} className="bty-promo-card" key={i}>
          <img src={item.src} alt={item.label || `Promo ${i + 1}`} loading="lazy" />
        </a>
      ))}
    </div>
  </div>
);

/* Full-width strip banner */
const StripBanner = ({ src, link }) => (
  <div className="bty-section">
    <a href={link || '#'} className="bty-strip-link">
      <img src={src} alt="Beauty offer" loading="lazy" className="bty-strip-img" />
    </a>
  </div>
);

/* Quick Links (circle chips) */
const QuickLinks = ({ items }) => (
  <div className="bty-section bty-section-white">
    <div className="bty-section-header" style={{ borderLeft: '4px solid #ff6b9d' }}>
      <span className="bty-section-title">Shop by Category</span>
      <a href="/beauty-and-grooming" className="bty-see-all">See All</a>
    </div>
    <div className="fk-quicklinks">
      {items.map((c, i) => (
        <div role="button" tabIndex={0} className="fk-quicklink" key={i}
          onClick={() => {}} onKeyPress={() => {}}>
          <div className="fk-quicklink-img">
            <img src={c.src} alt={c.label} loading="lazy" />
          </div>
          <span className="fk-quicklink-label">{c.label}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════
   ROOT PAGE
════════════════════════════════════════════════════ */
const BeautyLayout = () => (
  <div style={{ background: '#f1f3f6', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
    <Navbar />
    <div style={{ paddingTop: 158 }}>
      <div className="fk-fashion-root">
        {/* 1. Hero Carousel */}
        <div className="bty-section">
          <HeroCarousel items={HERO} />
        </div>

    {/* 2. Category Quick Links */}
    <QuickLinks items={QUICK_LINKS} />

    {/* 3. THE LAUNCH PARTY — horizontal portrait carousel */}
    <PortraitCarousel
      title="The Launch Party"
      accent="rgb(255, 169, 149)"
      bg="#fff8f6"
      items={LAUNCH_PARTY}
    />

    {/* 4. 3-col promo banners */}
    <PromoRow title="Trending Now" items={PROMO3} />

    {/* 5. Skincare 6-up portrait grid */}
    <PortraitGrid
      title="Skincare Essentials"
      accent="#4caf50"
      items={SKINCARE_GRID}
      cols={6}
    />

    {/* 6. Full-width strip */}
    <StripBanner src={STRIP1.src} link={STRIP1.link} />

    {/* 7. Makeup tall grid */}
    <PortraitGrid
      title="Makeup Must-Haves"
      accent="#e91e8c"
      items={MAKEUP_GRID}
      cols={6}
    />

    {/* 8. Thin strip */}
    <StripBanner src={STRIP2.src} link="/haircare" />

    {/* 9. Fragrances 6-up */}
    <PortraitGrid
      title="Top Fragrances"
      accent="#9c27b0"
      items={FRAGRANCE_GRID}
      cols={6}
    />

    {/* 10. 4-col brand banners */}
    <BrandGrid title="Top Brands" items={BRAND4} />

    {/* 11. Haircare 6-up (3-col style tall) */}
    <PortraitGrid
      title="Haircare Picks"
      accent="#ff9800"
      items={HAIR_GRID}
      cols={6}
    />

    {/* 12. Wide strip */}
    <StripBanner src={STRIP3.src} link="/grooming" />

    {/* 13. Men's Grooming 6-up */}
    <PortraitGrid
      title="Men's Grooming"
      accent="#2196f3"
      items={MENS_GRID}
      cols={6}
    />

      </div>
    </div>
    <Footer />
  </div>
);

export default BeautyLayout;
