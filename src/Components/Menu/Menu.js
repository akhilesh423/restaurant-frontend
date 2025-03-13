import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./Menu.css";
import { IoLocationSharp } from "react-icons/io5";
import { useCart } from "../Context/cartContext.js"
export default function Menu() {
    const [foodMenu, setFoodMenu] = useState([]);
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const { selectedItemId, setSelectedItemId } = useCart();
    const { cartItems, setCartItems } = useCart();


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://restaurant-backend-3-jr5w.onrender.com/user/items");
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

                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    const checkout = () => {
        navigate("/cart");
    };

    const handleAddToCart = (item) => {
        setSelectedItemId(prevIds => [...prevIds, item.id]);
        setCartItems(prevCartItems => {
            const index = prevCartItems.findIndex(cartItem => cartItem.id === item.id);
            if (index !== -1) {
                const updatedCartItems = [...prevCartItems];
                updatedCartItems[index].quantity++;

                return updatedCartItems;
            } else {
                const updatedCartItems = [...prevCartItems, { ...item, quantity: 1 }];

                return updatedCartItems;
            }

        });
    }

    const handleIncrement = (id) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.map(eachItem => {
                if (eachItem.id === id) {
                    return { ...eachItem, quantity: eachItem.quantity + 1 };
                }
                return eachItem;
            });

            return updatedCartItems;
        });
    }

    const handleDecrement = (id) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.map(eachItem => {
                if (eachItem.id === id) {
                    if (eachItem.quantity > 1) {
                        return { ...eachItem, quantity: eachItem.quantity - 1 };
                    } else {

                        setSelectedItemId(prevIds => prevIds.filter(itemId => itemId !== id));
                        return null;
                    }
                }
                return eachItem;
            }).filter(Boolean);



            return updatedCartItems;
        });
    }



    const uniqueCategories = [...new Set(foodMenu.map(item => item.category))];

    const filteredFoodMenu = category === "All" ? foodMenu : foodMenu.filter(item => item.category === category);


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
                                    {selectedItemId.includes(item.id) ? (
                                        <>
                                            <button onClick={() => handleDecrement(item.id)} className="add-to-cart-button">-</button>
                                            <span className="quantity">{cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0}</span>
                                            <button onClick={() => handleIncrement(item.id)} className="add-to-cart-button">+</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">ADD</button>
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
