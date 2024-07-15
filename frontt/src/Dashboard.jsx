import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : '');
  const [email] = useState(user ? user.email : ''); // Email should not be editable
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products being sold by the user
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/selling', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            username: user.name,
            email: user.email,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/update-user', { email, name });
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
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}`, {
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
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div className='container5' id='A' height='500px'>
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

          <hr />
          
          <h4>Products You Are Selling:</h4>
          <ul className="list-group">
            {products.map(product => (
              <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                {product.title} - ${product.price}
                <button className="btn btn-danger" onClick={() => handleRemoveProduct(product._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to see your dashboard details.</p>
      )}
    </div>
  );
}

export default Dashboard;
