import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import HTTPCatPage from './pages/HTTPCatPage';
import RandomDogPage from './pages/RandomDogPage';
import ClientsPage from './pages/ClientsPage';

function App() {
  const handleClose = () => {
    const remember = localStorage.getItem('remember');
    if (remember === 'false') {
      localStorage.removeItem('Meteor.loginTokenExpires');
      localStorage.removeItem('Meteor.loginToken');
      localStorage.removeItem('Meteor.userId');
      localStorage.removeItem('logged');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleClose);
    return () => {
      window.removeEventListener('beforeunload', handleClose);
    };
  }, []);

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/HTTPCat" element={ <HTTPCatPage /> } />
          <Route path="/RandomDog" element={ <RandomDogPage /> } />
          <Route path="/clients" element={ <ClientsPage /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;