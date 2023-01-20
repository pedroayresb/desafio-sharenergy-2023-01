interface UserInterface {
  _id?: string | undefined;
  username?: string | undefined;
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
  randomUsers: Results[] | null;
  setRandomUsers: React.Dispatch<React.SetStateAction<Results[] | null>>;
  randomFilteredUsers: Results[] | null;
  setRandomFilteredUsers: React.Dispatch<React.SetStateAction<Results[] | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export { ContextInterface, UserInterface, Results };