import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

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

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.productId} - Quantity: {item.quantity}
            </li>
          ))
        ) : (
          <li className="list-group-item">Your cart is empty</li>
        )}
      </ul>
    </div>
  );
}

export default Cart;
