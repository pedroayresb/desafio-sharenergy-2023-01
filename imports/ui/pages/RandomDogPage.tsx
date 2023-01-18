import React, { useState, useContext, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import randomDog from '../utils/randomDog';
import { useCookies } from 'react-cookie';
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
    } else {
      setIsVideo(false);
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
    <div className="flex flex-col h-screen text-dark-blue bg-offwhite">
      <NavigationButtons />
      <div className="flex flex-col items-center justify-start h-screen">
        <button
          onClick={() => getNewDog()}
          className="border border-dark-cyan rounded-xl h-12 p-2 bg-dark-cyan text-white text-center text-sm hover:bg-white hover:text-dark-cyan"
        >{ homepageTranslation[language].getNewDog }</button>
        <div className="flex flex-row items-center justify-center w-96 h-96 mt-6">
          { isVideo ? <video src={dog} className='max-w-full max-h-full' controls /> : <img src={dog} className='max-w-full max-h-full' alt="Random Dog" /> }
        </div>
      </div>
    </div>
  );
};

export default RandomDog;