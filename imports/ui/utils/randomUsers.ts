const getRandomUsers = async (count: number) => {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const { results } = await response.json();
  return results;
};

export default getRandomUsers;