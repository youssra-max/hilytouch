import React from 'react';
import CategoryCard from '../components/ui/CategoryCard';
import './CategoriesHub.css';

const CategoriesHub = () => {
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
        <div className="hub-col-large">
           <CategoryCard 
             title="Soins du Visage" 
             image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop" 
           />
        </div>
        <div className="hub-col-large">
           <CategoryCard 
             title="Maquillage" 
             image="https://images.unsplash.com/photo-1512496115851-a408e8cece11?q=80&w=1974&auto=format&fit=crop" 
           />
        </div>
        <div className="hub-col-large">
           <CategoryCard 
             title="Soins du Corps" 
             image="https://images.unsplash.com/photo-1615397323758-6da8b3d6a9a0?q=80&w=1964&auto=format&fit=crop" 
           />
        </div>
        <div className="hub-col-wide">
           <CategoryCard 
             title="Parfums d'Exception" 
             subtitle="Des essences rares capturées dans des flacons de haute parfumerie."
             linkText="EXPLORER LA COLLECTION"
             image="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop" 
           />
        </div>
        <div className="hub-col-small">
           <CategoryCard 
             title="Accessoires" 
             image="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2070&auto=format&fit=crop" 
           />
        </div>
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
