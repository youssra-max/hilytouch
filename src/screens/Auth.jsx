"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { loginUser, registerUser } from "../lib/api";
import "./Auth.css";

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await loginUser(form.email, form.password);
      } else {
        if (form.password !== form.password2) {
          setError("Les mots de passe ne correspondent pas.");
          setLoading(false);
          return;
        }
        await registerUser({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          password2: form.password2,
        });
      }
      // Success — redirect to home
      router.push("/");
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* Left Side: Elegant Image */}
        <div className="auth-image-side">
          <div className="auth-image-overlay">
            <Link href="/" className="auth-image-logo">
              hilytouch
            </Link>
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
              <h1>{isLogin ? "Bienvenue" : "Créer un compte"}</h1>
              <p>
                {isLogin
                  ? "Connectez-vous pour accéder à votre espace Hilytouch."
                  : "Rejoignez-nous pour une expérience beauté personnalisée."}
              </p>
            </div>

            <div className="auth-tabs">
              <button
                className={`auth-tab ${isLogin ? "active" : ""}`}
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
              >
                Connexion
              </button>
              <button
                className={`auth-tab ${!isLogin ? "active" : ""}`}
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
              >
                Inscription
              </button>
            </div>

            {error && (
              <p
                className="form-error"
                style={{
                  color: "#e74c3c",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </p>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-row">
                  <div className="input-group">
                    <label>Prénom</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Nom</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Mot de passe</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
                {isLogin && (
                  <Link
                    href="/auth/forgot-password"
                    className="forgot-password-link"
                  >
                    Mot de passe oublié ?
                  </Link>
                )}
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label>Confirmer le mot de passe</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      name="password2"
                      value={form.password2}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              )}

              <button className="auth-submit-btn" disabled={loading}>
                {loading
                  ? "Chargement..."
                  : isLogin
                    ? "Se connecter"
                    : "Créer mon compte"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="auth-divider">
              <span>ou continuer avec</span>
            </div>

            <div className="social-logins">
              <button className="social-btn google-btn">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                />
                Google
              </button>
              <button className="social-btn facebook-btn">
                <img
                  src="https://img.icons8.com/fluent/24/000000/facebook-new.png"
                  alt="Facebook"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
