import React, { useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import clientPageTranslation from '../utils/clientTranslation';

interface props {
  name: string
  value: string
  setArray: (e: any) => void
  setString: (e: any) => void
  array: string[]
}

function ArrayInputs(props: props) {
  const { language } = useContext(Context) as ContextInterface;
  return (
    <>
      <label htmlFor={ props.name }>{ clientPageTranslation[language][props.name] }</label>
      <input
        type="text"
        name={ props.name }
        value={ props.value }
        onChange={(e) => props.setString(e.target.value)}
      />
      <button
        type='button'
        onClick={() => {
          props.setArray([...props.array, props.value]);
          props.setString('');
        }}
      >
        { clientPageTranslation[language][`add${props.name}`] }
      </button>
      {props.array.map((item, index) => (
        <div key={ index }>
          <p>{ item }</p>
          <button
            type="button"
            onClick={() => props.setArray(props.array.filter((_, i) => i !== index))}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default ArrayInputs;