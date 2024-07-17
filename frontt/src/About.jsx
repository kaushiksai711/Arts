import React from 'react';
import './About.css'; // Import the CSS file for styling

function About() {
  return (
    <div className='container' id="A">
      <section>
        <h2>About Us</h2>
        <p>Welcome to our E-commerce website! We are passionate about bringing art closer to you. Our platform connects artists with art enthusiasts, providing a seamless experience for buying and selling artworks of various styles and mediums.</p>
        <p>At My Website, we believe in promoting creativity and supporting artists in showcasing their talent to a global audience. Whether you're an artist looking to share your work or a collector searching for that perfect piece, we're here to make your journey enjoyable and rewarding.</p>
        
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#x1F4A1;</div>
            <h3>Buy Arts and Crafts</h3>
            <p>Browse and purchase unique handmade items from talented artists. Our curated collection ensures that you find the most exquisite pieces to suit your taste and style.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4E6;</div>
            <h3>Sell Your Creations</h3>
            <p>Set up your own store and sell your arts and crafts to the world. We provide a user-friendly interface to help you manage your listings and reach a global audience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4AC;</div>
            <h3>Chat in Forum</h3>
            <p>Join our community forum to discuss and share ideas about arts and crafts. Connect with other enthusiasts, get feedback, and find inspiration for your next project.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F6D2;</div>
            <h3>View Cart</h3>
            <p>Check the items in your cart and proceed to checkout easily. Our secure payment process ensures your transactions are safe and hassle-free.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#x1F4C8;</div>
            <h3>Dashboard</h3>
            <p>Manage your store, track your sales, and update your products from your dashboard. Stay organized and keep track of your inventory and orders efficiently.</p>
          </div>
        </div>

        <h2>Contact Us</h2>
        <div className="contact-section">
          <div className="contact-card">
            <div className="contact-icon">&#x2709;</div>
            <div>
              <h3>Email Us</h3>
              <p>kaushiksaimamidi@gmail.com</p>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">&#x260E;</div>
            <div>
              <h3>Call Us</h3>
              <p>+91 9381046084</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
