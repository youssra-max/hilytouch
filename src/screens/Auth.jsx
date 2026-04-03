"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* Left Side: Elegant Image */}
        <div className="auth-image-side">
          <div className="auth-image-overlay">
            <Link href="/" className="auth-image-logo">hilytouch</Link>
            <h2>Révélez votre beauté naturelle.</h2>
            <p>Une collection premium de soins visage, corps et maquillage.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="auth-form-container">
            <Link href="/" className="auth-back-link">
              &larr; Retour à la boutique
            </Link>

            <div className="auth-header">
              <h1>{isLogin ? 'Bienvenue' : 'Créer un compte'}</h1>
              <p>
                {isLogin 
                  ? 'Connectez-vous pour accéder à votre espace Hilytouch.' 
                  : 'Rejoignez-nous pour une expérience beauté personnalisée.'}
              </p>
            </div>

            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Connexion
              </button>
              <button 
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Inscription
              </button>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="form-row">
                  <div className="input-group">
                    <label>Prénom</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input type="text" placeholder="Votre prénom" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Nom</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input type="text" placeholder="Votre nom" />
                    </div>
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input type="email" placeholder="votre@email.com" />
                </div>
              </div>

              <div className="input-group">
                <label>Mot de passe</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input type="password" placeholder="••••••••" />
                </div>
                {isLogin && (
                  <Link href="/auth/forgot-password" className="forgot-password-link">
                    Mot de passe oublié ?
                  </Link>
                )}
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label>Confirmer le mot de passe</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input type="password" placeholder="••••••••" />
                  </div>
                </div>
              )}

              <button className="auth-submit-btn">
                {isLogin ? 'Se connecter' : 'Créer mon compte'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="auth-divider">
              <span>ou continuer avec</span>
            </div>

            <div className="social-logins">
              <button className="social-btn google-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                Google
              </button>
              <button className="social-btn apple-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                Apple
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
