import { Request, Response, NextFunction } from 'express';
import Users from '../models/Users';

const validateName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const nameRegex = /^[a-zA-Z0-9]{3,}$/;

  const isValid = nameRegex.test(name);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid name' });
  };

  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid password' });
  };
  
  next();
};

const isNameInUse = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const user = await Users.findOne({ name });

  if (user) {
    return res.status(401).json({ message: 'Name already in use' });
  };

  next();
};

export { validateName, validatePassword, isNameInUse };
