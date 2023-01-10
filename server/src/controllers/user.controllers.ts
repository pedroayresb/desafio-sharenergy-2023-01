import { Request, Response } from 'express';
import {
  createUser,
  getUserById,
  getUserByName,
  updateUser,
  deleteUser,
} from '../services/user.services';

interface User {
  id?: string;
  name?: string;
  password?: string;
}

export const createUserController = async (req: Request, res: Response) => {
  const { name, password }: User = req.body;
  const token = await createUser({ name, password });
  if (!token) {
    res.status(400).send('User not created');
  };
  res.status(200).send(token);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById({ id });
  if (user === "User not found") {
    res.status(404).send(user);
  };
  res.status(200).send(user);
};

export const getUserByNameController = async (req: Request, res: Response) => {
  const { name } = req.params;
  const user = await getUserByName({ name });
  if (user === "User not found") {
    res.status(404).send(user);
  };
  res.status(200).send(user);
};

export const getUserByTokenController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const userById = await getUserById({ id: user.id });
  if (user === "User not found") {
    res.status(404).send(userById);
  };
  res.status(200).send(userById);
};

export const updateUserController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const { name, password } = req.body;

  const updatedUser = await updateUser({ id: user.id, name, password });
  if (updatedUser === "User not found") {
    res.status(404).send(updatedUser);
  };
  res.status(200).send(updatedUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;

  const deletedUser = await deleteUser({ id: user.id });
  if (deletedUser === "User not found") {
    res.status(404).send(deletedUser);
  };
  res.status(200).send(deletedUser);
};
