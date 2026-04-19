"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import Button from "../components/ui/Button";
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  validatePromoCode,
  fetchShippingRates,
  getShippingRate,
  createOrder,
  isAuthenticated,
} from "../lib/api";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wilayas, setWilayas] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promoData, setPromoData] = useState(null);
  const [promoError, setPromoError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const loadCartData = async () => {
    try {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }
      const [cartData, wilayaData] = await Promise.all([
        fetchCart(),
        fetchShippingRates(),
      ]);
      setItems(cartData.items || []);
      setWilayas(wilayaData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartData();
  }, []);

  const handleUpdateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(itemId, newQty);
      const updatedCart = await fetchCart();
      setItems(updatedCart.items);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWilayaChange = async (e) => {
    const code = e.target.value;
    setSelectedWilaya(code);
    if (!code) {
      setShippingCost(0);
      return;
    }
    try {
      const rate = await getShippingRate(code);
      setShippingCost(rate.standard_price);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setPromoError(null);
    try {
      const data = await validatePromoCode(promoCode, subtotal);
      if (data.valid) {
        setPromoData(data);
      } else {
        setPromoError(data.detail || "Code invalide");
      }
    } catch (err) {
      setPromoError("Erreur lors de la validation");
    }
  };

  const handleCheckout = async () => {
    if (!selectedWilaya) {
      alert("Veuillez sélectionner votre Wilaya pour la livraison.");
      return;
    }
    try {
      const order = await createOrder({
        shippingAddress: "Adresse à remplir dans le profil", // Simplified for now
        wilaya: selectedWilaya,
        phone: "0000000000",
        paymentMethod: "cod",
        promoCode: promoData?.code,
      });
      setOrderSuccess(order.order_number);
    } catch (err) {
      alert(err.message);
    }
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = promoData
    ? promoData.discount_type === "percentage"
      ? (subtotal * promoData.discount_value) / 100
      : promoData.discount_value
    : 0;
  const total = subtotal - discount + shippingCost;

  if (loading)
    return (
      <div className="cart-loading container">
        <Loader className="spinner" />
        <p>Chargement du panier...</p>
      </div>
    );

  if (orderSuccess) {
    return (
      <div className="cart-success container fade-in">
        <CheckCircle size={64} color="#43a047" />
        <h1>Commande confirmée !</h1>
        <p>
          Merci pour votre confiance. Votre numéro de commande est :{" "}
          <strong>{orderSuccess}</strong>
        </p>
        <Link href="/shop">
          <Button variant="primary" className="mt-4">
            Continuer mes achats
          </Button>
        </Link>
      </div>
    );
  }

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
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.product_image} alt={item.product_title} />
                </div>
                <div className="cart-item-details">
                  <div className="item-header">
                    <p className="item-category">{item.product_brand}</p>
                    <p className="item-price">
                      {(item.price * item.quantity).toLocaleString()} DA
                    </p>
                  </div>
                  <Link
                    href={`/product/${item.product_id}`}
                    className="item-title"
                  >
                    {item.product_title}
                  </Link>

                  <div className="cart-item-actions">
                    <div className="quantity-selector-small">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
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

            <div className="summary-section">
              <label>
                <Truck size={16} /> Livraison (Wilaya)
              </label>
              <select
                value={selectedWilaya}
                onChange={handleWilayaChange}
                className="wilaya-select"
              >
                <option value="">Sélectionnez votre wilaya</option>
                {wilayas.map((w) => (
                  <option key={w.wilaya_code} value={w.wilaya_code}>
                    {w.wilaya_code} - {w.wilaya_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="summary-section">
              <label>
                <Tag size={16} /> Code Promo
              </label>
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Ex: HILY10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                />
                <button onClick={handleApplyPromo}>Appliquer</button>
              </div>
              {promoError && (
                <p className="promo-error">
                  <AlertCircle size={12} /> {promoError}
                </p>
              )}
              {promoData && (
                <p className="promo-success">
                  <CheckCircle size={12} /> Réduction de{" "}
                  {promoData.discount_value}
                  {promoData.discount_type === "percentage" ? "%" : " DA"}{" "}
                  appliquée
                </p>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toLocaleString()} DA</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span>Réduction</span>
                <span>-{discount.toLocaleString()} DA</span>
              </div>
            )}

            <div className="summary-row">
              <span>Livraison</span>
              <span>
                {shippingCost > 0
                  ? `${shippingCost.toLocaleString()} DA`
                  : "--"}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span>{total.toLocaleString()} DA</span>
            </div>

            <Button
              variant="primary"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Valider ma commande (COD)
            </Button>

            <div className="secure-checkout">
              <p className="secure-title">Paiement à la livraison</p>
              <p>Livraison estimée : 24h à 72h selon la wilaya.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
