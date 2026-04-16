# Flipkart Clone

A full-stack e-commerce application built with **React.js** for the frontend and **Node.js/Express** for the backend, mimicking Flipkart's core features and design patterns.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Database Setup](#database-setup)
9. [Contributing](#contributing)

---

## Project Overview

This Flipkart Clone is a modern e-commerce platform that replicates essential features of Flipkart, including:
- Product browsing and searching
- Detailed product information
- Shopping cart management
- Secure checkout process
- Order history tracking

The application follows best practices for frontend and backend development with clean code architecture and responsive design.

---

## Tech Stack

### Frontend
- **React.js** (v19.2.5) - UI Framework
- **React Router DOM** (v7.14.1) - Client-side routing
- **Axios** (v1.15.0) - HTTP client for API calls
- **React Icons** (v5.6.0) - Icon library
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v5.2.1) - Web framework
- **MySQL2** (v3.22.0) - Database driver
- **CORS** (v2.8.6) - Cross-origin resource sharing
- **dotenv** (v17.4.2) - Environment variable management

### Database
- **MySQL** - Relational database for products, orders, and cart data

---

## Project Structure

```
FlipKart-clone/
├── backend/
│   ├── index.js                 # Express server setup
│   ├── package.json             # Backend dependencies
│   ├── db/
│   │   ├── db.js               # Database connection
│   │   ├── init.sql            # Database schema
│   │   └── seed.js             # Sample data seeding
│   ├── models/
│   │   ├── productModel.js      # Product data operations
│   │   ├── cartModel.js         # Cart data operations
│   │   └── orderModel.js        # Order data operations
│   └── routes/
│       ├── products.js          # Product API endpoints
│       ├── cart.js              # Cart API endpoints
│       └── orders.js            # Order API endpoints
│
├── frontend/
│   ├── package.json             # Frontend dependencies
│   ├── public/
│   │   └── index.html           # Root HTML file
│   ├── src/
│   │   ├── App.js              # Main App component
│   │   ├── App.css             # App styles
│   │   ├── index.js            # React entry point
│   │   ├── index.css           # Global styles
│   │   ├── components/
│   │   │   ├── Navbar.js       # Navigation bar
│   │   │   ├── Footer.js       # Footer component
│   │   │   ├── ProductCard.js  # Product card display
│   │   │   ├── BannerCarousel.js # Image carousel
│   │   │   ├── DealsCarousel.js  # Deals section
│   │   │   ├── TopCategoryNav.js # Category navigation
│   │   │   └── SubCategoryPanel.js # Subcategory panel
│   │   ├── pages/
│   │   │   ├── Home.js         # Home page
│   │   │   ├── SearchPage.js   # Product search
│   │   │   ├── ProductDetail.js # Single product detail
│   │   │   ├── ProductDetailPro.js # Product details (enhanced)
│   │   │   ├── CategoryPage.js # Category filtering
│   │   │   ├── BeautyLayout.js # Beauty category page
│   │   │   ├── Cart.js         # Shopping cart page
│   │   │   ├── CartLayout.js   # Cart layout wrapper
│   │   │   ├── Checkout.js     # Order checkout page
│   │   │   └── OrderHistory.js # Order history page
│   │   ├── context/
│   │   │   └── CartContext.js  # Global cart state management
│   │   └── data/
│   │       ├── fashion_banners.json # Banner data
│   │       └── fashion_rows.json    # Category data
│   └── build/                  # Production build files
│
└── README.md                   # Project documentation
```

---

## Features

### 1. Product Listing Page
- Display products in a **grid layout** matching Flipkart's design
- Product cards replicate **Flipkart's card design** with:
  - Product image
  - Product name and description
  - Price display
  - Rating and reviews
  - Stock status
- **Search functionality** to find products by name
- **Filter products by category** (Mobiles, Fashion, Beauty, etc.)
- Responsive design for all screen sizes

### 2. Product Detail Page
- **Image carousel** displaying multiple product images
- Detailed **product description and specifications**
- **Price and stock availability** status
- Customer reviews and ratings
- **Add to Cart button** - adds product to shopping cart
- **Buy Now button** - directs to checkout with product
- Product comparison features
- Recommended products section

### 3. Shopping Cart
- **View all items** added to cart with detailed information
- **Update product quantity** - increase or decrease items
- **Remove items from cart** - delete unwanted products
- **Display cart summary** including:
  - Subtotal for each item
  - Total amount (without shipping/tax)
  - Product count
  - Estimated delivery information
- **Cart persistence** using Context API
- Continue shopping button to browse more products

### 4. Order Placement
- **Checkout page** with:
  - Shipping address form
  - Delivery method selection
  - Payment method selection
- **Order summary review** before placing order with:
  - Item-wise breakdown
  - Price details (subtotal, discount, tax)
  - Delivery charges
  - Final total amount
- **Place order functionality** - secure order submission
- **Order confirmation page** displaying:
  - Order ID
  - Expected delivery date
  - Order status
  - Confirmation email option
- **Order history page** - view all past orders with:
  - Order details
  - Order status tracking
  - Return/Cancel options
  - Reorder functionality

---

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) and **npm**
- **MySQL** database server
- **Git** (for cloning the repository)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=flipkart_clone
   ```

4. Initialize the database:
   - Create the MySQL database using `db/init.sql`
   - Run seed data using `db/seed.js` (optional)
   ```bash
   node db/seed.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (if needed):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

---

## Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## API Endpoints

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product by ID |
| GET | `/api/products?category=X` | Get products by category |
| GET | `/api/products?search=X` | Search products by name |

### Cart API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/cart` | Get all cart items |
| PUT | `/api/cart/update/:id` | Update cart item quantity |
| DELETE | `/api/cart/:id` | Remove item from cart |
| DELETE | `/api/cart` | Clear entire cart |

### Orders API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/place` | Place a new order |
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/:id` | Get specific order details |
| PUT | `/api/orders/:id/cancel` | Cancel an order |

---

## Database Setup

### Initialize Database

1. Open MySQL and run:
   ```sql
   CREATE DATABASE flipkart_clone;
   USE flipkart_clone;
   ```

2. Execute the schema from `db/init.sql`:
   ```bash
   mysql -u root -p flipkart_clone < backend/db/init.sql
   ```

3. (Optional) Seed sample data:
   ```bash
   node backend/db/seed.js
   ```

### Database Tables

- **products** - Store product details (name, price, description, images, category, stock)
- **cart** - Store cart items (user_id, product_id, quantity)
- **orders** - Store order information (order_id, user_id, total_price, status, order_date)
- **order_items** - Store items in each order (order_id, product_id, quantity, price)

---

## Key Components & Functionality

### Frontend Components

- **Navbar** - Navigation header with logo, search bar, and cart icon
- **ProductCard** - Reusable card component for displaying products
- **BannerCarousel** - Image slider for promotional banners
- **DealsCarousel** - Carousel for displaying special deals
- **TopCategoryNav** - Navigation for product categories
- **Footer** - Website footer with company information

### Context API

- **CartContext** - Global state management for shopping cart
  - Manage cart items
  - Persist cart data (localStorage)
  - Calculate total price and item count

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard for product management
- [ ] Email notifications for orders
- [ ] Real-time inventory updates
- [ ] Mobile app version
- [ ] Advanced analytics and reporting

---

**Happy Shopping! 🛍️**
