import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Meteor } from "meteor/meteor";
import ClientsInterface from '../interfaces/ClientsInterface';
import EditClientItem from './EditClientItem';
import clientPageTranslation from '../utils/clientTranslation';

interface props {
  client: ClientsInterface
  index: number
}

function ClientItem(props: props) {
  const { language } = useContext(Context) as ContextInterface;
  const [edit, setEdit] = useState(false); // estado de edicao proprio da linha com o cliente

  const removeItem = (id: string | undefined) => {
    Meteor.call('clients.delete', { id }, (error: any) => {
      if (error) {
        console.log(error);
      }
    });
  };

  return (
    edit ? ( 
    <EditClientItem 
      client={ props.client }
      index={ props.index }
      setEdit={ setEdit }
    />
    ) : (
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
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={ () => setEdit(true) }
          >{ clientPageTranslation[language].edit }</button>
      </td>
      <td className='p-10'>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick = { () => { removeItem(props.client._id) } }
          >{ clientPageTranslation[language].remove }</button>
      </td>
    </tr>
  ));
}

export default ClientItem;