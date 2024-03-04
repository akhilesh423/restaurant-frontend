import { useState, useEffect } from "react";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
    const [orders, setOrders] = useState([]);
    const [showTab, setShowTab] = useState(false);
    const [instructions, setInstructions] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems');
        if (cartItemsFromStorage) {
            setOrders(JSON.parse(cartItemsFromStorage));
        }
    }, []);

    useEffect(() => {
        let itemsCount = 0;
        let totalPrice = 0;
        orders.forEach(order => {
            itemsCount += order.quantity;
            totalPrice += order.price * order.quantity;
        });
        setTotalItems(itemsCount);
        setTotalPrice(totalPrice);
    }, [orders]);

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
        console.log('Selected option:', selectedOption);
        console.log('Phone number:', phoneNumber);
        onCloseModal()

    };

    const handleBackButton = () => {
        navigate("/")
    }

    const handleQuantityChange = (id, increment) => {
        const updatedOrders = orders.map(order => {
            if (order.id === id) {
                return {
                    ...order,
                    quantity: increment ? order.quantity + 1 : order.quantity - 1
                };
            }
            return order;
        });
        setOrders(updatedOrders.filter(order => order.quantity > 0));
    }

    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems');
        if (cartItemsFromStorage) {
            setOrders(JSON.parse(cartItemsFromStorage));
        }

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
    }, []);

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
                                        {/* <span className={eachItem.type ? "veg-icon" : "non-veg-icon"}></span> */}
                                        {eachItem.name}</h1>
                                    <p className="food-item-price">₹{eachItem.price}</p>
                                </div>
                                <div className="button-price-container">
                                    <div className="button-container">
                                        <button className="add-to-cart-button" onClick={() => handleQuantityChange(eachItem.id, false)}>-</button>
                                        <span className="quantity">{eachItem.quantity}</span>
                                        <button className="add-to-cart-button" onClick={() => handleQuantityChange(eachItem.id, true)}>+</button>
                                    </div>
                                    <p className="food-item-price dynamic-price">{eachItem.price * eachItem.quantity}</p>
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
                    <hr className="dotted-line" />
                    <div className="totals-section">
                        <p className="totals-label">Total items:</p>
                        <p className="totals-value">{totalItems}</p>
                    </div>
                    <hr className="dotted-line" />
                    <div className="totals-section">
                        <p className="totals-label">Total price:</p>
                        <p className="totals-value">₹{totalPrice}</p>
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
