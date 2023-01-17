import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import clientPageTranslation from '../utils/clientTranslation';
import { validateInputs } from '../utils/validateInputs';

interface props {
  arrayItem: string[]
  setNewArray: (newArray: string[]) => void
  name: string
}

function EditArrayItem(props: props) { // componete que renderiza os itens de um array de strings que retorna da API, e que pode ser editado.
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');
  const { language } = useContext(Context) as ContextInterface;
  const [array, setArray] = useState(props.arrayItem); // estado que contem o array de strings que vem da API, e que pode ser editado

  const changeArrayItem = (e: React.ChangeEvent<HTMLInputElement>, i: number) => { // funcao que edita o item de dentro do array
    const newArray = array;
    newArray[i] = e.target.value;
    setArray(newArray);
    props.setNewArray(newArray);
  };

  const removeArrayItem = (i: number) => { // funcao que remove o item de dentro do array
    const newArray = array.filter((item, index) => index !== i);
    setArray(newArray);
    props.setNewArray(newArray);
  };

  return (
    <div className='flex flex-col'>
      {array.map((item, index) => (
        <div className='flex flex-row'>
          <input 
            type='text'
            value={ item }
            className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => changeArrayItem(e, index) }
          />
          <button onClick={ () => removeArrayItem(index) }>X</button>  
        </div>
      ))}
      <input
        type='text'
        value={ newItem }
        className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value) }
      />
      <button onClick={ () => { // como utilizo o estado, preciso setar tanto no componente pai quanto no componente filho
        const validateInputsResult = validateInputs[props.name](newItem);
        if (validateInputsResult) {
          setError(validateInputsResult);
          return;
        }
        setArray([...array, newItem]);
        props.setNewArray([...props.arrayItem, newItem])
        setNewItem('');
        } }>{ clientPageTranslation[language].add }</button>
      <p>{ error }</p>
    </div>
  );
};

export default EditArrayItem;