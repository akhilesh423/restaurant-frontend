import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState([]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, selectedItemId, setSelectedItemId }}>
            {children}
        </CartContext.Provider>
    );
};

export { useCart, CartProvider };
