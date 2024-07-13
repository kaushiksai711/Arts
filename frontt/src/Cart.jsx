import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
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
  const handlePlaceOrder = () => {
    const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    navigate(`/${cart[0]['userId']}/payment?total=${totalAmount}`);
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
                  <img src={item.product.image} alt={item.product._Id} style={{ width: '100px', marginRight: '10px' }} />
                </div>
                <div>
                  <h5>{item.product.title}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per piece: ${item.product.price}</p>
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
        <div className="d-flex justify-content-between align-items-center mt-3" id='A'>
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
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
