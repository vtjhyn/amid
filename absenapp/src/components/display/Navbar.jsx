import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed w-full py-3 pl-4 border-b-[1px] bg-red-300'>
      <div className='flex items-center justify-center hover:cursor-pointer w-[80px]'
        onClick={() => navigate('/')}
      >
        User
      </div>
    </div>
  )
}

export default Navbar
