"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { fetchFAQ } from '../lib/api';
import './FAQ.css';

const FAQ = () => {
  const [faqData, setFaqData] = useState({ faqs: [], categories: [] });
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQ()
      .then(data => { setFaqData(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredFaqs = faqData.faqs.filter(faq => {
    const matchesCategory = activeCategory === 'Toutes' || faq.category === activeCategory;
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faq-page container fade-in">
      <div className="page-header-simple">
        <p className="subtitle">AIDE</p>
        <h1>Foire aux Questions</h1>
        <p className="page-desc">Trouvez rapidement les réponses à vos questions les plus fréquentes.</p>
      </div>

      <div className="faq-search">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Rechercher une question..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="faq-categories">
        <button 
          className={`faq-cat-btn ${activeCategory === 'Toutes' ? 'active' : ''}`}
          onClick={() => setActiveCategory('Toutes')}
        >Toutes</button>
        {faqData.categories.map(cat => (
          <button 
            key={cat}
            className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >{cat}</button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Chargement...</p>
      ) : (
        <div className="faq-list">
          {filteredFaqs.length === 0 ? (
            <p className="loading-text">Aucun résultat trouvé.</p>
          ) : (
            filteredFaqs.map(faq => (
              <div key={faq.id} className={`faq-item ${openId === faq.id ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                  <span>{faq.question}</span>
                  {openId === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openId === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="faq-contact-banner">
        <h3>Vous n'avez pas trouvé votre réponse ?</h3>
        <p>Notre équipe est disponible pour vous aider du lundi au vendredi de 9h à 18h.</p>
        <a href="/contact" className="btn btn-primary">Nous contacter</a>
      </div>
    </div>
  );
};

export default FAQ;
