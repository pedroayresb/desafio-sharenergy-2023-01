import React, { useState, useContext, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import statusCodes from '../utils/httpCat';
import CatSelect from '../components/CatSelect';
import { useCookies } from 'react-cookie';

const random = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

function HTTPCatPage() {
  const { user, setUser } = useContext(Context) as ContextInterface;
  const [cookies] = useCookies(['token']);
  const [statusCode, setStatusCode] = useState(random(statusCodes));
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies) {
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          delete result.password;
          setUser(result);
        }
      });
    } else if (!user) {
      navigate('/login')
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <NavigationButtons />
      <h1 className="text-3xl font-bold">HTTP Cat</h1>
      <div className="flex flex-col items-center justify-center">
        <CatSelect onSelect={(id) => setStatusCode(parseInt(id))} />
        <img src={`https://http.cat/${statusCode}`} alt="HTTP Cat" />
      </div>
    </div>
  );
}

export default HTTPCatPage;