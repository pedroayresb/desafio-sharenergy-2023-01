import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../components/NavigationButtons';
import statusCodes from '../utils/httpCat';
import CatSelect from '../components/CatSelect';

const random = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

function HTTPCatPage() {
  const [statusCode, setStatusCode] = useState(random(statusCodes));
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem('logged');
    if (!logged) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="flex flex-col h-screen text-dark-blue bg-offwhite">
      <NavigationButtons />
      <div className="flex flex-col items-center justify-start h-screen">
        <CatSelect onSelect={(id) => setStatusCode(parseInt(id))} />
        <div className="flex flex-row items-center justify-center w-11/12 h-11/12 mt-6">
          <img src={`https://http.cat/${statusCode}`} alt="HTTP Cat" />
        </div>
      </div>
    </div>
  );
}

export default HTTPCatPage;