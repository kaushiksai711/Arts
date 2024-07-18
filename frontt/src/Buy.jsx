import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Buy.css';
const apiUrl= "http://localhost:5000"
function Buy() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [viewedProductId, setViewedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
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
    const newValue = Math.min(Number(value), product.count);
    setQuantities({
      ...quantities,
      [product._id]: Number(newValue),
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
      await axios.post(
      `${apiUrl}/api/cart/add`,
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
    <div className="container">
      <h1 className="text-center">Products</h1>
      <div className="row">
        {products.map(product => (
          <div className={`col-lg-${viewedProductId === product._id ? 12 : 4} mb-4`} key={product._id}>
            {viewedProductId !== product._id && (
              <div className="card h-100 product-card">
                <img
                  src={`${apiUrl}/uploads/${product.image}`}
                  className="card-img-top product-image"
                  style={{height:'200px'}}
                  alt={product.title}
                />
                <div className="card-body1 product-details">
                  <h5 className="card-title product-title">{product.title}</h5>
                  <h6 className="product-price">Rs.{product.price}</h6>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                      type="number"
                      min="1"
                      max={product.count}
                      value={quantities[product._id]}
                      onChange={(e) => handleQuantityChange(product, e.target.value)}
                      className="form-control1 quantity-input"
                    />
                    <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => toggleViewDetails(product._id)}>
                      {viewedProductId === product._id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {viewedProductId === product._id && (
              <div className="container5 product-expanded" key={product._id} id="A">
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={`${apiUrl}/uploads/${product.image}`}
                      style={{ width: '720px', border: 'solid 5px', borderRadius: '5px' }}
                      className="img-fluid img-rounded"
                      alt={product.title}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="product-info">
                      <h2 className="card-title">{product.title}</h2>
                      <h5>{product.artist}</h5>
                      <h5>Rs.{product.price}</h5>
                      {viewedProductId === product._id && (
                        <div className="product-details" style={{ fontSize: 18 }}>
                          <font className="card-text">
                            <strong>Description: </strong>{product.description}
                          </font>
                          <p className="card-text"><strong>Dimensions:</strong> {product.dimensions}</p>
                          <p className="card-text"><strong>Materials:</strong> {product.materials}</p>
                        </div>
                      )}
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between align-items-center">
                        <input
                          type="number"
                          min="1"
                          max={product.count}
                          value={quantities[product._id]}
                          onChange={(e) => handleQuantityChange(product, e.target.value)}
                          className="form-control1 quantity-input"
                        />
                        <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => toggleViewDetails(product._id)}>
                          {viewedProductId === product._id ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buy;
