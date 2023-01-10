type Translation =  {
  [key: string]: {
    flag: string;
  };
}

const flagTranslation: Translation = {
  'en-US': {
    flag: 'English | US | Change Language | 🇺🇸',
  },
  'pt-BR': {
    flag: 'Português | BR | Alterar Idioma | 🇧🇷',
  },
};

export default flagTranslation;