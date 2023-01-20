import React, { useState, useContext, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import randomDog from '../utils/randomDog';
import homepageTranslation from '../utils/homepageTranslation';

function RandomDog() {
  const [dog, setDog] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const { language } = useContext(Context) as ContextInterface;
  const navigate = useNavigate();

  const getNewDog = async () => { // seleciona um dog aleatório
    const dog = await randomDog();
    if (dog.includes('mp4')) {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
    setDog(dog);    
  };

  useEffect(() => { // useEffect pra caso a pessoa decidir ir direto pra rota, para checar se realmente está logado
    const rememberMe = localStorage.getItem('remember');
    const meteorTokenExpire = localStorage.getItem('Meteor.loginTokenExpires');
    const isExpired = new Date(meteorTokenExpire as string) < new Date();
    if (rememberMe === 'true') {
      const userInLocal = JSON.parse(localStorage.getItem('user') as string) as { name: string, password: string };
      const { name, password } = userInLocal;
      Meteor.loginWithPassword(name, password);
    } else if (rememberMe === null || isExpired) {
      navigate('/login');
    }
    getNewDog();
  }, []);

  return (
    <div className="flex flex-col h-screen text-dark-blue bg-offwhite">
      <NavigationButtons />
      <div className="flex flex-col items-center justify-start h-full w-screen">
        <button
          onClick={() => getNewDog()}
          className="border text-5xl border-dark-cyan rounded-xl p-4 bg-dark-cyan text-white text-center hover:bg-white hover:text-dark-cyan"
        >{ homepageTranslation[language].getNewDog }</button>
        <div className="flex flex-row items-center justify-center w-11/12 h-11/12 mt-6">
          { isVideo ? <video src={dog} className='max-w-full max-h-full' controls /> : <img src={dog} className='max-w-full max-h-full' alt="Random Dog" /> }
        </div>
      </div>
    </div>
  );
};

export default RandomDog;