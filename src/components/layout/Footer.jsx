import React from 'react';
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter + Links row */}
        <div className="footer-top">
          {/* Newsletter side */}
          <div className="footer-newsletter">
            <h3>Inscrivez-vous par e-mail et/ou SMS pour les dernières nouveautés, offres spéciales, et plus encore.</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Votre Email" />
              <button className="newsletter-btn">Rejoindre <ArrowRight size={14} /></button>
            </div>
            <p className="newsletter-legal">
              En cliquant sur «Rejoindre», vous acceptez de recevoir des e-mails marketing de hilytouch. 
              Vous pouvez vous désinscrire à tout moment. Consultez notre <a href="#">Politique de confidentialité</a> & <a href="#">Conditions d'utilisation</a>.
            </p>
            <div className="newsletter-form newsletter-form--mobile">
              <input type="tel" placeholder="Votre Mobile ☰" />
              <button className="newsletter-btn">Rejoindre <ArrowRight size={14} /></button>
            </div>
          </div>

          {/* Links side */}
          <div className="footer-links-row">
            <div className="footer-col">
              <h4>Boutique</h4>
              <ul>
                <li><a href="/shop">Visage</a></li>
                <li><a href="/shop">Corps</a></li>
                <li><a href="/shop">Maquillage</a></li>
                <li><a href="/shop">Outils</a></li>
                <li><a href="/shop">Nouveautés</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Entreprise</h4>
              <ul>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Notre impact</a></li>
                <li><a href="#">Accessibilité</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="#">Partenariats</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Service Client</h4>
              <ul>
                <li><a href="#">Contactez-nous</a></li>
                <li><a href="#">Livraison & Retours</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="/diagnostic">Diagnostique Peau</a></li>
                <li><a href="#">Suivi de commande</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
          <div className="footer-legal-bottom">
            <p>© 2026 hilytouch. Tous droits réservés.</p>
            <div className="legal-links">
              <a href="#">Politique de confidentialité</a>
              <a href="#">Conditions d'utilisation</a>
              <a href="#">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
