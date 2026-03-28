"use client";
import React from 'react';
import { Eye, Ear, Hand, Monitor, MessageCircle } from 'lucide-react';
import './Accessibility.css';

const Accessibility = () => {
  return (
    <div className="accessibility-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">ENGAGEMENT</p>
        <h1>Accessibilité</h1>
        <p className="page-desc">Chez Hilytouch, nous croyons que la beauté est universelle. Notre engagement en matière d'accessibilité reflète cette conviction.</p>
      </div>

      <div className="access-grid">
        <div className="access-card">
          <Eye size={28} />
          <h3>Accessibilité visuelle</h3>
          <p>Contrastes élevés, textes redimensionnables et descriptions alternatives sur toutes nos images. Notre site est compatible avec les lecteurs d'écran.</p>
        </div>
        <div className="access-card">
          <Monitor size={28} />
          <h3>Navigation au clavier</h3>
          <p>Toutes les fonctionnalités de notre site sont accessibles via le clavier. Des indicateurs de focus visibles guident votre navigation.</p>
        </div>
        <div className="access-card">
          <Ear size={28} />
          <h3>Contenus audio</h3>
          <p>Nos vidéos sont sous-titrées et nos contenus audio sont accompagnés de transcriptions textuelles.</p>
        </div>
        <div className="access-card">
          <Hand size={28} />
          <h3>Interface tactile</h3>
          <p>Zones tactiles suffisamment grandes, gestes simplifiés et compatibilité avec les technologies d'assistance mobiles.</p>
        </div>
        <div className="access-card">
          <MessageCircle size={28} />
          <h3>Langage clair</h3>
          <p>Nos contenus sont rédigés dans un langage simple et compréhensible pour être accessibles au plus grand nombre.</p>
        </div>
      </div>

      <div className="access-commitment">
        <h2>Notre engagement continu</h2>
        <p>Nous travaillons en permanence à l'amélioration de l'accessibilité de notre site web. Si vous rencontrez des difficultés d'accès, n'hésitez pas à nous contacter à <a href="mailto:accessibilite@hilytouch.com">accessibilite@hilytouch.com</a>.</p>
        <p>Nous nous engageons à respecter le niveau AA des directives WCAG 2.1 et effectuons des audits réguliers de notre plateforme.</p>
      </div>
    </div>
  );
};

export default Accessibility;
