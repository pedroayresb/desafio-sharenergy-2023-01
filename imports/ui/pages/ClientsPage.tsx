import React, { useContext, useEffect } from 'react';
import { Meteor } from "meteor/meteor";
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import ClientsCollection from '../../api/ClientsCollection';
import { ContextInterface } from '../interfaces/ContextInterface';
import ClientsAddForm from '../components/ClientsAddForm';
import NavigationButtons from '../components/NavigationButtons';
import AddedClientsContainer from '../components/AddedClientsContainer';
import { useCookies } from 'react-cookie';

function ClientsPage() {
  const { user, setUser } = useContext(Context) as ContextInterface;
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies) {
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          delete result.password;
          setUser(result);
        }
      });
    } else if (!user) {
      navigate('/login')
    };
  }, []);

  const isLoading = useSubscribe('clients');
  const clients = useFind(() => ClientsCollection.find({}));

  if (isLoading()) {
    return <div>Loading...</div>
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <NavigationButtons />
      <ClientsAddForm />
      <AddedClientsContainer clients={ clients } />
     </div>
  );
};

export default ClientsPage;