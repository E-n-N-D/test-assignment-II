import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)!;
  const navigate = useNavigate();

  if (isAuthenticated) {
    // If already logged in, redirect to homepage
    navigate('/');
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
