import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import clientPageTranslation from '../utils/clientTranslation';
import { validateInputs } from '../utils/validateInputs';

interface props {
  name: string
  value: string
  setArray: (e: any) => void
  setString: (e: any) => void
  array: string[]
}

function ArrayInputs(props: props) {
  const [error, setError] = useState('');
  const { language } = useContext(Context) as ContextInterface;
  return (
    <div className="mt-4 grid place-items-center content-center">
      <label htmlFor={ props.name }>{ clientPageTranslation[language][props.name] }</label>
      <input
        type="text"
        name={ props.name }
        value={ props.value }
        onChange={(e) => props.setString(e.target.value)}
        className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
      />
      <button
        type='button'
        onClick={() => {
          console.log(props.name, props.value)
          const validateInputsResult = validateInputs[props.name](props.value);
          if (validateInputsResult) {
            setError(validateInputsResult);
            return;
          }
          props.setArray([...props.array, props.value]);
          props.setString('');
        }}
      >
        { clientPageTranslation[language][`add${props.name}`] }
      </button>
      {error && <p>{error}</p>}
      {props.array.map((item, index) => (
        <div key={ index } className='flex flex-row justify-center'>
          <p className='p-4'>{ item }</p>
          <button
            type="button"
            onClick={() => props.setArray(props.array.filter((_, i) => i !== index))}
            className='text-center text-red-500 border border-red-500 rounded-xl hover:bg-red-500 px-2 h-8 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity'
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArrayInputs;