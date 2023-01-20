type Translation =  {
  [key: string]: {
    flag: string;
  };
}

const flagTranslation: Translation = {
  'en-US': {
    flag: '🇺🇸',
  },
  'pt-BR': {
    flag: '🇧🇷',
  },
};

export default flagTranslation;