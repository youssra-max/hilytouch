"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { fetchBlogArticles } from "../lib/api";
import "./Blog.css";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="blog-page container fade-in">
        <p className="loading-text">Chargement des articles...</p>
      </div>
    );

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="blog-page fade-in">
      <div className="container">
        <div className="page-header-simple">
          <p className="subtitle">LE JOURNAL</p>
          <h1>Notre Blog Beauté</h1>
          <p className="page-desc">
            Découvrez les dernières tendances, astuces et inspirations pour
            explorer toutes les facettes de votre beauté, des soins au quotidien
            jusqu'au maquillage audacieux.
          </p>
        </div>

        {/* Featured article */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="blog-featured">
            <div className="blog-featured-img">
              <img src={featured.image} alt={featured.title} />
            </div>
            <div className="blog-featured-content">
              <span className="blog-category-tag">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="blog-meta">
                <span>
                  <User size={14} /> {featured.author}
                </span>
                <span>
                  <Clock size={14} /> {featured.readTime}
                </span>
              </div>
              <span className="link-rose">
                Lire l'article <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        )}

        {/* Other articles */}
        <div className="blog-grid">
          {rest.map((article) => (
            <Link
              href={`/blog/${article.slug}`}
              key={article.id}
              className="blog-card"
            >
              <div className="blog-card-img">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="blog-card-body">
                <span className="blog-category-tag">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="blog-meta">
                  <span>
                    <Clock size={14} /> {article.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
