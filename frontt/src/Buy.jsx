import React, { useState } from 'react';
import axios from 'axios';
import './Buy.css';

const products = [
  { _id: '60c72b2f9b1d8a35b4c3e84b', title: 'Snowy Leopard', artist: 'Earth', description: 'A lonely snow leopard in a vast world.', price: 1000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuegml2H6Ac-L1198jEVP0SeY_MhAmCCdqBw&usqp=CAU', dimensions: '24x36 inches', materials: 'Canvas, Acrylic Paint', count: 1 },
  { _id: '60c72b3d9b1d8a35b4c3e84c', title: 'Flower Bag', artist: 'Earth', description: 'A set of flowers made using ribbons.', price: 1000, image: '/pics_web/crafts.jpg', dimensions: '15x20 inches', materials: 'Fabric, Ribbons', count: 1 }
];

function Buy() {
  const [quantities, setQuantities] = useState(products.reduce((acc, product) => {
    acc[product._id] = 1;
    return acc;
  }, {}));
  const [viewedProductId, setViewedProductId] = useState(null);

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
      console.log(product, 'at buying');
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
                
              <button className="btn btn-primary m5" onClick={() => handleAddToCart(product) }>Add to Cart</button>
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
