"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Package,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import {
  fetchPartnerProducts,
  addPartnerProduct,
  deletePartnerProduct,
  fetchCategories,
  isAuthenticated,
} from "../lib/api";
import "./PartnerDashboard.css";

const PartnerDashboard = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category_id: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    ingredients: "",
    benefits: [],
    usage: "",
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth");
      return;
    }

    const loadData = async () => {
      try {
        const [prods, cats] = await Promise.all([
          fetchPartnerProducts(),
          fetchCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
        if (cats.length > 0) {
          setFormData((prev) => ({ ...prev, category_id: cats[0].slug }));
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newProduct = await addPartnerProduct(formData);
      setProducts([newProduct, ...products]);
      setSuccess("Produit ajouté avec succès !");
      setShowAddModal(false);
      setFormData({
        title: "",
        brand: "",
        category_id: categories[0]?.slug || "",
        price: "",
        stock: "",
        image: "",
        description: "",
        ingredients: "",
        benefits: [],
        usage: "",
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await deletePartnerProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="partner-loading container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="partner-dashboard container fade-in">
      <div className="pd-header">
        <div>
          <h1>Tableau de bord Partenaire</h1>
          <p className="subtitle">Gérez votre catalogue de produits</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          <span>Ajouter un produit</span>
        </button>
      </div>

      {success && (
        <div className="alert-success-fixed">
          <Check size={18} /> {success}
        </div>
      )}

      <div className="pd-stats">
        <div className="pd-stat-card">
          <span className="label">Total Produits</span>
          <span className="value">{products.length}</span>
        </div>
        <div className="pd-stat-card">
          <span className="label">En Stock</span>
          <span className="value">
            {products.reduce((acc, p) => acc + p.stock, 0)}
          </span>
        </div>
      </div>

      <div className="pd-products-list">
        <h2>Mes Produits</h2>
        {products.length === 0 ? (
          <div className="pd-empty">
            <Package size={48} />
            <p>Vous n'avez pas encore ajouté de produits.</p>
            <button
              className="btn btn-outline"
              onClick={() => setShowAddModal(true)}
            >
              Ajouter mon premier produit
            </button>
          </div>
        ) : (
          <div className="pd-table-wrapper">
            <table className="pd-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="td-product">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/50"
                          }
                          alt=""
                        />
                        <div>
                          <span className="p-title">{product.title}</span>
                          <span className="p-brand">{product.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td>{product.category_title}</td>
                    <td>{product.price.toLocaleString()} DA</td>
                    <td>
                      <span
                        className={`stock-status ${product.stock < 10 ? "low" : ""}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="td-actions">
                        <button className="icon-btn-edit">
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="icon-btn-delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">
            <div className="modal-header">
              <h3>Nouveau Produit</h3>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="pd-form">
              {error && (
                <div className="alert-error">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Nom du produit</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Crème Hydratante"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Marque</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre marque"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({ ...formData, category_id: e.target.value })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group half">
                  <label>Prix (DA)</label>
                  <input
                    type="number"
                    required
                    placeholder="6500"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="form-group half">
                  <label>Stock</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>URL de l'image principale</label>
                <div className="input-with-icon">
                  <ImageIcon size={18} />
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description du produit</label>
                <textarea
                  required
                  placeholder="Décrivez les propriétés de votre produit..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-group">
                <label>Ingrédients (conseillé)</label>
                <textarea
                  placeholder="Liste INCI des ingrédients..."
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Envoi..." : "Publier le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerDashboard;
