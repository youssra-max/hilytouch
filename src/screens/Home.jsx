"use client";
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import heroDiagImg from '../assets/hero-diag.jpg';
import { fetchProducts } from '../lib/api';
import './Home.css';

import BeautyBot from '../components/ui/BeautyBot';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ featured: true })
      .then(data => {
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page fade-in">

      {/* Section 1: Diagnostique Peau (Hero) */}
      <section className="framed-section-container hero-diag">
        <div className="container hero-diag-grid">
          <div className="hero-diag-text">
            <span className="label-rose">Nouveau</span>
            <h1>Diagnostique<br /><em>de peau</em></h1>
            <p>
              Découvrez votre type de peau grâce à notre intelligence artificielle.
              Une analyse précise pour une routine 100% personnalisée.
            </p>
            <div className="hero-diag-actions">
              <Button variant="primary">
                Commencer mon diagnostic <Sparkles size={16} />
              </Button>
              <a href="/shop" className="link-rose">
                Explorer la boutique <ArrowRight size={14} />
              </a>
            </div>
          </div>
          <div className="hero-diag-visual">
            <div className="diag-image-main">
              <img src={heroDiagImg.src || heroDiagImg} alt="Diagnostic beauté" />
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <BeautyBot />
      </div>

      <div className="container">
        <hr className="layout-divider" />
      </div>

      {/* Infinite Marquee Marques Partenaires */}
      <section className="framed-section-container partners-banner-home">
        <div className="container">
          <div className="partners-header">
            <p className="subtitle">L'ÉLITE LOCALE</p>
            <div className="partners-title-row">
              <h2>Nos Marques <span className="highlight-text">Partenaires</span></h2>
              <a href="/shop" className="view-all-partners">DÉCOUVRIR TOUTES LES MARQUES +</a>
            </div>
          </div>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {/* Set 1 */}
              <span className="partner-logo-marquee">LUMIÈRE</span>
              <span className="partner-logo-marquee">ESSENCE</span>
              <span className="partner-logo-marquee">DZBEAUTY</span>
              <span className="partner-logo-marquee">PURE</span>
              <span className="partner-logo-marquee">FLORE</span>
              <span className="partner-logo-marquee">HILY</span>
              <span className="partner-logo-marquee">SAHARA ROSE</span>
              {/* Set 2 (Duplicate for continuous scroll effect) */}
              <span className="partner-logo-marquee">LUMIÈRE</span>
              <span className="partner-logo-marquee">ESSENCE</span>
              <span className="partner-logo-marquee">DZBEAUTY</span>
              <span className="partner-logo-marquee">PURE</span>
              <span className="partner-logo-marquee">FLORE</span>
              <span className="partner-logo-marquee">HILY</span>
              <span className="partner-logo-marquee">SAHARA ROSE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Les Incontournables — fetched from API */}
      <section className="framed-section-container incontournables">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Les incontournables</h2>
              <p>La sélection plébiscitée par notre communauté.</p>
            </div>
            <a href="/shop" className="link-rose">Voir tout <ArrowRight size={14} /></a>
          </div>
          <div className="products-grid">
            {loading ? (
              <p className="loading-text">Chargement des produits...</p>
            ) : (
              featuredProducts.map(prod => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  title={prod.title}
                  category={prod.category}
                  price={prod.priceFormatted}
                  image={prod.image}
                  isNew={prod.isNew}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Le Journal */}
      <section className="framed-section-container journal-section">
        <div className="container">
          <div className="section-head centered">
            <h2>Le Journal</h2>
          </div>
          <div className="journal-grid">
            <article className="journal-card">
              <div className="journal-img">
                <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1974&auto=format&fit=crop" alt="Routine Matin" />
              </div>
              <div className="journal-body">
                <span className="journal-date">24 MARS 2026</span>
                <h3>Les 5 rituels pour un réveil lumineux</h3>
                <a href="/blog/rituels-matin" className="link-rose">Lire l'article <ArrowRight size={14} /></a>
              </div>
            </article>
            <article className="journal-card journal-card--accent">
              <div className="journal-img">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" alt="Maquillage" />
              </div>
              <div className="journal-body">
                <span className="journal-date">20 MARS 2026</span>
                <h3>Les tendances maquillage indispensables de cette saison</h3>
                <a href="/blog/tendances-maquillage" className="link-rose">Lire l'article <ArrowRight size={14} /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section Promotionnelle */}
      <section className="promo-image-section fade-in">
        <div className="promo-image-overlay">
          <h2>L'expérience <em>Hilytouch</em></h2>
          <p>Fondée par quatre cofondatrices passionnées, unies pour révéler l'excellence algérienne.</p>
          <a href="/about" className="btn-outline-white">
            Découvrir notre histoire
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
