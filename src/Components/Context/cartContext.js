import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState({});

    const addToCart = (item) => {
        const index = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            setQuantity({ ...quantity, [item.id]: 1 });
        }
    };


    return (
        <CartContext.Provider value={{ cartItems: cartItems || [], addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
