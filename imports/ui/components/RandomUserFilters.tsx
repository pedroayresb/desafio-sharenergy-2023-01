import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface, Results } from '../interfaces/ContextInterface';

function RandomUsersContainer() {
  const { randomUsers, setRandomFilteredUsers } = useContext(Context) as ContextInterface;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
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
    <form>
      <input type="text" placeholder="Search by name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Search by email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Search by username" onChange={(e) => setUsername(e.target.value)} />
    </form>
  );
}

export default RandomUsersContainer;
