import React, { useState } from 'react';
import ClientsInterface from '../interfaces/ClientsInterface';
import EditClientItem from './EditClientItem';

interface props {
  client: ClientsInterface
  index: number
  setClients: (e: any) => void
}

function ClientItem(props: props) {
  const [edit, setEdit] = useState(false);

  return (
    edit ? ( 
    <EditClientItem
      client={ props.client }
      index={ props.index }
      setEdit={ setEdit }
      setClients={ props.setClients }
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
          >Edit</button>
      </td>
    </tr>
  ));
}

export default ClientItem;