import React, { useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import './Shop.css';

const PRODUCTS = [
  { id: 1, title: "Sérum Éclat Floral", category: "Soins Visage", price: "45,00 €", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop", type: "soins-visage", isNew: false },
  { id: 2, title: "Baume Botanique", category: "Soins Corps", price: "38,00 €", image: "https://images.unsplash.com/photo-1615397323758-6da8b3d6a9a0?q=80&w=1964&auto=format&fit=crop", type: "soins-corps", isNew: true },
  { id: 3, title: "Huile de Nuit Précieuse", category: "Soins Visage", price: "52,00 €", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1953&auto=format&fit=crop", type: "soins-visage", isNew: false },
  { id: 4, title: "Palette Regard Divin", category: "Maquillage", price: "85,00 €", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop", type: "maquillage", isNew: true },
  { id: 5, title: "Rouge à Lèvres Velours", category: "Maquillage", price: "42,00 €", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1996&auto=format&fit=crop", type: "maquillage", isNew: false },
  { id: 6, title: "Lait Nettoyant", category: "Soins Visage", price: "28,00 €", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1780&auto=format&fit=crop", type: "soins-visage", isNew: false },
  { id: 7, title: "Crème de Jour", category: "Soins Visage", price: "42,00 €", image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1974&auto=format&fit=crop", type: "soins-visage", isNew: true },
  { id: 8, title: "Gommage Végétal", category: "Soins Corps", price: "35,00 €", image: "https://images.unsplash.com/photo-1601049541289-9b1b72740441?q=80&w=1974&auto=format&fit=crop", type: "soins-corps", isNew: false }
];

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = PRODUCTS.filter(prod => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return prod.isNew;
    return prod.type === activeFilter;
  });

  return (
    <div className="shop-page container fade-in">
      <div className="shop-header">
        <h1 className="page-title">La Boutique</h1>
        <p className="page-desc">
          Découvrez notre collection exclusive de soins botaniques précieux, formulés avec conscience pour magnifier votre éclat naturel.
        </p>
      </div>

      <div className="shop-toolbar">
        <div className="filters">
          <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tous les produits</button>
          <button className={`filter-btn ${activeFilter === 'soins-visage' ? 'active' : ''}`} onClick={() => setActiveFilter('soins-visage')}>Soins Visage</button>
          <button className={`filter-btn ${activeFilter === 'soins-corps' ? 'active' : ''}`} onClick={() => setActiveFilter('soins-corps')}>Soins Corps</button>
          <button className={`filter-btn ${activeFilter === 'maquillage' ? 'active' : ''}`} onClick={() => setActiveFilter('maquillage')}>Maquillage</button>
          <button className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`} onClick={() => setActiveFilter('new')}>Nouveautés</button>
        </div>
        <div className="sort-by">
          <span>Trier par: <strong>Populaire ▾</strong></span>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(prod => (
          <ProductCard 
            key={prod.id}
            title={prod.title} 
            category={prod.category} 
            price={prod.price} 
            image={prod.image} 
            isNew={prod.isNew}
          />
        ))}
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
