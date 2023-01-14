import React, { useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import NavigationButtonsConfigs from './NavigationButtonsConfigs';
import { navigationTranslate } from '../utils/navigationTranslation'; // arquivo com as traduções

function NavigationButtons() {
  const { user, setUser, language } = useContext(Context) as ContextInterface;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const logout = () => {
    if(cookies) {
      removeCookie('token');
      setUser(null); // limpa o token e o contexto para logout
      navigate('/login');
    } else {
      setUser(null); // limpa somente o contexto para logout
      navigate('/login');
    };
  };

  return (
    <nav className='p-10 flex flex-row'>
      <NavigationButtonsConfigs to='' item='users' language={language} />
      <NavigationButtonsConfigs to='HTTPCat' item='HTTPCat' language={language} />
      <NavigationButtonsConfigs to='RandomDog' item='RandomDog' language={language} />
      <NavigationButtonsConfigs to='Clients' item='Clients'language={language} />
      <p>{ user?.name }</p>
      <button onClick={logout}>{ navigationTranslate[language].Logout }</button>
    </nav>
  )
}

export default NavigationButtons;