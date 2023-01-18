import React, { useContext } from 'react';
import EditClientItem from './EditClientItem';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Meteor } from "meteor/meteor";
import ClientsInterface from '../interfaces/ClientsInterface';
import clientPageTranslation from '../utils/clientTranslation';

interface props {
  client: ClientsInterface
  index: number
}

function ClientItem(props: props) {
  const { language } = useContext(Context) as ContextInterface;

  const removeItem = (id: string | undefined) => {
    Meteor.call('clients.delete', { id }, (error: any) => {
      if (error) {
        console.log(error);
      }
    });
  };

  return (
    <tr key={ props.index }>
      <td className='p-10'>{ props.client.name }</td>
      <td className='p-10'>{ props.client.cpf }</td>
      <td className='p-10'>
        {props.client.email.map((email, index) => (
          <p key={ index }>{ email }</p>
        ))}
      </td>
      <td className='p-10'>
        {props.client.phone.map((phone, index) => (
          <p key={ index }>{ phone }</p>
        ))}
      </td>
      <td className='p-10'>
        {props.client.address.map((address, index) => (
          <p key={ index }>{ address }</p>
        ))}
      </td>
      <td className='p-10'>
        <EditClientItem
          client={ props.client }
          index= { props.index }
        />
      </td>
      <td className='p-10'>
        <button
          className='text-center text-red-500 border border-red-500 rounded-xl hover:bg-red-500 px-2 h-8 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity'
          onClick = { () => { removeItem(props.client._id) } }
          >{ clientPageTranslation[language].remove }</button>
      </td>
    </tr>
  );
}

export default ClientItem;