import React, { useState } from 'react';

interface props {
  arrayItem: string[]
  setNewArray: (newArray: string[]) => void
}

function EditArrayItem(props: props) {
  const [newItem, setNewItem] = useState('');

  const changeArrayItem = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newArray = props.arrayItem;
    newArray[i] = e.target.value;
    props.setNewArray(newArray);
  };

  return (
    <div>
      {props.arrayItem.map((item, index) => (
        <input 
          type='text'
          value={ item }
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => changeArrayItem(e, index) }
        />
      ))}
      <input
        type='text'
        value={ newItem }
        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value) }
      />
      <button onClick={ () => {
        props.setNewArray([...props.arrayItem, newItem])
        setNewItem('');
        } }>Add</button>
    </div>
  );
};

export default EditArrayItem;