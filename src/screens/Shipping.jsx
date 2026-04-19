"use client";
import React from "react";
import {
  Truck,
  RotateCcw,
  Clock,
  Shield,
  Package,
  CreditCard,
} from "lucide-react";
import "./Shipping.css";

const Shipping = () => {
  return (
    <div className="shipping-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">SERVICE CLIENT</p>
        <h1>Livraison & Retours</h1>
        <p className="page-desc">
          Toutes les informations sur nos options de livraison et notre
          politique de retour.
        </p>
      </div>

      {/* Delivery */}
      <section className="shipping-section">
        <h2>
          <Truck size={24} /> Livraison
        </h2>
        <div className="shipping-options">
          <div className="shipping-option">
            <div className="option-header">
              <h3>Standard (Yalidine)</h3>
              <span className="option-price">Gratuit dès 10 000 DA</span>
            </div>
            <p>Livraison sous 2 à 4 jours ouvrés dans les grandes villes.</p>
            <span className="option-detail">
              600 DA en dessous de 10 000 DA d'achat
            </span>
          </div>
          <div className="shipping-option shipping-option--highlight">
            <div className="option-header">
              <h3>Express (Alger)</h3>
              <span className="option-price">800 DA</span>
            </div>
            <p>Livraison sous 24h sur Alger et ses environs.</p>
            <span className="option-detail">
              Commande avant 12h = expédiée le jour même
            </span>
          </div>
          <div className="shipping-option">
            <div className="option-header">
              <h3>Bureau Yalidine</h3>
              <span className="option-price">Gratuit dès 8 000 DA</span>
            </div>
            <p>
              Livraison sous 2 à 4 jours ouvrés dans le bureau Yalidine de votre
              choix.
            </p>
            <span className="option-detail">
              400 DA en dessous de 8 000 DA d'achat
            </span>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section className="shipping-section">
        <h2>
          <RotateCcw size={24} /> Retours
        </h2>
        <div className="returns-info">
          <div className="return-step">
            <span className="step-number">1</span>
            <div>
              <h3>Initiez votre retour</h3>
              <p>
                Connectez-vous à votre compte et accédez à « Mes commandes ».
                Sélectionnez l'article à retourner.
              </p>
            </div>
          </div>
          <div className="return-step">
            <span className="step-number">2</span>
            <div>
              <h3>Préparez votre colis</h3>
              <p>
                Emballez le produit dans son emballage d'origine. Collez
                l'étiquette prépayée sur le colis.
              </p>
            </div>
          </div>
          <div className="return-step">
            <span className="step-number">3</span>
            <div>
              <h3>Déposez votre colis</h3>
              <p>
                Déposez votre colis dans un bureau Yalidine ou demandez une
                collecte à domicile. Conservez votre récépissé.
              </p>
            </div>
          </div>
          <div className="return-step">
            <span className="step-number">4</span>
            <div>
              <h3>Remboursement</h3>
              <p>
                Votre remboursement est effectué sous 5 à 7 jours ouvrés après
                réception et vérification du produit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="guarantees-grid">
        <div className="guarantee-card">
          <Clock size={24} />
          <h3>30 jours</h3>
          <p>Pour changer d'avis</p>
        </div>
        <div className="guarantee-card">
          <Shield size={24} />
          <h3>Paiement sécurisé</h3>
          <p>Transactions cryptées SSL</p>
        </div>
        <div className="guarantee-card">
          <Package size={24} />
          <h3>Livraison 58 wilayas</h3>
          <p>Sur tout le territoire national</p>
        </div>
        <div className="guarantee-card">
          <CreditCard size={24} />
          <h3>Paiement à la livraison</h3>
          <p>Réglez à réception (Cash on Delivery)</p>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
