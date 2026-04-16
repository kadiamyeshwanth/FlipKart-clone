import React from 'react';

/* ═══════════════════════════════════════════════════════════════
   SubCategoryPanel
   – Extracted EXACTLY from Flipkart's live HTML source
   – Two rows of 8 sub-category chips each, inside a white card
   – Image IDs are the real fk-p-flap thumbnail hashes
   – Layout: flex-direction: row, margin-bottom: 8px (two rows)
   – Item width: 113.524px (derived from max-width 912px / 8col)
═══════════════════════════════════════════════════════════════ */

const BASE = 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/';
const img = (id) => `${BASE}${id}?q=90`;

/* ── Row 1: 8 categories ── */
const ROW_1 = [
  { label: 'Dry fruits',    imgId: '95a9c01c41d74db6.png', href: '/eat/~cs-6au009s0bt/pr?sid=eat&collection-tab-name=Dry+Fruits' },
  { label: 'Edible seeds',  imgId: '334dc05ae0003f36.png', href: '/eat/~cs-n7eomq2qpw/pr?sid=eat&collection-tab-name=Edible+Seeds' },
  { label: 'Chocolates',    imgId: '0fb16a232d27576b.jpg', href: '/eat/~cs-atgsjorhtz/pr?sid=eat&collection-tab-name=Chocolates' },
  { label: 'Cereals',       imgId: '3a2047dcf1fb7e10.jpg', href: '/eat/~cs-sd4zegrqj9/pr?sid=eat&collection-tab-name=Breakfast+Specials' },
  { label: 'Hot brews',     imgId: '6abb765224f156ff.jpg', href: '/eat/~cs-809i6dkksg/pr?sid=eat&collection-tab-name=Tea+and+Coffee' },
  { label: 'Gourmet',       imgId: 'dc14077c923c95b7.png', href: '/eat/~cs-6au009s0bt/pr?sid=eat&collection-tab-name=Dry+Fruits&sort=recency_desc' },
  { label: 'Juices',        imgId: '3f167d0473a68768.png', href: '/eat/~cs-ch09m7n7wy/pr?sid=eat&collection-tab-name=Summer+Essentials' },
  { label: 'Oil & ghee',    imgId: '6afbfbfab91fb88a.png', href: '/eat/~cs-yzmaxvfhk5/pr?sid=eat&collection-tab-name=Cooking+Essentials' },
];

/* ── Row 2: 9 categories — EXACT production image IDs from index.html ── */
const ROW_2 = [
  { label: 'Trending',      imgId: '1a5f6907504c3597.png', href: '/eat/~cs-dq2i6c8y1d/pr?sid=eat&collection-tab-name=Food+and+Beverages' },
  { label: 'Pet food',      imgId: '904cdc754d1ec384.jpg', href: '/p3t/~cs-pyd4uh6z20/pr?sid=p3t&collection-tab-name=Pet+Foods' },
  { label: 'Proteins',      imgId: '6952c0c8364cba7b.jpg', href: '/health-care/health-supplements/protein-supplement/pr?sid=hlc' },
  { label: 'Vitamins',      imgId: '4dc15b5d2104d371.jpg', href: '/health-care/health-supplements/vitamin-supplement/pr?sid=hlc' },
  { label: 'Health drinks', imgId: '30f3021ffec251d2.jpg', href: '/health-care/health-supplements/milk-drink-mixes/pr?sid=hlc' },
  { label: 'Hydrate here',  imgId: '607dd4d471e3c1da.jpg', href: '/hlc/~cs-5933b29c/pr?sid=hlc&collection-tab-name=Hydration+Drinks' },
  { label: 'Med supplies',  imgId: '6e783c14c533d6c3.jpg', href: '/hlc/~cs-57yk8kq0ld/pr?sid=hlc&collection-tab-name=Medical+Supplies' },
  { label: 'Ayurveda',      imgId: 'ac198b2f284d6124.jpg', href: '/hlc/~cs-w51d7nzt1f/pr?sid=hlc&collection-tab-name=New+Goodness+of+Ayurveda' },
  { label: 'Household',     imgId: '0685d6cfe5c9cfc1.jpg', href: '/home-cleaning-bathroom-accessories/household-supplies/pr?sid=rja' },
];

/* ── Single chip ── */
const Chip = ({ label, imgId, href }) => (
  <a
    href={href}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 113,
      cursor: 'pointer',
      textDecoration: 'none',
      flexShrink: 0,
    }}
  >
    <div style={{
      display: 'flex',
      position: 'relative',
      width: 97,
      height: 97,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img
        src={img(imgId)}
        alt={label}
        width={97}
        height={97}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transition: 'opacity 0.5s ease-in-out',
          opacity: 1,
        }}
      />
    </div>
    <div style={{
      marginTop: 6,
      fontSize: 10,
      lineHeight: '14px',
      color: '#212121',
      textAlign: 'center',
      fontFamily: 'Inter, Arial, sans-serif',
    }}>
      {label}
    </div>
  </a>
);

/* ── Panel layout — white card, 2 rows ── */
const SubCategoryPanel = () => (
  <div style={{
    background: 'rgb(255,255,255)',
    padding: 10,
    marginTop: 0,
  }}>
    {/* Row 1 */}
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 8,
    }}>
      {ROW_1.map((item) => (
        <Chip key={item.label} {...item} />
      ))}
    </div>
    {/* Row 2 */}
    <div style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      {ROW_2.map((item) => (
        <Chip key={item.label} {...item} />
      ))}
    </div>
  </div>
);

export default SubCategoryPanel;
