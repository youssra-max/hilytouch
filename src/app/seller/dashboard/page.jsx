"use client";
import React, { useState } from 'react';
import './Dashboard.css';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Printer
} from 'lucide-react';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [vacationMode, setVacationMode] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // MOCKS
  const products = [
    { id: 1, name: "Sérum Anti-Âge Global", category: "Visage", price: "4500", stock: 12, badges: ["100% Naturel", "Vegan"] },
    { id: 2, name: "Crème Hydratante Nuit", category: "Visage", price: "3200", stock: 0, badges: ["Vegan"] },
    { id: 3, name: "Huile Scintillante Corps", category: "Corps", price: "2800", stock: 45, badges: ["100% Naturel", "Fait main"] },
  ];

  const orders = [
    { id: "CMD-1042", client: "Amina B.", location: "16 - Alger (Hydra)", products: 2, total: "7700 DZD", status: "attente" },
    { id: "CMD-1041", client: "Yasmine S.", location: "31 - Oran (Centre)", products: 1, total: "3200 DZD", status: "preparation" },
    { id: "CMD-1040", client: "Sarah M.", location: "06 - Béjaïa", products: 3, total: "10500 DZD", status: "expediee" },
  ];

  /* ------------ RENDER TABS ------------ */

  const renderOverview = () => (
    <div className="tab-content fade-in">
      <div className="dashboard-header">
        <h2>Vue d'ensemble</h2>
        <div className="header-actions">
          <button className="notification-btn">
            <Bell size={20} />
            <span className="badge">3</span>
          </button>
        </div>
      </div>

      <div className="kpi-cards">
        <div className="kpi-card">
          <h3>Chiffre d'affaires (Mois)</h3>
          <p className="kpi-value">145 500 DZD</p>
          <span className="kpi-trend positive">+12% vs mois dernier</span>
        </div>
        <div className="kpi-card">
          <h3>Commandes en attente</h3>
          <p className="kpi-value">8</p>
          <span className="kpi-trend neutral">À préparer aujourd'hui</span>
        </div>
        <div className="kpi-card">
          <h3>Produits Actifs</h3>
          <p className="kpi-value">24</p>
          <span className="kpi-trend negative">1 produit en rupture</span>
        </div>
      </div>

      <div className="alerts-section">
        <h3>Alertes & Notifications</h3>
        <div className="alert-box warning">
          <AlertCircle size={20} />
          <div>
            <strong>Rupture de Stock :</strong> Le produit "Crème Hydratante Nuit" est épuisé.
          </div>
        </div>
        <div className="alert-box info">
          <ShoppingCart size={20} />
          <div>
            <strong>Nouvelles commandes :</strong> Vous avez 3 nouvelles commandes en attente de préparation.
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => {
    if (isAddingProduct) return renderAddProductForm();
    
    return (
      <div className="tab-content fade-in">
        <div className="dashboard-header">
          <h2>Mes Produits</h2>
          <button className="btn-primary" onClick={() => setIsAddingProduct(true)}>
            <Plus size={18} /> Ajouter un produit
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Badges</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.category}</td>
                  <td>{p.price} DZD</td>
                  <td>
                    {p.stock === 0 ? (
                      <span className="status-badge error">Rupture</span>
                    ) : (
                      <span className="status-badge success">{p.stock} unités</span>
                    )}
                  </td>
                  <td>
                    <div className="badges-list">
                      {p.badges.map((b, i) => <span key={i} className="small-badge">{b}</span>)}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn edit"><Edit2 size={16} /></button>
                    <button className="action-btn delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAddProductForm = () => (
    <div className="tab-content fade-in">
      <div className="dashboard-header">
        <h2>Ajouter un Nouveau Produit</h2>
        <button className="btn-secondary" onClick={() => setIsAddingProduct(false)}>Annuler</button>
      </div>

      <div className="settings-section">
        <h3>Informations Générales</h3>
        <div className="form-group">
          <label>Titre du produit *</label>
          <input type="text" placeholder="Ex: Sérum Hydratant Extrême" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Catégorie *</label>
            <select>
              <option>Visage</option>
              <option>Corps</option>
              <option>Cheveux</option>
              <option>Maquillage</option>
            </select>
          </div>
          <div className="form-group">
            <label>Prix de vente (DZD) *</label>
            <input type="number" placeholder="Ex: 3500" />
          </div>
        </div>
        <div className="form-group">
          <label>Description (Bienfaits, Utilisation) *</label>
          <textarea rows="4" placeholder="Décrivez votre produit en détail..."></textarea>
        </div>
        <div className="form-group">
          <label>Quantité en stock *</label>
          <input type="number" placeholder="Ex: 50" />
          <p className="sub-text">Inscrivez 0 pour marquer automatiquement le produit en rupture.</p>
        </div>
      </div>

      <div className="settings-section">
        <h3>Spécificités Cosmétiques</h3>
        <div className="form-group">
          <label>Liste des Ingrédients (Norme INCI) *</label>
          <textarea rows="3" placeholder="Aqua, Glycerin, Rosa Damascena Flower Water..."></textarea>
        </div>
        
        <div className="form-group">
          <label>Badges (Labels & Mentions)</label>
          <div className="badges-checkboxes">
            <label className="checkbox-label"><input type="checkbox" /> 100% Naturel</label>
            <label className="checkbox-label"><input type="checkbox" /> Vegan</label>
            <label className="checkbox-label"><input type="checkbox" /> Sans Parabène</label>
            <label className="checkbox-label"><input type="checkbox" /> Fait main (Artisanal)</label>
            <label className="checkbox-label"><input type="checkbox" /> Cruelty Free</label>
          </div>
        </div>

        <div className="form-group mt-2">
          <label>Date de péremption (DLUO)</label>
          <input type="date" />
        </div>
      </div>

      <div className="settings-section">
        <h3>Photos du produit</h3>
        <div className="form-group">
          <div className="upload-zone">
            <span>Glisser-déposer vos photos ici (Max 5 images. La première sera la photo principale)</span>
            <input type="file" multiple accept="image/*" style={{display: 'none'}} />
          </div>
        </div>
      </div>

      <div className="form-actions" style={{textAlign: 'right', marginBottom: '2rem'}}>
        <button className="btn-primary" onClick={() => setIsAddingProduct(false)}>Enregistrer le produit</button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="tab-content fade-in">
      <div className="dashboard-header">
        <h2>Mes Commandes</h2>
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Rechercher une commande..." />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client / Lieu</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>
                  <strong>{o.client}</strong><br/>
                  <span className="sub-text">{o.location}</span>
                </td>
                <td>{o.total}</td>
                <td>
                  <select className={`status-select ${o.status}`} defaultValue={o.status}>
                    <option value="attente">En attente</option>
                    <option value="preparation">En préparation</option>
                    <option value="prete">Prête pour expédition</option>
                    <option value="expediee">Expédiée</option>
                    <option value="annulee">Annulée</option>
                  </select>
                </td>
                <td>
                  <button className="btn-secondary small">
                    <Printer size={16} /> Bon de livraison
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="tab-content fade-in">
      <div className="dashboard-header">
        <h2>Statistiques & Rapports</h2>
        <select className="filter-select">
          <option>Ce mois-ci</option>
          <option>Cette année</option>
          <option>Tout le temps</option>
        </select>
      </div>

      <div className="chart-placeholder">
        <BarChart3 size={48} color="var(--color-gold)" />
        <p>Graphique d'évolution du CA (Intégration Recharts à venir)</p>
      </div>

      <div className="stats-grid">
        <div className="stats-box">
          <h3>Top 3 Produits les plus vendus</h3>
          <ol className="top-list">
            <li>1. Sérum Anti-Âge Global (142 ventes)</li>
            <li>2. Huile Scintillante Corps (89 ventes)</li>
            <li>3. Crème de Jour Aloe Vera (64 ventes)</li>
          </ol>
        </div>
        <div className="stats-box commissions">
          <h3>Commissions Hilytouch</h3>
          <p>Montant prélevé ce mois : <strong>21 825 DZD</strong> (15%)</p>
          <a href="#" className="link-text">Voir le détail du reversement</a>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="tab-content fade-in">
      <div className="dashboard-header">
        <h2>Paramètres de la Boutique</h2>
      </div>

      <div className="settings-section">
        <h3>Profil de la Marque</h3>
        <div className="form-group">
          <label>Nom de la boutique</label>
          <input type="text" defaultValue="Maison de Beauté Bio" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea rows="3" defaultValue="Spécialiste en soins de la peau 100% naturels." />
        </div>
      </div>

      <div className="settings-section">
        <h3>Informations Bancaires</h3>
        <div className="form-group">
          <label>Numéro de Compte (RIP / CCP)</label>
          <input type="text" defaultValue="007 99999 123456789 25" />
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h3>Mode Vacances</h3>
        <p className="sub-text">Activez ce mode pour désactiver temporairement l'achat de vos produits si vous ne pouvez pas traiter les commandes.</p>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={vacationMode} 
            onChange={() => setVacationMode(!vacationMode)} 
          />
          <span className="slider"></span>
          <span className="toggle-label">{vacationMode ? "Mode Vacances Activé" : "Activer le Mode Vacances"}</span>
        </label>
      </div>

    </div>
  );

  return (
    <div className="seller-dashboard layout">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          Hilytouch <span className="seller-badge">Partner</span>
        </div>
        
        <nav className="sidebar-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Vue d'ensemble
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => { setActiveTab('products'); setIsAddingProduct(false); }}>
            <Package size={20} /> Mes Produits
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} /> Mes Commandes
          </button>
          <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
            <BarChart3 size={20} /> Statistiques
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Paramètres
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
}
