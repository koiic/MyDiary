import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';

// instantiate AuthRoute
const authenticationRoutes = Router();

authenticationRoutes.post('/signup', AuthenticationController.createAccount);
authenticationRoutes.post('/login', AuthenticationController.login);

export default authenticationRoutes;
