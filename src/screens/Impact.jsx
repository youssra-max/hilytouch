"use client";
import React from "react";
import { TreePine, Droplets, Recycle, Heart } from "lucide-react";
import "./Impact.css";

const Impact = () => {
  return (
    <div className="impact-page fade-in">
      <section className="impact-hero">
        <div className="container">
          <p className="subtitle">NOTRE ENGAGEMENT</p>
          <h1>
            Notre impact <em>positif</em>
          </h1>
          <p className="impact-hero-desc">
            Chez Hilytouch, chaque décision est guidée par notre responsabilité
            envers la planète et les communautés qui nous entourent.
          </p>
        </div>
      </section>

      <section className="impact-pillars container">
        <div className="pillar">
          <div className="pillar-icon">
            <TreePine size={40} />
          </div>
          <div className="pillar-content">
            <h2>Sourcing 100% Local</h2>
            <p>
              Notre place de marché est exclusivement dédiée aux créateurs et
              marques algériennes. Nous mettons en lumière le patrimoine
              botanique de notre pays, des huiles de figue de barbarie des hauts
              plateaux aux plantes médicinales du Sahara.
            </p>
            <div className="pillar-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">
                de nos marques et artisans sont Algériens
              </span>
            </div>
          </div>
        </div>

        <div className="pillar pillar--reverse">
          <div className="pillar-icon">
            <Recycle size={40} />
          </div>
          <div className="pillar-content">
            <h2>Éco-responsabilité</h2>
            <p>
              Nous encourageons nos partenaires locaux à utiliser des emballages
              recyclables et à adopter des circuits de livraison courts (de la
              Wilaya du producteur directement chez vous), afin de minimiser
              notre empreinte carbone nationale.
            </p>
            <div className="pillar-stat">
              <span className="stat-number">Circuit Court</span>
              <span className="stat-label">
                du producteur algérien au consommateur
              </span>
            </div>
          </div>
        </div>

        <div className="pillar">
          <div className="pillar-icon">
            <Droplets size={40} />
          </div>
          <div className="pillar-content">
            <h2>Qualité Authentique</h2>
            <p>
              Nous veillons à ce que chaque produit vendu sur Hilytouch soit
              issu de procédés respectueux et artisanaux, garantissant une
              pureté exceptionnelle sans produits chimiques agressifs.
            </p>
            <div className="pillar-stat">
              <span className="stat-number">Pur</span>
              <span className="stat-label">
                sans additifs industriels importés
              </span>
            </div>
          </div>
        </div>

        <div className="pillar pillar--reverse">
          <div className="pillar-icon">
            <Heart size={40} />
          </div>
          <div className="pillar-content">
            <h2>Promotion du Made in Algeria</h2>
            <p>
              De la petite coopérative qui extrait l'huile de figue de barbarie
              au grand laboratoire algérien développant du maquillage certifié,
              Hilytouch s'engage à offrir une plateforme digitale puissante pour
              propulser toutes les marques de notre pays.
            </p>
            <div className="pillar-stat">
              <span className="stat-number">Digital</span>
              <span className="stat-label">
                un tremplin pour le formidable potentiel des cosmétiques locaux
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
