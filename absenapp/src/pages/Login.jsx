import React, { useEffect } from 'react'
import LoginForm from '../components/form/LoginForm'
import { useNavigate } from 'react-router-dom';
import { sessionGet } from '../utils/session';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionGet('token')) {
      navigate("/");
    }
  }, []);
  return (
    <div className='h-screen flex items-center justify-center bg-slate-200'>
      <LoginForm />
    </div>
  )
}

export default Login