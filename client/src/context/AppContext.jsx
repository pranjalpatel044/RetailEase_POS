import { createContext, useState, useEffect } from "react";
import { fetchCategory } from "../service/CategoryService.js";
import { fetchItems } from "../service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.itemId === item.itemId
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.itemId === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setAuthData(token, role);
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!auth.token) return;

      try {
        const response = await fetchCategory();
        const itemResponse = await fetchItems();

        setCategories(response.data || []);
        setItemsData(itemResponse.data || []);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }

    loadData();
  }, [auth.token]);


  const clearCart = () => {
    setCartItems([]);
  }


  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
