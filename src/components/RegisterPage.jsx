import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState(''); 
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const registerResponse = await axios.post('http://127.0.0.1:8000/api/auth/users/', {
        username,
        password,
        re_password: rePassword,
        email,
      });
      console.log('Registration successful:', registerResponse.data);
  
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
        username,
        password,
      });
      console.log('Login successful:', loginResponse.data);
  
      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);
  
      setUser({ username });
      navigate('/profile');
    } catch (err) {
      console.error('Error:', err);
      const errorResponse = err.response?.data;
      if (errorResponse) {
        const errorMessages = Object.entries(errorResponse)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('; ');
        setError(errorMessages);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
