import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import EditArrayItem from './EditArrayItem';
import ClientsInterface from '../interfaces/ClientsInterface';

interface props {
  client: ClientsInterface
  index: number
  setEdit: (bool: boolean) => void
}

function EditClientItem(props: props) {
  const [name, setName] = useState(props.client.name);
  const [cpf, setCpf] = useState(props.client.cpf);
  const [emailArray, setEmailArray] = useState(props.client.email);
  const [phoneArray, setPhoneArray] = useState(props.client.phone);
  const [addressArray, setAddressArray] = useState(props.client.address);
  
  const { _id } = props.client

  const updateClient = () => {
    Meteor.call('clients.update', { id: _id,
      name,
      cpf,
      email: emailArray,
      phone: phoneArray,
      address: addressArray
    }, (error: any) => {
      if (error) {
        console.log(error);
      } else {
        props.setEdit(false);
      }
  })};
  
  return (
    <tr key={ props.index }>
      <td className='p-10'>
        <input
          type='text'
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
      </td>
      <td className='p-10'>
        <input
          type='text'
          value={ cpf }
          onChange={ (e) => setCpf(e.target.value) }
        />
      </td>
      <td className='p-10'>
        <EditArrayItem
          arrayItem={ emailArray }
          setNewArray={ setEmailArray }
        />
      </td>
      <td className='p-10'>
        <EditArrayItem
          arrayItem={ phoneArray }
          setNewArray={ setPhoneArray }
        />
      </td>
      <td className='p-10'>
        <EditArrayItem
          arrayItem={ addressArray }
          setNewArray={ setAddressArray }
        />
      </td>
      <td className='p-10'>
        <button
          onClick={ updateClient }
        >
          Finalizar
        </button>
      </td>
    </tr>
  )
}

export default EditClientItem;