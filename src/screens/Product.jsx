"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { Star, ShieldCheck, Leaf, Heart, Plus, Minus, ArrowRight } from 'lucide-react';
import { fetchProduct } from '../lib/api';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then(data => {
        setProduct(data.product);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <div className="product-detail-page container fade-in"><p className="loading-text">Chargement du produit...</p></div>;
  }

  if (!product) {
    return <div className="product-detail-page container fade-in"><p className="loading-text">Produit non trouvé.</p></div>;
  }

  return (
    <div className="product-detail-page container fade-in">
      <div className="breadcrumbs">
        <Link href="/">Accueil</Link> &gt; <Link href="/shop">Boutique</Link> &gt; <span>{product.title}</span>
      </div>

      <div className="product-main">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
             <img src={product.image} alt={product.title} className="main-image" />
          </div>
          <div className="thumbnails">
             <div className="thumbnail active"><img src={product.image} alt="thumb" /></div>
             <div className="thumbnail"><img src={product.image} alt="thumb" /></div>
             <div className="thumbnail"><img src={product.image} alt="thumb" /></div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info-panel">
          <div className="product-header-info">
            <p className="product-category-tag">{product.category}</p>
            <h1 className="product-title-large">{product.title}</h1>
            <div className="product-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star key={star} size={16} fill={star <= Math.floor(product.rating) ? "var(--color-accent)" : "transparent"} color="var(--color-accent)" />
                ))}
              </div>
              <span className="review-count">({product.reviews} avis)</span>
            </div>
            <p className="product-price-large">{product.priceFormatted}</p>
          </div>

          <p className="product-short-desc">{product.description}</p>

          <div className="product-perks">
            <div className="perk"><Leaf size={20} /> <p>100% Naturel</p></div>
            <div className="perk"><ShieldCheck size={20} /> <p>Testé dermatologiquement</p></div>
            <div className="perk"><Heart size={20} /> <p>Cruelty Free</p></div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={decreaseQty}><Minus size={16}/></button>
              <span>{quantity}</span>
              <button onClick={increaseQty}><Plus size={16}/></button>
            </div>
            <Button variant="primary" className="add-to-cart-btn-large">
              Ajouter au panier — {(product.price * quantity).toLocaleString('fr-DZ')} DA
            </Button>
          </div>

          <div className="product-accordion">
            <div className={`accordion-tab ${activeTab === 'description' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('description')}>Description</button>
              {activeTab === 'description' && (
                <div className="accordion-content">
                  <p>Ses bénéfices :</p>
                  <ul>
                    {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <div className={`accordion-tab ${activeTab === 'ingredients' ? 'active' : ''}`}>
               <button onClick={() => setActiveTab('ingredients')}>Ingrédients</button>
               {activeTab === 'ingredients' && (
                 <div className="accordion-content">
                   <p>{product.ingredients}</p>
                 </div>
               )}
            </div>
            <div className={`accordion-tab ${activeTab === 'usage' ? 'active' : ''}`}>
               <button onClick={() => setActiveTab('usage')}>Conseils d'utilisation</button>
               {activeTab === 'usage' && (
                 <div className="accordion-content">
                   <p>{product.usage}</p>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Related Products — from API */}
      <div className="related-products">
        <div className="related-header">
           <h2>Vous aimerez aussi</h2>
           <Link href="/shop" className="view-more-link">TOUT VOIR <ArrowRight size={16}/></Link>
        </div>
        <div className="related-grid">
           {related.map(r => (
             <div key={r.id} className="related-card-mock">
               <img src={r.image} alt={r.title}/>
               <p className="related-cat">{r.category}</p>
               <h4>{r.title}</h4>
               <p className="related-price">{r.priceFormatted}</p>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

export default Product;
