"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import Button from '../components/ui/Button';
import { fetchProducts } from '../lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import './Shop.css';

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = searchParams ? (searchParams.get('filter') || 'all') : 'all';
  const activeSearch = searchParams ? searchParams.get('search') : null;
  const activeBrand = searchParams ? searchParams.get('brand') : null;
  const minPriceParam = searchParams ? searchParams.get('minPrice') : null;
  const maxPriceParam = searchParams ? searchParams.get('maxPrice') : null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortType, setSortType] = useState('popular');
  const [priceRange, setPriceRange] = useState([
    minPriceParam ? Number(minPriceParam) : 0, 
    maxPriceParam ? Number(maxPriceParam) : 50000
  ]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (cat === 'all') params.delete('filter');
    else params.set('filter', cat);
    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    const params = new URLSearchParams(searchParams?.toString());
    params.set('minPrice', range[0]);
    params.set('maxPrice', range[1]);
    router.push(`/shop?${params.toString()}`);
  };

  useEffect(() => {
    setLoading(true);
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    };
    if (activeFilter === 'new') {
      filters.isNew = true;
    } else if (activeFilter !== 'all') {
      filters.type = activeFilter;
    }
    if (activeSearch) {
      filters.search = activeSearch;
    }

    fetchProducts(filters)
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [activeFilter, activeSearch, priceRange]);

  let displayProducts = [...products];
  if (activeBrand) {
    displayProducts = displayProducts.filter(p => (p.brand || 'Autres') === activeBrand);
  }

  displayProducts.sort((a, b) => {
    if (sortType === 'price-asc') return a.price - b.price;
    if (sortType === 'price-desc') return b.price - a.price;
    if (sortType === 'new') return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
    return 0;
  });

  const groupedProducts = displayProducts.reduce((acc, product) => {
    const brand = product.brand || 'Autres';
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(product);
    return acc;
  }, {});

  return (
    <div className="shop-page container fade-in">
      <div className="shop-header">
        <h1 className="page-title">Boutique</h1>
        <p className="page-desc">
          Découvrez notre collection exclusive de soins algériens, formulés pour magnifier votre éclat.
        </p>
      </div>

      <div className="shop-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          {!isSidebarOpen && (
            <button className="btn-show-filters" onClick={() => setIsSidebarOpen(true)}>
              FILTRER ▾
            </button>
          )}
        </div>
        <div className="sort-by">
          <label htmlFor="sort-select">Trier par: </label>
          <select 
            id="sort-select" 
            value={sortType} 
            onChange={(e) => setSortType(e.target.value)}
            className="sort-select"
            style={{ padding: '0.5rem', border: '1px solid var(--color-gold)', borderRadius: '4px', background: 'transparent' }}
          >
            <option value="popular">Populaire</option>
            <option value="price-asc">Prix Croissant</option>
            <option value="price-desc">Prix Décroissant</option>
            <option value="new">Nouveautés</option>
          </select>
        </div>
      </div>

      <div className={`shop-content-wrapper ${!isSidebarOpen ? 'sidebar-closed' : ''}`} style={{ display: 'flex', gap: '3rem' }}>
        {isSidebarOpen && (
          <FilterSidebar 
            onClose={() => setIsSidebarOpen(false)} 
            activeCategory={activeFilter}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
          />
        )}

      <div className={activeBrand ? "shop-full-grid" : "shop-brands-container"} style={{ flex: 1 }}>
        {loading ? (
          <p className="loading-text">Chargement des produits...</p>
        ) : displayProducts.length === 0 ? (
          <p className="loading-text">Aucun produit trouvé.</p>
        ) : activeBrand ? (
          <div className="brand-detail-view">
             <div className="brand-detail-header">
               <button className="btn-back" onClick={() => {
                 const params = new URLSearchParams(searchParams?.toString());
                 params.delete('brand');
                 router.push(`/shop?${params.toString()}`);
               }}>← Retour aux marques</button>
               <h2 className="brand-title-large">{activeBrand}</h2>
               <p className="brand-subtitle">Découvrez toute la gamme disponible</p>
               <hr className="brand-divider mt-2" />
             </div>
             <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
               {displayProducts.map(prod => (
                  <ProductCard
                    key={prod.id}
                    id={prod.id}
                    title={prod.title}
                    category={prod.category}
                    price={prod.priceFormatted}
                    image={prod.image}
                    isNew={prod.isNew}
                  />
               ))}
             </div>
          </div>
        ) : (
          Object.keys(groupedProducts).sort().map(brandName => (
            <div key={brandName} className="brand-section" style={{ marginBottom: '4rem' }}>
              <div 
                className="brand-header clickable" 
                style={{ cursor: 'pointer', marginBottom: '1.5rem' }}
                onClick={() => {
                  const params = new URLSearchParams(searchParams?.toString());
                  params.set('brand', brandName);
                  router.push(`/shop?${params.toString()}`);
                }}
              >
                <h2 className="brand-title" style={{ fontSize: '1.8rem', fontStyle: 'italic', color: 'var(--color-gold)' }}>{brandName}</h2>
                <span className="brand-view-all" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Voir la gamme →</span>
                <hr className="brand-divider" style={{ border: 'none', borderTop: '1px solid rgba(176,141,87,0.2)', marginTop: '0.5rem' }} />
              </div>
              <div className="product-grid-single" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
                {groupedProducts[brandName].slice(0, 1).map(prod => (
                  <ProductCard
                    key={prod.id}
                    id={prod.id}
                    title={prod.title}
                    category={prod.category}
                    price={prod.priceFormatted}
                    image={prod.image}
                    isNew={prod.isNew}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      </div>

      <div className="newsletter-banner" style={{ marginTop: '6rem', padding: '4rem', background: 'rgba(176,141,87,0.1)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="newsletter-content">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Rejoignez le cercle</h2>
          <p>Inscrivez-vous pour recevoir nos conseils beauté et des offres exclusives.</p>
        </div>
        <div className="newsletter-form-inline" style={{ display: 'flex', gap: '1rem' }}>
          <input type="email" placeholder="Votre email" style={{ padding: '1rem', border: '1px solid var(--color-gold)', borderRadius: '4px', width: '300px' }} />
          <Button variant="primary">S'inscrire</Button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
