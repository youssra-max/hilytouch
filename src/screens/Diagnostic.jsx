"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { submitDiagnostic } from '../lib/api';
import './Diagnostic.css';

const STEPS = [
  { id: 'skinType', title: 'Quel est votre type de peau ?', options: [
    { value: 'seche', label: 'Sèche', desc: 'Tiraillements, desquamations' },
    { value: 'grasse', label: 'Grasse', desc: 'Brillances, pores dilatés' },
    { value: 'mixte', label: 'Mixte', desc: 'Zone T grasse, joues sèches' },
    { value: 'normale', label: 'Normale', desc: 'Peau équilibrée' },
    { value: 'sensible', label: 'Sensible', desc: 'Rougeurs, réactivité' }
  ]},
  { id: 'concerns', title: 'Quelles sont vos préoccupations ?', multiple: true, options: [
    { value: 'hydratation', label: 'Hydratation' },
    { value: 'eclat', label: 'Éclat & Teint terne' },
    { value: 'rides', label: 'Rides & Ridules' },
    { value: 'acne', label: 'Imperfections & Acné' },
    { value: 'taches', label: 'Taches pigmentaires' },
    { value: 'pores', label: 'Pores dilatés' }
  ]},
  { id: 'age', title: 'Quelle est votre tranche d\'âge ?', options: [
    { value: '18-25', label: '18-25 ans' },
    { value: '26-35', label: '26-35 ans' },
    { value: '36-45', label: '36-45 ans' },
    { value: '46+', label: '46 ans et plus' }
  ]},
  { id: 'routine', title: 'Votre routine actuelle ?', options: [
    { value: 'minimale', label: 'Minimale', desc: '1-2 produits' },
    { value: 'moderee', label: 'Modérée', desc: '3-4 produits' },
    { value: 'complete', label: 'Complète', desc: '5+ produits' },
    { value: 'aucune', label: 'Aucune routine', desc: 'Je débute' }
  ]}
];

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ skinType: '', concerns: [], age: '', routine: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const step = STEPS[currentStep];

  const handleSelect = (value) => {
    if (step.multiple) {
      setAnswers(prev => ({
        ...prev,
        [step.id]: prev.concerns.includes(value) 
          ? prev.concerns.filter(v => v !== value)
          : [...prev.concerns, value]
      }));
    } else {
      setAnswers(prev => ({ ...prev, [step.id]: value }));
    }
  };

  const canProceed = () => {
    if (step.multiple) return answers[step.id].length > 0;
    return answers[step.id] !== '';
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit
      setLoading(true);
      try {
        const res = await submitDiagnostic(answers);
        setResult(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="diagnostic-page container fade-in">
        <div className="diag-result">
          <div className="diag-result-header">
            <Sparkles size={32} />
            <h1>Votre diagnostic</h1>
            <p className="skin-type-badge">{result.skinProfile.type}</p>
          </div>
          <p className="diag-summary">{result.skinProfile.summary}</p>

          <div className="diag-section">
            <h2>Produits recommandés</h2>
            <div className="recommended-products">
              {result.recommendedProducts.map(p => (
                <Link href={`/product/${p.id}`} key={p.id} className="rec-product-card">
                  <h3>{p.title}</h3>
                  <p>{p.reason}</p>
                  <span className="link-rose">Voir le produit <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="diag-section">
            <h2>Votre routine idéale</h2>
            <div className="routine-grid">
              <div className="routine-col">
                <h3>☀️ Matin</h3>
                <ul>{result.routineTips.matin.map((tip, i) => <li key={i}><Check size={14} /> {tip}</li>)}</ul>
              </div>
              <div className="routine-col">
                <h3>🌙 Soir</h3>
                <ul>{result.routineTips.soir.map((tip, i) => <li key={i}><Check size={14} /> {tip}</li>)}</ul>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => { setResult(null); setCurrentStep(0); setAnswers({ skinType: '', concerns: [], age: '', routine: '' }); }}>
            Refaire le diagnostic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnostic-page container fade-in">
      <div className="diag-quiz">
        <div className="diag-progress">
          <div className="diag-progress-bar" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
        </div>
        <p className="diag-step-count">Étape {currentStep + 1} / {STEPS.length}</p>
        <h1>{step.title}</h1>
        {step.multiple && <p className="diag-hint">Vous pouvez sélectionner plusieurs réponses</p>}

        <div className="diag-options">
          {step.options.map(opt => {
            const isSelected = step.multiple 
              ? answers[step.id].includes(opt.value)
              : answers[step.id] === opt.value;
            return (
              <button 
                key={opt.value}
                className={`diag-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <span className="diag-option-label">{opt.label}</span>
                {opt.desc && <span className="diag-option-desc">{opt.desc}</span>}
                {isSelected && <Check size={16} className="diag-check" />}
              </button>
            );
          })}
        </div>

        <div className="diag-nav">
          {currentStep > 0 && (
            <button className="btn-back" onClick={() => setCurrentStep(prev => prev - 1)}>← Retour</button>
          )}
          <button 
            className="btn btn-primary" 
            onClick={handleNext} 
            disabled={!canProceed() || loading}
          >
            {loading ? 'Analyse en cours...' : currentStep === STEPS.length - 1 ? 'Voir mon diagnostic ✨' : 'Suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;
