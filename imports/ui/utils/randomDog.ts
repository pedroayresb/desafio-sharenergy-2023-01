const getRandomDog = async () => {
  const response = await fetch('https://random.dog/woof.json');
  const { url } = await response.json();
  return url;
}

export default getRandomDog;