import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { sessionGet } from '../utils/session';
import RegisterForm from '../components/form/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionGet('token')) {
      navigate("/");
    }
  }, []);
  return (
    <div className='h-screen flex items-center justify-center bg-slate-200'>
      <RegisterForm />
    </div>
  )
}

export default Register