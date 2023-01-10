import React, { useContext, useState, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import homepageTranslation from '../utils/homepageTranslation';


function Homepage() {
  const { language, user, setUser } = useContext(Context) as ContextInterface;
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          setUser(result);
        }
      });
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="grid place-items-center content-center h-screen">
      <p>{ user?.name }</p>
    </div>
  );
}

export default Homepage;