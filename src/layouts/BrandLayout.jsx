import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { BRANDS } from '../brands';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';
import { NotFound } from '../pages/NotFound';


export function BrandLayout() {
  const { brand: brandSlug } = useParams();
  const { toast } = useCart();

  // Safely look up brand configurations
  const currentBrand = BRANDS[brandSlug || ''];

  // Handle route validation safely
  if (!currentBrand) {
    return <NotFound />;
  }

  // Optional: Automatically update document metadata titles programmatically
  useEffect(() => {
    if (currentBrand.name) {
      document.title = `${currentBrand.name} | Premium Fine Jewelry`;
    }
  }, [currentBrand]);

  return (
    <div 
      className="site-wrapper min-h-screen flex flex-col antialiased selection:bg-amber-100" 
      data-brand={currentBrand.slug}
    >
      {/* Premium Accessibility Component */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 border shadow-sm z-50 text-sm font-medium"
      >
        Skip to content
      </a>

      <Header brand={currentBrand} />

      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        <Outlet context={currentBrand} />
      </main>

      <Footer brand={currentBrand} />
      <CartDrawer />

      {/* Global Accessible Notification Toast Port Layer */}
      {toast && (
        <div 
          className="global-toast fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded shadow-xl text-sm font-medium z-50 transition-all duration-300 animate-fade-in"
          role="status" 
          aria-live="polite"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
