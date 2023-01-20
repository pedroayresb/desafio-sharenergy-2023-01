import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import ClientsCollection from '../../api/ClientsCollection';
import ClientsAddForm from '../components/ClientsAddForm';
import NavigationButtons from '../components/NavigationButtons';
import AddedClientsContainer from '../components/AddedClientsContainer';

function ClientsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const rememberMe = localStorage.getItem('remember');
    const meteorTokenExpire = localStorage.getItem('Meteor.loginTokenExpires');
    const isExpired = new Date(meteorTokenExpire as string) < new Date();
    if (rememberMe === 'true') {
      const userInLocal = JSON.parse(localStorage.getItem('user') as string) as { name: string, password: string };
      const { name, password } = userInLocal;
      Meteor.loginWithPassword(name, password);
    } else if (rememberMe === null || isExpired) {
      navigate('/login');
    }
  }, []);

  const isLoading = useSubscribe('clients'); // se inscreve nas publicacoes meteor de clients
  const clients = useFind(() => ClientsCollection.find({})); // pega todos os clients

  if (isLoading()) {
    return <div>Loading...</div>
  };

  return (
    <div className="flex flex-col h-screen w-screen text-dark-blue bg-offwhite">
      <NavigationButtons />
      <div className="flex flex-col w-full h-full items-baseline">
        <AddedClientsContainer clients={ clients } />
        <ClientsAddForm />
      </div>
     </div>
  );
};

export default ClientsPage;