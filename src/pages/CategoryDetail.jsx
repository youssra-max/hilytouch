import React from 'react';
import ProductCard from '../components/ui/ProductCard';
import './CategoryDetail.css';

const CategoryDetail = ({ title = "Maquillage", desc = "Une sélection premium de maquillage clean-beauty pour sublimer votre éclat naturel. Des formules pures, pigmentées et respectueuses." }) => {
  return (
    <div className="category-detail-page container fade-in">
      <div className="cat-header">
        <div className="breadcrumbs">Accueil &gt; Catégories &gt; {title}</div>
        <div className="cat-title-row">
          <h1 className="page-title">{title}<span className="dot">.</span></h1>
          <div className="cat-tags">
            <span className="tag">TEINT LUMINEUX</span>
            <span className="tag">LÈVRES VELOURS</span>
            <span className="tag">REGARD INTENSE</span>
          </div>
        </div>
        <p className="page-desc">{desc}</p>
      </div>

      <div className="cat-tabs">
        <button className="tab active">TOUT</button>
        <button className="tab">PALETTES</button>
        <button className="tab">LÈVRES</button>
        <button className="tab">TEINT</button>
        <button className="tab">YEUX</button>
      </div>

      <div className="product-grid">
        <ProductCard 
          title="Palette Regard Divin" category="Aura Luxe" price="85,00 €" 
          image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Rouge à Lèvres Velours" category="Pure Beauty" price="42,00 €" 
          image="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1996&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Fond de Teint Lumineux" category="Silk Skin" price="64,00 €" 
          image="https://images.unsplash.com/photo-1608223652646-64157d6faaf9?q=80&w=1974&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Illuminateur Soyeux" category="Glow Lab" price="55,00 €" 
          image="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1998&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Mascara Volume Noir" category="Éclat Noir" price="38,00 €" 
          image="https://images.unsplash.com/photo-1512496115851-a408e8cece11?q=80&w=1974&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Duo Blush Fraîcheur" category="Soft Glow" price="48,00 €" 
          image="https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2006&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Eyeliner Précision" category="Line & Define" price="32,00 €" 
          image="https://images.unsplash.com/photo-1629198725807-68b37ec841fb?q=80&w=1974&auto=format&fit=crop" 
        />
        <ProductCard 
          title="Brume Fixatrice Éclat" category="Fresh Skin" price="45,00 €" 
          image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop" 
        />
      </div>

      <div className="partners-banner">
        <div className="partners-header">
           <p className="subtitle">UNIVERS</p>
           <div className="partners-title-row">
             <h2>Nos Marques <span className="highlight-text">Partenaires</span></h2>
             <a href="#" className="view-all-partners">DÉCOUVRIR TOUTES LES MARQUES +</a>
           </div>
        </div>
        <div className="partners-logos">
           <div className="partner-logo">LUMIÈRE</div>
           <div className="partner-logo">ESSENCE</div>
           <div className="partner-logo">BOTANIC</div>
           <div className="partner-logo">PURE</div>
           <div className="partner-logo">FLORE</div>
           <div className="partner-logo">HILY</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
