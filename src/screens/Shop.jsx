"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import { fetchProducts } from '../lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import './Shop.css';

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams ? (searchParams.get('filter') || 'all') : 'all';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCategoryChange = (cat) => {
    router.push(`/shop${cat === 'all' ? '' : `?filter=${cat}`}`);
  };

  useEffect(() => {
    setLoading(true);
    const filters = {};
    if (activeFilter === 'new') {
      filters.isNew = true;
    } else if (activeFilter !== 'all') {
      filters.type = activeFilter;
    }

    fetchProducts(filters)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [activeFilter]);

  return (
    <div className="shop-page container fade-in">
      <div className="shop-header">
        <h1 className="page-title">Boutique</h1>
        <p className="page-desc">
          Découvrez notre collection exclusive de soins botaniques précieux, formulés avec conscience pour magnifier votre éclat naturel.
        </p>
      </div>

      <div className="shop-toolbar">
        <div>
          {!isSidebarOpen && (
            <button className="btn-show-filters" onClick={() => setIsSidebarOpen(true)}>
              FILTRER ▾
            </button>
          )}
        </div>
        <div className="sort-by">
          <span>Trier par: <strong>Populaire ▾</strong></span>
        </div>
      </div>

      <div className={`shop-content-wrapper ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        {isSidebarOpen && (
          <FilterSidebar 
            onClose={() => setIsSidebarOpen(false)} 
            activeCategory={activeFilter}
            onCategoryChange={handleCategoryChange}
          />
        )}

      <div className="product-grid">
        {loading ? (
          <p className="loading-text">Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p className="loading-text">Aucun produit trouvé.</p>
        ) : (
          products.map(prod => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              title={prod.title}
              category={prod.category}
              price={prod.priceFormatted}
              image={prod.image}
              isNew={prod.isNew}
            />
          ))
        )}
        </div>
      </div>

      <div className="newsletter-banner">
        <div className="newsletter-content">
          <h2>Rejoignez le cercle</h2>
          <p>Inscrivez-vous pour recevoir nos conseils beauté botaniques et des offres exclusives.</p>
        </div>
        <div className="newsletter-form-inline">
          <input type="email" placeholder="Votre email" />
          <button className="btn btn-primary">S'inscrire</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
