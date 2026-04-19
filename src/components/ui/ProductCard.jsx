"use client";
import React from "react";
import Link from "next/link";
import { Heart, Check, ArrowLeftRight } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  isAuthenticated,
} from "../../lib/api";
import { useLanguage } from "../../context/LanguageContext";
import "./ProductCard.css";

const ProductCard = ({
  id = 1,
  image,
  title,
  category,
  price,
  isNew,
  initialIsFav = false,
}) => {
  const { t } = useLanguage();
  const [isFav, setIsFav] = React.useState(initialIsFav);
  const [loading, setLoading] = React.useState(false);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      window.location.href = "/auth";
      return;
    }

    setLoading(true);
    try {
      if (isFav) {
        await removeFromWishlist(id);
        setIsFav(false);
      } else {
        await addToWishlist(id);
        setIsFav(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card fade-in">
      <Link href={`/product/${id}`} className="product-card-link">
        <div className="product-image-container">
          {isNew && <span className="badge-new">{t("badge_new")}</span>}
          <img src={image} alt={title} className="product-image" />
        </div>
        <div className="product-info-wrapper">
          <div className="product-info-left">
            <h3 className="product-brand">{title.split(" ")[0]}</h3>
            <h4 className="product-title">{title}</h4>
            {category && <p className="product-category">{category}</p>}
            <p className="product-price">
              {typeof price === "number"
                ? `${price.toLocaleString()} DA`
                : price}
            </p>
            <div className="product-rating">
              <span className="stars">★★★★☆</span>
              <span className="rating-count">124</span>
            </div>
          </div>
          <button
            className={`product-btn-fav ${isFav ? "active" : ""}`}
            onClick={toggleWishlist}
            disabled={loading}
            aria-label={t("fav_title")}
            title={t("fav_title")}
          >
            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
