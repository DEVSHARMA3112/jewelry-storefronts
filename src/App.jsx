import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrandLayout } from './layouts/BrandLayout';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { NotFound } from './pages/NotFound';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/:brand" element={<BrandLayout />}>
        <Route index element={<Landing />} />
        <Route path=":category" element={<ProductList />} />
        <Route path=":category/:slug" element={<ProductDetail />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
