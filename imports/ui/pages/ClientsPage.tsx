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

  useEffect(() => { // useEffect pra caso a pessoa decidir ir direto pra rota, para checar se realmente está logado
    if (cookies) {
      Meteor.call('users.loginWithToken', { token: cookies.token }, (error: any, result: any) => {
        if (!error) {
          delete result.password; // não precisa do password no contexto
          setUser(result);
        }
      });
    } else if (!user) {
      navigate('/login')
    };
  }, []);

  const isLoading = useSubscribe('clients'); // se inscreve nas publicacoes meteor de clients
  const clients = useFind(() => ClientsCollection.find({})); // pega todos os clients

  if (isLoading()) {
    return <div>Loading...</div>
  };

  return (
    <div className="flex flex-col h-screen text-dark-blue bg-offwhite">
      <NavigationButtons />
      <div className="grid place-items-center h-screen">
        <AddedClientsContainer clients={ clients } />
        <ClientsAddForm />
      </div>
     </div>
  );
};

export default ClientsPage;