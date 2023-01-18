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
        className="border border-yellow rounded-xl h-8 py-5 px-4 caret-dark-purple"
      />
      { props.array.length < 3 && <button
        type='button'
        onClick={() => {
          setError('');
          const validateInputsResult = validateInputs[props.name](props.value);
          if (validateInputsResult) {
            setError(validateInputsResult);
            return;
          }
          props.setArray([...props.array, props.value]);
          props.setString('');
        }}
        className='text-center mt-2 bg-dark-blue text-white border border-dark-blue rounded-xl hover:bg-white px-2 h-8 hover:text-dark-blue focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity'
      >
        { clientPageTranslation[language][`add${props.name}`] }
      </button> }
      {error && <p>{error}</p>}
      <div className='flex flex-row justify-center items-center'>
      {props.array.map((item, index) => (
          <><p className='p-4' key={ index }>{item}</p><button
          type="button"
          onClick={() => props.setArray(props.array.filter((_, i) => i !== index))}
          className='text-center text-red-500 border border-red-500 rounded-xl hover:bg-red-500 px-2 h-8 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity'
        >
          X
        </button></>
      ))}
      </div>
    </div>
  );
};

export default ArrayInputs;