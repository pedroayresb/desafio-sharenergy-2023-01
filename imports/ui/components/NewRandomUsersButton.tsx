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
    <div className='flex flex-row m-4'>
      <div className='flex flex-col items-center text-5xl'>
        <label htmlFor="quantity">{ homepageTranslation[language].quantity }: </label>
        <div className='m-4'>
          <input
            type="number" 
            value={ quantity } 
            onChange={(e) => setQuantity(Number(e.target.value))}
            className='text-5xl py-5 px-4 w-72 rounded-tl-xl rounded-bl-xl text-dark-blue hover:border-light-cyan text-center'
          />
          <button
            type="button"
            className=" rounded-tr-xl p-6 rounded-br-xl text-5xl bg-yellow text-dark-blue text-center hover:bg-white hover:text-dark-cyan self-end"
            onClick={() => getUsers( quantity )}
          >
            { homepageTranslation[language].getUsers }
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomUsersContainer;