"use client";
import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/ui/CategoryCard';
import { fetchCategories } from '../lib/api';
import './CategoriesHub.css';

const CategoriesHub = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Layout mapping: first 3 = large, 4th = wide, 5th = small
  const getColClass = (index) => {
    if (index < 3) return 'hub-col-large';
    if (index === 3) return 'hub-col-wide';
    return 'hub-col-small';
  };

  return (
    <div className="categories-hub container fade-in">
      <div className="hub-header text-center">
        <p className="subtitle">L'ART DE LA BEAUTÉ</p>
        <h1 className="page-title">Nos Univers Beauté</h1>
        <p className="page-desc mx-auto">
          Découvrez une sélection rigoureuse de soins d'exception, alliant rituels ancestraux et innovation technologique pour magnifier votre éclat naturel.
        </p>
      </div>

      <div className="hub-grid">
        {loading ? (
          <p className="loading-text">Chargement des catégories...</p>
        ) : (
          categories.map((cat, index) => (
            <div key={cat.id} className={getColClass(index)}>
              <CategoryCard 
                title={cat.title} 
                subtitle={cat.subtitle}
                linkText={index === 3 ? 'EXPLORER LA COLLECTION' : undefined}
                image={cat.image}
                href={`/category/${cat.id}`}
              />
            </div>
          ))
        )}
      </div>

      <div className="secret-garden-banner">
        <div className="secret-garden-content">
          <h2>L'Inspiration Jardin Secret</h2>
          <p>Chaque produit de notre collection est une ode à la nature. Nous privilégions les extraits botaniques sourcés avec éthique pour créer une harmonie parfaite entre votre peau et l'environnement.</p>
          <button className="btn btn-primary" style={{marginTop: '1.5rem'}}>Lire l'histoire 📖</button>
        </div>
        <div className="secret-garden-images">
          <img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2074&auto=format&fit=crop" alt="Nature" className="sg-img-1" />
          <img src="https://images.unsplash.com/photo-1560706834-0d92e59265f9?q=80&w=1974&auto=format&fit=crop" alt="Fleur" className="sg-img-2" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesHub;
