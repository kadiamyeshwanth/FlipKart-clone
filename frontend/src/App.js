import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CategoryPage from './pages/CategoryPage';
import BeautyLayout from './pages/BeautyLayout';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              <Route path="/"                      element={<Home />} />
              <Route path="/search"                element={<SearchPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/product/:id"            element={<ProductDetail />} />
              <Route path="/beauty"                  element={<BeautyLayout />} />
              <Route path="/beauty-and-grooming"     element={<BeautyLayout />} />
              <Route path="/wishlist"               element={<Wishlist />} />
              <Route path="/cart"                   element={<Cart />} />
              <Route path="/checkout"               element={<Checkout />} />
              <Route path="/account/orders"         element={<OrderHistory />} />
            </Routes>
            <MobileBottomNav />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
