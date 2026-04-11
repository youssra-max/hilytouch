"use client";
import React from 'react';
import Link from 'next/link';
import { Heart, Check, ArrowLeftRight } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isAuthenticated } from '../../lib/api';
import './ProductCard.css';

const ProductCard = ({ id = 1, image, title, category, price, isNew, initialIsFav = false }) => {
  const [isFav, setIsFav] = React.useState(initialIsFav);
  const [loading, setLoading] = React.useState(false);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      window.location.href = '/auth';
      return;
    }

    setLoading(true);
    try {
      if (isFav) {
        await removeFromWishlist(id);
        setIsFav(false);
      } else {
        await addToWishlist(id);
        setIsFav(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card fade-in">
      <Link href={`/product/${id}`} className="product-card-link">
        <div className="product-image-container">
          {isNew && <span className="badge-new">Nouveau</span>}
          <img src={image} alt={title} className="product-image" />
          <div className="product-overlay">
            <div className="overlay-actions">
              <button className="btn-add-cart" onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation();
                // To be wired with cart later
              }}>Ajouter au panier</button>
              
              <button 
                className="btn-compare"
                title="Comparer ce produit"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = '/compare';
                }}
              >
                <ArrowLeftRight size={18} />
              </button>

              <button 
                className={`btn-fav ${isFav ? 'active' : ''}`} 
                onClick={toggleWishlist}
                disabled={loading}
                aria-label="Ajouter aux favoris"
                title="Ajouter aux favoris"
              >
                <Heart size={18} fill={isFav ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          {category && <p className="product-category">{category}</p>}
          <p className="product-price">{typeof price === 'number' ? `${price.toLocaleString()} DA` : price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
