"use client";
import React, { useState } from 'react';
import '../../seller/dashboard/Dashboard.css';
import './Admin.css';
import { 
  ShieldCheck, 
  Users, 
  PackageSearch, 
  Headset, 
  Landmark, 
  LayoutDashboard, 
  BarChart, 
  CheckCircle, 
  XCircle, 
  ShieldBan,
  Search,
  Eye,
  Edit,
  LogOut,
  CreditCard,
  UserPlus
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  // MOCK DATA
  const [users, setUsers] = useState([
    { id: 1, name: "Amine Rahmani", email: "amine@hilytouch.dz", role: "Super Admin", status: "actif" },
    { id: 2, name: "Yasmine Belkacem", email: "yasmine@hilytouch.dz", role: "Modérateur Produits", status: "actif" },
    { id: 3, name: "Karim Brahimi", email: "karim@sav.dz", role: "Service Client", status: "actif" },
    { id: 4, name: "Sarah Louni", email: "sarah@compta.dz", role: "Comptable", status: "actif" },
  ]);

  const allRoles = ["Super Admin", "Modérateur Produits", "Service Client", "Comptable"];

  const pendingSellers = [
    { id: 1, name: "Maison de Beauté Bio", contact: "Amina T.", type: "Artisan", doc: "carte-artisan.pdf", date: "Aujourd'hui" },
    { id: 2, name: "Luxe Cosmétiques", contact: "Karim B.", type: "Marque", doc: "registre-commerce.pdf", date: "Hier" },
  ];

  const allOrders = [
    { id: "CMD-1042", client: "Amina B.", seller: "Maison de Beauté Bio", total: "7700 DZD", status: "attente", date: "11/04/2026" },
    { id: "CMD-1041", client: "Yasmine S.", seller: "Naturel dz", total: "3200 DZD", status: "preparation", date: "10/04/2026" },
    { id: "CMD-1040", client: "Sarah M.", seller: "Luxe Cosmétiques", total: "10500 DZD", status: "expediee", date: "09/04/2026" },
  ];

  const finances = [
    { seller: "Maison de Beauté Bio", pendingAmount: "45000 DZD", commission: "7940 DZD", status: "due" },
    { seller: "Naturel dz", pendingAmount: "12800 DZD", commission: "2250 DZD", status: "paid" },
  ];

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  /* ------------ RENDER TABS ------------ */

  const renderUsers = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <h2>Gestion des Rôles & Utilisateurs Internes</h2>
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Rechercher un membre de l'équipe..." />
        </div>
      </div>
      
      <div className="admin-section">
        <div className="section-header-row">
          <h3>Membres de l'équipe</h3>
          <button className="btn-approve small"><UserPlus size={16} /> Ajouter un membre</button>
        </div>
        <p className="sub-text">Définissez les permissions pour chaque membre de l'équipe Hilytouch.</p>
        
        <div className="table-container mt-4">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle actuel</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>
                    <select 
                      className="role-select" 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      {allRoles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </td>
                  <td><span className="status-badge success">{user.status}</span></td>
                  <td className="actions-cell">
                    <button className="btn-icon danger" title="Désactiver l'accès"><ShieldBan size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="roles-info-grid mt-4">
        <div className="role-guide-card">
          <h4><ShieldCheck size={18} /> Super Admin</h4>
          <p>Accès total à toute la plateforme, finances et configuration système.</p>
        </div>
        <div className="role-guide-card">
          <h4><PackageSearch size={18} /> Modérateur Produits</h4>
          <p>Peut valider les nouveaux produits et éditer le catalogue.</p>
        </div>
        <div className="role-guide-card">
          <h4><Headset size={18} /> Service Client</h4>
          <p>Gestion des commandes, des litiges et suivi client.</p>
        </div>
        <div className="role-guide-card">
          <h4><Landmark size={18} /> Comptable</h4>
          <p>Accès aux reversements vendeurs et statistiques financières.</p>
        </div>
      </div>
    </div>
  );

  const renderSellers = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <h2>Modération et Gestion des Vendeurs</h2>
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Rechercher un vendeur..." />
        </div>
      </div>

      <div className="admin-section">
        <h3>Nouvelles inscriptions (En attente d'approbation)</h3>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Marque / Atelier</th>
                <th>Type</th>
                <th>Contact</th>
                <th>Document Légaux</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSellers.map(seller => (
                <tr key={seller.id} className="highlight-row">
                  <td><strong>{seller.name}</strong></td>
                  <td><span className="badge-type">{seller.type}</span></td>
                  <td>{seller.contact}</td>
                  <td><button className="btn-link"><Eye size={16} /> {seller.doc}</button></td>
                  <td>{seller.date}</td>
                  <td className="actions-cell">
                    <button className="btn-approve" title="Approuver et envoyer l'email"><CheckCircle size={18} /> Approuver</button>
                    <button className="btn-reject" title="Rejeter la demande"><XCircle size={18} /> Rejeter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section mt-4">
        <h3>Vendeurs Actifs</h3>
        <p className="sub-text">Gérez les comptes vendeurs existants et leurs informations de paiement.</p>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Boutique</th>
                <th>Email</th>
                <th>Méthode Paiement</th>
                <th>Statut</th>
                <th>Actions Administratives</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Naturel dz</strong></td>
                <td>contact@natureldz.com</td>
                <td>CCP: 456789 12</td>
                <td><span className="status-badge success">Actif</span></td>
                <td className="actions-cell">
                  <button className="btn-icon"><Edit size={16} /></button>
                  <button className="btn-icon danger" title="Suspendre le vendeur"><ShieldBan size={16} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <h2>Contrôle du Catalogue Produits</h2>
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Rechercher par nom, marque..." />
        </div>
      </div>
      <p className="sub-text">Seul l'administrateur peut modérer le contenu pour assurer la qualité de la marketplace (Photos, Ingrédients).</p>

      <div className="table-container mt-4">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Vendeur</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Qualité Fiche</th>
              <th>Actions Modérateur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sérum Anti-Âge Global</td>
              <td>Maison de Beauté Bio</td>
              <td>Visage</td>
              <td>4500 DZD</td>
              <td><span className="status-badge success">Complète (INCI OK)</span></td>
              <td className="actions-cell">
                <button className="btn-secondary small"><Edit size={16} /> Éditer</button>
                <button className="btn-secondary small danger"><Eye size={16} /> Masquer</button>
              </td>
            </tr>
            <tr>
              <td>Crème Basique</td>
              <td>Luxe Cosmétiques</td>
              <td>Corps</td>
              <td>1500 DZD</td>
              <td><span className="status-badge warning">Ingrédients manquants</span></td>
              <td className="actions-cell">
                <button className="btn-secondary small"><Edit size={16} /> Éditer</button>
                <button className="btn-secondary small danger"><Eye size={16} /> Masquer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <h2>Suivi Global des Commandes (Service Client)</h2>
        <div className="search-filters">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="N° Commande, Client, Vendeur..." />
          </div>
          <select className="filter-select">
            <option>Tous les statuts</option>
            <option>En préparation</option>
            <option>Litiges</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Commande</th>
              <th>Client</th>
              <th>Vendeur</th>
              <th>Date</th>
              <th>Total</th>
              <th>Statut Global</th>
              <th>Action Service Client</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map(o => (
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td>{o.client}</td>
                <td>{o.seller}</td>
                <td>{o.date}</td>
                <td>{o.total}</td>
                <td>
                  <span className={`status-badge ${o.status !== 'annulee' ? 'success' : 'error'}`}>{o.status}</span>
                </td>
                <td className="actions-cell">
                  <button className="btn-secondary small">Détails / Gérer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFinances = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <h2>Comptabilité & Reversements</h2>
      </div>

      <div className="kpi-cards">
        <div className="kpi-card financial-total">
          <h3>Volume d'affaires global (Mois)</h3>
          <p className="kpi-value">6 450 000 DZD</p>
        </div>
        <div className="kpi-card financial-commissions">
          <h3>Commissions Hilytouch (Bénéfice)</h3>
          <p className="kpi-value">967 500 DZD</p>
        </div>
        <div className="kpi-card financial-due">
          <h3>À reverser aux vendeurs</h3>
          <p className="kpi-value">5 482 500 DZD</p>
        </div>
      </div>

      <div className="admin-section mt-4">
        <h3>Gestion des paiements vendeurs</h3>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vendeur</th>
                <th>Ventes terminées (Total)</th>
                <th>Commission Hilytouch</th>
                <th>Montant à Reverser</th>
                <th>Solde / Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {finances.map((f, index) => (
                <tr key={index}>
                  <td><strong>{f.seller}</strong></td>
                  <td>{parseInt(f.pendingAmount) + parseInt(f.commission)} DZD</td>
                  <td>{f.commission}</td>
                  <td className="highlight-amount">{f.pendingAmount}</td>
                  <td>
                    {f.status === 'due' ? (
                      <span className="status-badge warning">Virement en attente</span>
                    ) : (
                      <span className="status-badge success">Solde Payé</span>
                    )}
                  </td>
                  <td>
                    {f.status === 'due' && (
                      <button className="btn-pay"><CreditCard size={16} /> Marquer comme payé</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard layout">
      {/* SIDEBAR SUPER ADMIN */}
      <aside className="dashboard-sidebar super-admin-sidebar">
        <div className="sidebar-brand admin-brand">
          Hilytouch <span className="seller-badge admin-badge">Super Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            <ShieldCheck size={20} /> Rôles & Équipe
          </button>
          <button className={activeTab === 'sellers' ? 'active' : ''} onClick={() => setActiveTab('sellers')}>
            <Users size={20} /> Vendeurs & Modération
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            <PackageSearch size={20} /> Catalogue Produits
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <Headset size={20} /> Suivi Commandes
          </button>
          <button className={activeTab === 'finances' ? 'active' : ''} onClick={() => setActiveTab('finances')}>
            <Landmark size={20} /> Finance & Reversements
          </button>
          <button className={activeTab === 'cms' ? 'active' : ''} onClick={() => setActiveTab('cms')}>
            <LayoutDashboard size={20} /> Interface (CMS)
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={20} /> Quitter
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main admin-main-content">
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'sellers' && renderSellers()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'finances' && renderFinances()}
        {activeTab === 'cms' && <div className="tab-content"><h2>CMS en cours...</h2></div>}
      </main>
    </div>
  );
}
