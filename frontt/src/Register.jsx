import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index_register.css'

const apiUrl="https://arts-github-io-2.onrender.com"
function Register() {
    const [showLogin, setShowLogin] = useState(true);
    
  const [name, setName] = useState('');
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      console.log(response)
      setMessage('Registration successful, please log in');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      console.log(response.data.user.email)
      localStorage.setItem('user', JSON.stringify( response.data.user));
      setMessage('Login successful');
      console.log(response)
      navigate(`/${response.data.user.email}/dashboard`);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
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
        <div className={showLogin ? 'hidden' : 'visible'} id='signup'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <div className="mb-3">
          <label htmlFor="signupName" className="form-label">Name</label>
          <input 
            type="string" 
            className="form-control" 
            id="signupName" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="confirmPassword" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
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
    
    {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Register;
