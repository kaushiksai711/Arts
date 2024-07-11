import React from 'react';

function Buy() {
  return (
    <div>
      <div className="container" id="A">
        <h2>Arts</h2>
        <div className="row">
          <div className="col-lg-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuegml2H6Ac-L1198jEVP0SeY_MhAmCCdqBw&usqp=CAU" width="720" className="img-fluid" alt="Art Image" />
          </div>
          <div className="col-lg-8">
            <table className="table">
              <tbody>
                <tr>
                  <th>Title</th>
                  <td>Snowy Leopard</td>
                </tr>
                <tr>
                  <th>Artist</th>
                  <td>Earth</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>A lonely snow leopard in a vast world.</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>$1000</td>
                </tr>
              </tbody>
            </table>
            <button className="add-to-cart" data-name="Art Piece snow lep" data-price="1000">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="container" id="A">
        <h2>Crafts</h2>
        <div className="row">
          <div className="col-lg-4">
            <img src="/pics_web/crafts.jpg" width="720" className="img-fluid" alt="Art Image" />
          </div>
          <div className="col-lg-8">
            <table className="table">
              <tbody>
                <tr>
                  <th>Title</th>
                  <td>Flower Bag</td>
                </tr>
                <tr>
                  <th>Artist</th>
                  <td>Earth</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>A set of flowers made using ribbons.</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>$1000</td>
                </tr>
              </tbody>
            </table>
            <button className="add-to-cart" data-name="Art Piece 2" data-price="1000">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
