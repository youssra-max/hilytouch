"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import './Favorites.css';

const MOCK_FAVORITES = [
  {
    id: 1,
    title: "Sérum Éclat Floral",
    category: "Soins Visage",
    price: "6 800 DA",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    isNew: true
  },
  {
    id: 3,
    title: "Huile de Nuit Précieuse",
    category: "Soins Visage",
    price: "7 800 DA",
    image: "https://images.unsplash.com/photo-1615397323214-bbd493e8202d?auto=format&fit=crop&q=80&w=800",
    isNew: false
  },
  {
    id: 4,
    title: "Palette Regard Divin",
    category: "Maquillage",
    price: "12 800 DA",
    image: "https://images.unsplash.com/photo-1512496115851-a1c8f13f56ce?auto=format&fit=crop&q=80&w=800",
    isNew: true
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  return (
    <div className="favorites-page container fade-in">
      <div className="favorites-header">
        <h1 className="title-large">Mes Favoris</h1>
        <p className="favorites-count">{favorites.length} article(s) sauvegardé(s)</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <Heart size={48} className="empty-icon" strokeWidth={1} />
          <p>Vous n'avez pas encore d'articles favoris.</p>
          <Link href="/shop">
            <Button variant="primary" className="mt-4">
              Explorer la boutique <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(product => (
            <div key={product.id} className="favorite-item-wrapper">
               <ProductCard
                 id={product.id}
                 title={product.title}
                 category={product.category}
                 price={product.price}
                 image={product.image}
                 isNew={product.isNew}
               />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
