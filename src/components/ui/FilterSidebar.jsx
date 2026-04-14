import React, { useState, useEffect } from 'react';
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

const PriceRangeSlider = ({ min = 0, max = 50000, value, onChange }) => {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);

  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  }, [value]);

  const handleMinChange = (e) => {
    const v = Math.min(Number(e.target.value), maxVal - 100);
    setMinVal(v);
  };
  const handleMaxChange = (e) => {
    const v = Math.max(Number(e.target.value), minVal + 100);
    setMaxVal(v);
  };

  const triggerChange = () => {
    onChange([minVal, maxVal]);
  };

  return (
    <div className="price-range-container">
      <div className="price-labels">
        <div className="price-label">
          <input type="text" value={`${minVal.toLocaleString()} DA`} readOnly />
        </div>
        <div className="price-label">
          <input type="text" value={`${maxVal.toLocaleString()} DA`} readOnly />
        </div>
      </div>
      <div className="price-slider-wrapper">
        <div className="price-slider-track"></div>
        <div
          className="price-slider-fill"
          style={{ 
            left: `${(minVal / max) * 100}%`, 
            right: `${100 - (maxVal / max) * 100}%` 
          }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step="100"
          value={minVal}
          onChange={handleMinChange}
          onMouseUp={triggerChange}
          onTouchEnd={triggerChange}
          className="price-slider-input thumb-left"
        />
        <input
          type="range"
          min={min}
          max={max}
          step="100"
          value={maxVal}
          onChange={handleMaxChange}
          onMouseUp={triggerChange}
          onTouchEnd={triggerChange}
          className="price-slider-input thumb-right"
        />
      </div>
    </div>
  );
};

const FilterSidebar = ({ onClose, activeCategory, onCategoryChange, priceRange, onPriceChange }) => {
  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'soins-visage', label: 'Soins Visage' },
    { id: 'soins-corps', label: 'Soins Corps' },
    { id: 'maquillage', label: 'Maquillage' },
    { id: 'nails', label: 'Nails' },
    { id: 'para-dose', label: 'bar à dose' },
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

        <FilterSection title="PRIX" defaultOpen={true}>
          <PriceRangeSlider 
            min={0} 
            max={50000} 
            value={priceRange || [0, 50000]} 
            onChange={onPriceChange} 
          />
        </FilterSection>

        <FilterSection title="NOUVEAUTÉS & TENDANCES">
          <ul className="filter-list">
            <li><button className="filter-item-btn" onClick={() => onCategoryChange('new')}>Nouveautés</button></li>
          </ul>
        </FilterSection>


      </div>
    </aside>
  );
};

export default FilterSidebar;
