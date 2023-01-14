import { Router } from 'express';
import UserController from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';
import { PanelcontrolController } from '../controller/PanelcontrolController'

const router = Router();

router.get('/getallpersonas', [checkJwt], PanelcontrolController.getAllpersonas);
router.get('/getrolebyidpersona/:id', [checkJwt], PanelcontrolController.getRoleByIdPersona);
router.get('/nuevoreferente/:id', [checkJwt], PanelcontrolController.nuevoReferente);
router.get('/getallreferentes', [checkJwt], PanelcontrolController.getAllreferentes);

router.patch('/quitarreferente/:id', [checkJwt], PanelcontrolController.quitarReferente);
router.patch('/referenciarpersona/:dump', [checkJwt], PanelcontrolController.referenciarPersona);
router.patch('/nuevofiscal/:id', [checkJwt], PanelcontrolController.nuevoFiscal);
router.patch('/nuevaoposicion/:id', [checkJwt], PanelcontrolController.nuevaOposicion);



export default router;
