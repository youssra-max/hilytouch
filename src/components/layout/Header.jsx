"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import './Header.css';

const CategoriesNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (pathname !== '/shop') return null;

  const activeFilter = searchParams.get('filter') || 'all';

  const setFilter = (filter) => {
    router.push(`/shop${filter === 'all' ? '' : `?filter=${filter}`}`);
  };

  return (
    <div className="container header-categories">
      <div className="filters">
        <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tous les produits</button>
        <button className={`filter-btn ${activeFilter === 'soins-visage' ? 'active' : ''}`} onClick={() => setFilter('soins-visage')}>Soins Visage</button>
        <button className={`filter-btn ${activeFilter === 'soins-corps' ? 'active' : ''}`} onClick={() => setFilter('soins-corps')}>Soins Corps</button>
        <button className={`filter-btn ${activeFilter === 'maquillage' ? 'active' : ''}`} onClick={() => setFilter('maquillage')}>Maquillage</button>
        <button className={`filter-btn ${activeFilter === 'nails' ? 'active' : ''}`} onClick={() => setFilter('nails')}>Nails</button>
        <button className={`filter-btn ${activeFilter === 'para-dose' ? 'active' : ''}`} onClick={() => setFilter('para-dose')}>Para Dose</button>
        <button className={`filter-btn ${activeFilter === 'soin-cheveux' ? 'active' : ''}`} onClick={() => setFilter('soin-cheveux')}>Soin Cheveux</button>
        <button className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>Nouveautés</button>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo">hilytouch</Link>
        <nav className="main-nav">
          <Link href="/" className="nav-link">Accueil</Link>
          <Link href="/shop" className="nav-link">Boutique</Link>
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
      <Suspense fallback={null}>
        <CategoriesNav />
      </Suspense>
    </header>
  );
};

export default Header;
