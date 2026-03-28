"use client";
import React from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo">hilytouch</Link>
        <nav className="main-nav">
          <Link href="/shop" className="nav-link">Boutique</Link>
          <Link href="/categories" className="nav-link">Catégories</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
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
