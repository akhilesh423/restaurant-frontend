import React, { useState } from "react";
import "./Menu.css";
import foodImage from "../Assests/foodImg.jpg";
import MenuItems from "../MenuItems/MenuItems";

export default function Menu() {
    const [foodMenu, setFoodMenu] = useState(MenuItems);
    const [category, setCategory] = useState("All");
    const [cartItems, setCartItems] = useState([]);
    const [showQuantityButtons, setShowQuantityButtons] = useState([]);
    const [quantity, setQuantity] = useState({});


    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    const handleAddToCart = (item) => {
        const newCartItems = [...cartItems, item];
        setCartItems(newCartItems);
        setShowQuantityButtons([...showQuantityButtons, item.id]);
        setQuantity({ ...quantity, [item.id]: 1 });
    };


    const handleIncrement = (id) => {
        const newQuantity = { ...quantity };
        newQuantity[id] = (newQuantity[id] || 0) + 1;
        setQuantity(newQuantity);
    };

    const handleDecrement = (id) => {
        if (quantity[id] > 0) {
            setQuantity({ ...quantity, [id]: quantity[id] - 1 });
            if (quantity[id] === 1) {
                setShowQuantityButtons(showQuantityButtons.filter(itemId => itemId !== id));
            }
        }
    };


    console.log(cartItems)

    const uniqueCategories = Array.from(new Set(MenuItems.map(item => item.category)));
    const filteredFoodMenu = category === "All" ? foodMenu : foodMenu.filter(item => item.category === category || category === "All");

    return (
        <div className="menu-container">
            <div className="category-container">
                <li>
                    <button className="category-button" onClick={() => handleCategoryClick("All")}>All</button>
                </li>
                {uniqueCategories.map((categoryName, index) => (
                    <li key={index}>
                        <button className="category-button" onClick={() => handleCategoryClick(categoryName)}>{categoryName}</button>
                    </li>
                ))}
            </div>
            <div className={`fooditems-container ${category !== 'All' && 'hidden'}`}>
                {filteredFoodMenu.map((item, index) => (
                    <div key={index} >
                        <div className="food-item-card">
                            <div className="food-image-container">
                                <img className="food-image" src={item.image} alt={item.itemName} />
                                <div className="button-container">
                                    {showQuantityButtons.includes(item.id) ? (
                                        <>
                                            <button className="add-to-cart-button" onClick={handleDecrement}>-</button>
                                            <span className="quantity">{quantity[item.id]}</span>
                                            <button className="add-to-cart-button" onClick={handleIncrement}>+</button>

                                        </>
                                    ) : (
                                        <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>ADD</button>
                                    )}

                                </div>
                            </div>

                            <div className="food-details">
                                <h3 className="food-name">{item.itemName}</h3>
                                <p className="food-price">Price: ${item.itemPrice}</p>
                                <p className="food-description">{item.description}</p>
                            </div>
                        </div>
                        {index !== filteredFoodMenu.length - 1 && <hr className="food-item-divider" />} {/* Render the line if not the last item */}
                    </div>
                ))}
            </div>
            {cartItems.length > 0 && (
                <div className="cart-notification">
                    <div className="cart-item-details">
                        <p className="cart-item-name">2 ITEMS</p>
                        <p className="cart-item-price">$259</p>
                    </div>
                    <div>
                        <button className="checkout-button">Checkout</button>
                    </div>

                </div>
            )}
        </div>
    );
}
