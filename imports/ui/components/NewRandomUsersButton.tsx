import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import getRandomUsers from '../utils/randomUsers';

function RandomUsersContainer() {
  const { setRandomUsers, setRandomFilteredUsers } = useContext(Context) as ContextInterface;
  const [quantity, setQuantity] = useState(10);

  const getUsers = async (quantity: number) => {
    const randomUsers = await getRandomUsers(quantity);
    setRandomUsers(randomUsers);
    setRandomFilteredUsers(randomUsers);
  };

  return (
    <div>
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button onClick={() => getUsers(quantity)}>Get New Users!</button>
    </div>
  );
}

export default RandomUsersContainer;