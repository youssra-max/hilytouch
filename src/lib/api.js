// API helper — centralised fetch functions for the frontend
// Now connected to Django REST Framework backend

const DJANGO_API = 'http://localhost:8000/api';

// ─── Helper: base fetch with error handling ────────
async function apiFetch(url, options = {}) {
  try {
    return await fetch(url, options);
  } catch (err) {
    // If it's a network error (server down, CORS, etc.)
    if (err instanceof TypeError || err.name === 'TypeError') {
      console.error('Network Error:', err);
      throw new Error(
        'Impossible de contacter le serveur backend (http://localhost:8000/api). ' +
        'Assurez-vous que le serveur Django est lancé.'
      );
    }
    throw err;
  }
}

// ─── Helper: get auth header ───────────────────────
function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// ─── Helper: normalize product from Django → frontend format ─────
function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title,
    brand: p.brand,
    category: p.category_title || p.category_id || '',
    type: p.category_id || '',
    price: p.price,
    priceFormatted: p.price_formatted || `${p.price?.toLocaleString('fr-DZ')} DA`,
    image: p.image,
    isNew: p.is_new,
    isFeatured: p.is_featured,
    rating: p.rating,
    reviews: p.reviews_count,
    description: p.description || '',
    benefits: p.benefits || [],
    ingredients: p.ingredients || '',
    usage: p.usage || '',
  };
}

// ─── Helper: normalize category from Django → frontend format ────
function normalizeCategory(c) {
  return {
    id: c.slug,
    title: c.title,
    description: c.description,
    image: c.image,
    tags: c.tags || [],
    subcategories: c.subcategories || [],
    productsCount: c.products_count || 0,
  };
}

// ─── Helper: normalize blog post from Django → frontend format ───
function normalizeBlogPost(b) {
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    content: b.content || '',
    image: b.image,
    category: b.category,
    author: b.author,
    date: b.date,
    readTime: b.read_time,
  };
}

// ─── Products ──────────────────────────────────────
export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type && filters.type !== 'all') params.set('category', filters.type);
  if (filters.featured) params.set('is_featured', 'true');
  if (filters.isNew) params.set('is_new', 'true');
  if (filters.search) params.set('search', filters.search);
  if (filters.ordering) params.set('ordering', filters.ordering);
  if (filters.minPrice) params.set('price__gte', filters.minPrice);
  if (filters.maxPrice) params.set('price__lte', filters.maxPrice);

  const res = await apiFetch(`${DJANGO_API}/products/?${params.toString()}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des produits');
  const data = await res.json();

  // Django REST uses pagination: { count, next, previous, results }
  const results = data.results || data;
  return results.map(normalizeProduct);
}

export async function fetchProduct(id) {
  const res = await apiFetch(`${DJANGO_API}/products/${id}/`);
  if (!res.ok) throw new Error('Produit non trouvé');
  const product = await res.json();

  // Also fetch related products (same category)
  let related = [];
  try {
    const relRes = await apiFetch(
      `${DJANGO_API}/products/?category=${product.category_id}&page_size=5`
    );
    if (relRes.ok) {
      const relData = await relRes.json();
      const results = relData.results || relData;
      related = results
        .filter(p => p.id !== product.id)
        .slice(0, 4)
        .map(normalizeProduct);
    }
  } catch {
    // silently ignore related products errors
  }

  return { product: normalizeProduct(product), related };
}

// ─── Categories ────────────────────────────────────
export async function fetchCategories() {
  const res = await apiFetch(`${DJANGO_API}/categories/`);
  if (!res.ok) throw new Error('Erreur lors du chargement des catégories');
  const data = await res.json();
  return data.map(normalizeCategory);
}

export async function fetchCategory(id) {
  const res = await apiFetch(`${DJANGO_API}/categories/${id}/`);
  if (!res.ok) throw new Error('Catégorie non trouvée');
  const data = await res.json();
  return {
    category: normalizeCategory(data),
    products: (data.products || []).map(normalizeProduct),
  };
}

// ─── Blog ──────────────────────────────────────────
export async function fetchBlogArticles() {
  const res = await apiFetch(`${DJANGO_API}/blog/`);
  if (!res.ok) throw new Error('Erreur lors du chargement des articles');
  const data = await res.json();
  const results = data.results || data;
  return results.map(normalizeBlogPost);
}

export async function fetchBlogArticle(slug) {
  const res = await apiFetch(`${DJANGO_API}/blog/${slug}/`);
  if (!res.ok) throw new Error('Article non trouvé');
  const data = await res.json();
  return normalizeBlogPost(data);
}

// ─── FAQ ───────────────────────────────────────────
export async function fetchFAQ(category = null) {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await apiFetch(`${DJANGO_API}/faq/${params}`);
  if (!res.ok) throw new Error('Erreur lors du chargement de la FAQ');
  const data = await res.json();

  // Django returns a flat list; extract categories and wrap in expected format
  const faqs = Array.isArray(data) ? data : (data.results || []);
  const categories = [...new Set(faqs.map(f => f.category))];
  return { faqs, categories };
}

// ─── Contact ───────────────────────────────────────
export async function submitContact({ name, email, subject, message }) {
  const res = await apiFetch(`${DJANGO_API}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });
  return res.json();
}

// ─── Order Tracking ────────────────────────────────
export async function trackOrder({ orderNumber, email }) {
  const res = await apiFetch(`${DJANGO_API}/tracking/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_number: orderNumber, email }),
  });
  return res.json();
}

// ─── Skin Diagnostic ───────────────────────────────
export async function submitDiagnostic({ skinType, concerns, age, routine }) {
  const res = await apiFetch(`${DJANGO_API}/diagnostic/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skin_type: skinType, concerns, age, routine }),
  });
  return res.json();
}

// ─── Authentication ────────────────────────────────
export async function loginUser(email, password) {
  const res = await apiFetch(`${DJANGO_API}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Identifiants incorrects');
  }
  const data = await res.json();
  // Store tokens
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

export async function registerUser({ firstName, lastName, email, password, password2 }) {
  const res = await apiFetch(`${DJANGO_API}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      username: email.split('@')[0],
      password,
      password2,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    const messages = Object.values(err).flat().join(', ');
    throw new Error(messages || 'Erreur lors de l\'inscription');
  }
  const data = await res.json();
  // Store tokens
  if (data.tokens) {
    localStorage.setItem('access_token', data.tokens.access);
    localStorage.setItem('refresh_token', data.tokens.refresh);
  }
  return data;
}

export async function fetchProfile() {
  const res = await apiFetch(`${DJANGO_API}/auth/profile/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Non authentifié');
  return res.json();
}

export async function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function isAuthenticated() {
  return typeof window !== 'undefined' && !!localStorage.getItem('access_token');
}

// ─── Cart (authenticated) ──────────────────────────
export async function fetchCart() {
  const res = await apiFetch(`${DJANGO_API}/cart/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur panier');
  return res.json();
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${DJANGO_API}/cart/add/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  if (!res.ok) throw new Error('Erreur ajout au panier');
  return res.json();
}

export async function updateCartItem(itemId, quantity) {
  const res = await fetch(`${DJANGO_API}/cart/update/${itemId}/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('Erreur mise à jour panier');
  return res.json();
}

export async function removeCartItem(itemId) {
  const res = await fetch(`${DJANGO_API}/cart/remove/${itemId}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur suppression');
  return res.json();
}

// ─── Orders (authenticated) ────────────────────────
export async function createOrder({ shippingAddress, wilaya, phone, paymentMethod, notes }) {
  const res = await fetch(`${DJANGO_API}/orders/create/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      shipping_address: shippingAddress,
      wilaya,
      phone,
      payment_method: paymentMethod,
      notes: notes || '',
    }),
  });
  if (!res.ok) throw new Error('Erreur création commande');
  return res.json();
}

export async function fetchOrders() {
  const res = await apiFetch(`${DJANGO_API}/orders/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur chargement commandes');
  return res.json();
}

// ─── Wishlist (authenticated) ──────────────────────
export async function fetchWishlist() {
  const res = await apiFetch(`${DJANGO_API}/wishlist/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur liste de souhaits');
  return res.json();
}

export async function addToWishlist(productId) {
  const res = await fetch(`${DJANGO_API}/wishlist/add/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error('Erreur ajout favori');
  return res.json();
}

export async function removeFromWishlist(productId) {
  const res = await fetch(`${DJANGO_API}/wishlist/remove/${productId}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur suppression favori');
  return res.json();
}

// ─── Recently Viewed (authenticated) ───────────────
export async function fetchRecentlyViewed() {
  const res = await fetch(`${DJANGO_API}/products/recently-viewed/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur vus récemment');
  return res.json();
}

export async function trackProductView(productId) {
  if (!isAuthenticated()) return;
  await fetch(`${DJANGO_API}/products/${productId}/track/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
}

// ─── Reviews ───────────────────────────────────────
export async function fetchReviews(productId) {
  const res = await fetch(`${DJANGO_API}/products/${productId}/reviews/`);
  if (!res.ok) throw new Error('Erreur avis');
  return res.json();
}

export async function submitReview(productId, rating, title, comment) {
  const res = await fetch(`${DJANGO_API}/products/${productId}/reviews/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ rating, title, comment }),
  });
  if (!res.ok) throw new Error('Erreur soumission avis');
  return res.json();
}

// ─── Search ────────────────────────────────────────
export async function searchGlobal(query) {
  const res = await fetch(`${DJANGO_API}/search/?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Erreur recherche');
  return res.json();
}

// ─── Commerce (Promo & Shipping) ───────────────────
export async function validatePromoCode(code, orderTotal) {
  const res = await fetch(`${DJANGO_API}/promo/validate/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ code, order_total: orderTotal }),
  });
  return res.json();
}

export async function fetchShippingRates() {
  const res = await fetch(`${DJANGO_API}/shipping-rates/`);
  if (!res.ok) throw new Error('Erreur livraison');
  return res.json();
}

export async function getShippingRate(wilayaCode) {
  const res = await fetch(`${DJANGO_API}/shipping-rates/${wilayaCode}/`);
  if (!res.ok) throw new Error('Erreur wilaya');
  return res.json();
}

// ─── Dashboard & Addresses (authenticated) ─────────
export async function fetchDashboard() {
  const res = await fetch(`${DJANGO_API}/auth/dashboard/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur tableau de bord');
  return res.json();
}

export async function fetchAddresses() {
  const res = await fetch(`${DJANGO_API}/auth/addresses/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur adresses');
  return res.json();
}

export async function addAddress(addressData) {
  const res = await fetch(`${DJANGO_API}/auth/addresses/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(addressData),
  });
  if (!res.ok) throw new Error('Erreur ajout adresse');
  return res.json();
}

export async function updateOrderWithPromo({ shippingAddress, wilaya, phone, paymentMethod, notes, promoCode }) {
  const res = await fetch(`${DJANGO_API}/orders/create/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      shipping_address: shippingAddress,
      wilaya,
      phone,
      payment_method: paymentMethod,
      notes: notes || '',
      promo_code: promoCode || '',
    }),
  });
  if (!res.ok) throw new Error('Erreur création commande avec promo');
  return res.json();
}

// ─── Partner / Marketplace (authenticated) ───────────
export async function fetchPartnerProducts() {
  const res = await fetch(`${DJANGO_API}/partner/products/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur chargement de vos produits');
  return res.json();
}

export async function addPartnerProduct(productData) {
  const res = await fetch(`${DJANGO_API}/partner/products/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Erreur lors de l’ajout du produit');
  }
  return res.json();
}

export async function updatePartnerProduct(id, productData) {
  const res = await fetch(`${DJANGO_API}/partner/products/${id}/`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return res.json();
}

export async function deletePartnerProduct(id) {
  const res = await fetch(`${DJANGO_API}/partner/products/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return true;
}

