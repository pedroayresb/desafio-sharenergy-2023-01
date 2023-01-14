interface UserInterface {
  _id: string;
  name: string;
};

interface Results {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface ContextInterface {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  randomUsers: Results[] | null;
  setRandomUsers: React.Dispatch<React.SetStateAction<Results[] | null>>;
  randomFilteredUsers: Results[] | null;
  setRandomFilteredUsers: React.Dispatch<React.SetStateAction<Results[] | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  nameForLogin: string | null;
  setNameForLogin: React.Dispatch<React.SetStateAction<string | null>>;
  passwordForLogin: string | null;
  setPasswordForLogin: React.Dispatch<React.SetStateAction<string | null>>;
};

export { ContextInterface, UserInterface, Results };