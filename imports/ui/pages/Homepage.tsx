import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import RandomUsersContainer from '../components/RandomUsersContainer';
import RandomUserFilters from '../components/RandomUserFilters';
import PageButton from '../components/PageButton';
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const { randomFilteredUsers } = useContext(Context) as ContextInterface;
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem('logged');
    if (!logged) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="flex flex-col h-full text-dark-blue bg-offwhite">
      <NavigationButtons />
      <div className="flex flex-col place-items-center">
        <RandomUserFilters />
        <div className="flex flex-col w-screen">
          <RandomUsersContainer />
          { randomFilteredUsers?.length as Number > 10 && <PageButton /> } {/* se a quantidade de usuários filtrados for maior que 10, mostra o botão de paginação */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;