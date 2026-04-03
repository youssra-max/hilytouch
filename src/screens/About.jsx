"use client";
import React from 'react';
import { Heart, Leaf, Globe, Award, Users, Sparkles } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page fade-in">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <p className="subtitle">NOTRE HISTOIRE</p>
          <h1>L'art de la beauté <em>naturelle</em></h1>
          <p className="about-hero-desc">
            Hilytouch est né d'une conviction profonde : la beauté authentique naît de l'harmonie entre la nature et le savoir-faire artisanal. Depuis notre création, nous façonnons des soins d'exception qui célèbrent la singularité de chaque peau.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission container">
        <div className="mission-grid">
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop" alt="Notre mission" />
          </div>
          <div className="mission-text">
            <p className="subtitle">NOTRE MISSION</p>
            <h2>Révéler votre éclat <em>unique</em></h2>
            <p>Chez Hilytouch, nous croyons que chaque femme mérite des soins formulés avec intégrité. Nos formules associent les trésors botaniques les plus rares à la recherche scientifique de pointe, pour offrir des résultats visibles tout en respectant votre peau et notre planète.</p>
            <p>Chaque produit est développé dans notre laboratoire français, testé dermatologiquement et certifié cruelty-free.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values container">
        <div className="section-head centered">
          <p className="subtitle">NOS VALEURS</p>
          <h2>Ce qui nous guide</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <Leaf size={32} />
            <h3>Naturalité</h3>
            <p>95% d'ingrédients d'origine naturelle minimum dans chacune de nos formules.</p>
          </div>
          <div className="value-card">
            <Heart size={32} />
            <h3>Éthique</h3>
            <p>Cruelty-free, commerce équitable et sourcing responsable de nos matières premières.</p>
          </div>
          <div className="value-card">
            <Globe size={32} />
            <h3>Durabilité</h3>
            <p>Emballages recyclables, production éco-responsable et bilan carbone neutre.</p>
          </div>
          <div className="value-card">
            <Award size={32} />
            <h3>Excellence</h3>
            <p>Formules développées par des experts en cosmétologie et testées dermatologiquement.</p>
          </div>
          <div className="value-card">
            <Users size={32} />
            <h3>Inclusivité</h3>
            <p>Des soins pour tous les types de peau, toutes les carnations, tous les âges.</p>
          </div>
          <div className="value-card">
            <Sparkles size={32} />
            <h3>Innovation</h3>
            <p>R&D continue pour fusionner le meilleur de la nature avec la science cosmétique.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team container">
        <div className="section-head centered">
          <p className="subtitle">NOTRE ÉQUIPE</p>
          <h2>Les visages derrière Hilytouch</h2>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-photo">
              <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974&auto=format&fit=crop" alt="Fondatrice" />
            </div>
            <h3>Hily Amrani</h3>
            <p className="team-role">Fondatrice & Directrice Créative</p>
          </div>
          <div className="team-card">
            <div className="team-photo">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="R&D" />
            </div>
            <h3>Dr. Sarah Belloni</h3>
            <p className="team-role">Directrice Recherche & Développement</p>
          </div>
          <div className="team-card">
            <div className="team-photo">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Marketing" />
            </div>
            <h3>Amira Benali</h3>
            <p className="team-role">Directrice Marketing & Communication</p>
          </div>
          <div className="team-card">
            <div className="team-photo">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" alt="Opérations" />
            </div>
            <h3>Emma Rousseau</h3>
            <p className="team-role">Directrice Opérations & Logistique</p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="about-numbers">
        <div className="container">
          <div className="numbers-grid">
            <div className="number-item">
              <span className="number">10K+</span>
              <p>Diagnostics réalisés</p>
            </div>
            <div className="number-item">
              <span className="number">50+</span>
              <p>Références produits</p>
            </div>
            <div className="number-item">
              <span className="number">95%</span>
              <p>Ingrédients naturels</p>
            </div>
            <div className="number-item">
              <span className="number">4.8★</span>
              <p>Note moyenne clients</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
