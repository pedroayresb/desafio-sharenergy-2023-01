import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function NavigationButtons() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const logout = () => {
    if(cookies) {
      removeCookie('token');
      navigate('/login');
    } else {
      navigate('/login');
    };
  };

  return (
    <nav className='p-10'>
      <Link to="/" className='p-10'>Users</Link>
      <Link to="/HTTPCat" className='p-10'>HTTPCat</Link>
      <Link to="/RandomDog" className='p-10'>RandomDog</Link>
      <Link to="/clients" className='p-10'>Clientes</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default NavigationButtons;