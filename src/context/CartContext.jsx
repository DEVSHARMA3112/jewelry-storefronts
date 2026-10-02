import React, { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be utilized specifically within a valid CartProvider element tree.');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const toastTimeoutRef = useRef(null);

  // Safely increments or appends new shopping items to the state context matrix
  const addToCart = useCallback((productVariant, selectedQuantity) => {
    setCartItems((currentItems) => {
      const existingProduct = currentItems.find((item) => item.id === productVariant.id);
      
      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === productVariant.id
            ? { ...item, qty: Math.min(9, item.qty + selectedQuantity) }
            : item
        );
      }
      
      return [...currentItems, { ...productVariant, qty: selectedQuantity }];
    });

    // Handle toast notification cycle
    setToastMessage(`Added ${selectedQuantity} × ${productVariant.title}`);
    
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 2500);

    // Open side cart layout panel for modern user interaction confirmation
    setIsCartOpen(true);
  }, []);

  // Updates single product line quantities while capping bounds cleanly
  const updateQuantity = useCallback((variantId, targetedQuantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === variantId
          ? { ...item, qty: Math.max(1, Math.min(9, targetedQuantity)) }
          : item
      )
    );
  }, []);

  // Removes item completely from array matrix
  const removeItem = useCallback((variantId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== variantId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Performance calculations using useMemo to stop redundant page lag
  const totalItemCount = useMemo(() => {
    return cartItems.reduce((runningSum, currentItem) => runningSum + currentItem.qty, 0);
  }, [cartItems]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((runningSum, currentItem) => runningSum + (currentItem.qty * currentItem.price), 0);
  }, [cartItems]);

  const contextValue = useMemo(() => ({
    items: cartItems,
    count: totalItemCount,
    total: totalCartPrice,
    add: addToCart,
    setQty: updateQuantity,
    remove: removeItem,
    open: isCartOpen,
    setOpen: setIsCartOpen,
    toast: toastMessage,
    clear: clearCart,
  }), [cartItems, totalItemCount, totalCartPrice, addToCart, updateQuantity, removeItem, isCartOpen, toastMessage, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
