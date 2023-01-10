import Users from "../models/Users";
import jwt from 'jsonwebtoken';

interface User {
  id?: string;
  name?: string;
  password?: string;
}

const secret = process.env.JWT_SECRET || 'secret';

export const createUser = async ({ name, password }: User) => {
  try {
    const user = await Users.create({ name, password });

    const token = jwt.sign({ id: user._id }, secret);

    return token as string;

  } catch (error) {

    console.log(error);

  }
};

export const getUserById = async ({ id }: User) => {
  try {
    const user = await Users.findOne({ _id: id });
    if (!user) {
      return "User not found";
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByName = async ({ name }: User) => {
  try {

    const user = await Users.findOne({ name });
    
    if (!user) {
      return "User not found";
    }
    const token = jwt.sign({ id: user._id }, secret);

    return token as string;
  } catch (error) {
    console.log(error);
  };
};

export const updateUser = async ({ id, name, password }: User) => {
  try {
    const user = await Users.updateOne({ _id: id }, { name, password });
    if (user.matchedCount === 0) {
      return "User not found";
    };
    return user;
  } catch (error) {
    console.log(error);
  };
};

export const deleteUser = async ({ id }: User) => {
  const user = await Users.findOne({ _id: id });
  if (!user) {
    return "User not found";
  };
  try {
    const user = await Users.deleteOne({ _id: id });
    return 'User removed successfully';
  } catch (error) {
    console.log(error);
  };
};