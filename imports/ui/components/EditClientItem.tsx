import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import EditArrayItem from './EditArrayItem';
import ClientsInterface from '../interfaces/ClientsInterface';
import clientPageTranslation from '../utils/clientTranslation';
import { validateInputs } from '../utils/validateInputs';

interface props {
  client: ClientsInterface
  index: number
}

function EditClientItem(props: props) { // componente que renderiza os itens da tabela de clientes caso estejam de modo de edicao
  const [name, setName] = useState(props.client.name); // estados iniciais que contem o valor do cliente, mas podem ser editados
  const [nameError, setNameError] = useState(''); // estado que contem o erro do nome, caso haja
  const [cpf, setCpf] = useState(props.client.cpf);
  const [cpfError, setCpfError] = useState('');
  const [emailArray, setEmailArray] = useState(props.client.email);
  const [phoneArray, setPhoneArray] = useState(props.client.phone);
  const [addressArray, setAddressArray] = useState(props.client.address);
  const [open, setOpen] = useState(false);
  const { language } = useContext(Context) as ContextInterface;

  const { _id } = props.client

  const updateClient = () => { // funcao que atualiza o cliente no banco de dados
    const validateInputsResult = validateInputs.name(name);
    if (validateInputsResult) {
      setNameError(validateInputsResult);
      return;
    }
    const validateInputsResult2 = validateInputs.cpf(cpf);
    if (validateInputsResult2) {
      setCpfError(validateInputsResult2);
      return;
    }
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
        setOpen(false);
      }
  })};
  
  return (
    <>
      <button
      onClick={() => setOpen(true)}
      >
      { clientPageTranslation[language].editClient }
      </button>
      <ReactModal
        isOpen={open}
        appElement={document.getElementById('react-target') as HTMLElement}
      >
        <button
          onClick={() => setOpen(false)}
        >
          X
        </button>
      <form key={ props.index } className='flex flex-col items-center self-center'>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="name">{ clientPageTranslation[language].name }: </label>
          <input
            type='text'
            value={ name }
            className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
            onChange={ (e) => setName(e.target.value) }
          />
        </div>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="CPF">{ clientPageTranslation[language].cpf }: </label>
          <input
            type='text'
            value={ cpf }
            className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
            onChange={ (e) => setCpf(e.target.value) }
          />
        </div>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="Email">{ clientPageTranslation[language].email }: </label>
          <EditArrayItem
            arrayItem={ emailArray }
            setNewArray={ setEmailArray }
            name='Email'
          />
        </div>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="Phone">{ clientPageTranslation[language].phone }: </label>
          <EditArrayItem
            arrayItem={ phoneArray }
            setNewArray={ setPhoneArray }
            name='Phone'
          />
        </div>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="Address">{ clientPageTranslation[language].address }: </label>
          <EditArrayItem
            arrayItem={ addressArray }
            setNewArray={ setAddressArray }
            name='Address'
          />
        </div>
        <div className="mt-4 grid place-items-center content-center">
          <button
            onClick={ updateClient }
          >
            { clientPageTranslation[language].save }
          </button>
        </div>
      </form>
      </ReactModal>
    </>
  )
}

export default EditClientItem;