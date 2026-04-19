"use client";
import React, { useState } from "react";
import "./Register.css";
import { getWilayas, getCommunesByWilayaId } from "algeria-locations";
import {
  Store,
  User,
  MapPin,
  FileText,
  CreditCard,
  ShieldCheck,
  Upload,
  CheckCircle2,
} from "lucide-react";

export default function SellerRegisterPage() {
  const [formData, setFormData] = useState({
    vendorType: "",
    brandName: "",
    brandDescription: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    wilaya_id: "",
    wilaya_name: "",
    address: "",
    legalNumber: "",
    nif: "",
    nis: "",
    paymentMethod: "",
    rib: "",
    accountName: "",
    acceptedTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Get Wilayas dynamically
  const wilayas = getWilayas();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si c'est un changement de wilaya, on réinitialise la commune et on sauvegarde l'id + le nom
    if (name === "wilaya_id") {
      const selectedWilaya = wilayas.find((w) => w.id === parseInt(value));
      setFormData({
        ...formData,
        wilaya_id: value,
        wilaya_name: selectedWilaya
          ? `${selectedWilaya.code} - ${selectedWilaya.name}`
          : "",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Formulaire soumis:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="register-container fade-in">
        <div className="register-success">
          <CheckCircle2 size={64} color="var(--color-gold)" />
          <h2>Demande Envoyée</h2>
          <p>
            Merci de vouloir rejoindre Hilytouch ! Votre demande d'inscription a
            bien été transmise à notre équipe. Vous recevrez un email de
            confirmation dès que votre compte aura été validé.
          </p>
          <a href="/" className="btn-return">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container fade-in">
      <div className="register-header">
        <h1>Vendre sur Hilytouch</h1>
        <p>
          Rejoignez la première marketplace de beauté et soins, et touchez des
          milliers de clients.
        </p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        {/* SECTION 1 */}
        <section className="form-section">
          <div className="section-title">
            <Store className="section-icon" />
            <h2>1. Informations sur la Marque / L'Atelier</h2>
          </div>

          <div className="form-group vendor-type-group">
            <label className="radio-label">
              <input
                type="radio"
                name="vendorType"
                value="marque"
                onChange={handleChange}
                required
              />
              <span>Marque Officielle (Entreprise)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="vendorType"
                value="artisan"
                onChange={handleChange}
                required
              />
              <span>Artisan / Créateur Bio</span>
            </label>
          </div>

          <div className="form-group">
            <label>Nom de la Marque / Boutique *</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              required
              placeholder="Ex: Maison Hily"
            />
          </div>

          <div className="form-group">
            <label>Description courte de la marque *</label>
            <textarea
              name="brandDescription"
              value={formData.brandDescription}
              onChange={handleChange}
              required
              placeholder="Présentez votre marque et vos produits en quelques lignes."
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Logo de la marque</label>
            <div className="file-upload">
              <Upload size={20} />
              <span>Importer votre logo (PNG, JPG)</span>
              <input type="file" accept="image/*" />
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="form-section">
          <div className="section-title">
            <User className="section-icon" />
            <h2>2. Informations du Responsable (Contact interne)</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prénom *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Adresse Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="contact@marque.com"
              />
            </div>
            <div className="form-group">
              <label>Numéro de Téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="05XX XX XX XX"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mot de passe *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmer le mot de passe *</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="form-section">
          <div className="section-title">
            <MapPin className="section-icon" />
            <h2>3. Localisation</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Wilaya *</label>
              <select
                name="wilaya_id"
                value={formData.wilaya_id}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une wilaya</option>
                {wilayas.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} - {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Adresse exacte de l'atelier / local *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Rue, Bâtiment..."
            />
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="form-section">
          <div className="section-title">
            <FileText className="section-icon" />
            <h2>4. Documents Légaux</h2>
          </div>

          <div className="form-group">
            <label>
              Numéro de Registre de Commerce (RC) ou Carte Artisan *
            </label>
            <input
              type="text"
              name="legalNumber"
              value={formData.legalNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>NIF (Numéro d'Identification Fiscale) *</label>
              <input
                type="text"
                name="nif"
                value={formData.nif}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>NIS (Numéro d'Identification Statistique)</label>
              <input
                type="text"
                name="nis"
                value={formData.nis}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Document justificatif (RC ou Carte artisan) *</label>
            <div className="file-upload">
              <Upload size={20} />
              <span>Importer votre document (PDF, JPG, PNG)</span>
              <input type="file" accept=".pdf,image/*" required />
            </div>
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="form-section">
          <div className="section-title">
            <CreditCard className="section-icon" />
            <h2>5. Informations de Paiement</h2>
          </div>

          <div className="form-group">
            <label>Méthode de paiement souhaitée *</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="virement">Virement Bancaire</option>
              <option value="ccp">CCP</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>RIP / RIB *</label>
              <input
                type="text"
                name="rib"
                value={formData.rib}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nom du titulaire du compte *</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* SECTION 6 */}
        <section className="form-section terms-section">
          <div className="section-title">
            <ShieldCheck className="section-icon" />
            <h2>6. Engagements</h2>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              required
            />
            <span>
              J'ai lu et j'accepte les{" "}
              <a
                href="/legal"
                className="terms-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conditions Générales de Vente et d'Utilisation
              </a>{" "}
              de la marketplace Hilytouch.
            </span>
          </label>
        </section>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Soumettre ma candidature
          </button>
        </div>
      </form>
    </div>
  );
}
