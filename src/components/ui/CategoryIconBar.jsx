import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryIconBar.css';
import { Leaf, Droplets, Sparkles } from 'lucide-react';

const CategoryIconBar = () => {
  return (
    <div className="category-icon-bar">
      <Link to="/shop" className="cat-icon-item">
        <div className="cat-icon-circle"><Leaf size={24} /></div>
        <span>Soins Visage</span>
      </Link>
      <Link to="/shop" className="cat-icon-item">
        <div className="cat-icon-circle"><Droplets size={24} /></div>
        <span>Soins Corps</span>
      </Link>
      <Link to="/shop" className="cat-icon-item">
        <div className="cat-icon-circle"><Sparkles size={24} /></div>
        <span>Maquillage</span>
      </Link>
    </div>
  );
};

export default CategoryIconBar;
