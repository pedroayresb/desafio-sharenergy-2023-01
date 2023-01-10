import Router from 'express';
import { createUserController, 
  getUserByIdController, 
  getUserByNameController, 
  getUserByTokenController,
  updateUserController, 
  deleteUserController } from '../controllers/user.controllers';
import validateToken from '../middlewares/validateToken';
import { validateName, validatePassword, isNameInUse } from '../middlewares/user.middlewares';

const router = Router();

router
  .post('/', validateName, validatePassword, isNameInUse, createUserController)
  .get('/', validateToken, getUserByTokenController)
  .get('/:id', validateToken, getUserByIdController)
  .get('/name/:name', validateToken, getUserByNameController)
  .put('/', validateToken, validateName, isNameInUse, updateUserController)
  .delete('/', validateToken, deleteUserController);


export default router;