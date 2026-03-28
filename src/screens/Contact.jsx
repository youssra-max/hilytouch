"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { submitContact } from '../lib/api';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await submitContact(form);
      if (res.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setSending(false);
  };

  return (
    <div className="contact-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">SERVICE CLIENT</p>
        <h1>Contactez-nous</h1>
        <p className="page-desc">Notre équipe est à votre écoute pour toute question, suggestion ou demande d'assistance.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-info-card">
            <Mail size={22} />
            <div>
              <h3>Email</h3>
              <p>contact@hilytouch.com</p>
            </div>
          </div>
          <div className="contact-info-card">
            <Phone size={22} />
            <div>
              <h3>Téléphone</h3>
              <p>+213 (0) 550 12 34 56</p>
            </div>
          </div>
          <div className="contact-info-card">
            <MapPin size={22} />
            <div>
              <h3>Adresse</h3>
              <p>05 Rue Didouche Mourad<br/>16000 Alger, Algérie</p>
            </div>
          </div>
          <div className="contact-info-card">
            <Clock size={22} />
            <div>
              <h3>Horaires</h3>
              <p>Lun-Ven : 9h-18h<br/>Sam : 10h-16h</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Sujet</label>
            <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
              <option value="">Choisir un sujet</option>
              <option value="commande">Question sur une commande</option>
              <option value="produit">Renseignement produit</option>
              <option value="retour">Retour / Échange</option>
              <option value="partenariat">Partenariat</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="Votre message..." rows={6} />
          </div>
          <button type="submit" className="btn btn-primary btn-submit" disabled={sending}>
            {sending ? 'Envoi en cours...' : <><Send size={16} /> Envoyer le message</>}
          </button>
          {status === 'success' && <p className="form-success">✅ Votre message a été envoyé avec succès ! Nous vous répondrons sous 48h.</p>}
          {status === 'error' && <p className="form-error">❌ Erreur lors de l'envoi. Veuillez réessayer.</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
