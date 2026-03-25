import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">hilytouch</Link>
        <nav className="main-nav">
          <Link to="/shop" className="nav-link">Boutique</Link>
          <Link to="/categories" className="nav-link">Catégories</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><Heart size={20} /></button>
          <button className="icon-btn">
            <ShoppingBag size={20} />
            <span className="cart-badge">2</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
