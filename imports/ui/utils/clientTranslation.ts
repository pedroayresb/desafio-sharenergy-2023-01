type clientPage =  {
  [key: string]: {
    [key: string]: string;
  };
}

const clientPageTranslation: clientPage = {
  'en-US': {
    name: 'Name',
    cpf: 'CPF',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    edit: 'Edit',
    delete: 'Delete',
    addemail: 'Add Email',
    addphone: 'Add Phone',
    addaddress: 'Add Address',
    addClient: 'Add Client',
    editClient: 'Edit Client',
    remove: 'Remove',
    add: 'Add',
    save: 'Save',
  },
  'pt-BR': {
    name: 'Nome',
    cpf: 'CPF',
    email: 'Email',
    phone: 'Telefone',
    address: 'Endereço',
    edit: 'Editar',
    delete: 'Deletar',
    addemail: 'Adicionar Email',
    addphone: 'Adicionar Telefone',
    addaddress: 'Adicionar Endereço',
    addClient: 'Adicionar Cliente',
    editClient: 'Editar Cliente',
    remove: 'Remover',
    add: 'Adicionar',
    save: 'Salvar',
  },
};

export default clientPageTranslation;