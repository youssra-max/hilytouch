import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Star, ShieldCheck, Leaf, Heart, Plus, Minus, ArrowRight } from 'lucide-react';
import './Product.css';

// Mock data (In a real app, this would be fetched from an API/Database based on ID)
const PRODUCT_DATA = {
  id: 1,
  title: "Sérum Éclat Floral",
  category: "Soins Visage",
  price: "45,00 €",
  description: "Un élixir concentré d'actifs botaniques rares. Ce sérum biphasé fusionne l'eau florale de rose ancienne avec de l'huile précieuse d'immortelle pour régénérer, repulper et illuminer instantanément le teint fatigué.",
  benefits: ["Illumine le teint", "Hydratation 24h", "Anti-oxydant puissant"],
  ingredients: "Eau florale de Rosa Damascena (50%), Huile de graines de Simmondsia Chinensis (Jojoba), Extrait de fleur d'Helichrysum Italicum.",
  usage: "Appliquer 3 à 4 gouttes matin et soir sur peau propre avant votre crème hydratante. Masser délicatement de l'intérieur vers l'extérieur du visage.",
  image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
  rating: 4.8,
  reviews: 124
};

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="product-detail-page container fade-in">
      <div className="breadcrumbs">
        <Link to="/">Accueil</Link> &gt; <Link to="/shop">Boutique</Link> &gt; <span>{PRODUCT_DATA.title}</span>
      </div>

      <div className="product-main">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
             <img src={PRODUCT_DATA.image} alt={PRODUCT_DATA.title} className="main-image" />
          </div>
          {/* Mock thumbnail placeholders */}
          <div className="thumbnails">
             <div className="thumbnail active"><img src={PRODUCT_DATA.image} alt="thumb" /></div>
             <div className="thumbnail"><img src={PRODUCT_DATA.image} alt="thumb" /></div>
             <div className="thumbnail"><img src={PRODUCT_DATA.image} alt="thumb" /></div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info-panel">
          <div className="product-header-info">
            <p className="product-category-tag">{PRODUCT_DATA.category}</p>
            <h1 className="product-title-large">{PRODUCT_DATA.title}</h1>
            <div className="product-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star key={star} size={16} fill={star <= Math.floor(PRODUCT_DATA.rating) ? "var(--color-accent)" : "transparent"} color="var(--color-accent)" />
                ))}
              </div>
              <span className="review-count">({PRODUCT_DATA.reviews} avis)</span>
            </div>
            <p className="product-price-large">{PRODUCT_DATA.price}</p>
          </div>

          <p className="product-short-desc">{PRODUCT_DATA.description}</p>

          <div className="product-perks">
            <div className="perk"><Leaf size={20} /> <p>100% Naturel</p></div>
            <div className="perk"><ShieldCheck size={20} /> <p>Testé dermatologiquement</p></div>
            <div className="perk"><Heart size={20} /> <p>Cruelty Free</p></div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={decreaseQty}><Minus size={16}/></button>
              <span>{quantity}</span>
              <button onClick={increaseQty}><Plus size={16}/></button>
            </div>
            <Button variant="primary" className="add-to-cart-btn-large">
              Ajouter au panier — {(45 * quantity).toFixed(2).replace('.', ',')} €
            </Button>
          </div>

          <div className="product-accordion">
            <div className={`accordion-tab ${activeTab === 'description' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('description')}>Description</button>
              {activeTab === 'description' && (
                <div className="accordion-content">
                  <p>Ses bénéfices :</p>
                  <ul>
                    {PRODUCT_DATA.benefits.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <div className={`accordion-tab ${activeTab === 'ingredients' ? 'active' : ''}`}>
               <button onClick={() => setActiveTab('ingredients')}>Ingrédients</button>
               {activeTab === 'ingredients' && (
                 <div className="accordion-content">
                   <p>{PRODUCT_DATA.ingredients}</p>
                 </div>
               )}
            </div>
            <div className={`accordion-tab ${activeTab === 'usage' ? 'active' : ''}`}>
               <button onClick={() => setActiveTab('usage')}>Conseils d'utilisation</button>
               {activeTab === 'usage' && (
                 <div className="accordion-content">
                   <p>{PRODUCT_DATA.usage}</p>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Related Products Mock */}
      <div className="related-products">
        <div className="related-header">
           <h2>Vous aimerez aussi</h2>
           <Link to="/shop" className="view-more-link">TOUT VOIR <ArrowRight size={16}/></Link>
        </div>
        <div className="related-grid">
           {/* Re-using Card component visually */}
           <div className="related-card-mock">
              <img src="https://images.unsplash.com/photo-1615397323758-6da8b3d6a9a0?q=80&w=1964&auto=format&fit=crop" alt="related"/>
              <p className="related-cat">Soins Corps</p>
              <h4>Baume Botanique</h4>
              <p className="related-price">38,00 €</p>
           </div>
           <div className="related-card-mock">
              <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1780&auto=format&fit=crop" alt="related"/>
              <p className="related-cat">Soins Visage</p>
              <h4>Lait Nettoyant</h4>
              <p className="related-price">28,00 €</p>
           </div>
           <div className="related-card-mock">
              <img src="https://images.unsplash.com/photo-1596755389378-c11dde6df4eb?q=80&w=1974&auto=format&fit=crop" alt="related"/>
              <p className="related-cat">Masque</p>
              <h4>Masque Argile Douce</h4>
              <p className="related-price">32,00 €</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Product;
