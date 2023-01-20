import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import getRandomUsers from '../utils/randomUsers';
import homepageTranslation from '../utils/homepageTranslation'; // arquivo com as traduções

function RandomUsersContainer() {
  const { setRandomUsers, setRandomFilteredUsers, setPage, language, setLoading } = useContext(Context) as ContextInterface;
  const [quantity, setQuantity] = useState(10);

  const getUsers = async (quantity: number) => {
    setLoading(true);
    const randomUsers = await getRandomUsers(quantity);
    setPage(1);
    setRandomUsers(randomUsers);
    setRandomFilteredUsers(randomUsers);
    setLoading(false);
  };

  return (
    <div className='flex flex-row m-2'>
      <div className='grid place-items-center content-center'>
        <label htmlFor="quantity">{ homepageTranslation[language].quantity }: </label>
        <div className='flex flex-row items-center'>
          <input
            type="number" 
            value={ quantity } 
            onChange={(e) => setQuantity(Number(e.target.value))}
            className='border border-yellow rounded-tl-xl rounded-bl-xl lg:h-8 mt-4 py-5 px-4 w-32 text-dark-blue'
          />
          <button
            type="button"
            className="lg:border lg:border-yellow text-dark-blue bg-yellow text-lg rounded-tr-xl rounded-br-xl lg:h-8 mt-4 p-5 lg:leading-[0.1] lg:text-sm"
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