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
    <div>
      <div className='flex flex-col items-center'>
        <label htmlFor="quantity">{ homepageTranslation[language].quantity }: </label>
        <input
          type="number" 
          value={ quantity } 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className='border border-dark-purple rounded-full bg-dark-purple p-2 hover:border-light-purple w-32 text-center'
        />
      </div>
      <button
        className='border border-dark-purple rounded-full bg-dark-purple p-2 hover:border-light-purple'
        onClick={() => getUsers( quantity )}
      >
        { homepageTranslation[language].getUsers }
      </button>
    </div>
  );
}

export default RandomUsersContainer;