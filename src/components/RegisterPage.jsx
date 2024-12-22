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

      const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
        username,
        password,
      });

      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);

      navigate('/profile');
    } catch (err) {
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
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create an Account</h1>
      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-11/12 mx-auto bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 block"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  </section>
  );
}

export default RegisterPage;
