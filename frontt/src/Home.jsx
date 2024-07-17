import React from 'react';
import Carousel from './Carousel';
import './Home.css';  // Add a CSS file for additional styling

function Home() {
  return (
    <div className="App">
      <Carousel />
      <section id="site-features" className="section-padding">
        <h2>Features</h2>
        <div className="features-container">
          <div className="feature-box">
            <h3>Buy Arts and Crafts</h3>
            <p>Browse and purchase unique handmade items from talented artists.</p>
          </div>
          <div className="feature-box">
            <h3>Sell Your Creations</h3>
            <p>Set up your own store and sell your arts and crafts to the world.</p>
          </div>
          <div className="feature-box">
            <h3>Chat in Forum</h3>
            <p>Join our community forum to discuss and share ideas about arts and crafts.</p>
          </div>
          <div className="feature-box">
            <h3>View Cart</h3>
            <p>Check the items in your cart and proceed to checkout easily.</p>
          </div>
          <div className="feature-box">
            <h3>Dashboard</h3>
            <p>Manage your store, track your sales, and update your products from your dashboard.</p>
          </div>
        </div>
      </section>
      <section id="about" className="section-padding">
        <h2>About Us</h2>
        <img src='/pics_web/painter.jpeg' alt="Painter" className="centered-image" />
        <p>Welcome to our world of creativity! We are passionate about arts and crafts and love sharing our ideas and creations with you.</p>
      </section>
      
      <section id="featured-products" className="section-padding">
        <h2>Featured Products</h2>
        <div className="products-container">
          <div className="product">
            <img src="https://i.pinimg.com/736x/ed/33/fc/ed33fcd394618cf99365427439dc993c.jpg" alt="Handmade Jewelry" className="centered-image" />
            <div className="product-info">
              <h3>Handmade Jewelry</h3>
              <p>Explore our beautiful collection of handmade jewelry crafted with love and care by skilled artisans.</p>
            </div>
          </div>
          <div className="product">
            <img src="https://5.imimg.com/data5/WR/TB/QD/SELLER-84221941/nature-painting.jpg" alt="Paintings" className="centered-image" />
            <div className="product-info">
              <h3>Paintings</h3>
              <p>Discover stunning paintings that will add a touch of color and elegance to your living space.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="craft-ideas" className="section-padding">
        <h2>Craft Ideas</h2>
        <div className="craft">
          <img className="centered-image" src='/pics_web/greet.jpg' height='200px' alt="Craft Idea" />
          <h3>Handmade Greeting Cards</h3>
          <p>Get inspired to make personalized greeting cards for your loved ones with our creative ideas.</p>
        </div>
      </section>

      
    </div>
  );
}

export default Home;
