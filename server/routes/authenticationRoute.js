import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import VerifyToken from '../middlewares/VerifyToken';

// instantiate AuthRoute
const authenticationRoutes = Router();

authenticationRoutes.post('/signup', AuthMiddleware.validateSignUpRequest, AuthenticationController.createAccount);
authenticationRoutes.post('/login', AuthMiddleware.validateLoginRequest, AuthenticationController.login);
authenticationRoutes.get('/profile', VerifyToken.tokenVerification, AuthenticationController.fetchProfile);

export default authenticationRoutes;
