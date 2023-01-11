import React from 'react';

interface props {
  name: string
  value: string
  setArray: (e: any) => void
  setString: (e: any) => void
  array: string[]
}

function ArrayInputs(props: props) {
  return (
    <>
      <label htmlFor={ props.name }>{ props.name }</label>
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
        Add { props.name }
      </button>
      {props.array.map((item, index) => (
        <div key={ index }>
          <p>{ item }</p>
          <button
            type="button"
            onClick={() => props.setArray(props.array.filter((_, i) => i !== index))}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default ArrayInputs;