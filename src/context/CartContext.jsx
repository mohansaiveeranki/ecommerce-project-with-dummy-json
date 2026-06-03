import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./cartContext";

const CART_KEY = "marketnest_cart";

const getDiscountPrice = (product) =>
  product.discountPercentage > 0
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;

const readCart = () => {
  try {
    const value = localStorage.getItem(CART_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage || 0,
      thumbnail: product.thumbnail,
      brand: product.brand,
      stock: product.stock,
    };

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...currentItems, { ...cartProduct, quantity }];
      }

      return currentItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + quantity,
                item.stock || item.quantity + quantity,
              ),
            }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((currentItems) => {
      if (quantity < 1) {
        return currentItems.filter((item) => item.id !== productId);
      }

      return currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock || quantity) }
          : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const summary = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const total = items.reduce(
      (sum, item) => sum + getDiscountPrice(item) * item.quantity,
      0,
    );

    return {
      itemCount,
      subtotal,
      discount: subtotal - total,
      total,
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      ...summary,
    }),
    [addToCart, clearCart, items, removeFromCart, summary, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
