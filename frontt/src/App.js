
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Dashboard from './Dashboard';
import About from './About';
import Contact from './Contact';
import Buy from './Buy';
import Sell from './Sell';
import Register from './Register';
import Payment from './Payment';
import Cart from './Cart'

import './App.css';
import './styles.css'

import { UserProvider } from './UserContext';;
function App() {
  return (
    <UserProvider>
    <Router>
      <div id="body">
        <Header />
        <Navbar/>

        <main>
          <div className="container">
            <Routes>
              
            <Route  eact path="/" element={<Register/>} />
              <Route path=":email/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/buy" element={<Buy/>} />
              <Route path="/sell" element={<Sell/>} />
              
        <Route path=":userId/payment" element={<Payment />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
