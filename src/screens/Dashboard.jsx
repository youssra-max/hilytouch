"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, Heart, LogOut, Package, TrendingUp } from 'lucide-react';
import { fetchDashboard, logoutUser, isAuthenticated } from '../lib/api';
import './Dashboard.css';

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth');
      return;
    }

    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboard();
        setData(dashboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="dashboard-loading container">
        <div className="loader"></div>
        <p>Chargement de votre espace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error container">
        <p>Oups ! {error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">Réessayer</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page container fade-in">
      <div className="dashboard-header">
        <div className="user-welcome">
          <div className="user-avatar">
            <User size={32} />
          </div>
          <div>
            <h1>Mon Espace Personnel</h1>
            <p className="subtitle">Heureux de vous revoir !</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>

      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon pts">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Points Fidélité</span>
            <span className="stat-value">{data.loyalty_points} pts</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orders">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Commandes</span>
            <span className="stat-value">{data.total_orders}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <span className="currency-symbol">DA</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total dépensé</span>
            <span className="stat-value">{data.total_spent.toLocaleString()} DA</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon favorites">
            <Heart size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Favoris</span>
            <span className="stat-value">{data.favorites_count}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="recent-orders-section">
          <h2>Dernières Commandes</h2>
          {data.recent_orders.length === 0 ? (
            <div className="empty-section">
              <p>Vous n'avez pas encore passé de commande.</p>
              <button onClick={() => router.push('/shop')} className="btn btn-outline btn-sm">Explorer la boutique</button>
            </div>
          ) : (
            <div className="orders-list">
              {data.recent_orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-number">{order.order_number}</span>
                    <span className="order-date">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="order-status-wrap">
                    <span className={`status-badge ${order.status}`}>{order.status_display}</span>
                    <span className="order-total">{order.final_total.toLocaleString()} DA</span>
                  </div>
                </div>
              ))}
              <button 
                className="view-all-link" 
                onClick={() => router.push('/orders')}
              >
                Voir toutes mes commandes →
              </button>
            </div>
          )}
        </div>

        <div className="quick-actions-section">
          <h2>Actions Rapides</h2>
          <div className="actions-grid">
            <button className="action-tile" onClick={() => router.push('/favorites')}>
              <Heart size={20} />
              <span>Gérer mes favoris</span>
            </button>
            <button className="action-tile" onClick={() => router.push('/profile')}>
              <User size={20} />
              <span>Modifier mon profil</span>
            </button>
            <button className="action-tile" onClick={() => router.push('/addresses')}>
              <Package size={20} />
              <span>Adresses de livraison</span>
            </button>
            <button className="action-tile" onClick={() => router.push('/loyalty')}>
              <TrendingUp size={20} />
              <span>Historique fidélité</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
