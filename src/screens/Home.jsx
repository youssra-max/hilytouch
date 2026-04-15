"use client";
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import heroDiagImg from '../assets/hero-diag.jpg';
import triptyque1 from '../assets/triptych-1.png';
import triptyque2 from '../assets/triptych-2.png';
import { fetchProducts } from '../lib/api';
import './Home.css';

import { useLanguage } from '../context/LanguageContext';
import BeautyBot from '../components/ui/BeautyBot';

const Home = () => {
  const { t } = useLanguage();
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
            <span className="label-rose">{t('hero_label')}</span>
            <h1>{t('hero_title_1')}<br /><em>{t('hero_title_2')}</em></h1>
            <p>
              {t('hero_desc')}
            </p>
            <div className="hero-diag-actions">
              <Button variant="primary">
                {t('hero_cta')} <Sparkles size={16} />
              </Button>
              <a href="/shop" className="link-rose">
                {t('hero_shop_cta')} <ArrowRight size={14} />
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
      
      {/* Section : Tryptique Visuel (Framed) */}
      <section className="framed-section-container triptych-home-wrapper fade-in">
        <div className="container">
          <div className="triptych-grid-refined">
            <div className="triptych-card vibrant">
              <img src={triptyque1.src || triptyque1} alt={t('triptych_essential')} className="triptych-img" />
              <div className="card-overlay">
                <span>{t('triptych_essential')}</span>
              </div>
            </div>
            <div className="triptych-card minimalist">
              <img src={triptyque2.src || triptyque2} alt={t('triptych_essence')} className="triptych-img" />
              <div className="card-overlay">
                <span>{t('triptych_essence')}</span>
              </div>
            </div>
            <div className="triptych-card lifestyle-reel">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="triptych-video"
                poster={triptyque2.src}
              >
                <source src="https://player.vimeo.com/external/517088497.hd.mp4?s=d405232d3265efc27242cedb6d3b41d2f8e1a1b1&profile_id=174" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              <div className="reel-tag">Reel</div>
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
            <p className="subtitle">{t('partners_subtitle')}</p>
            <div className="partners-title-row">
              <h2>{t('partners_title')} <span className="highlight-text">{t('partners_highlight')}</span></h2>
              <a href="/shop" className="view-all-partners">{t('partners_view_all')}</a>
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
              <h2>{t('featured_title')}</h2>
              <p>{t('featured_desc')}</p>
            </div>
            <a href="/shop" className="link-rose">{t('featured_view_all')} <ArrowRight size={14} /></a>
          </div>
          <div className="products-grid">
            {loading ? (
              <p className="loading-text">{t('loading')}</p>
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
            <h2>{t('journal_title')}</h2>
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
          <h2>{t('promo_title')} <em>{t('promo_highlight')}</em></h2>
          <p>{t('promo_desc')}</p>
          <a href="/about" className="btn-outline-white">
            {t('promo_cta')}
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
