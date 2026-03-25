import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoriesHub from './pages/CategoriesHub';
import CategoryDetail from './pages/CategoryDetail';
import Product from './pages/Product';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="categories" element={<CategoriesHub />} />
          <Route path="category/:id" element={<CategoryDetail />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
