import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Meteor } from "meteor/meteor";
import ArrayInputs from './ArrayInputs';
import clientPageTranslation from '../utils/clientTranslation';
import { validateInputs } from '../utils/validateInputs';


function ClientsAddForm() {
  const { language } = useContext(Context) as ContextInterface;
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [email, setEmail] = useState('');
  const [emailArray, setEmailArray] = useState([] as string[]);
  const [phone, setPhone] = useState('');
  const [phoneArray, setPhoneArray] = useState([] as string[]);
  const [address, setAddress] = useState('');
  const [addressArray, setAddressArray] = useState([] as string[]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
    name && cpf && emailArray.length > 0 && phoneArray.length > 0 && addressArray.length > 0 && Meteor.call('clients.create', { name, cpf, email: emailArray , phone: phoneArray, address: addressArray }, (error: any) => {
      if (error) {
        setError(error);
      } else {
        setOpen(false);
        setName('');
        setCpf('');
        setEmail('');
        setEmailArray([]);
        setPhone('');
        setPhoneArray([]);
        setAddress('');
        setAddressArray([]);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
      >
      { clientPageTranslation[language].addClient }
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
        <form onSubmit={handleSubmit} className='flex flex-col items-center self-center'>
          <div className="mt-4 grid place-items-center content-center">
            <label htmlFor="name">{ clientPageTranslation[language].name }</label>
            <input
              type="text"
              name="name"
              value={ name }
              className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4 grid place-items-center content-center">
            <label htmlFor="CPF">{ clientPageTranslation[language].cpf }</label>
            <input
              type="text"
              name="CPF"
              value={ cpf }
              className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <ArrayInputs
            name={"email"}
            value={ email }
            setArray={ setEmailArray }
            setString={ setEmail }
            array={ emailArray }
          />
          <ArrayInputs
            name={"phone"}
            value={ phone }
            setArray={ setPhoneArray }
            setString={ setPhone }
            array={ phoneArray }
          />
          <ArrayInputs
            name={"address"}
            value={ address }
            setArray={ setAddressArray }
            setString={ setAddress }
            array={ addressArray }
          />
          <button 
            type="button"
            onClick={handleSubmit}          
          >
            { clientPageTranslation[language].addClient }
          </button>
          {error && <p>{error}</p>}
        </form>
      </ReactModal>
    </>
  );
};

export default ClientsAddForm;