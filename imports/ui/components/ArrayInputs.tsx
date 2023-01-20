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
        className="border border-yellow rounded-xl mt-4 lg:h-8 py-5 px-4"
      />
      { props.array.length < 3 && <button
        type='button'
        onClick={() => {
          setError('');
          const validateInputsResult = validateInputs[props.name](props.value);
          if (validateInputsResult) {
            setError(validateInputsResult);
          } else {
            props.setArray([...props.array, props.value]);
            props.setString('');
          }
        }}
        className='text-center mt-2 bg-dark-blue text-white border border-dark-blue rounded-xl hover:bg-white p-4 hover:text-dark-blue focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity'
      >
        { clientPageTranslation[language][`add${props.name}`] }
      </button> }
      {error && <p>{error}</p>}
      <div className='flex flex-col justify-center items-center lg:flex-row'>
      {props.array.map((item, index) => (
          <><p className='p-4' key={ index }>{item}</p><button
          type="button"
          onClick={() => props.setArray(props.array.filter((_, i) => i !== index))}
          className='border rounded-full h-12 w-12 text-3xl text-dark-blue text-center hover:bg-white hover:text-dark-cyan hover:border-dark-cyan'
        >
          X
        </button></>
      ))}
      </div>
    </div>
  );
};

export default ArrayInputs;