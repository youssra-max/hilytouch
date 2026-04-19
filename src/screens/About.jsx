"use client";
import React from "react";
import { Heart, Users, Sparkles, ShieldCheck } from "lucide-react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page fade-in">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <p className="subtitle">NOTRE HISTOIRE</p>
          <h1>
            Quatre voix, une même <em>vision</em>
          </h1>
          <p className="about-hero-desc">
            Tout a commencé par une ambition partagée. Nous sommes quatre jeunes
            femmes algériennes, unies par une passion commune : mettre en
            lumière la véritable beauté de notre pays et le talent de ceux qui
            la subliment.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="about-mission container">
        <div className="mission-grid">
          <div className="mission-image">
            <img
              src="https://images.unsplash.com/photo-1522335789183-b1522032f32a?q=80&w=1974&auto=format&fit=crop"
              alt="L'équipe Hilytouch"
            />
          </div>
          <div className="mission-text">
            <h2>
              L'écrin de l'excellence <em>algérienne</em>
            </h2>
            <p>
              En observant notre marché, nous avons fait un constat simple.
              L'Algérie regorge de trésors naturels exceptionnels et de
              créateurs passionnés, mais il manquait un espace de confiance pour
              les réunir. Un écrin élégant, digne de leur savoir-faire, où les
              consommateurs pourraient faire leurs achats en toute sécurité.
            </p>
            <p>
              C'est de cette volonté qu'est née <strong>Hilytouch</strong>.
            </p>
            <p>
              Plus qu'une simple marketplace, Hilytouch est le fruit de notre
              engagement envers l'excellence locale. Nous avons imaginé un lieu
              unique, pensé par des femmes pour toutes les beautés, où se
              rencontrent les meilleures marques officielles et les artisans de
              la cosmétique naturelle et bio.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Story */}
      <section className="about-values container">
        <div className="values-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="value-card">
            <ShieldCheck size={32} />
            <h3>Notre Mission au Quotidien</h3>
            <p>
              Sélectionner avec la plus grande rigueur le meilleur du "Made in
              Algeria". Nous vérifions chaque partenaire pour vous offrir une
              transparence totale et des produits authentiques, sûrs et
              respectueux de votre peau.
            </p>
          </div>
          <div className="value-card">
            <Users size={32} />
            <h3>Force Féminine</h3>
            <p>
              Derrière chaque produit que vous découvrez ici se cache le travail
              acharné d'un créateur local. Et derrière Hilytouch, il y a quatre
              femmes déterminées à faire rayonner ce talent.
            </p>
          </div>
        </div>
      </section>
      {/* Team */}
      <section
        className="about-team container"
        style={{ paddingBottom: "6rem" }}
      >
        <div className="section-head centered">
          <p className="subtitle">NOTRE ÉQUIPE</p>
          <h2>
            Les visages derrière <em>Hilytouch</em>
          </h2>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <h3>Imene Guenfoud</h3>
            <p className="team-role">Directrice Créative & Technique</p>
          </div>
          <div className="team-card">
            <h3>Hanane Belhadj</h3>
            <p className="team-role">Directrice Financière & Stratégique</p>
          </div>
          <div className="team-card">
            <h3>Youssra Sedjelmaci</h3>
            <p className="team-role">Directrice Marketing & Communication</p>
          </div>
          <div className="team-card">
            <h3>Lilya Taleb</h3>
            <p className="team-role">Directrice Opérations & Logistique</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
