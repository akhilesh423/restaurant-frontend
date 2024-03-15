import { useState, useEffect } from "react";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../Context/cartContext.js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
    const [showTab, setShowTab] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { cartItems, setCartItems } = useCart()
    const { selectedItemId, setSelectedItemId } = useCart();
    const [placedOrder, setPlacedOrder] = useState({
        instructions: "",
        roomName: "",
        phoneNumber: "",
        orders: [],
        totalPrice: null
    });



    const onOpenModal = () => {
        // Update placedOrder state whenever the modal is opened
        setPlacedOrder(prevPlacedOrder => ({
            ...prevPlacedOrder,
            orders: [...cartItems],
            totalPrice: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        }));
        setOpen(true);
    };

    const onCloseModal = () => setOpen(false);

    const navigate = useNavigate()

    const handleInstructions = () => {
        setShowTab(!showTab);

    };


    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        setPlacedOrder(prevState => ({
            ...prevState,
            [name]: value
        }));

    };




    const handleConfirm = async () => {
        if (!placedOrder.roomName || !placedOrder.phoneNumber) {
            alert('Please select a room and enter a phone number.');
            return;
        }

        setPlacedOrder({
            ...placedOrder,
            orders: [...cartItems],
            totalPrice: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        });

        try {
            const response = await fetch('https://bling-bliss.onrender.com/user/placedOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(placedOrder)
            });

            if (response.ok) {
                toast.success('Order placed successfully!');
                setPlacedOrder({});
            } else {
                toast.error('Failed to place order. Please, try again!');

            }
        } catch (error) {
            toast.error('Failed to place order. Please, try again!');
            console.error('Error occurred while placing the order:', error);
        }
    };



    const handleBackButton = () => {
        navigate("/")
    }



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
    }, []);


    const handleIncrement = (id) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.map(eachItem => {
                if (eachItem.id === id) {
                    return { ...eachItem, quantity: eachItem.quantity + 1 };
                }
                return eachItem;
            });
            console.log(updatedCartItems);
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

            console.log(updatedCartItems);

            return updatedCartItems;
        });
    }

    const handleAddmoreItems = () => {
        navigate('/')
    }


    return (
        <>
            <div className={`cart-navbar ${isScrolled ? "scrolled" : ""}`}>
                <button onClick={handleBackButton} className="back-button"> <GoArrowLeft /></button>
                <h2 className="food-cart">FOOD CART</h2>
            </div>

            <div className="cart-page">
                <div className="cart-orders">
                    {cartItems.map((eachItem) => (
                        <div key={eachItem.id}>
                            <div className="order-item">
                                <div>
                                    <h1 className="food-item-name">
                                        <span className={eachItem.type === "veg" ? "veg-icon" : eachItem.type === "non-veg" ? "non-veg-icon" : ""}></span>

                                        {eachItem.name}</h1>
                                    <p className="food-item-price">₹{eachItem.price}</p>
                                </div>
                                <div className="button-price-container">
                                    <div className="button-container">
                                        <button className="add-to-cart-button" onClick={() => handleDecrement(eachItem.id)} >-</button>
                                        <span className="quantity">{eachItem.quantity}</span>
                                        <button className="add-to-cart-button" onClick={() => handleIncrement(eachItem.id)}>+</button>
                                    </div>
                                    <p className="food-item-price dynamic-price">{eachItem.price * eachItem.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr className="dotted-line" />
                    <div className="display-section">
                        <p>Add more items</p>
                        <button className="addmore-btn" onClick={handleAddmoreItems}>
                            <IoIosArrowForward />
                        </button>

                    </div>
                    <hr className="dotted-line" />
                    <div className="display-section">
                        <p>Add cooking instructions</p>
                        <button onClick={handleInstructions}>
                            <IoIosArrowForward />
                        </button>
                        {showTab && (
                            <div className="input-container">
                                <input name="instructions" className="input-block " placeholder="Start typing..." type="textarea" rows={20} value={placedOrder.instructions} onChange={handleInputEvent} />
                            </div>
                        )}
                    </div>
                    <hr className="dotted-line" />
                    <div className="totals-section">
                        <p className="totals-label">Total items:</p>
                        <p className="totals-value">{cartItems.length}</p>
                    </div>
                    <hr className="dotted-line" />
                    <div className="totals-section">
                        <p className="totals-label">Total price:</p>
                        <p className="totals-value">₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
                    </div>
                </div>
                <Modal open={open} onClose={onCloseModal} center>
                    <form className="modal-form">
                        <div>
                            <label htmlFor="options">Select your theatre:</label>
                            <select name="roomName" id="options" value={placedOrder.roomName} onChange={handleInputEvent}>
                                <option value="">Select</option>
                                <option value="Cupid Theatre">Cupid Theatre</option>
                                <option value="Luminous Theatre">Luminous Theatre</option>
                                <option value="Blossom Theatre">Blossom Theatre</option>
                                <option value="Tropix Theatre">Tropix Theatre</option>
                            </select>

                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Phone number:</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                id="phoneNumber"
                                value={placedOrder.phoneNumber}
                                onChange={handleInputEvent}
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
