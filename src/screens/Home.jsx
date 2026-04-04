"use client";
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import heroDiagImg from '../assets/hero-diag.jpg';
import { fetchProducts } from '../lib/api';
import './Home.css';

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
      <section className="hero-diag">
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

      <div className="container">
        <hr className="layout-divider" />
      </div>

      {/* Section 2: Les Incontournables — fetched from API */}
      <section className="incontournables container">
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
      </section>

      {/* Section 3: Le Journal */}
      <section className="journal-section container">
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
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" alt="Naturel" />
            </div>
            <div className="journal-body">
              <span className="journal-date">20 MARS 2026</span>
              <h3>Pourquoi passer au bio est le meilleur cadeau pour votre peau</h3>
              <a href="/blog/bienfaits-bio" className="link-rose">Lire l'article <ArrowRight size={14} /></a>
            </div>
          </article>
        </div>
      </section>

      {/* Section Promotionnelle */}
      <section className="promo-image-section fade-in">
        <div className="promo-image-overlay">
          <h2>L'expérience <em>Hilytouch</em></h2>
          <p>Découvrez l'harmonie parfaite entre les trésors botaniques et la science cosmétique, pour révéler l'éclat authentique de votre peau.</p>
          <a href="/about" className="btn-outline-white">
            Découvrir notre histoire
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
