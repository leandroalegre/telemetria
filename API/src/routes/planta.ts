import { Router } from 'express';
import PlantaController from '../controller/PlantaController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/getLecturas', [checkJwt], PlantaController.getLecturas)

export default router;
