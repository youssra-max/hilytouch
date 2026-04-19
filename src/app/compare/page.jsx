"use client";
import React, { useState } from "react";
import { ArrowLeft, Check, X, ShieldCheck } from "lucide-react";
import Link from "next/link";
import "./Compare.css";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Sérum Anti-Âge Global",
    brand: "Maison de Beauté Bio",
    price: "4500 DZD",
    rating: 4.8,
    type: "Sérum Visage",
    use: "Quotidien (Matin/Soir)",
    size: "30ml",
    vegan: true,
    bio: true,
    origin: "Algérie",
    img: "https://via.placeholder.com/250x300?text=Serum+Anti-Age",
  },
  {
    id: 2,
    name: "Huile Éclat Vitamine C",
    brand: "Naturel DZ",
    price: "3200 DZD",
    rating: 4.5,
    type: "Huile Visage",
    use: "Soir uniquement",
    size: "50ml",
    vegan: true,
    bio: false,
    origin: "France",
    img: "https://via.placeholder.com/250x300?text=Huile+Eclat",
  },
  {
    id: 3,
    name: "Crème Hydratation Intense",
    brand: "Luxe Cosmétiques",
    price: "5200 DZD",
    rating: 4.9,
    type: "Crème Visage",
    use: "Matin",
    size: "50ml",
    vegan: false,
    bio: true,
    origin: "Algérie",
    img: "https://via.placeholder.com/250x300?text=Creme+Hydratation",
  },
];

export default function ComparePage() {
  const [prod1, setProd1] = useState(MOCK_PRODUCTS[0]);
  const [prod2, setProd2] = useState(MOCK_PRODUCTS[1]);

  return (
    <div className="compare-page container fade-in">
      <div className="compare-header">
        <Link href="/shop" className="back-link">
          <ArrowLeft size={18} /> Retour à la boutique
        </Link>
        <h1>Comparateur de Produits</h1>
        <p>
          Prenez la meilleure décision pour votre peau en comparant nos soins
          experts.
        </p>
      </div>

      <div className="compare-selectors">
        <div className="selector-group">
          <label>Produit 1 :</label>
          <select
            value={prod1.id}
            onChange={(e) =>
              setProd1(
                MOCK_PRODUCTS.find((p) => p.id === parseInt(e.target.value)),
              )
            }
          >
            {MOCK_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.brand})
              </option>
            ))}
          </select>
        </div>
        <div className="selector-group">
          <label>Produit 2 :</label>
          <select
            value={prod2.id}
            onChange={(e) =>
              setProd2(
                MOCK_PRODUCTS.find((p) => p.id === parseInt(e.target.value)),
              )
            }
          >
            {MOCK_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.brand})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-table-container">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="feature-column">Critères</th>
              <th>
                <div className="product-summary">
                  <div className="compare-img-placeholder">Image</div>
                  <h3>{prod1.name}</h3>
                  <p className="brand">{prod1.brand}</p>
                  <p className="price">{prod1.price}</p>
                  <button className="btn-primary small mt-1">
                    Ajouter au panier
                  </button>
                </div>
              </th>
              <th>
                <div className="product-summary">
                  <div className="compare-img-placeholder">Image</div>
                  <h3>{prod2.name}</h3>
                  <p className="brand">{prod2.brand}</p>
                  <p className="price">{prod2.price}</p>
                  <button className="btn-primary small mt-1">
                    Ajouter au panier
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-label">Note Client</td>
              <td>⭐ {prod1.rating} / 5</td>
              <td>⭐ {prod2.rating} / 5</td>
            </tr>
            <tr>
              <td className="feature-label">Type de Soin</td>
              <td>{prod1.type}</td>
              <td>{prod2.type}</td>
            </tr>
            <tr>
              <td className="feature-label">Contenance</td>
              <td>{prod1.size}</td>
              <td>{prod2.size}</td>
            </tr>
            <tr>
              <td className="feature-label">Application</td>
              <td>{prod1.use}</td>
              <td>{prod2.use}</td>
            </tr>
            <tr className="section-row">
              <td colSpan="3">
                <ShieldCheck size={18} /> Labels & Engagements
              </td>
            </tr>
            <tr>
              <td className="feature-label">Vegan</td>
              <td>
                {prod1.vegan ? (
                  <Check color="#27ae60" />
                ) : (
                  <X color="#e74c3c" />
                )}
              </td>
              <td>
                {prod2.vegan ? (
                  <Check color="#27ae60" />
                ) : (
                  <X color="#e74c3c" />
                )}
              </td>
            </tr>
            <tr>
              <td className="feature-label">Certifié Bio</td>
              <td>
                {prod1.bio ? <Check color="#27ae60" /> : <X color="#e74c3c" />}
              </td>
              <td>
                {prod2.bio ? <Check color="#27ae60" /> : <X color="#e74c3c" />}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
