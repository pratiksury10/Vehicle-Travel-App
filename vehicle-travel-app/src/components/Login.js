import React, { useState } from 'react';
import AvengersLogo from '../images/Avengers.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate after successful login

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error('Login failed! Please check your credentials.');
      }
      const data = await response.json();
      console.log('Login successful:', data);

      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Navigate to the dashboard on successful login
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message); // Show error message to the user
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1 style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={AvengersLogo}
            alt="Speedo logo"
            width="40"
            height="30"
            style={{ marginRight: '10px' }} 
          />
          Speedo
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className='input01'>
            <label htmlFor="email1" className='email1'>Email</label>
            <input
              className='email'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className='input02'>
            <label htmlFor="password" placeholder='At least 8 characters' className='pass'>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
      </div>
    </div>

  );
}

export default Login;