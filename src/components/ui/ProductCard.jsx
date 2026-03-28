"use client";
import React from 'react';
import Link from 'next/link';
import './ProductCard.css';

const ProductCard = ({ id = 1, image, title, category, price, isNew }) => {
  return (
    <Link href={`/product/${id}`} className="product-card fade-in">
      <div className="product-image-container">
        {isNew && <span className="badge-new">Nouveau</span>}
        <img src={image} alt={title} className="product-image" />
        <div className="product-overlay">
          <button className="btn-add-cart" onClick={(e) => e.preventDefault()}>Ajouter au panier</button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        {category && <p className="product-category">{category}</p>}
        <p className="product-price">{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
