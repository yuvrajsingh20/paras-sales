import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/google', authController.googleAuth);
router.post('/email/signup', authController.signup);
router.post('/email/login', authController.login);
router.post('/logout', authController.logout);

export default router;
