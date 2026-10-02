import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { METAL_HEX } from '../brands';
import { money } from '../utils/format';

export function ProductCard({ product }) {
  if (!product) return null;

  // Safely extract unique metal variations from standard arrays
  const variations = useMemo(() => {
    if (!product.variants) return [];
    return [...new Set(product.variants.map((variant) => variant.metal))];
  }, [product.variants]);

  // Fallback defaults for deep objects to prevent unexpected application crashes
  const targetRoute = `/${product.brand}/${product.category}/${product.slug}`;
  const firstImage = product.images?.[0] || { src: '', alt: product.title };
  const secondImage = product.images?.[1] || firstImage;
  const activeBadge = product.tags?.[0] || null;

  return (
    <article className="product-card group relative">
      <Link to={targetRoute} aria-label={`View details for ${product.title}`}>
        <div className="product-card-gallery overflow-hidden relative aspect-[4/5]">
          {activeBadge && (
            <span className="product-badge absolute top-3 left-3 z-10">
              {activeBadge}
            </span>
          )}
          
          <img
            className="product-image-primary w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            src={firstImage.src}
            alt={firstImage.alt}
            width="800"
            height="1000"
            loading="lazy"
          />
          <img
            className="product-image-secondary absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            src={secondImage.src}
            alt=""
            width="800"
            height="1000"
            loading="lazy"
          />
        </div>
        
        <h3 className="product-card-title mt-4 text-base font-medium">
          {product.title}
        </h3>
      </Link>
      
      <div className="product-card-meta mt-2 flex items-center justify-between">
        <span className="product-price text-sm">
          {product.compareAtPrice && (
            <s className="compare-price mr-2 opacity-50">{money(product.compareAtPrice)}</s>
          )} 
          <span className="current-price font-semibold">{money(product.price)}</span>
        </span>
        
        <span className="metal-swatches flex gap-1" aria-label={`Available in: ${variations.join(', ')}`}>
          {variations.map((metal) => (
            <span
              key={metal}
              className="swatch-indicator block w-4 h-4 rounded-full border border-gray-200"
              title={metal}
              style={{ backgroundColor: METAL_HEX[metal] || '#CCCCCC' }}
            />
          ))}
        </span>
      </div>
    </article>
  );
}
