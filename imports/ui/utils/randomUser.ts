import { Results } from '../interfaces/ContextInterface';

function randomUserFilters (randomUsers: Results) {
  const filteredUsers = randomUsers?.filter((user) => {
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
  });

  return filteredUsers;
}