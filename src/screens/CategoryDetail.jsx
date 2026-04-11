"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../components/ui/ProductCard';
import { fetchCategory } from '../lib/api';
import './CategoryDetail.css';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('TOUT');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCategory(id)
      .then(data => {
        setCategory(data.category);
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="category-detail-page container fade-in"><p className="loading-text">Chargement...</p></div>;
  }

  if (!category) {
    return <div className="category-detail-page container fade-in"><p className="loading-text">Catégorie non trouvée.</p></div>;
  }

  return (
    <div className="category-detail-page container fade-in">
      <div className="cat-header">
        <div className="breadcrumbs">Accueil &gt; Catégories &gt; {category.title}</div>
        <div className="cat-title-row">
          <h1 className="page-title">{category.title}<span className="dot">.</span></h1>
        </div>
        <p className="page-desc">{category.description}</p>
      </div>

      <div className="cat-tabs">
        {['TOUT', ...(category.subcategories || [])].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p className="loading-text">Aucun produit dans cette catégorie.</p>
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

      <div className="partners-banner">
        <div className="partners-header">
          <p className="subtitle">UNIVERS</p>
          <div className="partners-title-row">
            <h2>Nos Marques <span className="highlight-text">Partenaires</span></h2>
            <a href="#" className="view-all-partners">DÉCOUVRIR TOUTES LES MARQUES +</a>
          </div>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {/* Set 1 */}
            <span className="partner-logo-marquee">LUMIÈRE</span>
            <span className="partner-logo-marquee">ESSENCE</span>
            <span className="partner-logo-marquee">DZBEAUTY</span>
            <span className="partner-logo-marquee">PURE</span>
            <span className="partner-logo-marquee">FLORE</span>
            <span className="partner-logo-marquee">HILY</span>
            <span className="partner-logo-marquee">SAHARA ROSE</span>
            {/* Set 2 */}
            <span className="partner-logo-marquee">LUMIÈRE</span>
            <span className="partner-logo-marquee">ESSENCE</span>
            <span className="partner-logo-marquee">DZBEAUTY</span>
            <span className="partner-logo-marquee">PURE</span>
            <span className="partner-logo-marquee">FLORE</span>
            <span className="partner-logo-marquee">HILY</span>
            <span className="partner-logo-marquee">SAHARA ROSE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
