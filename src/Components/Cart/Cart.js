import { useState, useEffect } from "react";
import foodImage from "../Assests/foodImg.jpg";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
    const foodOrders = [
        {
            id: 1,
            category: "Starters",
            itemPrice: 299,
            itemName: "Garlic Bread",
            description: "Toasted bread with garlic and herb butter",
            image: foodImage,
            isVeg: true
        },
        {
            id: 2,
            category: "Starters",
            itemPrice: 249,
            itemName: "Bruschetta",
            description: "Toasted bread topped with tomatoes, basil, and olive oil",
            image: foodImage,
            isVeg: false
        }
    ];

    const [orders, setOrders] = useState(foodOrders);
    const [showTab, setShowTab] = useState(false);
    const [instructions, setInstructions] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const navigate = useNavigate()

    const handleInstructions = () => {
        setShowTab(!showTab);
    };

    const handleInputChange = (event) => {
        setInstructions(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleConfirm = () => {
        // Handle confirm action here
        console.log('Selected option:', selectedOption);
        console.log('Phone number:', phoneNumber);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled]);

    const handleBackButton = () => {
        navigate("/")
    }


    return (
        <>
            <div className={`cart-navbar ${isScrolled ? "scrolled" : ""}`}>
                <button onClick={handleBackButton} className="back-button"> <GoArrowLeft /></button>
                <h2 className="food-cart">FOOD CART</h2>
            </div>

            <div className="cart-page">
                <div className="cart-orders">
                    {orders.map((eachItem) => (
                        <div key={eachItem.id}>
                            <div className="order-item">
                                <div>
                                    <h1 className="food-item-name">
                                        <span className={eachItem.isVeg ? "veg-icon" : "non-veg-icon"}></span>
                                        {eachItem.itemName}</h1>
                                    <p className="food-item-price">₹{eachItem.itemPrice}</p>
                                </div>
                                <div className="button-price-container">
                                    <div className="button-container">
                                        <button className="add-to-cart-button">-</button>
                                        <span className="quantity">1</span>
                                        <button className="add-to-cart-button">+</button>
                                    </div>
                                    <p className="food-item-price dynamic-price">₹356</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr className="dotted-line" />
                    <div className="display-section">
                        <p>Add more items</p>
                        <IoIosArrowForward />
                    </div>
                    <hr className="dotted-line" />
                    <div className="display-section">
                        <p>Add cooking instructions</p>
                        <button onClick={handleInstructions}>
                            <IoIosArrowForward />
                        </button>
                        {showTab && (
                            <div className="input-container">
                                <input className="input-block " placeholder="Start typing..." type="textarea" rows={20} value={instructions} onChange={handleInputChange} />
                            </div>
                        )}
                    </div>
                </div>
                <Modal open={open} onClose={onCloseModal} center>
                    <form className="modal-form">
                        <div>
                            <label htmlFor="options">Select your theatre:</label>
                            <select id="options" value={selectedOption} onChange={handleOptionChange}>
                                <option value="">Select</option>
                                <option value="Option 1">Cupid Theatre</option>
                                <option value="Option 2">Luminous Theatre</option>
                                <option value="Option 3">Blossom Theatre</option>
                                <option value="Option 4">Tropix Theatre</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone number:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <button type="button" onClick={handleConfirm}>Confirm</button>
                    </form>
                </Modal>
                <div>
                    <button onClick={onOpenModal} className="place-order-button">Place Order</button>
                </div>

            </div>
        </>
    );
}
