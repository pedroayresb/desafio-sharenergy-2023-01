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
  const [error, setError] = useState(null  as string | null);
  const { language } = useContext(Context) as ContextInterface;
  const [array, setArray] = useState(props.arrayItem); // estado que contem o array de strings que vem da API, e que pode ser editado

  const changeArrayItem = (e: React.ChangeEvent<HTMLInputElement>, i: number) => { // funcao que edita o item de dentro do array
    const newArray = array.map((item, index) => index === i ? e.target.value : item);
    setArray(newArray);
    props.setNewArray(newArray);
  };

  const removeArrayItem = (i: number) => { // funcao que remove o item de dentro do array
    const newArray = array.filter((item, index) => index !== i);
    setArray(newArray);
    props.setNewArray(newArray);
  };
  
  const toLowerCase = props.name.toLowerCase();

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { // funcao que adiciona um novo item ao array
    e.preventDefault();
    setError(null);
    const validateInputsResult = validateInputs[toLowerCase](newItem);
    if (validateInputsResult) {
      setError(validateInputsResult);
      return;
    }
    setArray([...array, newItem]);
    props.setNewArray([...props.arrayItem, newItem])
    setNewItem('');
  };

  return (
    <div className='flex flex-col'>
      {array.map((item, index) => (
        <div key={ index } className='flex flex-row items-center'>
          <input 
            type='text'
            value={ item }
            className="border border-yellow text-5xl mt-4 lg:h-8 py-5 px-4 "
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => changeArrayItem(e, index) }
          />
          <button
            className='border rounded-full h-12 w-12 text-3xl text-dark-blue text-center hover:bg-white hover:text-dark-cyan hover:border-dark-cyan'
            onClick={ () => removeArrayItem(index) }>X</button>  
        </div>
      ))}
      { props.arrayItem.length < 3 && <><input
        type='text'
        value={newItem}
        className="border border-yellow text-5xl mt-4 lg:h-8 py-5 px-4 "
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)} /><button onClick={(e) => submit(e)}>{clientPageTranslation[language].add}</button></> }
      <p>{ error }</p>
    </div>
  );
};

export default EditArrayItem;