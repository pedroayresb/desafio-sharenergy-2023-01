import React, { useState, useContext, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import randomDog from '../utils/randomDog';
import { useCookies } from 'react-cookie';
import { navigationTranslate } from '../utils/navigationTranslation';
import homepageTranslation from '../utils/homepageTranslation';

function RandomDog() {
  const [dog, setDog] = useState('');
  const [cookies] = useCookies(['token']);
  const [isVideo, setIsVideo] = useState(false);
  const { user, setUser, language } = useContext(Context) as ContextInterface;
  const navigate = useNavigate();

  const getNewDog = async () => { // seleciona um dog aleatório
    const dog = await randomDog();
    if (dog.includes('mp4')) {
      setIsVideo(true);
    }
    setDog(dog);
  };

  useEffect(() => { // useEffect pra caso a pessoa decidir ir direto pra rota, para checar se realmente está logado
    if (cookies) {
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (!error) {
          delete result.password; // não precisa do password no contexto
          setUser(result);
        }
      });
    } else if (!user) {
      navigate('/login')
    };
    getNewDog();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavigationButtons />
      <div className="grid place-items-center h-screen">
        <h1 className="text-3xl font-bold">{ navigationTranslate[language].RandomDog }</h1>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => getNewDog()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >{ homepageTranslation[language].getNewDog }</button>
          { isVideo ? <video src={dog} controls /> : <img src={dog} alt="Random Dog" /> }
        </div>
      </div>
    </div>
  );
};

export default RandomDog;