import React, { useState } from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import { ContextInterface, UserInterface } from "../interfaces/ContextInterface";
interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState(window.navigator.language);
  const [user, setUser] = useState<UserInterface | null>(null);

  const value = {
    language,
    setLanguage,
    user,
    setUser,
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