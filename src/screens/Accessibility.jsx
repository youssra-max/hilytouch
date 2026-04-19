"use client";
import React from "react";
import { Eye, Ear, Hand, Monitor, MessageCircle } from "lucide-react";
import "./Accessibility.css";

const Accessibility = () => {
  return (
    <div className="accessibility-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">ENGAGEMENT</p>
        <h1>Accessibilité</h1>
        <p className="page-desc">
          Chez Hilytouch, nous croyons que la beauté est universelle. Notre
          engagement en matière d'accessibilité reflète cette conviction.
        </p>
      </div>

      <div
        className="access-commitment"
        style={{
          marginTop: "3rem",
          textAlign: "center",
          maxWidth: "700px",
          margin: "3rem auto",
        }}
      >
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          En tant que jeune startup, nous débutons tout juste notre aventure.
          Construire une place de marché dédiée aux marques de beauté et
          cosmétiques 100% algériennes demande du temps, et nous voulons que
          celle-ci soit consultable par tous.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          Bien que notre site ne réponde pas encore à toutes les normes
          d'accessibilité numérique les plus complexes (WCAG), nous apprenons
          chaque jour et nous nous engageons à améliorer progressivement notre
          plateforme au fur et à mesure de notre croissance.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Si vous rencontrez des difficultés de navigation ou si vous avez des
          suggestions pour nous aider à nous améliorer dès aujourd'hui, nous
          serions ravis de vous lire : <br />
          <strong>
            <a
              href="mailto:accessibilite@hilytouch.com"
              style={{ color: "var(--color-gold)", textDecoration: "none" }}
            >
              accessibilite@hilytouch.com
            </a>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Accessibility;
