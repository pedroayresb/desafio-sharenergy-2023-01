import React, { useEffect, useState } from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import { ContextInterface, UserInterface, Results } from "../interfaces/ContextInterface";
import getRandomUsers from '../utils/randomUsers';
interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState(window.navigator.language);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [randomUsers, setRandomUsers] = useState<Results[] | null>(null);
  const [randomFilteredUsers, setRandomFilteredUsers] = useState<Results[] | null>(null);
  const [nameForLogin, setNameForLogin] = useState(null);
  const [passwordForLogin, setPasswordForLogin] = useState(null);
  const [page, setPage] = useState(1);

  const fetchRandomUsers = async () => {
    const randomUsers = await getRandomUsers(50) as Results[];
    setRandomUsers(randomUsers);
    setRandomFilteredUsers(randomUsers);
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const value = {
    language,
    setLanguage,
    user,
    setUser,
    randomUsers,
    setRandomUsers,
    randomFilteredUsers,
    setRandomFilteredUsers,
    page,
    setPage,
    nameForLogin,
    setNameForLogin,
    passwordForLogin,
    setPasswordForLogin,
  } as ContextInterface;


  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};