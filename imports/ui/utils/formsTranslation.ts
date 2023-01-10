type FormsTranslation = {
  [key: string]: {
    username: string;
    password: string;
    confirmPassword: string;
    submit: string;
    login: string;
  };
};


export const formsTranslation: FormsTranslation = {
  'en-US': {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submit: 'Register',
    login: 'Login',
  },
  'pt-BR': {
    username: 'Nome de Usuário',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    submit: 'Registrar',
    login: 'Entrar',
  },
};