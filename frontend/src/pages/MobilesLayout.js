import React, { useState, useEffect, useRef, useCallback } from 'react';
import './FashionLayout.css';
import './MobilesLayout.css';

/* ═══════════════════════════════════════════════════
   All images extracted directly from the live
   Flipkart Mobiles page (index.html)
═══════════════════════════════════════════════════ */

/* SECTION 1 — Hero carousel (1000×620, 3:2 landscape) */
const HERO = [
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/1b4eb0874a9997a6.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/2c2601b805596c7f.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/6c5a5d57bb9d3f8a.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/8808663277ed85f1.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/b12d33d644d359de.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/4b6e3551864af672.png',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/dd6e4ab0648520b0.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/18cdb276fe92ff0b.jpg',
];

/* SECTION 2 — Quick links (196×196 circle chips) */
const QUICKLINKS = [
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/cfe925774f6d195b.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/a2092e3bdecb646d.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e179e7e353c2cd62.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/662d4fc8acf5e48f.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/14132f5cc708f6d7.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e3b84f1a9386c7ab.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/83e48d6305cfaa28.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/204a78547669905c.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/00f3b4ff04403c1a.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/db0f90e64ae2e709.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/42d5b1ce9e3ec798.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/2987d969db0076a0.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/ce0737cb5a77c2ad.png',
  'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/6f663ee1af12381b.png',
];

/* SECTION 3 — Strip banners (970×220) */
const STRIPS = [
  'https://rukminim2.flixcart.com/fk-p-flap/970/220/image/cd23c4fe4ba99493.png',
  'https://rukminim2.flixcart.com/fk-p-flap/960/240/image/bce41fd844359cb6.png',
  'https://rukminim2.flixcart.com/fk-p-flap/960/240/image/5b55caeb771f294f.png',
  'https://rukminim2.flixcart.com/fk-p-flap/960/240/image/7edb32c5b1da60d1.png',
  'https://rukminim2.flixcart.com/fk-p-flap/960/220/image/21b76463ffc4b035.jpg',
];

/* SECTION 4 — Square brand tiles (220×220) */
const BRANDS = [
  'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/e39beaaf79f6f3e3.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/bfa4c23bc8911a17.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/b1cd16233064b91b.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/d29d8e12c3c7a546.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/6da70d5cc047ac38.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/8bd6318815de94e5.jpg',
];

/* SECTION 5 — Tall portrait deal cards (490×740, 2:3 ratio) */
const PORTRAIT_A = [
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/0f7fe3dcd15309d0.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/e8abc6a3d6c25499.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/4083f6267b5e5e66.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/2a701e24bb11bf65.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/8c48d4571721c309.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/18e1d425d3459c4d.jpg',
];

const PORTRAIT_B = [
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/18ca5e8affdd27dc.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/f41bd5257714c57c.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/f3780e5a5863421a.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/15d475afdb97247a.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/942df485d4d18ffa.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/e857a613f89e54f2.jpg',
];

const PORTRAIT_C = [
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/e63dda959fdeb373.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/a8ecdb9397c8ee88.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/44ec7c31b93446bf.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/35d5d647fddc6218.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/01065dd8e348656e.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/490/740/image/fb3b54742d80e93f.jpg',
];

/* Extra tall 510×770 promo cards */
const PROMO_510 = [
  'https://rukminim2.flixcart.com/fk-p-flap/510/770/image/83dc52a5fe536773.png',
  'https://rukminim2.flixcart.com/fk-p-flap/510/770/image/6bd57906d72d7fcc.jpg',
  'https://rukminim2.flixcart.com/fk-p-flap/510/770/image/fb59c9621e57a0b8.png',
  'https://rukminim2.flixcart.com/fk-p-flap/510/770/image/70124d8b60069625.png',
  'https://rukminim2.flixcart.com/fk-p-flap/510/770/image/dc9bb7ffad92cf86.png',
  'https://rukminim2.flixcart.com/fk-p-flap/520/780/image/0a928710f33fe009.png',
];

/* ═══════════════════════════════════════════════════
   CAROUSEL COMPONENT
═══════════════════════════════════════════════════ */
const Carousel = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const n = items.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % n), [n]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + n) % n), [n]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  return (
    <div className="mob-carousel">
      {/* track */}
      <div className="mob-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((src, i) => (
          <div className="mob-carousel-slide" key={i}>
            <img src={src} alt={`Banner ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      {/* arrows */}
      <button className="mob-arr mob-arr-l" onClick={() => { prev(); resetTimer(); }} aria-label="Prev">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2.2" strokeLinecap="round"/></svg>
      </button>
      <button className="mob-arr mob-arr-r" onClick={() => { next(); resetTimer(); }} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#333" strokeWidth="2.2" strokeLinecap="round"/></svg>
      </button>
      {/* dots */}
      <div className="mob-dots">
        {items.map((_, i) => (
          <button key={i} className={`mob-dot${i === current ? ' active' : ''}`}
            onClick={() => { setCurrent(i); resetTimer(); }} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════ */
const SectionHeader = ({ title }) => (
  <div className="mob-section-header">
    <h2>{title}</h2>
    <a href="#!">View All →</a>
  </div>
);

/* ═══════════════════════════════════════════════════
   MAIN LAYOUT
═══════════════════════════════════════════════════ */
const MobilesLayout = () => (
  <div className="mob-root">

    {/* ── QUICK LINKS ── */}
    <div className="mob-card mob-quicklinks-wrap">
      {QUICKLINKS.map((src, i) => (
        <div className="mob-quicklink" key={i} role="button" tabIndex={0} onClick={() => {}} onKeyPress={() => {}}>
          <div className="mob-ql-img">
            <img src={src} alt={`Category ${i + 1}`} loading="lazy" />
          </div>
        </div>
      ))}
    </div>

    {/* ── HERO CAROUSEL ── */}
    <div className="mob-card mob-hero-wrap">
      <Carousel items={HERO} />
    </div>

    {/* ── STRIP 1 ── */}
    <div className="mob-strip-wrap">
      <img src={STRIPS[0]} alt="Promo Strip" loading="lazy" className="mob-strip-img" />
    </div>

    {/* ── DEAL CARDS ROW A ── */}
    <div className="mob-card">
      <SectionHeader title="Best Deals on Mobiles" />
      <div className="mob-grid mob-grid-6">
        {PORTRAIT_A.map((src, i) => (
          <div className="mob-deal-card" key={i}>
            <div className="mob-deal-img">
              <img src={src} alt={`Deal ${i + 1}`} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── STRIP 2 ── */}
    <div className="mob-strip-wrap">
      <img src={STRIPS[1]} alt="Promo Strip" loading="lazy" className="mob-strip-img" />
    </div>

    {/* ── BRANDS GRID ── */}
    <div className="mob-card">
      <SectionHeader title="Shop by Brand" />
      <div className="mob-grid mob-grid-6">
        {BRANDS.map((src, i) => (
          <div className="mob-brand-card" key={i}>
            <div className="mob-brand-img">
              <img src={src} alt={`Brand ${i + 1}`} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
      {/* 220x230 extra brand tiles in a 3-col row */}
    </div>

    {/* ── PROMO 510px CARDS ── */}
    <div className="mob-card">
      <SectionHeader title="Top Picks" />
      <div className="mob-grid mob-grid-6">
        {PROMO_510.map((src, i) => (
          <div className="mob-deal-card mob-deal-tall" key={i}>
            <div className="mob-deal-img">
              <img src={src} alt={`Pick ${i + 1}`} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── STRIP 3 ── */}
    <div className="mob-strip-wrap">
      <img src={STRIPS[2]} alt="Promo Strip" loading="lazy" className="mob-strip-img" />
    </div>

    {/* ── DEAL CARDS ROW B ── */}
    <div className="mob-card">
      <SectionHeader title="Trending Phones" />
      <div className="mob-grid mob-grid-6">
        {PORTRAIT_B.map((src, i) => (
          <div className="mob-deal-card" key={i}>
            <div className="mob-deal-img">
              <img src={src} alt={`Phone ${i + 1}`} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── DEAL CARDS ROW C ── */}
    <div className="mob-card">
      <SectionHeader title="Budget Smartphones" />
      <div className="mob-grid mob-grid-6">
        {PORTRAIT_C.map((src, i) => (
          <div className="mob-deal-card" key={i}>
            <div className="mob-deal-img">
              <img src={src} alt={`Budget Phone ${i + 1}`} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── STRIP 4 ── */}
    <div className="mob-strip-wrap">
      <img src={STRIPS[3]} alt="Promo Strip" loading="lazy" className="mob-strip-img" />
    </div>

  </div>
);

export default MobilesLayout;
