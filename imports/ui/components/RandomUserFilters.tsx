import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface, Results } from '../interfaces/ContextInterface';
import homepageTranslation from '../utils/homepageTranslation'; // arquivo com as traduções

function RandomUsersContainer() {
  const { randomUsers, setRandomFilteredUsers, language } = useContext(Context) as ContextInterface;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => { // esse filtro analisa as 3 variaveis de estado e filtra os usuários de acordo com quais estao sendo utilizadas. Nao encontrei uma forma melhor de fazer isso sendo simultaneo com a digitacao do usuario, que queria que fosse
    name && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.name.first.toLowerCase().includes(name.toLowerCase())) as Results[]);
    email && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.email.toLowerCase().includes(email.toLowerCase())) as Results[]);
    username && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.login.username.toLowerCase().includes(username.toLowerCase())) as Results[]);
    name && email && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.name.first.toLowerCase().includes(name.toLowerCase()) && user.email.toLowerCase().includes(email.toLowerCase())) as Results[]);
    name && username && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.name.first.toLowerCase().includes(name.toLowerCase()) && user.login.username.toLowerCase().includes(username.toLowerCase())) as Results[]);
    email && username && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.email.toLowerCase().includes(email.toLowerCase()) && user.login.username.toLowerCase().includes(username.toLowerCase())) as Results[]);
    name && email && username && setRandomFilteredUsers(randomUsers?.filter((user: Results) => user.name.first.toLowerCase().includes(name.toLowerCase()) && user.email.toLowerCase().includes(email.toLowerCase()) && user.login.username.toLowerCase().includes(username.toLowerCase())) as Results[]);
    (!name && !email && !username) && setRandomFilteredUsers(randomUsers as Results[]);
  }, [name, email, username]);


  return (
    <form className='flex flex-col items-center self-center p-4'>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="name">{ homepageTranslation[language].searchName }: </label>
        <input type="text" placeholder={ homepageTranslation[language].searchName } onChange={(e) => setName(e.target.value)} className="border rounded-xl h-12 py-5 px-4 caret-dark-purple" />
      </div>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="email">{ homepageTranslation[language].searchEmail }: </label>
        <input type="text" placeholder={ homepageTranslation[language].searchEmail } onChange={(e) => setEmail(e.target.value)} className="border rounded-xl h-12 py-5 px-4 caret-dark-purple" />
      </div>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="username">{ homepageTranslation[language].searchUsername }: </label>
        <input type="text" placeholder={ homepageTranslation[language].searchUsername } onChange={(e) => setUsername(e.target.value)} className="border rounded-xl h-12 py-5 px-4 caret-dark-purple" />
      </div>
    </form>
  );
}

export default RandomUsersContainer;
