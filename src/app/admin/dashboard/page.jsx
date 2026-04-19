"use client";
import React, { useState, useEffect } from "react";
import "../../seller/dashboard/Dashboard.css";
import "./Admin.css";
import {
  ShieldCheck,
  Users,
  PackageSearch,
  Headset,
  Landmark,
  LayoutDashboard,
  Search,
  Eye,
  Edit,
  LogOut,
  CreditCard,
  UserPlus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  ShoppingBag,
  ArrowUpRight,
  BarChart3,
  ShieldBan,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stats");
  const [statsPeriod, setStatsPeriod] = useState("mois");

  // MOCK DATA
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Amine Rahmani",
      email: "amine@hilytouch.dz",
      role: "Super Admin",
      status: "actif",
    },
    {
      id: 2,
      name: "Yasmine Belkacem",
      email: "yasmine@hilytouch.dz",
      role: "Modérateur Produits",
      status: "actif",
    },
    {
      id: 3,
      name: "Karim Brahimi",
      email: "karim@sav.dz",
      role: "Service Client",
      status: "actif",
    },
    {
      id: 4,
      name: "Sarah Louni",
      email: "sarah@compta.dz",
      role: "Comptable",
      status: "actif",
    },
  ]);

  const allRoles = [
    "Super Admin",
    "Modérateur Produits",
    "Service Client",
    "Comptable",
  ];

  const pendingSellers = [
    {
      id: 1,
      name: "Maison de Beauté Bio",
      contact: "Amina T.",
      type: "Artisan",
      doc: "carte-artisan.pdf",
      date: "Aujourd'hui",
    },
    {
      id: 2,
      name: "Luxe Cosmétiques",
      contact: "Karim B.",
      type: "Marque",
      doc: "registre-commerce.pdf",
      date: "Hier",
    },
  ];

  const [ordersList, setOrdersList] = useState([]);

  // Load from Storage on Mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("hilytouch_orders");
    if (savedOrders) {
      setOrdersList(JSON.parse(savedOrders));
    } else {
      // If none, the Seller side will initialize it,
      // but let's provide a fallback here too
      const initialOrders = [
        {
          id: "1042",
          client: "Amina B.",
          seller: "Maison de Beauté Bio",
          location: "16 - Alger (Hydra)",
          products: 2,
          total: "7 700 DA",
          status: "attente",
          date: "11/04/2026",
        },
        {
          id: "1040",
          client: "Sarah M.",
          seller: "Luxe Cosmétiques",
          location: "06 - Béjaïa",
          products: 3,
          total: "10 500 DA",
          status: "expediee",
          date: "09/04/2026",
        },
      ];
      setOrdersList(initialOrders);
    }

    const handleStorageChange = (e) => {
      if (e.key === "hilytouch_orders" && e.newValue) {
        setOrdersList(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const finances = [
    {
      seller: "Maison de Beauté Bio",
      pendingAmount: "45000 DZD",
      commission: "7940 DZD",
      status: "due",
    },
    {
      seller: "Naturel dz",
      pendingAmount: "12800 DZD",
      commission: "2250 DZD",
      status: "paid",
    },
  ];

  const adminStatsMock = {
    gmv: "14 850 000 DZD",
    totalOrders: "1 245",
    convRate: "3.2%",
    activeSellers: 42,
    newSellers: "+8",
    totalCommissions: "2 227 500 DZD",
    pendingPayouts: "3 450 000 DZD",
    topSellers: [
      {
        id: 1,
        name: "Maison de Beauté Bio",
        sales: 450,
        gmv: "2 150 000",
        disputeRate: "0.5%",
      },
      {
        id: 2,
        name: "Luxe Cosmétiques",
        sales: 380,
        gmv: "1 840 000",
        disputeRate: "2.1%",
      },
      {
        id: 3,
        name: "Naturel dz",
        sales: 310,
        gmv: "1 280 000",
        disputeRate: "1.2%",
      },
      {
        id: 4,
        name: "Artisanal Care",
        sales: 245,
        gmv: "980 000",
        disputeRate: "0.0%",
      },
      {
        id: 5,
        name: "BioSina",
        sales: 190,
        gmv: "840 000",
        disputeRate: "1.5%",
      },
    ],
    categories: [
      { name: "Visage", percentage: 45, color: "#b08d57" },
      { name: "Corps", percentage: 30, color: "#2c3e50" },
      { name: "Cheveux", percentage: 15, color: "#8e44ad" },
      { name: "Maquillage", percentage: 10, color: "#e74c3c" },
    ],
    topProducts: [
      {
        name: "Sérum Anti-Âge Global",
        seller: "Maison de Beauté Bio",
        sales: 210,
      },
      { name: "Huile Scintillante Corps", seller: "Naturel dz", sales: 185 },
      { name: "Crème Hydratante Nuit", seller: "Luxe Cosmétiques", sales: 154 },
    ],
    revenueChart: [30, 45, 40, 65, 55, 80, 75, 95, 85, 110, 100, 130], // Points for SVG
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  /* ------------ RENDER TABS ------------ */

  const renderUsers = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <h2>Gestion des Rôles & Utilisateurs Internes</h2>
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un membre de l'équipe..."
          />
        </div>
      </div>

      <div className="admin-section">
        <div className="section-header-row">
          <h3>Membres de l'équipe</h3>
          <button className="btn-approve small">
            <UserPlus size={16} /> Ajouter un membre
          </button>
        </div>
        <p className="sub-text">
          Définissez les permissions pour chaque membre de l'équipe Hilytouch.
        </p>

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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="role-select"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      {allRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className="status-badge success">{user.status}</span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-icon danger"
                      title="Désactiver l'accès"
                    >
                      <ShieldBan size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="roles-info-grid mt-4">
        <div className="role-guide-card">
          <h4>
            <ShieldCheck size={18} /> Super Admin
          </h4>
          <p>
            Accès total à toute la plateforme, finances et configuration
            système.
          </p>
        </div>
        <div className="role-guide-card">
          <h4>
            <PackageSearch size={18} /> Modérateur Produits
          </h4>
          <p>Peut valider les nouveaux produits et éditer le catalogue.</p>
        </div>
        <div className="role-guide-card">
          <h4>
            <Headset size={18} /> Service Client
          </h4>
          <p>Gestion des commandes, des litiges et suivi client.</p>
        </div>
        <div className="role-guide-card">
          <h4>
            <Landmark size={18} /> Comptable
          </h4>
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
              {pendingSellers.map((seller) => (
                <tr key={seller.id} className="highlight-row">
                  <td>
                    <strong>{seller.name}</strong>
                  </td>
                  <td>
                    <span className="badge-type">{seller.type}</span>
                  </td>
                  <td>{seller.contact}</td>
                  <td>
                    <button className="btn-link">
                      <Eye size={16} /> {seller.doc}
                    </button>
                  </td>
                  <td>{seller.date}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-approve"
                      title="Approuver et envoyer l'email"
                    >
                      <CheckCircle size={18} /> Approuver
                    </button>
                    <button className="btn-reject" title="Rejeter la demande">
                      <XCircle size={18} /> Rejeter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section mt-4">
        <h3>Vendeurs Actifs</h3>
        <p className="sub-text">
          Gérez les comptes vendeurs existants et leurs informations de
          paiement.
        </p>
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
                <td>
                  <strong>Naturel dz</strong>
                </td>
                <td>contact@natureldz.com</td>
                <td>CCP: 456789 12</td>
                <td>
                  <span className="status-badge success">Actif</span>
                </td>
                <td className="actions-cell">
                  <button className="btn-icon">
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn-icon danger"
                    title="Suspendre le vendeur"
                  >
                    <ShieldBan size={16} />
                  </button>
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
      <p className="sub-text">
        Seul l'administrateur peut modérer le contenu pour assurer la qualité de
        la marketplace (Photos, Ingrédients).
      </p>

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
              <td>
                <span className="status-badge success">Complète (INCI OK)</span>
              </td>
              <td className="actions-cell">
                <button className="btn-secondary small">
                  <Edit size={16} /> Éditer
                </button>
                <button className="btn-secondary small danger">
                  <Eye size={16} /> Masquer
                </button>
              </td>
            </tr>
            <tr>
              <td>Crème Basique</td>
              <td>Luxe Cosmétiques</td>
              <td>Corps</td>
              <td>1500 DZD</td>
              <td>
                <span className="status-badge warning">
                  Ingrédients manquants
                </span>
              </td>
              <td className="actions-cell">
                <button className="btn-secondary small">
                  <Edit size={16} /> Éditer
                </button>
                <button className="btn-secondary small danger">
                  <Eye size={16} /> Masquer
                </button>
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
            {ordersList.map((o) => (
              <tr key={o.id}>
                <td>
                  <strong>#{o.id}</strong>
                </td>
                <td>{o.client}</td>
                <td>{o.seller}</td>
                <td>{o.date}</td>
                <td>{o.total}</td>
                <td>
                  <span
                    className={`status-badge ${o.status !== "annulee" ? "success" : "error"}`}
                  >
                    {o.status === "attente"
                      ? "À traiter"
                      : o.status === "preparation"
                        ? "En préparation"
                        : o.status === "prete"
                          ? "Prête (Yalidine)"
                          : o.status === "expediee"
                            ? "Livrée"
                            : "Annulée"}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-secondary small">
                    Détails / Gérer
                  </button>
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
                  <td>
                    <strong>{f.seller}</strong>
                  </td>
                  <td>
                    {parseInt(f.pendingAmount) + parseInt(f.commission)} DZD
                  </td>
                  <td>{f.commission}</td>
                  <td className="highlight-amount">{f.pendingAmount}</td>
                  <td>
                    {f.status === "due" ? (
                      <span className="status-badge warning">
                        Virement en attente
                      </span>
                    ) : (
                      <span className="status-badge success">Solde Payé</span>
                    )}
                  </td>
                  <td>
                    {f.status === "due" && (
                      <button className="btn-pay">
                        <CreditCard size={16} /> Marquer comme payé
                      </button>
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

  const renderStats = () => (
    <div className="tab-content fade-in">
      <div className="admin-header">
        <div className="title-stack">
          <h2>Tableau de Bord Stratégique</h2>
          <p className="sub-text">
            Vision globale de la performance de la marketplace.
          </p>
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

      {/* Row 1: Global Platform KPIs */}
      <div className="admin-stats-kpi-grid">
        <div className="admin-stat-card gmv">
          <div className="as-header">
            <Activity size={20} />
            <span>Volume d'Affaires Global (GMV)</span>
          </div>
          <div className="as-value">{adminStatsMock.gmv}</div>
          <div className="as-trend positive">
            <TrendingUp size={14} /> +12.5% vs mois dernier
          </div>
        </div>
        <div className="admin-stat-card orders">
          <div className="as-header">
            <ShoppingBag size={20} />
            <span>Commandes Totales</span>
          </div>
          <div className="as-value">{adminStatsMock.totalOrders}</div>
          <div className="as-trend positive">
            <TrendingUp size={14} /> +5.2% croissance
          </div>
        </div>
        <div className="admin-stat-card conv">
          <div className="as-header">
            <ArrowUpRight size={20} />
            <span>Taux de conversion</span>
          </div>
          <div className="as-value">{adminStatsMock.convRate}</div>
          <div className="as-trend neutral">Stable</div>
        </div>
        <div className="admin-stat-card sellers">
          <div className="as-header">
            <Users size={20} />
            <span>Vendeurs Actifs</span>
          </div>
          <div className="as-value">{adminStatsMock.activeSellers}</div>
          <div className="as-trend positive">
            <TrendingUp size={14} /> {adminStatsMock.newSellers} ce mois
          </div>
        </div>
      </div>

      {/* Row 2: Financial Evolution & Categories */}
      <div className="admin-stats-main-grid">
        <div className="admin-chart-box">
          <div className="box-header">
            <h3>Évolution des Revenus Plateforme (Commissions)</h3>
            <div className="as-revenue-val">
              {adminStatsMock.totalCommissions}
            </div>
          </div>
          <div className="as-chart-wrapper">
            <svg viewBox="0 0 1000 300" className="admin-analytical-svg">
              <defs>
                <linearGradient
                  id="adminChartGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-burgundy)"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-burgundy)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <line x1="0" y1="50" x2="1000" y2="50" stroke="#f0f0f0" />
              <line x1="0" y1="150" x2="1000" y2="150" stroke="#f0f0f0" />
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#f0f0f0" />
              <path
                d={`M 0 300 L ${adminStatsMock.revenueChart.map((d, i) => `${i * 90} ${300 - d * 2}`).join(" L ")} L 1000 300 Z`}
                fill="url(#adminChartGradient)"
              />
              <path
                d={`M ${adminStatsMock.revenueChart.map((d, i) => `${i * 90} ${300 - d * 2}`).join(" L ")}`}
                fill="none"
                stroke="var(--color-burgundy)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {adminStatsMock.revenueChart.map((d, i) => (
                <circle
                  key={i}
                  cx={i * 90}
                  cy={300 - d * 2}
                  r="5"
                  fill="white"
                  stroke="var(--color-burgundy)"
                  strokeWidth="3"
                />
              ))}
            </svg>
            <div className="as-chart-labels">
              <span>J</span>
              <span>F</span>
              <span>M</span>
              <span>A</span>
              <span>M</span>
              <span>J</span>
              <span>J</span>
              <span>A</span>
              <span>S</span>
              <span>O</span>
              <span>N</span>
              <span>D</span>
            </div>
          </div>
        </div>

        <div className="admin-stats-box category-distribution">
          <h3>Popularité des Catégories</h3>
          <div className="as-pie-chart-sim">
            <svg viewBox="0 0 100 100" className="as-svg-pie">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#b08d57"
                strokeWidth="20"
                strokeDasharray="45 100"
                strokeDashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#2c3e50"
                strokeWidth="20"
                strokeDasharray="30 100"
                strokeDashoffset="-45"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#8e44ad"
                strokeWidth="20"
                strokeDasharray="15 100"
                strokeDashoffset="-75"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#e74c3c"
                strokeWidth="20"
                strokeDasharray="10 100"
                strokeDashoffset="-90"
              />
            </svg>
            <div className="as-pie-legend">
              {adminStatsMock.categories.map((cat) => (
                <div key={cat.name} className="as-legend-item">
                  <span
                    className="dot"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  <span className="name">{cat.name}</span>
                  <span className="percent">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Seller Benchmarks & Global Products */}
      <div className="admin-stats-grid-bottom">
        <div className="admin-table-stat-box sellers-benchmark">
          <div className="box-header-row">
            <h3>Performances des Vendeurs</h3>
            <span className="badge-gold">Top Performers</span>
          </div>
          <table className="as-table">
            <thead>
              <tr>
                <th>Vendeur</th>
                <th>Ventes</th>
                <th>GMV (DA)</th>
                <th>Taux Litiges</th>
              </tr>
            </thead>
            <tbody>
              {adminStatsMock.topSellers.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.name}</strong>
                  </td>
                  <td>{s.sales}</td>
                  <td className="text-gold">{s.gmv}</td>
                  <td>
                    <span
                      className={`as-litige-badge ${parseFloat(s.disputeRate) > 1.5 ? "high" : "low"}`}
                    >
                      {s.disputeRate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-table-stat-box global-products">
          <div className="box-header-row">
            <h3>Top Produits Global</h3>
            <span className="badge-burgundy">Toutes boutiques</span>
          </div>
          <div className="as-global-products-list">
            {adminStatsMock.topProducts.map((p, i) => (
              <div key={i} className="as-global-product-item">
                <div className="gp-rank">#{i + 1}</div>
                <div className="gp-info">
                  <span className="gp-name">{p.name}</span>
                  <span className="gp-seller">{p.seller}</span>
                </div>
                <div className="gp-sales">{p.sales} v.</div>
              </div>
            ))}
          </div>
          <div className="payout-overview mt-4">
            <div className="as-payout-card">
              <div className="payout-label">Reversements en attente</div>
              <div className="payout-val">{adminStatsMock.pendingPayouts}</div>
              <button className="as-payout-btn">Gérer les paiements</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard layout">
      {/* SIDEBAR SUPER ADMIN */}
      <aside className="dashboard-sidebar super-admin-sidebar">
        <div className="sidebar-brand admin-brand">
          Hilytouch{" "}
          <span className="seller-badge admin-badge">Super Admin</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === "stats" ? "active" : ""}
            onClick={() => setActiveTab("stats")}
          >
            <BarChart3 size={20} /> Statistiques
          </button>
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            <ShieldCheck size={20} /> Rôles & Équipe
          </button>
          <button
            className={activeTab === "sellers" ? "active" : ""}
            onClick={() => setActiveTab("sellers")}
          >
            <Users size={20} /> Vendeurs & Modération
          </button>
          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            <PackageSearch size={20} /> Catalogue Produits
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            <Headset size={20} /> Suivi Commandes
          </button>
          <button
            className={activeTab === "finances" ? "active" : ""}
            onClick={() => setActiveTab("finances")}
          >
            <Landmark size={20} /> Finance & Reversements
          </button>
          <button
            className={activeTab === "cms" ? "active" : ""}
            onClick={() => setActiveTab("cms")}
          >
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
        {activeTab === "stats" && renderStats()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "sellers" && renderSellers()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "finances" && renderFinances()}
        {activeTab === "cms" && (
          <div className="tab-content">
            <h2>CMS en cours...</h2>
          </div>
        )}
      </main>
    </div>
  );
}
