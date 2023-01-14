import { Router } from 'express';
import UserController from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/getUsers', [checkJwt], UserController.getUsers)
router.patch('/blanquear/:id', [checkJwt], UserController.blanquear)

export default router;
