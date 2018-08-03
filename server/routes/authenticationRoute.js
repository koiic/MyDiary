import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

// instantiate AuthRoute
const authenticationRoutes = Router();

authenticationRoutes.post('/signup', AuthMiddleware.validateSignUpRequest, AuthenticationController.createAccount);
authenticationRoutes.post('/login', AuthMiddleware.validateLoginRequest, AuthenticationController.login);

export default authenticationRoutes;
