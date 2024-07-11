import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index_register.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleForms = () => {
    setShowLogin(!showLogin);
    setMessage('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMessage('Login successful');
      // Handle storing token and redirecting user here
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="Login">
      <div className="container1">
        <div className="toggle-buttons">
          <button 
            className={`btn ${showLogin ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button 
            className={`btn ${showLogin ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setShowLogin(false)}
          >
            Signup
          </button>
        </div>
        <div className={showLogin ? 'visible' : 'hidden'}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="loginEmail" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="loginPassword" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className={showLogin ? 'hidden' : 'visible'} id='signup'>

          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="signupEmail" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="signupEmail" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signupPassword" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="signupPassword" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signupConfirmPassword" className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="signupConfirmPassword" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
          </form>
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default App;
