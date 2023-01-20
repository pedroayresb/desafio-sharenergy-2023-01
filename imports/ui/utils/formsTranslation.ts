type FormsTranslation = {
  [key: string]: {
    username: string;
    password: string;
    confirmPassword: string;
    submit: string;
    login: string;
    rememberMe: string;
  };
};


export const formsTranslation: FormsTranslation = {
  'en-US': {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submit: 'Register',
    login: 'Login',
    rememberMe: 'Remember me',
  },
  'pt-BR': {
    username: 'Nome de Usuário',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    submit: 'Registrar',
    login: 'Entrar',
    rememberMe: 'Lembrar de mim',
  },
};