import React from "react";
import "./Legal.css";
import { ShieldCheck, Scale, FileText, CheckCircle } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="legal-container fade-in">
      <div className="legal-header">
        <h1>Conditions Générales de Vente et d'Utilisation (CGV & CGU)</h1>
        <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <div className="legal-section-title">
            <FileText className="legal-icon" />
            <h2>1. Préambule et Définitions</h2>
          </div>
          <p>
            Bienvenue sur Hilytouch, la marketplace dédiée à la beauté et aux
            cosmétiques. Les présentes Conditions Générales (CGV / CGU)
            régissent l'accès, la navigation et l'utilisation du site, ainsi que
            la mise en relation entre les vendeurs (Marques et Artisans) et les
            clients finaux.
          </p>
          <p>
            <strong>"Marketplace" :</strong> Désigne la plateforme Hilytouch.
            <br />
            <strong>"Vendeur" :</strong> Désigne tout professionnel (marque ou
            artisan) approuvé par nos services et proposant ses produits sur la
            marketplace.
            <br />
            <strong>"Client" :</strong> Désigne toute personne naviguant et
            effectuant un achat sur Hilytouch.
          </p>
        </section>

        <section className="legal-section">
          <div className="legal-section-title">
            <ShieldCheck className="legal-icon" />
            <h2>2. Inscription et Qualité de Vendeur</h2>
          </div>
          <p>
            Pour devenir Vendeur sur Hilytouch, l'utilisateur doit soumettre une
            candidature via notre formulaire d'inscription. Hilytouch se réserve
            le droit d'accepter ou de refuser toute candidature selon ses
            propres critères de sélection (qualité, charte éthique de la beauté,
            etc.).
          </p>
          <ul>
            <li>
              Le vendeur doit fournir des documents légaux valides (Registre de
              Commerce ou Carte d'Artisan).
            </li>
            <li>
              Le vendeur s'engage à fournir des produits neufs, certifiés et
              conformes aux normes d'hygiène et de sécurité algériennes.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <div className="legal-section-title">
            <Scale className="legal-icon" />
            <h2>3. Commandes et Paiements</h2>
          </div>
          <p>
            Lorsqu'un client passe commande, le vendeur en est immédiatement
            notifié. Le vendeur s'engage à préparer la commande dans les délais
            impartis.
          </p>
          <p>
            <strong>Reversion des ventes :</strong> Hilytouch agit en tant
            qu'intermédiaire et s'occupe de collecter les fonds. Le reversement
            au vendeur s'effectue (déduction faite de la commission Hilytouch)
            via Virement Bancaire ou CCP, selon un calendrier défini lors de
            l'onboarding.
          </p>
        </section>

        <section className="legal-section">
          <div className="legal-section-title">
            <CheckCircle className="legal-icon" />
            <h2>4. Litiges et Engagements</h2>
          </div>
          <p>
            Le vendeur est seul responsable de la qualité de ses produits. En
            cas de litige avec un client (produit endommagé, erreur de
            commande), le vendeur s'engage à proposer une solution de
            remplacement ou de remboursement. Hilytouch n'agit qu'en tant
            qu'hébergeur des offres mais peut intervenir en tant que médiateur
            si nécessaire pour protéger ses utilisateurs.
          </p>
        </section>
      </div>
    </div>
  );
}
