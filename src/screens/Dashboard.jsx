"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  MapPin, 
  Settings,
  Package,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';
import '../app/seller/dashboard/Dashboard.css';
import './Dashboard.css';

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');

  // MOCK DATA for Customer UI validation
  const mockOrders = [
    { id: "CMD-2089", date: "11/04/2026", total: "15 400 DZD", items: "Sérum Anti-Âge, Crème Nuit", status: "preparation" },
    { id: "CMD-1902", date: "28/03/2026", total: "4 200 DZD", items: "Huile Scintillante Corps", status: "livree" },
  ];

  const mockAddresses = [
    { id: 1, title: "Domicile", name: "Amina B.", phone: "0555 12 34 56", wilaya: "16 - Alger", commune: "Hydra", address: "Résidence Chaabani, Bâtiment C" },
    { id: 2, title: "Bureau", name: "Amina B.", phone: "0770 98 76 54", wilaya: "31 - Oran", commune: "Oran Centre", address: "Rue Larbi Ben M'hidi, 2ème étage" },
  ];

  const mockWishlist = [
    { id: 101, name: "Gommage Exfoliant Doux", category: "Visage", price: "2800 DZD" },
    { id: 102, name: "Masque Capillaire Argan", category: "Cheveux", price: "3500 DZD" },
  ];

  const getStatusDisplay = (status) => {
    switch(status) {
      case 'preparation': return { label: "En préparation", class: "status-warning" };
      case 'expediee': return { label: "Expédiée", class: "status-info" };
      case 'livree': return { label: "Livrée", class: "status-success" };
      default: return { label: status, class: "" };
    }
  };

  const renderOrders = () => (
    <div className="customer-tab fade-in">
      <h2>Mes Commandes</h2>
      <p className="sub-text">Consultez l'historique et le statut en temps réel de vos achats.</p>

      <div className="orders-list">
        {mockOrders.map(order => {
          const status = getStatusDisplay(order.status);
          return (
            <div key={order.id} className="customer-order-card">
              <div className="order-header">
                <div>
                  <strong>Commande #{order.id}</strong>
                  <span className="order-date">Passée le {order.date}</span>
                </div>
                <span className={`order-badge ${status.class}`}>{status.label}</span>
              </div>
              <div className="order-body">
                <p><strong>Articles :</strong> {order.items}</p>
                <p className="order-total">Total : {order.total}</p>
              </div>
              <div className="order-footer">
                <button className="btn-secondary small">Voir la facture</button>
                <button className="btn-link">Suivre mon colis</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="customer-tab fade-in">
      <div className="flex-between">
        <h2>Mon Carnet d'Adresses</h2>
        <button className="btn-primary small"><Plus size={16} /> Nouvelle adresse</button>
      </div>

      <div className="address-grid mt-2">
        {mockAddresses.map(addr => (
          <div key={addr.id} className="address-card">
            <h3>{addr.title}</h3>
            <p><strong>{addr.name}</strong></p>
            <p>{addr.phone}</p>
            <p>{addr.address}</p>
            <p>{addr.commune}, {addr.wilaya}</p>
            
            <div className="address-actions mt-2">
              <button className="btn-secondary small"><Edit2 size={16} /> Modifier</button>
              <button className="btn-secondary small danger"><Trash2 size={16} /> Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="customer-tab fade-in">
      <h2>Ma Liste d'Envies</h2>
      <p className="sub-text">Vos produits coup de cœur mis de côté pour vos prochains achats.</p>

      <div className="wishlist-grid mt-2">
        {mockWishlist.map(item => (
          <div key={item.id} className="wishlist-card">
            <div className="wishlist-img-placeholder">Image Produit</div>
            <div className="wishlist-info">
              <h4>{item.name}</h4>
              <p className="category">{item.category}</p>
              <p className="price">{item.price}</p>
              <button className="btn-primary outline full-width mt-1">Ajouter au panier</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="customer-tab fade-in">
      <h2>Mes Informations Personnelles</h2>
      
      <div className="settings-section mt-2">
        <div className="form-group">
          <label>Nom complet</label>
          <input type="text" defaultValue="Amina B." />
        </div>
        <div className="form-group">
          <label>Numéro de Téléphone (10 chiffres)</label>
          <input type="tel" defaultValue="0555123456" />
        </div>
        <div className="form-group">
          <label>Adresse Email</label>
          <input type="email" defaultValue="amina@example.com" disabled />
          <p className="sub-text">Contactez le support pour modifier votre email.</p>
        </div>
      </div>

      <div className="settings-section">
        <h3>Sécurité</h3>
        <div className="form-group">
          <label>Nouveau mot de passe</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button className="btn-primary">Mettre à jour mes informations</button>
      </div>
    </div>
  );

  return (
    <div className="customer-dashboard layout">
      {/* SIDEBAR CLIENT */}
      <aside className="dashboard-sidebar customer-sidebar">
        <div className="sidebar-brand customer-brand">
          <User size={40} className="profile-icon" />
          <div className="profile-info">
            <span className="profile-name">Bienvenue, Amina</span>
            <span className="profile-type">Client Hilytouch</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <ShoppingBag size={20} /> Mes Commandes
          </button>
          <button className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>
            <MapPin size={20} /> Mon Carnet d'Adresses
          </button>
          <button className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>
            <Heart size={20} /> Ma Liste d'Envies
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Informations Personnelles
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => router.push('/')}>
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'addresses' && renderAddresses()}
        {activeTab === 'wishlist' && renderWishlist()}
        {activeTab === 'settings' && renderPersonalInfo()}
      </main>
    </div>
  );
};

export default Dashboard;
