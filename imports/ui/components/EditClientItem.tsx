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
        className='bg-cyan hover:bg-dark-cyan text-white font-bold py-2 px-4 rounded'
      >
      { clientPageTranslation[language].editClient }
      </button>
      <ReactModal
        isOpen={open}
        appElement={document.getElementById('react-target') as HTMLElement}
        className='bg-white rounded-2xl text-5xl w-5/6 h-5/6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-scroll'
      >
        <button
          onClick={() => setOpen(false)}
          className='absolute top-0 right-0 border rounded-full h-12 w-12 text-3xl text-dark-blue text-center hover:bg-white hover:text-dark-cyan hover:border-dark-cyan'
        >
          X
        </button>
      <form key={ props.index } className='flex flex-col items-center self-center'>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="name">{ clientPageTranslation[language].name }: </label>
          <input
            type='text'
            value={ name }
            className="border border-yellow text-5xl mt-4 lg:h-8 py-5 px-4 caret-dark-purple"
            onChange={ (e) => setName(e.target.value) }
          />
          {nameError.length > 0 && <p className="text-red-500">{ nameError }</p>}
        </div>
        <div className="mt-4 grid place-items-center content-center">
          <label htmlFor="CPF">{ clientPageTranslation[language].cpf }: </label>
          <input
            type='text'
            value={ cpf }
            className="border border-yellow text-5xl mt-4 lg:h-8 py-5 px-4 caret-dark-purple"
            onChange={ (e) => setCpf(e.target.value) }
          />
          {cpfError.length > 0 && <p className="text-red-500">{ cpfError }</p>}
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
            className='bg-cyan hover:bg-dark-cyan text-white font-bold py-2 px-4 rounded'
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