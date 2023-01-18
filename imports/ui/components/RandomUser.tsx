import React, { useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Results } from '../interfaces/ContextInterface';
import homepageTranslation from '../utils/homepageTranslation'; // arquivo com as traduções

function RandomUsers(props: Results) {
  const { language } = useContext(Context) as ContextInterface;
  const { name, picture, cell, email, location, login,  dob } = props;

  return (
    <div className="border border-cyan rounded-xl flex flex-row w-90 mt-5 bg-offwhite shadow-sm hover:shadow-xl">
      <img src={picture.large} alt={name.first} className='rounded-full m-5'/>
      <div className="card-body p-5">
        <p>{ homepageTranslation[language].name }: { `${name.title}. ${name.first} ${name.last}` }</p>
        <p>{ homepageTranslation[language].username }: { login.username }</p>
        <p>{ homepageTranslation[language].phone }: { cell }</p>
        <p>{ homepageTranslation[language].email }: { email }</p>
        <p>{ `${location.city}, ${location.state}` }</p>
        <p>{ homepageTranslation[language].age }: { dob.age }</p>
      </div>
    </div>
  );
}

export default RandomUsers;