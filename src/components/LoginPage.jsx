import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
        username,
        password,
      });
  
      // Сохраняем токены в localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
  
      // Получаем данные пользователя (предположим, что у вас есть API для получения данных пользователя)
      const userResponse = await axios.get('http://127.0.0.1:8000/api/profile/', {
        //const userResponse = await axios.get('http://127.0.0.1:8000/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });
  
      // Обновляем данные пользователя в localStorage
      localStorage.setItem('user_id', userResponse.data.id);
      console.log(userResponse.data);

  
      // Передаем данные пользователя в App
      onLogin(userResponse.data); // Передаем данные о пользователе
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Login failed. Please try again.');
    }
  };
  
  
  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
  //       username,
  //       password,
  //     });

  //     localStorage.setItem('access_token', response.data.access);
  //     localStorage.setItem('refresh_token', response.data.refresh);

  //     navigate('/profile');
  //   } catch (err) {
  //     setError(err.response?.data?.non_field_errors?.[0] || 'Login failed. Please try again.');
  //   }
  // };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border rounded-lg w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border rounded-lg w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
