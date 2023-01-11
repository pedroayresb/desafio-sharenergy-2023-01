import React, { useState, useContext, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import randomDog from '../utils/randomDog';
import { useCookies } from 'react-cookie';

function RandomDog() {
  const [dog, setDog] = useState('');
  const [cookies] = useCookies(['token']);
  const { user, setUser } = useContext(Context) as ContextInterface;
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
    const getDog = async () => {
      const dog = await randomDog();
      setDog(dog);
    };
    getDog();
  }, []);

  const getNewDog = async () => {
    const dog = await randomDog();
    setDog(dog);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <NavigationButtons />
      <h1 className="text-3xl font-bold">Random Dog</h1>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => getNewDog()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >Get New Dog!</button>
        <img src={dog} alt="Random Dog" />
      </div>
    </div>
  );
};

export default RandomDog;