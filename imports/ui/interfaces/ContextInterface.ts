interface UserInterface {
  _id: string;
  name: string;
}

interface ContextInterface {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export { ContextInterface, UserInterface };