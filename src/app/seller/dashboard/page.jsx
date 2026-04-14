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
  Printer,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PackageCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [vacationMode, setVacationMode] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [statsPeriod, setStatsPeriod] = useState('mois');

  // MOCKS
  const products = [
    { id: 1, name: "Sérum Anti-Âge Global", category: "Visage", price: "4500", stock: 12, badges: ["100% Naturel", "Vegan"] },
    { id: 2, name: "Crème Hydratante Nuit", category: "Visage", price: "3200", stock: 0, badges: ["Vegan"] },
    { id: 3, name: "Huile Scintillante Corps", category: "Corps", price: "2800", stock: 45, badges: ["100% Naturel", "Fait main"] },
  ];

  const orders = [
    { id: "CMD-1042", client: "Amina B.", location: "16 - Alger (Hydra)", products: 2, total: "7700 DZD", status: "attente" },
    { id: "CMD-1040", client: "Sarah M.", location: "06 - Béjaïa", products: 3, total: "10500 DZD", status: "expediee" },
  ];

  const analyticsMock = {
    revenue: "1 245 500 DZD",
    avgCart: "8 450 DZD",
    returnRate: "2.4%",
    cancelRate: "1.8%",
    stockValue: "4 250 000 DZD",
    stockOutRate: "5%",
    salesGrowth: "+15.4%",
    topProducts: [
      { id: 1, name: "Sérum Anti-Âge Global", sales: 142, revenue: "639 000", stock: 12 },
      { id: 3, name: "Huile Scintillante Corps", sales: 89, revenue: "249 200", stock: 45 },
      { id: 5, name: "Masque Argile Pure", sales: 76, revenue: "167 200", stock: 20 },
      { id: 8, name: "Brume Hydratante", sales: 64, revenue: "140 800", stock: 8 },
      { id: 10, name: "Savon Artisanal Olive", sales: 52, revenue: "41 600", stock: 100 }
    ],
    slowMovers: [
      { id: 12, name: "Crème Mains Lavande", lastSale: "22 jours", stock: 65 },
      { id: 15, name: "Baume Lèvres Coco", lastSale: "18 jours", stock: 120 },
      { id: 22, name: "Gommage Pieds Menthe", lastSale: "45 jours", stock: 30 }
    ],
    chartData: [20, 35, 25, 45, 30, 55, 65, 50, 75, 80, 70, 90] // Simple points for SVG
  };

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
        <div className="title-stack">
          <h2>Statistiques Analytiques</h2>
          <p className="sub-text">Analysez vos performances pour optimiser votre boutique.</p>
        </div>
        <div className="header-filters">
          <select 
            className="filter-select" 
            value={statsPeriod} 
            onChange={(e) => setStatsPeriod(e.target.value)}
          >
            <option value="jour">Aujourd'hui</option>
            <option value="semaine">Cette Semaine</option>
            <option value="mois">Ce Mois</option>
            <option value="annee">Cette Année</option>
          </select>
        </div>
      </div>

      {/* Row 1: KPI Grid */}
      <div className="analytics-kpi-grid">
        <div className="stat-card">
          <div className="stat-header">
            <DollarSign size={20} className="icon-gold" />
            <span>Chiffre d'Affaires</span>
          </div>
          <div className="stat-value">{analyticsMock.revenue}</div>
          <div className="stat-trend positive">
            <TrendingUp size={14} /> {analyticsMock.salesGrowth} vs période précédente
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <ShoppingCart size={20} className="icon-blue" />
            <span>Panier Moyen</span>
          </div>
          <div className="stat-value">{analyticsMock.avgCart}</div>
          <div className="stat-trend neutral">Stable ce mois</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <ArrowUpRight size={20} className="icon-red" />
            <span>Taux de retour</span>
          </div>
          <div className="stat-value">{analyticsMock.returnRate}</div>
          <div className="stat-trend negative">
            <ArrowUpRight size={14} /> +0.2% hausse légère
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <AlertCircle size={20} className="icon-gray" />
            <span>Taux d'annulation</span>
          </div>
          <div className="stat-value">{analyticsMock.cancelRate}</div>
          <div className="stat-trend positive">
            <ArrowDownRight size={14} /> -1.1% amélioration
          </div>
        </div>
      </div>

      {/* Row 2: Sales Chart */}
      <div className="chart-container-large">
        <div className="chart-header-row">
          <h3>Évolution des ventes</h3>
          <div className="chart-legend">
            <span className="legend-item"><span className="dot current"></span> Ventes (DZD)</span>
          </div>
        </div>
        <div className="custom-chart-wrapper">
          <svg viewBox="0 0 1000 300" className="analytical-svg">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="50" x2="1000" y2="50" stroke="#f0f0f0" />
            <line x1="0" y1="150" x2="1000" y2="150" stroke="#f0f0f0" />
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#f0f0f0" />
            
            {/* Area */}
            <path 
              d={`M 0 300 L ${analyticsMock.chartData.map((d, i) => `${i * 90} ${300 - d * 2.5}`).join(' L ')} L 1000 300 Z`} 
              fill="url(#chartGradient)"
            />
            {/* Main Line */}
            <path 
              d={`M ${analyticsMock.chartData.map((d, i) => `${i * 90} ${300 - d * 2.5}`).join(' L ')}`} 
              fill="none" 
              stroke="var(--color-gold)" 
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Data Points */}
            {analyticsMock.chartData.map((d, i) => (
              <circle key={i} cx={i * 90} cy={300 - d * 2.5} r="6" fill="white" stroke="var(--color-gold)" strokeWidth="3" />
            ))}
          </svg>
          <div className="chart-x-axis">
            <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
            <span>Juil</span><span>Août</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Déc</span>
          </div>
        </div>
      </div>

      {/* Row 3: Product Performance & Inventory */}
      <div className="analytics-grid-secondary">
        <div className="performance-box">
          <div className="box-header">
            <h3>Top des ventes</h3>
            <span className="badge-outline">Unités vendues</span>
          </div>
          <div className="top-products-list">
            {analyticsMock.topProducts.map((p, idx) => (
              <div key={p.id} className="top-product-item">
                <div className="p-rank">{idx + 1}</div>
                <div className="p-info">
                  <span className="p-name">{p.name}</span>
                  <span className="p-rev">{p.revenue} DA de CA</span>
                </div>
                <div className="p-bar-container">
                  <div className="p-bar" style={{ width: `${(p.sales / 150) * 100}%` }}></div>
                </div>
                <div className="p-count">{p.sales}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="inventory-analytics-stack">
          <div className="stats-box inventory-box">
            <div className="box-header">
              <h3>Analyse des Stocks</h3>
            </div>
            <div className="inventory-metrics">
              <div className="inv-metric-row">
                <div className="inv-label">Valeur financière du stock</div>
                <div className="inv-val">{analyticsMock.stockValue}</div>
              </div>
              <div className="inv-metric-row">
                <div className="inv-label">Taux de rupture critique</div>
                <div className="inv-val text-red">{analyticsMock.stockOutRate}</div>
              </div>
              <div className="inv-progress-bar">
                <div className="progress-fill warning" style={{ width: analyticsMock.stockOutRate }}></div>
              </div>
              <p className="tiny-text mt-1 text-orange"><AlertTriangle size={12} /> 2 produits phares sont proches de la rupture.</p>
            </div>
          </div>

          <div className="stats-box rotation-box">
            <div className="box-header">
              <h3>Rotation lente</h3>
              <span className="tiny-text">Alerte liquidation</span>
            </div>
            <div className="slow-movers-list">
              {analyticsMock.slowMovers.map(sm => (
                <div key={sm.id} className="slow-mover-item">
                  <div className="sm-info">
                    <span className="sm-name">{sm.name}</span>
                    <span className="sm-stock">{sm.stock} en stock</span>
                  </div>
                  <div className="sm-days">Dernière vente : {sm.lastSale}</div>
                </div>
              ))}
            </div>
          </div>
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
