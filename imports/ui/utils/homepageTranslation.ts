type Translation =  {
  [key: string]: {
    login: string;
    register: string;
    getUsers: string;
    searchEmail: string;
    searchName: string;
    searchUsername: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    age: string;
    searchByCode: string;
    getCats: string;
    getNewDog: string;
    quantity: string;
  };
}

const homepageTranslation: Translation = {
  'en-US': {
    login: 'Login',
    register: 'Register',
    getUsers: 'Get New Users!',
    searchEmail: 'Search by email',
    searchName: 'Search by name',
    searchUsername: 'Search by username',
    name: 'Name',
    email: 'Email',
    username: 'Username',
    phone: 'Phone',
    age: 'Age',
    searchByCode: 'Code',
    getCats: 'Get new cat',
    getNewDog: 'Get new dog',
    quantity: 'Quantity',
  },
  'pt-BR': {
    login: 'Entrar',
    register: 'Registrar',
    getUsers: 'Obter Usuários!',
    searchEmail: 'Pesquisar por email',
    searchName: 'Pesquisar por nome',
    searchUsername: 'Pesquisar por nome de usuário',
    name: 'Nome',
    email: 'Email',
    username: 'Nome de usuário',
    phone: 'Telefone',
    age: 'Idade',
    searchByCode: 'Código',
    getCats: 'Obter novo gato',
    getNewDog: 'Obter novo cachorro',
    quantity: 'Quantidade',
  },
};

export default homepageTranslation;