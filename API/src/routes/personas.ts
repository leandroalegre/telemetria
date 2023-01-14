import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import PersonasController from '../controller/PersonasController';

const router = Router();

router.get('/findPersonbyDNI/:dni', [checkJwt], PersonasController.findPersonbyDNI)

router.get('/verificarVoto/:id_persona',[checkJwt], PersonasController.verificarVoto)

router.get('/confirmarVoto/:id_persona/:userId',[checkJwt], PersonasController.confirmarVoto)

router.get('/getPersonaYRol/:userId', [checkJwt], PersonasController.getPersonaYRol)

router.get('/getReferentes', [checkJwt], PersonasController.getReferentes)

router.get('/getVotosByReferentes/:id_persona', [checkJwt], PersonasController.getVotosByReferentes)

router.get('/getPersonasByReferente/:id_persona', [checkJwt], PersonasController.getPersonasByReferente)

router.get('/getTotalVotos', [checkJwt], PersonasController.getTotalVotos)

router.get('/getTotalVotosOposicion', [checkJwt], PersonasController.getTotalVotosOposicion)

router.get('/getTotalVotosReferentes', [checkJwt], PersonasController.getTotalVotosReferentes)

router.get('/getReferenteUser/:id_persona', [checkJwt], PersonasController.getReferenteUser)

router.get('/getVotoPadron', [checkJwt], PersonasController.getVotoPadron)

export default router;
