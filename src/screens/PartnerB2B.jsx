"use client";
import React from "react";
import { Star, TrendingUp, Handshake } from "lucide-react";
import "./PartnerB2B.css";

const PartnerB2B = () => {
  return (
    <div className="partner-b2b-page fade-in">
      {/* Hero */}
      <section className="pb2b-hero">
        <div className="pb2b-hero-overlay"></div>
        <div className="pb2b-hero-content container">
          <h1>Devenez Partenaire Hilytouch</h1>
          <p>
            Associez votre image à une marque de cosmétique naturelle de
            prestige. Rejoignez notre écosystème grandissant de distributeurs et
            de marques partenaires.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb2b-benefits container">
        <div className="section-head centered">
          <p className="subtitle">POURQUOI NOUS REJOINDRE</p>
          <h2>Vos Avantages</h2>
        </div>
        <div className="pb2b-benefits-grid">
          <div className="pb2b-benefit-card">
            <div className="pb2b-icon-wrapper">
              <Star size={40} />
            </div>
            <h3>Réseau Premium</h3>
            <p>
              Bénéficiez d'une visibilité ciblée auprès d'une communauté engagée
              et passionnée par la beauté naturelle et éthique.
            </p>
          </div>
          <div className="pb2b-benefit-card">
            <div className="pb2b-icon-wrapper">
              <TrendingUp size={40} />
            </div>
            <h3>Croissance Rapide</h3>
            <p>
              Développez vos ventes grâce à nos campagnes ciblées et notre
              présence numérique de premier plan sur le marché français.
            </p>
          </div>
          <div className="pb2b-benefit-card">
            <div className="pb2b-icon-wrapper">
              <Handshake size={40} />
            </div>
            <h3>Accompagnement Sur-mesure</h3>
            <p>
              Une équipe Hilytouch dédiée pour vous conseiller, animer vos
              formations et booster nos performances mutuelles.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="pb2b-application container">
        <div className="pb2b-form-container">
          <div className="section-head">
            <p className="subtitle">CANDIDATURE</p>
            <h2>Présentez-nous votre projet</h2>
            <p>
              Faites-nous part de vos ambitions. Notre équipe partenariat vous
              répondra sous 48h.
            </p>
          </div>
          <form className="pb2b-form" onSubmit={(e) => e.preventDefault()}>
            <div className="pb2b-form-row">
              <div className="pb2b-form-group">
                <label>Nom de l'entreprise ou Marque</label>
                <input
                  type="text"
                  className="pb2b-input"
                  placeholder="Votre société"
                />
              </div>
              <div className="pb2b-form-group">
                <label>Site Web ou Réseau Social</label>
                <input
                  type="url"
                  className="pb2b-input"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="pb2b-form-row">
              <div className="pb2b-form-group">
                <label>Nom et Prénom du contact</label>
                <input
                  type="text"
                  className="pb2b-input"
                  placeholder="Prénom Nom"
                />
              </div>
              <div className="pb2b-form-group">
                <label>Email professionnel</label>
                <input
                  type="email"
                  className="pb2b-input"
                  placeholder="contact@entreprise.com"
                />
              </div>
            </div>

            <div className="pb2b-form-group">
              <label>Décrivez votre projet et vos valeurs</label>
              <textarea
                className="pb2b-input"
                placeholder="Partagez-nous votre vision pour ce partenariat..."
              ></textarea>
            </div>

            <button type="submit" className="pb2b-submit">
              Envoyer ma candidature
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PartnerB2B;
