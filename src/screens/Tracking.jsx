"use client";
import React, { useState } from "react";
import { Package, Search, Truck, Check, Circle } from "lucide-react";
import { trackOrder } from "../lib/api";
import "./Tracking.css";

const Tracking = () => {
  const [form, setForm] = useState({ orderNumber: "", email: "" });
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await trackOrder(form);
      if (res.error) {
        setError(res.error);
      } else {
        setTracking(res);
      }
    } catch {
      setError("Erreur lors de la recherche.");
    }
    setLoading(false);
  };

  return (
    <div className="tracking-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">SERVICE CLIENT</p>
        <h1>Suivi de commande</h1>
        <p className="page-desc">
          Retrouvez l'état de votre commande en renseignant vos informations
          ci-dessous.
        </p>
      </div>

      {!tracking ? (
        <div className="tracking-form-wrapper">
          <form className="tracking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="orderNumber">Numéro de commande *</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={form.orderNumber}
                onChange={(e) =>
                  setForm({ ...form, orderNumber: e.target.value })
                }
                placeholder="Ex: HT-2026-00123"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="trackEmail">
                Email utilisé lors de la commande *
              </label>
              <input
                type="email"
                id="trackEmail"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="votre@email.com"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={loading}
            >
              {loading ? (
                "Recherche..."
              ) : (
                <>
                  <Search size={16} /> Suivre ma commande
                </>
              )}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="tracking-result">
          <div className="tracking-header">
            <div>
              <h2>Commande {tracking.orderNumber}</h2>
              <p className="tracking-status">
                <Truck size={16} /> {tracking.status}
              </p>
            </div>
            <div className="tracking-delivery">
              <span>Livraison estimée</span>
              <strong>{tracking.estimatedDelivery}</strong>
            </div>
          </div>

          <div className="tracking-timeline">
            {tracking.steps.map((step, i) => (
              <div
                key={i}
                className={`timeline-step ${step.completed ? "completed" : ""}`}
              >
                <div className="timeline-dot">
                  {step.completed ? <Check size={14} /> : <Circle size={14} />}
                </div>
                <div className="timeline-content">
                  <h4>{step.label}</h4>
                  {step.date && <p>{step.date}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="tracking-details">
            <div className="detail-item">
              <span>Transporteur</span>
              <strong>{tracking.carrier}</strong>
            </div>
            <div className="detail-item">
              <span>N° de suivi</span>
              <strong>{tracking.trackingNumber}</strong>
            </div>
          </div>

          <button
            className="btn-back"
            onClick={() => {
              setTracking(null);
              setForm({ orderNumber: "", email: "" });
            }}
          >
            ← Nouvelle recherche
          </button>
        </div>
      )}
    </div>
  );
};

export default Tracking;
