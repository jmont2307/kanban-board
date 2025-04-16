import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!loginData.username || !loginData.password) {
      setErrorMessage('Username and password are required');
      return;
    }
    
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <div className="login-card">
        <h1>Kanban Board Login</h1>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type='text'
              name='username'
              placeholder="Enter your username"
              value={loginData.username || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type='password'
              name='password'
              placeholder="Enter your password"
              value={loginData.password || ''}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className="login-button">Login</button>
          <div className="login-help">
            <p>Use username: <strong>JollyGuru</strong> and password: <strong>password</strong></p>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
