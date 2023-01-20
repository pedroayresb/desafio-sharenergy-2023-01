import React, { useContext } from 'react';
import Context from '../context/Context';
import { ContextInterface } from '../interfaces/ContextInterface';
import { Results } from '../interfaces/ContextInterface';
import homepageTranslation from '../utils/homepageTranslation'; // arquivo com as traduções

function RandomUsers(props: Results) {
  const { language } = useContext(Context) as ContextInterface;
  const { name, picture, cell, email, location, login,  dob } = props;

  return (
    <div className="border border-cyan text-3xl rounded-xl flex flex-row w-11/12 mt-5 p-5 bg-offwhite shadow-sm hover:shadow-xl lg:text-lg">
      <img src={picture.large} alt={name.first} className='rounded-full w-52 h-52 self-center lg:w-32 lg:h-32'/>
      <div className="flex flex-col p-5">
        <p>{ homepageTranslation[language].name }: { `${name.title}. ${name.first} ${name.last}` }</p>
        <p>{ homepageTranslation[language].age }: { dob.age }</p>
        <p>{ homepageTranslation[language].username }: { login.username }</p>
        <p>{ homepageTranslation[language].email }: { email }</p>
        <p>{ homepageTranslation[language].phone }: { cell }</p>
        <p>{ `${location.city}, ${location.state}` }</p>
      </div>
    </div>
  );
}

export default RandomUsers;