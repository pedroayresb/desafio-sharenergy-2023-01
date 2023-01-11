import React, { useContext, useEffect, useState } from 'react';
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import ClientsAddForm from '../components/ClientsAddForm';
import NavigationButtons from '../components/NavigationButtons';
import AddedClientsContainer from '../components/AddedClientsContainer';
import { useCookies } from 'react-cookie';

function ClientsPage() {
  const { user, setUser } = useContext(Context) as ContextInterface;
  const [clients, setClients] = useState([]);
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
    Meteor.call('clients.read', (error: any, result: any) => {
      if (error) {
        console.log(error);
      } else {
        setClients(result);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <NavigationButtons />
      <ClientsAddForm setClients={ setClients } />
      <AddedClientsContainer clients={ clients } setClients={ setClients } />
     </div>
  );
};

export default ClientsPage;