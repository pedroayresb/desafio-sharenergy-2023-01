import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import HTTPCatPage from './pages/HTTPCatPage';
import RandomDogPage from './pages/RandomDogPage';
import ClientsPage from './pages/ClientsPage';
import LanguageButton from './components/LanguageButton';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/HTTPCat" element={ <HTTPCatPage /> } />
          <Route path="/RandomDog" element={ <RandomDogPage /> } />
          <Route path="/clients" element={ <ClientsPage /> } />
        </Routes>
        <LanguageButton />
      </BrowserRouter>
    </Provider>
  );
}

export default App;