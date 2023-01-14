import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import RandomUser from './RandomUser';
import { ContextInterface, Results } from '../interfaces/ContextInterface';

function RandomUsersContainer() {
  const { randomFilteredUsers, randomUsers, page } = useContext(Context) as ContextInterface;
  const [randomUsersInPage, setRandomUsersInPage] = useState<Results[] | null>(null);

  useEffect(() => {
    const randomUsersInPage = randomUsers?.slice(0, (page * 10)); // pega os usuarios da pagina atual
    if (randomUsersInPage) setRandomUsersInPage(randomUsersInPage);
  }, []);

  useEffect(() => {
    if (!(page - 1 === 0)) {
      const randomUsersInPage: Results[] = randomFilteredUsers?.slice(((page * 10) - 1), (((page + 1) * 10)) - 1) as Results[]; // pega os usuarios da proxima pagina e seta no contexto
      setRandomUsersInPage(randomUsersInPage);
    } else {
      const randomUsersInPage: Results[] = randomFilteredUsers?.slice(0, ((page * 10) - 1)) as Results[]; // pega os usuarios da primeira pagina e seta no contexto
      setRandomUsersInPage(randomUsersInPage);
    }
  }, [randomFilteredUsers, page]);

  return (
    <div className="flex flex-col overflow-scroll h-80 p-20 pt-3 items-center">
      {randomUsersInPage?.map((user) => (
        <RandomUser key={user.login.uuid} {...user} />
      ))}
     </div>
  );
}

export default RandomUsersContainer;
