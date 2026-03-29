import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import './FilterSidebar.css';

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="filter-section">
      <button className="filter-section-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="filter-title">{title}</span>
        {isOpen ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
      </button>
      {isOpen && (
        <div className="filter-section-content fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const PriceRangeSlider = ({ min = 0, max = 150 }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(98);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };
  
  return (
    <div className="price-range-container">
      <div className="price-labels">
        <div className="price-label">
           <input type="text" value={`${minVal} €`} readOnly />
        </div>
        <div className="price-label">
           <input type="text" value={`${maxVal} €`} readOnly />
        </div>
      </div>
      <div className="price-slider-wrapper">
         <div className="price-slider-track"></div>
         <div 
           className="price-slider-fill" 
           style={{ left: `${(minVal / max) * 100}%`, right: `${100 - (maxVal / max) * 100}%` }}
         ></div>
         <input 
           type="range" 
           min={min} 
           max={max} 
           value={minVal} 
           onChange={handleMinChange}
           className="price-slider-input thumb-left"
         />
         <input 
           type="range" 
           min={min} 
           max={max} 
           value={maxVal} 
           onChange={handleMaxChange}
           className="price-slider-input thumb-right"
         />
      </div>
    </div>
  );
};

const FilterSidebar = ({ onClose, activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'soins-visage', label: 'Soins Visage' },
    { id: 'soins-corps', label: 'Soins Corps' },
    { id: 'maquillage', label: 'Maquillage' },
    { id: 'nails', label: 'Nails' },
    { id: 'para-dose', label: 'Para Dose' },
    { id: 'soin-cheveux', label: 'Soin Cheveux' }
  ];

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-top">
        <button className="btn-hide-filters" onClick={onClose}>
          MASQUER LES FILTRES <ChevronLeft size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div className="filter-sections">
        <FilterSection title="CATÉGORIE" defaultOpen={true}>
          <ul className="filter-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button 
                  className={`filter-item-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </FilterSection>

        <FilterSection title="PRIX">
          <PriceRangeSlider min={0} max={150} />
        </FilterSection>

        <FilterSection title="NOUVEAUTÉS & TENDANCES">
          <ul className="filter-list">
            <li><button className="filter-item-btn">Nouveautés (Produits Récents)</button></li>
            <li><button className="filter-item-btn">Bestsellers</button></li>
          </ul>
        </FilterSection>

        <FilterSection title="NOTES">
          <ul className="filter-list">
            <li><button className="filter-item-btn">★★★★★</button></li>
            <li><button className="filter-item-btn">★★★★☆ et plus</button></li>
          </ul>
        </FilterSection>

        <FilterSection title="TEINTES">
          <ul className="filter-color-list">
            <li><button className="color-swatch tooltip" style={{backgroundColor: '#e6c8b3'}} aria-label="Porcelaine"></button></li>
            <li><button className="color-swatch tooltip" style={{backgroundColor: '#d6a383'}} aria-label="Sable"></button></li>
            <li><button className="color-swatch tooltip" style={{backgroundColor: '#b97a57'}} aria-label="Doré"></button></li>
            <li><button className="color-swatch tooltip" style={{backgroundColor: '#86503c'}} aria-label="Caramel"></button></li>
            <li><button className="color-swatch tooltip" style={{backgroundColor: '#522b1c'}} aria-label="Cacao"></button></li>
          </ul>
        </FilterSection>
      </div>
    </aside>
  );
};

export default FilterSidebar;
