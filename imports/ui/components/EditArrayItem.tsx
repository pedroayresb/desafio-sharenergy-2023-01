import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import clientPageTranslation from '../utils/clientTranslation';

interface props {
  arrayItem: string[]
  setNewArray: (newArray: string[]) => void
}

function EditArrayItem(props: props) { // componete que renderiza os itens de um array de strings que retorna da API, e que pode ser editado.
  const [newItem, setNewItem] = useState('');
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
    <div>
      {array.map((item, index) => (
        <>
          <input 
            type='text'
            value={ item }
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => changeArrayItem(e, index) }
          />
          <button onClick={ () => removeArrayItem(index) }>X</button>  
        </>
      ))}
      <input
        type='text'
        value={ newItem }
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value) }
      />
      <button onClick={ () => { // como utilizo o estado, preciso setar tanto no componente pai quanto no componente filho
        setArray([...array, newItem]);
        props.setNewArray([...props.arrayItem, newItem])
        setNewItem('');
        } }>{ clientPageTranslation[language].add }</button>
    </div>
  );
};

export default EditArrayItem;