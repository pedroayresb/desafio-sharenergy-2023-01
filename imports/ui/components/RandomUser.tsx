import React from 'react';
import { Results } from '../interfaces/ContextInterface';

function RandomUsers(props: Results) {
  const { name, picture, cell, email, location, login,  dob } = props;

  return (
    <div className="card">
      <img src={picture.large} alt={name.first} />
      <div className="card-body">
        <p>Nome: { `${name.title}. ${name.first} ${name.last}` }</p>
        <p>Nome de Usuário: { login.username }</p>
        <p>Celular: { cell }</p>
        <p>Email: { email }</p>
        <p>{ `${location.city}, ${location.state}` }</p>
        <p>Idade: { dob.age }</p>
      </div>
    </div>
  );
}

export default RandomUsers;