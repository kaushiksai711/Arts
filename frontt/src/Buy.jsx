import React, { useState } from 'react';
import axios from 'axios';

function Buy() {
  const products = [
    { _id: '60c72b2f9b1d8a35b4c3e84b', title: 'Snowy Leopard', artist: 'Earth', description: 'A lonely snow leopard in a vast world.', price: 1000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuegml2H6Ac-L1198jEVP0SeY_MhAmCCdqBw&usqp=CAU',count:1},
    { _id: '60c72b3d9b1d8a35b4c3e84c', title: 'Flower Bag', artist: 'Earth', description: 'A set of flowers made using ribbons.', price: 1000, image: '/pics_web/crafts.jpg',count:1 }
  ];

  const [quantities, setQuantities] = useState(products.reduce((acc, product) => {
    acc[product] = 1;
    return acc;
  }, {}));

  const handleQuantityChange = (product, value) => {
    setQuantities({
      ...quantities,
      [product]: Number(value),
    });
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to the cart');
        return;
      }
 
      const quantity = quantities[product];
      console.log(product,'at buying')
      await axios.post('http://localhost:5000/api/cart/add', 
        { product, quantity }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      {products.map(product => (
        <div className="container" key={product._id} id="A">
          <h2>{product.title}</h2>
          <div className="row">
            <div className="col-lg-4">
              <img src={product.image} width="720" className="img-fluid" alt={product.title} />
            </div>
            <div className="col-lg-8">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{product.title}</td>
                  </tr>
                  <tr>
                    <th>Artist</th>
                    <td>{product.artist}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{product.description}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>${product.price}</td>
                  </tr>
                </tbody>
              </table>
              <input
                type="number"
                min="1"
                value={quantities[product]}
                onChange={(e) => handleQuantityChange(product, e.target.value)}
                className="form-control"
              />
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Buy;
