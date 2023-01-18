import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import getRandomUsers from '../utils/randomUsers';
import homepageTranslation from '../utils/homepageTranslation'; // arquivo com as traduções

function RandomUsersContainer() {
  const { setRandomUsers, setRandomFilteredUsers, setPage, language } = useContext(Context) as ContextInterface;
  const [quantity, setQuantity] = useState(10);

  const getUsers = async (quantity: number) => {
    const randomUsers = await getRandomUsers(quantity);
    setPage(1);
    setRandomUsers(randomUsers);
    setRandomFilteredUsers(randomUsers);
  };

  return (
    <div className='flex flex-row items-center m-4'>
      <div className='flex flex-col items-center'>
        <label htmlFor="quantity">{ homepageTranslation[language].quantity }: </label>
        <input
          type="number" 
          value={ quantity } 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className='border border-yellow h-8 py-5 px-4 rounded-tl-xl rounded-bl-xl text-dark-blue hover:border-light-cyan w-32 text-center'
        />
      </div>
      <button
        type="button"
        className="border border-yellow rounded-tr-xl rounded-br-xl h-10.5 bg-yellow text-dark-blue text-center text-sm hover:bg-white hover:text-dark-cyan self-end"
        onClick={() => getUsers( quantity )}
      >
        { homepageTranslation[language].getUsers }
      </button>
    </div>
  );
}

export default RandomUsersContainer;