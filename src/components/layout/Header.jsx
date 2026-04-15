"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Command, LayoutDashboard, ArrowLeftRight, Globe, ChevronDown } from 'lucide-react';
import { isAuthenticated, fetchProfile } from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' }
  ];

  return (
    <div className="language-selector">
      <button className="lang-btn" onClick={() => setIsOpen(!isOpen)}>
        <Globe size={20} strokeWidth={1.5} />
        <span>{languages.find(l => l.code === locale)?.label.substring(0, 2).toUpperCase()}</span>
      </button>
      {isOpen && (
        <div className="lang-dropdown">
          {languages.map(lang => (
            <button 
              key={lang.code} 
              className={`lang-option ${locale === lang.code ? 'active' : ''}`}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CategoriesNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();

  if (pathname !== '/shop') return null;

  const activeFilter = searchParams.get('filter') || 'all';

  const setFilter = (filter) => {
    router.push(`/shop${filter === 'all' ? '' : `?filter=${filter}`}`);
  };

  return (
    <div className="container header-categories">
      <div className="filters">
        <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t('nav_all')}</button>
        <button className={`filter-btn ${activeFilter === 'soins-visage' ? 'active' : ''}`} onClick={() => setFilter('soins-visage')}>{t('nav_face')}</button>
        <button className={`filter-btn ${activeFilter === 'soins-corps' ? 'active' : ''}`} onClick={() => setFilter('soins-corps')}>{t('nav_body')}</button>
        <button className={`filter-btn ${activeFilter === 'maquillage' ? 'active' : ''}`} onClick={() => setFilter('maquillage')}>{t('nav_makeup')}</button>
        <button className={`filter-btn ${activeFilter === 'nails' ? 'active' : ''}`} onClick={() => setFilter('nails')}>{t('nav_nails')}</button>
        <button className={`filter-btn ${activeFilter === 'para-dose' ? 'active' : ''}`} onClick={() => setFilter('para-dose')}>{t('nav_bar')}</button>
        <button className={`filter-btn ${activeFilter === 'soin-cheveux' ? 'active' : ''}`} onClick={() => setFilter('soin-cheveux')}>{t('nav_hair')}</button>
        <button className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>{t('nav_news')}</button>
      </div>
    </div>
  );
};

const Header = () => {
  const [user, setUser] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  React.useEffect(() => {
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);

    if (authStatus) {
      fetchProfile()
        .then(data => setUser(data))
        .catch(() => setIsAuth(false));
    }
  }, []);

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo">
          <Command size={28} strokeWidth={1.5} />
          hilytouch
        </Link>
        <form className="search-bar" onSubmit={(e) => { 
          e.preventDefault(); 
          const query = e.target.search.value;
          if (query.trim()) {
            router.push(`/shop?search=${encodeURIComponent(query)}`);
          }
        }}>
          <input 
            type="text" 
            name="search"
            placeholder={t('search_placeholder')} 
            className="search-input"
          />
          <button type="submit" className="search-btn"><Search size={18} /></button>
        </form>
        <div className="header-actions">
          <Link href="/compare" className="nav-action-text with-icon" style={{ color: 'var(--color-gold)' }}>
            <ArrowLeftRight size={18} />
            <span>{t('compare')}</span>
          </Link>

          {user?.is_partner ? (
            <Link href="/seller/dashboard" className="nav-action-btn highlighted">
              <LayoutDashboard size={16} />
              <span>{t('partner_dashboard')}</span>
            </Link>
          ) : (
            <Link href="/seller/register" className="nav-action-btn">{t('partner_account')}</Link>
          )}

          {isAuth ? (
            <Link href="/dashboard" className="nav-action-text with-icon">
              <User size={20} />
              <span>{t('my_account')}</span>
            </Link>
          ) : (
            <Link href="/auth" className="nav-action-text with-icon">
              <User size={20} />
              <span>{t('login')}</span>
            </Link>
          )}

          <Link href="/favorites" className="icon-btn">
            <Heart size={20} />
            <span className="cart-badge">0</span>
          </Link>

          <Link href="/cart" className="icon-btn">
            <ShoppingBag size={20} />
            <span className="cart-badge">0</span>
          </Link>

          <LanguageSwitcher />
        </div>
      </div>
      <Suspense fallback={null}>
        <CategoriesNav />
      </Suspense>
    </header>
  );
};

export default Header;
