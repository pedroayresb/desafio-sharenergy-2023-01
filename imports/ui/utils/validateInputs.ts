interface IValidateInputs {
  [key: string]: (value: string) => string | null;
};

const validateName = (name: string) => {
  if (name.length < 3) {
    return 'Name must be at least 3 characters long';
  }
  return null;
};

const validateEmail = (email: string) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email';
  }
  return null;
};

const validatePhone = (phone: string) => {
  const phoneRegex = /^(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
  if (!phoneRegex.test(phone)) {
    return 'Invalid phone';
  }
  return null;
};

const validateCpf = (cpf: string) => {
  const cpfRegex = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
  if (!cpfRegex.test(cpf)) {
    return 'Invalid CPF';
  }
  return null;
};

const validateAddress = (adress: string) => {
  if (adress.length < 3) {
    return 'Adress must be at least 3 characters long';
  }
  return null;
};

export const validateInputs: IValidateInputs = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  address: validateAddress,
  cpf: validateCpf,
};
