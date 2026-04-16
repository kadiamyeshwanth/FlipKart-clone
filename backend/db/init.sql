-- ============================================
-- Flipkart Clone Database Schema
-- ============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  stock INT DEFAULT 100,
  description TEXT,
  rating DECIMAL(2, 1) DEFAULT 4.0,
  rating_count INT DEFAULT 100,
  brand VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address TEXT NOT NULL,
  city VARCHAR(100),
  pincode VARCHAR(10),
  phone VARCHAR(15),
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'COD',
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Clear existing products and re-seed
TRUNCATE TABLE order_items;
TRUNCATE TABLE cart_items;
DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

-- ============================================
-- PRODUCTS SEED DATA
-- ============================================
INSERT INTO products (name, price, original_price, category, image, stock, description, rating, rating_count, brand) VALUES

-- ══════════════════════ MOBILES ══════════════════════
('Samsung Galaxy S24 Ultra 5G (256GB, 12GB RAM)', 124999, 134999, 'Mobiles', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', 30, 'AI-powered Galaxy, 200MP camera, S-Pen included, titanium frame', 4.6, 8901, 'Samsung'),
('Apple iPhone 15 (128GB)', 69999, 79900, 'Mobiles', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 45, '48MP camera, Dynamic Island, A16 Bionic chip, USB-C', 4.7, 23456, 'Apple'),
('OnePlus 12 5G (256GB, 12GB RAM)', 64999, 69999, 'Mobiles', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', 60, '50MP Hasselblad camera, 100W SUPERVOOC charging, 5400mAh', 4.5, 7823, 'OnePlus'),
('Redmi Note 13 Pro+ 5G (256GB, 12GB RAM)', 29999, 36999, 'Mobiles', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 90, '200MP camera, 120W HyperCharge, Gorilla Glass Victus', 4.4, 12456, 'Redmi'),
('realme 12 Pro+ 5G (256GB, 8GB RAM)', 27999, 34999, 'Mobiles', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400', 75, '64MP periscope camera, 67W SUPERVOOC, 5000mAh battery', 4.3, 5678, 'realme'),
('vivo V30 5G (256GB, 8GB RAM)', 32999, 39999, 'Mobiles', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', 55, '50MP ZEISS optics, Aura Light Portrait, 5000mAh', 4.3, 4321, 'vivo'),
('POCO X6 Pro 5G (256GB, 12GB RAM)', 27999, 33999, 'Mobiles', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400', 80, 'Dimensity 8300-Ultra, 67W turbo charging, 144Hz AMOLED', 4.4, 9012, 'POCO'),
('Samsung Galaxy A55 5G (128GB, 8GB RAM)', 34999, 42999, 'Mobiles', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', 100, 'AMOLED display, 50MP OIS camera, IP67 rating, 5000mAh', 4.3, 6543, 'Samsung'),
('iQOO Z9 5G (128GB, 8GB RAM)', 18999, 23999, 'Mobiles', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400', 110, 'Snapdragon 7 Gen 3, 44W FlashCharge, 5000mAh battery', 4.2, 3456, 'iQOO'),
('Motorola Edge 50 Pro 5G (256GB, 12GB RAM)', 31999, 39999, 'Mobiles', 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=400', 65, '50MP Sony camera, 125W TurboPower, pOLED curved display', 4.3, 2890, 'Motorola'),
('Nothing Phone (2a) (128GB, 8GB RAM)', 23999, 27999, 'Mobiles', 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=400', 40, 'Glyph Interface, Dimensity 7200 Pro, 50MP dual camera', 4.4, 5100, 'Nothing'),
('Apple iPhone 15 Pro (256GB)', 119900, 134900, 'Mobiles', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', 20, 'A17 Pro chip, titanium design, 48MP main camera, Action Button', 4.8, 15234, 'Apple'),

-- ══════════════════════ ELECTRONICS ══════════════════════
('boAt Rockerz 450 Bluetooth Headphone', 999, 3990, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 300, '15hrs battery, 40mm drivers, foldable, deep bass, BT 5.0', 4.1, 89012, 'boAt'),
('Sony WH-1000XM5 Wireless Headphones', 24990, 34990, 'Electronics', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', 25, 'Industry-leading ANC, 30hr battery, multipoint connection', 4.7, 12345, 'Sony'),
('Apple AirPods Pro (2nd Gen)', 24900, 26900, 'Electronics', 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400', 35, 'Adaptive Transparency, H2 chip, 6hr battery, MagSafe', 4.6, 9876, 'Apple'),
('Canon EOS 1500D DSLR Camera Kit', 34990, 49990, 'Electronics', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', 15, '24.1MP, Full HD video, 18-55mm lens kit, Wi-Fi NFC', 4.5, 4567, 'Canon'),
('HP Pavilion 15 Laptop (Core i5, 16GB, 512GB SSD)', 55990, 72990, 'Electronics', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 20, 'Intel Core i5 12th Gen, Full HD IPS display, Windows 11', 4.3, 3456, 'HP'),
('Samsung 55" 4K Ultra HD Smart LED TV', 42990, 68900, 'Electronics', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400', 18, 'Crystal UHD, PurColor, HDR10+, Smart TV with Tizen OS', 4.4, 5678, 'Samsung'),
('Fire-Boltt Ninja Call Pro Plus Smartwatch', 1299, 7999, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 200, '1.83" display, Bluetooth calling, heart rate, SpO2, 100+ sports', 4.0, 56789, 'Fire-Boltt'),
('JBL Charge 5 Portable Bluetooth Speaker', 13999, 19999, 'Electronics', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', 40, 'IP67 waterproof, 20hr playtime, PartyBoost, power bank', 4.5, 7890, 'JBL'),
('Lenovo IdeaPad Slim 5 Laptop (Ryzen 5, 16GB, 512GB)', 52990, 65990, 'Electronics', 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400', 25, 'AMD Ryzen 5 7530U, 2.8K OLED display, 65W charging, 15.6"', 4.4, 2345, 'Lenovo'),
('Logitech MX Master 3S Wireless Mouse', 8995, 11995, 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 60, '8K DPI MagSpeed scroll, Quiet clicks, USB-C, Ergo design', 4.6, 4567, 'Logitech'),
('boAt Airdopes 141 True Wireless Earbuds', 999, 4990, 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', 500, '42hr playtime, IPX4, ENx tech, BEAST Mode, BT 5.3', 4.0, 234567, 'boAt'),
('Dell 27" IPS Full HD Monitor', 16490, 24990, 'Electronics', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 30, '27" FHD IPS, 75Hz, HDMI, AMD FreeSync, thin bezels', 4.3, 3456, 'Dell'),

-- ══════════════════════ FASHION ══════════════════════
('Allen Solly Men Slim Fit Shirt', 899, 2299, 'Fashion', 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400', 200, 'Cotton blend, spread collar, slim fit formal shirt', 4.2, 8901, 'Allen Solly'),
('Van Heusen Men Formal Trousers', 1199, 2999, 'Fashion', 'https://images.unsplash.com/photo-1594938298603-c8148c4b5f8a?w=400', 150, 'Regular fit, mid rise, pleated front, formal office wear', 4.1, 5678, 'Van Heusen'),
('Levis Men 511 Slim Fit Jeans', 1999, 3999, 'Fashion', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 300, 'Premium denim, slight stretch, zip fly, 5-pocket', 4.4, 23456, 'Levis'),
('H&M Men Oversized Fit T-Shirt', 499, 1099, 'Fashion', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', 500, 'Jersey fabric, dropped shoulders, round neck, printed', 4.1, 34567, 'H&M'),
('Puma Men Running Shoes', 2499, 5499, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 150, 'Lightweight mesh upper, NITRO foam sole, breathable', 4.3, 12345, 'Puma'),
('Biba Women Anarkali Kurta', 1299, 3499, 'Fashion', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', 200, 'Georgette fabric, flared silhouette, mirror work, ethnic', 4.4, 9012, 'BIBA'),
('W Women Floral Straight Kurta', 799, 1999, 'Fashion', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', 250, 'Cotton blend, printed, straight fit, 3/4 sleeves', 4.2, 15678, 'W'),
('Roadster Men Hoodie', 1199, 2999, 'Fashion', 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400', 180, 'Fleece inner, printed, kangaroo pocket, drawstring hood', 4.3, 18901, 'Roadster'),
('Nike Air Force 1 Sneakers', 7495, 9995, 'Fashion', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400', 80, 'Leather upper, Air-sole unit, perforations for breathability', 4.5, 34567, 'Nike'),
('Mast & Harbour Women Flare Dress', 1399, 3299, 'Fashion', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 120, 'Woven fabric, floral print, flared hem, casual daily wear', 4.2, 7890, 'Mast & Harbour'),
('United Colors of Benetton Polo T-Shirt', 699, 1799, 'Fashion', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', 250, 'Pique cotton, ribbed collar, slim fit, chest logo', 4.2, 10234, 'UCB'),
('Fastrack Analog Watch Men', 1295, 2495, 'Fashion', 'https://images.unsplash.com/photo-1549482199-bc1ca6f58502?w=400', 100, 'Stainless steel case, leather strap, water resistant 30m', 4.3, 8765, 'Fastrack'),
('Wildcraft Backpack 45L', 1799, 3999, 'Fashion', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 90, 'Water resistant, padded straps, laptop sleeve, trekking', 4.3, 12345, 'Wildcraft'),
('Adidas Men Trackpants', 1499, 2999, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 200, 'Tricot fabric, 3-stripe design, elastic waistband, regular fit', 4.2, 9876, 'Adidas'),
('Peter England Men Formal Shirt', 799, 1999, 'Fashion', 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400', 180, 'Cotton, regular fit, spread collar, full sleeves, formal', 4.1, 13456, 'Peter England'),
('Cantabil Men Blazer', 2499, 6999, 'Fashion', 'https://images.unsplash.com/photo-1594938298603-c8148c4b5f8a?w=400', 60, 'Polyester blend, single button, slim fit, party wear', 4.0, 3456, 'Cantabil'),
('HRX Sport Women Track Pants', 699, 1799, 'Fashion', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', 220, 'Quick dry fabric, elastic waist, slim fit, team sport', 4.2, 7890, 'HRX'),
('Skechers Women Memory Foam Sneakers', 3299, 5999, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 90, 'Memory foam insole, air cooled design, lightweight', 4.4, 11234, 'Skechers'),
('Flying Machine Slim Fit Jeans', 1299, 2999, 'Fashion', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 170, 'Stretch denim, skinny fit, light wash, ankle length', 4.2, 8901, 'Flying Machine'),
('Tommy Hilfiger Men Polo T-Shirt', 2199, 3999, 'Fashion', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', 70, 'Pique cotton, flag emblem, three-button placket, slim fit', 4.5, 5678, 'Tommy Hilfiger'),
('Caprese Women Handbag', 1899, 4499, 'Fashion', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 55, 'PU leather, structured satchel, magnetic snap, branded', 4.3, 6789, 'Caprese'),
('Puma Women Sports Bra', 699, 1499, 'Fashion', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', 200, 'High support, mesh back panel, flat lock seams, reflective logo', 4.1, 4567, 'Puma'),

-- ══════════════════════ BEAUTY ══════════════════════
('Lakme 9to5 Primer + Matte Lipstick Set', 599, 1199, 'Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 300, 'Covers blemishes, all-day matte finish, SPF 20 protection', 4.2, 34567, 'Lakme'),
('Mamaearth Vitamin C Face Serum 30ml', 549, 799, 'Beauty', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', 250, 'Brightening, fades dark spots, lightweight, dermatologically tested', 4.3, 45678, 'Mamaearth'),
('WOW Skin Science Retinol Face Cream', 499, 999, 'Beauty', 'https://images.unsplash.com/photo-1556228578-dd539282b964?w=400', 200, 'Anti-aging, reduces fine lines and wrinkles, 50ml', 4.1, 23456, 'WOW'),
('Biotique Bio Papaya Face Wash 150ml', 149, 299, 'Beauty', 'https://images.unsplash.com/photo-1556228578-dd539282b964?w=400', 400, 'Exfoliating papaya enzymes, brightening, deep cleansing', 4.0, 56789, 'Biotique'),
('Maybelline Fit Me Matte Foundation', 349, 699, 'Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 280, 'Natural matte finish, breathable formula, 24hr coverage', 4.2, 78901, 'Maybelline'),
('L-Oreal Paris Elvive Shampoo 1L', 499, 799, 'Beauty', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', 220, 'Extraordinary oil, strengthening, anti-breakage formula', 4.3, 34567, 'L-Oreal'),
('Forest Essentials Soundarya Face Cream', 2250, 2500, 'Beauty', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', 60, 'Ayurvedic, 24K gold, anti-aging, SPF 25, 50g', 4.5, 5678, 'Forest Essentials'),
('Plum Green Tea Pore Cleansing Face Wash', 249, 425, 'Beauty', 'https://images.unsplash.com/photo-1556228578-dd539282b964?w=400', 300, 'Vegan, paraben free, salicylic acid, acne control', 4.2, 23456, 'Plum'),
('Fiama Men Shower Gel Pack', 299, 499, 'Beauty', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 350, 'Refreshing gel crème, 3-in-1, sport & cool, 500ml', 4.1, 12345, 'Fiama'),
('Beardo Beard Growth Oil 30ml', 349, 699, 'Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 200, 'Promotes growth, reduces patchiness, 10 natural oils blend', 4.0, 18901, 'Beardo'),
('Dove Body Lotion 400ml', 249, 399, 'Beauty', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', 400, '1/4 moisturising cream, 48hr skin care, for dry skin', 4.4, 67890, 'Dove'),
('Nykaa Cosmetics Wanderlust Body Mist 150ml', 349, 599, 'Beauty', 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400', 180, 'Long-lasting fragrance, travel-friendly, multiple variants', 4.2, 8901, 'Nykaa'),
('Good Vibes Aloe Vera Gel 200ml', 149, 249, 'Beauty', 'https://images.unsplash.com/photo-1556228578-dd539282b964?w=400', 500, '99% pure aloe, soothes sunburn, hydrates, multipurpose', 4.3, 45678, 'Good Vibes'),
('Neutrogena Hydro Boost Water Gel 50g', 799, 1299, 'Beauty', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', 150, 'Hyaluronic acid, oil-free, non-comedogenic, fragrance-free', 4.4, 12345, 'Neutrogena'),

-- ══════════════════════ APPLIANCES ══════════════════════
('LG 1.5 Ton 5 Star Inverter Split AC', 34990, 52990, 'Appliances', 'https://images.unsplash.com/photo-1631567091747-acf6e60c0b42?w=400', 12, 'Dual Inverter, HEPA filter, Wi-Fi enabled, auto clean', 4.5, 12345, 'LG'),
('Samsung 253L Frost Free Refrigerator', 22990, 35990, 'Appliances', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400', 10, 'Digital Inverter, All-Around Cooling, 5-in-1 convertible', 4.4, 8901, 'Samsung'),
('IFB 7kg Fully Automatic Front Load Washing Machine', 28990, 42990, 'Appliances', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 15, 'Steam wash, 3D wash system, inbuilt heater, child lock', 4.5, 7890, 'IFB'),
('Prestige 5L Pressure Cooker Aluminium', 799, 1499, 'Appliances', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 200, 'Induction compatible, safety valve, 5 litre capacity', 4.3, 34567, 'Prestige'),
('Philips 750W Mixer Grinder 3 Jars', 2799, 4999, 'Appliances', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 80, '750W motor, 3 jars, turbo speed, 2yr warranty', 4.4, 23456, 'Philips'),
('Havells Centia 48" Ceiling Fan', 1699, 2999, 'Appliances', 'https://images.unsplash.com/photo-1631567091747-acf6e60c0b42?w=400', 90, 'BLDC motor, 5 star rated, 3 speed settings, remote control option', 4.3, 12345, 'Havells'),
('Bajaj 2000W Room Heater', 1699, 3499, 'Appliances', 'https://images.unsplash.com/photo-1631567091747-acf6e60c0b42?w=400', 70, 'Halogen heater, 2 heat settings, overheat protection, 2yr warranty', 4.2, 9012, 'Bajaj'),
('Sony Bravia 55" 4K OLED Smart TV', 109990, 149990, 'Appliances', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400', 8, 'OLED panel, XR processor, Dolby Atmos, Google TV, 120Hz', 4.7, 4567, 'Sony'),
('Whirlpool 340L Frost Free Refrigerator', 29990, 44990, 'Appliances', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400', 12, '6th sense intellifresh, multi air flow, 3D cool, auto connect', 4.4, 6789, 'Whirlpool'),
('Bosch 8kg Front Load Washing Machine', 39990, 58990, 'Appliances', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 10, 'EcoSilence motor, ActiveWater Plus, Anti Vibration design, i-DOS', 4.6, 3456, 'Bosch'),
('Voltas 1.5 Ton 3 Star Window AC', 29990, 42990, 'Appliances', 'https://images.unsplash.com/photo-1631567091747-acf6e60c0b42?w=400', 18, '100% copper coil, anti-bacterial filter, auto restart, sleep mode', 4.2, 8901, 'Voltas'),
('Eureka Forbes Aquasure RO Water Purifier', 8999, 14999, 'Appliances', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 30, '7-stage purification, 8L storage, RO+UV+UF, auto shut off', 4.3, 12345, 'Eureka Forbes'),

-- ══════════════════════ FURNITURE ══════════════════════
('Wakefit Orthopaedic Memory Foam Mattress Queen', 12999, 22999, 'Furniture', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 20, '7.5 inch, 3 layered orthopedic foam, 100-night trial, 10yr warranty', 4.5, 23456, 'Wakefit'),
('Nilkamal Heavy Duty Plastic Chair', 999, 1699, 'Furniture', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 150, 'Stackable, UV resistant, 150kg capacity, outdoor/indoor', 4.1, 34567, 'Nilkamal'),
('Hometown Engineered Wood Study Table', 5999, 11999, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 25, 'Storage drawer, cable management, particle board, walnut finish', 4.2, 8901, 'Hometown'),
('Pepperfry Fabric 3-Seater Sofa', 19999, 38999, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 8, 'Premium fabric, solid wood legs, pocket spring cushions, 3-seater', 4.4, 5678, 'Pepperfry'),
('IKEA KALLAX Shelf Unit', 7999, 9999, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 30, '4 cubes, particle board, 77x77cm, white, easy assembly', 4.3, 12345, 'IKEA'),
('Durian King Size Bed with Storage', 24999, 45999, 'Furniture', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 10, 'Engineered wood, hydraulic storage, 6x6.5ft, walnut finish', 4.5, 3456, 'Durian'),
('UrbanLadder Engineered Wood Wardrobe 3 Door', 17999, 32999, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 12, '3 doors, 4 shelves, hanging rod, 2 drawers, mirror optional', 4.4, 7890, 'UrbanLadder'),
('Godrej Interio Office Chair', 8999, 16999, 'Furniture', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 35, 'Lumbar support, breathable mesh, armrests, height adjustable', 4.3, 9012, 'Godrej'),
('Sleepwell Latex Foam Pillow', 799, 1499, 'Furniture', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 100, 'Natural latex, hypoallergenic, anti-microbial, neck support', 4.2, 15678, 'Sleepwell'),
('Hettich Kitchen Drawer Channel Set', 1299, 2499, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 60, 'Soft close, full extension, 45kg load capacity, corrosion resistant', 4.4, 4567, 'Hettich'),
('SmartGraft 6-Seater Dining Table Set', 14999, 27999, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 8, 'Solid sheesham wood, 6 cushioned chairs, natural finish', 4.5, 3456, 'SmartGraft'),
('Solimo TV Unit Entertainment Cabinet', 4499, 8999, 'Furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 40, 'Engineered wood, cable management, 2 doors, 1 open shelf', 4.2, 8901, 'Solimo'),

-- ══════════════════════ GROCERY ══════════════════════
('Organic India Whole Wheat Flour Atta 5kg', 299, 380, 'Grocery', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', 500, 'Certified organic, stone ground, high fiber, no preservatives', 4.4, 45678, 'Organic India'),
('Tata Tea Gold 500g', 220, 275, 'Grocery', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 600, 'Premium Assam + Darjeeling blend, aromatic, fresh garden taste', 4.5, 89012, 'Tata Tea'),
('Nestle KitKat Chocolate 50g Pack of 10', 450, 500, 'Grocery', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', 300, 'Crispy wafer, milk chocolate, perfect break time snack', 4.4, 34567, 'Nestle'),
('Amul Gold Full Cream Milk 1L Tetra Pack', 76, 82, 'Grocery', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', 1000, 'Fresh pasteurized, full cream, 6% fat, long shelf life', 4.6, 123456, 'Amul'),
('Fortune Sunflower Oil 2L', 279, 340, 'Grocery', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 400, 'Refined, high smoke point, light texture, rich in Vitamin E', 4.3, 56789, 'Fortune'),
('Haldirams Bhujia Sev 400g', 135, 165, 'Grocery', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', 300, 'Classic namkeen snack, crispy, spicy, traditional recipe', 4.5, 67890, 'Haldirams'),
('Britannia 5050 Biscuits 800g', 99, 130, 'Grocery', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', 500, 'Sweet and salty, crunchy, family pack, perfect tea snack', 4.4, 89012, 'Britannia'),
('Saffola Active Refined Oil 5L', 799, 999, 'Grocery', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 200, 'Rice bran + soy blend, LOSORB tech, heart healthy choice', 4.3, 34567, 'Saffola'),
('MTR Ready to Eat Palak Paneer 300g', 99, 135, 'Grocery', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', 400, 'Restaurant-style taste, no preservatives, heat & serve in 2 min', 4.2, 23456, 'MTR'),
('Quaker Oats 1kg', 199, 270, 'Grocery', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', 350, 'Whole grain, high fibre, helps reduce cholesterol, zero sugar', 4.5, 45678, 'Quaker'),
('Real Fruit Power Orange Juice 1L', 89, 115, 'Grocery', 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=400', 400, '100% natural fruit juice, no added sugar/preservatives, Vitamin C', 4.3, 67890, 'Real'),
('Maggi 2-Minute Noodles 12 pack', 168, 204, 'Grocery', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 600, 'Classic masala flavour, quick cook, family pack of 12', 4.5, 234567, 'Maggi'),
('Kohinoor Basmati Rice 5kg', 499, 650, 'Grocery', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', 250, 'Aged extra long grain, aromatic, non-sticky on cooking', 4.6, 45678, 'Kohinoor'),
('Tropicana 100% Orange Juice 1L', 130, 160, 'Grocery', 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=400', 350, 'Not from concentrate, rich in Vitamin C, no added sugar', 4.4, 56789, 'Tropicana');
