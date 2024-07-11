import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Buy from './Buy';
import Sell from './Sell';
import Register from './Register';
import './App.css';
import './styles.css'
function App() {
  return (
    <Router>
      <div id="body">
        <Header />
        <Navbar />

        <main>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/login" element={<Register/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/buy" element={<Buy/>} />
              <Route path="/sell" element={<Sell/>} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
