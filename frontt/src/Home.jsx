import React from 'react';
import Carousel from './Carousel';
function Home() {
  return (
    <div className="App">
    <div>
    <Carousel></Carousel>
    <section id="about">
      <h2>About Us</h2>
      <img src='/pics_web/painter.jpeg' alt="Product 0" className="centered-image" ></img>
      <p>Welcome to our world of creativity! We are passionate about arts and crafts and love sharing our ideas and creations with you.</p>
    </section>
   
    <section id="featured-products">
      <h2>Featured Products</h2>
      <div className="products-container">
        <div className="product">
          <img src="https://i.pinimg.com/736x/ed/33/fc/ed33fcd394618cf99365427439dc993c.jpg" alt="Product 1" className="centered-image"></img>
          <div className="product-info">
            <h3>Handmade Jewelry</h3>
            <p>Explore our beautiful collection of handmade jewelry crafted with love and care by skilled artisans.</p>
          </div>
        </div>
        <div className="product">
          <img src="https://5.imimg.com/data5/WR/TB/QD/SELLER-84221941/nature-painting.jpg" alt="Product 2" className="centered-image"></img>
          <div className="product-info">
            <h3>Paintings</h3>
            <p>Discover stunning paintings that will add a touch of color and elegance to your living space.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section id="craft-ideas" align-image="center">
      <h2>Craft Ideas</h2>
      <div className="craft">
        <img className="centered-image" src='/pics_web/greet.jpg' height ='200px' alt="Craft Idea 2"></img>
        <h3>Handmade Greeting Cards</h3>
        <p>Get inspired to make personalized greeting cards for your loved ones with our creative ideas.</p>
      </div>
    </section>
    </div>
    </div>
  );
}

export default Home;
