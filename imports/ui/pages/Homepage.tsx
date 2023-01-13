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
    if (cookies.token) {
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          delete result.password;
          setUser(result);
        }
      });
    } else if (nameForLogin && passwordForLogin) {
      Meteor.call('users.loginWithoutToken', { name: nameForLogin, password: passwordForLogin }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          delete result.password;
          setUser(result);
          setNameForLogin(null);
          setPasswordForLogin(null);
        }
      });
    } else {
      navigate('/login')
    }
  }, []);

  return (
    <div className="grid place-items-center content-center h-screen">
      <NavigationButtons />
      <NewRandomUsersButton />
      <RandomUserFilters />
      <RandomUsersContainer />
      { randomFilteredUsers?.length as Number > 10 && <PageButton /> }
    </div>
  );
}

export default Homepage;