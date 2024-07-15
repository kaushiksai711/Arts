import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Buy.css';

function Buy() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [viewedProductId, setViewedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data); // Assuming your API response is an array of products
        initializeQuantities(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchProducts();
  }, []);

  const initializeQuantities = (products) => {
    const initialQuantities = products.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  };

  const handleQuantityChange = (product, value) => {
    setQuantities({
      ...quantities,
      [product._id]: Number(value),
    });
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to the cart');
        return;
      }

      const quantity = quantities[product._id];
      await axios.post('http://localhost:5000/api/cart/add',
        { product, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data.message : error.message);
    }
  };

  const toggleViewDetails = (productId) => {
    setViewedProductId(viewedProductId === productId ? null : productId);
  };

  return (
    <div>
      {products.map(product => (
        <div className="container5" key={product._id} id="A">
          <h2>{product.title}</h2>
          <div className="row">
            <div className="col-lg-4">
              <img src={product.image} width="720" border=' solid 1px' className="img-fluid rounded-corners " alt={product.title} />
            </div>
            <div className="col-lg-8">
              <div className="product-info">
                <h4><strong>Title:</strong> {product.title}</h4>
                <h4><strong>Artist:</strong> {product.artist}</h4>
                <h4><strong>Price:</strong> ${product.price}</h4>
                {viewedProductId === product._id && (
                  <div className="product-details">
                    <h4><strong>Description:</strong> {product.description}</h4>
                    <h4><strong>Dimensions:</strong> {product.dimensions}</h4>
                    <h4><strong>Materials:</strong> {product.materials}</h4>
                    
                  </div>
                )}
              </div>
              <div className="product-actions">
                <input
                  type="number"
                  min="1"
                  value={quantities[product._id]}
                  onChange={(e) => handleQuantityChange(product, e.target.value)}
                  className="form-control1"
                />
                <button className="btn btn-primary m5" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button onClick={() => toggleViewDetails(product._id)} className="btn btn-primary m5">
                  {viewedProductId === product._id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Buy;
