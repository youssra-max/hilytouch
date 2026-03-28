"use client";
import React from 'react';
import { TreePine, Droplets, Recycle, Heart } from 'lucide-react';
import './Impact.css';

const Impact = () => {
  return (
    <div className="impact-page fade-in">
      <section className="impact-hero">
        <div className="container">
          <p className="subtitle">NOTRE ENGAGEMENT</p>
          <h1>Notre impact <em>positif</em></h1>
          <p className="impact-hero-desc">
            Chez Hilytouch, chaque décision est guidée par notre responsabilité envers la planète et les communautés qui nous entourent.
          </p>
        </div>
      </section>

      <section className="impact-pillars container">
        <div className="pillar">
          <div className="pillar-icon"><TreePine size={40} /></div>
          <div className="pillar-content">
            <h2>Sourcing éthique</h2>
            <p>Nos ingrédients sont sourcés auprès de communautés locales dans le respect du commerce équitable. Nous travaillons directement avec des coopératives au Maroc, au Burkina Faso et à Madagascar pour le karité, l'argan et la vanille.</p>
            <div className="pillar-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">de nos matières premières issues du commerce équitable</span>
            </div>
          </div>
        </div>

        <div className="pillar pillar--reverse">
          <div className="pillar-icon"><Recycle size={40} /></div>
          <div className="pillar-content">
            <h2>Zéro déchet en 2027</h2>
            <p>Nous nous engageons vers un modèle zéro déchet. Nos emballages sont en verre recyclé et en carton FSC. Nous avons éliminé 90% du plastique de notre chaîne de production depuis 2024.</p>
            <div className="pillar-stat">
              <span className="stat-number">90%</span>
              <span className="stat-label">de réduction du plastique depuis 2024</span>
            </div>
          </div>
        </div>

        <div className="pillar">
          <div className="pillar-icon"><Droplets size={40} /></div>
          <div className="pillar-content">
            <h2>Préservation de l'eau</h2>
            <p>Nos procédés de fabrication consomment 60% d'eau en moins que l'industrie cosmétique conventionnelle. Nous investissons dans des systèmes de recyclage d'eau en circuit fermé.</p>
            <div className="pillar-stat">
              <span className="stat-number">-60%</span>
              <span className="stat-label">de consommation d'eau vs l'industrie</span>
            </div>
          </div>
        </div>

        <div className="pillar pillar--reverse">
          <div className="pillar-icon"><Heart size={40} /></div>
          <div className="pillar-content">
            <h2>Engagement communautaire</h2>
            <p>1% de notre chiffre d'affaires est reversé à des associations qui œuvrent pour l'éducation des femmes dans les régions productrices de nos matières premières.</p>
            <div className="pillar-stat">
              <span className="stat-number">1%</span>
              <span className="stat-label">du CA reversé pour l'éducation des femmes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-certifications container">
        <div className="section-head centered">
          <h2>Nos certifications</h2>
        </div>
        <div className="certifications-grid">
          <div className="cert-card">
            <span className="cert-icon">🌿</span>
            <h3>COSMOS Organic</h3>
            <p>Certification bio européenne</p>
          </div>
          <div className="cert-card">
            <span className="cert-icon">🐰</span>
            <h3>Leaping Bunny</h3>
            <p>Cruelty-free certifié</p>
          </div>
          <div className="cert-card">
            <span className="cert-icon">♻️</span>
            <h3>B Corp</h3>
            <p>Entreprise à impact positif</p>
          </div>
          <div className="cert-card">
            <span className="cert-icon">🌍</span>
            <h3>1% for the Planet</h3>
            <p>Membre depuis 2024</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
