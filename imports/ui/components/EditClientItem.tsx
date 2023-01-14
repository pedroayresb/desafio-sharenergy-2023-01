import React, { useState, useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import EditArrayItem from './EditArrayItem';
import ClientsInterface from '../interfaces/ClientsInterface';
import clientPageTranslation from '../utils/clientTranslation';

interface props {
  client: ClientsInterface
  index: number
  setEdit: (bool: boolean) => void
}

function EditClientItem(props: props) { // componente que renderiza os itens da tabela de clientes caso estejam de modo de edicao
  const [name, setName] = useState(props.client.name); // estados iniciais que contem o valor do cliente, mas podem ser editados
  const [cpf, setCpf] = useState(props.client.cpf);
  const [emailArray, setEmailArray] = useState(props.client.email);
  const [phoneArray, setPhoneArray] = useState(props.client.phone);
  const [addressArray, setAddressArray] = useState(props.client.address);
  const { language } = useContext(Context) as ContextInterface;

  const { _id } = props.client

  const updateClient = () => { // funcao que atualiza o cliente no banco de dados
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
          { clientPageTranslation[language].save }
        </button>
      </td>
    </tr>
  )
}

export default EditClientItem;