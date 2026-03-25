import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import heroDiagImg from '../assets/hero-diag.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page fade-in">

      {/* Section 1: Diagnostique Peau (Hero — wireframe box 1) */}
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
              <img src={heroDiagImg} alt="Diagnostic beauté" />
            </div>
            <div className="diag-card-float">
              <Star size={14} fill="currentColor" />
              <span>10k+ diagnostics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Les Incontournables (wireframe box 2) */}
      <section className="incontournables container">
        <div className="section-head">
          <div>
            <h2>Les incontournables</h2>
            <p>La sélection plébiscitée par notre communauté.</p>
          </div>
          <a href="/shop" className="link-rose">Voir tout <ArrowRight size={14} /></a>
        </div>
        <div className="products-grid">
          <ProductCard title="Huile Botanique Éclat" category="Sérum" price="45,00 €" image="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1974&auto=format&fit=crop" />
          <ProductCard title="Crème de Nuit Régénérante" category="Hydratation" price="52,00 €" image="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop" />
          <ProductCard title="Baume Lèvres Rose Pur" category="Soin Lèvres" price="18,00 €" image="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1996&auto=format&fit=crop" />
          <ProductCard title="Masque Argile Douce" category="Nettoyant" price="32,00 €" image="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1976&auto=format&fit=crop" isNew={true} />
        </div>
      </section>

      {/* Section 3: Le Journal / Notre Histoire (wireframe box 3) */}
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

    </div>
  );
};

export default Home;
