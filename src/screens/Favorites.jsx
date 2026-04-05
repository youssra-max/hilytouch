"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Loader } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { fetchWishlist, isAuthenticated } from '../lib/api';
import './Favorites.css';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/auth';
      return;
    }

    const loadFavorites = async () => {
      try {
        const data = await fetchWishlist();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="favorites-page container fade-in centered-loading">
        <Loader className="spinner" />
        <p>Chargement de vos favoris...</p>
      </div>
    );
  }

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
          {favorites.map(item => (
            <div key={item.id} className="favorite-item-wrapper">
               <ProductCard
                 id={item.product.id}
                 title={item.product.title}
                 category={item.product.category_title}
                 price={item.product.price}
                 image={item.product.image}
                 isNew={item.product.is_new}
                 initialIsFav={true}
               />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
