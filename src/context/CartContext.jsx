import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Ensure price is a number and currency is defined
      const cleanItem = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        productCurrency: product.currency || "USD",
        quantity: 1,
        images: product.images || [],
        longDescription: product.longDescription || "",
        rating: product.rating || 0,
        estimatedTimeMinutes: product.estimatedTimeMinutes || 0,
        estimatedMaterialUseGrams: product.estimatedMaterialUseGrams || 0,
      };

      // Optional dev log for debugging
      if (isNaN(cleanItem.price)) {
        console.warn("Cart item has invalid price:", product);
      }

      return [...prev, cleanItem];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
