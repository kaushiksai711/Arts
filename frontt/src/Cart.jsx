import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css'
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
        console.log(response.data,'responsedata')
        setCart(response.data);
 
      } catch (error) {
        console.error('Error fetching cart:', error);
        setMessage('Error fetching cart');
      }
    };

    fetchCart();
  }, []);
  console.log(cart,'cartanta')
  const handleRemoveFromCart = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please log in to remove items from the cart');
        return;
      }
      console.log(id)
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

  return (
    <div className="container container3 mt-5">
      <h2>Your Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            
            <li key={index} className="list-group-item custom-list-item d-flex justify-content-between align-items-center margin:20px">
              <div className="d-flex align-items-center">
              <div>
                <img src={item.product.image} alt={item.product._Id} style={{ width: '300px', marginRight: '10px' }} />
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
    </div>
  );
}

export default Cart;
