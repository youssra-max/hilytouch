"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import './Cart.css';

const MOCK_CART = [
  {
    id: 1,
    title: "Sérum Éclat Floral",
    category: "Soins Visage",
    price: 7500,
    priceFormatted: "7 500 DA",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    quantity: 1
  },
  {
    id: 2,
    title: "Baume Botanique",
    category: "Soins Corps",
    price: 4500,
    priceFormatted: "4 500 DA",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
    quantity: 2
  }
];

const Cart = () => {
  const [items, setItems] = useState(MOCK_CART);
  
  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 500;
  const total = subtotal + shipping;

  return (
    <div className="cart-page container fade-in">
      <div className="cart-header">
        <h1 className="title-large">Mon Panier</h1>
        <p className="cart-count">{items.length} article(s)</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est actuellement vide.</p>
          <Link href="/shop">
            <Button variant="primary" className="mt-4">
              Retour à la boutique <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <div className="item-header">
                     <p className="item-category">{item.category}</p>
                     <p className="item-price">{(item.price * item.quantity).toLocaleString('fr-DZ')} DA</p>
                  </div>
                  <Link href={`/product/${item.id}`} className="item-title">{item.title}</Link>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-selector-small">
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14}/></button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <Trash2 size={16} />
                      <span>Retirer</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Résumé de la commande</h2>
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            <div className="summary-row">
              <span>Frais de livraison estimé</span>
              <span>{shipping.toLocaleString('fr-DZ')} DA</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{total.toLocaleString('fr-DZ')} DA</span>
            </div>
            
            <Button variant="primary" className="checkout-btn">
              Valider ma commande
            </Button>
            
            <div className="secure-checkout">
              <p className="secure-title">Paiement sécurisé à la livraison</p>
              <p>Livraison estimée : 2 à 4 jours ouvrés dans tout le pays.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
