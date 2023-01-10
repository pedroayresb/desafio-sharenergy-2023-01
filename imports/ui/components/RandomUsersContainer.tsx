import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import RandomUser from './RandomUser';
import { ContextInterface, Results } from '../interfaces/ContextInterface';

function RandomUsersContainer() {
  const { randomFilteredUsers, randomUsers, page } = useContext(Context) as ContextInterface;
  const [randomUsersInPage, setRandomUsersInPage] = useState<Results[] | null>(null);

  useEffect(() => {
    const randomUsersInPage = randomUsers?.slice(0, (page * 10));
    if (randomUsersInPage) setRandomUsersInPage(randomUsersInPage);
  }, []);

  useEffect(() => {
    if (!(page - 1 === 0)) {
      const randomUsersInPage: Results[] = randomFilteredUsers?.slice(((page * 10) - 1), (((page + 1) * 10)) - 1) as Results[];
      setRandomUsersInPage(randomUsersInPage);
    } else {
      const randomUsersInPage: Results[] = randomFilteredUsers?.slice(0, ((page * 10) - 1)) as Results[];
      setRandomUsersInPage(randomUsersInPage);
    }
  }, [randomFilteredUsers, page]);

  return (
    <div className="flex flex-col overflow-scroll h-80 p-20 pt-3">
      {randomUsersInPage?.map((user) => (
        <RandomUser key={user.login.uuid} {...user} />
      ))}
     </div>
  );
}

export default RandomUsersContainer;
