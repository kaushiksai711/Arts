import React, { useContext }  from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles.css'
import { UserContext } from './UserContext';



    // Check for user details in local storage

function Navbar() {
  
  const { user } = useContext(UserContext);
  return (
    <div id="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navi">
        <NavLink className="navbar-brand" to="/home">Arts</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"><li>
          {user && (
            <div className="navbar-profile">
              <Link to={`/${user.email}/dashboard`}>
                <img src="/pics_web/user.png" alt="Profile" className="profile-icon" />
              </Link>
            </div>
          )}</li> 
            <li className="nav-item">
              <NavLink className="nav-link" to="/home" >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Login/Signup</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Items
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/buy">Buy arts</Link></li>
                <li><Link className="dropdown-item" to="/sell">Sell Arts</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Forum</NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
