import React from 'react';
import './CategoryCard.css';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ image, title, subtitle, linkText = "DÉCOUVRIR" }) => {
  return (
    <div className="category-card fade-in">
      <img src={image} alt={title} className="category-image" />
      <div className="category-overlay">
        <div className="category-content">
          <h3 className="category-title">{title}</h3>
          {subtitle && <p className="category-subtitle">{subtitle}</p>}
          <span className="category-link">
            {linkText} <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
