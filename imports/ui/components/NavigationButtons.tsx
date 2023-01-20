import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { useNavigate } from 'react-router-dom'
import NavigationButtonsConfigs from './NavigationButtonsConfigs';
import { navigationTranslate } from '../utils/navigationTranslation'; // arquivo com as traduções
import { useTracker } from 'meteor/react-meteor-data';
import LanguageButton from './LanguageButton';

function NavigationButtons() {
  const user = useTracker(() => Meteor.user());
  const { language } = useContext(Context) as ContextInterface;
  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout();
    localStorage.removeItem('remember');
    localStorage.removeItem('logged');
    navigate('/login');
  }

  return (
    <nav className='p-10 flex flex-row justify-between text-3xl lg:justify-evenly lg:text-sm'>
      <div className='place-self-start flex flex-row'>
        <NavigationButtonsConfigs to='' item='users' language={language} />
        <NavigationButtonsConfigs to='HTTPCat' item='HTTPCat' language={language} />
        <NavigationButtonsConfigs to='RandomDog' item='RandomDog' language={language} />
        <NavigationButtonsConfigs to='Clients' item='Clients'language={language} />
      </div>
      <div className='flex flex-col place-self-start lg:place-self-end'>
        <p className='self-end'>{ user?.username }</p>
        <button onClick={logout} className='self-end hover:text-cyan'>{ navigationTranslate[language].Logout }</button>
        <LanguageButton />
      </div>
    </nav>
  )
}

export default NavigationButtons;