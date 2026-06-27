import express, { type Router } from 'express';

//import Routes
import authRoutes from '../module/auth/auth.routes'





const routes: Router = express.Router();
 /** */
routes.use('/auth', authRoutes);











export default routes;


