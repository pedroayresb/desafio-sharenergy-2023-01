import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { ContextInterface, Results } from '../interfaces/ContextInterface';

function RandomUsersContainer() {
  const { randomUsers, setRandomFilteredUsers } = useContext(Context) as ContextInterface;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const filteredUsers: Results[] = randomUsers?.filter((user) => {
      if (!name && !email && !username) {
        return randomUsers;
      } else if (name && !email && !username) {
        return user.name.first.toLowerCase().includes(name.toLowerCase()) || user.name.last.toLowerCase().includes(name.toLowerCase());
      } else if (!name && email && !username) {
        return user.email.toLowerCase().includes(email.toLowerCase());
      } else if (!name && !email && username) {
        return user.login.username.toLowerCase().includes(username.toLowerCase());
      } else if (name && email && !username) {
        return (user.name.first.toLowerCase().includes(name.toLowerCase()) || user.name.last.toLowerCase().includes(name.toLowerCase())) && user.email.toLowerCase().includes(email.toLowerCase());
      } else if (name && !email && username) {
        return (user.name.first.toLowerCase().includes(name.toLowerCase()) || user.name.last.toLowerCase().includes(name.toLowerCase())) && user.login.username.toLowerCase().includes(username.toLowerCase());
      } else if (!name && email && username) {
        return user.email.toLowerCase().includes(email.toLowerCase()) && user.login.username.toLowerCase().includes(username.toLowerCase());
      } else if (name && email && username) {
        return (user.name.first.toLowerCase().includes(name.toLowerCase()) || user.name.last.toLowerCase().includes(name.toLowerCase())) && user.email.toLowerCase().includes(email.toLowerCase()) && user.login.username.toLowerCase().includes(username.toLowerCase());
      };
    }) as Results[];
    setRandomFilteredUsers(filteredUsers);
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
