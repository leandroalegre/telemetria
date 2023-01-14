import { Router } from 'express';
import auth from './auth';
import user from './user';
import panelcontrol from './panelcontrol';
import personas from './personas';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/panelcontrol', panelcontrol);
routes.use('/personas', personas);

export default routes;
