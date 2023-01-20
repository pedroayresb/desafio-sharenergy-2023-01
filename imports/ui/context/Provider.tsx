import React, { useEffect, useState } from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import { ContextInterface, Results } from "../interfaces/ContextInterface";
import getRandomUsers from '../utils/randomUsers';
interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState(window.navigator.language);
  const [randomUsers, setRandomUsers] = useState<Results[] | null>(null);
  const [randomFilteredUsers, setRandomFilteredUsers] = useState<Results[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);  

  const fetchRandomUsers = async () => {
    const randomUsers = await getRandomUsers(50) as Results[];
    setRandomUsers(randomUsers);
    setRandomFilteredUsers(randomUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const value = {
    language,
    setLanguage,
    randomUsers,
    setRandomUsers,
    randomFilteredUsers,
    setRandomFilteredUsers,
    page,
    setPage,
    loading,
    setLoading,
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