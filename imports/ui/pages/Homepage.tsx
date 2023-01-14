import React, { useContext, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import NavigationButtons from '../components/NavigationButtons';
import RandomUsersContainer from '../components/RandomUsersContainer';
import RandomUserFilters from '../components/RandomUserFilters';
import NewRandomUsersButton from '../components/NewRandomUsersButton';
import PageButton from '../components/PageButton';


function Homepage() {
  const { language, user, setUser, randomFilteredUsers, nameForLogin, setNameForLogin, passwordForLogin, setPasswordForLogin } = useContext(Context) as ContextInterface;
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) { // se a pessoa escolheu "lembrar de mim" no login
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          delete result.password; // não envia a senha para o contexto
          setUser(result);
        }
      });
    } else if (nameForLogin && passwordForLogin) { // se a pessoa não escolheu "lembrar de mim" no login
      Meteor.call('users.loginWithoutToken', { name: nameForLogin, password: passwordForLogin }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          delete result.password; // não envia a senha para o contexto
          setUser(result);
          setNameForLogin(null); // limpa o contexto usado para fazer o login
          setPasswordForLogin(null); 
        }
      });
    } else {
      navigate('/login') // se não tem token e não tem login e senha, redireciona para a página de login
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavigationButtons />
      <div className="grid place-items-center h-screen">
        <NewRandomUsersButton />
        <div className="flex flex-row space-evenly">
          <RandomUserFilters />
          <div className="flex flex-col">
            <RandomUsersContainer />
            { randomFilteredUsers?.length as Number > 10 && <PageButton /> } {/* se a quantidade de usuários filtrados for maior que 10, mostra o botão de paginação */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;