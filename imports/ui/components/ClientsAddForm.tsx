import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Meteor } from "meteor/meteor";
import ArrayInputs from './ArrayInputs';
import clientPageTranslation from '../utils/clientTranslation';


function ClientsAddForm() {
  const { language } = useContext(Context) as ContextInterface;
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [emailArray, setEmailArray] = useState([] as string[]);
  const [phone, setPhone] = useState('');
  const [phoneArray, setPhoneArray] = useState([] as string[]);
  const [address, setAddress] = useState('');
  const [addressArray, setAddressArray] = useState([] as string[]);
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    name || setError('Name is required');
    cpf || setError('CPF is required');
    emailArray.length > 0 || setError('At least one email is required');
    phoneArray.length > 0 || setError('At least one phone is required');
    addressArray.length > 0 || setError('At least one address is required');
    name && cpf && emailArray.length > 0 && phoneArray.length > 0 && addressArray.length > 0 && Meteor.call('clients.create', { name, cpf, email: emailArray , phone: phoneArray, address: addressArray }, (error: any) => {
      if (error) {
        console.log(error);
      } else {
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
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center">
        <label htmlFor="name">{ clientPageTranslation[language].name }</label>
        <input
          type="text"
          name="name"
          value={ name }
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="CPF">{ clientPageTranslation[language].cpf }</label>
        <input
          type="text"
          name="CPF"
          value={ cpf }
          onChange={(e) => setCpf(e.target.value)}
        />
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
    </div>
  );
};

export default ClientsAddForm;