import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setMessage('Please log in to view your cart');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setMessage('Error fetching cart');
            }
        };

        fetchCart();
    }, []);

    const handleRemoveFromCart = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Please log in to remove items from the cart');
                return;
            }
            await axios.delete(`http://localhost:5000/api/cart/remove/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(cart.filter(item => item._id !== id));

            setMessage('Item removed from cart');
        } catch (error) {
            console.error('Error removing from cart:', error);
            setMessage('Error removing item from cart');
        }
    };

    const handlePlaceOrder = async () => {
        const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        console.log(cart[0]['userId']);
        const orderDetails = {
          
            userId: cart[0]['userId'], // Replace this with actual user ID
            products: cart.map(item => ({
                productId: item.product._id,
                quantity: item.quantity,
            })),
            totalAmount,
            address,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/payment', orderDetails, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.status === 201) {
              const orderId = response.data._id; // Assuming the order ID is returned in the response data
              navigate(`/${orderDetails.userId}/payment?orderId=${orderId}&total=${totalAmount}`);
            } else {
                setMessage('Error placing order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setMessage('Error placing order');
        }
    };

    const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="container container3 mt-5">
            <h2>Your Cart</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <ul className="list-group">

                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <li key={index} className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div>
                                    <img src={`http://localhost:5000/uploads/${item.product.image}`} alt={item.product._id} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                </div>
                                <div>
                                    <h5>{item.product.title}</h5>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price per piece: Rs.{item.product.price}</p>
                                </div>
                            </div>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleRemoveFromCart(item._id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">Your cart is empty</li>
                )}
            </ul>
            {cart.length > 0 && (
                <div className="mt-3 container1">
                    <h4>Total: Rs. {totalAmount.toFixed(2)}</h4>
                    <div className="form-group">
                        <label htmlFor="street">Street Address</label>
                        <input
                            type="text"
                            id="street"
                            className="form-control"
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            className="form-control"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            className="form-control"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">ZIP Code</label>
                        <input
                            type="text"
                            id="zip"
                            className="form-control"
                            value={address.zip}
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            className="form-control"
                            value={address.country}
                            onChange={(e) => setAddress({ ...address, country: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        className="btn btn-success"
                        onClick={handlePlaceOrder}
                    >
                        Place Your Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
