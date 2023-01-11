import React, { useEffect, useState } from 'react';
import NavigationButtons from '../components/NavigationButtons';
import randomDog from '../utils/randomDog';

function RandomDog() {
  const [dog, setDog] = useState('');

  useEffect(() => {
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