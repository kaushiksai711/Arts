import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
const apiUrl= "https://arts-github-io-2.onrender.com"
function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : '');
  const [email] = useState(user ? user.email : ''); // Email should not be editable
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch products being sold by the user
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/selling`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            username: user.name,
            Email: user.email,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchProducts();
  }, [user]);

  // Fetch orders with paid: 'Yes' for the user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/payment`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            userId: user._id,
            paid: 'Yes',
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchOrders();
  }, [user]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/update-user`, { email, name });
      if (response.status === 200) {
        const updatedUser = { ...user, name };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false); // Hide the form after successful submission
        alert('Name updated successfully');
      } else {
        alert('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      alert('An error occurred while updating the name');
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        alert('Product removed successfully');
        // Update the products state to reflect the removal
        setProducts(products.filter(product => product._id !== productId));
      } else {
        alert('Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error.response ? error.response.data.message : error.message);
      alert('An error occurred while removing the product');
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Dashboard</h2>
      {user ? (
        <div className='container5'>
          <div className='card1'>
            <h5>Welcome to your dashboard, {user.name}!</h5>
            <h5><b>Email:</b> {user.email}</h5>

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Edit Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Name</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Details
              </button>
            )}
          </div>
          <hr />
          <div className='container5' id='A'>
            <h4>Products You Are Selling:</h4>
            <div className="row">
              {products.map(product => (
                <div key={product._id} className="col-lg-4 col-md-4 col-sm-12 mb-4">
                  <div className="card" style={{ backgroundColor: 'lightblue' }}>
                    <img
                      src={`${apiUrl}/uploads/${product.image}`}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body1" style={{ borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">Rs.{product.price}</p>
                      <button className="btn btn-danger" onClick={() => handleRemoveProduct(product._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className='container5' id='B'>
            <h4>Your Paid Orders:</h4>
            <div className="row">
              {orders.length > 0 ? (
                orders.map(order => (
                  <div key={order._id} className="col-lg-4 col-md-4 col-sm-12 mb-4">
                    <div className="card" style={{ backgroundColor: 'lightgreen' }}>
                      <div className="card-body1">
                        <h5 className="card-title">Order ID: {order._id}</h5>
                        <p className="card-text">Total Amount: Rs.{order.totalAmount}</p>
                        <p className="card-text">Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}</p>
                        <p className="card-text">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No paid orders found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Please log in to see your dashboard details.</p>
      )}
    </div>
  );
}

export default Dashboard;
