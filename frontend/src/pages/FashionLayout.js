import React, { useState, useEffect, useRef, useCallback } from 'react';
import './FashionLayout.css';

/* ─── All image banks extracted from index.html ─── */

// Section 1: Hero carousel – 1000×620
const HERO = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/1c825cdca6a2add7.jpg?q=90', link: '/mens-footwear/pr?sid=osp' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/86727ed6ba4ccd11.jpg?q=90', link: '/house-of-denim-store' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/3ee68dce4011b577.jpg?q=90', link: '/clothing-and-accessories/pr?sid=clo' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/60b0e0bd6e0f91ca.jpg?q=90', link: '/clothing-and-accessories/pr?sid=clo' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/a10fbe842e20b358.jpg?q=90', link: '/clothing-and-accessories/pr?sid=clo' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/399a9f30d492972b.jpg?q=90', link: '/mens-footwear/pr?sid=osp' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/04739e419e259e70.jpg?q=90', link: '/clothing-and-accessories/pr?sid=clo' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/620/image/3832eca1659b552b.png?q=90', link: '/back-to-school-26-at-store' },
];

// Alongside hero – deal card 881×548
const HERO_DEAL = { src: 'https://rukminim2.flixcart.com/fk-p-flap/881/548/image/a372a70dcd654032.jpg?q=20', link: '/offers-list/content' };

// Section 2: Quick links 196×196 (16 items)
const QUICK_LINKS = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/725d26912d3a0223.jpg?q=90', label: 'Wedding Store' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/dbdf7c69741298f3.jpg?q=90', label: 'Shirts, Tshirts' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/6175b41c1ac2fe2e.jpg?q=90', label: 'Jeans, Trousers' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/6bb55f92fefdcd83.jpg?q=90', label: 'Kurta, Sets' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/44f78488547ddcfa.jpg?q=90', label: 'Formal Wear' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/2deb0c044f895a10.jpg?q=90', label: 'Sunglasses' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/a3f7890a99b37464.jpg?q=90', label: 'Backpacks' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/004ca70ee5f96f45.jpg?q=90', label: "Kids' Clothing" },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/99ac556f9ddd0b72.jpg?q=90', label: 'Sneakers' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/9b5e46176598bd11.jpg?q=90', label: 'Drips for him' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/ff98823a76884400.jpg?q=90', label: 'Trunk, Vests' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/dd3d777569e34aa0.jpg?q=90', label: 'In Spotlight' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/bcb4284307e0cd77.jpg?q=90', label: 'Celeb Looks' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/f642e7b0ee13c886.jpg?q=90', label: 'Trends' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/7ea8024788235495.jpg?q=90', label: 'Sports Shoes' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/77429832a05061f6.jpg?q=90', label: 'Clogs' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/39db8f275341ad2c.jpg?q=90', label: 'Trolley Bags' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/b5efb839643cc25b.jpg?q=90', label: 'Watches' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/8fa263b6a2189021.jpg?q=90', label: 'Slippers' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/5dae6b5246a27091.jpg?q=90', label: 'Casual shoes' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/9046e2e917bc6a02.jpg?q=90', label: 'Jewellery' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/76122b6037405631.jpg?q=90', label: 'Kids Shoes' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/7d2fcc364faae80a.jpg?q=90', label: 'Sneakers' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/196/196/image/c6381e5c8a14485c.jpg?q=90', label: 'Focus Brands' },
];

// Section 3: Top 3 promo cards 220×230
const TOP3 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/1af5636faaafcfa1.jpg?q=90', link: '/ss-26-women-b-at-store' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/2392d60360955cc8.jpg?q=90', link: '/spoyl-fashion-for-him-store' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/230/image/6ab8be63241d392b.jpg?q=90', link: '/eidkids-at-store' },
];

// Section 4: Portrait 6-up grid 1020×1350 – first set (Men's Fashion Deals)
const PORTRAIT6_MEN = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/082c1d6a00407e04.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/b2e033cb5b02ad23.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/6871d015db6f11ee.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/27d63c31cd1fa0f3.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3b576ad56c675d48.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/5b443b73a7dc8cd7.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/9e32c6ce85689cba.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3b3002f4346972af.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/8567a69e1a7101de.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/8364bcde0ad70712.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/f4e1faae8ecaac67.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/878d80f8744ffd41.jpg?q=90' },
];

// Section 5: Full-width strip 1000×400
const STRIP1 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/400/image/dae5feb56e759072.png?q=90' };

// Section 6: Tall 1050×1580 grid
const TALL6 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/27d30a0f8e01e73e.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/b704273c758c5df3.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/7b5c3ccf2a5fa1fe.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/68f4a31b7b3aaa65.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/f42e7751e0e71ea1.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/25bf6477e9fb67fb.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/b202397af9ed0c1c.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/aded80f1449e16a6.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/d22fc05bddf7c0f6.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/c2d84ee8ac008f94.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/bb3b4695860ba597.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1050/1580/image/ab4119090570f3bc.jpg?q=90' },
];

// Thin strip 1000×220
const STRIP2 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/c01289cced45a3b2.jpg?q=90' };

// Women's fashion 1020×1350 – second set
const PORTRAIT6_WOMEN = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3259df9a4f8f8adb.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/9a2e17c513b3b826.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/2cb6f16fb4b916dc.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/22372af2fcf36ba2.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/233da949d729bdd9.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/62f5735cfb06805c.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/275929a79f3090b7.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/235833fa8bb02818.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/e4fa4e35f2dab32f.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/18e6513205e74e56.png?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/27fccee4a048a46b.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/843af1f241f4022f.png?q=90' },
];

// Jeans grid 1020×1350
const JEANS6 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/0513de2d2f12383c.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/788bc5fcb23e6112.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/94f8e0e95e1892f4.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/dbfb5b874cfbabcb.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/71c09cb6a36fe1da.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/ec8dcfb9cb247155.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3b1c72fb155df334.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/277b29dc7a89967f.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/890f4f4cfa375095.png?q=90' },
];

// Trends 1020×1340
const TRENDS6 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/819c9d67b61d282f.png?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/f11b759faa5ca8bf.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/9e71f3b41b99d063.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/56e880f62f7b75e5.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/6a4f950cdaa14962.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/2c3834f1a754d505.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/5933879c97f3928a.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/9a2d5f7fc61aeab9.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/8d1bedce1b0a7d4c.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/8502b3985e20c5e7.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1340/image/5e3a539d82d117c2.png?q=90' },
];

// 1020×1540 – product cards
const PRODUCT6 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/47823f658f5280b9.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/4d68f2710ca6c253.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/f78294dc8af98998.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/788bfcb9db241fa8.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/650ad7e9183c4e14.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/5bd22dbdc21e57ac.jpg?q=90' },
];

const STRIP3 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/945326193a834c19.jpg?q=90' };

// Second product set 1020×1350
const PRODUCT6B = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/13302f08befa1afd.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/d1bd4b2356918aeb.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3511a2a09f854038.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/7e159d07812d0546.png?q=90' },
];

const STRIP4 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/380ab02278171610.jpg?q=90' };

// 4-col 220×220 banners
const QUAD4 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/191ce500e5475980.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/48daec06c2ea504b.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/a3f2c4a802a18b56.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/220/image/5be13f3fbc48ef66.png?q=90' },
];

// 3-col tall 635×844
const TRIPLE3 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/220347b84d4a2b28.png?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/7cd6d63ca018fdc8.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/9c83699dff51f81c.png?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/36f634428837c2a8.png?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/f7dbce57472cf8a8.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/635/844/image/fdfba1eafb1e29a6.jpg?q=20' },
];

const STRIP5 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/448/164/image/c3336cf30f31dd74.jpg?q=90' };

// 2-col wide 1000×490
const DUO2 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/490/image/0e8e8290cb342e12.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/490/image/19a96c2ecb3538fa.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/490/image/4ff3c5e311f923a5.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/490/image/66dae8e086f874c8.jpg?q=90' },
];

const STRIP6 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/ec98a6eb223a305d.jpg?q=90' };

// 1020×1260 grid
const GRID8 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/4a0c7e6f9c6b7736.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/2d9d8c9fb492dd38.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/15bbbe684ae0c2a5.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/e0163ef246e375bc.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/ea6046c7828562bb.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/c44e76029b9b0a85.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/ac8e277f653c7994.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/c326981dfb651483.jpg?q=90' },
];

const SINGLE_WIDE = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/490/image/10a9f18929362299.jpg?q=90' };
const STRIP7 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/51c8381e3854b351.jpg?q=90' };

// Next 1020x1350 block
const FINAL6 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/973be4d6bcc6c190.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/291aafbf93d35d75.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/a73277ddaf13e3d6.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/b3b8d231816eea16.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/53c3c80bfd2e3659.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/e1fd10682c4736ec.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3f2e4a50c771b647.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/2e18c8a36f708040.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/5605c3e8aae8e774.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/58730a2e7a48134c.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/2b98ff650da61b9b.jpg?q=90' },
];

const STRIP8 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/330/image/4b95449aa1341d59.jpg?q=90' };

// 6-col 220×290 tiles
const SIX290 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/290/image/6f6410c6e0ae2893.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/290/image/6d5cb8a01956c2cd.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/290/image/1644755b58a5fa11.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/290/image/a2f503612eea2092.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/290/image/5d547580caf4d7be.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/220/290/image/4191b5ad75caa4e0.png?q=90' },
];

// Final 1020×1350 block
const LASTGRID = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/0427f50fa1fb742a.png?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/e9c3214311188927.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/75a2fb092c462140.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/24f0955c96b36a39.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/a1646f2abb377d9b.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/671bc961dfe11c9b.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/b22b9f55430a7fc4.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/8d2a484c926f4997.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/b1fd22f1b707c3fa.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/31d54f0ca5cfee0a.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/06e2c1571f169586.png?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/ddd34bc29fe356db.png?q=90' },
];

// Final product talls 1020×1540
const LASTPRODUCT = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/42f5898b9bea5ad1.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/becc07525fab779e.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/b817ae4ec6a70da6.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/308702a377ad6ad2.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/fd6da2509520f4d6.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/6508ff8cac2eb5ff.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/e19cd73f19928f00.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1540/image/0222f61352111b8f.jpg?q=90' },
];

const STRIP9 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/970/320/image/b9435a5c8b1dd035.png?q=90' };
const STRIP10 = { src: 'https://rukminim2.flixcart.com/fk-p-flap/1000/220/image/148a5716a5471c79.jpg?q=90' };

// Final 1020×1260
const FINALGRID2 = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/1b59ac7b969cb177.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/e4252e095c4493fd.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/4ed19cbd524b9228.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/b9471eeb8fd6ae2f.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/e68152dff4cf5557.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/01f07c2914727cfc.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/4a8520dafb1c440d.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/9a3ebe7a4b218f56.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1260/image/546335000ea44def.jpg?q=90' },
];

// 1020x1350 last
const VERYLAST = [
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/bb729903029e2458.jpg?q=20' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/3bd46b853151bc55.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/d1b0dff896a6a987.jpg?q=90' },
  { src: 'https://rukminim2.flixcart.com/fk-p-flap/1020/1350/image/6ca7e687c7f6abb9.jpg?q=90' },
];

/* ─── Carousel Component ─── */
const Carousel = ({ items, dealCard }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => { clearInterval(timerRef.current); timerRef.current = setInterval(next, 4000); };

  return (
    <div className="fk-carousel">
      <div className="fk-carousel-main">
        <div className="fk-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {items.map((item, i) => (
            <div className="fk-carousel-slide" key={i}>
              <a href={item.link || '#'}>
                <img src={item.src} alt={`Slide ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
              </a>
            </div>
          ))}
        </div>
        <button className="fk-carousel-btn fk-carousel-prev" onClick={() => { prev(); resetTimer(); }} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="fk-carousel-btn fk-carousel-next" onClick={() => { next(); resetTimer(); }} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="fk-carousel-dots">
          {items.map((_, i) => (
            <button key={i} className={`fk-carousel-dot${i === current ? ' active' : ''}`} onClick={() => { setCurrent(i); resetTimer(); }} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>
      {dealCard && (
        <div className="fk-carousel-deal">
          <a href={dealCard.link || '#'}>
            <img src={dealCard.src} alt="Deal" loading="lazy" />
          </a>
        </div>
      )}
    </div>
  );
};

/* ─── BannerImg – single clickable image with hover zoom ─── */
const Img = ({ src, link, alt = 'Fashion', eager = false }) => (
  <a href={link || '#'} className="fk-banner-link">
    <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} className="fk-banner-img" />
  </a>
);

/* ─── Grid Sections ─── */
const Grid = ({ items, cols, className = '' }) => (
  <div className={`fk-grid fk-grid-${cols} ${className}`}>
    {items.map((item, i) => (
      <div className="fk-grid-cell" key={i}>
        <Img src={item.src} link={item.link} />
      </div>
    ))}
  </div>
);

/* ─── Main FashionLayout ─── */
const FashionLayout = () => {
  return (
    <div className="fk-fashion-root">

      {/* SECTION 1: Hero Carousel + Deal Card */}
      <div className="fk-section">
        <Carousel items={HERO} dealCard={HERO_DEAL} />
      </div>

      {/* SECTION 2: Quick Link Pills 196×196 – 12 per row scrollable */}
      <div className="fk-section fk-section-white">
        <div className="fk-quicklinks">
          {QUICK_LINKS.map((item, i) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <div role="button" tabIndex={0} className="fk-quicklink" key={i} onClick={() => {}} onKeyPress={() => {}}>
              <div className="fk-quicklink-img">
                <img src={item.src} alt={item.label} loading="lazy" />
              </div>
              <span className="fk-quicklink-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: 3-Col Top Promo 220×230 */}
      <div className="fk-section fk-section-grey">
        <Grid items={TOP3} cols={3} />
      </div>

      {/* SECTION 4: 6-Col Portrait Grid – Men's Deals 1020×1350 */}
      <div className="fk-section fk-section-white">
        <Grid items={PORTRAIT6_MEN.slice(0, 6)} cols={6} />
        <Grid items={PORTRAIT6_MEN.slice(6, 12)} cols={6} />
      </div>

      {/* STRIP 1000×400 */}
      <div className="fk-section">
        <Img src={STRIP1.src} link="#" alt="Fashion Strip" eager />
      </div>

      {/* SECTION 5: Tall Portrait 1050×1580 – 6 per row */}
      <div className="fk-section fk-section-white">
        <Grid items={TALL6.slice(0, 6)} cols={6} />
        <Grid items={TALL6.slice(6, 12)} cols={6} />
      </div>

      {/* THIN STRIP 1000×220 */}
      <div className="fk-section">
        <Img src={STRIP2.src} link="#" alt="Fashion Banner" />
      </div>

      {/* SECTION 6: Women's Fashion 1020×1350 */}
      <div className="fk-section fk-section-white">
        <Grid items={PORTRAIT6_WOMEN.slice(0, 6)} cols={6} />
        <Grid items={PORTRAIT6_WOMEN.slice(6, 12)} cols={6} />
      </div>

      {/* SECTION 7: Jeans Grid */}
      <div className="fk-section fk-section-white">
        <Grid items={JEANS6.slice(0, 3)} cols={3} />
        <Grid items={JEANS6.slice(3, 6)} cols={3} />
        <Grid items={JEANS6.slice(6, 9)} cols={3} />
      </div>

      {/* SECTION 8: Trends 1020×1340 */}
      <div className="fk-section fk-section-white">
        <Grid items={TRENDS6.slice(0, 6)} cols={6} />
        <Grid items={TRENDS6.slice(6, 11)} cols={6} />
      </div>

      {/* SECTION 9: Product Cards 1020×1540 */}
      <div className="fk-section fk-section-white">
        <Grid items={PRODUCT6} cols={6} />
      </div>

      {/* STRIP */}
      <div className="fk-section">
        <Img src={STRIP3.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 10: 4-up 1020×1350 */}
      <div className="fk-section fk-section-white">
        <Grid items={PRODUCT6B} cols={4} />
      </div>

      {/* STRIP */}
      <div className="fk-section">
        <Img src={STRIP4.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 11: 4-col 220×220 squares */}
      <div className="fk-section fk-section-white">
        <Grid items={QUAD4} cols={4} />
      </div>

      {/* SECTION 12: 3-col tall 635×844 */}
      <div className="fk-section fk-section-grey">
        <Grid items={TRIPLE3.slice(0, 3)} cols={3} />
        <Grid items={TRIPLE3.slice(3, 6)} cols={3} />
      </div>

      {/* THIN STRIP ORANGE */}
      <div className="fk-section">
        <Img src={STRIP5.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 13: 2-col 1000×490 */}
      <div className="fk-section fk-section-white">
        <Grid items={DUO2.slice(0, 2)} cols={2} />
        <Grid items={DUO2.slice(2, 4)} cols={2} />
      </div>

      {/* STRIP */}
      <div className="fk-section">
        <Img src={STRIP6.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 14: 8-col 1020×1260 */}
      <div className="fk-section fk-section-white">
        <Grid items={GRID8.slice(0, 4)} cols={4} />
        <Grid items={GRID8.slice(4, 8)} cols={4} />
      </div>

      {/* SINGLE WIDE 1000×490 */}
      <div className="fk-section">
        <Img src={SINGLE_WIDE.src} link="#" alt="Fashion Banner" />
      </div>

      {/* STRIP */}
      <div className="fk-section">
        <Img src={STRIP7.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 15: 1020×1350 – 6-up*/}
      <div className="fk-section fk-section-white">
        <Grid items={FINAL6.slice(0, 6)} cols={6} />
        <Grid items={FINAL6.slice(6, 11)} cols={6} />
      </div>

      {/* STRIP 330 */}
      <div className="fk-section">
        <Img src={STRIP8.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 16: 6-col 220×290 */}
      <div className="fk-section fk-section-white">
        <Grid items={SIX290} cols={6} />
      </div>

      {/* SECTION 17: 12-col 1020×1350 */}
      <div className="fk-section fk-section-white">
        <Grid items={LASTGRID.slice(0, 6)} cols={6} />
        <Grid items={LASTGRID.slice(6, 12)} cols={6} />
      </div>

      {/* SECTION 18: 8-col 1020×1540 */}
      <div className="fk-section fk-section-white">
        <Grid items={LASTPRODUCT.slice(0, 6)} cols={6} />
        <Grid items={LASTPRODUCT.slice(6, 8)} cols={6} />
      </div>

      {/* STRIPS */}
      <div className="fk-section">
        <Img src={STRIP9.src} link="#" alt="Fashion Strip" />
      </div>
      <div className="fk-section">
        <Img src={STRIP10.src} link="#" alt="Fashion Strip" />
      </div>

      {/* SECTION 19: 9-col 1020×1260 */}
      <div className="fk-section fk-section-white">
        <Grid items={FINALGRID2.slice(0, 3)} cols={3} />
        <Grid items={FINALGRID2.slice(3, 6)} cols={3} />
        <Grid items={FINALGRID2.slice(6, 9)} cols={3} />
      </div>

      {/* SECTION 20: Final 4 1020×1350 */}
      <div className="fk-section fk-section-white">
        <Grid items={VERYLAST} cols={4} />
      </div>

    </div>
  );
};

export default FashionLayout;
