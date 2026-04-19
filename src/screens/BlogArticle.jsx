"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { fetchBlogArticle } from "../lib/api";
import "./BlogArticle.css";

const BlogArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchBlogArticle(slug)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="article-page container fade-in">
        <p className="loading-text">Chargement...</p>
      </div>
    );
  if (!article)
    return (
      <div className="article-page container fade-in">
        <p className="loading-text">Article non trouvé.</p>
      </div>
    );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="article-page fade-in">
      <div className="article-hero-img">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="container">
        <Link href="/blog" className="back-link">
          <ArrowLeft size={16} /> Retour au blog
        </Link>
        <article className="article-content">
          <span className="blog-category-tag">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span>
              <User size={14} /> {article.author}
            </span>
            <span>
              <Calendar size={14} /> {formatDate(article.date)}
            </span>
            <span>
              <Clock size={14} /> {article.readTime} de lecture
            </span>
          </div>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/\n\n/g, "</p><p>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogArticle;
