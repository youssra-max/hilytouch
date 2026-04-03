"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
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
        <button className={`filter-btn ${activeFilter === 'para-dose' ? 'active' : ''}`} onClick={() => setFilter('para-dose')}>bar à dose</button>
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
        <form className="search-bar" onSubmit={(e) => { e.preventDefault(); }}>
          <input 
            type="text" 
            placeholder="Rechercher un produit, une marque..." 
            className="search-input"
          />
          <button type="submit" className="search-btn"><Search size={18} /></button>
        </form>
        <div className="header-actions">
          <Link href="/partner" className="nav-action-btn">Devenir partenaire</Link>
          <Link href="/auth" className="nav-action-text with-icon">
            <User size={20} />
            <span>Se connecter</span>
          </Link>
          <button className="icon-btn"><Heart size={20} /></button>
          <Link href="/cart" className="icon-btn">
            <ShoppingBag size={20} />
            <span className="cart-badge">2</span>
          </Link>
        </div>
      </div>
      <Suspense fallback={null}>
        <CategoriesNav />
      </Suspense>
    </header>
  );
};

export default Header;
