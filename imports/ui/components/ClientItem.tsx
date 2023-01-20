import React from 'react';
import EditClientItem from './EditClientItem';
import { Meteor } from "meteor/meteor";
import ClientsInterface from '../interfaces/ClientsInterface';

interface props {
  client: ClientsInterface
  index: number
}

function ClientItem(props: props) {

  const removeItem = (id: string | undefined) => {
    Meteor.call('clients.delete', { id }, (error: any) => {
      if (error) {
        console.log(error);
      }
    });
  };

  return (
    <tr key={ props.index } className='bg-dark-offwhite flex flex-col'>
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
      <td className='p-10 grid items-center justify-center align-center'>
        <EditClientItem
          client={ props.client }
          index= { props.index }
        />
      </td>
      <td className='p-10 grid items-center justify-center align-center'>
        <button
          className='bg-red hover:bg-dark-red text-white font-bold py-2 px-4 rounded'
          onClick = { () => { removeItem(props.client._id) } }
          >X</button>
      </td>
    </tr>
  );
}

export default ClientItem;