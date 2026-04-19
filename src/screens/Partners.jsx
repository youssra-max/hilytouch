"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import "./Partners.css";

const PARTNERS = [
  {
    name: "LUMIÈRE",
    desc: "Marque française de soins visage haute performance, reconnue pour ses formules à base d'extraits de lys.",
    logo: "✨",
  },
  {
    name: "ESSENCE",
    desc: "Pionniers de la cosmétique bio, ESSENCE propose des soins certifiés 100% naturels depuis 2010.",
    logo: "🌸",
  },
  {
    name: "BOTANIC",
    desc: "Spécialiste des huiles essentielles et des soins aromathérapiques pour une beauté sensorielle.",
    logo: "🌿",
  },
  {
    name: "PURE",
    desc: "Marque minimaliste aux formules concentrées, sans superflu, pour des résultats visibles.",
    logo: "💎",
  },
  {
    name: "FLORE",
    desc: "Inspirée des jardins méditerranéens, FLORE capture l'essence des fleurs dans des soins luxueux.",
    logo: "🌺",
  },
  {
    name: "HILY",
    desc: "Notre ligne signature — des soins exclusifs formulés dans nos laboratoires avec les ingrédients les plus rares.",
    logo: "⭐",
  },
];

const Partners = () => {
  return (
    <div className="partners-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">NOTRE UNIVERS</p>
        <h1>Nos Partenaires</h1>
        <p className="page-desc">
          Nous collaborons avec les marques les plus engagées de l'industrie
          cosmétique pour vous offrir le meilleur de la beauté consciente.
        </p>
      </div>

      <div className="partners-showcase">
        {PARTNERS.map((partner, i) => (
          <div key={i} className="partner-card-large">
            <div className="partner-logo-large">{partner.logo}</div>
            <div className="partner-info">
              <h2>{partner.name}</h2>
              <p>{partner.desc}</p>
              <span className="link-rose">
                Découvrir la marque <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="partner-cta">
        <h2>Devenir partenaire</h2>
        <p>
          Vous êtes une marque engagée dans la beauté naturelle et responsable ?
          Rejoignez notre plateforme pour toucher une communauté passionnée.
        </p>
        <a href="/contact" className="btn btn-primary">
          Nous contacter
        </a>
      </div>
    </div>
  );
};

export default Partners;
