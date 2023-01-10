type Translation =  {
  [key: string]: {
    login: string;
    register: string;
    welcome: string;
  };
}

const homepageTranslation: Translation = {
  'en-US': {
    login: 'Login',
    register: 'Register',
    welcome: 'Welcome',
  },
  'pt-BR': {
    login: 'Entrar',
    register: 'Registrar',
    welcome: 'Bem-vindo',
  },
};

export default homepageTranslation;