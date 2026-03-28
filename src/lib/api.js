// API helper — centralised fetch functions for the frontend

const API_BASE = '/api';

// ─── Products ──────────────────────────────────────
export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type && filters.type !== 'all') params.set('type', filters.type);
  if (filters.featured) params.set('featured', 'true');
  if (filters.isNew) params.set('new', 'true');
  const res = await fetch(`${API_BASE}/products?${params.toString()}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des produits');
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Produit non trouvé');
  return res.json();
}

// ─── Categories ────────────────────────────────────
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Erreur lors du chargement des catégories');
  return res.json();
}

export async function fetchCategory(id) {
  const res = await fetch(`${API_BASE}/categories/${id}`);
  if (!res.ok) throw new Error('Catégorie non trouvée');
  return res.json();
}

// ─── Blog ──────────────────────────────────────────
export async function fetchBlogArticles() {
  const res = await fetch(`${API_BASE}/blog`);
  if (!res.ok) throw new Error('Erreur lors du chargement des articles');
  return res.json();
}

export async function fetchBlogArticle(slug) {
  const res = await fetch(`${API_BASE}/blog/${slug}`);
  if (!res.ok) throw new Error('Article non trouvé');
  return res.json();
}

// ─── FAQ ───────────────────────────────────────────
export async function fetchFAQ(category = null) {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${API_BASE}/faq${params}`);
  if (!res.ok) throw new Error('Erreur lors du chargement de la FAQ');
  return res.json();
}

// ─── Contact ───────────────────────────────────────
export async function submitContact({ name, email, subject, message }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message })
  });
  return res.json();
}

// ─── Order Tracking ────────────────────────────────
export async function trackOrder({ orderNumber, email }) {
  const res = await fetch(`${API_BASE}/tracking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderNumber, email })
  });
  return res.json();
}

// ─── Skin Diagnostic ───────────────────────────────
export async function submitDiagnostic({ skinType, concerns, age, routine }) {
  const res = await fetch(`${API_BASE}/diagnostic`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skinType, concerns, age, routine })
  });
  return res.json();
}
