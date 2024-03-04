import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Menu.css";
import { IoLocationSharp } from "react-icons/io5";

export default function Menu() {
    const [foodMenu, setFoodMenu] = useState([]);
    const [category, setCategory] = useState("All");
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://bling-bliss.onrender.com/user/items");
                const data = await response.json();
                const formattedData = data.map(item => ({
                    id: item._id,
                    name: item.itemName,
                    category: item.itemCategory,
                    description: item.itemDescription,
                    image: item.itemImage,
                    price: item.itemPrice,
                    type: item.itemType,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    quantity: 0
                }));

                setFoodMenu(formattedData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    const checkout = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        navigate("/cart");
    };

    const handleAddToCart = (item) => {
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

    const handleIncrement = (id) => {
        const newQuantity = { ...quantity };
        newQuantity[id] = (newQuantity[id] || 0) + 1;
        setQuantity(newQuantity);

        const index = cartItems.findIndex(item => item.id === id);
        if (index !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index].quantity += 1;
            setCartItems(updatedCartItems);
        }
    };

    const handleDecrement = (id) => {
        const newQuantity = { ...quantity };
        newQuantity[id] = (newQuantity[id] || 0) - 1;
        if (newQuantity[id] < 0) {
            newQuantity[id] = 0;
        }
        setQuantity(newQuantity);

        const index = cartItems.findIndex(item => item.id === id);
        if (index !== -1 && cartItems[index].quantity > 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index].quantity -= 1;
            if (updatedCartItems[index].quantity === 0) {
                updatedCartItems.splice(index, 1);
            }
            setCartItems(updatedCartItems);
        }
    };

    const uniqueCategories = Array.from(new Set(foodMenu.map(item => item.category)));
    const filteredFoodMenu = category === "All" ? foodMenu : foodMenu.filter(item => item.category === category || category === "All");

    return (
        <div className="menu-container">
            {loading && <div className="loader"></div>}
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
                    <div key={item.id}>
                        <div className="food-item-card">
                            <div className="food-image-container">
                                <img className="food-image" src={item.image} alt={item.name} />
                                <div className="button-container">
                                    {cartItems.some(cartItem => cartItem.id === item.id) ? (
                                        <>
                                            <button className="add-to-cart-button" onClick={() => handleDecrement(item.id)}>-</button>
                                            <span className="quantity">{quantity[item.id]}</span>
                                            <button className="add-to-cart-button" onClick={() => handleIncrement(item.id)}>+</button>
                                        </>
                                    ) : (
                                        <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>ADD</button>
                                    )}
                                </div>
                            </div>
                            <div className="food-details">
                                <h3 className="food-name">{item.name}</h3>
                                <p className="food-price">Price: ₹{item.price}</p>
                                <p className="food-description">{item.description}</p>
                            </div>
                        </div>
                        {index !== filteredFoodMenu.length - 1 && <hr className="food-item-divider" />}

                    </div>

                ))}
                <div className="disclaminer-section">
                    <h4 className="disclaimer">Our Philosophy:</h4>
                    <ul className="disclaimer-ul">
                        <li className="disclaimer-points">Indulge in more than just food; savor an experience.</li>
                        <li className="disclaimer-points">Nourish your body and soul with every bite.</li>
                        <li className="disclaimer-points">Discover the joy of culinary connection; where every dish unites.</li>
                    </ul>
                    <hr className="disclaimer-line" />
                    <h2 className="disclaimer">Bling n Bliss</h2>
                    <div style={{ display: "flex", alignItems: "center", paddingLeft: "8px" }}>
                        <span><IoLocationSharp style={{ fontSize: "14px", paddingRight: "8px", marginTop: "5px" }} /></span>
                        <p className="disclaimer-address" style={{ marginBottom: "0px" }}> Kompally, Kaziguda, Hyderabad, Telangana 500100</p>
                    </div>
                    <p className="disclaimer-address address">Call: +91 8121697022</p>
                    <p className="disclaimer-address address">Email: blingnbliss1@gmail.com</p>
                    <br />
                    <p className="disclaimer-address" style={{ textAlign: "center" }}>Developed by @Akhil</p>
                </div>
            </div>
            {cartItems.length > 0 && (
                <div className="cart-notification">
                    <div className="cart-item-details">
                        <p className="cart-item-name">{cartItems.length} ITEMS</p>
                        <p className="cart-item-price">₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
                    </div>
                    <div>
                        <button onClick={checkout} className="checkout-button">Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
